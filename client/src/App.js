import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";
import Navigation from "./elements/Navigation";
import Home from "./main/Home";
import Footer from "./elements/Footer";
import Event from "./main/Event";
import Contact from "./main/Contact";
import Feed from "./main/Feed";
import Single from "./Single";
import Profile from "./main/Profile";
import SiteMap from "./main/SiteMap";
import Active from "./main/Active";
import NotFound from "./NotFound";
import About from "./main/About";
import License from "./main/License";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/license" component={License} />
              <Route path="/index" component={Home} />
              <Route path="/sitemap" component={SiteMap} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/registration" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route path="/projects" component={Event} />
              <Route path="/profile:id" component={Profile} />
              <Route path="/contact" component={Contact} />
              <Route path="/contact-us" component={Contact} />
              <Route path="/about" component={About} />
              <Route path="/posted:id" component={Single} />
              <Switch>
                <PrivateRoute exact path="/active" component={Active} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/feed" component={Feed} />
              </Switch>
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
