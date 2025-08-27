// src/components/creator/ChapterForm.jsx

import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import { validateChapterForm } from '../../utils/validators';

const ChapterForm = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    number: '',
    pages: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (images) => {
    setFormData(prev => ({ ...prev, pages: [...prev.pages, ...images] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateChapterForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      onSave(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chapter-form">
      <div className="form-group">
        <label htmlFor="title">Chapter Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="number">Chapter Number</label>
        <input
          type="number"
          id="number"
          name="number"
          value={formData.number}
          onChange={handleInputChange}
          className={errors.number ? 'error' : ''}
        />
        {errors.number && <span className="error-message">{errors.number}</span>}
      </div>

      <div className="form-group">
        <label>Chapter Pages</label>
        <ImageUploader
          onImageUpload={handleImageUpload}
          multiple={true}
          currentImages={formData.pages}
        />
        {errors.pages && <span className="error-message">{errors.pages}</span>}
      </div>

      <button type="submit" className="btn btn-primary">Save Chapter</button>
    </form>
  );
};

export default ChapterForm;