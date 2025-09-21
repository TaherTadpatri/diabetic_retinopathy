from fastapi import FastAPI, File, UploadFile ,Form
from fastapi.responses import JSONResponse
import torch
import cv2
import timm
import numpy as np
from PIL import Image
import io
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os 
from torchvision.transforms import transforms
import uuid
from processing import process_image_1,process_image_2,process_image_3,process_image_4,process_image_5
import shutil
from information import diabetic_retinopathy_info

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
os.makedirs("static/uploads", exist_ok=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
processing_modules=[process_image_1,process_image_2,process_image_3,process_image_5] #process_image_4s
device = "cuda" if torch.cuda.is_available() else "cpu"
level_to_category = {
    0: "No_DR",
    1: "Mild",
    2: "Moderate",
    3: "Severe",
    4: "Proliferate_DR"
}
checkpoint_path = "../model/swinv2_small_window16_256_best.pt"
MODEL_NAME = "swinv2_small_window16_256"
model = timm.create_model(MODEL_NAME, pretrained=False, num_classes=5)

def load_model_from_checkpoint(model, checkpoint_path, device):
    model.load_state_dict(torch.load(checkpoint_path, map_location=device))
    model.to(device)
    model.eval()
    return model

model = load_model_from_checkpoint(model, checkpoint_path, device)

def process_image(image: Image.Image):
    image = np.array(image)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    image_resized = cv2.resize(image, (256, 256))
    image_resized = cv2.cvtColor(image_resized, cv2.COLOR_BGR2RGB)
    image = image_resized.transpose((2, 0, 1))
    image = torch.tensor(image, dtype=torch.float32) / 255.0
    return image.unsqueeze(0)

def clear_uploads_directory():
    upload_dir = "static/uploads"
    if os.path.exists(upload_dir):
        for filename in os.listdir(upload_dir):
            file_path = os.path.join(upload_dir, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
            except Exception as e:
                print(f"Error deleting {file_path}: {e}")
    else:
        os.makedirs(upload_dir)

@app.post("/predict")
async def predict(
                name: str = Form(...),
                age: str = Form(...),
                gender: str = Form(...),
                imageType: str = Form(...),
                file: UploadFile = File(...),
                ):
    try:
        # Read and process the uploaded image
        clear_uploads_directory()
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        image_tensor = process_image(image).to(device)
        processed_urls=[]
        # Make prediction
        with torch.no_grad():
            output = model(image_tensor)
            _, predicted_label = torch.max(output, 1)
            prediction = level_to_category[predicted_label.item()]
        

        inverse_transform = transforms.ToPILImage()
        image=np.array(image)
        for module in processing_modules:
            image_tensor,_=module(image)
            preprocessed_image = inverse_transform(image_tensor.squeeze(0).cpu())
            filename = f"static/uploads/{uuid.uuid4()}.png"
            preprocessed_image.save(filename)
            image_url = f"http://127.0.0.1:8000/{filename}"
            processed_urls.append(image_url)
        print('done with the predictinos')
        prediction_info = diabetic_retinopathy_info[predicted_label.item()]
        return {
            "prediction": prediction,
            "image_urls": processed_urls,
            "description": prediction_info["description"],
            "symptoms": prediction_info["symptoms"],
            "risk_factors": prediction_info["risk_factors"],
            "remedies": prediction_info["remedies"],
            "care_instructions": prediction_info["care_instructions"],
            "complications_if_untreated": prediction_info["complications_if_untreated"],
            "support_resources": prediction_info["support_resources"],
            "name": name,
            "age": age,
            "gender": gender,
            "imageType": imageType
        }
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.get("/")
async def root():
    return {"message": "Diabetic Retinopathy Prediction API"}