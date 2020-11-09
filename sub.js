//* followers and follwoe=wing have been interchanged y meaning so look after that

//*declaration
const express = require("express");
const bcrypt = require("bcrypt");
const fileupload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

//*imports

//*ports
const applicationParams = "/";
const serverPort = process.env.PORT || "5000";
const serverParams = "/";
const mongoosePort =
  process.env.MONGODB_URI ||
  "mongodb+srv://Arnav:Arnav300804@cluster0.ahuqv.mongodb.net/health?retryWrites=true&w=majority";

//*creation
const app = express();

//*connections
mongoose.connect(mongoosePort);
app.listen(serverPort, (req, res) => {});

//*use
app.use(cors());
app.use(express.static(path.join(__dirname, "./build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

//*Schemas
const userDatas = new mongoose.Schema({
  userName: { unique: true, type: String },
  email: { unique: true, type: String },
  name: String,
  phoneNumbeer: { type: String },
  password: String,
  following: { type: Array, default: [] },
  followers: { type: Array, default: [] },
  about: { type: Array, default: [] },
  private: { type: Array, default: ["PUBLIC"] },
  profession: { type: String },
  approved: { type: Boolean, default: false },
  requests: { type: Array, default: [] },
});
const mainSchemas = new mongoose.Schema({});

//*pres
userDatas.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

//*modles
const mainModel = mongoose.model("mainModel", mainSchemas);
const userModel = mongoose.model("userDatas", userDatas);

//*declarations
let error = { status: false, boundry: "" };
error.status = false;
error.boundry = "";
let userData = "";
const etra = "";
const login = { error: "" };

//*routes
app.get("/", (req, res) => {
  res.send("the app is now working yaya lets see");
});

//registeration of a user is done here
app.post("/user", async (req, res) => {
  error.status = false;
  error.boundry = "";
  let body = req.body;
  await userModel.findOne({ userName: body.userName }, (errors, user) => {
    if (user) {
      res.redirect(applicationParams + "register/error");
      error.status = true;
      error.boundry = "user name is already under use so choose another one";
    } else {
      userModel.findOne({ email: body.email }, (errors, user) => {
        if (user) {
          res.redirect(applicationParams + "register/error");
          error.status = true;
          error.boundry =
            "user email is already under use so choose another one";
        } else {
          res.redirect(applicationParams + "login");
          userModel.create(body);
          error.status = false;
          error.boundry = "";
        }
      });
    }
  });
});

//used to fetch registeration errors
app.get("/register/error", (req, res) => {
  if ((error.status = true)) {
    res.send(error.boundry);
  }
});

//authorisation of the user is done here
app.post("/auth", (req, res) => {
  let body = req.body;
  login.error = "";
  let userName = body.userName;
  userModel.findOne({ userName }, (errors, success) => {
    if (success) {
      bcrypt.compare(body.password, success.password, (errors, success) => {
        if (success) {
          userData = userName;
          error.status = false;
          error.boundry = "";
          res.redirect(applicationParams);
        } else {
          login.error = "password";
          res.redirect(applicationParams + "login");
        }
      });
    } else {
      login.error = "username";
      res.redirect(applicationParams + "login");
    }
  });
});

app.get("/status", (req, res) => res.send(userData)); //used to fetch the username of the person

app.get("/login/error", (req, res) => {
  if (login.error) {
    res.send(login.error).then((login.error = ""));
  }
});

//empty user search resulta are sent from here to avoid glitches
app.get("/search/data/", (req, res) => {
  res.json({
    username: false,
    name: false,
    phone: false,
  });
});

//provides search results in the search tab in the app
app.get("/search/data/:id", (req, res) => {
  userModel.findOne({ userName: req.params.id }, (error, result) => {
    if (result) {
      res.send({
        username: result.userName,
        name: result.name,
        phone: result.phoneNumber,
      });
    } else {
      res.send({
        username: "",
        name: "",
        phone: "",
      });
    }
  });
});

//this is used to get active user
app.get("/user/name", (req, res) => {
  res.send(userData);
});

//apending of new follwers is done over here
app.post("/add/follower/:id", (req, res) => {
  let paramsCopy = req.params.id;
  userModel
    .update({ userName: userData }, { $push: { followers: paramsCopy } })
    .then(res.redirect("/add/follower/part/" + req.params.id));
});

app.get("/add/follower/part/:id", (req, res) => {
  let paramsCopy = req.params.id;
  userModel
    .update({ userName: paramsCopy }, { $push: { following: userData } })
    .then(res.redirect(applicationParams + "profile/" + req.params.id));
});

app.post("/add/unfollower/:id", (req, res) => {
  let paramsCopy = req.params.id;
  userModel
    .update({ userName: userData }, { $pull: { followers: paramsCopy } })
    .then(res.redirect("/add/unfollower/part/" + req.params.id));
});

app.get("/add/unfollower/part/:id", (req, res) => {
  let paramsCopy = req.params.id;
  userModel
    .update({ userName: paramsCopy }, { $pull: { following: userData } })
    .then(res.redirect(applicationParams + "profile/" + req.params.id));
});

app.get(`/follower/boolean`, (req, res) => {
  if (userData) {
    userModel.find({ userName: userData }, (error, user) => {
      res.json({ array: user });
    });
  } else {
    res.json({ array: [{ followers: [false] }] });
  }
});

app.get("/logout", (req, res) => {
  userData = "";
  res.redirect(applicationParams);
});

app.get("/all/values", (req, res) => {
  res.json([]);
});

app.get("/all/values/:id", (req, res) => {
  userModel.find(
    {
      userName: { $regex: `.*${req.params.id}.*` },
    },
    (e, s) => res.json(s)
  );
});

app.get("/active/profile", (req, res) => {
  userModel.findOne({ userName: userData }, (error, user) => {
    if (user) {
      if (user.approved) {
        res.json({
          name: user.name,
          about: user.about[user.about.length - 1],
          followers: user.followers,
          username: user.userName,
          following: user.following,
          profession: user.profession,
          approved: "verified",
        });
      } else {
        res.json({
          name: user.name,
          about: user.about[user.about.length - 1],
          followers: user.followers,
          username: user.userName,
          following: user.following,
          profession: user.profession,
          approved: "not-verified",
        });
      }
    }
  });
});

app.get("/find/profile/:id", (req, res) => {
  let id = req.params.id;
  userModel.findOne({ userName: id }, (error, user) => {
    if (user) {
      if (user.approved) {
        res.json({
          name: user.name,
          about: user.about[user.about.length - 1],
          followers: user.followers,
          username: user.userName,
          following: user.following,
          profession: user.profession,
          approved: "verified",
        });
      } else {
        res.json({
          name: user.name,
          about: user.about[user.about.length - 1],
          followers: user.followers,
          username: user.userName,
          following: user.following,
          profession: user.profession,
          approved: "not-verified",
        });
      }
    }
  });
});

app.post("/update", (req, res) => {
  userModel
    .update(
      { userName: userData },
      { $push: { about: req.body.about, private: req.body.privacy } }
    )
    .then(res.redirect(applicationParams + "profile"));
});

app.get("/privacy", (req, res) => {
  userModel.findOne({ userName: userData }, (error, data) => {
    if (data) {
      res.send(data.private[data.private.length - 1]);
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});
