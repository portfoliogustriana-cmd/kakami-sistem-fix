const fs = require('fs');

function replaceAsync(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // getStoredUsers
  content = content.replace(/setUsers\(getStoredUsers\(\)\);/g, `
    getStoredUsers().then(u => setUsers(u));
  `);
  content = content.replace(/const users = getStoredUsers\(\);/g, `const users = await getStoredUsers();`);
  
  // saveStoredUsers
  content = content.replace(/saveStoredUsers\(/g, `await saveStoredUsers(`);
  
  fs.writeFileSync(filePath, content);
}

replaceAsync('src/pages/ManajemenUser.tsx');
replaceAsync('src/pages/GantiPassword.tsx');
replaceAsync('src/pages/Login.tsx');

let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(/const users = getStoredUsers\(\);/, 'const users = await getStoredUsers();');
appContent = appContent.replace(/const handleKeyDown = \(e: KeyboardEvent\) => \{/, 'const handleKeyDown = async (e: KeyboardEvent) => {');
fs.writeFileSync('src/App.tsx', appContent);

