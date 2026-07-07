const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Any function declaration that contains 'await' needs to be 'async'
  content = content.replace(/(const [a-zA-Z0-9_]+ = )(\([^)]*\) => {)/g, (match, p1, p2) => {
    // We check if the body of this function contains 'await'
    const matchIndex = content.indexOf(match);
    const bodyStart = matchIndex + match.length;
    let braceCount = 1;
    let i = bodyStart;
    while(braceCount > 0 && i < content.length) {
        if (content[i] === '{') braceCount++;
        else if (content[i] === '}') braceCount--;
        i++;
    }
    const bodySlice = content.substring(bodyStart, i);
    if (bodySlice.includes('await') && !match.includes('async')) {
        return p1 + 'async ' + p2;
    }
    return match;
  });

  fs.writeFileSync(filePath, content);
}
