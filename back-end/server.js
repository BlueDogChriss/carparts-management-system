
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./Util/config')
const routes = require('./routes')


const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.listen(config.port, () =>
console.log(`App is listening on port:${config.port}`)
)

app.use('/api', routes);

// const dotenv = require('dotenv');
