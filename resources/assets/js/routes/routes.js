import BackendLayout from '../Layout/BackendLayout';
import Dashboard from '../components/Dashboard';
import User from '../components/User/User';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/admin', exact: true, name: 'Home', component: BackendLayout },
  { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/admin/user', name: 'User', component: User}
];

export default routes;
