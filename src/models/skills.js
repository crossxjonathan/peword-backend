const pool = require('../configs/db');

const getMySkill = (workersId) => {
    return pool.query("SELECT * FROM skills WHERE workers_id = $1", [workersId]);
};

const createSkill = ({ skill_name, workers_id }) => {
    console.log(workers_id, '<<<<<<<<<<<<<<<<<<<,create workersId');
    return pool.query(
        "INSERT INTO skills (skill_name, workers_id) VALUES ($1, $2)",
        [skill_name, workers_id]
    );
};

const removeSkill = (id) => {
    return pool.query("DELETE FROM skills WHERE id = $1", [id]);
};

const uptodateSkill = (data, id) => {
    return pool.query(
        "UPDATE skills SET skill_name = $1 WHERE id = $2",
        [data.skill, id]
    );
};

const getDetailSkill = (id) => {
    return pool.query("SELECT skills.id, skills.skill_name, skills.created_at, skills.updated_at FROM skills WHERE workers_id = $1", [id])
};

module.exports = {
    createSkill,
    removeSkill,
    uptodateSkill,
    getDetailSkill,
    getMySkill
};
