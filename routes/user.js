const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/register', (req, res) =>{
  res.render('user/register')
})

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ user, email, password });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/login', (req, res) => {
  res.render('user/login')
})

router.post('/login', async (req, res) => {
    const { user, password } = req.body;
  
    try {
      const userName = await User.findOne({ user });
  
      if (!userName) {
        return res.status(401).send('Invalid user name');
      }
  
      const isMatch = await user.comparePassword(password);
  
      if (!isMatch) {
        return res.status(401).send('Invalid password');
      }
  
      res.send(user);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
  
module.exports = router;