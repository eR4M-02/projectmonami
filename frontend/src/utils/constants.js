// Image upload constants
export const IMAGE_UPLOAD = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp']
};

// Chapter statuses
export const CHAPTER_STATUS = {
  INCOMPLETE: 'incomplete',
  DRAFT: 'draft',
  LIVE: 'live'
};

// Reading directions
export const READING_DIRECTION = {
  VERTICAL: 'vertical',
  HORIZONTAL_LTR: 'horizontal_ltr',
  HORIZONTAL_RTL: 'horizontal_rtl'
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login/',
    SIGNUP: '/api/auth/signup/',
    LOGOUT: '/api/auth/logout/',
    REFRESH: '/api/auth/refresh/'
  },
  SERIES: {
    LIST: '/api/series/',
    CREATE: '/api/series/',
    DETAIL: (id) => `/api/series/${id}/`,
    UPDATE: (id) => `/api/series/${id}/`,
    DELETE: (id) => `/api/series/${id}/`
  },
  CHAPTERS: {
    LIST: (seriesId) => `/api/series/${seriesId}/chapters/`,
    CREATE: (seriesId) => `/api/series/${seriesId}/chapters/`,
    DETAIL: (seriesId, chapterId) => `/api/series/${seriesId}/chapters/${chapterId}/`,
    UPDATE: (seriesId, chapterId) => `/api/series/${seriesId}/chapters/${chapterId}/`,
    DELETE: (seriesId, chapterId) => `/api/series/${seriesId}/chapters/${chapterId}/`
  },
  UPLOAD: {
    IMAGE: '/api/upload/image/',
    MULTIPLE: '/api/upload/multiple/'
  }
};