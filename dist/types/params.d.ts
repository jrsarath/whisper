export type Params = {
  language?: string
  model: string
  file: string
  use_gpu?: boolean
  debug?: boolean
  [key: string]: string | boolean | null | undefined
}
