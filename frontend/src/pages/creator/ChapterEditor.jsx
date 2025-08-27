// src/pages/creator/ChapterEditor.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ChapterForm from '../../components/creator/ChapterForm';

const ChapterEditor = () => {
  const { seriesId, chapterId } = useParams();
  const navigate = useNavigate();
  const [chapterData, setChapterData] = useState(null);

  useEffect(() => {
    if (chapterId) {
      // Fetch chapter data if editing an existing chapter
      // This is a placeholder. Replace with actual API call.
      setChapterData({
        id: chapterId,
        title: 'Sample Chapter',
        number: '1',
        pages: []
      });
    }
  }, [chapterId]);

  const handleSave = (formData) => {
    console.log('Saving chapter:', formData);
    // Implement save logic here
    navigate(`/creator/series/${seriesId}/edit`);
  };

  return (
    <div className="chapter-editor">
      <Link to={`/creator/series/${seriesId}/edit`} className="back-link">
        <ArrowLeft size={16} /> Back to Series
      </Link>
      <h1>{chapterId ? 'Edit Chapter' : 'Create New Chapter'}</h1>
      <ChapterForm
        initialData={chapterData}
        onSave={handleSave}
      />
    </div>
  );
};

export default ChapterEditor;