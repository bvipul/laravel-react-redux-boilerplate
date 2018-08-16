import React from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormField from './FormField';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import client from '../Helpers/Server';


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
        client
        .post('/api/login', values)
        .then( (response) => {
            if (response.data.success) {
                
                this.props.loggedIn(response.data.user);
                
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', response.data.user);
                
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

        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form onSubmit={handleSubmit(this.processSubmit)}>
                                            <h1>Login</h1>
                                            <p className="text-muted">Sign In to your account</p>
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
                                                <Button type="submit" color="primary" disabled={submitting}>Login</Button>
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
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