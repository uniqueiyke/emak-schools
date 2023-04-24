const createGradeBookManager = require("../../../../models/academic-year");

const collectionTransfer = async (data) => {
    const {
        class_name, students,
        term, year
    } = data;
    try {
        const GradeBookManager = createGradeBookManager(year);
        let gradeBookTerm = await GradeBookManager.findOne({ term });
        if (gradeBookTerm) {
            // const cClass = findClass(gradeBookTerm.classes, class_name);
            gradeBookTerm.classes.push({
                class_name,
                students
            });
        }else {
            gradeBookTerm = new GradeBookManager({
                term,
                classes: [{
                    class_name,
                    students
                }]
            })
        }
        await gradeBookTerm.save();
        console.log(`Result Manager Created. ${students.length}s added to ${class_name}`);
    } catch (error) {
        console.log(`could not create GradeBook with the informations ${year}, ${term}, ${class_name}`)
        throw error;
    }
}

module.exports = collectionTransfer;