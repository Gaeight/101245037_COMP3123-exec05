const express = require('express');
const app = express();
const router = express.Router();
const user = require("./user.json")

router.use('/files', express.static('public'))

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile(__dirname + "/public/home.html")
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  let data = JSON.stringify(user, null, 2)
  res.send("<pre>" + data + "<pre>")
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {
  let jPassword = user.password
  let jUsername = user.username
  let password = req.query.p;
  let username = req.query.u;
  if (username != jUsername) {
      let response = {
          status: false,
          message: "username is invalid"
      }
      res.send(response)
  }
  else if (password != jPassword) {
    let response = {
      status: false,
      message: "password is invalid"
    }
    res.send(response)
  }
  else if (username == jUsername && password == jPassword) {
    let response = {
      status: true,
      message: "User is valid"
    }
    res.send(response)
  }
  
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:u', (req,res) => {
    let username = req.params.u
    res.send(`<h2><b>${username} succesfully logged out </b></h2>`)
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));