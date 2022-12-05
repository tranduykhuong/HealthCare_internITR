import React from 'react';
import { Switch } from 'react-router-dom';
import Layout from '../components/layout';
import PrivateRoute from '../components/privateRoute';
import initNavigations from './initNavigations';

function PrivateNavigation() {
  return (
    <Layout>
      <Switch>
        {initNavigations.map((item, idx) => (
          <PrivateRoute
            key={+idx}
            path={item.path}
            name={item.name}
            component={item.component}
          />
        ))}
      </Switch>
    </Layout>
  );
}

export default PrivateNavigation;
