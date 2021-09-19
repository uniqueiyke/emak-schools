import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isAdmin } from '../../libs/client-page-auth';

export default function AdminAuthRoute({children, superOnly, ...rest}) {
  const isSuper = superOnly ? true : false;
  const {isAuthenticated} = useSelector(state => state.staff)
  return (isAuthenticated && isAdmin(isSuper)) ? (
    <Route {...rest}>
      { children }
    </Route>
  ) :
  (<Redirect to='/staff/data/profile' />)
}

AdminAuthRoute.propTypes = {
  children: PropTypes.object,
  superOnly: PropTypes.bool,
}