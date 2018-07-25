import React from 'react';

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

export default FormField;