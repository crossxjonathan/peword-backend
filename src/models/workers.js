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

const uptodateWorker = async (data, id) => {
    const query = `UPDATE workers SET name = $1, description = $2, phone = $3, job_desk = $4, domicile = $5, workplace = $6, updated_at = NOW() WHERE id = $7`;
    const values = [data.name, data.description, data.phone, data.job_desk, data.domicile, data.workplace, id];
    await pool.query(query, values);
};


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