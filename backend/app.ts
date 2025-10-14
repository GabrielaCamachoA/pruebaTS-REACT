// este archivo es el encargado de comunicarse con el frontend y manejar las solicitudes que lleguen desde él.

import express from "express";
import productsRoutes from "./routes/products.routes";
import usersRoutes from "./routes/users.routes";
import authRoutes from "./routes/auth.routes";
import cors from "cors"

const app = express()
// utilizamos cors para permitir que el frontend (en localhost:5173) haga peticiones al backend
app.use(cors({
     origin: "http://localhost:5173"
}))
// esto permite que el servidor entienda datos en formato json
app.use(express.json()); 
app.use("/api", authRoutes)
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes)

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});

export default app