const { selectAllWorker, createWorker, removeWorker, uptodateWorker, getDetailWorker, findUserById } = require('../models/workers');
const { response } = require('../helper/common');

// PROFILE
const profile = async(req, res, next) => {
    const userid = req.decoded.sub
    // console.log(userid, 'userid');
    const {rows: [user]} = await findUserById(userid);
    delete user.password
    // console.log(user, "profile");
    if (user) {
        res.json({ profile: user });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}

// UPLOAD 
// const uploadProfilePic = (req, res, next) => {

// }

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

// ADD WORKER
const addWorker = async (req, res, next) => {
    const { name, description, job_desk, domicile, workplace, id } = req.body

    const validationCharacter = /^[a-zA-Z\s]*$/;

    if (!validationCharacter.test(name)) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation Name is Failed. do not use symbol in name!!'
        });
    }

    if (!validationCharacter.test(job_desk)) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation position is Failed. do not use symbol in position!!'
        });
    }

    if (!validationCharacter.test(domicile)) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation city is Failed. do not use symbol in city!!'
        });
    }

    const data = {
        id,
        name,
        description,
        job_desk,
        domicile,
        workplace
    };
    try {
        await createWorker(data)
        response(res, data, 201, 'Add Worker Successful!!')
    } catch (error) {
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
    const id = req.params.id;
    try {
        const { name, description, job_desk, domicile, workplace } = req.body;

        const data = {
            name,
            description,
            job_desk,
            domicile,
            workplace
        }

        await uptodateWorker(data, id)
        response(res, data, 200, 'Update Worker Successful!!')
    } catch (error) {
        const objErr = {
            message: 'something broke!!',
            statusCode: 500
        }
        next(objErr)
    }
};

// DETAIL WORKER
const detailWorker = async (req, res, next) => {
    const id = req.params.id;
    try {
        const { rows: [worker] } = await getDetailWorker(id)
        response(res, worker, 200, 'Get Worker Successful!!')
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
    addWorker,
    deleteWorker,
    updateWorker,
    detailWorker,
    profile
}