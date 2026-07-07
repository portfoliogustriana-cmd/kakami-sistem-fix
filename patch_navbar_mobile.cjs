const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Replace fixed with absolute to attach it properly to the sticky navbar
content = content.replace(
  /className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-white flex flex-col p-4 animate-in slide-in-from-top duration-300 overflow-y-auto"/g,
  'className="lg:hidden absolute top-full left-0 right-0 h-[calc(100vh-4rem)] z-40 bg-white flex flex-col p-4 animate-in slide-in-from-top duration-300 overflow-y-auto border-b border-black shadow-xl"'
);

fs.writeFileSync('src/components/Navbar.tsx', content);
