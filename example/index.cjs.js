// eslint-disable-next-line @typescript-eslint/no-var-requires
const { default: whisper } = require('../dist/cjs/')

whisper().then((r) => console.log(r))
