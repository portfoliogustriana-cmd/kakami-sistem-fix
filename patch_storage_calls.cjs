const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'pages');

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace synchronous getStoredData() inside useEffect
  if (content.includes('const data = getStoredData();')) {
    content = content.replace(/useEffect\(\(\) => \{\s*const data = getStoredData\(\);\s*(setOrders\(.*?;\n?|setTransactions\(.*?;\n?|setOrderItems\(.*?;\n?|setPayrolls\(.*?;\n?|setHutangs\(.*?;\n?)+\s*\}, \[\]\);/gs, (match) => {
      const inner = match.replace(/useEffect\(\(\) => \{/, '').replace(/\}, \[\]\);$/, '');
      const newInner = inner.replace('const data = getStoredData();', 'const data = await getStoredData();');
      return `useEffect(() => {
    const load = async () => {
      ${newInner}
    };
    load();
  }, []);`;
    });
    
    // Replace any other occurrences that might be in event handlers
    content = content.replace(/const data = getStoredData\(\);/g, 'const data = await getStoredData();');
    
    // For saveStoredData
    content = content.replace(/saveStoredData\(/g, 'await saveStoredData(');
    
    // Add async to handlers if they don't have it and use await
    content = content.replace(/const (handle[a-zA-Z0-9_]+) = \([^)]*\) => \{/g, (match) => {
        if (content.substring(content.indexOf(match), content.indexOf(match) + 500).includes('await')) {
            if (!match.includes('async')) {
                return match.replace('=', '= async');
            }
        }
        return match;
    });

    fs.writeFileSync(filePath, content);
  }
}
