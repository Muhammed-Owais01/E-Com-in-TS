import UserController from "../controllers/user";
import { Router } from "express";
import asyncHandler from "../utils/asyncHandler";
import checkAuth from "../middleware/check-auth";

const router: Router = Router();

router.post('/signup', asyncHandler(UserController.user_signup));

router.post('/login', asyncHandler(UserController.user_login));

router.patch('/:userId', checkAuth, asyncHandler(UserController.update_user));

router.delete('/:userId', checkAuth, asyncHandler(UserController.delete_user));

export default router;