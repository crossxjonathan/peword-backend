/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const passport = require('passport');
const path = require('path');

const bodyParser = require('body-parser');

const recruitersRoute = require('./src/routes/recruiters.route');
const workersRoute = require('./src/routes/workers.route');
const userRoute = require('./src/routes/users.route');
const skillRoute = require('./src/routes/skills.route');
const experienceRoute = require('./src/routes/experience.route');
const portfolioRoute = require('./src/routes/portfolio.route');
const hireRoute = require('./src/routes/hire.route');
const uploadRoute = require('./src/routes/upload.route');

const { JwtFunction } = require('./src/middleware/jwt');
const upload = require('./src/middleware/upload');

const PORT = process.env.PORT
const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(xss());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const optionCors = {
    origin: [
        'http://localhost:5173', 
        'https://peworld-backend-mu.vercel.app', 
        'https://peworld-fwm19.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(optionCors));
app.options('*', cors(optionCors));

app.get('/', (req, res) => {
    res.send('Hello World!! Backend Peworld is Running');
});

app.use(passport.initialize());
passport.use('peWorldJWT', JwtFunction);

//ENDPOINT ROLE
app.use('/recruiters', recruitersRoute);
app.use('/workers', workersRoute);
app.use('/users', userRoute);

//PART
app.use('/skills', skillRoute);
app.use('/experience', experienceRoute);
app.use('/portfolio', portfolioRoute);
app.use('/hire', hireRoute);
app.use('/upload', uploadRoute);


// ERROR HANDLING
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.log(err);
    const messageError = err.message || 'Internal Server Error'
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        message: messageError
    })
})

// console.log(__dirname, "<<upload storage");
app.use('/photo', express.static(path.join(__dirname, 'upload')))

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
  });  

//PORT
app.listen(PORT, () => {
    console.log((`server running on port ${PORT}`));
});