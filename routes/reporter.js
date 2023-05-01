import express from 'express';
import { createreporter, getreporter, loginReporter, sendotpReporter, statusReporter, searchReporter} from '../controller/reporter.js'
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

router.post('/', upload.fields([{name :"image", maxCount: 1 }]), createreporter)
router.get('/', getreporter)
router.post('/login', loginReporter)
router.post('/sendotp', sendotpReporter)
router.post('/status/:id', statusReporter)
router.get('/search/:key', searchReporter)

export default router