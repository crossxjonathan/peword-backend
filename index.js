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

const PORT = process.env.PORT
const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(xss());

app.use(bodyParser.json());
const optionCors = {
    origin: ['http://localhost:3000', 'https://fwm19firman1-firman-jonathans-projects.vercel.app/']
}
app.use(cors(optionCors));


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
app.use('/hire', hireRoute);  // this is not already finish
app.use('/upload', uploadRoute);


// ERROR HANDLING
app.use((err, req, res, next) => {
    console.log(err);
   const messageError = err.message || 'Internal Server Error'
   const statusCode = err.statusCode || 500
   res.status(statusCode).json({
    message: messageError
   })
})

console.log(__dirname, "<<upload storage");
app.use('/file', express.static(path.join(__dirname, '/upload')))

//PORT
app.listen(PORT, () => {
    console.log((`server running on port ${PORT}`));
});