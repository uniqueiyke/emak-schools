const { Router } = require('express');
const router = Router();
const auth = require('../middlewares/staff_auth');

const { send_staff_register_token, fetch_all_students } = require('../controllers/admin-controller');

router.post('/send/staff/reg-token',  send_staff_register_token);
router.get('/fetch/all/students', auth, fetch_all_students);



module.exports = router;