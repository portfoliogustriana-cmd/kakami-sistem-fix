const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace id: Date.now() with id: Math.floor(Date.now() / 1000)
  // Also Date.now() + 1, etc.
  content = content.replace(/Date\.now\(\)/g, 'Math.floor(Date.now() / 1000)');

  fs.writeFileSync(filePath, content);
}
