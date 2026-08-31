const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');

try {
  // Extract 5 frames from dress-1
  for (let i = 1; i <= 5; i++) {
    execSync(`"${ffmpeg}" -ss 00:00:0${i} -i "src/assets/dress-1.mp4" -vframes 1 "src/assets/dress1_f${i}.jpg" -y`);
  }
  // Extract 5 frames from dress-2
  for (let i = 1; i <= 10; i += 2) {
    execSync(`"${ffmpeg}" -ss 00:00:${i < 10 ? '0' + i : i} -i "src/assets/dress-2.mp4" -vframes 1 "src/assets/dress2_f${i}.jpg" -y`);
  }
  console.log('Multiple frames extracted successfully');
} catch (e) {
  console.error('Error:', e.message);
}
