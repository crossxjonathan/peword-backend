const pool = require("../configs/db")

const selectAllRecruiter = () => {
    return pool.query("SELECT * FROM recruiters ORDER BY id ASC")
}

const getUserByEmail = (email) => {
    return pool.query(
        'SELECT users.email, users.role, recruiters.* FROM users JOIN recruiters on users.id = recruiters.users_id WHERE email = $1',
        [email]
    )
}

const removeRecruiter = (id) => {
    return pool.query("DELETE FROM recruiters WHERE id = $1", [id])
}

const uptodateRecruiter = async (data, id) => {
    const query = `UPDATE recruiters SET name = $1, description = $2, position = $3, city = $4, phone = $5, instagram = $6, linkedin = $7, updated_at = NOW() WHERE id = $8`;
    const values = [data.name, data.description, data.position, data.city, data.phone, data.instagram, data.linkedin, id];
    await pool.query(query, values);
}

const updateUploadPhoto = async (data, id) => {
    try {
        // console.log(data.photo,'<<<<<<<<<<<<<<<<<data');
        const query = "UPDATE recruiters SET photo = $1 WHERE id = $2";
        const values = [data.photo, id];
        await pool.query(query, values);
    } catch (error) {
        console.error('Database update error:', error);
        throw new Error('Failed to update photo in database');
    }
};

const getDetailRecruiter = (id) => {
    return pool.query("SELECT * FROM recruiters WHERE id = $1", [id])
}

module.exports = {
    selectAllRecruiter,
    removeRecruiter,
    uptodateRecruiter,
    getDetailRecruiter,
    getUserByEmail,
    updateUploadPhoto
}