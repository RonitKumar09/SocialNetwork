const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { json } = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = mongoose.model('User');
const requireAuth = require('../middleware/requireAuth');
require('dotenv').config({
  path: './config.env',
});

router.post('/protected', requireAuth, (req, res) => {
  res.json({ auth: 'true' });
});

router.post('/signUp', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: 'error' });
  }
  User.findOne({ email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: 'User already Registered' });
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          name,
          email,
          password: hashedPassword,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: `${user.email} saved successfuly!` });
          })
          .catch((err) => {
            return res.status(422).json({ error: err });
          });
      });
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.post('/signIn', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: 'please enter valid email-id or password' });
  }
  User.findOne({ email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: 'please enter valid email-id or password' });
      }
      bcrypt.compare(password, savedUser.password).then((matches) => {
        if (matches) {
          // return res.json({ message: 'SignIn successfull' });
          const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
          return res.json({ token });
        } else {
          return res.status(422).json({ error: 'please enter valid email-id or password' });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
