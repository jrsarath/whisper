const path = require('path')
const { whisper } = require(path.join(
  __dirname,
  '../../build/Release/whisper-addon'
))
const { promisify } = require('util')

const whisperAsync = promisify(whisper)

const whisperParams = {
  l: 'en',
  m: null,
  f: '../../samples/jfk.wav',
  ug: true,
}

const arguments = process.argv.slice(2)
const params = Object.fromEntries(
  arguments.reduce((pre, item) => {
    if (item.startsWith('-')) {
      return [...pre, item.slice(1).split('=')]
    }
    return pre
  }, [])
)
for (const key in params) {
  if (whisperParams.hasOwnProperty(key)) {
    whisperParams[key] = params[key]
  }
}
whisperAsync(whisperParams).then((result) => {
  console.log('result', result)
})
