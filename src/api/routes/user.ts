import UserController from "../controllers/user";
import { Router } from "express";
import asyncHandler from "../utils/asyncHandler";
import checkAuth from "../middleware/check-auth";

const router: Router = Router();

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

router.patch('/:userId', checkAuth, UserController.update_user);

router.delete('/', checkAuth, UserController.delete_user);

export default router;