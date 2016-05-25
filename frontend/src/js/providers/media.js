const fs = window.require('fs')

import {data as dataConfig} from './config'

export const parseMediaData = (file) => {
  const mediaDir = dataConfig.media_dir + file + '/'
  const mediaInfo = mediaDir + 'media.json'
  return new Promise((resolve, reject) => {
    fs.readFile(mediaInfo, 'utf8', (err, data) => {
      if (err) reject(err)
      else {
        const jsonData = JSON.parse(data)
        jsonData.coverImage = mediaDir + jsonData.coverImage
        jsonData.mediaFiles = jsonData.mediaFiles.map(file => mediaDir + file)
        resolve(jsonData)
      }
    })
  })
}

export const loadMedia = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(dataConfig.media_dir, (err, files) => {
      if (err) reject(err)
      else {
        const mediaFiles = files.filter(file => file.endsWith('.media'))
        resolve(Promise.all(mediaFiles.map(parseMediaData)))
      }
    })
  })
}
