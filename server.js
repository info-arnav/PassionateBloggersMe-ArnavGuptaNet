let bcrypt = require("bcryptjs");
let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let xml2js = require("xml2js");
let mailgun = require("mailgun-js");
let path = require("path");
let passport = require("passport");
let AWS = require("aws-sdk");
let fs = require("fs");
let algoliasearch = require("algoliasearch");
let fileUpload = require("express-fileupload");
var cors = require("cors");
let https = require("https");
let http = require("http");

let User = require("./models/User");

let users = require("./routes/api/users");

let eventModel = require("./models/eventModal");

let extra = "";

let tinkerFest = mongoose.Schema({
  name: String,
  codingsr: String,
  codingjs: String,
  roboticssr: String,
  roboticsjs: String,
  surpise: String,
  symposium: String,
  audiosr: String,
  audiojr: String,
  moviesr: String,
  moviejr: String,
  designing: String,
  date: { type: Object, default: new Date() },
});

let fest = mongoose.model("tinkerFest", tinkerFest);

//aws

//mails

let DOMAIN = "arnavgupta.net";
let mg = mailgun({
  apiKey: "key-bc4ce8949101e064ebc107d55b9c1e81",
  domain: DOMAIN,
});

//algolia

let client = algoliasearch("8PCXEU15SU", "fc652d91b2d6db2718b47254be4c5d6e");
let index = client.initIndex("dev_Name");

//ssl
var app = express();

