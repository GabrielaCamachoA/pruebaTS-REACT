import { Router } from "express"
import { getUsers, createUsers, updateUser, deleteUser } from "../controllers/userController";

const router = Router()

router.get("/", getUsers);
router.post("/", createUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
