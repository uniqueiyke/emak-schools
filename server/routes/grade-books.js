const express = require('express');
const { 
    get_grade_book_score, grade_book, update_grade_book_score, 
    compute_results, fetch_results_sheet , get_results_slip,
    fetch_students_class_term, delete_student_from_class,
} = require('../controllers/grade-book-controller');
const router = express.Router();
const staffAuth = require('../middlewares/staff_auth');

router.get('/', staffAuth(),  grade_book);
router.post('/update/scores', staffAuth(), update_grade_book_score);
router.get('/scores', staffAuth(), get_grade_book_score);
router.get('/comput/results', staffAuth('admin'), compute_results);
router.get('/fetch/results-sheet', staffAuth('admin'), fetch_results_sheet);
router.get('/result-slip', staffAuth('super-admin'), get_results_slip);
router.get('/fetch/students/class/term', staffAuth('super-admin'), fetch_students_class_term);
router.post('/delete/student/from-class', staffAuth('super-admin'), delete_student_from_class);

module.exports = router;