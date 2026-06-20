const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const sourceImg = path.join(publicDir, 'profile.png');
const targetWebp = path.join(publicDir, 'profile.webp');
const targetPngTmp = path.join(publicDir, 'profile_compressed.png');

async function main() {
  console.log('Compressing profile image...');
  if (!fs.existsSync(sourceImg)) {
    console.error(`Source profile.png not found at: ${sourceImg}`);
    return;
  }
  
  // 1. Convert to WebP
  await sharp(sourceImg)
    .webp({ quality: 80 })
    .toFile(targetWebp);
  console.log(`Successfully created ${targetWebp}`);

  // 2. Compress PNG as fallback
  await sharp(sourceImg)
    .png({ quality: 80, compressionLevel: 9 })
    .toFile(targetPngTmp);
  
  // Replace original
  fs.renameSync(targetPngTmp, sourceImg);
  console.log(`Successfully optimized and replaced ${sourceImg}`);
}

main().catch(err => {
  console.error('Error compressing images:', err);
  process.exit(1);
});
