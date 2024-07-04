/* eslint-disable no-unused-vars */
const { selectAllWorker, getWorker, removeWorker, uptodateWorker, getDetailWorker, updateUploadPhoto, getWorkerByEmail, getUserByEmail } = require('../models/workers');
const { response } = require('../helper/common');
const cloudinary = require("../configs/cloudinary.config");


// PROFILE
const profile = async (req, res, next) => {
    try {
        const email = req.decoded.email;
        // console.log(req.decoded, '<<<<<<<<<<<<<<<<<<<<<req.decoded.sub');
        const { rows: [user] } = await getUserByEmail(email);
        // console.log(user, "<<<<<<<<<<<<<<<<<<<<<profile");
        if (user) {
            res.json({ profile: user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET ALL WORKERS || PAGINATION || SEARCH || SORT || SORTBY
const getAllWorkers = async (req, res, next) => {
    try {
        // console.log(req.decoded.email);
        const page = parseInt(req.query.page || 1)
        const limit = parseInt(req.query.limit || 3)
        const offset = (page - 1) * limit;
        const search = req.query.search || '';
        const sort = req.query.order || 'ASC';
        const sortby = req.query.sortby || 'name';
        const { rows } = await selectAllWorker({
            limit,
            page,
            offset,
            search,
            sort,
            sortby
        })
        response(res, rows, 200, 'Get All Worker Successful!!')
    } catch (error) {
        console.log(error);
        const objErr = {
            message: 'something broke!!',
            statusCode: 500
        }
        next(objErr)
    }
};

// DELETE WORKER
const deleteWorker = async (req, res, next) => {
    const id = req.params.id
    try {
        await removeWorker(id)
        response(res, id, 200, 'Delete Worker Successful!!')
    } catch (error) {
        const objErr = {
            message: 'something broke!!',
            statusCode: 500
        }
        next(objErr)
    }
};

// UPDATE WORKER
const updateWorker = async (req, res, next) => {
    try {
        const email = req.decoded.email;
        const { rows: [user] } = await getUserByEmail(email);
        if (!user) {
            return response(res, null, 401, "User not found");
        }
        const data = req.body;
        await uptodateWorker(data, user.id);
        response(res, data, 200, "Profile Updated Successfully!!");
    } catch (error) {
        console.error(error);
        next(error);
    }
};


// UPDATE PHOTO WORKER
const updatePhotoWorker = async (req, res, next) => {
    try {
        const email = req.decoded.email;
        const { rows: [user] } = await getUserByEmail(email);
        if (!user) {
            return response(res, null, 401);
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        await updateUploadPhoto({ photo: result.secure_url }, user.id);
        response(res, { file_url: result.secure_url }, 201, "Profile Photo Updated Successfully!!");
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// DETAIL WORKER
const detailWorker = async (req, res, next) => {
    const id = req.params.id;
    try {
        const { rows: [worker] } = await getDetailWorker(id)
        response(res, worker, 200, 'Get Worker Successful!!')
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
        const objErr = {
            message: 'something broke!!',
            statusCode: 500
        }
        next(objErr)
    }
};

module.exports = {
    getAllWorkers,
    deleteWorker,
    updateWorker,
    detailWorker,
    updatePhotoWorker,
    profile
}