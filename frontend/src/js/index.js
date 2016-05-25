import React from 'react'
import ReactDOM from 'react-dom'

import './helpers/debug'
import { playMedia } from './helpers/video'
import App from './app'

const container = document.getElementById('app')

ReactDOM.render(<App playMedia={playMedia} />, container)
