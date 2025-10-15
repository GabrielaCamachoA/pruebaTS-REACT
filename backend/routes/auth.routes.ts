import { Router } from "express"
import { login } from "../controllers/authLogin"

const router = Router()

//  define the path that the login controller will execute.
router.post("/login", login)
export default router