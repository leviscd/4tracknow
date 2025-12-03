import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "./db.js";
import { auth, isAdmin } from "./middleware.js";

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "SUPERSEGREDO-MUDA-ISSO";

// ==================== ROTA DE LOGIN ====================
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err) return res.status(500).json({ error: "Erro no servidor" });
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Senha incorreta" });

    // Verificar expiração
    if (user.expires_at && new Date(user.expires_at) < new Date()) {
      return res.status(403).json({ error: "Acesso expirado" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Retorna token e dados do usuário
    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
        expires_at: user.expires_at,
      },
    });
  });
});

// ==================== ROTA /ME ====================
app.get("/me", auth, (req, res) => {
  db.get(
    "SELECT id, name, username, role, expires_at, created_at FROM users WHERE id = ?",
    [req.user.id],
    (err, user) => {
      if (err) return res.status(500).json({ error: "Erro interno" });
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
      res.json(user);
    }
  );
});

// ==================== ADMIN: LISTAR TODOS OS USUÁRIOS ====================
app.get("/admin/users", auth, isAdmin, (req, res) => {
  db.all(
    "SELECT id, name, username, role, created_at, expires_at FROM users ORDER BY created_at DESC",
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Erro ao buscar usuários" });
      res.json({ users: rows });
    }
  );
});

// ==================== ADMIN: CRIAR NOVO USUÁRIO ====================
app.post("/admin/users", auth, isAdmin, async (req, res) => {
  const { name, username, password, role, expires_at } = req.body;

  // Validações
  if (!username || !name) {
    return res.status(400).json({ error: "Nome e username são obrigatórios" });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ error: "A senha deve ter no mínimo 6 caracteres" });
  }

  if (role && !["admin", "user"].includes(role)) {
    return res.status(400).json({ error: "Role inválido. Use 'admin' ou 'user'" });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const userRole = role || "user";
    const expiresAt = expires_at || null;

    db.run(
      `INSERT INTO users (name, username, password, role, created_at, expires_at) 
       VALUES (?, ?, ?, ?, datetime('now'), ?)`,
      [name, username, hash, userRole, expiresAt],
      function (err) {
        if (err) {
          if (err.message.includes("UNIQUE")) {
            return res.status(400).json({ error: "Username já existe" });
          }
          return res.status(500).json({ error: "Erro ao criar usuário" });
        }

        res.status(201).json({
          message: "Usuário criado com sucesso",
          user: {
            id: this.lastID,
            name,
            username,
            role: userRole,
            expires_at: expiresAt,
          },
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar senha" });
  }
});

// ==================== ADMIN: ATUALIZAR USUÁRIO ====================
app.put("/admin/users/:id", auth, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, username, password, role, expires_at } = req.body;

  // Validações
  if (role && !["admin", "user"].includes(role)) {
    return res.status(400).json({ error: "Role inválido. Use 'admin' ou 'user'" });
  }

  if (password && password.length < 6) {
    return res.status(400).json({ error: "A senha deve ter no mínimo 6 caracteres" });
  }

  try {
    // Busca o usuário atual
    db.get("SELECT * FROM users WHERE id = ?", [id], async (err, user) => {
      if (err) return res.status(500).json({ error: "Erro ao buscar usuário" });
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

      // Prepara os valores atualizados
      const updatedName = name || user.name;
      const updatedUsername = username || user.username;
      const updatedRole = role || user.role;
      const updatedExpiresAt = expires_at !== undefined ? expires_at : user.expires_at;

      // Hash da senha se fornecida
      let updatedPassword = user.password;
      if (password) {
        updatedPassword = await bcrypt.hash(password, 10);
      }

      // Atualiza o usuário
      db.run(
        `UPDATE users 
         SET name = ?, username = ?, password = ?, role = ?, expires_at = ?
         WHERE id = ?`,
        [updatedName, updatedUsername, updatedPassword, updatedRole, updatedExpiresAt, id],
        function (err) {
          if (err) {
            if (err.message.includes("UNIQUE")) {
              return res.status(400).json({ error: "Username já existe" });
            }
            return res.status(500).json({ error: "Erro ao atualizar usuário" });
          }

          if (this.changes === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
          }

          res.json({
            message: "Usuário atualizado com sucesso",
            user: {
              id: parseInt(id),
              name: updatedName,
              username: updatedUsername,
              role: updatedRole,
              expires_at: updatedExpiresAt,
            },
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar atualização" });
  }
});

// ==================== ADMIN: DELETAR USUÁRIO ====================
app.delete("/admin/users/:id", auth, isAdmin, (req, res) => {
  const { id } = req.params;

  // Impedir que o admin delete a si mesmo
  if (parseInt(id) === req.user.id) {
    return res.status(400).json({ error: "Você não pode deletar sua própria conta" });
  }

  db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: "Erro ao deletar usuário" });

    if (this.changes === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({
      message: "Usuário deletado com sucesso",
      deletedId: parseInt(id),
    });
  });
});

// ==================== ROTA DE TESTE ====================
app.get("/", (req, res) => {
  res.json({ message: "API 4Track rodando ✓" });
});

// ==================== SERVIDOR ====================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});