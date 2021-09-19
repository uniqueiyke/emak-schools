import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchStaff } from '../../redux/actions/staff-action';

const checkAuth = (WrappedComponenet) => {
    return function CheckAuth(props) {
        const staff = useSelector(state => state.staff);
        const dispatch = useDispatch();
        useEffect(() => {
            if(staff.isAuthenticated && staff.staff.data === null){
                dispatch(fetchStaff());
            }
            // eslint-disable-next-line
        }, []);
        return <WrappedComponenet { ...props} />
    }
}

export default checkAuth;