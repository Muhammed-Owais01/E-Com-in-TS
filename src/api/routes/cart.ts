import { Router } from "express";
import checkAuth from "../middleware/check-auth";
import CartController from "../controllers/cart";
import asyncHandler from "../utils/asyncHandler";

const router: Router = Router();

router.get('/', checkAuth, asyncHandler(CartController.get_all_items));

router.post('/:itemId', checkAuth, asyncHandler(CartController.add_to_cart));

router.patch('/:itemId', checkAuth, asyncHandler(CartController.update_cart));

router.delete('/:itemId', checkAuth, asyncHandler(CartController.delete_from_cart));

export default router;
