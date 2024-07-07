/* eslint-disable no-unused-vars */
const { createRecruiter, selectAllRecruiter, removeRecruiter, getDetailRecruiter, uptodateRecruiter, getUserByEmail, updateUploadPhoto } = require('../models/recruiters');
const { response } = require('../helper/common');
const cloudinary = require("../configs/cloudinary.config");

// PROFILE
const profile = async (req, res, next) => {
    try {
        const email = req.decoded.email;
        // console.log(req.decoded, '<<<<<<<<<<<<<<<<<<<<<req.decoded.sub');
        const { rows: [user] } = await getUserByEmail(email);
        // console.log(user, "<<<<<<<<<<<<<<<<<<<<<profile");
        if (user) {
            res.json({ profile: user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// GET ALL RECRUITERS
const getAllRecruiters = async (req, res, next) => {

    const { rows } = await selectAllRecruiter()
    res.json({
        status: 'success',
        data: rows
    })
};

// ADD RECRUITER
// const addRecruiter = async (req, res, next) => {

//     const { name, description, position, city, company, phone, instagram, linkedin, photo, id } = req.body

//     const validationCharacter = /^[a-zA-Z\s]*$/;

//     if (!validationCharacter.test(name)) {
//         return res.status(400).json({
//             status: 'error',
//             message: 'Validation Name is Failed. do not use symbol in name!!'
//         });
//     }

//     if (!validationCharacter.test(position)) {
//         return res.status(400).json({
//             status: 'error',
//             message: 'Validation position is Failed. do not use symbol in position!!'
//         });
//     }

//     if (!validationCharacter.test(city)) {
//         return res.status(400).json({
//             status: 'error',
//             message: 'Validation city is Failed. do not use symbol in city!!'
//         });
//     }

//     const data = {
//         id,
//         name,
//         description,
//         position,
//         city,
//         company,
//         phone,
//         instagram,
//         linkedin,
//         photo
//     };

//     try {
//         await createRecruiter(data)
//         response(res, data, 201, 'Add Recruiter Successful!!')
//     } catch (error) {
//         console.log(error);
//         return response(res, data, 500, 'Something wrong in adding data, Try again!!')
//     };
// };


// DELETE RECRUITER
const deleteRecruiter = async (req, res, next) => {
    const id = req.params.id
    await removeRecruiter(id)
    res.json({
        status: 'success',
        message: `user has been deleted by id ${id}`
    });
};

// UPDATE RECRUITER
const updateRecruiter = async (req, res, next) => {

    try {
        const email = req.decoded.email;
        const { rows: [user] } = await getUserByEmail(email);
        if (!user) {
            return response(res, null, 401, "User not found");
        }
        const data = req.body;
        await uptodateRecruiter(data, user.id);
        response(res, data, 200, "Profile Updated Successfully!!");
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// UPDATE PHOTO RECRUITER
const updatePhotoRecruiter = async (req, res, next) => {
    try {
        const email = req.decoded.email;
        const { rows: [user] } = await getUserByEmail(email);
        if (!user) {
            return response(res, null, 401);
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        await updateUploadPhoto({ photo: result.secure_url }, user.id);
        response(res, { file_url: result.secure_url }, 201, "Profile Photo Updated Successfully!!");
    } catch (error) {
        console.error(error);
        next(error);
    }
};


// DETAIL RECRUITER
const detailRecruiter = async (req, res, next) => {
    const id = req.params.id
    const { rows: [user] } = await getDetailRecruiter(id)
    res.json({
        status: 'success',
        data: user
    })
};

module.exports = {
    getAllRecruiters,
    // addRecruiter,
    deleteRecruiter,
    updateRecruiter,
    detailRecruiter,
    profile,
    updatePhotoRecruiter
}