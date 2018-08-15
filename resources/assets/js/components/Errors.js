import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        errors: state.errors
    }
}

class Errors extends React.Component {
    render() {
        if (this.props.errors.length) {
            return (
                <div className="errors">
                    {
                        this.props.errors.map(function(error, index) {
                            return (
                                <span className="alert alert-danger d-flex justify-content-center" role="alert" key={ index }>
                                    {/* <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a> */}
                                    {error}
                                </span>
                            );
                        })
                    }
                </div>
            );
        }
        return null;
    }
}

Errors = connect(mapStateToProps)(Errors);

export default Errors;