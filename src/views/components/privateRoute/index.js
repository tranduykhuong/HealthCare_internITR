import React from 'react';
import PropTypes from 'prop-types';
import {
  Route, Redirect, Switch, useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import auth from '../../../utils/auth';

const PrivateRoute = ({
  component: Component, name, path, ...past
}) => {
  const authenticated = auth.isLoginSuccess();
  const isProfileCompleted = useSelector(state => state.login.isProfileCompleted);
  const location = useLocation();

  if (!authenticated) {
    return (
      <Switch>
        <Redirect to={{ pathname: '/login' }} />
      </Switch>
    );
  }

  if (!isProfileCompleted && location?.pathname !== '/complete-profile') {
    return (
      <Switch>
        <Redirect to={{ pathname: '/complete-profile' }} />
      </Switch>
    );
  }

  return (
    <Route
      {...past}
      path={path}
      name={name}
      render={() => <Component />}
    />
  );
};

PrivateRoute.defaultProps = {
  name: '',
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  name: PropTypes.string,
};

export default PrivateRoute;