app.use(express.static(path.join(__dirname, "./client/build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// DB Config
let db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

//invites
app.post("/request/invite", (req, res) => {
  let data = {
    from: "Mailgun Sandbox <postmaster@arnavgupta.net>",
    to: `info@arnavgupta.net, ${req.body.email}`,
    subject: "Invitation For Tinker Fest 2020",
    template: "invitationnew",
    "v:test": "test",
  };
  mg.messages().send(data, function (error, body) {
    if (body) {
      res.redirect("/");
    }
  });
});

// Routes
app.use("/api/users", users);

app.post("/contact/messages", async (req, res) => {
  body = req.body;
  let queryData = {
    from: "Arnav Gupta <no-reply@arnavgupta.net>",
    to: `arnav.xx.gupta@gmail.com,info@arnavgupta.net`,
    subject: "Queries",
    text: `email : ${body.email} name : ${body.name} subject : ${body.subject} message : ${body.message}`,
  };
  await mg
    .messages()
    .send(queryData)
    .then((e) => res.redirect("/"));
});

app.get("/delete/:id", async (req, res) => {
  body = req.params.id;
  await eventModel.findByIdAndDelete(body).then((e) => res.redirect("/feed"));
});

app.get("/posts/user/:id", async (req, res) => {
  user = req.params.id;
  await eventModel.find({ name: user }, (error, data) => {
    res.json(data);
  });
});

app.post("/tinkerfest/team/online/website/submit", (req, res) => {
  fest.findOne({ name: req.body.name }, (error, user) => {
    if (user) {
      fest.updateOne(
        { name: req.body.name },
        {
          codingsr: req.body.codingsr,
          codingjs: req.body.codingjs,
          roboticssr: req.body.roboticssr,
          roboticsjs: req.body.roboticsjs,
          surpise: req.body.surpise,
          symposium: req.body.symposium,
          audiosr: req.body.audiosr,
          audiojr: req.body.audiojr,
          moviesr: req.body.moviesr,
          moviejr: req.body.moviejr,
          designing: req.body.designing,
        },
        (error, success) => {
          if (success) {
            res.redirect("/login");
          }
        }
      );
    } else
      fest.create(req.body, (error, success) => {
        if (success) {
          res.redirect("/login");
        }
      });
  });
});

app.get("/tinkerfest/:id", (req, res) => {
  fest.findOne({ name: req.params.id }, (error, user) => {
    res.json(user);
  });
});

app.get("/datas/user/:id", async (req, res) => {
  body = req.params.id;
  await User.findOne({ name: body }, (error, data) => {
    res.json(data);
  });
});

app.post("/verify", async (req, res) => {
  await User.findOne({ _id: req.body.name }, async (error, user) => {
    if (user) {
      if (user.verificationCode == req.body.code) {
        await User.updateOne(
          { _id: req.body.name },
          { confirmed: true },
          (error, success) => {
            if (success) {
              res.redirect("/dashboard");
            }
          }
        );
      } else {
        res.redirect("/");
      }
    }
  });
});

app.post("/teams/edit", async (req, res) => {
  body = req.body;
  rfid = body.idss;
  await eventModel.updateOne(
    { _id: rfid },
    { blog: req.body.blog, imagePath: body.imagePath },
    (error, success) => {
      if (success) {
        res.redirect("/feed");
      }
    }
  );
});

app.get("/user/profile/data/:id", async (req, res) => {
  await User.findOne({ name: req.params.id }, (error, object) => {
    if (object) {
      res.json(object);
    }
  });
});

app.post("/profile/update/data", async (req, res) => {
  body = req.body;
  await User.updateOne(
    { name: req.body.name },
    {
      imagePath: req.body.imagePath,
      biology: req.body.biology,
      website: req.body.website,
      imagePath: req.body.imagePath,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
    },
    (error, success) => {
      if (success) {
        res.redirect("/active");
      }
    }
  );
});

app.post("/request/verification", async (req, res) => {
  console.log(req.body);
  id = req.body.users.name[0];
  email = req.body.users.name[1];
  number = Math.floor(100000 + Math.random() * 900000).toString();
  await User.updateOne(
    { _id: id },
    { verificationCode: number },
    async (error, output) => {
      let data = {
        from: "Arnav Gupta <postmaster@arnavgupta.net>",
        to: `${email}, arnav.xx.gupta@gmail.com`,
        subject: "Confirm",
        text: `Your verification node is ${number}`,
      };
      await mg.messages().send(data, async function (error, body) {
        console.log(body);
      });
    }
  );
});

app.get("/single/post/:id", async (req, res) => {
  await eventModel.findOne({ _id: req.params.id }, async (error, user) => {
    res.json(user);
  });
});

app.post("/teams/submit", async (req, res) => {
  body = req.body;
  await eventModel.create(req.body, async (error, success) => {
    if (success) {
      await fs.readFile(
        "./client-arnav/public/arnavgupta-sitemap.xml",
        "utf-8",
        (err, data) => {
          if (err) {
            throw err;
          }

          // convert XML data to JSON object
          xml2js.parseString(data, async (err, result) => {
            if (err) {
              throw err;
            }
            // add a new database to list
            let postgres = {
              loc: `https://www.arnavgupta.net/posted/@${success.name}/${success.subject}/${success._id}`,
              changefreq: "monthly",
              priority: "1.0",
            };

            result.urlset.url.push(postgres);

            // convert SJON objec to XML
            let builder = new xml2js.Builder();
            let xml = builder.buildObject(result);

            // write updated XML string to a file
            fs.writeFile(
              "./client-arnav/public/arnavgupta-sitemap.xml",
              xml,
              (err) => {
                if (err) {
                  throw err;
                }

                console.log(`Updated XML is written to a new file.`);
              }
            );
          });
        }
      );
      await fs.readFile(
        "./client/public/passionatebloggers-sitemap.xml",
        "utf-8",
        (err, data) => {
          if (err) {
            throw err;
          }

          // convert XML data to JSON object
          xml2js.parseString(data, async (err, result) => {
            if (err) {
              throw err;
            }
            // add a new database to list
            let postgres = {
              loc: `https://www.passionatebloggers.me/posted/@${success.name}/${success.subject}/${success._id}`,
              changefreq: "monthly",
              priority: "1.0",
            };

            result.urlset.url.push(postgres);

            // convert SJON objec to XML
            let builder = new xml2js.Builder();
            let xml = builder.buildObject(result);

            // write updated XML string to a file
            fs.writeFile(
              "./client/public/passionatebloggers-sitemap.xml",
              xml,
              (err) => {
                if (err) {
                  throw err;
                }

                console.log(`Updated XML is written to a new file.`);
              }
            );
          });
        }
      );

      await User.findOne({ name: body.name }, async (error, user) => {
        if (user) {
          let teamdata = {
            from: "Arnav Gupta <postmaster@arnavgupta.net>",
            to: `${user.email}, arnav.xx.gupta@gmail.com`,
            subject: "New Post",
            text: "The new post was succesfully made",
          };
          await mg.messages().send(teamdata, async function (error, cbody) {
            if (cbody) {
              res.redirect("/login");
            } else {
              res.redirect("/error");
            }
          });
        } else {
          res.redirect("/login");
        }
      });
    } else {
      res.redirect("/login");
    }
  });
});

app.get("/all/posts", async (req, res) => {
  await eventModel.find({}, (error, data) => {
    if (data) {
      res.json(data);
    }
  });
});

app.post("/follower/append", (req, res) => {
  body = req.body.name;
  console.log(body);
  User.findByIdAndUpdate(body.affected, { $push: { followers: body.affector } })
    .then((e) =>
      User.findByIdAndUpdate(body.affector, {
        $push: { following: body.affected },
      })
    )
    .then((e) =>
      User.findOne({ _id: body.affected }, (error, user) => {
        res.send("done");
      })
    );
});

app.post("/following/pop", (req, res) => {
  body = req.body.name;
  console.log(body);
  User.findByIdAndUpdate(body.affected, { $pull: { followers: body.affector } })
    .then((e) =>
      User.findByIdAndUpdate(body.affector, {
        $pull: { following: body.affected },
      })
    )
    .then((e) =>
      User.findOne({ _id: body.affected }, (error, user) => {
        res.send("done");
      })
    );
});

app.post("/likes/append", (req, res) => {
  body = req.body;
  eventModel
    .findByIdAndUpdate(body.affected, {
      $push: { likes: body.affector },
    })
    .then((e) =>
      eventModel.findByIdAndUpdate(body.affector, {
        $push: { likes: body.affected },
      })
    )
    .then((e) => res.redirect(body.path));
});

app.post("/likes/pop", (req, res) => {
  body = req.body;
  eventModel
    .findByIdAndUpdate(body.affected, {
      $pull: { likes: body.affector },
    })
    .then((e) =>
      eventModel.findByIdAndUpdate(body.affector, {
        $pull: { likes: body.affected },
      })
    )
    .then((e) => res.redirect(body.path));
});

/* renders the react components from port 5000 */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

let port = process.env.PORT || 5000;
let sport = process.env.PORT || 443;

app.listen("3000");
let applicationParams = "/";
let serverPort = process.env.PORT || "5000";
let serverParams = "/";
let mongoosePort =
  process.env.MONGODB_URI ||
  "mongodb+srv://Arnav:Arnav300804@cluster0.ahuqv.mongodb.net/health?retryWrites=true&w=majority";

//*creation
let app2 = express();

//*connections
app2.listen(serverPort, (req, res) => {});

//*use
app2.use(cors());
app2.use(express.static(path.join(__dirname, "./build")));
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: true }));
app2.use(fileUpload());

