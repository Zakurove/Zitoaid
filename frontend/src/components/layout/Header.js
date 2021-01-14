import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Navbar, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const renderTooltip1 = (props) => (
      <Tooltip id="button-tooltip1" style={{fontSize: "2rem", maxWidth: "200%"}} {...props}>
        Logout
      </Tooltip>
    );
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <Navbar.Collapse className="justify-content-end">

        <Navbar.Text style={{fontSize: "1.5rem"}}>
        <i className="fas fa-user"></i> {user ? <span className="text-info" style={{fontWeight: "bold"}}> {user.username}</span> : ""}
          </Navbar.Text>
        

          <Nav>
        <Nav.Link onClick={this.props.logout} style={{fontSize: "2rem"}} className="ml-3">               
        <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip1}
              >
                <i className="fas fa-sign-out-alt"></i>
              </OverlayTrigger></Nav.Link>
        </Nav>

      </Navbar.Collapse>
    );

    const guestLinks = (


          <Navbar.Collapse className="justify-content-end">

            <Nav >  
            <Nav.Link href="#/login" style={{fontSize: "1.3rem"}}><i className="fas fa-sign-in-alt"></i> Login</Nav.Link>
            <Nav.Link href="#/register" className="ml-2" style={{fontSize: "1.3rem"}}><i className="fas fa-user-plus" style={{fontSize: "1.2rem"}}></i> Sign Up</Nav.Link>
            </Nav>
            
          </Navbar.Collapse>
    );

    return (
      <Fragment>
      <Navbar  bg="light" expand="lg" className="mb-5">
      <Navbar.Brand href="/#" style={{fontSize: "2.5rem"}} className="text-info">Tawassam</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto ml-2" style={{fontSize: "1.8rem"}}>
      <Nav.Link href="/#" className="ml-2"><i className="fas fa-home"></i> Home</Nav.Link>
      {user
        ? this.props.auth.user.profile.role && this.props.auth.user.profile.role == "Instructor" && (
          <Nav.Link href="#/mysets" className="ml-2"><i className="fas fa-layer-group"></i> My Sets</Nav.Link>
          )
        : "" }
              {user
        ? this.props.auth.user.profile.role && this.props.auth.user.profile.role == "Instructor" && (
          <Nav.Link href="#/myclusters" className="ml-2"><i className="fas fa-sitemap"></i> My Clusters</Nav.Link>
          )
        : "" }
  
      </Nav>
      {isAuthenticated ? authLinks : guestLinks} 

      </Navbar.Collapse>
    </Navbar>

    </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
