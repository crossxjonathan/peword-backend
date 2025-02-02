const pool = require('../configs/db');

const getMyPortfolio = (workersId) => {
    return pool.query("SELECT * FROM portfolio WHERE workers_id = $1", [workersId])
}

const createPortfolio = ({application_name, link_repository, type_portfolio, upload_image, workers_id}) => {
    console.log(workers_id,'<<<<<<<<<<<<<<<<<<<<<workers_id');
    return pool.query(
        `INSERT INTO portfolio (application_name, link_repository, type_portfolio, upload_image, workers_id) VALUES ($1, $2, $3, $4, $5) `, 
        [application_name, link_repository, type_portfolio, upload_image, workers_id]
    );
}

const removePortfolio = (id) => {
    // console.log(`Removing portfolio with id: ${id}`);
    return pool.query("DELETE FROM portfolio WHERE id = $1", [id]);
}

const uptodatePortfolio = (data, id) => {
    return pool.query(
        "UPDATE portfolio SET application_name = $1, link_repository = $2, type_portfolio = $3, upload_image = $4 WHERE id = $5", 
        [data.application_name, data.link_repository, data.type_portfolio, data.upload_image, id])
}

const getDetailPortfolio = (id) => {
    return pool.query("SELECT portfolio.id, portfolio.application_name, portfolio.link_repository, portfolio.type_portfolio, portfolio.upload_image, portfolio.created_at, portfolio.updated_at FROM portfolio WHERE workers_id = $1", [id])
}

module.exports = {
    createPortfolio,
    getMyPortfolio,
    uptodatePortfolio,
    getDetailPortfolio,
    removePortfolio,
}