//*Schemas
let userDatas = new mongoose.Schema({
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
let mainSchemas = new mongoose.Schema({});

//*pres
userDatas.pre("save", function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

//*modles
let mainModel = mongoose.model("mainModel", mainSchemas);
let userModel = mongoose.model("userDatas", userDatas);

//*declarations
let error = { status: false, boundry: "" };
error.status = false;
error.boundry = "";
let userData = "";
let etra = "";
let login = { error: "" };

//*routes
app2.get("/", (req, res) => {
  res.send("the app is now working yaya lets see");
});

//registeration of a user is done here
app2.post("/user", async (req, res) => {
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
          userModel
            .create(body)
            .then(
              async (e) =>
                await fs.readFile(
                  "./client/public/sitemap.xml",
                  "utf-8",
                  (err, data) => {
                    if (err) {
                      throw err;
                    }

                    // convert XML data to JSON object
                    xml2js.parseString(data, async (err, result) => {
                      if (err) {
                        throw err;
                      }
                      // add a new database to list
                      let postgres = {
                        loc: `https://www.passionatebloggers.me/profiles&value=${body.userName}`,
                        changefreq: "monthly",
                        priority: "1.0",
                      };

                      result.urlset.url.push(postgres);

                      // convert SJON objec to XML
                      let builder = new xml2js.Builder();
                      let xml = builder.buildObject(result);

                      // write updated XML string to a file
                      fs.writeFile(
                        "./client/public/sitemap.xml",
                        xml,
                        (err) => {
                          if (err) {
                            throw err;
                          }

                          console.log(`Updated XML is written to a new file.`);
                        }
                      );
                    });
                  }
                )
            )
            .then(
              async (e) =>
                await fs.readFile(
                  "./client/public/sitemap.xml",
                  "utf-8",
                  (err, data) => {
                    if (err) {
                      throw err;
                    }

                    // convert XML data to JSON object
                    xml2js.parseString(data, async (err, result) => {
                      if (err) {
                        throw err;
                      }
                      // add a new database to list
                      let postgres = {
                        loc: `https://www.passionatebloggers.me/profiles&value=${body.userName}`,
                        changefreq: "monthly",
                        priority: "1.0",
                      };

                      result.urlset.url.push(postgres);

                      // convert SJON objec to XML
                      let builder = new xml2js.Builder();
                      let xml = builder.buildObject(result);

                      // write updated XML string to a file
                      fs.writeFile(
                        "./client/public/sitemap.xml",
                        xml,
                        (err) => {
                          if (err) {
                            throw err;
                          }

                          console.log(`Updated XML is written to a new file.`);
                        }
                      );
                    });
                  }
                )
            )
            .then(
              async (e) =>
                await fs.readFile(
                  "./client/public/sitemap-ssl.xml",
                  "utf-8",
                  (err, data) => {
                    if (err) {
                      throw err;
                    }

                    // convert XML data to JSON object
                    xml2js.parseString(data, async (err, result) => {
                      if (err) {
                        throw err;
                      }
                      // add a new database to list
                      let postgres = {
                        loc: `https://www.passionatebloggers.me/profiles&value=${body.userName}`,
                        changefreq: "monthly",
                        priority: "1.0",
                      };

                      result.urlset.url.push(postgres);

                      // convert SJON objec to XML
                      let builder = new xml2js.Builder();
                      let xml = builder.buildObject(result);

                      // write updated XML string to a file
                      fs.writeFile(
                        "./client/public/sitemap-ssl.xml",
                        xml,
                        (err) => {
                          if (err) {
                            throw err;
                          }

                          console.log(`Updated XML is written to a new file.`);
                        }
                      );
                    });
                  }
                )
            )
            .then(
              async (e) =>
                await fs.readFile(
                  "./client/public/sitemap.xml",
                  "utf-8",
                  (err, data) => {
                    if (err) {
                      throw err;
                    }

                    // convert XML data to JSON object
                    xml2js.parseString(data, async (err, result) => {
                      if (err) {
                        throw err;
                      }
                      // add a new database to list
                      let postgres = {
                        loc: `https://www.passionatebloggers.me/profiles&value=${body.userName}`,
                        changefreq: "monthly",
                        priority: "1.0",
                      };

                      result.urlset.url.push(postgres);

                      // convert SJON objec to XML
                      let builder = new xml2js.Builder();
                      let xml = builder.buildObject(result);

                      // write updated XML string to a file
                      fs.writeFile(
                        "./client/public/sitemap.xml",
                        xml,
                        (err) => {
                          if (err) {
                            throw err;
                          }

                          console.log(`Updated XML is written to a new file.`);
                        }
                      );
                    });
                  }
                )
            )
            .then((e) => res.redirect(applicationParams + "login"));
          error.status = false;
          error.boundry = "";
        }
      });
    }
  });
});

