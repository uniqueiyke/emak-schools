import jwtDecode from 'jwt-decode';

const defaulOptions = {
    admin: false, 
    staff: false,
    student: false,
}
const initialState = (options = defaulOptions) => {
    
    const token = localStorage.getItem('token');
    let isAuthenticated = false;
    if (token) {
        const tokenExpiration = jwtDecode(token).exp;
        const dateNow = new Date();
        if (tokenExpiration > dateNow.getTime() / 1000) {
            isAuthenticated = true;
        }
    }

    if(options.staff){
        return {
            isFetchingStaff: false,
            isUpdatingStaffData: 0,
            isAuthenticated,
            isConfirmingEmail: false,
            isUpdatingScores: false,
            staff: {
                data: null,
                error: null
            },
            regPassport: {
                data: null,
                error: null,
            },
            students: {
                data: null,
                error: null,
            },
            scores: {
                data: null,
                error: null,
            },
        }
    }

    if(options.admin){
        return {
            admin: {
                data: null,
                error: null
            },
            staffRegPassport: {
                data: null,
                error: null,
            },
            students: {
                data: null,
                error: null,
                isFetchingStudents: false,
            },
            resultManager: {
                data: null,
                error: null,
            },
            results: {
                isComputingResults: false,
                isFetchingResultSheet: false,
                data: null,
                error: null,
            },
            oneResult:  {
                data: null,
                error: null,
                isFetchingResult: false,
            },
            staffs: {
                data: null,
                error: null,
                isFetchingAllStaffs: false,
            },
            studentsClass: {
                data: null,
                error: null,
                isFetchingStudentsClass: false,
            },
            classSubjects: {
                data: null,
                error: null,
                isFetchingStudentsSubjects: false,
            },
            scratchCards: {
                data: null,
                error: null,
                isFetchingScratchCard: false,
            },
        }
    }

    if(options.student){
        return {
            student: {
                data: null,
                error: null,
                isFetchingAStudent: false,
            },
            result:  {
                data: null,
                error: null,
                isFetchingResult: false,
            },
        }
    }
}

export default initialState;