const express = require('express');
const { 
    get_grade_book_score, grade_book, update_grade_book_score, 
    compute_results, fetch_results_sheet , get_results_slip,
    fetch_students_class_term, delete_student_from_class, fetch_termly_subjects,
    delete_subject_from_class_termly_subjects, check_result,
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
router.get('/fetch/subjects/class/term', staffAuth('super-admin'), fetch_termly_subjects);
router.post('/delete/subject/from-class/termly-subjects', staffAuth('super-admin'), delete_subject_from_class_termly_subjects);
router.post('/student/result/checker',  check_result);

// router.get('/test', (req, res)=> {
//     console.log(req.headers.date)
//     console.log(req.headers['access-control-max-age'])
//     console.log(req.headers.age)
//     console.log(req.headers['access-control-expose-headers'])
//     console.log(req.headers['user-agent'])
//     console.log(req.headers.authorization)
//     console.log(req.headers.cookie)
//     console.log(req.headers.host)
//     console.log(req.headers['last-modified'])
//     console.log(req.headers.location)

// })
module.exports = router;