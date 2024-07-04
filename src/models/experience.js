const pool = require('../configs/db');

const getMyExperience = (workersId) => {
    return pool.query("SELECT * FROM experience WHERE workers_id = $1", [workersId])
}

const createExperience = ({position, company_name, month_company, year_company, description_company, workers_id }) => {
    console.log(workers_id, '<<<<<<<<<<<<<<<<<<<workers_id');
    return pool.query(
        `INSERT INTO experience (position, company_name, month_company, year_company, description_company, workers_id) VALUES ($1, $2, $3, $4, $5, $6) `, 
        [position, company_name, month_company, year_company, description_company, workers_id]
    );
}

const removeExperience = (id) => {
    console.log(`Removing experience with id: ${id}`);
    return pool.query("DELETE FROM experience WHERE id = $1", [id]);
}

const uptodateExperience = (data, id) => {
    return pool.query(
        "UPDATE experience SET company_name = $1, position = $2, month_company = $3, year_company = $4, description_company = $5 WHERE id = $6", 
        [data.company_name, data.position, data.month_company, data.year_company, data.description_company, id])
}

const getDetailExperience = (id) => {
    return pool.query("SELECT * FROM experience WHERE id = $1", [id])
}

module.exports = {
    createExperience,
    getMyExperience,
    uptodateExperience,
    getDetailExperience,
    removeExperience
}