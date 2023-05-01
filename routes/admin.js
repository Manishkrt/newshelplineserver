import express from 'express';
import { createAdmin,  loginAdmin, updateadmin} from '../controller/admin.js'


const router = express.Router();

router.post('/', createAdmin)
router.post('/update', updateadmin)
router.post('/login', loginAdmin)

export default router  