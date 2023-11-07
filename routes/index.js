var express = require('express');
var router = express.Router();

// the index file has router which calls different http methods

/* GET welcome page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Emily Doherty' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

// /* GET projects page. */
// router.get('/projects', function(req, res, next) {
//   res.render('index', { title: 'Projects' });
// });
//
// /* GET github link. */
// router.get('/projects', function(req, res, next) {
//   res.render('index', { title: 'Projects' });
// });

/* GET get in touch page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

/* GET get in touch page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects' });
});

module.exports = router;
