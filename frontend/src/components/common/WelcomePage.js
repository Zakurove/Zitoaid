import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEmailList } from "../../actions/emailLists";
import { createMessage } from "../../actions/messages";
import "../../../static/css/user.css";

export class WelcomePage extends Component {
  state = {
    email: "",
    currentBlock: "",
    isChecked: false,
    submitted: false
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

//   emailSubmit = () => {
//     this.props.addEmailList(emailList);
// }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    if (this.state.submitted) {
      return (
        <Fragment>
          <div className="" style={{backgroundImage: `url("https://tawassam.ams3.digitaloceanspaces.com/Test1/media/tawassamLoginBG.jpg")`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", backgroundPosition: "right top", paddingBottom: "15rem"  }}>                          
        <div className="container">
          <div className="text-center justify-content-center mb-5">
        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/tawassamLogo.png"
                          alt="Responsive image"
                          className="img-fluid"
                          style={{top: "1.15%", borderRadius: "0px", maxWidth: "25%"}}
                        />
          </div>


            <div className="text-center justify-content-center mt-3 mb-5">
        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/HeartHisto.png"
                          alt="Responsive image"
                          className="img-fluid"
                          style={{borderRadius: "3rem", border: "4px solid #00D0C5", maxWidth: "80%"}}
                        />
                        </div>

          <div className="row text-center">
          <h1 className="tawassamBlue mt-3 text-center" style={{fontWeight: "bold", fontSize: "3rem"}}>Thank you for showing interest in Tawassam!</h1>
          <h3 className="tawassamYellow text-center" style={{fontWeight: "bold", fontSize: "3rem"}}>We'll contact you soon with good news!</h3>
          </div>

        </div>

      </div>
        </Fragment>
      );
    }

    const { email, currentBlock } = this.state;
    return (
      <div className="" style={{backgroundImage: `url("https://tawassam.ams3.digitaloceanspaces.com/Test1/media/tawassamLoginBG.jpg")`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", backgroundPosition: "right top", paddingBottom: "15rem"  }}>                          
        {/* <hr className="style-five"/> */}
        <div className="container">
          <div className="text-center justify-content-center mb-5">
        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/tawassamLogo.png"
                          alt="Responsive image"
                          className="img-fluid"
                          style={{top: "1.15%", borderRadius: "0px", maxWidth: "25%"}}
                        />
                        </div>
          <div className="row pt-5">
              {/* Art Col */}
              <div className="col-md-6 order-md-2">
            <div className="text-center justify-content-center">
        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Mr.%20T-Rex.jfif"
                          alt="Responsive image"
                          className="img-fluid"
                          style={{borderRadius: "3rem", border: "4px solid #00D0C5", maxWidth: "80%"}}
                        />
                        </div>

            </div>

            {/* Text col */}
            <div className="col-md-6 order-md-1" style={{paddingTop: "6.5rem"}}>
              <h1 style={{fontWeight: "bold", fontSize: "3.8rem"}} className="tawassamBlue">Welcome to Tawassam!</h1>
              <l1 style={{fontWeight: "bold", fontSize: "1.3rem"}} className="tawassamYellow">Where we strive to enhance visual material interpretation for health-care personnel.</l1>
              <div>
                
              <form className="mt-5 row">
              <hr/>
              <h1 style={{fontWeight: "bold", fontSize: "3rem"}} className="tawassamBlue mb-3">Sign up in our list early access!</h1>
                <div className="col-md-6">
                  
                <h5 className=" mb-2 tawassamBlue mt-2">*Email</h5>
                <div className="input-group form-group mt-1">
                    {/* <span className="input-group-text iconInput ">
                      <i className="fas fa-user mx-auto"></i>
                    </span> */}
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    onChange={this.onChange}
                    value={email}
                    placeholder="Email to contact once ready"
                  />
                </div>
                </div>
                <div className="col-md-6">
                <h5 className="mb-2 tawassamBlue mt-2">Current Block, if applicable</h5>
                <div className="input-group form-group mt-1">
                  <input
                    type="text"
                    className="form-control"
                    name="currentBlock"
                    onChange={this.onChange}
                    value={currentBlock}
                    placeholder="Current block"
                  />
                </div>
                  </div>

                <div className="d-grid">
                <button
                  type="button"
                  value="Email"
                  onClick={this.onSubmit}
                  style={{ color: "white"}}
                  className="btn btn-info tawassamBlueBG btn-lg mt-4"
                >
                  Email me when it's ready!
                </button>
                </div>


              </form>
              </div>

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

export default connect(mapStateToProps, { addEmailList, createMessage })(WelcomePage);
