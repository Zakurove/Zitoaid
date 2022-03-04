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

    const { email, currentBlock } = this.state;
    return (
      <div className=" justify-content-around" style={{backgroundImage: `url("https://tawassam.ams3.digitaloceanspaces.com/Test1/media/WelcomePageCropped.png")`, backgroundSize: 'contain', backgroundRepeat: "no-repeat", backgroundPosition: "right top"  }}>                          
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 mb-5 pe-5 p-2" style={{marginTop: "13rem"}}>
          <h1 style={{fontSize: "3.0rem"}} className="me-2 p-3"><span className="tawassamBlue">Seek</span> a better <span className="">outcome!</span></h1>
          <h3 className="me-5 p-3">"If I have 30 mins to see a patient, I will spend 29 mins in history taking."</h3>

          <div className="mt-5 pt-5 justify-content-center text-center px-3">
          <Link to="/register">
            <button type="button" className="btn btn-info btn-lg tawassamBlueBG" style={{padding: "0.7rem 1.5rem", fontSize: "3rem", borderRadius: "2.9rem", borderColor:"#00D0C5"}}>Start Session</button>
            </Link>
          </div>

          


        </div>
        <div className="col-xl-3 col-lg-3 col-md-3"></div>
        </div>
        <div className="row mb-5" style={{marginTop: "5rem"}}>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 mt-5 pt-5 align-self-center">
          <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/SubjectsList.png" class="img-fluid ps-2" />
        </div>
        <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 align-self-center p-4">
        <h1 style={{fontSize: "3rem"}} className=""><span className="tawassamBlue">Study</span> different subject and <span className="">ACE your exams!</span></h1>
          <h4><span className="tawassamBlue">Explore</span> our library and <span className="tawassamYellow">practice</span> various subjects in all systems.</h4>
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
