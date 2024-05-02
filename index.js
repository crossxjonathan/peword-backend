require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');

const bodyParser = require('body-parser');
const recruitersRoute = require('./src/routes/recruiters.route');
const workersRoute = require('./src/routes/workers.route');

const PORT = process.env.PORT
const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(xss());

app.use(bodyParser.json());
// const optionCors = {
//     origin: 'http://example.com'
// }
app.use(cors());

app.use('/recruiters', recruitersRoute);
app.use('/workers', workersRoute);

app.use((err, req, res, next) => {
    console.log(err);
   const messageError = err.message || 'Internal Server Error'
   const statusCode = err.statusCode || 500
   res.status(statusCode).json({
    message: messageError
   })
})

app.listen(PORT, () => {
    console.log((`server running on port ${PORT}`));
});