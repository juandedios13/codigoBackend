const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })

  const upload = multer({storage:storage})

  exports.upload = upload.single('img')
  
  exports.uploadfile = (req,res)=>{
      res.json({
          data:'envio'
      })
  }