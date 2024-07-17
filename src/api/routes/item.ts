import ItemController from "../controllers/item";
import { Request, Router } from "express";
import asyncHandler from "../utils/asyncHandler";
import checkAuth from "../middleware/check-auth";
import multer, { FileFilterCallback, StorageEngine } from "multer";

const router: Router = Router();

const storage: StorageEngine = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        cb(null, './uploads');
    },
    filename: function(req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg')
    {
        cb(null, true);
    } else {cb(null, false)};
};

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter
});

router.get('/:itemId', asyncHandler(ItemController.get_item));

router.get('/', asyncHandler(ItemController.get_all_items));

router.get('/image/:itemId', asyncHandler(ItemController.get_image));

router.post('/', checkAuth, upload.single('itemImage'), asyncHandler(ItemController.create_item));

router.patch('/:itemId', checkAuth, upload.single('itemImage'), asyncHandler(ItemController.update_item));

router.delete('/:itemId', checkAuth, asyncHandler(ItemController.delete_item));

export default router;