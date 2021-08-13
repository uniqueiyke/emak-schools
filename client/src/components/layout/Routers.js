import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contacts from '../pages/Contacts';
// import Cards from './card/Cards';
// import Page404 from './Page404';
// import UserProfile from './users/UserProfile';
// import UserLoginForm from './users/UserLoginForm';
// import UserRegForm from './users/UserRegForm';
// import AuthRoute from './AuthRoute';
// import CreateCards from './card/CreateCards';

export default function Routers() {
    return (
        <div >
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
                {/* <AuthRoute exact path="/users/scratch-cards/:id?">
                    <Cards />
                </AuthRoute>
                <AuthRoute exact path="/users/create-cards">
                    <CreateCards />
                </AuthRoute>
                <Route exact path="/users/login">
                <UserLoginForm />
                </Route>
                <Route exact path="/users/register">
                    <UserRegForm />
                </Route>
                <AuthRoute exact path="/user/profile">
                    <UserProfile />
                </AuthRoute>
                <Route path="*">
                    <Page404 />
                </Route> */}
            </Switch>
        </div>
    )
}
