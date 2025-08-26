import { IMAGE_UPLOAD } from './constants';

export const validateImageFile = (file) => {
  const errors = [];
  
  // Check file type
  if (!IMAGE_UPLOAD.ALLOWED_TYPES.includes(file.type)) {
    errors.push(`File type ${file.type} is not supported. Please use JPG, PNG, or WebP.`);
  }
  
  // Check file size
  if (file.size > IMAGE_UPLOAD.MAX_FILE_SIZE) {
    errors.push(`File size ${formatFileSize(file.size)} exceeds the maximum limit of ${formatFileSize(IMAGE_UPLOAD.MAX_FILE_SIZE)}.`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const createImagePreview = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const resizeImage = (file, maxWidth = 800, maxHeight = 1200, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(resolve, file.type, quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};