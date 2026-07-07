import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { adminAuth } from "./src/lib/firebase-admin.ts";
import { db } from "./src/db/index.ts";
import { users, orders, orderItems, transactions, payrolls, hutangs, kontrakKaryawan } from "./src/db/schema.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload size for bulk sync
  app.use(express.json({ limit: '10mb' }));

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/users", async (req, res) => {
    try {
      const usersData = await db.select().from(users);
      res.json(usersData);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const data = req.body;
      await db.transaction(async (tx) => {
        await tx.delete(users);
        
if (data && data.length > 0) {
  data.forEach(item => {
    if (item.created_at) item.created_at = new Date(item.created_at);
  });

          await tx.insert(users).values(data);
        }
      });
      res.json({ success: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/api/users", async (req, res) => {
    try {
      const usersData = await db.select().from(users);
      res.json(usersData);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const data = req.body;
      await db.transaction(async (tx) => {
        await tx.delete(users);
        
if (data && data.length > 0) {
  data.forEach(item => {
    if (item.created_at) item.created_at = new Date(item.created_at);
  });

          await tx.insert(users).values(data);
        }
      });
      res.json({ success: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/api/data", async (req, res) => {
    try {
      const [
        ordersData,
        orderItemsData,
        transactionsData,
        payrollsData,
        hutangsData,
        kontrakData
      ] = await Promise.all([
        db.select().from(orders),
        db.select().from(orderItems),
        db.select().from(transactions),
        db.select().from(payrolls),
        db.select().from(hutangs),
        db.select().from(kontrakKaryawan)
      ]);

      res.json({
        orders: ordersData,
        orderItems: orderItemsData,
        transactions: transactionsData,
        payroll: payrollsData,
        hutang: hutangsData,
        kontrak: kontrakData
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/api/data", async (req, res) => {
    try {
      const data = req.body;
      
      await db.transaction(async (tx) => {
        // Simple brute force sync for this prototype: 
        // Delete all data and re-insert.
        await tx.delete(orderItems);
        await tx.delete(orders);
        await tx.delete(transactions);
        await tx.delete(payrolls);
        await tx.delete(hutangs);
        await tx.delete(kontrakKaryawan);
        
        
        if (data.orders && data.orders.length > 0) {
          data.orders.forEach(o => { if (o.created_at) o.created_at = new Date(o.created_at); });
          await tx.insert(orders).values(data.orders);
        }

        
        if (data.orderItems && data.orderItems.length > 0) {
          data.orderItems.forEach(o => { if (o.created_at) o.created_at = new Date(o.created_at); });
          await tx.insert(orderItems).values(data.orderItems);
        }

        
        if (data.transactions && data.transactions.length > 0) {
          data.transactions.forEach(o => { if (o.created_at) o.created_at = new Date(o.created_at); });
          await tx.insert(transactions).values(data.transactions);
        }

        
        if (data.payroll && data.payroll.length > 0) {
          data.payroll.forEach(o => { if (o.created_at) o.created_at = new Date(o.created_at); });
          await tx.insert(payrolls).values(data.payroll);
        }

        
        if (data.hutang && data.hutang.length > 0) {
          data.hutang.forEach(o => { if (o.created_at) o.created_at = new Date(o.created_at); });
          await tx.insert(hutangs).values(data.hutang);
        }

        
        if (data.kontrak && data.kontrak.length > 0) {
          data.kontrak.forEach(o => { if (o.created_at) o.created_at = new Date(o.created_at); });
          await tx.insert(kontrakKaryawan).values(data.kontrak);
        }

      });

      res.json({ success: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
