import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";
import readline from "readline";

const db = new sqlite3.Database("./database.db");
sqlite3.verbose();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function createAdmin() {
  console.log("\n🔐 Criar novo usuário ADMIN\n");

  const name = await question("Nome completo: ");
  const username = await question("Username (login): ");
  const password = await question("Senha (mín. 6 caracteres): ");

  if (!name || !username || !password) {
    console.log("❌ Todos os campos são obrigatórios!");
    rl.close();
    return;
  }

  if (password.length < 6) {
    console.log("❌ A senha deve ter no mínimo 6 caracteres!");
    rl.close();
    return;
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    db.run(
      `INSERT INTO users (name, username, password, role, created_at, expires_at) 
       VALUES (?, ?, ?, 'admin', datetime('now'), NULL)`,
      [name, username, hash],
      function (err) {
        if (err) {
          if (err.message.includes("UNIQUE")) {
            console.log("❌ Username já existe!");
          } else {
            console.log("❌ Erro ao criar admin:", err.message);
          }
        } else {
          console.log("\n✅ Admin criado com sucesso!");
          console.log(`   ID: ${this.lastID}`);
          console.log(`   Nome: ${name}`);
          console.log(`   Username: ${username}`);
          console.log(`   Role: admin\n`);
        }
        rl.close();
        db.close();
      }
    );
  } catch (error) {
    console.log("❌ Erro:", error.message);
    rl.close();
    db.close();
  }
}

createAdmin();