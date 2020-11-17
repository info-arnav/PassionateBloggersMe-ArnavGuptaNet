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
                <li>
                  <a href="/contact">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-3">
              <h5>Extensions</h5>
              <ul>
                <li>
                  <a href="https://chrome.google.com/webstore/detail/badbllgllmfcbdebaakkoiehefmmjngh">
                    BuzzSpot - Chrome
                  </a>
                </li>
                <li>
                  <a href="https://chrome.google.com/webstore/detail/dajhfhdjfpcomojccfkakenbgnahpmdp">
                    PassionateBlogger - Chrome
                  </a>
                </li>
                <li>
                  <a href="https://microsoftedge.microsoft.com/addons/detail/ndjdppjhbollancnchjcpkobgaeibbfm">
                    ArnavGuptaNet - Edge
                  </a>
                </li>
                <li>
                  <a href="https://microsoftedge.microsoft.com/addons/detail/dbdnfcbjgjagelfpfngedlbljlciljoc">
                    BuzzSpot - Edge
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-sm-3">
              <h5>Webpages</h5>
              <ul>
                <li>
                  <a href="https://www.passionatebloggers.me/">
                    PassionateBlogger
                  </a>
                </li>
                <li>
                  <a href="https://arnavgupta.net/">ArnavGuptaNet</a>
                </li>
                <li>
                  <a href="https://cancerya.passionatebloggers.me/">Cancerya</a>
                </li>
                <li>
                  <a href="https://cancerya.arnavgupta.net/">Cancerya</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-3">
              <h5>Legal</h5>
              <ul>
                <li>
                  <a href="/License">Liscence</a>
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
