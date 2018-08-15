import React from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormField from './FormField';
import Errors from './Errors';

function loggedIn(payload) {
  return {
    type: 'LOGGED_IN',
    payload
  }
}

function errors(payload) {
    return {
        type: 'LOGIN_FAILED',
        payload
    }
}

const validatorSignInForm = (values) => {
    const result = validate(values, {
        email: {
            presence: {
                message: 'Please enter your email address.'
            },
            email: {
                message: 'Please enter a valid email address.'
            }
        },
        password: {
            presence: {
                message: 'Please enter your password.'
            }
        }
    });

    return result;
};

function validate(values, messages) {
    const errors = {};
    
    if (!values.email) {
        errors.email = messages.email.presence.message;
    } 
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = messages.email.email.message;
    }

    if(!values.password) {
        errors.password = messages.password.presence.message;
    }
    
    return errors;
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      loggedIn,
      errors
    }, dispatch);
}

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.processSubmit = this.processSubmit.bind(this);
    }

    componentWillMount() {
        
    }

    processSubmit(values) {
        axios
        .post('/api/login', values)
        .then( (response) => {
            console.log(response.data);
            if (response.data.success) {
                this.props.loggedIn(response.data.user);
                this.props.history.push('/dashboard');
            }
        })
        .catch( (error) => {
            const {response: {data: { error: { message }}}} = error;
            this.props.errors(new Array(message));
        });
    }

    render() {
        const { error, handleSubmit, submitting } = this.props;
        console.log("errreadfdsaf", error)
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                            <h2 className="text-center font-weight-light mb-4">Sign into your account</h2>
                                <Errors />
                                <form onSubmit={handleSubmit(this.processSubmit)}>
                                    <Field
                                        label="Email Address"
                                        name="email"
                                        component={FormField}
                                        id="email"
                                        type="text"
                                        className="form-control"
                                    />
                                    <Field label="Password" name="password" component={FormField} id="password" type="password" className="form-control" />
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <Field name="remember" component="input" type="checkbox" className="form-check-input mt-2" value="1" />
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="form-group mt-4">
                                        <button type="submit" className="btn btn-secondary" disabled={submitting}>Continue</button>
                                    </div>
                                    {
                                        error && <strong>{error}</strong>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};


Login = reduxForm({
    form: 'signin',
    validate: validatorSignInForm
})(Login);

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;