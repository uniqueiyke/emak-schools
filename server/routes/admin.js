const { Router } = require('express');
const router = Router();
const auth = require('../middlewares/staff_auth');

const { 
    send_staff_register_token, 
    fetch_all_students, fetch_current_students,
    create_result_manager, fetch_all_staffs, update_staff_roles,
    update_staff_sujects,
} = require('../controllers/admin-controller');

const { create_scratch_cards, fetch_scratch_cards } = require('../controllers/scratch-card-controller');

router.post('/send/staff/reg-token',  send_staff_register_token);
router.get('/fetch/all/students', auth('admin'), fetch_all_students);
router.get('/fetch/current/students', auth('admin'), fetch_current_students);
router.post('/create/result-manager', auth('super-admin'),  create_result_manager);
router.post('/update/staff/roles', auth('super-admin'),  update_staff_roles);
router.post('/update/staff/subjects', auth('super-admin'),  update_staff_sujects);
router.get('/fetch/all/staffs', auth('super-admin'), fetch_all_staffs);
router.post('/create/scratch-cards', auth('super-admin'), create_scratch_cards);
router.get('/fetch/scratch-cards', auth('super-admin'), fetch_scratch_cards);

module.exports = router;