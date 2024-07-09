const pool = require('../configs/db');

const createHire = ({message_purpose, name, email, phone, description, workers_id, recruiters_id}) => {
    return pool.query(
        `INSERT INTO hire (message_purpose, name, email, phone, description, workers_id, recruiters_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, 
        [message_purpose, name, email, phone, description, workers_id, recruiters_id]
    );
};


const selectWorkerById = () => {
    return pool.query("SELECT hire.message_purpose, hire.name, hire.email, hire.phone, hire.description, hire.workers_id, hire.recruiters_id, hire.created_at FROM hire");
};

const selectRecruiterById = () => {
    return pool.query("SELECT hire.message_purpose, hire.name, hire.email, hire.phone, hire.description, hire.recruiters_id, hire.workers_id, hire.created_at FROM hire");
};


module.exports = {
    createHire,
    selectWorkerById,
    selectRecruiterById
}