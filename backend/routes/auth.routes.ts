import { Router } from "express"
import { login } from "../controllers/authLogin"

const router = Router()

// definimos la ruta que ejecutará el controlador de login
router.post("/login", login)
export default router