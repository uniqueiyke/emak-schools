const { Router } = require('express');
const router = Router();
const auth = require('../middlewares/staff_auth');

const { 
    send_staff_register_token, 
    fetch_all_students, fetch_current_students,
    create_result_manager, fetch_students_calss 
} = require('../controllers/admin-controller');

router.post('/send/staff/reg-token',  send_staff_register_token);
router.get('/fetch/all/students', auth('admin'), fetch_all_students);
router.get('/fetch/current/students', auth('admin'), fetch_current_students);
router.post('/create/result-manager', auth('admin'),  create_result_manager);

module.exports = router;