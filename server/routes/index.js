const express = require('express');
const { insertManyStudents } = require('../controllers/student-reg-controller');
const router = express.Router();
const cors = require('../middlewares/cors');


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('request recieved');
  res.send( { title: 'I received your message' });
  
});

// router.get('/', getNewRegistrationNumber);

router.get('/insert-many', insertManyStudents);



module.exports = router;
