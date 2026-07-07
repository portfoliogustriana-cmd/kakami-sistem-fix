const fs = require('fs');

function fixAsync(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/const handle[a-zA-Z0-9_]* = \([^)]*\) => \{/g, (match) => {
    // If the body contains await, make it async
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
        return match.replace('=', '= async');
    }
    return match;
  });
  fs.writeFileSync(filePath, content);
}

fixAsync('src/pages/ManajemenUser.tsx');
fixAsync('src/pages/GantiPassword.tsx');
fixAsync('src/pages/Login.tsx');

