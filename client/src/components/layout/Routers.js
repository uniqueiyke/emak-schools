import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contacts from '../pages/Contacts';
import StaffRegistration from '../pages/staffs/StaffRegistration';
import StudentRegForm from '../pages/students/StudentRegForm';
import StaffLogin from '../pages/staffs/StaffLogin';
import StaffProfile from '../pages/staffs/StaffProfile';
import AuthRoute from '../auth-components/AuthRoute';
import StaffDashboard from '../pages/staffs/StaffDashboard';
import Page404 from '../other-components/Page404';
import ToAdminPanel from '../auth-components/ToAdminPanel';
import ErrorBoundary from '../other-components/ErrorBoundary';
import StudentProfile from '../pages/students/StudentProfile';
import AdminAuthRoute from '../auth-components/AdminAuthRoute';
import ResetPassword from '../pages/staffs/ResetPassword';
import ConfirmEmail from '../pages/staffs/ConfirmEmail';
import StudentSelectTable from '../grade-book/StudentSelectTable';
// import TestApp from '../test-components/TestApp';
import CurrentStudentsList from '../pages/students/CurrentStudentsList';
import StudentPresentAndPast from '../pages/students/StudentPresentAndPast';
import GradeBook from '../grade-book/GradeBook';
import GradeScoreForm from '../grade-book/GradeScoreForm';
import ResultSheet from '../grade-book/ResultSheet';
import ResultSlipByAdmin from '../grade-book/ResultSlipByAdmin';
import AllStaff from '../pages/staffs/AllStaff';
import RegisterStaff from '../pages/admin/RegisterStaff';
import StudentsInClassPerTerm from '../grade-book/StudentsInClassPerTerm';
import SubjectsListPerTerm from '../grade-book/SubjectsListPerTerm';
import Cards from '../scratch-cards/Cards';
import CardsForPrinting from '../scratch-cards/CardsForPrinting';
import ResultCheckerForm from '../grade-book/ResultCheckerForm';
import ResultChecker from '../grade-book/ResultChecker';

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
                    <StaffRegistration />
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
                <AdminAuthRoute exact path="/admin/current-students/list">
                    <CurrentStudentsList />
                </AdminAuthRoute>
                <AdminAuthRoute exact path="/admin/all-students/list">
                    <StudentPresentAndPast />
                </AdminAuthRoute>
                <AdminAuthRoute exact path="/admin/students/select-students">
                    <StudentSelectTable />
                </AdminAuthRoute>
                <AdminAuthRoute exact path="/admin/students/student/profile/:id">
                    <StudentProfile />
                </AdminAuthRoute>
                <AdminAuthRoute exact path="/admin/students/result-sheet">
                    <ResultSheet />
                </AdminAuthRoute>
                <AdminAuthRoute exact superOnly path="/admin/students/result-slip" >
                    <ResultSlipByAdmin />
                </AdminAuthRoute>
                <AdminAuthRoute exact superOnly path="/admin/all-staff" >
                    <AllStaff />
                </AdminAuthRoute>
                <AdminAuthRoute exact superOnly path="/admin/register-staff" >
                    <RegisterStaff />
                </AdminAuthRoute>
                <AdminAuthRoute exact superOnly path="/admin/students/class-termly" >
                    <StudentsInClassPerTerm />
                </AdminAuthRoute>
                <AdminAuthRoute exact superOnly path="/admin/students/class/termly/subjects" >
                    <SubjectsListPerTerm />
                </AdminAuthRoute>
                <AdminAuthRoute exact superOnly path="/admin/all/scratch-cards" >
                    <Cards all/>
                </AdminAuthRoute>
                <AdminAuthRoute exact superOnly path="/admin/avaliable/scratch-cards" >
                    <Cards />
                </AdminAuthRoute>
                <AdminAuthRoute exact superOnly path="/admin/print-cards" >
                    <CardsForPrinting />
                </AdminAuthRoute>
                <AuthRoute exact path="/staff/dashboard/grade-book/:subject">
                    <GradeBook />
                </AuthRoute>
                <AuthRoute exact path="/staff/dashboard/grade-book/student/:id">
                    <GradeScoreForm />
                </AuthRoute>
                <Route exact path="/student/result-checker">
                    <ResultCheckerForm />
                </Route>
                <Route exact path="/student/result-checker/result-slip">
                    <ResultChecker />
                </Route>
                {/* <Route exact path="/test/components">
                    <TestApp />
                </Route> */}
                <Route path="*">
                    <Page404 />
                </Route>
            </Switch>
        </ErrorBoundary>
    )
}
