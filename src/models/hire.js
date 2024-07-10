const pool = require('../configs/db');

const createHire = ({ message_purpose, name, email, phone, description, workers_id, recruiters_id }) => {
    return pool.query(
        `INSERT INTO hire (message_purpose, name, email, phone, description, workers_id, recruiters_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [message_purpose, name, email, phone, description, workers_id, recruiters_id]
    );
};


const selectAll = ({ filterBy, filterValue }) => {
    return pool.query(`
        SELECT 
            hire.message_purpose, 
            hire.name AS hire_name, 
            hire.email AS hire_email, 
            hire.phone AS hire_phone, 
            hire.description AS hire_description, 
            hire.workers_id, 
            hire.recruiters_id, 
            hire.created_at,
            workers.name AS worker_name, 
            workers.description AS worker_description, 
            workers.job_desk, 
            workers.domicile, 
            workers.workplace, 
            workers.photo, 
            recruiters.name AS recruiter_name, 
            recruiters.description AS recruiter_description,
            recruiters.phone AS recruiter_phone, 
            recruiters.position, 
            recruiters.city, 
            recruiters.instagram, 
            recruiters.linkedin
        FROM 
            hire
        JOIN 
            workers ON hire.workers_id = workers.id
        JOIN 
            recruiters ON hire.recruiters_id = recruiters.id
    WHERE hire.${filterBy} = $1`, [filterValue]);
};


module.exports = {
    createHire,
    selectAll,
}