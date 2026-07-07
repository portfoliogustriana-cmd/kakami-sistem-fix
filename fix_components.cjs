const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix component declarations made async
  content = content.replace(/const ([A-Z][a-zA-Z0-9_]*) = async \(\) => {/g, 'const $1 = () => {');

  // Fix useEffects with top level await
  content = content.replace(/useEffect\(\(\) => \{\s*const data = await getStoredData\(\);([^]*?)\}, \[([^\]]*)\]\);/g, (match, p1, p2) => {
      // Revert the await to just fetch inside an async function
      return `useEffect(() => {
    const load = async () => {
        const data = await getStoredData();
        ${p1}
    };
    load();
}, [${p2}]);`;
  });

  fs.writeFileSync(filePath, content);
}
