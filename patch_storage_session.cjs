const fs = require('fs');

let storage = fs.readFileSync('src/lib/storage.ts', 'utf8');

storage = storage.replace(/localStorage\.getItem\("kakami_current_user"\)/g, 'sessionStorage.getItem("kakami_current_user")');
storage = storage.replace(/localStorage\.setItem\("kakami_current_user"/g, 'sessionStorage.setItem("kakami_current_user"');
storage = storage.replace(/localStorage\.removeItem\("kakami_current_user"\)/g, 'sessionStorage.removeItem("kakami_current_user")');

fs.writeFileSync('src/lib/storage.ts', storage);
