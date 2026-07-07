const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'pages');

['GantiPassword.tsx', 'Login.tsx', 'ManajemenUser.tsx'].forEach(file => {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Change synchronous getStoredUsers to await getStoredUsers
  content = content.replace(/const users = getStoredUsers\(\);/g, 'const users = await getStoredUsers();');
  // Change synchronous saveStoredUsers to await saveStoredUsers
  content = content.replace(/saveStoredUsers\(/g, 'await saveStoredUsers(');

  // Make sure the containing functions are async
  content = content.replace(/(const (handle[a-zA-Z0-9_]+) = \([^)]*\) => \{)/g, (match) => {
    const matchIndex = content.indexOf(match);
    const bodyStart = matchIndex + match.length;
    const bodySlice = content.substring(bodyStart, bodyStart + 1500);
    if (bodySlice.includes('await') && !match.includes('async')) {
      return match.replace('=', '= async');
    }
    return match;
  });
  
  // For useEffects
  content = content.replace(/useEffect\(\(\) => \{\s*const users = await getStoredUsers\(\);([^]*?)\}, \[([^\]]*)\]\);/g, (match, p1, p2) => {
      return `useEffect(() => {
    const load = async () => {
        const users = await getStoredUsers();
        ${p1}
    };
    load();
}, [${p2}]);`;
  });

  fs.writeFileSync(filePath, content);
});
