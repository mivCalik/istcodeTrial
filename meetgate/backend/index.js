var express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
var app = express();
var port = 5000;

let usersData = [{
  id: 99,
  firstName: "Merve",
  lastName: "Çalık",
  email: "merve.n.clk@gmail.com",
  birthDate: "19.01.2000",
  linkedin: "req.body.linkedin",
  github: "req.body.github",
  twitter: "req.body.twitter",
  profilePicture: "path/to/default.jpg"
}];
let startingid = 100;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Multer ayarları
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
});
var upload = multer({ storage: storage });

app.get('/users', (req, res) => {
  res.json(usersData);
});

app.get('/user/:idnum', (req, res) => {
  let wanted = usersData.find((obj) => obj.id == req.params["idnum"]);
  res.json(wanted);
});

app.post('/users', upload.single('profilePicture'), (req, res) => {
  console.log(req.body);
  console.log(req.file); // Yüklenen dosya hakkında bilgi

  const newUser = {
    id: startingid,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthDate: req.body.birthDate,
    linkedin: req.body.linkedin,
    github: req.body.github,
    twitter: req.body.twitter,
    profilePicture: req.file ? req.file.filename : null
  };
  startingid++;
  usersData.push(newUser);
  console.log("This is backend do you copy over", newUser);
  res.redirect('/users');
});

app.patch('/user/:idnum', (req, res)=>{
  let existing = usersData.find((obj) => obj.id == req.params["idnum"]);
  console.log(existing);
  const replacement = {
    id:parseInt(req.params["idnum"]),
    firstName: req.body.firstName || existing.firstName,
    lastName: req.body.lastName || existing.lastName,
    email: req.body.email || existing.email,
    birthDate: req.body.birthDate || existing.birthDate,
    linkedin: req.body.linkedin ||existing.linkedin,
    github: req.body.github ||existing.github,
    twitter: req.body.twitter || existing.twitter,
  }

  const index = usersData.findIndex((user) => user.id == req.params["idnum"]);
  usersData[index] = replacement;
  console.log(replacement);
  res.redirect('/users');
})

app.delete('/user/:idnum', (req, res)=>{
  let existing = usersData.find((obj) => obj.id == req.params.idnum); 

  const index = usersData.findIndex((user) => user.id == req.params.idnum);
  if(index > -1){
    usersData.splice(index,1);
    res.redirect('/users');
  }else{
    res.status(404)
      .json({error:`User with id: ${req.params["idnum"]} not found.`});
    }
  }
  );

app.listen(port, () => console.log(`Server running on port ${port}!`));
