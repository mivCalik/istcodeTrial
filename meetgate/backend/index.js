var express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var app = express()
var port =5000;

let usersData = [{
  id:99,
  firstName: "Merve",
  lastName: "Çalık",
  email: "merve.n.clk@gmail.com",
  birthDate: "19.01.2000",
  linkedin: "req.body.linkedin",
  github: "req.body.github",
  twitter: "req.body.twitter",
}];
let startingid = 100;
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
  
app.get('/users', (req, res)=>{
  res.json(usersData);
});

app.get('/user/:idnum', (req, res) => {
  let wanted = usersData.find((obj) => obj.id == req.params["idnum"]);
  res.json(wanted);
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

app.post('/users', async (req,res)=>{
  console.log(req.body);
  const newUser = {
    id:startingid,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthDate: req.body.birthDate,
    linkedin: req.body.linkedin,
    github: req.body.github,
    twitter: req.body.twitter,
    //profilePicture:req.file.filename
  }
  startingid++;
  usersData.push(newUser);
  console.log("This is backend do you copy over",newUser);
  res.redirect('/users');
})

app.listen(port,() => console.log(`Server running on port ${port}!`))