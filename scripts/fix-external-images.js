import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '../src/data/case-studies');
const PUBLIC_PROJECTS_DIR = path.join(__dirname, '../public/images/Projects');

if (!fs.existsSync(PUBLIC_PROJECTS_DIR)) {
    fs.mkdirSync(PUBLIC_PROJECTS_DIR, { recursive: true });
}

function downloadImageWithCurl(url, filepath) {
    try {
        // Use -L to follow redirects, -f to fail on HTTP errors
        // Add a User-Agent just in case
        execSync(`curl -L -f -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36" -o "${filepath}" "${url}"`, { stdio: 'pipe' });
        return true;
    } catch (error) {
        console.error(`   ❌ Curl failed for ${url}`);
        return false;
    }
}

function processCaseStudies() {
    console.log('Starting external image download via CURL...');
    const files = fs.readdirSync(SRC_DIR).filter(file => file.endsWith('.js'));

    for (const file of files) {
        const filePath = path.join(SRC_DIR, file);
        let content = fs.readFileSync(filePath, 'utf-8');
        let originalContent = content; // Keep copy to check changes

        const regex = /"https:\/\/framerusercontent\.com\/[^"]+"/g;
        const matches = [...new Set(content.match(regex) || [])];

        if (matches.length > 0) {
            console.log(`Processing ${file}... found ${matches.length} external images.`);

            for (const matchWithQuotes of matches) {
                const url = matchWithQuotes.replace(/"/g, '');
                // Clean URL for filename
                const cleanUrl = url.split('?')[0];
                const ext = path.extname(cleanUrl) || '.webp';
                // Be safe with filename
                const safeUrlName = path.basename(cleanUrl, ext).replace(/[^a-zA-Z0-9-]/g, '');
                const filename = safeUrlName + ext;

                const prefix = file.replace('.js', '');
                const localFilename = `${prefix}-${filename}`;
                const localPath = path.join(PUBLIC_PROJECTS_DIR, localFilename);
                let publicPath = `/.netlify/images?url=/images/Projects/${localFilename}`;

                let success = false;
                if (fs.existsSync(localPath)) {
                    console.log(`   Skipping (exists): ${localFilename}`);
                    success = true;
                } else {
                    console.log(`   Downloading: ${url} -> ${localFilename}`);
                    success = downloadImageWithCurl(url, localPath);
                    if (!success) {
                        console.log(`   ⚠️ Download failed, falling back to remote URL proxy: ${url}`);
                        // If download fails, we treat it as success but use the remote URL
                        // We set success=true so the replacement happens below, 
                        // but we need to change how publicPath is defined for this case.
                        success = true;
                        // Override publicPath to use remote URL
                        // Note: We need to change the scope of publicPath or re-assign it. 
                        // Since publicPath is const, we need to change it to let above.
                    }
                }

                if (success) {
                    // Check if we are in the fallback case (file doesn't exist locally but success is true)
                    if (!fs.existsSync(localPath)) {
                        publicPath = `/.netlify/images?url=${url}`;
                    }
                    content = content.replace(matchWithQuotes, `"${publicPath}"`);
                }
            }

            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf-8');
                console.log(`   ✅ Updated ${file}`);
            } else {
                console.log(`   ℹ️  No changes made to ${file}`);
            }
        }
    }
    console.log('Done processing case studies.');
}

processCaseStudies();
