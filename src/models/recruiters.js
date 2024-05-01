const pool = require("../configs/db")

const selectAllRecruiter = () => {
    return pool.query("SELECT * FROM recruiters ORDER BY id ASC")
}

const createRecruiter = ({name, description, position, city, company, phone, instagram, linkedin, photo}) => {
    return pool.query(
        `INSERT INTO recruiters (name, description, position, city, company, phone, instagram, linkedin, photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) `, 
        [name, description, position, city, company, phone, instagram, linkedin, photo]
    );
};

const removeRecruiter = (id) => {
    return pool.query("DELETE FROM recruiters WHERE id = $1", [id])
}

const uptodateRecruiter = (data, id) => {
    return pool.query(
        "UPDATE recruiters SET description = $1, position = $2, city = $3, company = $4, phone = $5, instagram = $6, linkedin = $7, photo = $8 WHERE id = $9", 
        [data.description, data.position, data.city, data.company, data.phone, data.instagram, data.linkedin, data.photo, id])
}

const getDetailRecruiter = (id) => {
    return pool.query("SELECT * FROM recruiters WHERE id = $1", [id])
}

module.exports = {
    selectAllRecruiter,
    createRecruiter,
    removeRecruiter,
    uptodateRecruiter,
    getDetailRecruiter
}