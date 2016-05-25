const exec = global.require('child_process').exec

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
  const wp1 = i3ws(1)
  const command = `xterm -fullscreen -fg black -bg black -e omxplayer -o hdmi -r ${path} && ${wp1} || ${wp1}}`
  return `${i3ws(2)} && ${i3exec(command)}`
}

export function playMedia (media) {
  exec(i3playVideo(media))
}
