import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChapterEditor = () => {
  return (
    <div className="container" style={{ padding: 'var(--spacing-xl) var(--spacing-md)' }}>
      <div className="flex items-center gap-md" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <Link to="/creator" className="btn btn-ghost">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <h1>Chapter Editor</h1>
      </div>
      <div className="card">
        <p className="text-muted">Chapter editor with drag-and-drop coming soon...</p>
      </div>
    </div>
  );
};

export default ChapterEditor;