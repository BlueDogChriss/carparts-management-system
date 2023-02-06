
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./Routes');
const cookieParser = require('cookie-parser');

// const { config } = require('./firebase/firebase.config');
const dotenv = require('dotenv');

const PORT = 5001;

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
dotenv.config();


app.use("/test", routes);

app.listen(PORT, () => {
    // console.log(`App is running on http://localhost:${process.env.PORT}`);
    console.log(`App is running on http://localhost:${PORT}`);


});