import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav">
        <span className="navbar-text mr-3">
          <strong>{user ? `As ${user.username}` : ""}</strong>
        </span>

        <li class="nav-item ">
          <a onClick={this.props.logout} className="text-info nav-link">
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav">
        <li class="nav-item ">
          <Link to="/login" className="text-info nav-link">
            Login
          </Link>
        </li>

        <li className="nav-item ">
          <Link to="/register" className="text-info nav-link">
            Register
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <a className="navbar-brand" href="#">
          <img
            src="https://pngimage.net/wp-content/uploads/2018/06/microscope-logo-png-7.png"
            width="50"
            height="50"
            class="d-inline-block mx-auto"
            alt=""
          />
        </a>
        <a className="navbar-brand" href="/">
          Tawassam
        </a>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
          </ul>

          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
