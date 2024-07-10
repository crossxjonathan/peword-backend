/* eslint-disable no-unused-vars */
const {response} = require('../helper/common');
const { createHire, selectAll } = require('../models/hire');
const recruiters = require('../models/recruiters');
const workers = require('../models/workers');
const hire = require('../models/hire');


// ADD HIRE
const addHire = async (req, res, next) => {

    try {
        const emailUser = req.decoded.email;
        console.log(emailUser, '<<<<<<<<<<<<<<<<<<<<<<emailUser');
        const { rows: [user] } = await recruiters.getUserByEmail(emailUser, {relation: 'recruiters'});
        console.log(user, '<<<<<<<<<<<<<<<<<<<<<<add user');
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
    
        await createHire(data)
        response(res, data, 201, 'Add Hire Successful!!')
    } catch (error) {
        console.log(error);
        return response(res, null, 500, 'Something wrong in adding data, Try again!!')
    };
};


// GET RECRUITER
const getRecruiter = async (req, res, next) => {
    const email = req.decoded.email;
    const { rows: [user] } = await recruiters.getUserByEmail(email, {relation: 'recruiters'});
    const { rows } = await hire.selectAll({filterBy: 'recruiters_id', filterValue: user.id});
    res.json({
        status: '200',
        data: rows,
        message: 'get hire with recruiters success!!'
    });
};


// GET WORKER
const getWorker = async (req, res, next) => {
    const email = req.decoded.email;
    console.log(email, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<email');
    const { rows: [user] } = await workers.getUserByEmail(email, {relation: 'workers'} );
    console.log(user, '<<<<<<<<<<<<<<<<<<<<<<<user');
    const { rows } = await hire.selectAll({filterBy: 'workers_id', filterValue: user.id});
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