import HeartSummary from '../pages/heartSummary';
import SignIn from '../pages/login';
import LogIn from '../pages/loginclass';
import NotFound from '../pages/notFound';
import Overview from '../pages/overview';
import Schedule from '../pages/schedule';
import Snapshot from '../pages/snapshot';

const initNavigations = [
  {
    path: '/login',
    name: 'login',
    component: SignIn,
  },
  {
    path: '/login-class',
    name: 'login-class',
    component: LogIn,
  },
  {
    path: '/schedule',
    name: 'chedule',
    component: Schedule,
  },
  {
    path: '/overview',
    name: 'overview',
    component: Overview,
  },
  {
    path: '/heart-summary',
    name: 'heart-summary',
    component: HeartSummary,
  },
  {
    path: '/snapshot',
    name: 'snapshot',
    component: Snapshot,
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound,
  },
];

export default initNavigations;
