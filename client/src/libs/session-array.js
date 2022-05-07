const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;

export const sessions = (startYear = year-1, numOfSessions = 3) => {
    const arrayOfSession = [];
    for (let index = 0; index < numOfSessions; index++) {
        const label = `${startYear + index}/${startYear + (index + 1)}`;
        arrayOfSession.push({label, value: label});
    }

    return arrayOfSession;
}

export const currentAcademicYear = () => {
    if(month >= 9){
        return `${year}/${year + 1}`;
    }
    return `${year - 1}/${year}`;
}

export const currentTerm = () => {
    if(month >= 1 && month <= 4){
        return "Second Term";
    }
    if(month >= 5 && month <= 8){
        return "Third Term"
    }
    return "First Term"
}

export const classStream = (numOfStreams = 6) => {
    const START_CODE_UP = 65;
    const arrayOfStreams = [];
    for (let index = 0; index < numOfStreams; index++) {
        const label = String.fromCharCode(START_CODE_UP + index);
        arrayOfStreams.push({label, value: label});
    }

    return arrayOfStreams;
} 

