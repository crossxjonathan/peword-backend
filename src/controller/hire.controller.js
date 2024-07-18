/* eslint-disable no-unused-vars */
const { response } = require('../helper/common');
const { createHire, selectAll } = require('../models/hire');
const recruiters = require('../models/recruiters');
const workers = require('../models/workers');
const hire = require('../models/hire');

// ADD HIRE
const addHire = async (req, res, next) => {
    try {
        const emailUser = req.decoded.email;
        // console.log(emailUser, '<<<<<<<<<<<<<<<<<<<<<<emailUser');
        const { rows: [user] } = await recruiters.getUserByEmail(emailUser, { relation: 'recruiters' });
        // console.log(user, '<<<<<<<<<<<<<<<<<<<<<<add user');
        
        const { message_purpose, name, email, phone, description, id, workers_id } = req.body;

        const data = {
            id,
            message_purpose, 
            name, 
            email,
            phone,
            description,
            workers_id,
            recruiters_id: user.id
        };
    
        await createHire(data);
        response(res, data, 201, 'Add Hire Successful!!');
    } catch (error) {
        console.log(error);
        return response(res, null, 500, 'Something went wrong in adding data, Try again!!');
    }
};

// GET RECRUITER
const getRecruiter = async (req, res, next) => {
    try {
        const email = req.decoded.email;
        // console.log(email, '<<<<<<<<<<<<<<<<EMAIL RECRUITERS');
        const { rows: [user] } = await recruiters.getUserByEmail(email, { relation: 'recruiters' });
        // console.log(user, '<<<<<<<<<<<<<<<<<<<<<<USER RECRUITER');
        if (!user) {
            return res.status(404).json({
                status: '404',
                message: 'Recruiter not found'
            });
        }

        const { rows } = await hire.selectAll({ filterBy: 'recruiters_id', filterValue: user.id });
        res.json({
            status: '200',
            data: rows,
            message: 'Get hire with recruiters success!!'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: '500',
            message: 'Something went wrong, Try again!!'
        });
    }
};

// GET WORKER
const getWorker = async (req, res, next) => {
    try {
        const email = req.decoded.email;
        // console.log(email, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<email');
        const { rows: [user] } = await workers.getUserByEmail(email, { relation: 'workers' });
        // console.log(user, '<<<<<<<<<<<<<<<<<<<<<<USER WORKER');
        if (!user) {
            return res.status(404).json({
                status: '404',
                message: 'Worker not found'
            });
        }

        const { rows } = await hire.selectAll({ filterBy: 'workers_id', filterValue: user.users_id });
        res.json({
            status: '200',
            data: rows,
            message: 'Get hire with workers success!!'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: '500',
            message: 'Something went wrong, Try again!!'
        });
    }
};

module.exports = {
    addHire,
    getRecruiter,
    getWorker
};
