import { DEFAULT_ORDERS, DEFAULT_ORDER_ITEMS, DEFAULT_TRANSACTIONS, DEFAULT_PAYROLL, DEFAULT_HUTANG, DEFAULT_KONTRAK } from './src/lib/storage.ts';

const data = {
  orders: DEFAULT_ORDERS,
  orderItems: DEFAULT_ORDER_ITEMS,
  transactions: DEFAULT_TRANSACTIONS,
  payroll: DEFAULT_PAYROLL,
  hutang: DEFAULT_HUTANG,
  kontrak: DEFAULT_KONTRAK
};

fetch('http://127.0.0.1:3000/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}).then(res => {
  console.log('Seed success:', res.status);
});
