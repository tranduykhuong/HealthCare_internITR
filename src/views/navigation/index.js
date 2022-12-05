import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/privateRoute';
import SignIn from '../pages/login';
import NotFound from '../pages/notFound';
import Profile from '../pages/profile';

import PrivateNavigation from './privateNavigation';

function Navigation() {
  return (
    <main>
      <Router>
        <Switch>
          <Route path="/login" component={SignIn} />
          <PrivateRoute path="/complete-profile" component={Profile} />
          <PrivateRoute path="/edit-profile" component={Profile} />
          <PrivateNavigation />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </main>
  );
}

export default Navigation;
