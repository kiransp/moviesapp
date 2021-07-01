import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
class Form extends Component {
  state = { data: {}, errors: {} };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options); //{abortEarly:false}

    if (!error) return null; // no errors in validation
    const errors = {};
    error.details.map((error) => (errors[error.path[0]] = error.message));

    return errors;

    // const errors = {};
    // if (this.state.data.username === "")
    //   errors["username"] = "Username is required";

    // if (this.state.data.password === "")
    //   errors["password"] = "Password is required";
    // return Object.keys(errors) === 0 ? null : errors;
  };
  validateProperty = ({ name, value }) => {
    console.log("Inside validateProp");
    const obj = { [name]: value };
    const fieldSchema = {
      [name]: this.schema[name],
    };
    const result = Joi.validate(obj, fieldSchema);

    if (result.error === null) {
      // first handle null, else you will get run time error in browser.
      console.log("No Errors"); //valid
      return;
    }
    console.log("There is a error ", result.error.details[0].message);
    return result.error.details[0].message;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    // if there are errors, we should not go further to call server
    //call server
    this.doSubmit();
    console.log("Submitted", this.state.data);
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    //data[e.currentTarget.name] = e.currentTarget.value;
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;

    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }
  renderInput(name, label, type = "text") {
    //type="Text" is default value. if we dont pass type, text will be taken
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        type={type}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
