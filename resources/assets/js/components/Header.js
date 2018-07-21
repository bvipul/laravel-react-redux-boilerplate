import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component
{
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container px-2 px-sm-3">
                    <Link className="navbar-brand" to="/">LARP</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Sign In</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="btn btn-primary ml-lg-2 ml-sm-0 mt-2 mt-lg-0" to="/account/create">Create Account</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="btn btn-primary ml-lg-2 ml-sm-0 mt-2 mt-lg-0" to="/dashboard">Dashboard</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
};

export default Header;