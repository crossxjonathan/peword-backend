const pool = require('../configs/db');

const selectAllExperience = () => {
    return pool.query("SELECT * FROM experience ORDER BY id ASC")
}

const createExperience = ({position, company_name, month_company, year_company, description_company }) => {
    return pool.query(
        `INSERT INTO experience (position, company_name, month_company, year_company, description_company) VALUES ($1, $2, $3, $4, $5) `, 
        [position, company_name, month_company, year_company, description_company]
    );
}

const removeExperience = (id) => {
    return pool.query("DELETE FROM experience WHERE id = $1", [id])
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
    selectAllExperience,
    uptodateExperience,
    getDetailExperience,
    removeExperience
}