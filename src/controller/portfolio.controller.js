/* eslint-disable no-unused-vars */
const {response} = require('../helper/common');
const { createPortfolio, uptodatePortfolio, getDetailPortfolio, getMyPortfolio } = require('../models/portfolio');


// GET ALL PORTFOLIO
const getAllPortfolio = async (req, res, next) => {
    const workersId = req.user.id;
    try {
        const { rows } = await getMyPortfolio(workersId);
        res.json({
            status: 'success',
            data: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve Portofolio',
            error: error.message
        });
    }
};

// ADD PORTOFOLIO
const addPortfolio = async (req, res, next) => {
    const { application_name, link_repository, type_portfolio, upload_image } = req.body;
    
    const workersId = req.user.id;    
    console.log(workersId,'<<<<<<<<<<<<<<<<<<<<<<<<<<workersId');
    const data = {
        workers_id: workersId,
        application_name, 
        link_repository, 
        type_portfolio,
        upload_image
    };

    try {
        await createPortfolio(data)
        response(res, data, 201, 'Add Portfolio Successful!!')
    } catch (error) {
        console.log(error);
        return response(res, data, 500, 'Something wrong in adding data, Try again!!')
    };
};

// UPDATE PORTFOLIO
const updatePortfolio = async (req, res, next) => {
    const id = req.params.id;

    const { application_name, link_repository, type_portfolio, upload_image } = req.body;

    const data = {
        application_name,
        link_repository,
        type_portfolio,
        upload_image
    }

    try {
        await uptodatePortfolio(data, id)
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

// DETAIL PORTFOLIO
const detailPortfolio = async (req, res, next) => {
    const id = req.params.id
    const { rows: [user] } = await getDetailPortfolio(id)
    res.json({
        status: 'success',
        data: user
    })
};

module.exports = {
    addPortfolio,
    getAllPortfolio,
    updatePortfolio,
    detailPortfolio
}