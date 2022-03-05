import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createMessage } from "../../actions/messages";
import { DropdownButton, Dropdown, Form } from "react-bootstrap";
import "../../../static/css/user.css";
import History from "./History.js";
/**
 * Session
 */
export class Session extends Component {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    name: "",
    mrn: "",
    date: "",
    ccomplaint: "",
    isStarting: true,
    session: "",
    complaints: [{title: "", site: "", siteOptions: [], onset: "", characteristics: "", radation: "", timing: "", factorsBetter: "", factorsWorse: "", criteria: "criteriaOne"},
    {title: "Abdominal Pain",site: "Where's the pain?", siteOptions: ["Whole abdomen", "Left lower abdomen", "Right lower abdomen","Epigastric"], characteristics: "What does the pain feel like?", characteristicsOptions:["Tearing (AAA)", "Stabbing (Pancreatitis)", "Dull-ache (Appendicitis)", "Sharp localized (EP)"], radation: "Does the pain go anywhere else?", radationOptions: ["Upward flank (Hepatic & Biliary Pathology)", "Flank toward the back (Pyelonephritis)", "Sides of the abdomen (Nephrolithiasis)", "No"], factorsWorse: "Does anything make the pain worse?",factorsWorseOptions: ["Movement (Appendicitis)","Cough (Hernia)", "Fatty Food (Pancreasitis)", "None"], criteria: "criteriaOne"}],
    conditions: [],
    criteria: "x"
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, mrn, date, ccomplaint } = this.state; 
    if (!this.state.ccomplaint) {
      this.props.createMessage({ roleNotSelected: "Please select the chief complaint" });
    }
    else {
      let newSession = {name: this.state.name, date: this.state.date, mrn: this.state.mrn, ccomplaint: this.state.ccomplaint}
      this.setState({criteria: "criteriaOne"})
      this.setState({session: newSession, isStarting: false})
    }
  };
  yourChangeHandler(event) {
    this.setState({ ccomplaint: event.target.value });
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, mrn, date, ccomplaint } = this.state;
    if (this.state.criteria == "criteriaOne") {
      return (
        <Fragment>
          <History
            createMessage={this.props.createMessage}
            rerenderParent={this.rerenderParent}
            session={this.state.session}
            // conditions={this.state.conditions[1]}
            complaint={this.state.complaints[1]}
          />
        </Fragment>
      );
    }
    if (this.state.isStarting) {
    return (
      <div className="">                         
      <div className="container pb-5" >
      <div className="row">
            <div className="col-md-5 mx-auto pt-5">
            <a href="#/welcome">
            <img
              src={
                "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/zitoaidLogo.png"
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
            <h3 className="tawassamBlue mb-3 text-center">Session Info</h3>
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
                    placeholder="Name"
                  />
                </div>

                <div className="input-group form-group mt-3">

                    <span className="input-group-text iconInput">
                      <i className=" mx-auto fas fa-calendar-alt"></i>
                    </span>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    onChange={this.onChange}
                    value={date}
                    placeholder="Patient Date of Birth"
                  />
                </div>

                <div className="input-group form-group mt-3">

                    <span className="input-group-text iconInput">
                      <i className="fas fa-file-medical mx-auto"></i>
                    </span>

                  <input
                    type="text"
                    className="form-control"
                    name="mrn"
                    onChange={this.onChange}
                    value={mrn}
                    placeholder="MRN"
                  />
                </div>

                <div className="input-group form-group mt-3">

                    <span className="input-group-text iconInput">
                      <i className="fas fa-heartbeat mx-auto"></i>
                    </span>


                  <Form.Control
                    as="select"
                    onChange={this.yourChangeHandler.bind(this)}
                  >
                    <option disabled selected>
                      Chief Complaint...
                    </option>
                    <option>Abdominal Pain</option>
                    <option disabled>Cough</option>
                    <option disabled>Headache</option>
                    <option disabled>Fever</option>


                  </Form.Control>
                </div>


                <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-dark btn-lg  mt-4"
                >
                  Next
                </button>
                </div>
                <hr/>

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
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { createMessage })(Session);
