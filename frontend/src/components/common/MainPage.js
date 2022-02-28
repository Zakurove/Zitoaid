import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Subjects from "./Subjects.js";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { SlideCountdown } from "react-fancy-countdown";
import { addEmailList } from "../../actions/emailLists";
import { createMessage } from "../../actions/messages";
import ReactGA from 'react-ga';

export class MainPage extends Component {
  state = {
    email: "",
    currentBlock: "",
    isChecked: false,
    submitted: false,
    block: null,

  };

  static propTypes = {
    addEmailList: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.email.trim() == "") {
      this.props.createMessage({ titleEmpty: "Please fill in the email" });
    } 
    else if (this.state.email.trim() !== "") {
    const email = new FormData();
    email.append('email', this.state.email)
    email.append('currentBlock', this.state.currentBlock);
    this.props.addEmailList(email);
    this.setState({submitted: true})
  };
}

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });


  render() {
    const { email, currentBlock } = this.state;
    return (
      <div className="pt-5">
        {/* Main row for header of this page */}
        <div className="container">
          <div className="row d-flex justify-content-around flex-lg-row-reverse mb-5">
            {/* For Image */}
            <div className=" col-lg-5 d-flex justify-content-around ">
              <img
                src={
                  "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/tawassamLogo.png"
                }
                style={{ width: "100%" }}
                className=" img-fluid float-right my-5"
              />
            </div>

            {/* For text content */}
            {/* <div className="col-lg-6 bg-light ps-5 pt-5 mt-3">
              <h1 className=" tawassamBlue mb-4 pl-2">
                Visualize for a better future!
              </h1>
              <h4 className="tawassamYellow">
                A platform that strives to enhance visual materials knowledge
                for all healthcare personnel!
              </h4>
            </div> */}

              <div className="col-lg-6 bg-light ps-4 pt-5 mt-5">
              <h1 style={{fontWeight: "bold", fontSize: "4rem"}} className="tawassamBlue">Tawassam is Here!</h1>
              <h3  className="mt-3 codepoiesisBlue"> <span className="tawassamYellow">Study</span> our library and <span className="tawassamYellow">practice</span> on all kinds of visual materials!</h3>
              <h4  className="codepoiesisBlue">Including <span className="tawassamYellow">pathology</span>, <span className="tawassamYellow">radiology</span> and many others!</h4>
              
              {/* <div className="">
              {this.state.submitted
                  ? this.state.submitted == true && (
                    <div><h2 className="tawassamBlue mt-5">Thank you, we'll be in touch!</h2> <h3 className="tawassamBlue mb-3">Please take a tour and explore Tawassam!</h3></div>
                       
                    )
                  :  <form className="mt-5 row d-flex justify-content-center">
                  <hr/>
                  <h2 className="tawassamBlue mb-3">Pre-Subscribe & Ace Your Exams!</h2>
                    <div className="px-4" >
                      
                   
                    <div className="input-group form-group mt-1">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        onChange={this.onChange}
                        value={email}
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div className="d-grid">
                    <button
                      type="button"
                      value="Email"
                      onClick={this.onSubmit}
                      style={{ color: "white"}}
                      className="btn btn-info tawassamBlueBG btn-lg mt-4"
                    >
                      Submit
                    </button>
                    </div>
                    </div>
                  </form>}

              </div>  */}

              </div>


          </div>
        </div>

        {/* Features Row */}

        <div
          className=" px-3"
          style={{ backgroundColor: "#e9eef7", paddingTop: "2rem" }}
        >

<div className = "row d-flex  justify-content-center">
              <h2 className ="codepoiesisBlue text-center">Endocrine <span className="tawassamYellow">incoming!</span></h2>
              {/* <h3 className ="tawassamYellow text-center">Gastrointestinal <span className="codepoiesisBlue">&</span> Genitourinary</h3> */}
            </div>
            {/* Timer */}
          <div className="text-center d-flex  justify-content-center mt-4">

    <SlideCountdown
    deadline="2022-3-3 23:59:59" weeks={false} />
</div>
          
{/* 
          <div
            className="col-4 px-5 d-grid"
            style={{ borderLeft: "3px solid #4ecdc4" }}
          >
            <div
              className="tawassamBlueBG text-center mx-auto d-flex justify-content-around mb-2"
              style={{
                borderRadius: "100%",
                height: "4.5rem",
                width: "4.5rem",
              }}
            >
              <i
                class="fas fa-chalkboard-teacher text-center text-white my-auto"
                style={{ fontSize: "1.75rem" }}
              ></i>
            </div>
            <h3 className="tawassamYellow text-center">Instructors</h3>
            <p className="text-center text-secondary mb-0">
              {" "}
              Can create sets by adding images, explanations, notes with the
              ability to associate the sets with clusters.
            </p>
          </div>

          <div className="col-4 px-5 d-grid">
            <div
              className="tawassamBlueBG text-center mx-auto d-flex justify-content-around mb-2"
              style={{
                borderRadius: "100%",
                height: "4.5rem",
                width: "4.5rem",
              }}
            >
              <i
                class="fas fa-users text-center text-white my-auto"
                style={{ fontSize: "1.75rem" }}
              ></i>
            </div>
            <h3 className="tawassamYellow text-center">Learners</h3>
            <p className="text-center text-secondary mb-0">
              Can view all available visual material in the collborative library
              of sets and clusters which is structured accodring to top academic
              standards.
            </p>
          </div>
        </div> */}
      </div>

        <div
          className="d-flex justify-content-center pb-5"
          style={{ backgroundColor: "#e9eef7" }}
        >
          <div class="arrow bounce mb-0 mt-5 d-inline-flex ">
            <AnchorLink
              class="fas fa-chevron-circle-down fa-2x"
              href="#blocks"
              style={{
                color: "#10a1b6",
                textDecoration: "none",
                fontSize: "3rem",
              }}
            ></AnchorLink>
          </div>
        </div>
        {/* Blocks Row */}
        <div
          className="mx-auto bg-dark"
          id="cards_landscape_wrap-2"
          style={{ marginTop: "-4rem" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 50 1440 150">
            <path
              fill="#e9eef7"
              fill-opacity="1"
              d="M0,96L120,106.7C240,117,480,139,720,138.7C960,139,1200,117,1320,106.7L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
            ></path>
          </svg>
          <div
            className="container-fluid mt-5 px-5"
            id="blocks"
            style={{ paddingBottom: "9rem" }}
          >
            <div className="row">

            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                <a href="/#/endocrine/clusters">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/EndoTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                        <h6>Endocrine</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            {/* <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                <a href="/#/gastrointestinal">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/GastroTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                        <h6>Gastrointestinal</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                <a href="/#/genitourinary">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/GenitoTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                        <h6>Genitourinary</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div> */}

{/*               
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                <a href="/#/respiratory">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box justify-content-center d-flex">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/RespTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                        <h6>Respiratory - Sample</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div> */}

              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                <a href="javascript:void(0)" className="disabled">
                  <div class="card-flyerSoon">

                    <div class="text-box">
                      <div class="image-box justify-content-center d-flex" style={{position: "relative"}}>
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/RespTawassam3.jpg"
                          alt=""
                        />
                           <section style={{position: "absolute", top: "40%", left: "10%", right: "10%"}}>
                                  <h1 className="tawassamBlue">Coming Soon</h1>
                              </section>

                      </div>
                      <div class="text-container">
                        <h6>Respiratory</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                <a href="javascript:void(0)" className="disabled">
                  <div class="card-flyerSoon">

                    <div class="text-box">
                      <div class="image-box justify-content-center d-flex" style={{position: "relative"}}>
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/MSKTawassam3.jpg"
                          alt=""
                        />
                           <section style={{position: "absolute", top: "40%", left: "10%", right: "10%"}}>
                                  <h1 className="tawassamBlue">Coming Soon</h1>
                              </section>

                      </div>
                      <div class="text-container">
                        <h6>Musculoskeletal</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                <a href="javascript:void(0)" className="disabled">
                  <div class="card-flyerSoon">

                    <div class="text-box">
                      <div class="image-box justify-content-center d-flex" style={{position: "relative"}}>
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/CardioTawassam3.jpg"
                          alt=""
                        />
                           <section style={{position: "absolute", top: "40%", left: "10%", right: "10%"}}>
                                  <h1 className="tawassamBlue">Coming Soon</h1>
                              </section>

                      </div>
                      <div class="text-container">
                        <h6>Cardiovascular</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                <a href="javascript:void(0)" className="disabled">
                  <div class="card-flyerSoon">

                    <div class="text-box">
                      <div class="image-box justify-content-center d-flex" style={{position: "relative"}}>
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/HemOncTawassam3.jpg"
                          alt=""
                        />
                           <section style={{position: "absolute", top: "40%", left: "10%", right: "10%"}}>
                                  <h1 className="tawassamBlue">Coming Soon</h1>
                              </section>

                      </div>
                      <div class="text-container">
                        <h6>Hematology/Oncology</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                <a href="javascript:void(0)" className="disabled">
                  <div class="card-flyerSoon">

                    <div class="text-box">
                      <div class="image-box justify-content-center d-flex" style={{position: "relative"}}>
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/NeuroTawassam3.jpg"
                          alt=""
                        />
                           <section style={{position: "absolute", top: "40%", left: "10%", right: "10%"}}>
                                  <h1 className="tawassamBlue">Coming Soon</h1>
                              </section>

                      </div>
                      <div class="text-container">
                        <h6>Neurology</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                <a href="javascript:void(0)" className="disabled">
                  <div class="card-flyerSoon">

                    <div class="text-box">
                      <div class="image-box justify-content-center d-flex" style={{position: "relative"}}>
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/EndoTawassam3.jpg"
                          alt=""
                        />
                           <section style={{position: "absolute", top: "40%", left: "10%", right: "10%"}}>
                                  <h1 className="tawassamBlue">Coming Soon</h1>
                              </section>

                      </div>
                      <div class="text-container">
                        <h6>Endocrine</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                <a href="javascript:void(0)" className="disabled">
                  <div class="card-flyerSoon">

                    <div class="text-box">
                      <div class="image-box justify-content-center d-flex" style={{position: "relative"}}>
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/GastroTawassam3.jpg"
                          alt=""
                        />
                           <section style={{position: "absolute", top: "40%", left: "10%", right: "10%"}}>
                                  <h1 className="tawassamBlue">Coming Soon</h1>
                              </section>

                      </div>
                      <div class="text-container">
                        <h6>Gastrointestinal</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                <a href="javascript:void(0)" className="disabled">
                  <div class="card-flyerSoon">

                    <div class="text-box">
                      <div class="image-box justify-content-center d-flex" style={{position: "relative"}}>
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/GenitoTawassam3.jpg"
                          alt=""
                        />
                           <section style={{position: "absolute", top: "40%", left: "10%", right: "10%"}}>
                                  <h1 className="tawassamBlue">Coming Soon</h1>
                              </section>

                      </div>
                      <div class="text-container">
                        <h6>Genitourinary</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

{/* 
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <a href="/#/musculoskeletal">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/MSKTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                        <h6>Musculoskeletal</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <a href="/#/respiratory">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/RespTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                        <h6>Respiratory</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div> */}

              {/* <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <a href="/#/hemOnc">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/HemOncTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                        <h6>Hematology/Oncology</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div> */}

              {/* <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <a href="/#/neurology">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/NeuroTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                        <h6>Neurology</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div> */}
{/* 
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <a href="/#/endocrine">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/EndoTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                        <h6>Endocrine</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div> */}

              {/* <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <a href="/#/gastrointestinal">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/GastroTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                        <h6>Gastrointestinal</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <a href="/#/genitourinary">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/GenitoTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                        <h6>Genitourinary</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addEmailList, createMessage })(MainPage);

