const express = require('express');
const router = express.Router();
const cors = require('../middlewares/cors');
const {register_student} = require('../controllers/student-reg-controller');


/* Student Registration */
router.post('/registration/register-student', register_student);

module.exports = router;
