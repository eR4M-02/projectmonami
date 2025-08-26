import React from 'react';
import { BookOpen } from 'lucide-react';

const SeriesIndex = () => {
  return (
    <div className="container" style={{ padding: 'var(--spacing-xl) var(--spacing-md)', textAlign: 'center' }}>
      <BookOpen size={64} style={{ color: 'var(--gray-600)', margin: '0 auto var(--spacing-lg)' }} />
      <h1 style={{ marginBottom: 'var(--spacing-md)' }}>Browse Series</h1>
      <p className="text-muted">Reader interface coming in Stage 3...</p>
    </div>
  );
};

export default SeriesIndex;