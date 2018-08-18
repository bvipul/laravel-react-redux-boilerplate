import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { authLogout } from '../store/actions';

import Server from '../Helpers/Server';

// import logo from '../../assets/img/brand/logo.svg';
// import sygnet from '../../assets/img/brand/sygnet.svg';

const propTypes = {
    children: PropTypes.node,
};

// full={{
//   src: logo,
//   width: 89,
//   height: 25,
//   alt: 'CoreUI Logo'
// }}
// minimized={{
//   src: sygnet,
//   width: 30,
//   height: 30,
//   alt: 'CoreUI Logo'
// }}

const defaultProps = {};

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        Server
        .post('/api/logout')
        .then(({ data: { success }}) => {
            if (success) this.props.authLogout();
        })
        .catch((error) => {
            const {response: {data: {error: {message}}}} = error;
            this.props.errors(new Array(message));
        });
    }

    render() {
        // eslint-disable-next-line
        const {children, ...attributes} = this.props;

        return (
            <React.Fragment>
                <AppSidebarToggler className="d-lg-none" display="md" mobile />
                <AppNavbarBrand>LARP</AppNavbarBrand>
                <AppSidebarToggler className="d-md-down-none" display="lg" />

                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        <NavLink href="/admin/dashboard">Dashboard</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink href="/admin/user">Users</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink href="/admin/settings">Settings</NavLink>
                    </NavItem>
                </Nav>

                <Nav className="ml-auto" navbar>
                    <NavItem className="d-md-down-none">
                        <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
                    </NavItem>
                    <NavItem className="d-md-down-none">
                        <NavLink href="#"><i className="icon-list"></i></NavLink>
                    </NavItem>
                    <NavItem className="d-md-down-none">
                        <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
                    </NavItem>
                    
                    <AppHeaderDropdown direction="down">
                        <DropdownToggle nav>
                            <span>{this.props.user.name}</span>
                        </DropdownToggle>
                        <DropdownMenu right style={{right: 'auto'}}>
                            <DropdownItem header tag="div" className="text-center">
                                <strong>Settings</strong>
                            </DropdownItem>
                            <DropdownItem>
                                <i className="fa fa-user"></i> Profile
                            </DropdownItem>
                            <DropdownItem>
                                <i className="fa fa-wrench"></i> Settings
                            </DropdownItem>
                            <DropdownItem onClick={this.handleLogout}>
                                <i className="fa fa-lock"></i> Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </AppHeaderDropdown>
                </Nav>
                <AppAsideToggler className="d-md-down-none" />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user 
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        authLogout
    }, dispatch);
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
