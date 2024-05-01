require('dotenv').config();
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const recruitersRoute = require('./src/routes/recruiters.route');
const workersRoute = require('./src/routes/workers.route');

const PORT = process.env.PORT
const app = express();

app.use(bodyParser.json());
// const optionCors = {
//     origin: 'http://example.com'
// }
app.use(cors());

app.use('/recruiters', recruitersRoute);
app.use('/workers', workersRoute);

app.listen(PORT, () => {
    console.log((`server running on port ${PORT}`));
});