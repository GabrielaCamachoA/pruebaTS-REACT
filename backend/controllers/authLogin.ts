import { Request, Response } from "express";
import jwt from "jsonwebtoken"

// When installing Express, we also install its types (@types/express).
// This allows us to import Request and Response to correctly type the parameters.
// Then TypeScript knows that req is the client request and res is the server response.
export const login = (req: Request, res: Response) => {
  try{
    const { fullname, password } = req.body;

    // user and password validation
  if (fullname !== "Gabriela Camacho" || password !== "123456") {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

   // If the credentials are correct, we generate the token.
  // The .sign method allows us to create a token with the data we want to save,
  // in this case a name, a secret key, and an estimate of when it will expire.
  const token = jwt.sign({ fullname }, "secret", { expiresIn: "1d" });

  return res.json({
    message: "Login exitoso",
    token,
  });
  }catch(err){
    console.error("Error en el login", err);
    
  }
  
};

