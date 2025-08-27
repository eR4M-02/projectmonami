import React from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';

const ChapterList = ({ chapters, isCreator, onEdit, onDelete, onAddNew }) => {
  return (
    <div className="chapter-list">
      <h2>Chapters</h2>
      {chapters.map(chapter => (
        <div key={chapter.id} className="chapter-item">
          <span>{chapter.title}</span>
          <span>Rating: {chapter.rating}</span>
          <span>Comments: {chapter.comments}</span>
          {isCreator && (
            <>
              <button onClick={() => onEdit(chapter.id)} className="btn btn-sm">
                <Edit size={14} />
              </button>
              <button onClick={() => onDelete(chapter.id)} className="btn btn-sm btn-danger">
                <Trash2 size={14} />
              </button>
            </>
          )}
        </div>
      ))}
      {isCreator && (
        <button onClick={onAddNew} className="btn btn-primary">
          <Plus size={14} /> Add New Chapter
        </button>
      )}
    </div>
  );
};

export default ChapterList;