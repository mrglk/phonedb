const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const sqlite = require('sqlite3').verbose()
let sql;
const EventEmitter = require('./eventEmitter')
const emitter = new EventEmitter();

const db = new sqlite.Database('./phones.db', sqlite.OPEN_READWRITE, (err) => {
    if(err) return console.error(err)
})

const table = "CREATE TABLE IF NOT EXISTS phones(ID INTEGER PRIMARY KEY, phone)";
db.run(table)

const PORT = 3030;

app.use(cors())
app.use(bodyParser.json())

app.post("/add-phone", (req, res) => {

    try{
        const {phone} = req.body;
        sql = "INSERT INTO phones(phone) VALUES (?)"
        db.run(sql, [phone], (err) => {
            if(err) {
                console.log(err.message)
                return res.json({
                    status: 300,
                    success: false,
                    erorr: err
                })
            }
            emitter.fire(JSON.stringify({phone}))
        })
        return res.json({
            status: 200,
            success: true,
        })
    } catch(error) {
        return res.json({
            status: 400,
            success: false,
        })
    }

})

app.get("/get-phones", (req, res) => {
    sql = "SELECT * FROM phones";

    try{
        db.all(sql, [], (err, data) => {
            if(err) {
                return res.json({
                    status: 300,
                    success: false,
                    erorr: err
                })
            }
            return res.status(200).json(data);
        })
    } catch(error) {
        return res.json({
            status: 400,
            success: false,
        })
    }
    
})

app.get('/longpoll', (req, res) => {
    const id = Date.now().toString();
    emitter.register(id, (event) => {
        res.status(201)
        res.end(event)
    })
})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
