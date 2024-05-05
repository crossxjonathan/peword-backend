const pool = require('../configs/db');

const selectAllSkill = () => {
    return pool.query("SELECT * FROM skills")
}

const createSkill = ({skill_name}) => {
    return pool.query(
        `INSERT INTO skills (skill_name) VALUES ($1) `, 
        [skill_name]
    );
};

const removeSkill = (id) => {
    return pool.query("DELETE FROM skills WHERE id = $1", [id])
}

const uptodateSkill = (data, id) => {
    return pool.query(
        "UPDATE skills SET skill_name = $1", 
        [data.skill, id])
}

const getDetailSkill = (id) => {
    return pool.query("SELECT * FROM skills WHERE id = $1", [id])
}

module.exports = {
    selectAllSkill,
    createSkill,
    removeSkill,
    uptodateSkill,
    getDetailSkill
}