export const classes = [
    {
        label: "JSS1",
        value: "jss1"
    },
    {
        label: "JSS2",
        value: "jss2"
    },
    {
        label: "JSS3",
        value: "jss3"
    },
    {
        label: "SS1",
        value: "ss1"
    },
    {
        label: "SS2",
        value: "ss2"
    },
    {
        label: "SS3",
        value: "ss3"
    },
    {
        label: "None",
        value: "none"
    },
]

export const bloodGroups = [
    {
        label: "A+",
        value: "A+"
    },
    {
        label: "A-",
        value: "A-"
    },
    {
        label: "AB+",
        value: "AB+"
    },
    {
        label: "AB-",
        value: "AB-"
    },
    {
        label: "B+",
        value: "B+"
    },
    {
        label: "B-",
        value: "B-"
    },
    {
        label: "O+",
        value: "O+"
    },
    {
        label: "O-",
        value: "O-"
    },
    {
        label: "Others",
        value: "Others"
    },
]

export const genotypes = [
    {
        label: "AA",
        value: "AA"
    },
    {
        label: "AC",
        value: "AC"
    },
    {
        label: "AS",
        value: "AS"
    },
    {
        label: "SS",
        value: "SS"
    },
    {
        label: "Others",
        value: "Others"
    },
]

export const gender = [
    {
        label: "Female",
        value: "female"
    },
    {
        label: "Male",
        value: "male"
    },
]

export const studentStatus = [
    {
        label: 'Graduate',
        value: 'graduate',
    }, 
    {
        label: 'Left School',
        value:'left school'
    }, 
    {
        label: 'Student',
        value:'student'
    }, 
    {
        label: 'Others', 
        value: 'indeterminant'
    }
]

export const graduationLevel = [
    {value: 'junior', label: 'Junior'}, 
    {value: 'senior', label: 'Senior'}, 
    {value: 'both', label: 'Both'}, 
    {value: 'still-student', label: 'Still a Student'}, 
    {value: 'none', label: 'None'}
]

export const getSchoolFromClass = cls => {
    const senior = ['ss1', 'ss2', 'ss3'];
    // const junior = ['jss1', 'jss2', 'jss3'];
    if(senior.includes(cls.toLowerCase())){
        return 'Senior Secondary School';
    }
    return 'Junior Secondary School';
}