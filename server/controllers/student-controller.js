const { validateFormFields } = require('../libs/validate-form-fields');
const Student = require('../models/student');
const Parent = require('../models/parent');
const { isEmptyArrayOrObject } = require('../libs/utility-functions')
const AddressSchema = require('../models/address-schema')
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
            relationship: 'min_length',
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
            parent_email, parent_occpation, relationship
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
            current_class: reg_class,
        });

        const nparent = new Parent({
            name: {
                last_name: parent_last_name,
                first_name: parent_first_name
            },
            relationship,
            phone_number: parent_phone_number,
            email: parent_email,
            occpation: parent_occpation,
        });

        const [student, parent] = await Promise.all([newStudent.save(), nparent.save()]);

        parent.children.push(student._id);
        student.parent_id = parent._id;
        student.classes_been.push(reg_class)

        await Promise.all([student.save(), parent.save()]);
        res.json(student);
    } catch (error) {
        res.status(401).json(error.message);
    }
}

exports.get_student = async (req, res) => {
    try {
        if (isEmptyArrayOrObject(req.query)) {
            res.status(400).json({ message: 'Not a registered student' });
        }
        const student = await Student.findById(req.query.id)
            .populate('parent_id');
        if (!student) {
            return res.status(400).json({ message: "Not a registered student" });
        }
        res.json(student);
    } catch (error) {
        res.status(401).json(error.message);
    }
}

exports.get_student_parent = async (req, res) => {
    try {
        if (isEmptyArrayOrObject(req.query)) {
            res.status(400).json({ message: 'Parent data not found' });
        }

        const parent = await Parent.findById(req.query.id_2);

        if (!parent) {
            return res.status(400).json({ message: 'Parent data not found' });
        }

        if (parent.children[0].toString() !== req.query.id_1.toString()) {
            return res.status(400).json({ message: 'Parent data not found' });
        }
        res.json(parent);
    } catch (error) {
        res.status(401).json(error.message);
    }
}


