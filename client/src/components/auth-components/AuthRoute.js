import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function AuthRoute({children, ...rest}) {

  const {isAuthenticated} = useSelector(state => state.staff)
  return isAuthenticated ? (
    <Route {...rest}>
      { children }
    </Route>
  ) :
  (<Redirect to='/' />)
}

AuthRoute.propTypes = {
  children: PropTypes.object
}