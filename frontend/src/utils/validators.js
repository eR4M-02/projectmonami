// src/utils/validators.js

// This function validates the series form data
export const validateSeriesForm = (formData) => {
  // Initialize an empty object to store any validation errors
  const errors = {};

  // Check if the title is empty
  // If it is, add a 'title' property to the errors object with an error message
  if (!formData.title) errors.title = 'Title is required';

  // Check if the description is empty
  // If it is, add a 'description' property to the errors object with an error message
  if (!formData.description) errors.description = 'Description is required';

  // Check if the tags array is empty
  // If it is, add a 'tags' property to the errors object with an error message
  if (formData.tags.length === 0) errors.tags = 'At least one tag is required';

  // Check if the coverImage is null or undefined
  // If it is, add a 'coverImage' property to the errors object with an error message
  if (!formData.coverImage) errors.coverImage = 'Cover image is required';

  // Return the errors object
  // If it's empty, it means there were no validation errors
  return errors;
};

// This function validates the chapter form data
export const validateChapterForm = (formData) => {
  // Initialize an empty object to store any validation errors
  const errors = {};

  // Check if the chapter title is empty
  // If it is, add a 'title' property to the errors object with an error message
  if (!formData.title) errors.title = 'Chapter title is required';

  // Check if the chapter number is empty
  // If it is, add a 'number' property to the errors object with an error message
  if (!formData.number) errors.number = 'Chapter number is required';

  // Check if the pages array is empty
  // If it is, add a 'pages' property to the errors object with an error message
  if (formData.pages.length === 0) errors.pages = 'At least one page is required';

  // Return the errors object
  // If it's empty, it means there were no validation errors
  return errors;
};