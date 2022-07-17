const express = require("express");
const bcrypt = require("bcrypt");   
const fs = require("fs");  

const usersDb = require("../database/db.json");  

const generateJWT = require("../utils/generateJWT");
const router = express.Router();   


router.post("/sign-up", async (req, res) => {
  const {  name, email, password } = req.body;

  try {
    const user = await usersDb.filter(user => user.email === email);

    if (user.length > 0) {
      return res.status(400).json({error: "User already exist!"});
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = {
      id: usersDb.length,
      name: name,
      email: email,
      password: bcryptPassword
    }

    usersDb.push(newUser);  
    
    
    await fs.writeFileSync('./database/db.json', JSON.stringify(usersDb));

    
    const jwtToken = generateJWT(newUser.id);

    return res.status(201).send({jwtToken, isAuthenticated: true});

  } catch (error) {
    console.error(error.message);
    res.status(500).send({error: error.message});
  }
});


module.exports = router;   // we need to export this router to implement it inside our server.js file
