const express = require('express');
const router = express.Router();
const auth = require('../middlewares/staff_auth');
const { register_student, get_student, update_student_data } = require('../controllers/student-controller');


/* Student Registration */
router.post('/registration/register/student', register_student);
router.get('/get/student/data', auth,  get_student);
router.post('/student/data/update', auth,  update_student_data);

module.exports = router;
