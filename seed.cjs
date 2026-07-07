const http = require('http');

const data = {
  orders: [
    {
      id: 1,
      invoice_no: "INV/20260621001",
      tanggal_order: "2026-06-21",
      nama_konsumen: "Sandi Mulya",
      no_telepon: "08123456789",
      nama_order: "Jersey Futsal M-Tech",
      jenis_produk: "Jersey",
      harga_satuan: 150000,
      jumlah_pcs: 12,
      diskon: 0,
      total_harga: 1800000,
      dp: 1800000,
      detail_pesanan: "Bahan Milano, kerah V-neck kombinasi rib, logo print DTF.",
      status_bayar: "Lunas",
      status_tracking: "Selesai",
      bahan_utama: "Milano Premium",
      bentuk_kerah: "V-Neck Kombinasi",
      deadline_kerja: "2026-06-28"
    }
  ],
  orderItems: [
    { id: 1, order_id: 1, no_player: '10', nama_player: 'Sandi', nama_punggung: 'SANDI', size: 'L', lengan: 'PENDEK', gender: 'PRIA', keterangan: 'Celana tali panjang' }
  ],
  transactions: [
    { id: 1, jenis: "Pemasukan", kategori: "Pelunasan", nominal: 1800000, tanggal: "2026-06-21", keterangan: "Pelunasan INV/20260621001" }
  ],
  payroll: [],
  hutang: [],
  kontrak: []
};

const req = http.request({
  hostname: '127.0.0.1',
  port: 3000,
  path: '/api/data',
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
