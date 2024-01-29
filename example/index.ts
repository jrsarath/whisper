import whisper from '../dist'

whisper({
  model: '/Users/sarath/Documents/GitHub/Aura/models/whisper-medium.bin',
  file: '/Users/sarath/Documents/GitHub/Aura/src/sports2.wav',
}).then((r) => console.log(r))
