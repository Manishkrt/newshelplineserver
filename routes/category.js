import express from 'express';
import { createCategory, getcategory} from '../controller/category.js'


const router = express.Router();

router.post('/', createCategory)
router.get('/', getcategory)

export default router