// This file is responsible for communicating with the frontend and handling requests coming from it.

import express from "express";
import productsRoutes from "./routes/products.routes";
import usersRoutes from "./routes/users.routes";
import authRoutes from "./routes/auth.routes";
import cors from "cors"

const app = express()
// we use CORS to allow the frontend (at localhost:5173) to make requests to the backend.
app.use(cors({
     origin: "http://localhost:5173"
}))
// This allows the server to understand data in JSON format.
app.use(express.json()); 
app.use("/api", authRoutes)
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes)

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});

export default app