/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { workersRegister, recruitersRegister, userRegister, checkUserByEmail, getWorkersDetail, getRecruiterDetail, checkEmailExist, tokenFunction } = require('../models/users');
const { response, responsecookies } = require('../helper/common');
const { refreshTokenJWT } = require('../middleware/refreshjwt');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const saltNumber = 10;

const Login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await checkUserByEmail({ email });
        if (!user) {
            return response(res, null, 500, 'User not exist');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response(res, null, 500, 'Wrong password');
        }

        const userRole = user.role;
        let userToBeSend = {};

        if (userRole === 'workers') {
            userToBeSend = await getWorkersDetail({ id: user.id });
        } else if (userRole === 'recruiters') {
            userToBeSend = await getRecruiterDetail({ id: user.id });
        } else {
            return response(res, null, 500, 'Invalid role');
        }

        const token = tokenFunction(user);
        const newRefreshToken = refreshTokenJWT({email: user.email, role: user.role, userid: user.id});
        console.log(newRefreshToken, '<<<<<<<<<<<<<<<<<<<<<<newrefreshtoken');
        let options = {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: false,
            sameSite: 'none',
            secure: true,
            signed: false,
            path: '/'
        };

        userToBeSend.token = token;
        userToBeSend.refreshToken = newRefreshToken;
        console.log(newRefreshToken, '<<<<<<<<<<<<<<<<<<<<<<newrefreshtoken');
        return responsecookies(res, userToBeSend, 200, 'Login Successful', options);
    } catch (error) {
        console.error('Error fetching user by email:', error);
        return response(res, null, 500, 'Something wrong, please try again');
    }
};


const checkRolesByToken = (req, res, next) => {
    const user = req.user;
    return(res, user, 200, 'Role is authorized')
};


const refreshToken = (req, res, next) => {
    const refreshToken = req.body.refreshToken
    const decoded = jwt.verify(refreshToken, process.env.JWTSECRET)

    const payload = {
        email: decoded.email,
        role:decoded.role
    }

    const data = {
        token: tokenFunction(payload),
        refreshToken: refreshTokenJWT(payload)
        
    }
    response(res, data, 200, "Refresh Token Success!!")
}

const registerWorkers = async (req, res, next) => {
    const { email, password, name, phone } = req.body;
    const role = 'workers'
    try {
        const emailExist = await checkEmailExist(email);
        if (emailExist === true) {
            console.log(res, '<<<<<<<<<<<<<<<<<Email Exist!!');
            return response(res, null, 500, 'email exist, please login!!')
        }
        const salt = await bcrypt.genSalt(saltNumber);
        const hash = await bcrypt.hash(password, salt);
        const newUser = await userRegister({ email, password: hash, role });
        const newWorkers = await workersRegister({ name, phone, userid: newUser })
        return response(res, newWorkers, 201, 'Worker Registration Successful');
    } catch (error) {
        console.error('Error in registering worker:', error);
        return response(res, null, 500, 'Something went wrong, please try again');
    }
};

const registerRecruiters = async (req, res, next) => {
    const { email, password, name, company, position, phone } = req.body;
    const role = 'recruiters'
    try {
        const emailExist = await checkEmailExist(email);
        if (emailExist === true) {
            console.log(res, '<<<<<<<<<<<<<<<<<Email Exist!!');
            return response(res, null, 500, 'email exist, please login!!')
        }
        const salt = await bcrypt.genSalt(saltNumber);
        const hash = await bcrypt.hash(password, salt);
        const newUser = await userRegister({ email, password: hash, role });
        const newRecruiters = await recruitersRegister({ name, company, position, phone, userid: newUser });
        return response(res, newRecruiters, 201, 'Recruiter Registration Successful');
    } catch (error) {
        console.error('Error in registering recruiter:', error);
        return response(res, null, 500, 'Something went wrong, please try again');
    }
};

module.exports = {
    Login,
    registerWorkers,
    registerRecruiters,
    refreshToken,
    checkRolesByToken
};
