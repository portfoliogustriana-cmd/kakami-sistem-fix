const http = require('http');

const data = [
  {
    id: 1,
    username: "admin",
    nama_lengkap: "Admin Kakami",
    role: "Admin",
    no_wa: "08123456789",
    password: "admin",
    pin_keamanan: "123456"
  },
  {
    id: 2,
    username: "owner",
    nama_lengkap: "Owner Kakami",
    role: "Owner",
    no_wa: "08571234567",
    password: "owner",
    pin_keamanan: "777777"
  },
  {
    id: 3,
    username: "operator",
    nama_lengkap: "Operator Kakami",
    role: "Operator",
    no_wa: "08987654321",
    password: "operator"
  }
];

const req = http.request({
  hostname: '127.0.0.1',
  port: 3000,
  path: '/api/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(JSON.stringify(data));
req.end();
