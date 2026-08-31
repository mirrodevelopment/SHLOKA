const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');

try {
  execSync(`"${ffmpeg}" -ss 00:00:01 -i "src/assets/dress-1.mp4" -vframes 1 "src/assets/dress-1-frame.jpg" -y`);
  execSync(`"${ffmpeg}" -ss 00:00:01 -i "src/assets/dress-2.mp4" -vframes 1 "src/assets/dress-2-frame.jpg" -y`);
  console.log('Frames extracted successfully');
} catch (e) {
  console.error('Error:', e.message);
}
