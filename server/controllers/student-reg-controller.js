const StudentRegModel = require('../models/student-reg');

// use to get last inserted document from mongodb
const getLastRegisteredStudentSerialNumber = async () => {
    const lastRegStud = await StudentRegModel.find({}).sort({ _id: -1 }).limit(1);
    const [data] = lastRegStud;
    return data.serial_number;
}


getNewRegistrationNumber = async () => {
    const oldSerialNumber = await getLastRegisteredStudentSerialNumber();
    const regYear = (new Date()).getFullYear();
    let SN = `${oldSerialNumber + 1}`;
    if(SN.length < 3) {
        SN = SN.padStart(3, '0');
    }
    return [oldSerialNumber + 1, `${regYear}/ES${SN}`]
}

exports.register_student = async (req, res) => {
    const {
        last_name, first_name,
        other_names, gender,
        date_of_birth, reg_class
    } = req.body;

    const [serial_number, reg_number] = await getNewRegistrationNumber();

    newStudentReg = new StudentRegModel({
        serial_number, reg_number,
        last_name, first_name,
        other_names, gender,
        date_of_birth, reg_class
    })

    const newStudent = await newStudentReg.save();
    res.json(newStudent);
}

const manystuds = []


// save multiple documents to the mongo collection
exports.insertManyStudents = async (req, res) => {
    StudentRegModel.collection.insert(manystuds, (err, docs) => {
        if (err) {
            console.log(err)
        } else {
            console.log(docs)
        }
    })
}
