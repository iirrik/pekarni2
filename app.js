const express = require("express");
const mysql = require("mysql2");
const hbs = require("hbs");
const app = express();
  
app.use(express.static(__dirname + "/views"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/glav.html");
});

// Подключение к базе данных MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1111',
  database: 'pekarni'
});
  
app.post("/otziv", function (req, res) {
  var name = req.body.name;
  var message = req.body.message;

  var sql = "INSERT INTO users (name, message) VALUES (?,?)";
  connection.query(sql, [name, message], function(err, result) {
    if (err) throw err;
    res.send('Review submitted successfully');
  });
});

// Настройки для отправки писем
var nodeMailer = require('nodemailer');
var smtpConfig = {
  host: 'smtp.rambler.ru',
  secure: false,
  port: 465,
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: 'your_email@example.com',
    pass: 'your_password'
  }
};

var transporter = nodeMailer.createTransport(smtpConfig);

app.get("/svaz", function (req, res) {
  res.sendFile(__dirname + "/views/svaz.html");
});

app.post('/svaz', function (req, res) {
  var mailOptions = {
    from: "your_email@example.com",
    to: "recipient@example.com",
    subject: 'grtgfrtg',
    html: 'ИМЯ: ' +  req.body.name + ' ДЕЙСТВИЕ: '  + req.body.delo  +  ' ТЕЛЕФОН: '  + req.body.tel 
  }

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
    } else {
      console.log("Message sent: " + info.response);
    }
  });
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});