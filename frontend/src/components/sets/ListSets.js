import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getSets, deleteSet } from "../../actions/sets.js";
// import { loadingOn, loadingOff } from "../../actions/loading.js";
import FormSet from "./FormSet.js";
import DetailsSet from "./DetailsSet.js";
import Loader from "../layout/Loader.js";

export class ListSets extends Component {
  static propTypes = {
    goCluster: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: true,
      isCreating: false,
      isReady: false,
      isViewing: false,
      block: this.props.block,
      subject: this.props.subject,
      selectedSetId: null,
      selectedSet: null,
      blockLink: null,
      subjectLink: null,
    };
    this.backToList = this.backToList.bind(this);
  }
  //Before render, to fetch info about this list regarding subject and block
  rendering() {
    if (this.state.isUpdating == true) {
      if (this.props.block == "Hematology/Oncology") {
        this.setState({
          blockLink: "hemOnc",
        });
      }
      if (this.props.block !== "Hematology/Oncology") {
        const blockLink = this.props.block.toLowerCase();
        this.setState({
          blockLink: blockLink,
        });
      }
      const subjectLink = this.props.subject.toLowerCase();
      this.setState({
        subjectLink: subjectLink,
        isUpdating: false,
      });

      this.props.getSets(this.state.block, this.state.subject);
    }

    this.backToList = this.backToList.bind(this);
  }

  static propTypes = {
    //This is the first "set" from the func down below
    sets: PropTypes.array.isRequired,
    getSets: PropTypes.func.isRequired,
    deleteSet: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    block: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.props.getSets(this.props.block, this.props.subject);
  }
  backToList(event) {
    this.setState({ isCreating: false, isViewing: false, isUpdating: true, isReady: false });
    // this.props.getSets(this.props.block, this.props.subject);
  }
  render() {
        // // The loading handler
        // if (this.props.loadingState == true) {
        //   setTimeout(() => this.props.loadingOff(), 1000);
        //   }

    if (this.state.isCreating) {
      return (
        <Fragment>
          <FormSet
            block={this.state.block}
            subject={this.state.subject}
            backToList={this.backToList}
          />
        </Fragment>
      );
    }
    if (this.state.isViewing) {
      return (
        <Fragment>
          <DetailsSet
            selectedSetId={this.state.selectedSetId}
            set={this.state.selectedSet}
            block={this.state.block}
            subject={this.state.subject}
            backToList={this.backToList}
          />
        </Fragment>
      );
    }
    const { user } = this.props.auth;
    {
      this.rendering();
    }

    // The loading handler
    if (this.state.isReady == false) {
      setTimeout(() => this.props.getSets(this.props.block, this.props.subject), 1000);
    setTimeout(() => this.setState({ isReady: true }), 1500);
    }


    //The List component
    if (this.state.isReady) {
      return (
        <div className="container my-5">
          <h1 className="text-center py-2 tawassamBlue">
            {this.state.block} {this.state.subject} Sets
          </h1>
          {/* <hr /> */}
          {/* <a className="btn btn-secondary mt-1" href={`#/${this.state.blockLink}/${this.state.subjectLink}`}>
          <i class="fas fa-arrow-left"></i> Previous Page
          </a> */}
          <Button
            className="btn btn-secondary mb-1 "
            href={`#/${this.state.blockLink}/${this.state.subjectLink}`}
          >
           <i class="fas fa-arrow-left"></i> Previous Page
          </Button>
          {user
            ? this.props.auth.user.profile.role &&
              this.props.auth.user.profile.role == "Instructor" && (
                <Button
                variant="info"
                  className="btn btn-info tawassamBlueBG  ms-3 mt-1"
                  onClick={(e) => {
                    this.setState({
                      isCreating: true,
                    });
                  }}
                >
                  Add a New Set
                </Button>
              )
            : ""}
          <Button
            className="btn btn-warning ms-3 mb-1 "
            href={`#/${this.state.blockLink}/practice`}
            style={{fontSize: "1.2rem"}}
          >
           <i className="fas fa-keyboard" style={{fontSize: "1.3rem"}}></i> Practice Block
          </Button>

          <Button
            className="btn btn-secondary tawassamBlueBG float-end mt-1 "
            href={`#/${this.state.blockLink}/${this.state.subjectLink}/clusters`}
            style={{fontSize: "1.2rem"}}

          >
           <i className="fas fa-sitemap " style={{ fontSize: "1.3rem" }}></i> Clusters
          </Button>

          {/* <a className="btn btn-info tawassamBlueBG float-end mt-1" href={`#/${this.state.blockLink}`}        
          href={`#/${this.state.blockLink}/${this.state.subjectLink}/clusters`}
          style={{ fontWeight: "bold" }}
          >
            <i className="fas fa-sitemap " style={{ fontSize: "1.3rem" }}></i> Clusters
          </a> */}
          <hr />
          <p></p>
          <table className="table table-striped mx-2">
            <thead>
              <tr>
                <th><span className="tawassamYellow">ID</span></th>
                <th><span className="tawassamYellow">Title</span></th>
                <th ><span className="tawassamYellow">Owner</span></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.sets.map((set) => (
                <tr key={set.id}>
                  <td className="" style={{color: "#10a1b6"}}>{set.id}</td>
                  <td className="" style={{color: "#10a1b6"}}>{set.title}</td>
                  <td className="" style={{color: "#10a1b6"}}>{set.owner_username}</td>
                  <td>
                    <a
                      href={`#/${this.state.blockLink}/${this.state.subjectLink}/sets/${set.id}`}
                      className="btn tawassamYellowBG"
                      style={{ whiteSpace: "nowrap" }}
                      onClick={(e) => {
                        this.setState({
                          selectedSetId: set.id,
                          // isViewing: true,
                          selectedSet: set,
                        });
                      }}
                    >
                      View Set
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    // The loading component
    if (this.state.isReady == false) {
    return (

    <Loader/>

    );
    }
  }
}

const mapStateToProps = (state) => ({
  // the first one is whatever we're getting so it's okay, the 2nd one is the name of the reducer, the 3rd the state in the reducer
  sets: state.sets.sets,
  auth: state.auth,
  loadingState: state.loadingState,
});

export default connect(mapStateToProps, { getSets, deleteSet })(ListSets);
