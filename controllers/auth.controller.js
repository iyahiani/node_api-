const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const verify = require ("../middleware/verifySignUp")


const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  console.log(req.body);
  verify.checkDuplicateUsernameOrEmail(req, res);
  User.create({
    username: req.body.nom,
    lastname : req.body.prenom,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      
      res.send({ message: "User was registered successfully!",
    
        username: user.username,
        email: user.email,
        accessToken: token });
      console.log(user);
    
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  console.log("SIGNUP");

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token
      });     
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}