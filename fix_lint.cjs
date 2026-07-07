const fs = require('fs');

let schema = fs.readFileSync('src/db/schema.ts', 'utf8');
schema = schema.replace(/orderItems\.orderId/g, 'orderItems.order_id');
fs.writeFileSync('src/db/schema.ts', schema);

let tracking = fs.readFileSync('src/pages/Tracking.tsx', 'utf8');
tracking = tracking.replace(/const stored = getStoredData\(\);/g, 'const stored = await getStoredData();');
fs.writeFileSync('src/pages/Tracking.tsx', tracking);

