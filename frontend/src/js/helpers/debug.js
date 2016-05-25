import Debug from 'debug'

function init (prefix, enable = true) {
  prefix = prefix + ':'
  const debug = Debug(prefix).bind(null, '')

  if (enable) {
    Debug.enable(prefix + '*')
  }

  debug.disable = Debug.disable.bind(null, prefix + '*')

  return debug
}

global.Debug = init
