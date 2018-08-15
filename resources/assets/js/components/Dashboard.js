import React from 'react';
import { connect } from 'react-redux';
import { 
  AppBreadcrumb,
  AppHeader, 
  AppSidebar, 
  AppSidebarHeader, 
  AppSidebarForm, 
  AppSidebarNav,
  AppSidebarFooter,
  AppSidebarMinimizer
} from '@coreui/react';
import DefaultHeader from '../Layout/DefaultHeader';
import { Container } from 'reactstrap';

// import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.css';

import navigation from '../_nav';
import routes from '../routes';

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
            </Container>
          </main>
        </div>
      </div>
    );
  }
};

Dashboard = connect(mapStateToProps)(Dashboard);

export default Dashboard;