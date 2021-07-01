import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import MovieForm from "./components/movieForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getUserInfo();
    this.setState({ user });
  }
  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/loginform" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/registerform" component={RegisterForm} />
            {/* <Route
              path="/moviedetails/:id"
              render={(props) => <MovieDetails {...props} />}
            /> */}
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" render={props=> <Movies {...props} user={this.state.user}/>} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
