import path from 'path'
import { promisify } from 'util'
import { Params, Transcript, Whisper } from './types'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Whisper: WhisperCTX } = require(
  path.join(__dirname, '../lib/whisper.cpp/build/Release/whisper-addon.node')
)

const whisperInstance = promisify(WhisperCTX)
const defaultParams: Params = {
  language: 'en',
  model: path.join(__dirname, '../lib/whisper-tiny.bin'),
  file: path.join(__dirname, '../lib/a13.wav'),
  use_gpu: true,
  debug: false,
}

const whisper: Whisper = (args: Params) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<Transcript>(async (resolve, reject) => {
    try {
      const params = {
        ...defaultParams,
      }
      for (const key in args) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          params[key] = args[key]
        }
      }
      const transcript: Transcript = await whisperInstance(params)
      resolve(transcript)
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}
export default whisper
