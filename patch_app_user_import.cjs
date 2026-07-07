const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(
  "} from \"./lib/storage\";",
  "  User,\n} from \"./lib/storage\";"
);
fs.writeFileSync('src/App.tsx', app);
