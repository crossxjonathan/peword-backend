/* eslint-disable no-unused-vars */
const {response} = require('../helper/common');
const { createHire, selectWorkerById, selectRecruiterById } = require('../models/hire');


// ADD HIRE
const addHire = async (req, res, next) => {
    const { message_purpose, name, email, phone, description, workers_id, recruiters_id } = req.body;

    try {
        const workerData = await selectWorkerById(workers_id);
        const recruiterData = await selectRecruiterById(recruiters_id);

        if (!workerData || !recruiterData) {
            return response(res, null, 404, 'Worker or Recruiter not found');
        }

        const data = {
            message_purpose,
            name,
            email,
            phone,
            description,
            workers_id,
            recruiters_id
        };

        const { rows } = await createHire(data);
        const newHire = rows[0];
        response(res, newHire, 201, 'Add Hire Successful!!');
    } catch (error) {
        console.log(error);
        return response(res, null, 500, 'Something wrong in adding data, Try again!!');
    }
};

// GET RECRUITER
const getRecruiter = async (req, res, next) => {
    try {
        const { rows } = await selectRecruiterById();
        console.log(rows);
        res.json({
            status: '200',
            data: rows,
            message: 'get hire with recruiters success!!'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: '500',
            message: 'Error fetching hire data for recruiters'
        });
    }
};


// GET WORKER
const getWorker = async (req, res, next) => {
    try {
        const { rows } = await selectWorkerById();
        console.log(rows);
        res.json({
            status: '200',
            data: rows,
            message: 'get hire with workers success!!'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: '500',
            message: 'Error fetching hire data for workers'
        });
    }
};



module.exports = {
    addHire,
    getRecruiter,
    getWorker
}