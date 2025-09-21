#  Medical Image Analysis Platform

A full-stack application for medical image analysis for retinal diabetic retinopathy

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.10 or higher)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/TaherTadpatri/diabetic_retinopathy.git
```

### 2. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 3. Backend Setup
```bash
# Navigate to backend directory
cd medgemma_mm_retianl_finetune


python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

pip install -r requirements.txt

# Create model directory
mkdir -p model

# Place your trained model files in the model/ directory
# The model should be placed as: model/your_model_file.pth
```

### 4. Start Backend Server
```bash
# From the medgemma_mm_retianl_finetune directory
cd src
uvicorn main:app
```

The backend will be available at `http://127.0.0.1:8000/`

## 📁 Project Structure

```
diabetic_retinopathy/
├── frontend/
│   └── frontend/           # React frontend application
│       ├── src/
│       ├── components/
│       ├── public/
│       └── package.json
├── medgemma_mm_retianl_finetune/  # Python backend
│   ├── src/
│   ├── model/              # Model files directory
│   ├── training_scripts/
│   └── requirements.txt
└── README.md
```

## 🔧 Configuration

### Frontend Configuration
- The frontend is built with React and Vite
- Default port: 5173
- To change the backend API URL, update the API calls in the frontend components

### Backend Configuration
- The backend is built with Flask/Python
- Default port: 8000
- Model files should be placed in `medgemma_mm_retianl_finetune/model/`
- Update model paths in `src/main.py` as needed



