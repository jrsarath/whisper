import path from 'path'
import { promisify } from 'util'
import { Params, Transcript, Whisper } from './types'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Whisper: WhisperCTX } = require(path.resolve('./lib/whisper.node'))

const whisper: Whisper = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<Transcript>(async (resolve, reject) => {
    try {
      const whisper = promisify(WhisperCTX)
      const defaultParams: Params = {
        language: 'en',
        model: path.resolve('./lib/whisper-tiny.bin'),
        file: path.resolve('./lib/a13.wav'),
        use_gpu: true,
      }
      const args: Array<string> = process.argv.slice(2)
      const params: Params = Object.fromEntries(
        // @ts-ignore
        args.reduce((pre: Array<string>, item: string) => {
          if (item?.startsWith('--')) {
            return [...pre, item.slice(2).split('=')]
          }
          return pre
        }, [])
      )
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(defaultParams, key)) {
          defaultParams[key] = params[key]
        }
      }
      const transcript: Transcript = await whisper(defaultParams)
      resolve(transcript)
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}
export default whisper
