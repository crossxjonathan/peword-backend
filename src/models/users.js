const pool = require('../configs/db');
const jwt = require('jsonwebtoken');

const getWorkersDetail = async ({ id }) => {
    const result = await pool.query(
        `SELECT u.id, u.email, u.role, w.name, w.phone
        FROM users u
        INNER JOIN workers w ON w.users_id = u.id
        WHERE w.users_id = $1`,
        [id]
    );
    const user = result.rows[0];
    return user;
}

const getRecruiterDetail = async ({ id }) => {
    const result = await pool.query(
        `SELECT u.id, u.email, u.role, r.name, r.company, r.position
        FROM users u
        INNER JOIN recruiters r ON r.users_id = u.id
        WHERE r.users_id = $1`,
        [id]
    );
    const user = result.rows[0];
    return user;
}

const checkEmailExist = async (email) => {
    console.log(email, 'getemail');
    const result = await pool.query(
        'SELECT COUNT(*) AS email_count FROM users WHERE email = $1',
        [email]
    );
    
    const countemail = result.rows[0];
    console.log(countemail,"error");
    return countemail.email_count > 0 ? true : false;
}

const tokenFunction = (user) => {
    // console.log(user, '<<<user')
    const { id: userid, email, role } = user;
    const secret = process.env.JWTSECRET;
    const obj = { 
        sub: userid,
        email: email,
        role: role 
    };
    // console.log(obj, "object");
    const token = jwt.sign(obj, secret, { expiresIn: '12h'});
    return token 
}

const checkUserByEmail = async ({ email }) => {
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );
    const user = result.rows[0];
    return user;
};

const checkUserById = async (id) => {
    const result = await pool.query(
        `SELECT * FROM users WHERE id = $1`,
        [id]
    );
    const user = result.rows[0];
    return user;
};

const userRegister = async ({ email, password, role }) => {
    const result = await pool.query(
        `INSERT INTO users (
            email, password, role
        ) VALUES ($1, $2, $3) RETURNING *`,
        [email, password, role]
    );
    const user = result && result.rows[0].id;
    return user;
}

const workersRegister = async ({ name, phone, userid }) => {

    const result = await pool.query(
        `INSERT INTO workers (name, phone, users_id) VALUES ($1, $2, $3) RETURNING *`,
        [name, phone, userid]
    );
    return result.rows[0];
};

const recruitersRegister = async ({ name, phone, company, position, userid }) => {
    
    const result = await pool.query(
        `INSERT INTO recruiters (name, phone, company, position, users_id ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [ name, phone, company, position, userid]
    );
    return result.rows[0];
};

module.exports = {
    checkUserById,
    checkUserByEmail,
    userRegister,
    workersRegister,
    recruitersRegister,
    getWorkersDetail,
    getRecruiterDetail,
    checkEmailExist,
    tokenFunction
};
