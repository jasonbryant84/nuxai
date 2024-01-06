interface mediaType {
  contentType: string;
  url: string;
}
export const stubMediaType = (urlSearch: string, url: string): mediaType => {
  if (urlSearch.includes('type=video'))
    return {
      contentType: 'video/mp4',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    };
  if (urlSearch.includes('type=audio'))
    return {
      contentType: 'audio/mpeg',
      url: 'https://www.w3schools.com/html/horse.mp3',
    };
  if (urlSearch.includes('type=json'))
    return {
      contentType: 'application/json',
      url: 'https://jsonplaceholder.typicode.com/posts',
    };

  return {
    contentType: 'image/png',
    url,
  };
};
