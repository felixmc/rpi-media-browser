export function parseFileName (filename = '') {
  // remove extension
  let name = filename.substr(0, filename.lastIndexOf('.'))
  return parseTitle(name)
}

export function parseTitle (title = '') {
  // remove non-word characters
  title = title.replace(/\W/g, ' ')

  // replace multiple spaces
  title = title.replace(/\s{2,}/g, ' ')

  return title.trim()
}

export function tmdbToMedia (result) {
  const media = {
    imdb_id: result.get('id'),
    title: result.get('title'),
    categories: result.get('categories'),
    description: result.get('overview'),
    year: result.get('year'),
    rating: result.get('vote_average'),
    backdropImage: result.get('backdrop_path'),
    coverImage: result.get('poster_path'),
    mediaFiles: [],
  }

  return media
}
