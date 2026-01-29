import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public/images');
const ARCHIVE_DIR = path.join(__dirname, '../public/images/_archive');

// Ensure archive directory exists
if (!fs.existsSync(ARCHIVE_DIR)) {
    fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
}

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== '_archive') { // Skip the archive folder itself
                arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
            }
        } else {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

function archiveOriginals() {
    console.log('Starting archival of original images...');
    const allFiles = getAllFiles(PUBLIC_DIR);

    // Filter for original formats
    const candidates = allFiles.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.png', '.jpg', '.jpeg'].includes(ext);
    });

    let movedCount = 0;
    let movedBytes = 0;

    for (const file of candidates) {
        const dir = path.dirname(file);
        const ext = path.extname(file);
        const name = path.basename(file, ext);

        // Check if optimized version exists
        const optimizedPath = path.join(dir, `${name}.webp`);

        if (fs.existsSync(optimizedPath)) {
            // Construct destination path
            const relativePath = path.relative(PUBLIC_DIR, file);
            const destPath = path.join(ARCHIVE_DIR, relativePath);
            const destDir = path.dirname(destPath);

            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
            }

            const stats = fs.statSync(file);
            fs.renameSync(file, destPath);

            console.log(`📦 Archived: ${relativePath}`);
            movedCount++;
            movedBytes += stats.size;
        } else {
            console.log(`⚠️  Skipping (no WebP found): ${path.relative(PUBLIC_DIR, file)}`);
        }
    }

    console.log('-----------------------------------');
    console.log(`Total files archived: ${movedCount}`);
    console.log(`Total space cleaned: ${(movedBytes / 1024 / 1024).toFixed(2)} MB`);
}

archiveOriginals();
