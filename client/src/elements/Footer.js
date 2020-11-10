import React, { useEffect, useState, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer dark">
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <h5>Get started</h5>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/register">Sign up</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-3">
              <h5>Extensions</h5>
              <ul>
                <li>
                  <a href="https://chrome.google.com/webstore/detail/badbllgllmfcbdebaakkoiehefmmjngh">BuzzSpot - Chrome</a>
                </li>
                <li>
                  <a href="https://chrome.google.com/webstore/detail/dajhfhdjfpcomojccfkakenbgnahpmdp">PassionateBlogger - Chrome</a>
                </li>
<li>
                  <a href="https://microsoftedge.microsoft.com/addons/detail/ndjdppjhbollancnchjcpkobgaeibbfm">ArnavGuptaNet - Edge</a>
                </li>
<li>
                  <a href="https://microsoftedge.microsoft.com/addons/detail/dbdnfcbjgjagelfpfngedlbljlciljoc">BuzzSpot - Edge</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-3">
              <h5>Support</h5>
              <ul>
                <li>
                  <a href="/">FAQ</a>
                </li>
                <li>
                  <a href="/contact">Help desk</a>
                </li>
                <li>
                  <a href="/">Forums</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-3">
              <h5>Legal</h5>
              <ul>
                <li>
                  <a href="/License">Terms of Service</a>
                </li>
                <li>
                  <a href="/license">Terms of Use</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <p>© 2020 Arnav Gupta</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
