import whisper from '../dist'

whisper({
  model: '/Users/sarath/Documents/GitHub/Aura/models/whisper-medium.bin',
  file: '/private/var/folders/g6/2zhj5zfj7cl8jwf3pmzb_tt40000gp/T/output.wav',
}).then((r) => console.log(r))
