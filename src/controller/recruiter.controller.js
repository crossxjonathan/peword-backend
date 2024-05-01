const { createRecruiter, selectAllRecruiter, removeRecruiter, getDetailRecruiter, uptodateRecruiter } = require('../models/recruiters');
const {response} = require('../helper/common');

// GET ALL RECRUITERS
const getAllRecruiters = async (req, res, next) => {

    const { rows } = await selectAllRecruiter()
    res.json({
        status: 'success',
        data: rows
    })
};

// ADD RECRUITER
const addRecruiter = async (req, res, next) => {

    const { name, description, position, city, company, phone, instagram, linkedin, photo, id } = req.body

    const validationCharacter = /^[a-zA-Z\s]*$/;

    if (!validationCharacter.test(name)) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation Name is Failed. do not use symbol in name!!'
        });
    }

    if (!validationCharacter.test(position)) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation position is Failed. do not use symbol in position!!'
        });
    }

    if (!validationCharacter.test(city)) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation city is Failed. do not use symbol in city!!'
        });
    }

    const data = {
        id,
        name,
        description,
        position,
        city,
        company,
        phone,
        instagram,
        linkedin,
        photo
    };

    try {
        await createRecruiter(data)
        response(res, data, 201, 'Add Recruiter Successful!!')
    } catch (error) {
        console.log(error);
        return response(res, data, 500, 'Something wrong in adding data, Try again!!')
    };
};


// DELETE RECRUITER
const deleteRecruiter = async (req, res, next) => {
    const id = req.params.id
    await removeRecruiter(id)
    res.json({
        status: 'success',
        message: `user has been deleted by id ${id}`
    });
};

// UPDATE RECRUITER
const updateRecruiter = async (req, res, next) => {
    const id = req.params.id;

    const validationCharacter = /^[a-zA-Z\s]*$/;

    const { description, position, city, company, phone, instagram, linkedin, photo } = req.body;

    if (!validationCharacter.test(position)) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation position is Failed. do not use symbol in position!!'
        });
    }

    if (!validationCharacter.test(city)) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation city is Failed. do not use symbol in city!!'
        });
    }

    const data = {
        description,
        position,
        city,
        company,
        phone,
        instagram,
        linkedin,
        photo
    }

    try {
        await uptodateRecruiter(data, id)
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

// DETAIL RECRUITER
const detailRecruiter = async (req, res, next) => {
    const id = req.params.id
    const { rows: [user] } = await getDetailRecruiter(id)
    res.json({
        status: 'success',
        data: user
    })
};

module.exports = {
    getAllRecruiters,
    addRecruiter,
    deleteRecruiter,
    updateRecruiter,
    detailRecruiter
}