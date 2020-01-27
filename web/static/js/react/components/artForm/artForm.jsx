import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from 'formik';
//import { reduxForm, Field } from "redux-form";
import "./artForm.scss";

const FormInput = field => {
  const { name, label } = field;
  let { type, options } = field;
  options = options || {};
  type = type || "text";
  return (
    <div className="art-form__row">
      <label className="art-form__input__label">{label}</label>
      <Field className="art-form__input__value" {...{name, label, type, options}} />
      <ErrorMessage name={name} component="div"/>
    </div>
  );
};

const ArtFormField = ({name, label, type}) => {
  return (
    <Fragment>
      <Field {...field} />
      <ErrorMessage name={field.name} component="div" />
    </Fragment>
  )
}

const validate = (_values, _props /* only available when using withFormik */) => {
  const errors = {};
  /**
     if (!values.email) {
       errors.email = 'Required';
     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
       errors.email = 'Invalid email address';
     }
  **/
  return errors;
};

const ArtForm = props => {
  const { onSubmit, initialValues, pristine, reset, submitting } = props;

  const textFields = [
    { name: "title", label: "Title" },
    { name: "year", label: "Year", type: "number", options: { min: "2000" } },
    { name: "medium", label: "Medium" },
    { name: "dimensions", label: "Size" },
    { name: "price", label: "Price" },
  ].map( ( item ) => {
    item.value = initialValues[item.name]
    return item
  })
  return (
    <Formik
      initialValues={ initialValues }
      validate={ () => ({}) }
      onSubmit={ (values, {setSubmitting}) => {
        setSubmitting()
        return onSubmit({...values, file: initialValues.file})
      }}
    >{
      ({isSubmitting, dirty, touched, errors, values}) => (
        <Form>
          { textFields.map( (field, idx) => (
            <FormInput {...field} key={idx}/>
          ))}
           <div className="art-form__actions">
             <button className="art-form__action button" type="submit" disabled={!dirty || isSubmitting}>
               Save
             </button>
           </div>
        </Form>
      )
    }
    </Formik>
  );
};

export default ArtForm;


