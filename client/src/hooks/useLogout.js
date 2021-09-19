import {  useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

/**
 * 
 * @param {function | object} action 
 * @param {string} routePath 
 * @returns {function} Function
 */
export default function useLogout(action, routePath) {
    const dispatch = useDispatch()
    const history = useHistory();

    const logout = () => {
        if(typeof(action) === 'function')
            dispatch(action());
        else dispatch(action)
        history.push(routePath);
    }

    return logout;
}
