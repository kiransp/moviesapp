import React, { Component } from "react";
import auth from "../services/authService";
import Input from "./common/input";
import Joi from "joi-browser";
import Form from "./common/form";
class LoginForm extends Form {
  //extends user created componennt. inheritance
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };

  doSubmit = async () => {
    try {
      //call server
      const { data } = this.state;
      await auth.login(data.username, data.password);

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
