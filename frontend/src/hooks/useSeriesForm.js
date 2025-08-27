// src/hooks/useSeriesForm.js

import { useState } from 'react';

const useSeriesForm = (initialData) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    tags: [],
    status: 'ongoing',
    coverImage: null,
  });

  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleTagChange,
    handleImageUpload,
    validateForm,
  };
};

export default useSeriesForm;