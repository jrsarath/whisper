import { Transcript } from './transcript.js'
import { Params } from './params.js'

export type Whisper = (args: Params) => Promise<Transcript>
