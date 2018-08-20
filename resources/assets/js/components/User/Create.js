import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import FormField from '../FormField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { errors } from '../../store/actions';
import Server from '../../Helpers/Server';

const validatorUserCreateForm = (values) => {
    const result = validate(values, {
        name: {
            presence:{
                message: 'Please enter your name'
            }
        },
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
        },
        is_admin: {
            presence: {
                message: 'Please select a value from dropdown.'
            }
        },
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

    if(!values.name) {
        errors.name = messages.name.presence.message;
    }

    if (!values.name) {
        errors.is_admin = messages.is_admin.presence.message;
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
      errors
    }, dispatch);
}

class Create extends React.Component {
    constructor(props) {
        super(props);

        this.processSubmit = this.processSubmit.bind(this);
    }

    processSubmit(values) {
        Server
            .post('/api/users', values)
            .then((response) => {
                if (response.data.success) {
                    this.props.errors(new Array());
                    this.props.history.push('/admin/user');
                }
            })
            .catch((error) => {
                const { response: { data: { error: { message } } } } = error;
                this.props.errors(new Array(message));
            });
    }

    render() {
        const {error, handleSubmit, submitting} = this.props;
        
        return (
            <Card>
                <CardHeader className="text-center">
                    <Row>
                        <Col md={8} className="text-right">
                            <h1 style={{ display: 'inline-block', textTransform: 'uppercase', letterSpacing: '5px' }}>Create New User</h1>
                        </Col>
                        <Col md={4} className="text-right">
                            <Link className="nav-link" to="/admin/user">
                                <Button color="secondary">
                                    Cancel
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </CardHeader>
                <Form onSubmit={handleSubmit(this.processSubmit)}>
                    <CardBody>
                        <Field
                            label="Name"
                            name="name"
                            component={FormField}
                            id="name"
                            type="name"
                            className="form-control"
                        />
                        <Field
                            label="Email Address"
                            name="email"
                            component={FormField}
                            id="email"
                            type="email"
                            className="form-control"
                        />
                        <Field
                            label="Password"
                            name="password"
                            component={FormField}
                            id="password"
                            type="password"
                            className="form-control"
                        />
                        <Field
                            label="Is Admin ?"
                            name="is_admin"
                            component={FormField}
                            id="is_admin"
                            type="select"
                            className="form-control"
                        >
                            <option value={''}>Please Select</option>
                            <option value={1}>Yes</option>
                            <option value={0}>No</option>
                        </Field>  
                    </CardBody>
                    <CardFooter>
                        <FormGroup row>
                            <Col sm={{
                                size: 12,
                                offset: 5
                            }}>
                                <Link className="btn btn-secondary" to="/admin/user">Cancel</Link>
                                <Button type="submit" className="ml-2" color="success" disabled={submitting}>Submit</Button>
                            </Col>
                        </FormGroup>
                    </CardFooter>
                </Form>
            </Card>
        );
    }
};

Create = reduxForm({
  form: 'userCreate',
  validate: validatorUserCreateForm
})(connect(mapStateToProps, mapDispatchToProps)(Create));

export default Create;