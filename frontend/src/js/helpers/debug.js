import Debug from 'debug'

Debug.enable('*')

function init (prefix) {
  prefix = prefix + ':'
  const debug = Debug(prefix).bind(null, '')

  debug.disable = Debug.disable.bind(null, prefix + '*')

  return debug
}

global.Debug = init
