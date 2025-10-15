import { Request, Response } from "express";
import jwt from "jsonwebtoken"
export const requireAuth = (req: Request, res: Response) =>{
// the authorization header containing the token is obtained
   const authHeader = req.headers.authorization

   if (!authHeader) return res.status(401).json({
        message: "Unaunthorized"
   })

   //Tokens usually come in the format “Bearer <token>,” so we separate them
   //because bearer indicates the type of authentication, followed by the token.
   const token = authHeader.split(" ")[1];

   if(!token) return res.status(401).json({
        message: "Unaunthorized"
   })

  //here, one of the methods from the jsonwebtoken library is used to verify the token.
   jwt.verify(token, "secret", (err, user)=>{
    if(err) return res.status(401).json({
        message: "Unaunthorized"
   })
   })
    
}