const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const auth = require("./controllers/auth.controller");
const app = express();




var port = process.env.PORT || "4000";
console.log(port);
app.set("port", port);


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  res.header("Content-Type: application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});
app.use(express.static(process.cwd() + "/projets/wozzu/dist/"));
// simple route
/// data base 
app.post("/api/auth/signup", auth.signup);
app.post("/api/auth/signin", auth.signin);

const db = require("./models"); 
db.sequelize.sync();
const role = db.role ;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
function initial() {
  role.create({
    id: 1,
    name: "user"
  });
 
  role.create({
    id: 2,
    name: "moderator"
  });
 
  role.create({
    id: 3,
    name: "admin"
  });
}
app.get('/', (req,res) => {
  res.sendFile('index.html',{root:__dirname})
});
// set port, listen for requests
app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});