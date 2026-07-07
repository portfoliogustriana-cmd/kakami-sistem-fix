const fs = require('fs');
let content = fs.readFileSync('src/lib/storage.ts', 'utf8');

content = content.replace(/export const getStoredUsers = \(\): User\[\] => \{[^]*?return users;\n\};/m, `export const getStoredUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch('/api/users');
    if (response.ok) {
      const data = await response.json();
      if (data && data.length > 0) return data;
    }
  } catch (e) {
    console.error('Failed to fetch users from API', e);
  }

  const u = localStorage.getItem("kakami_users");
  let users: User[] = [];
  if (u) {
    try {
      users = JSON.parse(u);
    } catch (e) {
      console.error("Failed to parse users", e);
      users = DEFAULT_USERS;
    }
  } else {
    users = DEFAULT_USERS;
  }

  // Ensure Owner exists
  if (!users.find(u => u.role === 'Owner')) {
    const owner = DEFAULT_USERS.find(u => u.role === 'Owner');
    if (owner) users.push(owner);
  }

  localStorage.setItem('kakami_users', JSON.stringify(users));
  return users;
};`);

content = content.replace(/export const saveStoredUsers = \(users: User\[\]\) => \{\n  localStorage\.setItem\("kakami_users", JSON\.stringify\(users\)\);\n\};/m, `export const saveStoredUsers = async (users: User[]) => {
  localStorage.setItem("kakami_users", JSON.stringify(users));
  try {
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(users)
    });
  } catch (e) {
    console.error('Failed to sync users to API', e);
  }
};`);

fs.writeFileSync('src/lib/storage.ts', content);
