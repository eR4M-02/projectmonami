import React from 'react';

const SeriesDisplay = ({ seriesData }) => {
  return (
    <div className="series-display">
      <h1>{seriesData.title}</h1>
      {seriesData.coverPreview && (
        <img src={seriesData.coverPreview} alt={`Cover for ${seriesData.title}`} className="series-cover" />
      )}
      <p className="series-description">{seriesData.description}</p>
      <div className="series-tags">
        {seriesData.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      <p className="series-status">Status: {seriesData.status}</p>
    </div>
  );
};

export default SeriesDisplay;