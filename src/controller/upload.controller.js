const { response } = require("../helper/common");
const cloudinary = require("../configs/cloudinary.config");

// eslint-disable-next-line no-unused-vars
const uploadSingle = (req, res, next) => {
    const filename = req.body.filename;

    cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) {
            return next(error);
        } else {
            const data = {
                file: result.secure_url,
                setName: filename
            };

            response(res, data, 201, 'Upload Image Success!!');
        }
    }).end(req.file.buffer);
};

const updateUpload = (req, res, next) => {
    const { fileId } = req.params;
    const filename = req.body.filename;

    if (!req.file) {
        return response(res, { message: 'No file uploaded' }, 400, 'Update Image Failed');
    }

    cloudinary.uploader.upload_stream({ public_id: fileId, resource_type: 'image', overwrite: true }, (error, result) => {
        if (error) {
            return next(error);
        } else {
            const updateData = {
                fileId: result.public_id,
                file: result.secure_url,
                setName: filename
            };

            response(res, updateData, 200, 'Updated Image Success!!');
        }
    }).end(req.file.buffer);
};


module.exports = {
    uploadSingle,
    updateUpload,
};
