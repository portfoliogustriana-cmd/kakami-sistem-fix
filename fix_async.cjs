const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Any function declaration that contains 'await' needs to be 'async'
  content = content.replace(/(const (syncData|handleAdd|handleSave|handleDelete|handle|clear)[a-zA-Z0-9_]* = )(\([^)]*\) => {)/g, (match, p1, p2, p3) => {
    // We check if the body of this function contains 'await'
    const matchIndex = content.indexOf(match);
    const bodyStart = matchIndex + match.length;
    const bodyEnd = bodyStart + 1500;
    const bodySlice = content.substring(bodyStart, bodyEnd);
    if (bodySlice.includes('await')) {
        return p1 + 'async ' + p3;
    }
    return match;
  });

  fs.writeFileSync(filePath, content);
}
