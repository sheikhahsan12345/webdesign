// const express = require('express');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const cors = require('cors');
// const mysql = require('mysql');
// const app = express();
// const router = express.Router();
// const port = 3002;
// const db = require('./config/connectDb.js')

// const app = require('./index.js')

// // Configure body-parser middleware to parse form data
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });


const http = require('http')
const app = require('./index.js')
const server = http.createServer(app)
const db = require('./config/connectDb.js')
const dotenv = require('dotenv');
dotenv.config();
// const { sequelize } = require("./models")

server.listen (process.env.PORT, ()=>{
  console.log(`server Is Running At http://localhost:${process.env.PORT}`);
})