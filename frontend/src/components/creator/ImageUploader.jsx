// src/components/creator/ImageUploader.jsx

import React from 'react';
import { Upload } from 'lucide-react';

const ImageUploader = ({ onImageUpload, multiple = false, currentImages = [] }) => {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    // For now, just pass the file names to simulate upload
    const fileNames = files.map(file => file.name);
    onImageUpload(multiple ? fileNames : fileNames[0]);
  };

  return (
    <div className="image-uploader">
      <label className="upload-area">
        <input
          type="file"
          onChange={handleFileChange}
          multiple={multiple}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <div className="upload-placeholder">
          <Upload size={24} />
          <span>Click to upload {multiple ? 'images' : 'an image'}</span>
        </div>
      </label>
      {currentImages.length > 0 && (
        <div className="current-images">
          <h4>Current Images:</h4>
          <ul>
            {currentImages.map((image, index) => (
              <li key={index}>{typeof image === 'string' ? image : image.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;