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
            {/* Text col */}
            <div className="col-6 pt-5">
              <h1 style={{fontWeight: "bold"}}>Landing page UI kit</h1>
              <l1 style={{fontWeight: "bold"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc odio in et, lectus sit lorem id integer.</l1>
              <div>
              <form className="mt-5 row">
            
                <div className="col-md-6">
                <h5 className=" mb-2 tawassamBlue">*Email</h5>
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
                <h5 className="mb-2 tawassamBlue">Current Block, if applicable</h5>
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

              {/* Art Col */}
            <div className="col-6"></div>
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
