import { execSync } from 'child_process';

const url = "https://framerusercontent.com/images/15W9Kpj3a6XvvjEspc04YPpIT4.webp?lossless=1&width=3840&height=2160";
const filepath = "test-download-full.webp";
const cmd = `curl -L -f -v -H "User-Agent: Mozilla/5.0" -o "${filepath}" "${url}"`;

console.log("Running:", cmd);

try {
    const output = execSync(cmd, { encoding: 'utf8' });
    console.log("Success!", output);
} catch (e) {
    console.error("Failed!");
    console.error("Stderr:", e.stderr);
    console.error("Stdout:", e.stdout);
    console.error("Message:", e.message);
}
