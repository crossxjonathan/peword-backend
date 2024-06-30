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
    const { filename } = req.body;

    const updateData = {
        fileId,
        filename,
        message: 'File information updated successfully'
    };

    response(res, updateData, 200, 'Updated Image Success!!');
};

const deleteUpload = (req, res, next) => {
    const { fileId } = req.params;

    cloudinary.uploader.destroy(fileId, (error, result) => {
        if (error) {
            return next(error);
        } else {
            const deleteData = {
                fileId,
                message: 'File Delete Successfully'
            };
            response(res, deleteData, 200, 'Delete Image Success!!');
        }
    });
};

module.exports = {
    uploadSingle,
    updateUpload,
    deleteUpload
};
