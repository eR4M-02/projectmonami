import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SeriesForm from '../../components/creator/SeriesForm';
import ChapterList from '../../components/series/ChapterList';

const SeriesCreateEdit = () => {
  const { seriesId } = useParams();
  const navigate = useNavigate();
  const [seriesData, setSeriesData] = useState(null);
  const [chapters, setChapters] = useState([]);

  const isEditing = Boolean(seriesId && seriesId !== 'new');

  useEffect(() => {
    if (isEditing) {
      // Fetch series data and chapters
      // This is a placeholder. Replace with actual API call.
      setSeriesData({
        title: 'Example Series',
        description: 'This is an example series.',
        tags: ['Action', 'Adventure'],
        status: 'ongoing',
        coverPreview: 'https://example.com/cover.jpg'
      });
      setChapters([
        { id: 1, title: 'Chapter 1', rating: 4.5, comments: 10 },
        { id: 2, title: 'Chapter 2', rating: 4.7, comments: 15 },
      ]);
    }
  }, [isEditing, seriesId]);

  const handleSave = (formData) => {
    console.log('Saving:', formData);
    // Implement save logic
  };

  const handlePublish = (formData) => {
    console.log('Publishing:', formData);
    // Implement publish logic
  };

  const handleChapterEdit = (chapterId) => {
    navigate(`/creator/series/${seriesId}/chapter/${chapterId}/edit`);
  };

  const handleChapterDelete = (chapterId) => {
    // Implement delete logic
    setChapters(chapters.filter(chapter => chapter.id !== chapterId));
  };

  const handleAddNewChapter = () => {
    navigate(`/creator/series/${seriesId}/chapter/new`);
  };

  return (
    <div className="series-create-edit">
      <header>
        <Link to="/creator" className="back-link">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <h1>{isEditing ? 'Edit Series' : 'Create New Series'}</h1>
      </header>

      <main>
        <SeriesForm
          initialData={seriesData}
          onSave={handleSave}
          onPublish={handlePublish}
        />

        {isEditing && (
          <div className="chapter-section">
            <h2>Chapters</h2>
            <ChapterList
              chapters={chapters}
              isCreator={true}
              onEdit={handleChapterEdit}
              onDelete={handleChapterDelete}
            />
            <button onClick={handleAddNewChapter} className="btn btn-primary">
              Add New Chapter
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SeriesCreateEdit;