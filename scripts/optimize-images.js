import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target specific directories or recursively search
const PUBLIC_DIR = path.join(__dirname, '../public/images');

// Function to recursively get all files
function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

async function optimizeImages() {
    console.log('Starting image optimization...');
    const allFiles = getAllFiles(PUBLIC_DIR);

    // Filter for processing
    const images = allFiles.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.png', '.jpg', '.jpeg'].includes(ext);
    });

    console.log(`Found ${images.length} images to optimize.`);

    let savedBytes = 0;

    for (const file of images) {
        const ext = path.extname(file);
        const dir = path.dirname(file);
        const name = path.basename(file, ext);
        const outputPath = path.join(dir, `${name}.webp`);

        // Skip if webp already exists (optional, but good for re-running)
        // if (fs.existsSync(outputPath)) {
        //   console.log(`Skipping ${name}${ext} - WebP already exists`);
        //   continue;
        // }

        try {
            const statsBefore = fs.statSync(file);

            await sharp(file)
                .resize({ width: 1920, withoutEnlargement: true }) // Limit max width
                .webp({ quality: 80, effort: 6 }) // High compression effort
                .toFile(outputPath);

            const statsAfter = fs.statSync(outputPath);
            const saved = statsBefore.size - statsAfter.size;
            savedBytes += saved;

            console.log(`✅ Optimized: ${name}${ext}`);
            console.log(`   Before: ${(statsBefore.size / 1024 / 1024).toFixed(2)} MB`);
            console.log(`   After:  ${(statsAfter.size / 1024 / 1024).toFixed(2)} MB`);
            console.log(`   Saved:  ${(saved / 1024 / 1024).toFixed(2)} MB`);

        } catch (error) {
            console.error(`❌ Failed to optimize ${file}:`, error);
        }
    }

    console.log('-----------------------------------');
    console.log(`Total space saved: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
    console.log('Optimization complete!');
}

optimizeImages();
