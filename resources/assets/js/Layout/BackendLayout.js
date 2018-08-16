import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { 
    AppBreadcrumb,
    AppAside,
    AppHeader, 
    AppSidebar, 
    AppFooter,
    AppSidebarHeader, 
    AppSidebarForm, 
    AppSidebarNav, 
    AppSidebarFooter,
    AppSidebarMinimizer 
} from '@coreui/react';
import Header from './Header';
import Aside from './Aside';
import Footer from './Footer';
import { Container } from 'reactstrap';

import navigation from '../_nav';
import routes from '../routes';

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

class BackendLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Header />
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
                    <Switch>
                        {
                            routes.map((route, index) => 
                            {
                                return route.component 
                                ? (<Route 
                                    key={index} 
                                    path={route.path} 
                                    exact={route.exact} 
                                    name={route.name} 
                                    render={ props => (
                                        <route.component {...props} />
                                    )} 
                                />)
                                : (null);
                            })
                        }
                    </Switch>
                </Container>
            </main>
            <AppAside fixed hidden>
                <Aside />
            </AppAside>
        </div>
        <AppFooter>
            <Footer />
        </AppFooter>
      </div>
      );
  }
}
;

BackendLayout = connect(mapStateToProps)(BackendLayout);

export default BackendLayout;