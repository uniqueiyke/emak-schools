const { Router } = require('express');
const router = Router();
const auth = require('../middlewares/staff_auth');

const { 
    send_staff_register_token, update_student_class,
    fetch_all_students, fetch_current_students, fetcch_parents,
    create_result_manager, fetch_all_staffs, update_staff_roles,
    update_staff_sujects, admin_register_staff, admin_reset_password,
} = require('../controllers/admin-controller');

const { create_scratch_cards, fetch_all_scratch_cards, fetch_scratch_cards, print_card } = require('../controllers/scratch-card-controller');

router.post('/send/staff/reg-token',  send_staff_register_token);
router.get('/fetch/all/students', auth('admin'), fetch_all_students);
router.get('/fetch/current/students', auth('admin'), fetch_current_students);
router.post('/create/result-manager', auth('super-admin'),  create_result_manager);
router.post('/update/staff/roles', auth('super-admin'),  update_staff_roles);
router.post('/update/staff/subjects', auth('super-admin'),  update_staff_sujects);
router.get('/fetch/all/staffs', auth('super-admin'), fetch_all_staffs);
router.post('/create/scratch-cards', auth('super-admin'), create_scratch_cards);
router.get('/fetch/all/scratch-cards', auth('super-admin'), fetch_all_scratch_cards);
router.get('/fetch/scratch-cards', auth('super-admin'), fetch_scratch_cards);
router.post('/print-cards', auth('super-admin'), print_card);
router.post('/register/new-staff', auth('super-admin'), admin_register_staff);
router.post('/reset-password', auth('super-admin'), admin_reset_password);
router.get('/update-classes', auth('super-admin'), update_student_class);
router.get('/parents', auth('super-admin'), fetcch_parents);

module.exports = router;