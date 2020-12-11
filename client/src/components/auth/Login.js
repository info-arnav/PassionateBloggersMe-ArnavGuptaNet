import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { Helmet } from "react-helmet";
import Navigation from "../../elements/Navigation";
import { Offline, Online } from "react-detect-offline";
import { Toast } from "react-bootstrap";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div>
          <Helmet>
            <link
              rel="manifest"
              href={`${process.env.PUBLIC_URL}/manifest.json`}
            />
            <link
              rel="apple-touch-icon"
              href={`${process.env.PUBLIC_URL}/logo.png`}
            />
            <header>
              <link
                rel="apple-touch-icon"
                href={`${process.env.PUBLIC_URL}/logo.png`}
              />
              <link
                rel="manifest"
                href={`${process.env.PUBLIC_URL}/manifest.json`}
              />
            </header>{" "}
            <meta charset="utf-8" />
            <meta name="copyright" content="Infinity" />
            <div hidden>71441</div>
            <meta name="author" content="Arnav Gupta" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="theme-color" content="#000000" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@InfinityByArnav" />
            <meta name="twitter:creator" content="@arnav95600" />
            <meta property="og:site_name" content="Infinity" />
            <meta property="fb:app_id" content="807904256677081" />
            <title>content={`Infinity - login page`}</title>
            <meta name="twitter:title" content={`Infinity - login page`} />
            <meta
              name="description"
              content="Infinity - login here to make your own posts."
            />
            <meta
              property="og:description"
              content="Infinity - login here to make your own posts."
            />
            <meta
              name="twitter:description"
              content={`Infinity - login here to make your own posts.`}
            />
            <meta
              property="og:url"
              content={`https://www.passionatebloggers.me/login`}
            />
            <meta
              name="twitter:image"
              content="https://www.passionatebloggers.me/logo.png"
            />
            <meta property="og:title" content={`Infinity - Login`} />
            <meta property="og:type" content={`website`} />
            <meta
              property="og:image"
              content="https://www.passionatebloggers.me/logo.png"
            />
          </Helmet>
          <link
            rel="apple-touch-icon"
            href={`${process.env.PUBLIC_URL}/logo.png`}
          />
          <link
            rel="apple-touch-icon"
            href={`${process.env.PUBLIC_URL}/logo.png`}
          />
          <header>
            <link
              rel="apple-touch-icon"
              href={`${process.env.PUBLIC_URL}/logo.png`}
            />
            <link
              rel="manifest"
              href={`${process.env.PUBLIC_URL}/manifest.json`}
            />
          </header>
          <link
            rel="manifest"
            href={`${process.env.PUBLIC_URL}/manifest.json`}
          />
        </div>
        <Navigation />

        <main className="page login-page">
          <section className="clean-block clean-form dark">
            <div className="container">
              <div className="block-heading">
                <h2 className="text-info">Log In</h2>
              </div>{" "}
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label for="email">Email</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    className="form-control item"
                    type="email"
                    name="email"
                    required
                    id="email"
                  />
                  <span className="red-text">
                    {errors.email}
                    {errors.emailnotfound}
                  </span>
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    className="form-control"
                    type="password"
                    name="password"
                    required
                    id="password"
                  />
                  <span className="red-text">
                    {errors.password}
                    {errors.passwordincorrect}
                  </span>
                </div>
                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkbox"
                    />
                    <label className="form-check-label" for="checkbox">
                      Remember me
                    </label>
                  </div>
                </div>
                <button className="btn btn-primary btn-block" type="submit">
                  Log In
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
