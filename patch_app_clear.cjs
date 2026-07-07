const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');

app = app.replace(/useEffect\(\(\) => \{/, "useEffect(() => { localStorage.removeItem('kakami_current_user');");

fs.writeFileSync('src/App.tsx', app);
