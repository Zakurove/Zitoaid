import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { getMyPracticeDescSessions,  getPracticeDescSessions } from "../../actions/practiceDescSessions";


export class MyPractice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: true,
      isCreating: false,
      isViewing: false,
      block: "cardiovascular",
      subject: this.props.subject,
      selectedPracticeDescSessionId: null,
      selectedPracticeDescSession: null,
      username: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value, selectedBlock: event.target.value});
    console.log(this.state.selectedBlock, "Hey")
  }
  rendering(user) {
      
    if (user && this.state.isUpdating == true) {
        if (this.state.username !== null) {
      //            if (this.state.block == "Hematology/Oncology") {
      //   this.setState({
      //     blockLink: "hemOnc",
      //   });
      // }
      // if (this.props.block !== "Hematology/Oncology") {
      //   const blockLink = this.state.block.toLowerCase();
      //   this.setState({
      //     blockLink: blockLink,
      //   });
      // } 
      this.setState({
        isUpdating: false,
      });
    }
        this.setState({username: user.name})
      this.props.getMyPracticeDescSessions(user.id);
    }
  }

  static propTypes = {
    //This is the first "cluster" from the func down below
    getMyPracticeDescSessions: PropTypes.func.isRequired,
    getPracticeDescSessions: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {

  }
  render() {
    const { user } = this.props.auth;  

    {
      this.rendering(user);
    }
    return (
      <div className="container">
        <div id="cards_landscape_wrap-2" className="mb-5">
          <h1 className="text-center pt-2 tawassamBlue" style={{fontSize: "3rem"}}>
          Practice
        </h1>
        <h3 style={{color: "#10a1b6"}} className="text-center pb-2 mb-5 mt-2">❝ What you practice grows stronger ❞</h3>
        <div className="mx-auto px-5" >
        <select className="form-select form-select-lg mb-3 text-center" value={this.state.selectedBlock} onChange={this.handleChange}>
          <option selected>Choose block to practice on:</option>
          <option value="cardiovascular">Cardiovascular</option>
          <option value="musculoskeletal">Musculoskeletal</option>
          <option value="respiratory">Respiratory</option>
          <option value="hemOnc">Hematology/Oncology</option>
          <option value="neurology">Neurology</option>
          <option value="endocrine">Endocrine</option>
          <option value="gastrointestinal">Gastrointestinal</option>
          <option value="genitourinary">Genitourinary</option>
        </select>
        </div>

        <div className="row mb-5 d-flex justify-content-center">
        { this.state.selectedBlock == "cardiovascular" && (
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="/#/cardiovascular/practice">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/CardioTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                        <h6><i className="far fa-play-circle" span={{fontSize: "1.4rem"}}></i> Practice Cardiovascular</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
        )}
        { this.state.selectedBlock == "musculoskeletal" && (
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="/#/musculoskeletal/practice">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/MSKTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                      <h6><i className="far fa-play-circle" span={{fontSize: "1.4rem"}}></i> Practice Musculoskeletal</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
        )}
{ this.state.selectedBlock == "respiratory" && (
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="/#/respiratory/practice">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/RespTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                      <h6><i className="far fa-play-circle" span={{fontSize: "1.4rem"}}></i> Practice Respiratory</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
)}
{ this.state.selectedBlock == "hemOnc" && (
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="/#/hemOnc/practice">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/HemOncTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                      <h6><i className="far fa-play-circle" span={{fontSize: "1.4rem"}}></i> Practice Hematology/Oncology</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
)}
{ this.state.selectedBlock == "neurology" && (
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="/#/neurology/practice">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/NeuroTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                      <h6><i className="far fa-play-circle" span={{fontSize: "1.4rem"}}></i> Practice Neurology</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
)}
{ this.state.selectedBlock == "endocrine" && (
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="/#/endocrine/practice">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/EndoTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                      <h6><i className="far fa-play-circle" span={{fontSize: "1.4rem"}}></i> Practice Endocrine</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
)}
{ this.state.selectedBlock == "gastrointestinal" && (
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="/#/gastrointestinal/practice">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/GastroTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                      <h6><i className="far fa-play-circle" span={{fontSize: "1.4rem"}}></i> Practice Gastrointestinal</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
)}
{this.state.selectedBlock == "genitourinary" && (
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="/#/genitourinary/practice">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/GenitoTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                      <h6><i className="far fa-play-circle" span={{fontSize: "1.4rem"}}></i> Practice Genitourinary</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
)}
            </div>

        </div>

        <p className="my-2"></p>
        {/* Previous Sessions */}
        <hr/>
        <div>
        <h4 className="text-center py-2 tawassamBlue">
          {this.state.username +"'s"} Previous Sessions
        </h4>
        <p></p>
        <div style={{ maxHeight: "600px", overflow: "auto"}} className="mb-5">
        <table className="table table-striped">
          <thead>
            <tr>
            <th><span className="tawassamYellow">ID</span></th>
                <th><span className="tawassamYellow">Blcok</span></th>
                <th><span className="tawassamYellow">Date</span></th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.practiceDescSessions.map((session) => (
              <tr key={session.id}>
                  <td className="tawassamBlue">{session.id}</td>
                  <td className="tawassamBlue">{session.block}</td>
                  <td className="tawassamBlue">{session.date}</td>

                <td>
                  <a
                    href= {`#/${this.state.block}/practice/description/results/${session.id}`}
                    className="btn tawassamYellowBG"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={(e) => {
                      this.setState({
                        selectedPracticeDescriptionSessionId: session.id,
                        selectedPracticeDescriptionSession: session,
                      });
                    }}
                  >
                    View Session
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // the first one is whatever we're getting so it's okay, the 2nd one is the name of the reducer, the 3rd the state in the reducer
  practiceDescSessions: state.practiceDescSessions.practiceDescSessions,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMyPracticeDescSessions, getPracticeDescSessions })(MyPractice);