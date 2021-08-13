var express = require('express');
const { register_new_staff, init_staff_registration } = require('../controllers/staff-controller');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/registration/new/register', register_new_staff);
router.post('/registration/new/staff/init/registration/', init_staff_registration);

module.exports = router;
