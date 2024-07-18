/* eslint-disable no-unused-vars */
const { response } = require('../helper/common');
const { createExperience, uptodateExperience, getDetailExperience, removeExperience, getMyExperience } = require('../models/experience');
const setClient = require('../configs/redis');
// GET ALL EXPERIENCE
const getAllExperience = async (req, res, next) => {
    const workersId = req.user.id;
    try {
        const { rows } = await getDetailExperience(workersId);
        res.json({
            status: 'success',
            data: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve Experience',
            error: error.message
        });
    }
};

// ADD EXPERIENCE
const addExperience = async (req, res, next) => {

    const { position, company_name, month_company, year_company, description_company } = req.body;

    const workersId = req.user.id;

    const data = {
        workers_id: workersId,
        position, 
        company_name, 
        month_company,
        year_company, 
        description_company
    };
    console.log(data, '<<<<<<<<<<<<<<<data workers');

    try {
        await createExperience(data)
        response(res, data, 201, 'Add Experience Successful!!')
    } catch (error) {
        console.log(error);
        return response(res, data, 500, 'Something wrong in adding data, Try again!!')
    };
};


// DELETE EXPERIENCE
const deleteExperience = async (req, res, next) => {
    const id = req.user.id;
    console.log(`Deleting experience with id: ${id}`);
    try {
        await removeExperience(id);
        res.json({
            status: 'success',
            message: `Experience has been deleted by id ${id}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete experience',
            error: error.message
        });
    }
};


// UPDATE EXPERIENCE
const updateExperience = async (req, res, next) => {
    const id = req.user.id;

    const { position, company_name, month_company, year_company, description_company } = req.body;

    const data = {
        company_name,
        position,
        month_company,
        year_company,
        description_company
    }

    try {
        await uptodateExperience(data, id)
        res.json({
            status: 'success',
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Something wrong in Updating data, Please Check again!!',
            error: error.message
        });
    };
};


// DETAIL EXPERIENCE
const detailExperience = async (req, res, next) => {
    const workersId = req.params.id;
    try {
        const { rows: experiences } = await getDetailExperience(workersId);
            res.json({
                status: 'success',
                data: experiences
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve experience details',
            error: error.message
        });
    }
};

module.exports = {
    addExperience,
    getAllExperience,
    updateExperience,
    detailExperience,
    deleteExperience
}