 
import cv2
import torch
import numpy as np
import matplotlib.pyplot as plt
from torchvision.transforms import transforms
from PIL import Image

def scaleRadius(img: np.ndarray, scale: float) -> np.ndarray:
    x = img[img.shape[0] // 2, :, :].sum(1)
    r = (x > x.mean() / 10).sum() / 2
    s = scale * 1.0 / r
    return cv2.resize(img, (0, 0), fx=s, fy=s)

def crop_image_from_gray(img: np.ndarray, tol: int = 7) -> np.ndarray:
    if img.ndim == 2:
        mask = img > tol
        return img[np.ix_(mask.any(1), mask.any(0))]
    elif img.ndim == 3:
        gray_img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        mask = gray_img > tol
        check_shape = img[:, :, 0][np.ix_(mask.any(1), mask.any(0))].shape[0]
        if check_shape == 0: 
            return img
        else:
            img1 = img[:, :, 0][np.ix_(mask.any(1), mask.any(0))]
            img2 = img[:, :, 1][np.ix_(mask.any(1), mask.any(0))]
            img3 = img[:, :, 2][np.ix_(mask.any(1), mask.any(0))]
            img = np.stack([img1, img2, img3], axis=-1)
        return img

def process_image_1(image: np.ndarray, scale: float = 500) -> tuple[torch.Tensor, None]:
    try:
        img = scaleRadius(image, scale)
        img = cv2.addWeighted(img, 4, cv2.GaussianBlur(img, (0, 0), scale / 30), -4, 128)
        b = np.zeros(img.shape)
        cv2.circle(b, (img.shape[1] // 2, img.shape[0] // 2), int(scale * 0.9), (1, 1, 1), -1, 8, 0)
        img = img * b + 128 * (1 - b)
        img = cv2.resize(img, (256, 256))
        img = torch.tensor(img.transpose(2, 0, 1), dtype=torch.float32) / 255.0
        return img.unsqueeze(0), None
    except Exception as e:
        raise Exception(f"Error in process_image_1: {str(e)}")

def process_image_2(image: np.ndarray) -> tuple[torch.Tensor, None]:
    img = cv2.resize(image, (256, 256))
    img = torch.tensor(img.transpose(2, 0, 1), dtype=torch.float32) / 255.0
    return img.unsqueeze(0), None

def process_image_3(image: np.ndarray, sigmaX: int = 10) -> tuple[torch.Tensor, None]:
    img = crop_image_from_gray(image)
    img = cv2.addWeighted(img, 4, cv2.GaussianBlur(img, (0, 0), sigmaX), -4, 128)
    img = torch.tensor(img.transpose(2, 0, 1), dtype=torch.float32) / 255.0
    return img.unsqueeze(0), None

def process_image_4(image: np.ndarray, sigmaX: int = 10) -> tuple[torch.Tensor, None]:
    img = crop_image_from_gray(image)
    height, width, _ = img.shape
    x = int(width / 2)
    y = int(height / 2)
    r = np.amin((x, y))
    circle_img = np.zeros((height, width), np.uint8)
    cv2.circle(circle_img, (x, y), int(r), 1, thickness=-1)
    img = cv2.bitwise_and(img, img, mask=circle_img)
    img = crop_image_from_gray(img)
    img = cv2.addWeighted(img, 4, cv2.GaussianBlur(img, (0, 0), sigmaX), -4, 128)
    img = torch.tensor(img.transpose(2, 0, 1), dtype=torch.float32) / 255.0
    return img.unsqueeze(0), None

def process_image_5(image: np.ndarray, scale: float = 1, alpha: float = 0.5, colormap: str = 'jet') -> tuple[torch.Tensor, None]:
    img_array = image
    if scale != 1:
        new_size = (int(img_array.shape[1] * scale), int(img_array.shape[0] * scale))
        img_array = cv2.resize(img_array, new_size, interpolation=cv2.INTER_LINEAR)
    gray = cv2.cvtColor(img_array, cv2.COLOR_RGB2GRAY)
    gray = gray.astype(float) / 255.0
    gray = cv2.GaussianBlur(gray, (15, 15), 0)
    heatmap = (gray * 255).astype(np.uint8)
    cmap = plt.get_cmap(colormap)
    heatmap_colored = cmap(heatmap)[:, :, :3]
    heatmap_colored = (heatmap_colored * 255).astype(np.uint8)
    if scale != 1:
        heatmap_colored = cv2.resize(heatmap_colored, (img_array.shape[1], img_array.shape[0]), interpolation=cv2.INTER_LINEAR)
    overlay = cv2.addWeighted(img_array, 1 - alpha, heatmap_colored, alpha, 0.0)
    overlay = torch.tensor(overlay.transpose(2, 0, 1), dtype=torch.float32) / 255.0
    return overlay.unsqueeze(0), None