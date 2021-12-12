import { isAdmin } from './client-page-auth';
import { isEmptyArrayOrObject } from './utility-functions';

export const subjects = [
    {
        serial_code: 1,
        subject_code: "001",
        label: "English Language",
        value: "eng_lang",
        offer_by: "all",
        short_title: "ENG"
    },
    {
        serial_code: 2,
        subject_code: "002",
        label: "Mathematics",
        value: "maths",
        offer_by: "all",
        short_title: "MTH"
    },
    {
        serial_code: 3,
        subject_code: "003",
        label: "Igbo Language",
        value: "igbo_lang",
        offer_by: "all",
        short_title: "IGO"
    },
    {
        serial_code: 4,
        subject_code: "004",
        label: "Civic Education",
        value: "civic_edu",
        offer_by: "all",
        short_title: "CIV"
    },
    {
        serial_code: 5,
        subject_code: "005",
        label: "Biology",
        value: "biology",
        offer_by: "senior",
        short_title: "BIO"
    },
    {
        serial_code: 6,
        subject_code: "006",
        label: "Physics",
        value: "physics",
        offer_by: "senior",
        short_title: "PHY"
    },
    {
        serial_code: 7,
        subject_code: "007",
        label: "Chemistry",
        value: "chemistry",
        offer_by: "senior",
        short_title: "CHEM"
    },
    {
        serial_code: 8,
        subject_code: "008",
        label: "Animal Husbandary",
        value: "animal_hus",
        offer_by: "senior",
        short_title: "AHB"
    },
    {
        serial_code: 9,
        subject_code: "009",
        label: "Computer Science",
        value: "com_sci",
        offer_by: "all",
        short_title: "COM"
    },
    {
        serial_code: 10,
        subject_code: "010",
        label: "Agricultural Science",
        value: "agric_sci",
        offer_by: "all",
        short_title: "AGS"
    },
    {
        serial_code: 11,
        subject_code: "011",
        label: "Economics",
        value: "economics",
        offer_by: "senior",
        short_title: "ECO"
    },
    {
        serial_code: 12,
        subject_code: "012",
        label: "Christian Religious Studies",
        value: "crs",
        offer_by: "all",
        short_title: "CRS"
    },
    {
        serial_code: 13,
        subject_code: "013",
        label: "Government",
        value: "government",
        offer_by: "senior",
        short_title: "GOV"
    },
    {
        serial_code: 14,
        subject_code: "014",
        label: "English Literature",
        value: "eng_lit",
        offer_by: "all",
        short_title: "ENL"
    },
    {
        serial_code: 15,
        subject_code: "015",
        label: "Geography",
        value: "geography",
        offer_by: "senior",
        short_title: "GEO"
    },
    {
        serial_code: 16,
        subject_code: "016",
        label: "Accounting",
        value: "accounting",
        offer_by: "senior",
        short_title: "ACO"
    },
    {
        serial_code: 17,
        subject_code: "017",
        label: "Marketing",
        value: "marketing",
        offer_by: "senior",
        short_title: "MAK"
    },
    {
        serial_code: 18,
        subject_code: "018",
        label: "Comerce",
        value: "comerce",
        offer_by: "senior",
        short_title: "CME"
    },
    {
        serial_code: 19,
        subject_code: "019",
        label: "Basic Science",
        value: "basic_sci",
        offer_by: "junior",
        short_title: "BCI"
    },
    {
        serial_code: 20,
        subject_code: "020",
        label: "Basic Technology",
        value: "basic_tech",
        offer_by: "junior",
        short_title: "BTEC"
    },
    {
        serial_code: 21,
        subject_code: "021",
        label: "Social Studies",
        value: "social_stud",
        offer_by: "junior",
        short_title: "SOS"
    },
    {
        serial_code: 22,
        subject_code: "022",
        label: "Cultural and Creative Art",
        value: "cca",
        offer_by: "junior",
        short_title: "CCA"
    },
    {
        serial_code: 23,
        subject_code: "023",
        label: "Business Studies",
        value: "bus_stud",
        offer_by: "junior",
        short_title: "BUS"
    },
    {
        serial_code: 24,
        subject_code: "024",
        label: "Music",
        value: "music",
        offer_by: "junior",
        short_title: "MUS"
    },
    {
        serial_code: 25,
        subject_code: "025",
        label: "Physical and Health Education",
        value: "phe",
        offer_by: "junior",
        short_title: "PHE"
    },
    {
        serial_code: 26,
        subject_code: "026",
        label: "Home Economics",
        value: "home_econs",
        offer_by: "junior",
        short_title: "HOM"
    },
    {
        serial_code: 27,
        subject_code: "027",
        label: "French",
        value: "french",
        offer_by: "junior",
        short_title: "FRE"
    },
    {
        serial_code: 28,
        subject_code: "028",
        label: "Current Affiers",
        value: "cur_aff",
        offer_by: "all",
        short_title: "CAF"
    },
]


export const terms = [
    {
        code: 1,
        value: "First Term",
        label: "First Term"
    },
    {
        code: 2,
        value: "Second Term",
        label: "Second Term"
    },
    {
        code: 3,
        value: "Third Term",
        label: "Third Term"
    },
]

export const subjectTitle = (subject) => {
    const subj = subjects.find(elem => elem.value === subject)
    return subj.label || subject;
}

export const subjectVal = (subject) => {
    const subj = subjects.find(elem => elem.label === subject)
    return subj.value || subject;
}

export const filterSubjectsByClass = (cls, subPerTeacher = []) => {
    const c = cls.toLowerCase()
    let fiteredSubj = [];
    if (c === 'jss1' || c === 'jss2' || c === 'jss3') {
        fiteredSubj = subjects.filter(subject => subject.offer_by === 'all' || subject.offer_by === 'junior')
    } else if (c === 'ss1' || c === 'ss2' || c === 'ss3') {
        fiteredSubj = subjects.filter(subject => subject.offer_by === 'all' || subject.offer_by === 'senior')
    }

    if (isAdmin(true)){
        return fiteredSubj;
    }else{
        const teachersSubj = !isEmptyArrayOrObject(subPerTeacher) ? subPerTeacher : []
        return fiteredSubj.filter(s => teachersSubj.includes(s.value))
    }
}