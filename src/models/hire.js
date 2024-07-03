const pool = require('../configs/db');

const createHire = ({message_purpose, name, email, phone, description, workers_id}) => {
    return pool.query(
        `INSERT INTO hire (message_purpose, name, email, phone, description, workers_id) VALUES ($1, $2, $3, $4, $5, $6) `, 
        [message_purpose, name, email, phone, description, workers_id]
    );
}

const selectRecruiter = () => {
    return pool.query("SELECT hire.message_purpose, hire.name, hire.email, hire.phone, hire.description, hire.recruiters_id workers_id FROM hire")
}

const selectWorker = () => {
    return pool.query("SELECT hire.message_purpose, hire.name, hire.email, hire.phone, hire.description, hire.workers_id recruiters_id FROM hire")
}

module.exports = {
    createHire,
    selectRecruiter,
    selectWorker
}