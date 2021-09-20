import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { useLocation } from 'react-router-dom';
import { confirmStaffRegToken } from '../../redux/actions/staff-action';

const checkStaffRegToken = (WrappedComponenet) => {
    return function CheckStaffRegToken(props) {
        const location = useLocation();
        const token = location.search.split('=')[1];
        console.log(token, 'from checkStaffRegToken');
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(confirmStaffRegToken(token));
            
             // eslint-disable-next-line
         }, []);
        const {data, error} = useSelector(state => state.staff.regPassport);
        
        return <WrappedComponenet data={data} error={error} token={token} {...props} />
    }
}

export default checkStaffRegToken;