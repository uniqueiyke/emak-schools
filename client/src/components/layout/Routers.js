import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contacts from '../pages/Contacts';
import StaffRegForm from '../pages/staffs/StaffRegForm';
import StudentRegForm from '../pages/students/StudentRegForm';
import StaffLogin from '../pages/staffs/StaffLogin';
import StaffProfile from '../pages/staffs/StaffProfile';
import AuthRoute from '../auth-components/AuthRoute';
import StaffDashboard from '../pages/staffs/StaffDashboard';
import Page404 from '../other-components/Page404';
import ToAdminPanel from '../auth-components/ToAdminPanel';
import ErrorBoundary from '../other-components/ErrorBoundary'
import ListOfStudents from '../pages/students/ListOfStudents';
import StudentProfile from '../pages/students/StudentProfile';
import AdminAuthRoute from '../auth-components/AdminAuthRoute';
import ResetPassword from '../pages/staffs/ResetPassword';
import ConfirmEmail from '../pages/staffs/ConfirmEmail';

export default function Routers() {
    return (
        <ErrorBoundary>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/about">
                    <About />
                </Route>
                <Route exact path="/contacts">
                    <Contacts />
                </Route>
                <AdminAuthRoute exact path="/admin/admin-panel">
                    <ToAdminPanel />
                </AdminAuthRoute>
                <Route exact path="/staff/registration">
                    <StaffRegForm />
                </Route>
                <AuthRoute exact path="/staff/data/profile">
                    <StaffProfile />
                </AuthRoute>
                <Route exact path="/staffs/login">
                    <StaffLogin />
                </Route>
                <Route exact path="/staffs/confirm-email">
                    <ConfirmEmail />
                </Route>
                <Route exact path="/staffs/password/reset">
                    <ResetPassword />
                </Route>
                <AdminAuthRoute exact path="/admin/add-student">
                    <StudentRegForm />
                </AdminAuthRoute>
                <AuthRoute exact path="/staff/data/dashboard">
                    <StaffDashboard />
                </AuthRoute>
                <AdminAuthRoute exact path="/admin/students/list">
                    <ListOfStudents />
                </AdminAuthRoute>
                <AdminAuthRoute exact path="/admin/students/student/profile/:id">
                    <StudentProfile />
                </AdminAuthRoute>
                <Route path="*">
                    <Page404 />
                </Route>
            </Switch>
        </ErrorBoundary>
    )
}
