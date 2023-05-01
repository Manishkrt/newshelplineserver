import express from 'express';
import { createNews, editnews, getnews, updatenews, deletenews, statusnews, viewnews, searchNews} from '../controller/news.js'

import multer from 'multer'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "public/news/") 
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`) 
    }
  })
const upload = multer({ storage: storage })


const router = express.Router();

router.post('/', upload.fields([{name :"image1", maxCount: 1 }, {name : "image2", maxCount: 1}]), createNews) 
router.get('/',  getnews) 
router.get('/:id',  editnews) 
router.put('/update/:id', upload.fields([{name :"image1", maxCount: 1 }, {name : "image2", maxCount: 1}]),  updatenews) 
router.delete('/delete/:id', deletenews)
router.post('/status/:id', statusnews)
router.post('/view/:id', viewnews)
router.get('/search/:key', searchNews)

export default router