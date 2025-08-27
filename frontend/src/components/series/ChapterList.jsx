// src/components/series/ChapterList.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';

const ChapterList = ({ chapters, seriesId, onDelete }) => {
  return (
    <div className="chapter-list">
      {chapters.length === 0 ? (
        <p>No chapters yet. Add your first chapter to get started!</p>
      ) : (
        <ul>
          {chapters.map((chapter) => (
            <li key={chapter.id} className="chapter-item">
              <span className="chapter-number">Chapter {chapter.number}</span>
              <span className="chapter-title">{chapter.title}</span>
              <div className="chapter-actions">
                <Link to={`/creator/series/${seriesId}/chapter/${chapter.id}/edit`} className="btn btn-sm btn-edit">
                  <Edit size={16} />
                </Link>
                <button onClick={() => onDelete(chapter.id)} className="btn btn-sm btn-delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChapterList;