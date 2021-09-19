import React  from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AdminPanel from '../pages/admin/AdminPanel';
import checkAuth from './CheckAuth';
import DataFetchingProgress from '../other-components/DataFetchingProgress';
import useWaitForDataReady from '../../hooks/useWaitForDataReady';

function ToAdminPanel() {
    const staff = useSelector(state => state.staff);
    const { data } = staff.staff;
    const isDataFechted = useWaitForDataReady(data);

    if (staff.isFetchingStaff || !isDataFechted) {
        return <DataFetchingProgress />
    }
    else if ((data  && (data.roles.includes('admin') || data.roles.includes('super-admin')))) {
        return <AdminPanel />
    }
    else {
        return <Redirect to='/staff/data/dashboard' />
    }
}

export default checkAuth(ToAdminPanel);
