const express = require('express');
const app = express();
const port = 6000 || process.env.PORT;
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connect =  mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: '',
    // database: 'spreadsheet'
    host:'mysql80-afe9.euw2.cloud.ametnes.com',
    user:'RLqkAzJFxq',
    password:'tO89jaS2z9796moVAIh8',
    port:3316,
    database:'3422883383',
    ssl:true
});

connect.connect( err => {
    if( err ){
       console.log("error connecting to db",err);
    }
    else{
       console.log("connection established")
    }
});

app.use(cors());
app.use( bodyParser.json({ limit:'1024mb' }) );
app.use( bodyParser.urlencoded({ limit:'1024mb', extended:true ,parameterLimit:50000000000}) );

app.post('/save/excel',(req, res, next) => {
    const excel = req.body.excel;
    const name = req.body.name;

    const insert = "INSERT INTO excel(id,name,data) VALUES (?,?,?)";

    connect.query(insert,['',name,JSON.stringify(excel)]);
});

app.get('/get/excel',(req, res) => {
    const read = "SELECT id,name FROM excel";

    connect.query(read,(err,result) => {
        res.send(result)
    }) 
});

app.get('/',(req, res) => {
    res.send("server is running");
})

app.get('/get/excel/:id',(req, res) => {
    const read = `SELECT data FROM excel where excel.id = ${req.params.id}`;

    connect.query(read,(err,result) => {
        res.send(result)
    }) 
});


app.listen(port, () => console.log(`server is running on ${port}`) );