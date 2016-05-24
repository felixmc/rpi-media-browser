import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

const exec = window.require('child_process').exec

const container = document.getElementById('app')

const commands = {
  browserWorkspace: 'i3-msg workspace number 1',
  playerWorkspace: 'i3-msg workspace number 2',
  playMedia: 'i3-msg exec omxplayer',
}

const sampleVideo = '/home/pi/videos/sample.mp4'

function playMedia (item) {
  console.log('playing media:', item)
  exec(`${commands.playerWorkspace} && ${commands.playMedia} ${sampleVideo}`)
}

ReactDOM.render(<App playMedia={playMedia} />, container)
