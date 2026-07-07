const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');

app = app.replace(
  "const [currentUser, setCurrentUser] = useState(getCurrentUser());",
  "const [currentUser, setCurrentUser] = useState<User | null>(null);"
);

// We can also clear session storage initially just in case
app = app.replace(
  "localStorage.removeItem('kakami_current_user');",
  "sessionStorage.removeItem('kakami_current_user');"
);

fs.writeFileSync('src/App.tsx', app);
