const pool = require("../configs/db")

const selectAllWorker = ({ limit, offset, search, sortby, sort }) => {
    let orderByClause = '';
    if (sortby && sort) {
        orderByClause = `ORDER BY ${sortby} ${sort}`;
    } else {
        orderByClause = 'ORDER BY name ASC'; 
    }

    const query = `SELECT * FROM workers WHERE name ILIKE $1 ${orderByClause} LIMIT $2 OFFSET $3`;
    const queryParams = [`%${search}%`, limit, offset];
    return pool.query(query, queryParams);
};

const createWorker = ({name, description, job_desk, domicile, workplace}) => {
    return pool.query(
        `INSERT INTO workers (name, description, job_desk, domicile, workplace) VALUES ($1, $2, $3, $4, $5) `, 
        [name, description, job_desk, domicile, workplace]
    );
};

const removeWorker = (id) => {
    return pool.query("DELETE FROM workers WHERE id = $1", [id])
}

const uptodateWorker = (data, id) => {
    return pool.query(
        "UPDATE workers SET name = $1, description = $2, job_desk = $3, domicile = $4, workplace = $5 WHERE id = $6", 
        [data.name, data.description, data.job_desk, data.domicile, data.workplace, id])
}

const getDetailWorker = (id) => {
    return pool.query("SELECT * FROM workers WHERE id = $1", [id]);
}


module.exports = {
    selectAllWorker,
    createWorker,
    removeWorker,
    uptodateWorker,
    getDetailWorker
}