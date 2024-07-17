/* eslint-disable no-unused-vars */
const { createSkill, removeSkill, uptodateSkill, getDetailSkill } = require('../models/skills');
const { response } = require('../helper/common');
const workers = require('../models/workers');

// GET MY SKILLS
const getMySkills = async (req, res, next) => {
    const id = req.user.id;
    console.log(id,'<<<<<<<<<<<<<<<<<<<id');
    try {
        const { rows } = await getDetailSkill(id);
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
    const email = req.decoded.email;
    const { rows: [user] } = await workers.getUserByEmail(email, {relation: 'workers'});
    const skillData = {
        skill_name,
        workers_id: user.id
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
    const id = req.user.id;
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
    const id = req.user.id;
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
    const workersId = req.user.id;
    try {
        const { rows: skills } = await getDetailSkill(workersId);
            res.json({
                status: 'success',
                data: skills
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve portfolio details',
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
