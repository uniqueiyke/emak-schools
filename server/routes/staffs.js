const express = require('express');
const { register_staff, confirm_staff_reg_token, login_staff, get_staff, update_staff_data, reset_password, confirm_email  } = require('../controllers/staff-controller');
const router = express.Router();
const staffAuth = require('../middlewares/staff_auth')();


router.post('/registration/new-staff/register', register_staff);
router.post('/login/staff',  login_staff);
router.get('/get/reg-token',  confirm_staff_reg_token);
router.get('/get/staff/data', staffAuth,  get_staff);
router.post('/staff/data/update', staffAuth,  update_staff_data);
router.post('/staff/password/password-reset', reset_password);
router.post('/staff/confirm/email', confirm_email);



module.exports = router;
