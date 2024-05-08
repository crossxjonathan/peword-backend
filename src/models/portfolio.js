const pool = require('../configs/db');

const selectAllPortfolio = () => {
    return pool.query("SELECT * FROM portfolio ORDER BY id ASC")
}

const createPortfolio = ({application_name, link_repository, type_portfolio, upload_image}) => {
    return pool.query(
        `INSERT INTO portfolio (application_name, link_repository, type_portfolio, upload_image) VALUES ($1, $2, $3, $4) `, 
        [application_name, link_repository, type_portfolio, upload_image]
    );
}

const uptodatePortfolio = (data, id) => {
    return pool.query(
        "UPDATE portfolio SET application_name = $1, link_repository = $2, type_portfolio = $3, upload_image = $4 WHERE id = $5", 
        [data.application_name, data.link_repository, data.type_portfolio, data.upload_image, id])
}

const getDetailPortfolio = (id) => {
    return pool.query("SELECT * FROM portfolio WHERE id = $1", [id])
}

module.exports = {
    createPortfolio,
    selectAllPortfolio,
    uptodatePortfolio,
    getDetailPortfolio
}