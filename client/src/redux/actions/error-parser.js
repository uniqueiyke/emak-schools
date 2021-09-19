import { isEmptyObject, isNotEmptyObject } from "../../libs/utility-functions"

const serializeMessage = message =>{
    if(typeof(message) !== 'string' && isNotEmptyObject(message)){
        const keys = Object.keys(message);
        let msg = '';
        for (const key of keys) {
            msg += " " + message[key];
        }
        return msg;
    }
    else if(Array.isArray(message) && isEmptyObject(message)) {
        return 'Not Found'
    }
    else {
        return message;
    }
}
const errorParser =  (error) => {
    let message=''
    if(error){
        if(Array.isArray(error.data) && error.data.includes('updateErr')){
            message = error.data[0];
        }
        else if(error.data.message){
            message = serializeMessage(error.data.message);
        }
        else if(error.data){
            message = serializeMessage(error.data);
        }
    }else {
        message = 'Server could not be reach or something terrible happened. Check your url.'
    }
    return {
        message,
        status: error ? error.status : 500,
        statusText: error ? error.statusText : 'Internal Server Error',
    }
}

export default errorParser