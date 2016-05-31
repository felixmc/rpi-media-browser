const MovieDB = global.require('moviedb')
import { tmdb } from './config'

const mdb = MovieDB(tmdb.key)
export let config = null

export function loadConfig () {
  return new Promise((resolve, reject) => {
    if (config) {
      resolve(config)
    } else {
      mdb.configuration((err, res) => {
        if (err) reject(err)
        else {
          config = res
          resolve(config)
        }
      })
    }
  })
}

function processItem (item) {
  const imgConf = config.images

  item.backdrop_path = item.backdrop_path && `${imgConf.base_url}${imgConf.backdrop_sizes[1]}${item.backdrop_path}`
  item.poster_path = item.poster_path && `${imgConf.base_url}${imgConf.poster_sizes[3]}${item.poster_path}`

  item.year = item.release_date.split('-')[0]
  item.vote_average = Math.round(item.vote_average * 5) / 10

  item.categories = item.genre_ids.map(id => {
    return tmdb.genres.find(genre => genre.id === id).name
  })

  return item
}

export function searchByTitle (query) {
  query = query.trim()

  return loadConfig()
    .then(() => {
      return new Promise((resolve, reject) => {
        mdb.searchMovie({ query }, (err, res) => {
          if (err) reject(err)
          else {
            const results = res.results.map(processItem)
            resolve(results)
          }
        })
      })
    })
}

export function searchById (id) {
  id = id.trim()

  return loadConfig()
    .then(() => {
      return new Promise((resolve, reject) => {
        mdb.movieInfo({ id }, (err, res) => {
          if (err) reject(err)
          else {
            resolve([processItem(res)])
          }
        })
      })
    })
}
