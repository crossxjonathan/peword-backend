const { response } = require('../helper/common');
const { createExperience, selectAllExperience, uptodateExperience, getDetailExperience, removeExperience } = require('../models/experience');


// GET ALL EXPERIENCE
const getAllExperience = async (req, res, next) => {

    const { rows } = await selectAllExperience()
    res.json({
        status: 'success',
        data: rows
    })
};

// ADD EXPERIENCE
const addExperience = async (req, res, next) => {

    const { position, company_name, month_company, year_company, description_company, id } = req.body;

    const data = {
        id,
        position, 
        company_name, 
        month_company,
        year_company, 
        description_company
    };

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
    const id = req.params.id
    await removeExperience(id)
    res.json({
        status: 'success',
        message: `Experience has been deleted by id ${id}`
    });
};


// UPDATE EXPERIENCE
const updateExperience = async (req, res, next) => {
    const id = req.params.id;

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
    const id = req.params.id
    const { rows: [user] } = await getDetailExperience(id)
    res.json({
        status: 'success',
        data: user
    })
};

module.exports = {
    addExperience,
    getAllExperience,
    updateExperience,
    detailExperience,
    deleteExperience
}