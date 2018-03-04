import crypto from 'crypto'
import mime from 'mime'
import multer from 'multer'
import fs from 'fs'
import path from 'path'

const UPLOAD_IMAGE_PATH = './uploads/images'

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_IMAGE_PATH)
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    })
  }
})

const imageFilter = function (req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    req.imageFilterError = { code: 302, desc: 'only allow image extension' }
    return cb(null, false)
  }
  cb(null, true)
}

const imageUpload = multer({ storage: imageStorage, fileFilter: imageFilter })

export default ({ app, DB }) => {
  // upload an image
  app.post('/api/image/upload', imageUpload.single('image'), (req, res, next) => {
    const caller = req.user

    if (caller && caller.roles.staff) {
      if (req.imageFilterError) {
        res.send({
          success: false,
          errCode: req.imageFilterError.code
        })
        .status(400)
      } else {
        res.send({
          success: true,
          data: {
            filename: req.file.filename
          }
        })
        .status(200)
      }
    } else {
      res.send({
        success: false,
        errCode: 101
      })
      .status(403)
    }
    next()
  })

  app.get('/api/image/:filename', (req, res) => {
    const mimetype = mime.lookup(`./uploads/${req.params.filename}`)
    
    res.setHeader('Content-Type', mimetype)
    fs.createReadStream(path.join(UPLOAD_IMAGE_PATH, req.params.filename)).pipe(res);
    // res.sendFile(path.resolve(`./uploads/${req.params.filename}`))
    // res.sendFile(path.resolve(`./uploads/images/${req.params.filename}`))
  })
}