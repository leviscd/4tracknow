import sqlite3 from "sqlite3";
sqlite3.verbose();

const db = new sqlite3.Database("./database.db");

// Criar tabelas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('admin', 'user')) NOT NULL DEFAULT 'user',
      created_at TEXT NOT NULL,
      expires_at TEXT
    )
  `);

  // Verificar se existe pelo menos um admin
  db.get("SELECT COUNT(*) as count FROM users WHERE role = 'admin'", async (err, row) => {
    if (err) {
      console.error("Erro ao verificar admins:", err);
      return;
    }

    // Se não houver nenhum admin, criar um admin padrão
    if (row.count === 0) {
      const bcrypt = await import("bcryptjs");
      const defaultPassword = await bcrypt.default.hash("admin123", 10);
      
      db.run(
        `INSERT INTO users (name, username, password, role, created_at, expires_at) 
         VALUES (?, ?, ?, ?, datetime('now'), NULL)`,
        ["Administrador", "admin", defaultPassword, "admin"],
        function(err) {
          if (err) {
            console.error("❌ Erro ao criar admin padrão:", err);
          } else {
            console.log("✅ Admin padrão criado!");
            console.log("   Username: admin");
            console.log("   Senha: admin123");
            console.log("   ⚠️  IMPORTANTE: Altere essa senha após o primeiro login!");
          }
        }
      );
    }
  });
});

export default db;