import React from 'react';

const FormField = ({
        label,
        input,
        type,
        name,
        className,
        children,
        defaultValue,
        meta: { touched, error, warning }
}) => {
    let renderedInput;
    if (type == 'select') {
        renderedInput = (<select {...input} name={name} className={
            `${className} ${
                touched && (
                    (error && 'is-invalid')
                )
            }`
        } >
            { children }
        </select>);
    } else {
        renderedInput = (<input {...input } name={name} type={type} className={
            `${className} ${
                touched && (
                (error && 'is-invalid')
                )
            }`}
        />);
    }
    return ( 
        <div className="form-group">
            {
                label &&
                <label htmlFor={name}>{label}</label>
            }

            {
                renderedInput
            }
            {
                touched &&
                    (error && <span className="invalid-feedback">{error}</span>)
            }
        </div>
    );
};

export default FormField;