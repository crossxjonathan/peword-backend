const {response} = require('../helper/common');
const { createHire, selectRecruiter, selectWorker } = require('../models/hire');


// ADD HIRE
const addHire = async (req, res, next) => {

    const { message_purpose, name, email, phone, description, id, workers_id, recruiters_id } = req.body;

    const data = {
        id,
        message_purpose, 
        name, 
        email,
        phone,
        description,
        workers_id,
        recruiters_id
    };

    try {
        await createHire(data)
        response(res, data, 201, 'Add Hire Successful!!')
    } catch (error) {
        console.log(error);
        return response(res, data, 500, 'Something wrong in adding data, Try again!!')
    };
};


// GET RECRUITER
const getRecruiter = async (req, res, next) => {

    const { rows } = await selectRecruiter()
    res.json({
        status: '200',
        data: rows,
        message: 'get hire with recruiters success!!'
    })
};


// GET WORKER
const getWorker = async (req, res, next) => {

    const { rows } = await selectWorker()
    res.json({
        status: '200',
        data: rows,
        message: 'get hire with workers success!!'
    })
};


module.exports = {
    addHire,
    getRecruiter,
    getWorker
}