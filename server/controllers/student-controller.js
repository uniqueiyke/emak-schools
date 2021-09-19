const { validateFormFields } = require('../libs/validate-form-fields');
const Student = require('../models/student');
const Parent = require('../models/parent');
const { isEmptyArrayOrObject } = require('../libs/utility-functions')

// use to get last inserted document from mongodb
const getLastRegisteredStudentSerialNumber = async () => {
    const lastRegStud = await Student.find({}).sort({ _id: -1 }).limit(1);
    const [data] = lastRegStud;
    return data.serial_number;
}

/**
 * Generate new registration number for the new student
 */
getNewRegistrationNumber = async () => {
    const oldSerialNumber = await getLastRegisteredStudentSerialNumber();
    const regYear = (new Date()).getFullYear();
    let SN = `${oldSerialNumber + 1}`;
    if (SN.length < 3) {
        SN = SN.padStart(3, '0');
    }
    return [oldSerialNumber + 1, `${regYear}/ES${SN}`]
}

exports.register_student = async (req, res) => {
    try {
        const valErr = validateFormFields(req.body, {
            last_name: 'min_length',
            first_name: 'min_length',
            other_names: 'min_length',
            gender: '',
            reg_class: 'select',
            date_of_birth: 'date',
            genotype: 'select',
            blood_group: '',
            parent_last_name: 'min_length',
            parent_first_name: 'min_length',
            parent_phone_number: 'phone',
            parent_email: 'email',
            last_sch_attend: 'min_length',
            parent_occpation: 'min_length'
        }, { optionalFields: ['parent_email', 'date_of_birth', 'blood_group', 'genotype', 'other_names', 'last_sch_attend', 'parent_occpation'], minLength: 3 });
        if (!isEmptyArrayOrObject(valErr)) {
            return res.status(400).json([valErr, 'updateErr']);
        }
        const {
            last_name, first_name, other_names,
            gender, reg_class, date_of_birth,
            genotype, blood_group, last_sch_attend,
            parent_last_name, parent_first_name, parent_phone_number,
            parent_email, parent_occpation,
        } = req.body;

        const [serial_number, reg_number] = await getNewRegistrationNumber();

        newStudent = new Student({
            serial_number, reg_number,
            name: {
                last_name, first_name,
                other_names
            }, gender,
            date_of_birth, reg_class,
            genotype, blood_group, last_sch_attend,
        });

        const nparent = new Parent({
            name: {
                last_name: parent_last_name,
                first_name: parent_first_name
            },
            phone_number: parent_phone_number,
            email: parent_email,
            occpation: parent_occpation,
        });

        const [student, parent] = await Promise.all([newStudent.save(), nparent.save()]);

        parent.children.push(student._id);
        student.parent_id = parent._id;

        await Promise.all([student.save(), parent.save()]);
        res.json(student);
    } catch (err) {
        console.log(err.message);
        res.status(401).json(err.message);
    }
}

exports.get_student = async (req, res) => {
    try {
        if (isEmptyArrayOrObject(req.query)) {
            res.status(400).json({ message: 'Not a registered student' });
        }
        const student = await Student.findById(req.query.id);
        if (!student) {
            return res.status(400).json({ message: "Not a registered student" });
        }
        res.json(student);
    } catch (error) {
        console.log(error);
        res.status(401).json(error.message);

    }
}

exports.update_student_data = async (req, res) => {
    try {
        if (isEmptyArrayOrObject(req.query)) {
            return res.status(400).json({ message: 'Not a registered student' });
        }

        const student = await Student.findById(req.query.id);
        if (!student) {
            return res.status(400).json({ message: "User not found" });
        }
        const fields = Object.keys(req.body);
        if ((fields.length === 2 || fields.length === 3) && fields.includes('last_name')) {
            for (const field of fields) {
                err = validateFormFields({ [field]: req.body[field] }, {
                    [field]: 'min_length',
                }, { optionalFields: ['other_names'], minLength: 3 })
            }
            if (!isEmptyArrayOrObject(err)) {
                return res.status(400).json([err, 'updateErr']);
            } else {
                student.name = {
                    last_name: req.body.last_name,
                    first_name: req.body.first_name,
                    other_names: req.body.other_names
                }
            }
        }
        else {
            for (const field of fields) {
                let err = null;
                if (field === 'email') {
                    err = validateFormFields({ [field]: req.body[field] }, { [field]: 'email' });
                }
                else if (field === 'phone_number') {
                    err = validateFormFields({ [field]: req.body[field] }, { [field]: 'phone' });
                }
                else {
                    err = validateFormFields({ [field]: req.body[field] }, {
                        [field]: 'min_length',
                    }, { optionalFields: ['other_names'], minLength: 3 })
                }
                if (!isEmptyArrayOrObject(err)) {
                    return res.status(400).json([err, 'updateErr']);
                }
                student[field] = req.body[field];
            }
        }
        await student.save();

        res.json(student);
    } catch (error) {
        console.log(error);
        res.status(401).json(error.message);

    }
}