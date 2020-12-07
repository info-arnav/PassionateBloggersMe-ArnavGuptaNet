import React, { Component, lazy, Suspense } from "react";
import "./loading.css";
import loadable from "@loadable/component";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/private-route/PrivateRoute";

import "./App.css";
import Skeleton from "react-loading-skeleton";
const Home = loadable(() => import("./main/Home"));
const Footer = loadable(() => import("./elements/Footer"));
const Event = loadable(() => import("./main/Event"));
const Contact = loadable(() => import("./main/Contact"));
const Feed = loadable(() => import("./main/Feed"));
const Single = loadable(() => import("./Single"));
const Profile = loadable(() => import("./main/Profile"));
const Register = loadable(() => import("./components/auth/Register"));
const Login = loadable(() => import("./components/auth/Login"));
const Dashboard = loadable(() => import("./components/dashboard/Dashboard"));
const SiteMap = loadable(() => import("./main/SiteMap"));
const Active = loadable(() => import("./main/Active"));
const NotFound = loadable(() => import("./NotFound"));
const About = loadable(() => import("./main/About"));
const License = loadable(() => import("./main/License"));

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
    const renderLoader = () => (
      <div class="loader">
        <div class="loader-inner">
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
        </div>
      </div>
    );
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
              <Route path="/posted/:username/:subject/:id" component={Single} />
              <Route
                path="/error-page-not-found"
                component={NotFound}
                status={404}
              />
              <Switch>
                <PrivateRoute exact path="/active" component={Active} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/feed" component={Feed} />
                <Redirect to="/error-page-not-found" />
              </Switch>
              <Redirect to="/error-page-not-found" />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
