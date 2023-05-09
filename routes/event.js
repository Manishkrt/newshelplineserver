import express from 'express';
import { createEvent, getEvent, editEvent, updateEvent, deleteEvent, searchEvent } from '../controller/event.js'

import multer from 'multer'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "public/main/") 
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`) 
    }
  })
const upload = multer({ storage: storage })
const router = express.Router();


router.post('/', upload.fields([{name :"image", maxCount: 1 }]), createEvent) 
router.get('/',  getEvent) 
router.get('/:id',  editEvent)
router.put('/update/:id', upload.fields([{name :"image", maxCount: 1 }]),  updateEvent) 
router.delete('/delete/:id', deleteEvent)
router.get('/search/:key', searchEvent)

export default router