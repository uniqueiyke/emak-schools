import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

const isAdmin = (superOnly = false) => {
  const token = localStorage.getItem('token');
  if (token) {
    let decodedJWT = jwtDecode(token);
    const tokenExpiration = decodedJWT.exp
    let dateNow = new Date();
    if (tokenExpiration > dateNow.getTime() / 1000) {
      const {roles} = decodedJWT.user;
      if(superOnly){
        if(roles.includes('super-admin')){
          return true;
        }
      }else if(roles.includes('admin') || roles.includes('super-admin')){
        return true;
      }
    }
  }
  return false
}

export default function AuthRoute({children, superOnly, ...rest}) {
  const isSuper = superOnly ? true : false;
  const {isAuthenticated} = useSelector(state => state.staff)
  return (isAuthenticated && isAdmin(isSuper)) ? (
    <Route {...rest}>
      { children }
    </Route>
  ) :
  (<Redirect to='/staff/data/profile' />)
}

AuthRoute.propTypes = {
  children: PropTypes.object,
  superOnly: PropTypes.bool,
}