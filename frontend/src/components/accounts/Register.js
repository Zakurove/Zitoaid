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
    name: "",
    email: "",
    password: "",
    role: null,
    password2: "",
    institution: null,
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password2, role, institution } = this.state;
    // if (this.state.role !== "Instructor" && this.state.role !== "Learner" ) {
    //   this.props.createMessage({ roleNotSelected: "Please select a role" });
    // } 
    if (!this.state.institution) {
      this.props.createMessage({ roleNotSelected: "Please select your insistution" });
    } 
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
    } 
    else {
      const newUser = new FormData();
      newUser.append("name", this.state.name);
      newUser.append("password", this.state.password);
      newUser.append("email", this.state.email);
      newUser.append("role", "Learner");
      newUser.append("institution", this.state.institution);

      this.props.register(newUser);
    }
  };
  yourChangeHandler(event) {
    this.setState({ institution: event.target.value });
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { name, email, password, password2 } = this.state;
    return (
      <div className="" style={{backgroundImage: `url("https://tawassam.ams3.digitaloceanspaces.com/Test1/media/tawassamLoginBG.jpg")`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", backgroundPosition: "right top", paddingBottom: "15rem" }}>                         
      <hr className="style-five"/>
      <div className="container pt-5" >
      <div className="row">
            <div className="col-md-5 mx-auto pt-5">
            <a href="#/welcome">
            <img
              src={
                "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/tawassamLogo.png"
              }
              className="img-fluid"
              alt="Responsive image"
              style={{ width: "150%" }}
            />
            </a>
            </div>
          </div>
        <div className="row flex-lg-row-reverse">

        <div className="col-md-5 mx-auto">           
         <form onSubmit={this.onSubmit} className="mt-5">
            <h3 className="tawassamBlue mb-3 text-center">Sign Up</h3>
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
                      <i className="fas fa-user mx-auto"></i>
                    </span>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={this.onChange}
                    value={name}
                    placeholder="Full Name"
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
                      Institution...
                    </option>
                    <option>King Saud bin Abdulaziz University for Health Sciences</option>
                    <option>Al-Imam Muhammad ibn Saudi Islamic University</option>
                    <option>Alfaisal University</option>
                    <option>King Saud University</option>
                    <option>Majmaah University</option>
                    <option>King Abdulaziz University</option>
                    <option>King Faisal University</option>
                    <option>Imam Abdulrahman bin Faisal University</option>
                    <option>King Khalid University</option>
                    <option>Umm Al-Qura University</option>
                    <option>Taibah University</option>
                    <option>Taif University</option>
                    <option>Qassim University</option>
                    <option>Prince Sattam bin Abdulaziz University</option>
                    <option>Unaizah College of Medicine</option>
                    <option>Al-Baha University</option>
                    <option>University of Hail</option>
                    <option>University of Tabuk</option>
                    <option>Najran University</option>
                    <option>Northern Borders University</option>
                    <option>Al Jouf University</option>
                    <option>Jazan University</option>
                    <option>Medical College in Dawadmi</option>
                    <option>Shaqra University</option>
                    <option>Ibn Sina National College for Medical Studies</option>
                    <option>Batterjee Medical College</option>
                    <option>Al Farabi College</option>
                    <option>Riyadh Colleges of Dentistry and Pharacy</option>
                    <option>Sulaiman Al Rajhi Colleges</option>
                    <option>Inaya Medical College</option>
                    <option>Al-Ghada International Health Sciences Colleges</option>
                    <option>Buraydah Colleges</option>
                    <option>Al Maarefa Colleges</option>
                    <option>Princess Nora bint Abdul Rahman University</option>
                    <option>Other</option>


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
