import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getClusters, deleteCluster } from "../../actions/clusters.js";
// import { loadingOn, loadingOff } from "../../actions/loading.js";
import FormCluster from "./FormCluster.js";
import DetailsCluster from "./DetailsCluster.js";

export class ListClusters extends Component {
  static propTypes = {
    goSet: PropTypes.func.isRequired,
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
      selectedClusterId: null,
      selectedCluster: null,
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


      this.props.getClusters(this.state.block, this.state.subject);
    }

    this.backToList = this.backToList.bind(this);
  }

  static propTypes = {
    //This is the first "cluster" from the func down below
    clusters: PropTypes.array.isRequired,
    getClusters: PropTypes.func.isRequired,
    deleteCluster: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    block: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.props.getClusters(this.props.block, this.props.subject);
  }
  backToList(event) {
    this.setState({ isCreating: false, isViewing: false, isUpdating: true, isReady: false });
    this.props.getClusters(this.props.block, this.props.subject);
  }
  render() {


    if (this.state.isCreating) {
      return (
        <Fragment>
          <FormCluster
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
          <DetailsCluster
            selectedClusterId={this.state.selectedClusterId}
            cluster={this.state.selectedCluster}
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
    setTimeout(() => this.setState({ isReady: true }), 600);
    }


    //The List component
    if (this.state.isReady) {
      return (
        <div className="container">
          <h1 className="text-center py-2 text-info">
            {this.state.block} {this.state.subject} Clusters
          </h1>
          {/* <hr /> */}
          <a className="btn btn-secondary" href={`#/${this.state.blockLink}`}>
            Previous Page
          </a>

          {user
            ? this.props.auth.user.profile.role &&
              this.props.auth.user.profile.role == "Instructor" && (
                <Button
                  className="btn btn-info ml-1"
                  onClick={(e) => {
                    this.setState({
                      isCreating: true,
                    });
                  }}
                >
                  Add a New Cluster
                </Button>
              )
            : ""}
          
          <a className="btn btn-outline-info float-right" href={`#/${this.state.blockLink}`}        
             onClick={(e) => {
            this.props.goSet();
            event.preventDefault();
          }}
          style={{ fontWeight: "bold" }}
          >
            <i className="fas fa-layer-group"  style={{ fontSize: "1.3rem" }}></i> Sets
          </a>
          <p></p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Owner</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.clusters.map((cluster) => (
                <tr key={cluster.id}>
                  <td>{cluster.id}</td>
                  <td>{cluster.title}</td>
                  <td>{cluster.owner_username}</td>
                  <td>
                    <a
                      href={`#/${this.state.blockLink}/${this.state.subjectLink}/clusters/${cluster.id}`}
                      className="btn btn-warning"
                      style={{ whiteSpace: "nowrap" }}
                      onClick={(e) => {
                        this.setState({
                          selectedClusterId: cluster.id,
                          // isViewing: true,
                          selectedCluster: cluster,
                        });
                      }}
                    >
                      View Cluster
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

    <Fragment>
<div className="cssload-loader mt-5">
	<div className="cssload-inner cssload-one"></div>
	<div className="cssload-inner cssload-two"></div>
	<div className="cssload-inner cssload-three"></div>
</div>
    </Fragment>

    );
    }
  }
}

const mapStateToProps = (state) => ({
  // the first one is whatever we're getting so it's okay, the 2nd one is the name of the reducer, the 3rd the state in the reducer
  clusters: state.clusters.clusters,
  auth: state.auth,
  loadingState: state.loadingState,
});

export default connect(mapStateToProps, { getClusters, deleteCluster })(ListClusters);
