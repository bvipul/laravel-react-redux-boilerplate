import React from 'react';
import { reduxForm, Field } from 'redux-form';

const FormField = ({
        label,
        input,
        type,
        name,
        className,
        meta: { touched, error, warning }
}) => (
    <div className="form-group">
        {
            label &&
            <label htmlFor={name}>{label}</label>
        }
        <input {...input } name={name} type={type} className={
            `${className} ${
                touched && (
                    (error && 'is-invalid')
                )
            }`
        } />
        {
            touched &&
                (error && <span className="invalid-feedback">{error}</span>)
        }
    </div>
);

const validatorSignInForm = (values) => {
    const result = validate(values, {
        email: {
            presence: {
                message: '^Please enter your email address.'
            },
            email: {
                message: '^Please enter a valid email address.'
            }
        },
        password: {
            presence: {
                message: '^Please enter your password.'
            }
        }
    });

    return result;
};

function validate(values) {
    return true;
}

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.processSubmit = this.processSubmit.bind(this);
    }

    componentWillMount() {
        // do something like setting default state
    }

    processSubmit(values) {
        console.log("values", values);
        axios
        .post('/ajax/login', values)
        .then( (response) => {
            console.log(response.data);
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                            <h2 className="text-center font-weight-light mb-4">Sign into your account</h2>
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

export default Login;