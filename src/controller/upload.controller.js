const { response } = require("../helper/common");
const cloudinary = require("../configs/cloudinary.config");

const uploadSingle = async(req, res, next)=>{
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      response(res, {file_url:result.secure_url }, 201, "Upload Image Success!!");
    } catch (error) {
      console.log(error);
      next(error);
    }
    }
    

module.exports = {
    uploadSingle,
};
