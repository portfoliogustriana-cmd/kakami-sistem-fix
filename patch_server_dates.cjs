const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf8');

server = server.replace(/if \(data && data\.length > 0\) \{/g, `
if (data && data.length > 0) {
  data.forEach(item => {
    if (item.created_at) item.created_at = new Date(item.created_at);
  });
`);

server = server.replace(/if \(data\.orders && data\.orders\.length > 0\) await tx\.insert\(orders\)\.values\(data\.orders\);/g, `
        if (data.orders && data.orders.length > 0) {
          data.orders.forEach(o => { if (o.created_at) o.created_at = new Date(o.created_at); });
          await tx.insert(orders).values(data.orders);
        }
`);
server = server.replace(/if \(data\.orderItems && data\.orderItems\.length > 0\) await tx\.insert\(orderItems\)\.values\(data\.orderItems\);/g, `
        if (data.orderItems && data.orderItems.length > 0) {
          data.orderItems.forEach(o => { if (o.created_at) o.created_at = new Date(o.created_at); });
          await tx.insert(orderItems).values(data.orderItems);
        }
`);
server = server.replace(/if \(data\.transactions && data\.transactions\.length > 0\) await tx\.insert\(transactions\)\.values\(data\.transactions\);/g, `
        if (data.transactions && data.transactions.length > 0) {
          data.transactions.forEach(o => { if (o.created_at) o.created_at = new Date(o.created_at); });
          await tx.insert(transactions).values(data.transactions);
        }
`);
server = server.replace(/if \(data\.payroll && data\.payroll\.length > 0\) await tx\.insert\(payrolls\)\.values\(data\.payroll\);/g, `
        if (data.payroll && data.payroll.length > 0) {
          data.payroll.forEach(o => { if (o.created_at) o.created_at = new Date(o.created_at); });
          await tx.insert(payrolls).values(data.payroll);
        }
`);
server = server.replace(/if \(data\.hutang && data\.hutang\.length > 0\) await tx\.insert\(hutangs\)\.values\(data\.hutang\);/g, `
        if (data.hutang && data.hutang.length > 0) {
          data.hutang.forEach(o => { if (o.created_at) o.created_at = new Date(o.created_at); });
          await tx.insert(hutangs).values(data.hutang);
        }
`);
server = server.replace(/if \(data\.kontrak && data\.kontrak\.length > 0\) await tx\.insert\(kontrakKaryawan\)\.values\(data\.kontrak\);/g, `
        if (data.kontrak && data.kontrak.length > 0) {
          data.kontrak.forEach(o => { if (o.created_at) o.created_at = new Date(o.created_at); });
          await tx.insert(kontrakKaryawan).values(data.kontrak);
        }
`);

fs.writeFileSync('server.ts', server);
