const express = require('express');
const router = express.Router();
const axios = require('axios');
const { check, validationResult } = require('express-validator');

// index file router calls different http methods

/* GET welcome page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Emily Doherty' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects' });
});

router.get('/message-sent', function(req, res, next) {
  res.render('message-sent', { title: 'Message Sent' });
});

router.get('/message-failed', function(req, res, next) {
  res.render('message-failed', { title: 'Message Failed' });
});

// array of functions to validate and sanitize form data, and request fields passed into submit-form router
var formValidate = [
    check('name', 'Enter valid name').trim().escape(),
    check('email', 'Please enter valid email.').isEmail().trim().escape().normalizeEmail(),
    check('message', 'Invalid message').trim().escape()
]

router.post('/submit-form', formValidate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.redirect('/message-failed');
  }
  else {
    try {
      const apiUrl = 'https://api.web3forms.com/submit';
      const accessKey = 'ACCESS_KEY';

      const formData = {
        access_key: accessKey,
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        'h-captcha-response': req.body['h-captcha-response'],
      };

      const response = await axios.post(apiUrl, formData);
      if (response.data.success) {
        res.redirect("/message-sent");
      }
      else {
        res.redirect("/message-failed");    }
    } catch (error) {
      res.redirect("/message-failed");
    }
  }
});


module.exports = router;
