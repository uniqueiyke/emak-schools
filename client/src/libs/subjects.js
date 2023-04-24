import { isAdmin } from './client-page-auth';
import { isEmptyArrayOrObject } from './utility-functions';

export const subjectsObject = {
    eng_lang: {
        serial_code: 1,
        subject_code: "001",
        label: "English Language",
        value: "eng_lang",
        offer_by: "all",
        short_title: "ENG"
    },
    maths: {
        serial_code: 2,
        subject_code: "002",
        label: "Mathematics",
        value: "maths",
        offer_by: "all",
        short_title: "MTH"
    },
    igbo_lang: {
        serial_code: 3,
        subject_code: "003",
        label: "Igbo Language",
        value: "igbo_lang",
        offer_by: "all",
        short_title: "IGO"
    },
    civic_edu: {
        serial_code: 4,
        subject_code: "004",
        label: "Civic Education",
        value: "civic_edu",
        offer_by: "all",
        short_title: "CIV"
    },
    biology: {
        serial_code: 5,
        subject_code: "005",
        label: "Biology",
        value: "biology",
        offer_by: "senior",
        short_title: "BIO"
    },
    physics: {
        serial_code: 6,
        subject_code: "006",
        label: "Physics",
        value: "physics",
        offer_by: "senior",
        short_title: "PHY"
    },
    chemistry: {
        serial_code: 7,
        subject_code: "007",
        label: "Chemistry",
        value: "chemistry",
        offer_by: "senior",
        short_title: "CHEM"
    },
    animal_hus: {
        serial_code: 8,
        subject_code: "008",
        label: "Animal Husbandary",
        value: "animal_hus",
        offer_by: "senior",
        short_title: "AHB"
    },
    com_sci: {
        serial_code: 9,
        subject_code: "009",
        label: "Computer Science",
        value: "com_sci",
        offer_by: "all",
        short_title: "COM"
    },
    agric_sci: {
        serial_code: 10,
        subject_code: "010",
        label: "Agricultural Science",
        value: "agric_sci",
        offer_by: "all",
        short_title: "AGS"
    },
    economics: {
        serial_code: 11,
        subject_code: "011",
        label: "Economics",
        value: "economics",
        offer_by: "senior",
        short_title: "ECO"
    },
    crs: {
        serial_code: 12,
        subject_code: "012",
        label: "Christian Religious Studies",
        value: "crs",
        offer_by: "all",
        short_title: "CRS"
    },
    government: {
        serial_code: 13,
        subject_code: "013",
        label: "Government",
        value: "government",
        offer_by: "senior",
        short_title: "GOV"
    },
    eng_lit: {
        serial_code: 14,
        subject_code: "014",
        label: "English Literature",
        value: "eng_lit",
        offer_by: "all",
        short_title: "ENL"
    },
    geography: {
        serial_code: 15,
        subject_code: "015",
        label: "Geography",
        value: "geography",
        offer_by: "senior",
        short_title: "GEO"
    },
    accounting: {
        serial_code: 16,
        subject_code: "016",
        label: "Accounting",
        value: "accounting",
        offer_by: "senior",
        short_title: "ACO"
    },
    marketing: {
        serial_code: 17,
        subject_code: "017",
        label: "Marketing",
        value: "marketing",
        offer_by: "senior",
        short_title: "MAK"
    },
    comerce: {
        serial_code: 18,
        subject_code: "018",
        label: "Comerce",
        value: "comerce",
        offer_by: "senior",
        short_title: "CME"
    },
    basic_sci: {
        serial_code: 19,
        subject_code: "019",
        label: "Basic Science",
        value: "basic_sci",
        offer_by: "junior",
        short_title: "BCI"
    },
    basic_tech: {
        serial_code: 20,
        subject_code: "020",
        label: "Basic Technology",
        value: "basic_tech",
        offer_by: "junior",
        short_title: "BTEC"
    },
    social_stud: {
        serial_code: 21,
        subject_code: "021",
        label: "Social Studies",
        value: "social_stud",
        offer_by: "junior",
        short_title: "SOS"
    },
    cca: {
        serial_code: 22,
        subject_code: "022",
        label: "Cultural and Creative Art",
        value: "cca",
        offer_by: "junior",
        short_title: "CCA"
    },
    bus_stud: {
        serial_code: 23,
        subject_code: "023",
        label: "Business Studies",
        value: "bus_stud",
        offer_by: "junior",
        short_title: "BUS"
    },
    music: {
        serial_code: 24,
        subject_code: "024",
        label: "Music",
        value: "music",
        offer_by: "junior",
        short_title: "MUS"
    },
    phe: {
        serial_code: 25,
        subject_code: "025",
        label: "Physical and Health Education",
        value: "phe",
        offer_by: "junior",
        short_title: "PHE"
    },
    home_econs: {
        serial_code: 26,
        subject_code: "026",
        label: "Home Economics",
        value: "home_econs",
        offer_by: "junior",
        short_title: "HOM"
    },
    french: {
        serial_code: 27,
        subject_code: "027",
        label: "French",
        value: "french",
        offer_by: "junior",
        short_title: "FRE"
    },
    cur_aff: {
        serial_code: 28,
        subject_code: "028",
        label: "Current Affiers",
        value: "cur_aff",
        offer_by: "all",
        short_title: "CAF"
    },
    history: {
        serial_code: 29,
        subject_code: "029",
        label: "History",
        value: "history",
        offer_by: "all",
        short_title: "HIS"
    },
    Voc_Stud: {
        serial_code: 30,
        subject_code: "030",
        label: "Vocational Studies",
        value: "Voc_Stud",
        offer_by: "all",
        short_title: "PVS"
    },
}


