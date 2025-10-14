import { Request, Response } from "express";
import jwt from "jsonwebtoken"


export const login = (req: Request, res: Response) => {
  const { fullname, password } = req.body;


  if (fullname !== "Gabriela Camacho" || password !== "123456") {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  
  const token = jwt.sign({ fullname }, "secret", { expiresIn: "1d" });

  return res.json({
    message: "Login exitoso",
    token,
  });
};

