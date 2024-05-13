export const API_URL = 'https://jsonplaceholder.typicode.com/';

export const ServicesUrls = {
  // post
  PAGINATED_LIST_OF_POSTS: 'posts?_page={pageNumber}&_per_page={pageSize}',
  LIST_OF_POSTS: 'posts',
  POSTS_BY_USER_ID: 'posts?userId={userId}',
  DELETE_POST: 'posts/',

  //album
  LIST_OF_ALBUMS: 'albums',
  ALBUMS_BY_USER_ID: 'albums?userId={userId}',
  DELETE_ALBUM: 'albums/',

  //photos
  LIST_OF_PHOTOS: 'photos',
  PHOTOS_BY_ALBUM_ID: 'photos?albumId={userId}',
  DELETE_PHOTO: 'photos/',

  GET_CURRENT_USER: 'users/',
};