export const termsObject = {
    "First Term": {
        code: 1,
        value: "First Term",
        label: "First Term",
        short_title: "1st"
    },
    "Second Term": {
        code: 2,
        value: "Second Term",
        label: "Second Term",
        short_title: "2nd"
    },
    "Third Term": {
        code: 3,
        value: "Third Term",
        label: "Third Term",
        short_title: "3rd"
    },
}

const subjectsKeys = Object.keys(subjectsObject)
const termsKeys = Object.keys(termsObject)

const getSubjectArray = () => {
    const s_arr = [];
    for (const key of subjectsKeys) {
        s_arr.push(subjectsObject[key]);
    }
    return s_arr;
}

const getTermsArray = () => {
    const t_arr = [];
    for (const key of termsKeys) {
        t_arr.push(termsObject[key]);
    }
    return t_arr;
}

export const subjects = getSubjectArray();
export const terms = getTermsArray();


/**
 * 
 * @param {string} type 
 * @param {string} level 
 * @param {array} subPerTeacher 
 * @returns {object|array}
 */
export const filterSubjectsByLevel = (type = 'obj', level = 'j', subPerTeacher = []) => {
    level = (level.toLowerCase() === 's' || level.toLowerCase() === 'senior') ? 'senior' : 'junior';
    type = type.toLowerCase() === 'arr' ? 'arr' : 'obj';
    const filteredSubjects = type === 'arr' ? [] : {};
    subPerTeacher = !isEmptyArrayOrObject(subPerTeacher) ? subPerTeacher : []

    if (type === 'arr') {
        if (level === 'senior') {
            for (const key of subjectsKeys) {
                if (subjectsObject[key].offer_by !== 'junior') {
                    if (isAdmin(true)) {
                        filteredSubjects.push(subjectsObject[key]);
                    } else {
                        if (subPerTeacher.includes(key)) {
                            filteredSubjects.push(subjectsObject[key]);
                        }
                    }
                }
            }
        } else {
            for (const key of subjectsKeys) {
                if (subjectsObject[key].offer_by !== 'senior') {
                    if (isAdmin(true)) {
                        filteredSubjects.push(subjectsObject[key]);
                    } else {
                        if (subPerTeacher.includes(key)) {
                            filteredSubjects.push(subjectsObject[key]);
                        }
                    }
                }
            }
        }
    } else {
        if (level === 'senior') {
            for (const key of subjectsKeys) {
                if (subjectsObject[key].offer_by !== 'junior') {
                    if (isAdmin(true)) {
                        filteredSubjects[key] = subjectsObject[key];
                    } else {
                        if (subPerTeacher.includes(key)) {
                            filteredSubjects[key] = subjectsObject[key];
                        }
                    }
                }
            }
        } else {
            for (const key of subjectsKeys) {
                if (subjectsObject[key].offer_by !== 'senior') {
                    if (isAdmin(true)) {
                        filteredSubjects[key] = subjectsObject[key];
                    } else {
                        if (subPerTeacher.includes(key)) {
                            filteredSubjects[key] = subjectsObject[key];
                        }
                    }
                }
            }
        }
    }

    return filteredSubjects;
}


/**
 * 
 * @param {string} field serial_code | subject_code | label | value | offer_by | short_title
 * @returns 
 */

export const subjectField = (key, field) => {
    if (!field || !key) return '';
    return subjectsObject[key][field];
}

export const subjectVal = (subject) => {
    if (!subject) return '';
    for (const key of subjectsKeys) {
        if(subjectsObject[key].label === subject){
            return key;
        }
    }
    return subject;
}

export const getLevelFromClass = c => {
    if(c === 'jss1' || c === 'jss2' || c === 'jss3' ){
        return 'j';
    }else {
        return 's';
    }
}