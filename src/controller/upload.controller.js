const { response } = require("../helper/common")

const uploadSingle = (req, res, next) => {

    const filename = req.body.filename
    const data = {
        file: `http://localhost:3000/file/`+ req.file.filename,
        setName: filename
    }

    response(res, data, 201, 'Upload Image Success!!')
} 

const updateUpload = (req, res, next) => {
    const { fileId } = req.params;
    const { filename } = req.body;

    const updateData = {
        fileId,
        filename,
        message: 'File information updated successfully'
    };

    response(res, updateData, 200, 'Updated Image Success!!')
};

const deleteUpload = (req, res, next) => {
    const { fileId } = req.params;

    const deleteData = {
        fileId,
        message: 'File Delete Successfully'
    };
    response(res, deleteData, 200, 'Delete Image Success!!');
}


module.exports = {
    uploadSingle,
    updateUpload,
    deleteUpload
}