const { selectAllWorker, createWorker, removeWorker, uptodateWorker, getDetailWorker, searchWorkerByName, sortByWorkers } = require('../models/workers');
const { response } = require('../helper/common')

// GET ALL WORKERS
const getAllWorkers = async (req, res, next) => {
    try {
        const { rows } = await selectAllWorker()
        response(res, rows, 200, 'Get All Worker Successful!!')
    } catch (error) {
        console.Error('Fetching All Workers Error',(error));
        response(res, null, 500, 'Internal Server Error')
    }
};

// ADD WORKER
const addWorker = async (req, res, next) => {
    const { name, description, job_desk, domicile, workplace, id } = req.body

    const validationCharacter = /^[a-zA-Z\s]*$/;

    if (!validationCharacter.test(name)) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation Name is Failed. do not use symbol in name!!'
        });
    }

    if (!validationCharacter.test(job_desk)) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation position is Failed. do not use symbol in position!!'
        });
    }

    if (!validationCharacter.test(domicile)) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation city is Failed. do not use symbol in city!!'
        });
    }

    const data = {
        id,
        name,
        description,
        job_desk,
        domicile,
        workplace
    };
    try {
        await createWorker(data)
        response(res, data, 201, 'Add Worker Successful!!')
    } catch (error) {
        console.log(error);
        return response(res, data, 500, 'Something wrong in adding data, Try again!!')
    }
};

// DELETE WORKER
const deleteWorker = async (req, res, next) => {
    const id = req.params.id
    await removeWorker(id)
    response(res, id, 200, 'Delete Worker Successful!!')
};

// UPDATE WORKER
const updateWorker = async (req, res, next) => {
    const id = req.params.id;
    const { name, description, job_desk, domicile, workplace } = req.body;

    const data = {
        name,
        description,
        job_desk,
        domicile,
        workplace
    }

    await uptodateWorker(data, id)
    response(res, data, 200, 'Update Worker Successful!!')
};

// DETAIL WORKER
const detailWorker = async (req, res, next) => {
    const id = req.params.id;
    const { rows: [worker] } = await getDetailWorker(id)
    response(res, worker, 200, 'Get Worker Successful!!')
};

// SEARCH WORKER BY NAME
const searchKey = async (req, res, next) => {
    const name = req.params.name;
    try {
        const { rows } = await searchWorkerByName(name);
        if (rows.length > 0) {
            res.status(200).json({
                status: 'success',
                message: 'Search result:',
                data: rows
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: `Worker not Found '${name}'`
            });
        }
    } catch (error) {
        console.error('Error searching workers:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};

// SORT BY NAME
const workerSortByName = async (req, res, next) => {
    try {
        const workers = await sortByWorkers();
        response(res, workers, 200, 'Get All Workers Sort By Name Successful!!')
    } catch (error) {
        console.log(error);
        response(res, null, 500, 'Get All Workers Sort By Name is Failed.....')
    }
};

// PAGINATION
const workerPaginationPage = () => {

}


module.exports = {
    getAllWorkers,
    addWorker,
    deleteWorker,
    updateWorker,
    detailWorker,
    searchKey,
    workerSortByName,
    workerPaginationPage
}