const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressip = require("express-ip");
const keys = require("../../config/keys");
const passport = require("passport");
const mailgun = require("mailgun-js");
const fs = require("fs");
const xml2js = require("xml2js");
const path = require("path");
const ipmodel = require("../../models/ipmodel");

//mail
const DOMAIN = "arnavgupta.net";
const mg = mailgun({
  apiKey: "bc4ce8949101e064ebc107d55b9c1e81",
  domain: DOMAIN,
});

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.use(expressip().getIpInfoMiddleware);
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      User.findOne({ name: req.body.name }).then(async (nuser) => {
        if (nuser) {
          return res.status(400).json({ name: "username already exists" });
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          });
          await fs.readFile(
            path.resolve(
              __dirname,
              "./../../client/public/arnavgupta-sitemap.xml"
            ),
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
                const postgres = {
                  loc: `https://www.passionatebloggers.me/profiles&value=${req.body.name}`,
                  changefreq: "monthly",
                  priority: "1.0",
                };

                result.urlset.url.push(postgres);

                // convert SJON objec to XML
                const builder = new xml2js.Builder();
                const xml = builder.buildObject(result);

                // write updated XML string to a file
                fs.writeFile(
                  path.resolve(
                    __dirname,
                    "./../../client/public/arnavgupta-sitemap.xml"
                  ),
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
            path.resolve(
              __dirname,
              "./../../client/public/passionatebloggers-sitemap.xml"
            ),
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
                const postgres = {
                  loc: `https://www.passionatebloggers.me/profiles&value=${req.body.name}`,
                  changefreq: "monthly",
                  priority: "1.0",
                };

                result.urlset.url.push(postgres);

                // convert SJON objec to XML
                const builder = new xml2js.Builder();
                const xml = builder.buildObject(result);

                // write updated XML string to a file
                fs.writeFile(
                  path.resolve(
                    __dirname,
                    "./../../client/public/passionatebloggers-sitemap.xml"
                  ),
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

          const userMailData = {
            from: "Arnav Gupta <postmaster@arnavgupta.net>",
            to: `${req.body.email}, arnav.xx.gupta@gmail.com`,
            subject: "registered",
            text: `you were registered to https://www.passionatebloggers.me/ if it was you tthen ignore else contact us by https://www.passionatebloggers.me/contact-us`,
          };
          mg.messages().send(userMailData, function (error, body) {
            if (user) {
              console.log(body);
            } else {
              console.log(error);
            }
          });
          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => res.json(user))
                .catch((err) => console.log(err));
            });
          });
        }
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            const datasource = { ip: req.ipInfo, user: user.name };
            ipmodel.findByIdAndUpdate(
              { _id: "5fb12cb06033c907c2902cd1" },
              { $push: datasource },
              (error, success) => {
                if (success) {
                  console.log(success);
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                } else {
                  console.log(error);
                }
              }
            );
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
