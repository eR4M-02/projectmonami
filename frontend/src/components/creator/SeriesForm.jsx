// src/components/creator/SeriesForm.jsx

import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import { validateSeriesForm } from '../../utils/validators';

const SeriesForm = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [],
    status: 'ongoing',
    coverImage: null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleImageUpload = (image) => {
    setFormData(prev => ({ ...prev, coverImage: image }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="series-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags (comma-separated)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags.join(', ')}
          onChange={handleTagChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="hiatus">On Hiatus</option>
        </select>
      </div>

      <div className="form-group">
        <label>Cover Image</label>
        <ImageUploader
          onImageUpload={handleImageUpload}
          currentImage={formData.coverImage}
        />
      </div>

      <button type="submit" className="btn btn-primary">Save Series</button>
    </form>
  );
};

export default SeriesForm;