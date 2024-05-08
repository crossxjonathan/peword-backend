const { selectAllSkill, createSkill, removeSkill, uptodateSkill, getDetailSkill } = require('../models/skills');
const { response } = require('../helper/common');

// GET ALL SKILL
const getAllSkill = async (req, res, next) => {

    const { rows } = await selectAllSkill()
    res.json({
        status: 'success',
        data: rows
    })
};

// ADD SKILL
const addSkill = async (req, res, next) => {

    const { skill_name, id } = req.body

    const validationCharacter = /^[a-zA-Z\s]*$/;

    if (!validationCharacter.test(skill_name)) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation Name is Failed. do not use symbol in name!!'
        });
    }

    const skillData = {
        id,
        skill_name
    };

    try {
        await createSkill(skillData)
        response(res, skillData, 201, 'Add Skill Successful!!')
    } catch (error) {
        console.log(error);
        return response(res, skillData, 500, 'Something wrong in adding data, Try again!!')
    };
};


// DELETE SKILL
const deleteSkill = async (req, res, next) => {
    const id = req.params.id
    await removeSkill(id)
    res.json({
        status: 'success',
        message: `Skill has been deleted by id ${id}`
    });
};

// UPDATE SKILL
const updateSkill = async (req, res, next) => {
    const id = req.params.id;
    const { skill_name } = req.body;

    const skillData = {
        skill: skill_name
    }

    try {
        await uptodateSkill(skillData, id)
        res.json({
            status: 'success',
            data: skillData,
            message: `Skill Name Updated!!`
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Something wrong in Updating data, Please Check again!!',
            error: error.message
        });
    };
};

// DETAIL SKILL
const detailSkill = async (req, res, next) => {
    const id = req.params.id
    const { rows: [skill_name] } = await getDetailSkill(id)
    res.json({
        status: 'success',
        data: skill_name
    })
};

module.exports = {
    getAllSkill,
    addSkill,
    deleteSkill,
    updateSkill,
    detailSkill
}