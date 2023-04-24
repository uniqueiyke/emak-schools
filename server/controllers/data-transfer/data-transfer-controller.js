const createGradeBookManager = require("../../models/academic-year")

const reCreateGradeBookSession = async (session, term, class_name, students_list) => {
    try {
        let count = 0;
        const GradeBookManager = createGradeBookManager(session);
        let gradeBookTerm = await GradeBookManager.findOne({ term });

        
        if (gradeBookTerm) {
            const cClass = findClass(gradeBookTerm.classes, class_name);
            if (cClass) {
                for (const stu_id of students_list) {
                    const student = cClass.students.find(s => s.toString() === stu_id);
                    if (!student) {
                        cClass.students.push(stu_id);
                        count++;
                    }
                }
                await gradeBookTerm.save();
            } else {
                const tempArr = [];
                for (const stu_id of students_list) {
                    tempArr.push(stu_id)
                }
                gradeBookTerm.classes.push({
                    class_name,
                    students: tempArr
                });
                count = tempArr.length;
                await gradeBookTerm.save();
            }

        } else {
            const cClass = {
                class_name,
                students: [],
            }

            for (const stu_id of students_list) {
                cClass.students.push(stu_id)
            }

            gradeBookTerm = new GradeBookManager({
                term,
                classes: [cClass]
            })

            await gradeBookTerm.save();
            count = cClass.students.length;
        }

        const message = count > 0 ? `${count} ${count === 1 ? 'student' : 'students'} added to ${class_name.toUpperCase().replace('_', '')}` : 'No new student added. The students selected might have been added earlier.';
        console.log(`Result Manager Created. ${message}`);

    } catch (error) {
        console.log(error.message)
        if (error.code) {
            if (error.code === 11000) {
                res.status(401).json({ message: 'You are trying to add a student in two different classes. This is not allowed.' })
            }
        }
        res.status(401).json({ message: error.message })
    }
}

module.exports = {reCreateGradeBookSession}