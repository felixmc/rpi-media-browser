const walk = global.require('walk').walk
const fs = global.require('fs')
const mv = global.require('mv')
const http = global.require('http')
const async = global.require('async')
const bytes = global.require('bytes')

import {data as dataConfig} from './config'
import * as helper from '../helpers/imports'

const exts = [
  '.avi',
  '.mp4',
  '.mov',
  '.mkv',
  '.ogm',
]

const debug = Debug('imports')

function parseImport (root, stats) {
  return {
    filename: stats.name,
    root: root,
    filepath: root + '/' + stats.name,
    size: bytes(stats.size),
  }
}

export function loadImports () {
  return new Promise((resolve, reject) => {
    const imports = []
    const walker = walk(dataConfig.imports_dir)

    walker.on('file', (root, stats, next) => {
      const matches = exts.find(ext => stats.name.endsWith(ext))

      if (matches) {
        imports.push(parseImport(root, stats))
      }

      next()
    })

    walker.on('errors', (root, stats, next) => {
      debug('error:', stats)
      next()
    })

    walker.on('end', () => {
      resolve(imports)
    })
  })
}

export function processImport (importFile, mediaData) {
  const title = helper.parseTitle(mediaData.title).replace(/ /g, '-')
  const mediaFile = title + '-' + mediaData.year + '-' + mediaData.imdb_id + '.media'
  const tempPath = dataConfig.tmp_dir + Date.now() + '-' + mediaFile + '/'
  const mediaPath = dataConfig.media_dir + mediaFile + '/'

  return new Promise((resolve, reject) => {
    async.series([
      // create media dir in tmp
      (cb) => fs.mkdir(tempPath, cb),

      // download cover image
      (cb) => {
        const coverFile = fs.createWriteStream(tempPath + 'cover.jpg')
        http.get(mediaData.coverImage, (res) => {
          res.pipe(coverFile)
          mediaData.coverImage = 'cover.jpg'
          coverFile.on('finish', () => coverFile.close(cb))
        }).on('error', cb)
      },

      // download backdrop image
      (cb) => {
        const backdropFile = fs.createWriteStream(tempPath + 'backdrop.jpg')
        http.get(mediaData.backdropImage, (res) => {
          res.pipe(backdropFile)
          mediaData.backdropImage = 'backdrop.jpg'
          backdropFile.on('finish', () => backdropFile.close(cb))
        }).on('error', cb)
      },

      // write imdb media data in that dir
      (cb) => {
        const mediaFileData = JSON.stringify(mediaData, null, '\t')
        fs.writeFile(tempPath + 'media.json', mediaFileData, cb)
      },

      // move movie file in media dir
      (cb) => {
        const movieFile = tempPath + importFile.get('filename')
        mv(importFile.get('filepath'), movieFile, cb)
      },

      // move media dir from tmp to media
      (cb) => mv(tempPath, mediaPath, cb),

    ], (err, results) => {
      if (err) reject(err)
      else resolve({ importFile, mediaData })
    })
  })
}
