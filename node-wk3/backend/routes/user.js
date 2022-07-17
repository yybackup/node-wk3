const express = require("express");
const bcrypt = require("bcrypt");   
const fs = require("fs");  

const usersDb = require("../database/db.json");  
const authenticate = require("../middleware/authenticate");
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

router.post("/sign-in", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await usersDb.filter(user => user.email === email);
  
      if (user.length === 0) {
        return res.status(401).json({error: "Invalid Credential", isAuthenticated: false});
      }
  
      //only returning the first user no matter how many duplicated users there are
      const isValidPassword = await bcrypt.compare(
        password,
        user[0].password
      );
        //password check
      if (!isValidPassword) {
        return res.status(401).json({error: "Invalid Credential", isAuthenticated: false});
      }
  
      
      // if the password matches  generate a new JWT with validation time 1 hr
      const jwtToken = generateJWT(user[0].id);

      return res.status(200).send({ jwtToken, isAuthenticated: true });
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send({error: error.message});
    }
  });

  router.post("/auth", authenticate, (req, res) => {
    try {
      
      res.status(200).send({isAuthenticated: true});
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send({error: error.message, isAuthenticated: false});
    }
  });
  

module.exports = router;   // we need to export this router to implement it inside our server.js file
