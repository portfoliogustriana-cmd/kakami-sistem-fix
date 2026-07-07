const fs = require('fs');

let server = fs.readFileSync('server.ts', 'utf8');

server = server.replace('app.get("/api/data", async (req, res) => {', `app.get("/api/users", async (req, res) => {
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
          await tx.insert(users).values(data);
        }
      });
      res.json({ success: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/api/data", async (req, res) => {`);

fs.writeFileSync('server.ts', server);
