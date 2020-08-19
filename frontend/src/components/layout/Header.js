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
        <span className="navbar-text mr-3" style={{fontSize:"20px"}}>
          <strong>{user ? `As ${user.username}` : ""}</strong>
        </span>

        <li className="nav-item ">
          <a onClick={this.props.logout} className="text-info nav-link" style={{fontSize:"20px"}}>
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav">
        <li className="nav-item ">
          <Link to="/login" className="text-info nav-link" style={{fontSize:"20px"}}>
            Login
          </Link>
        </li>

        <li className="nav-item ">
          <Link to="/register" className="text-info nav-link" style={{fontSize:"20px"}}>
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

        <a className="navbar-brand" href="/" style={{fontSize:"35px", color: "#06d6d6"}}>
          Tawassam
        </a>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item ">
              <a className="nav-link" href="/" style={{fontSize:"25px"}}>
                Home 
              </a>
            </li>
            {user
          ? this.props.auth.user.profile.role && this.props.auth.user.profile.role == "Instructor" && (
            <li className="nav-item ">
              <a className="nav-link" href="#/mysets" style={{fontSize:"25px"}}>
                My Sets
              </a>
            </li>
            )
          : "" }
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
