import { Transcript } from './transcript'
import { Params } from './params'

export type Whisper = (args: Params) => Promise<Transcript>
