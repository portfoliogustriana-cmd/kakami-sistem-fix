import { relations } from 'drizzle-orm';
import { pgTable, serial, text, integer, timestamp, varchar, real, json } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').unique(), // Firebase Auth UID (bisa null jika masih login manual, tapi sebaiknya diisi saat migrasi ke Firebase Auth)
  username: text('username').notNull().unique(),
  email: text('email'),
  nama_lengkap: text('nama_lengkap').notNull(),
  role: text('role').notNull(),
  no_wa: text('no_wa').notNull(),
  password: text('password'),
  pin_keamanan: text('pin_keamanan'),
  created_at: timestamp('created_at').defaultNow(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  invoice_no: text('invoice_no').notNull().unique(),
  tanggal_order: text('tanggal_order').notNull(),
  nama_konsumen: text('nama_konsumen').notNull(),
  no_telepon: text('no_telepon').notNull(),
  nama_order: text('nama_order').notNull(),
  jenis_produk: text('jenis_produk').notNull(),
  harga_satuan: integer('harga_satuan').notNull(),
  jumlah_pcs: integer('jumlah_pcs').notNull(),
  diskon: integer('diskon').notNull().default(0),
  total_harga: integer('total_harga').notNull(),
  dp: integer('dp').notNull().default(0),
  detail_pesanan: text('detail_pesanan').notNull(),
  status_bayar: text('status_bayar').notNull(), // "DP" | "Lunas"
  status_tracking: text('status_tracking').notNull(), // "DP" | "Produksi" | "Jait" | "Checking" | "Selesai"
  kendala_produksi: text('kendala_produksi'),
  last_updated_status: text('last_updated_status'),
  hpp_items: json('hpp_items'), // array of HppItem
  bahan_utama: text('bahan_utama'),
  bentuk_kerah: text('bentuk_kerah'),
  deadline_kerja: text('deadline_kerja'),
  created_at: timestamp('created_at').defaultNow(),
});

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  no_player: text('no_player').notNull(),
  nama_player: text('nama_player').notNull(),
  nama_punggung: text('nama_punggung').notNull(),
  size: text('size').notNull(),
  lengan: text('lengan').notNull(),
  gender: text('gender').notNull(),
  keterangan: text('keterangan').notNull(),
  created_at: timestamp('created_at').defaultNow(),
});

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  jenis: text('jenis').notNull(), // "Pemasukan" | "Pengeluaran"
  kategori: text('kategori').notNull(),
  nominal: integer('nominal').notNull(),
  tanggal: text('tanggal').notNull(),
  keterangan: text('keterangan').notNull(),
  created_at: timestamp('created_at').defaultNow(),
});

export const payrolls = pgTable('payrolls', {
  id: serial('id').primaryKey(),
  tipe: text('tipe'), // "Borongan" | "Karyawan"
  nama_pegawai: text('nama_pegawai').notNull(),
  peran: text('peran').notNull(),
  status_bayar: text('status_bayar').notNull(),
  jumlah: integer('jumlah').notNull(),
  tanggal: text('tanggal').notNull(),
  keterangan: text('keterangan').notNull(),
  kehadiran: integer('kehadiran'),
  gaji_per_hari: integer('gaji_per_hari'),
  uang_makan: integer('uang_makan'),
  uang_lembur: integer('uang_lembur'),
  jam_kerja: integer('jam_kerja'),
  uang_makan_per_jam: integer('uang_makan_per_jam'),
  uang_makan_per_hari: integer('uang_makan_per_hari'),
  jam_telat: integer('jam_telat'),
  potongan_per_jam: integer('potongan_per_jam'),
  attendance_logs: json('attendance_logs'), // array
  borongan_items: json('borongan_items'), // array
  created_at: timestamp('created_at').defaultNow(),
});

export const hutangs = pgTable('hutangs', {
  id: serial('id').primaryKey(),
  nama_supplier: text('nama_supplier').notNull(),
  nominal: integer('nominal').notNull(),
  jatuh_tempo: text('jatuh_tempo').notNull(),
  status: text('status').notNull(), // "Belum Lunas" | "Lunas"
  keterangan: text('keterangan').notNull(),
  created_at: timestamp('created_at').defaultNow(),
});

export const kontrakKaryawan = pgTable('kontrak_karyawan', {
  id: serial('id').primaryKey(),
  nama_karyawan: text('nama_karyawan').notNull(),
  posisi: text('posisi').notNull(),
  tanggal_mulai: text('tanggal_mulai').notNull(),
  tanggal_selesai: text('tanggal_selesai').notNull(),
  gaji_pokok: integer('gaji_pokok').notNull(),
  status: text('status').notNull(), // "Aktif" | "Habis" | "Akan Habis"
  keterangan: text('keterangan').notNull(),
  created_at: timestamp('created_at').defaultNow(),
});

export const ordersRelations = relations(orders, ({ many }) => ({
  orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.order_id],
    references: [orders.id],
  }),
}));
