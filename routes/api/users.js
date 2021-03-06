const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const passport = require('passport');

// Current authenticated user route
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
  });
})

// Signup backend route
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        errors.username = "User already exists";
        return res.status(400).json(errors)
      } else {
        const newUser = new User({
          username: req.body.username,
          password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => {
                const payload = { id: user.id, username: user.username };

                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  { expiresIn: 3600},
                  (err, token) => {
                    res.json({
                      success: true,
                      token: "Bearer " + token
                    })
                  }
                )
              })
              .catch(err => console.log(err));
          })
        })
      }
    })
})

// Login backend route
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username})
    .then(user => {
      if (!user) {
        errors.handle = "This user does not exist";
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {id: user.id, username: user.username};

            jwt.sign(
              payload,
              keys.secretOrKey,
              {expiresIn: 3600},
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            )
          } else {
            return res.status(400).json({password: 'Incorrect password'});
          }
        })
    })
})

router.get("/", 
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    User.find()
      .sort({ date: -1 })
      .then(users => {
        let safeUsers = [];
        users.forEach(user => {
          safeUsers.push({
            "_id": user["_id"],
            "username": user["username"]
          })
        })
        res.json(safeUsers);
      })
      .catch(err => res.status(404).json({ nousersfound: 'No users found' }))
})

// DELETE a user backend route
router.delete("/:userId",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOne({ _id: req.params.userId })
      .then(user => {
        user.delete().then(user => res.json(user));
      })
      .catch(err => 
        res.status(404).json({ nouserfound: 'No user found with that ID' }))
  }
)

module.exports = router;
