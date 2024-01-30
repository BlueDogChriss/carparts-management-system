
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cookieParser = require('cookie-parser');

// const { config } = require('./firebase/firebase.config');
const dotenv = require('dotenv');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
dotenv.config();

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(`Tic project is running at http://localhost:${process.env.PORT}`);
});