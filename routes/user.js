const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')

//show login page
router.get('/login', (req, res) => {
  res.render('user/login')
})

router.post('/login', async (req, res) => {
  const { user, password } = req.body;

  try {
    const foundUser = await User.findOne({ user });

    if (!foundUser) {
      return res.status(401).send('Invalid user name');
    }

    const isMatch = await foundUser.comparePassword(password);

    if (!isMatch) {
      return res.status(401).send('Invalid password');
    }

    res.send(foundUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

  

//register page
router.get('/register', (req, res) =>{
  res.render('user/register')
})

//creating new user
router.post('/register', async (req, res) => {

  try {
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
      user: req.body.user,
      email: req.body.email,
      password: hashedPassword,
      favoriteGenre: req.body.genre,
      gender: req.body.gender,
      age: req.body.age
    })
    const newUser = await user.save()
    res.redirect(`/${newUser.id}`)
  } catch (err) {
    res.status(400).send(err.message);
    res.redirect('/register')
  }
});

//show user page 
router.get('/:id', async (req, res) => {
  try{
    const user = await User.findById(req.params.id)
    res.render('user/user', {
      user: user,
    })
  }catch {
    res.redirect('/')
  }

})


module.exports = router;