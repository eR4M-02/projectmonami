// src/pages/creator/SeriesCreateEdit.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Eye, Save, ArrowLeft } from 'lucide-react';
import SeriesForm from '../../components/creator/SeriesForm';
import ImageUploader from '../../components/creator/ImageUploader';
import { validateSeriesForm } from '../../utils/validators';

const SeriesCreateEdit = () => {
  // Extract seriesId from URL parameters
  const { seriesId } = useParams();
  const navigate = useNavigate();
  
  // State for series data, chapters, and UI control
  const [seriesData, setSeriesData] = useState({
    title: '',
    tags: [],
    description: '',
    coverImage: null,
  });
  const [chapters, setChapters] = useState([]);
  
  // Determine if we're editing an existing series or creating a new one
  const isEditing = Boolean(seriesId);

  // Fetch series data if we're editing an existing series
  useEffect(() => {
    if (isEditing) {
      fetchSeriesData(seriesId);
    }
  }, [isEditing, seriesId]);

  // Simulated API call to fetch series data
  const fetchSeriesData = async (id) => {
    // Replace this with actual API call in production
    const mockData = {
      title: 'Sample Series',
      tags: ['Action', 'Adventure'],
      description: 'This is a sample series description.',
      coverImage: 'https://example.com/cover.jpg',
      chapters: [
        { id: 1, title: 'Chapter 1', rating: 4.5, comments: 10 },
        { id: 2, title: 'Chapter 2', rating: 4.7, comments: 15 },
      ],
    };
    setSeriesData(mockData);
    setChapters(mockData.chapters);
  };

  // Handle changes in the series form
  const handleSeriesDataChange = (field, value) => {
    setSeriesData(prev => ({ ...prev, [field]: value }));
  };

  // Handle saving the series
  const handleSave = () => {
    const errors = validateSeriesForm(seriesData);
    if (Object.keys(errors).length === 0) {
      // Replace with actual API call in production
      console.log('Saving series:', seriesData);
      console.log('With chapters:', chapters);
      navigate('/creator'); // Redirect to creator dashboard after saving
    } else {
      console.log('Validation errors:', errors);
      // Handle displaying errors to the user
    }
  };

  // Handle adding a new chapter
  const handleAddChapter = () => {
    const newChapter = {
      id: Date.now(), // Temporary ID
      title: `Chapter ${chapters.length + 1}`,
      rating: 0,
      comments: 0,
    };
    setChapters([...chapters, newChapter]);
  };

  // Handle editing a chapter
  const handleEditChapter = (chapterId) => {
    navigate(`/creator/series/${seriesId}/chapter/${chapterId}/edit`);
  };

  // Handle deleting a chapter
  const handleDeleteChapter = (chapterId) => {
    setChapters(chapters.filter(chapter => chapter.id !== chapterId));
  };

  return (
    <div className="series-create-edit container">
      <header className="editor-header">
        <div className="header-content">
          <Link to="/creator" className="back-link">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 className="editor-title">{isEditing ? 'Edit Series' : 'Create New Series'}</h1>
        </div>
      </header>

      <main className="editor-content">
        <div className="editor-grid">
          {/* Left column: Cover image upload */}
          <div className="cover-section">
            <ImageUploader
              currentImage={seriesData.coverImage}
              onImageUpload={(image) => handleSeriesDataChange('coverImage', image)}
            />
          </div>

          {/* Right column: Series details form */}
          <div className="series-details">
            <SeriesForm
              seriesData={seriesData}
              onDataChange={handleSeriesDataChange}
            />
          </div>
        </div>

        {/* Preview and Save buttons */}
        <div className="form-actions">
          <button className="btn btn-secondary">
            <Eye size={16} /> Preview
          </button>
          <button onClick={handleSave} className="btn btn-primary">
            <Save size={16} /> Save
          </button>
        </div>

        {/* Chapters section */}
        <div className="chapters-section">
          <h2>Chapters</h2>
          {chapters.map((chapter) => (
            <div key={chapter.id} className="chapter-item">
              <span>{chapter.title}</span>
              <span>Rating: {chapter.rating} | Comments: {chapter.comments}</span>
              <div className="chapter-actions">
                <button onClick={() => handleEditChapter(chapter.id)} className="btn btn-sm">
                  <Edit size={14} />
                </button>
                <button onClick={() => handleDeleteChapter(chapter.id)} className="btn btn-sm btn-danger">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          <button onClick={handleAddChapter} className="btn btn-primary">
            <Plus size={16} /> Add New Chapter
          </button>
        </div>
      </main>
    </div>
  );
};

export default SeriesCreateEdit;