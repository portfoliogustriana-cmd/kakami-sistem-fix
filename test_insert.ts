import { db } from "./src/db/index.ts";
import { users } from "./src/db/schema.ts";

async function run() {
  try {
    await db.insert(users).values([{
      id: 1, username: "admin", nama_lengkap: "Admin", role: "Admin", no_wa: "", password: "admin", created_at: "2026-07-07T09:05:39.930Z" as any
    }]);
    console.log("Success");
  } catch (e) {
    console.error(e);
  }
}
run();
