const express = require('express');
const router = express.Router();
const auth = require('../middlewares/staff_auth');
const { register_student, get_student, update_student_data, get_student_parent, update_parent_data, add_parent } = require('../controllers/student-controller');


/* Student Registration */
router.post('/registration/register/student', register_student);
router.get('/get/student/data', auth('admin'),  get_student);
router.get('/parent/data', auth('admin'),  get_student_parent);
router.post('/student/data/update', auth('admin'),  update_student_data);
router.post('/parent/data/update', auth('admin'),  update_parent_data);
router.post('/add/parent/data', auth('admin'),  add_parent);

module.exports = router;
