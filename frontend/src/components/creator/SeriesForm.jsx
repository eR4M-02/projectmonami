import React, { useState, useEffect } from 'react';
import { Upload, X, Eye, Save } from 'lucide-react';

const SeriesForm = ({ initialData, onSave, onPublish }) => {
  const [formData, setFormData] = useState({
    title: '',
    tags: [],
    description: '',
    cover: null,
    coverPreview: null,
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

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        cover: file,
        coverPreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleTagAdd = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e, isPublishing = false) => {
    e.preventDefault();
    if (isPublishing) {
      onPublish(formData);
    } else {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="series-form">
      <div className="form-grid">
        <div className="cover-section">
          <div className="cover-upload">
            {formData.coverPreview ? (
              <div className="cover-preview">
                <img src={formData.coverPreview} alt="Cover preview" />
                <button type="button" onClick={() => setFormData(prev => ({ ...prev, cover: null, coverPreview: null }))}>
                  <X size={24} />
                </button>
              </div>
            ) : (
              <label htmlFor="cover" className="cover-upload-label">
                <Upload size={24} />
                <span>Upload Cover</span>
                <input
                  type="file"
                  id="cover"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  style={{ display: 'none' }}
                />
              </label>
            )}
          </div>
        </div>

        <div className="form-fields">
          <div className="form-group">
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              id="tags"
              placeholder="Add tags (press Enter to add)"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleTagAdd(e.target.value);
                  e.target.value = '';
                }
              }}
              className="form-input"
            />
            <div className="tags-container">
              {formData.tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                  <button type="button" onClick={() => handleTagRemove(tag)}>
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              required
              className="form-textarea"
              rows={6}
            />
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary">
          <Eye size={16} /> Preview
        </button>
        <button type="submit" className="btn btn-primary">
          <Save size={16} /> Save
        </button>
      </div>
    </form>
  );
};

export default SeriesForm;