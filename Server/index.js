
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const Package = require('./api/package.js')

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Route
app.use('/package',Package);


app.use((req,res,next)=>{
    res.status(200).json({
        message : 'Api Is Running.'
    })
})

module.exports = app