exports.update_student_data = async (req, res) => {
    try {
        if (isEmptyArrayOrObject(req.query)) {
            return res.status(400).json({ message: 'Not a registered student' });
        }
        const student = await Student.findById(req.query.id)
            .populate('parent_id');;
        if (!student) {
            return res.status(400).json({ message: "User not found" });
        }
        const fields = Object.keys(req.body);
        if (fields.length >= 2) {
            if (fields.includes('last_name')) {
                const err = validateFormFields(req.body, {
                    last_name: 'min_length',
                    first_name: 'min_length',
                }, { optionalFields: ['other_names'], minLength: 3 })
                if (!isEmptyArrayOrObject(err)) {
                    return res.status(400).json([err, 'User not found']);
                } else {
                    student.name = {
                        last_name: req.body.last_name,
                        first_name: req.body.first_name,
                        other_names: req.body.other_names
                    }
                }
            } else if (fields.includes('address')) {
                const err = validateFormFields(req.body, {
                    address: 'min_length',
                    town: 'min_length',
                    City: 'min_length',
                    postal_code: 'min_length',
                    State: 'select',
                    lga: 'select',
                    Country: 'select',
                }, { optionalFields: ['town', 'City', 'postal_code'], minLength: 3 });

                if (!isEmptyArrayOrObject(err)) {
                    return res.status(401).json([err, 'User not found']);
                } else {
                    if (fields.includes('address_type')) {
                        const {
                            address, town, City, postal_code,
                            State, lga, Country,
                        } = req.body
                        if (req.body.address_type === 'res_home') {
                            student.res_home_address = {
                                address, town, City, postal_code,
                                State, lga, Country,
                            }
                        } else if (req.body.address_type === 'pert_home') {
                            student.pemt_home_address = {
                                address, town, City, postal_code,
                                State, lga, Country,
                            }
                        }
                    }
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
                else if (field === 'classes_been') {
                    err = validateFormFields({ [field]: req.body[field] }, { [field]: 'array' });
                }
                else {
                    err = validateFormFields({ [field]: req.body[field] }, { [field]: '' });
                }
                if (!isEmptyArrayOrObject(err)) {
                    return res.status(400).json([err, 'User not found']);
                }

                if (field === 'current_class') {
                    student[field] = req.body[field];
                    if (!student.classes_been.includes(req.body[field])) {
                        student.classes_been.push(req.body[field]);
                    }
                } else if (field === 'classes_been') {
                    const val = req.body[field];
                    for (let v of val) {
                        if (!student.classes_been.includes(v)) {
                            student.classes_been.push(v);
                        }
                    }
                } else {
                    student[field] = req.body[field];
                }

            }
        }
        await student.save();

        res.json(student);
    } catch (error) {
        res.status(401).json(error.message);
    }
}

exports.update_parent_data = async (req, res) => {
    try {
        if (isEmptyArrayOrObject(req.query)) {
            return res.status(401).json({ message: 'Not allowed' });
        }

        const parent = await Parent.findById(req.query.id);
        if (!parent) {
            return res.status(401).json({ message: "User not found" });
        }
        const fields = Object.keys(req.body);
        if (fields.length >= 2) {
            if (fields.includes('last_name')) {
                const err = validateFormFields(req.body, {
                    last_name: 'min_length',
                    first_name: 'min_length',
                }, { optionalFields: ['other_names'], minLength: 3 })
                if (!isEmptyArrayOrObject(err)) {
                    return res.status(401).json([err, 'updateErr']);
                } else {
                    parent.name = {
                        last_name: req.body.last_name,
                        first_name: req.body.first_name,
                        other_names: req.body.other_names
                    }
                }
            } else if (fields.includes('address')) {
                const err = validateFormFields(req.body, {
                    address: 'min_length',
                    town: 'min_length',
                    City: 'min_length',
                    postal_code: 'min_length',
                    State: 'select',
                    lga: 'select',
                    Country: 'select',
                }, { optionalFields: ['town', 'City', 'postal_code'], minLength: 3 });

                if (!isEmptyArrayOrObject(err)) {
                    return res.status(401).json([err, 'User not found']);
                } else {
                    const {
                        address, town, City, postal_code,
                        State, lga, Country,
                    } = req.body
                    parent.office = {
                        address, town, City, postal_code,
                        State, lga, Country,
                    }
                }
            }

        } else {
            for (const field of fields) {
                let err = null;
                if (field === 'email') {
                    err = validateFormFields({ [field]: req.body[field] }, { [field]: 'email' });
                }
                else if (field === 'phone_number') {
                    err = validateFormFields({ [field]: req.body[field] }, { [field]: 'phone' });
                }
                else {
                    err = validateFormFields({ [field]: req.body[field] }, { [field]: '' });
                }
                if (!isEmptyArrayOrObject(err)) {
                    return res.status(400).json([err, 'User not found']);
                }
                parent[field] = req.body[field];
            }
        }
        await parent.save();

        const student = await Student.findById(parent.children[0])
            .populate('parent_id');

        res.json(student);
    } catch (error) {
        res.status(401).json(error.message);

    }
}

exports.add_parent = async (req, res) => {
    try {
        const id = req.query.id
        const student = await Student.findById(id);
        if (!student) {
            return res.status(401).json({ message: 'Unauthoried access' })
        }
        const valErr = validateFormFields(req.body, {
            parent_last_name: 'min_length',
            parent_first_name: 'min_length',
            parent_phone_number: 'phone',
            parent_email: 'email',
            relationship: 'select',
            address: 'min_length',
            town: 'min_length',
            City: 'min_length',
            postal_code: 'min_length',
            parent_occpation: 'min_length',
            State: 'select',
            lga: 'select',
            Country: 'select',
        }, { optionalFields: ['parent_email', 'town', 'City', 'postal_code'], minLength: 3 });
        if (!isEmptyArrayOrObject(valErr)) {
            return res.status(401).json([valErr, 'updateErr']);
        }
        const {
            parent_last_name, parent_first_name,
            parent_phone_number, parent_email,
            address, town, City, postal_code, relationship,
            parent_occpation, State, lga, Country,
        } = req.body;

        const parent = new Parent({
            name: {
                last_name: parent_last_name,
                first_name: parent_first_name
            },
            phone_number: parent_phone_number,
            email: parent_email,
            occpation: parent_occpation,
            relationship,
            office: {
                address, town, City, postal_code,
                State, lga, Country,
            },
        });

        await parent.save();

        parent.children.push(student._id);
        student.parent_id = parent._id;

        await Promise.all([student.save(), parent.save()]);

        const nstudent = await Student.findById(student._id).populate('parent_id');;
        res.json(nstudent);
    } catch (error) {
        res.status(401).json(error.message);
    }
}