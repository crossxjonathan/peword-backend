const multer = require('multer')
const maxSize = 1000000
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '-'+ file.originalname)
    },
  })
  
  const upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize }
   })

  module.exports = upload