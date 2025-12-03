import jwt from "jsonwebtoken";
export const JWT_SECRET = "SUPERSEGREDO-MUDA-ISSO";

export const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token ausente" });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Acesso apenas para administradores" });

  next();
};