//used to fetch registeration errors
app2.get("/register/error", (req, res) => {
  if ((error.status = true)) {
    res.send(error.boundry);
  }
});

//authorisation of the user is done here
app2.post("/auth", (req, res) => {
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

app2.get("/status", (req, res) => res.send(userData)); //used to fetch the username of the person

app2.get("/login/error", (req, res) => {
  if (login.error) {
    res.send(login.error).then((login.error = ""));
  }
});

//empty user search resulta are sent from here to avoid glitches
app2.get("/search/data/", (req, res) => {
  res.json({
    username: false,
    name: false,
    phone: false,
  });
});

//provides search results in the search tab in the app
app2.get("/search/data/:id", (req, res) => {
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
app2.get("/user/name", (req, res) => {
  res.send(userData);
});

//apending of new follwers is done over here
app2.post("/add/follower/:id", (req, res) => {
  let paramsCopy = req.params.id;
  userModel
    .update({ userName: userData }, { $push: { followers: paramsCopy } })
    .then(res.redirect("/add/follower/part/" + req.params.id));
});

app2.get("/add/follower/part/:id", (req, res) => {
  let paramsCopy = req.params.id;
  userModel
    .update({ userName: paramsCopy }, { $push: { following: userData } })
    .then(res.redirect(applicationParams + "profile?value=/" + req.params.id));
});

app2.post("/add/unfollower/:id", (req, res) => {
  let paramsCopy = req.params.id;
  userModel
    .update({ userName: userData }, { $pull: { followers: paramsCopy } })
    .then(res.redirect("/add/unfollower/part/" + req.params.id));
});

app2.get("/add/unfollower/part/:id", (req, res) => {
  let paramsCopy = req.params.id;
  userModel
    .update({ userName: paramsCopy }, { $pull: { following: userData } })
    .then(res.redirect(applicationParams + "profile?value=/" + req.params.id));
});

app2.get(`/follower/boolean`, (req, res) => {
  if (userData) {
    userModel.find({ userName: userData }, (error, user) => {
      res.json({ array: user });
    });
  } else {
    res.json({ array: [{ followers: [false] }] });
  }
});

app2.get("/logout", (req, res) => {
  userData = "";
  res.redirect(applicationParams);
});

app2.get("/all/values", (req, res) => {
  res.json([]);
});

app2.get("/all/values/:id", (req, res) => {
  userModel.find(
    {
      userName: { $regex: `.*${req.params.id}.*` },
    },
    (e, s) => res.json(s)
  );
});

app2.get("/active/profile", (req, res) => {
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

app2.get("/find/profile/:id", (req, res) => {
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

app2.post("/update", (req, res) => {
  userModel
    .update(
      { userName: userData },
      { $push: { about: req.body.about, private: req.body.privacy } }
    )
    .then(res.redirect(applicationParams + "profile"));
});

app2.get("/privacy", (req, res) => {
  userModel.findOne({ userName: userData }, (error, data) => {
    if (data) {
      res.send(data.private[data.private.length - 1]);
    }
  });
});

app2.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});
//ssl
var app3 = express();

app3.use(express.static(path.join(__dirname, "./client-arnav/build")));
app3.use(bodyParser.urlencoded({ extended: false }));
app3.use(bodyParser.json());
app3.use(cors());

// Bodyparser middleware
app3.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app3.use(bodyParser.json());

// DB Config
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app3.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

//invites
app3.post("/request/invite", (req, res) => {
  let data = {
    from: "Mailgun Sandbox <postmaster@arnavgupta.net>",
    to: `info@arnavgupta.net, ${req.body.email}`,
    subject: "Invitation For Tinker Fest 2020",
    template: "invitationnew",
    "v:test": "test",
  };
  mg.messages().send(data, function (error, body) {
    if (body) {
      res.redirect("/");
    }
  });
});

// Routes
app3.use("/api/users", users);

app3.post("/contact/messages", async (req, res) => {
  body = req.body;
  let queryData = {
    from: "Arnav Gupta <no-reply@arnavgupta.net>",
    to: `arnav.xx.gupta@gmail.com,info@arnavgupta.net`,
    subject: "Queries",
    text: `email : ${body.email} name : ${body.name} subject : ${body.subject} message : ${body.message}`,
  };
  await mg
    .messages()
    .send(queryData)
    .then((e) => res.redirect("/"));
});

app3.get("/delete/:id", async (req, res) => {
  body = req.params.id;
  await eventModel.findByIdAndDelete(body).then((e) => res.redirect("/feed"));
});

app3.get("/posts/user/:id", async (req, res) => {
  user = req.params.id;
  await eventModel.find({ name: user }, (error, data) => {
    res.json(data);
  });
});

app3.post("/tinkerfest/team/online/website/submit", (req, res) => {
  fest.findOne({ name: req.body.name }, (error, user) => {
    if (user) {
      fest.updateOne(
        { name: req.body.name },
        {
          codingsr: req.body.codingsr,
          codingjs: req.body.codingjs,
          roboticssr: req.body.roboticssr,
          roboticsjs: req.body.roboticsjs,
          surpise: req.body.surpise,
          symposium: req.body.symposium,
          audiosr: req.body.audiosr,
          audiojr: req.body.audiojr,
          moviesr: req.body.moviesr,
          moviejr: req.body.moviejr,
          designing: req.body.designing,
        },
        (error, success) => {
          if (success) {
            res.redirect("/login");
          }
        }
      );
    } else
      fest.create(req.body, (error, success) => {
        if (success) {
          res.redirect("/login");
        }
      });
  });
});

app3.get("/tinkerfest/:id", (req, res) => {
  fest.findOne({ name: req.params.id }, (error, user) => {
    res.json(user);
  });
});

app3.get("/datas/user/:id", async (req, res) => {
  body = req.params.id;
  await User.findOne({ name: body }, (error, data) => {
    res.json(data);
  });
});

app3.post("/verify", async (req, res) => {
  await User.findOne({ _id: req.body.name }, async (error, user) => {
    if (user) {
      if (user.verificationCode == req.body.code) {
        await User.updateOne(
          { _id: req.body.name },
          { confirmed: true },
          (error, success) => {
            if (success) {
              res.redirect("/dashboard");
            }
          }
        );
      } else {
        res.redirect("/");
      }
    }
  });
});

app3.post("/teams/edit", async (req, res) => {
  body = req.body;
  rfid = body.idss;
  await eventModel.updateOne(
    { _id: rfid },
    { blog: req.body.blog, imagePath: body.imagePath },
    (error, success) => {
      if (success) {
        res.redirect("/feed");
      }
    }
  );
});

app3.get("/user/profile/data/:id", async (req, res) => {
  await User.findOne({ name: req.params.id }, (error, object) => {
    if (object) {
      res.json(object);
    }
  });
});

app3.post("/profile/update/data", async (req, res) => {
  body = req.body;
  await User.updateOne(
    { name: req.body.name },
    {
      imagePath: req.body.imagePath,
      biology: req.body.biology,
      website: req.body.website,
      imagePath: req.body.imagePath,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
    },
    (error, success) => {
      if (success) {
        res.redirect("/active");
      }
    }
  );
});

app3.post("/request/verification", async (req, res) => {
  console.log(req.body);
  id = req.body.users.name[0];
  email = req.body.users.name[1];
  number = Math.floor(100000 + Math.random() * 900000).toString();
  await User.updateOne(
    { _id: id },
    { verificationCode: number },
    async (error, output) => {
      let data = {
        from: "Arnav Gupta <postmaster@arnavgupta.net>",
        to: `${email}, arnav.xx.gupta@gmail.com`,
        subject: "Confirm",
        text: `Your verification node is ${number}`,
      };
      await mg.messages().send(data, async function (error, body) {
        console.log(body);
      });
    }
  );
});

app3.get("/single/post/:id", async (req, res) => {
  await eventModel.findOne({ _id: req.params.id }, async (error, user) => {
    res.json(user);
  });
});

app3.post("/teams/submit", async (req, res) => {
  body = req.body;
  await eventModel.create(req.body, async (error, success) => {
    if (success) {
      await fs.readFile(
        "./client-arnav/public/passionatebloggers-sitemap.xml",
        "utf-8",
        (err, data) => {
          if (err) {
            throw err;
          }

          // convert XML data to JSON object
          xml2js.parseString(data, async (err, result) => {
            if (err) {
              throw err;
            }
            // add a new database to list
            let postgres = {
              loc: `https://www.passionatebloggers.me/posted/@${success.name}/${success.subject}/${success._id}`,
              changefreq: "monthly",
              priority: "1.0",
            };

            result.urlset.url.push(postgres);

            // convert SJON objec to XML
            let builder = new xml2js.Builder();
            let xml = builder.buildObject(result);

            // write updated XML string to a file
            fs.writeFile(
              "./client/public/passionatebloggers-sitemap.xml",
              xml,
              (err) => {
                if (err) {
                  throw err;
                }

                console.log(`Updated XML is written to a new file.`);
              }
            );
          });
        }
      );
      await fs.readFile(
        "./client-arnav/public/arnavgupta-sitemap.xml",
        "utf-8",
        (err, data) => {
          if (err) {
            throw err;
          }

          // convert XML data to JSON object
          xml2js.parseString(data, async (err, result) => {
            if (err) {
              throw err;
            }
            // add a new database to list
            let postgres = {
              loc: `https://www.arnavgupta.net/posted/@${success.name}/${success.subject}/${success._id}`,
              changefreq: "monthly",
              priority: "1.0",
            };

            result.urlset.url.push(postgres);

            // convert SJON objec to XML
            let builder = new xml2js.Builder();
            let xml = builder.buildObject(result);

            // write updated XML string to a file
            fs.writeFile(
              "./client-arnav/public/arnavgupta-sitemap.xml",
              xml,
              (err) => {
                if (err) {
                  throw err;
                }

                console.log(`Updated XML is written to a new file.`);
              }
            );
          });
        }
      );

      await User.findOne({ name: body.name }, async (error, user) => {
        if (user) {
          let teamdata = {
            from: "Arnav Gupta <postmaster@arnavgupta.net>",
            to: `${user.email}, arnav.xx.gupta@gmail.com`,
            subject: "New Post",
            text: "The new post was succesfully made",
          };
          await mg.messages().send(teamdata, async function (error, cbody) {
            if (cbody) {
              res.redirect("/login");
            } else {
              res.redirect("/error");
            }
          });
        } else {
          res.redirect("/login");
        }
      });
    } else {
      res.redirect("/login");
    }
  });
});

app3.get("/all/posts", async (req, res) => {
  await eventModel.find({}, (error, data) => {
    if (data) {
      res.json(data);
    }
  });
});

app3.post("/follower/append", (req, res) => {
  body = req.body.name;
  console.log(body);
  User.findByIdAndUpdate(body.affected, { $push: { followers: body.affector } })
    .then((e) =>
      User.findByIdAndUpdate(body.affector, {
        $push: { following: body.affected },
      })
    )
    .then((e) =>
      User.findOne({ _id: body.affected }, (error, user) => {
        res.send("done");
      })
    );
});

app3.post("/following/pop", (req, res) => {
  body = req.body.name;
  console.log(body);
  User.findByIdAndUpdate(body.affected, { $pull: { followers: body.affector } })
    .then((e) =>
      User.findByIdAndUpdate(body.affector, {
        $pull: { following: body.affected },
      })
    )
    .then((e) =>
      User.findOne({ _id: body.affected }, (error, user) => {
        res.send("done");
      })
    );
});

app3.post("/likes/append", (req, res) => {
  body = req.body;
  eventModel
    .findByIdAndUpdate(body.affected, {
      $push: { likes: body.affector },
    })
    .then((e) =>
      eventModel.findByIdAndUpdate(body.affector, {
        $push: { likes: body.affected },
      })
    )
    .then((e) => res.redirect(body.path));
});

app3.post("/likes/pop", (req, res) => {
  body = req.body;
  eventModel
    .findByIdAndUpdate(body.affected, {
      $pull: { likes: body.affector },
    })
    .then((e) =>
      eventModel.findByIdAndUpdate(body.affector, {
        $pull: { likes: body.affected },
      })
    )
    .then((e) => res.redirect(body.path));
});

/* renders the react components from port 5000 */
app3.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client-arnav/build", "index.html"));
});

app3.listen("7000");

//*creation
