import { Request, Response } from "express";
import jwt from "jsonwebtoken"
export const requireAuth = (req: Request, res: Response) =>{

   const authHeader = req.headers.authorization

   if (!authHeader) return res.status(401).json({
        message: "Unaunthorized"
   })

   
   const token = authHeader.split(" ")[1];

   if(!token) return res.status(401).json({
        message: "Unaunthorized"
   })

  
   jwt.verify(token, "secret", (err, user)=>{
    if(err) return res.status(401).json({
        message: "Unaunthorized"
   })
   })
    
}