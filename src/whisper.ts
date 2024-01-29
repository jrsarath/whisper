import path from 'path'
import url from 'url'
import { promisify } from 'util'
import { Params, Transcript, Whisper } from './types'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Whisper: WhisperCTX } = require(
  url.fileURLToPath(new URL('../lib/whisper.node', import.meta.url))
)

const whisperInstance = promisify(WhisperCTX)
const defaultParams: Params = {
  language: 'en',
  model: path.resolve('./lib/whisper-tiny.bin'),
  file: path.resolve('./lib/a13.wav'),
  use_gpu: true,
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
