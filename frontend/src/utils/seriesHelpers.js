// src/utils/seriesHelpers.js

export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const sortChaptersByNumber = (chapters) => {
  return [...chapters].sort((a, b) => a.number - b.number);
};