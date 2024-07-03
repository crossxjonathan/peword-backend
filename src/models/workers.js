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

const getWorker = (userid) => {
    return pool.query(
        'SELECT name, description, job_desk, domicile, workplace, photo FROM workers WHERE id = $1',
        [userid]
    );
};

const getUserByEmail = (email) => {
    return pool.query(
        'SELECT users.email, users.role, workers.* FROM users JOIN workers on users.id = workers.users_id WHERE email = $1',
        [email]
    )
}

const removeWorker = (id) => {
    return pool.query("DELETE FROM workers WHERE id = $1", [id])
}

const uptodateWorker = (data, id) => {
    return pool.query(
        "UPDATE workers SET name = $1, description = $2, job_desk = $3, domicile = $4, workplace = $5, photo = $6 WHERE id = $7", 
        [data.name, data.description, data.job_desk, data.domicile, data.workplace, data.photo, id])
}


const updateUploadPhoto = async (data, id) => {
    try {
        // console.log(data.photo,'<<<<<<<<<<<<<<<<<data');
        const query = "UPDATE workers SET photo = $1 WHERE id = $2";
        const values = [data.photo, id];
        await pool.query(query, values);
    } catch (error) {
        console.error('Database update error:', error);
        throw new Error('Failed to update photo in database');
    }
};


const getDetailWorker = (id) => {
    return pool.query("SELECT * FROM workers WHERE id = $1", [id]);
}

const findUserById = async (id, relation = null) => {
    let query = `SELECT users.id, users.email, users.role, users.password`;
    if (relation) {
        query += `, ${relation}.*`;
    }
    query += ` FROM users`;
    if (relation) {
        query += ` JOIN ${relation} ON users.id = ${relation}.user_id`;
    }
    query += ` WHERE users.id = $1`;

    return pool.query(query, [id]);
}


module.exports = {
    selectAllWorker,
    getWorker,
    removeWorker,
    uptodateWorker,
    getDetailWorker,
    updateUploadPhoto,
    getUserByEmail,
    findUserById
}