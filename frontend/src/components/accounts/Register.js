import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";
import { DropdownButton, Dropdown, Form } from "react-bootstrap";
import "../../../static/css/user.css";
/**
 * Register
 */
export class Register extends Component {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    username: "",
    email: "",
    password: "",
    role: null,
    password2: "",
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2, role } = this.state;
    if (this.state.role !== "Instructor" && this.state.role !== "Learner" ) {
      this.props.createMessage({ roleNotSelected: "Please select a role" });
    } 
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
    } 
    else if (this.state.role == "Instructor" || this.state.role == "Learner" ) {
      const newUser = new FormData();
      newUser.append("username", this.state.username);
      newUser.append("password", this.state.password);
      newUser.append("email", this.state.email);
      newUser.append("role", this.state.role);

      this.props.register(newUser);
    }
  };
  yourChangeHandler(event) {
    this.setState({ role: event.target.value });
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, email, password, password2 } = this.state;
    return (
      <div className="" style={{backgroundImage: `url("https://tawassam.ams3.digitaloceanspaces.com/Test1/media/tawassamLoginBG.jpg")`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", backgroundPosition: "right top", paddingBottom: "15rem" }}>                         
      <hr className="style-five"/>
      <div className="container pt-5" >
      <div className="row">
            <div className="col-md-5 mx-auto pt-5">
            <img
              src={
                "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/tawassamLogo.png"
              }
              className="img-fluid"
              alt="Responsive image"
              style={{ width: "150%" }}
            />
            </div>
          </div>
        <div className="row flex-lg-row-reverse">

        <div className="col-md-5 mx-auto">           
         <form onSubmit={this.onSubmit} className="mt-5">
            <h3 className="tawassamBlue mb-3 text-center">Sign Up</h3>
                <div className="input-group form-group mt-3">

                    <span className="input-group-text iconInput">
                      <i className="fas fa-user mx-auto"></i>
                    </span>

                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    onChange={this.onChange}
                    value={username}
                    placeholder="Username"
                  />
                </div>

                <div className="input-group form-group mt-3">

                    <span className="input-group-text iconInput">
                      <i className="fas fa-envelope mx-auto"></i>
                    </span>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={this.onChange}
                    value={email}
                    placeholder="Email"
                  />
                </div>

                <div className="input-group form-group mt-3">

                    <span className="input-group-text iconInput">
                      <i className="fas fa-key mx-auto"></i>
                    </span>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={this.onChange}
                    value={password}
                    placeholder="Password"
                  />
                </div>

                <div className="input-group form-group mt-3">

                    <span className="input-group-text iconInput">
                      <i className="fas fa-key mx-auto"></i>
                    </span>

                  <input
                    type="password"
                    className="form-control"
                    name="password2"
                    onChange={this.onChange}
                    value={password2}
                    placeholder="Verify password"
                  />
                </div>
                <div className="input-group form-group mt-3">

                    <span className="input-group-text iconInput">
                      <i className="fas fa-user-tag mx-auto"></i>
                    </span>


                  <Form.Control
                    as="select"
                    onChange={this.yourChangeHandler.bind(this)}
                  >
                    <option disabled selected>
                      Choose your role...
                    </option>
                    <option>Learner</option>

                    <option>Instructor</option>
                  </Form.Control>
                </div>


                <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-dark btn-lg  mt-4"
                >
                  Sign Up
                </button>
                </div>
                <hr/>
                <div className="tawassamBlue">
                Already have an account?{" "}
                <Link to="/login" className="tawassamYellow" style={{fontWeight: "bold", textDecoration: "none"}}>
                  Login
                </Link>
              </div>

              </form>
               </div>

            


        </div>
        {/* <div className="d-flex justify-content-center">
          <div className="card" style={{ height: "460px" }}>
            <div className="card-header">
              <h3>Sign Up</h3>
            </div>
            <div className="card-body pb-5">
              
            </div> */}

            {/* <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Already have an account?{" "}
                <Link to="/login" className="text-info">
                  Login
                </Link>
              </div>
            </div> */}
          </div>
        {/* </div>
      </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);
