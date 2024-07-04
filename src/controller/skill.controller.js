/* eslint-disable no-unused-vars */
const { createSkill, removeSkill, uptodateSkill, getDetailSkill, getMySkill } = require('../models/skills');
const { response } = require('../helper/common');

// GET MY SKILLS
const getMySkills = async (req, res, next) => {
    const workersId = req.user.id;
    console.log(workersId,'<<<<<<<<<<<<<<<<<<<workersId');
    try {
        const { rows } = await getMySkill(workersId);
        res.json({
            status: 'success',
            data: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve skills',
            error: error.message
        });
    }
};

// ADD SKILL
const addSkill = async (req, res, next) => {
    const { skill_name } = req.body;
    const workersId = req.user.id;
    console.log(workersId, '<<<<<<<<<<<<<<workersId');
    const skillData = {
        skill_name,
        workers_id: workersId
    };
    console.log('skilldata>>>>>>>>>>>>>>>', skillData);

    try {
        await createSkill(skillData);
        response(res, skillData, 201, 'Add Skill Successful!!');
    } catch (error) {
        console.error(error);
        return response(res, skillData, 500, 'Something went wrong in adding data, try again!');
    }
};

// DELETE SKILL
const deleteSkill = async (req, res, next) => {
    const id = req.params.id;
    try {
        await removeSkill(id);
        res.json({
            status: 'success',
            message: `Skill has been deleted by id ${id}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete skill',
            error: error.message
        });
    }
};

// UPDATE SKILL
const updateSkill = async (req, res, next) => {
    const id = req.params.id;
    const { skill_name } = req.body;

    const skillData = {
        skill: skill_name
    };

    try {
        await uptodateSkill(skillData, id);
        res.json({
            status: 'success',
            data: skillData,
            message: 'Skill Name Updated!!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to update skill',
            error: error.message
        });
    }
};

// DETAIL SKILL
const detailSkill = async (req, res, next) => {
    const id = req.params.id;
    try {
        const { rows: [skill] } = await getDetailSkill(id);
        res.json({
            status: 'success',
            data: skill
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve skill detail',
            error: error.message
        });
    }
};

module.exports = {
    getMySkills,
    addSkill,
    deleteSkill,
    updateSkill,
    detailSkill
};
