// eslint-disable-next-line @typescript-eslint/no-var-requires
const shell = require('shelljs')

const dirPath = 'lib/whisper.cpp/build/Release'
const file1 = 'whisper-addon.node'
const file2 = 'libwhisper.dylib'

const file1Exists = shell.test('-e', `${dirPath}/${file1}`)
const file2Exists = shell.test('-e', `${dirPath}/${file2}`)

if (!file1Exists || !file2Exists) {
  if (!shell.test('-e', 'lib/whisper.cpp')) {
    shell.exec(
      'git clone https://github.com/jrsarath/whisper.cpp lib/whisper.cpp'
    )
  }
  shell.cd('lib/whisper.cpp/examples/addon.node')
  shell.exec('npm install')
  shell.exec('npm run build')
}
