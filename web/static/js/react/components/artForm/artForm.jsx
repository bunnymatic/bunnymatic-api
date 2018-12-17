import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form";
import "./artForm.scss";

const FormInput = props => {
  const { name, label } = props;
  let { type, options } = props;
  options = options || {};
  type = type || "text";
  return (
    <div className="art-form__row">
      <label className="art-form__input__label">{label}</label>
      <Field className="art-form__input__value" type={type} component="input" name={name} {...options} />
    </div>
  );
};

const Form = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const textFields = [
    { name: "title", label: "Title" },
    { name: "year", label: "Year", type: "number", options: { min: "2000" } },
    { name: "medium", label: "Medium" },
    { name: "dimensions", label: "Size" },
    { name: "price", label: "Price" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="art-form__rows">
        {textFields.map(field => (
          <FormInput {...field} />
        ))}
      </div>
      <div className="art-form__actions">
        <button className="art-form__action button" type="submit" disabled={pristine || submitting}>
          Save
        </button>
      </div>
    </form>
  );
};

const ArtForm = reduxForm({
  form: "addArt",
})(Form);

export default ArtForm;
