const fs = require('fs');
let content = fs.readFileSync('src/lib/storage.ts', 'utf8');

content = content.replace(/export const getStoredData = \(\) => \{[^]*?return \{ orders, orderItems, transactions, payroll, hutang, kontrak \};\n\};/m, `export const getStoredData = async () => {
  try {
    const response = await fetch('/api/data');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (e) {
    console.error('Failed to fetch data from API', e);
  }
  
  // Fallback to localStorage
  const o = localStorage.getItem("kakami_orders");
  const i = localStorage.getItem("kakami_order_items");
  const t = localStorage.getItem("kakami_transactions");
  const p = localStorage.getItem("kakami_payroll");
  const h = localStorage.getItem("kakami_hutang");
  const k = localStorage.getItem("kakami_kontrak");

  const safeParse = (str, fallback) => {
    if (!str) return fallback;
    try {
      return JSON.parse(str);
    } catch {
      return fallback;
    }
  };

  const orders = safeParse(o, DEFAULT_ORDERS);
  const orderItems = safeParse(i, DEFAULT_ORDER_ITEMS);
  const transactions = safeParse(t, DEFAULT_TRANSACTIONS);
  const payroll = safeParse(p, DEFAULT_PAYROLL);
  const hutang = safeParse(h, DEFAULT_HUTANG);
  const kontrak = safeParse(k, DEFAULT_KONTRAK);

  return { orders, orderItems, transactions, payroll, hutang, kontrak };
};`);

content = content.replace(/export const saveStoredData = \([^]*?kontrak \?\ localStorage\.setItem\("kakami_kontrak", JSON\.stringify\(kontrak\)\);\n\};/m, `export const saveStoredData = async (
  orders: Order[],
  orderItems: OrderItem[],
  transactions: Transaction[],
  payroll?: Payroll[],
  hutang?: Hutang[],
  kontrak?: KontrakKaryawan[],
) => {
  localStorage.setItem("kakami_orders", JSON.stringify(orders));
  localStorage.setItem("kakami_order_items", JSON.stringify(orderItems));
  localStorage.setItem("kakami_transactions", JSON.stringify(transactions));
  if (payroll) localStorage.setItem("kakami_payroll", JSON.stringify(payroll));
  if (hutang) localStorage.setItem("kakami_hutang", JSON.stringify(hutang));
  if (kontrak) localStorage.setItem("kakami_kontrak", JSON.stringify(kontrak));

  try {
    await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orders,
        orderItems,
        transactions,
        payroll,
        hutang,
        kontrak
      })
    });
  } catch (e) {
    console.error('Failed to sync to API', e);
  }
};`);

fs.writeFileSync('src/lib/storage.ts', content);
