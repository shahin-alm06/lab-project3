const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const port = 5000;

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//Making connection with Mysql server
let db = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "",
    database : "postbook",
});

db.connect((err) => {
    if(err){
      console.log("Something went wrong while connecting to the database", err);
      throw err;
    }
    else{
      console.log("Mysql server connected.....");
    }
});

//getting user data from server

app.post('/getUserInfo', (req, res) => {
  const { userId, password } = req.body;

  const getUserInfosql = `SELECT userId, userName, userImage FROM users WHERE users.userId= ? AND users.userPassword= ?`;

  let query = db.query(getUserInfosql, [userId, password], (err, result) => {
    if(err){
      console.log("Erorr getting info from server:", err);
      throw err;
    }
    else{
      res.send(result);
    }
  });

});

app.listen(port,() =>{
    console.log(`Server is running on Port number ${port}`);
});