import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

const exec = window.require('child_process').exec

const container = document.getElementById('app')

function i3msg (msg) {
  return `i3-msg ${msg}`
}

function i3ws (num) {
  return i3msg(`workspace number ${num}`)
}

function i3exec (command) {
  return i3msg(`exec "${command}"`)
}

function i3playVideo (path) {
  const command = `xterm -fullscreen -fg black -bg black -e omxplayer -o hdmi -r ${path}; ${i3ws(1)}`
  return `${i3ws(2)} && ${i3exec(command)}`
}

const sampleVideo = '/home/pi/videos/sample.mp4'

function playMedia (item) {
  console.log('playing media:', item)
  exec(i3playVideo(sampleVideo))
}

ReactDOM.render(<App playMedia={playMedia} />, container)
