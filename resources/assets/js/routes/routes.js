import BackendLayout from '../Layout/BackendLayout';
import Dashboard from '../components/Dashboard';
import List from '../components/User/List';
import Create from '../components/User/Create';
import Edit from '../components/User/Edit';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/admin', exact: true, name: 'Home', component: BackendLayout },
  { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/admin/user', exact: true, name: 'User Management', component: List },
  { path: '/admin/user/create', name: 'Create User', component: Create },
  { path: '/admin/user/:id/edit', name: 'Edit User', component: Edit }
];

export default routes;
