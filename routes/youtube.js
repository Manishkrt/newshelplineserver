import express from 'express';
import { deleteyoutube, createyoutube, getyoutube} from '../controller/youtube.js'


const router = express.Router();

router.post('/', createyoutube)
router.get('/', getyoutube)
router.delete('/delete/:id', deleteyoutube)

export default router