import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getSets, deleteSet } from "../../actions/sets.js";
import FormSet from "./FormSet.js";
import DetailsSet from "./DetailsSet.js";

export class ListSets extends Component {
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

      // setTimeout(
      //   () => this.setState({ isUpdating: false }),
      //   3000
      // );

      //   setTimeout(
      //     function() {
      //         this.setState({ isUpdating: false });

      //     }
      //     .bind(this),
      //     3000
      // );

      // setTimeout(() => {

      // })
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
    this.props.getSets(this.props.block, this.props.subject);
  }
  render() {
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
    setTimeout(() => this.setState({ isReady: true }), 600);
    }
    //The List component
    if (this.state.isReady) {
      return (
        <div className="container">
          <h1 className="text-center py-2 text-info">
            {this.state.block} {this.state.subject} Sets
          </h1>
          <hr />
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
                  Add a New Set
                </Button>
              )
            : ""}
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
              {this.props.sets.map((set) => (
                <tr key={set.id}>
                  <td>{set.id}</td>
                  <td>{set.title}</td>
                  <td>{set.owner_username}</td>
                  <td>
                    <a
                      href={`#/${this.state.blockLink}/${this.state.subjectLink}/${set.id}`}
                      className="btn btn-warning"
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
    //The loading component
    if (this.state.isReady == false) {
    return (<Fragment>


<div className="cssload-loader mt-5">
	<div className="cssload-inner cssload-one"></div>
	<div className="cssload-inner cssload-two"></div>
	<div className="cssload-inner cssload-three"></div>
</div>

    </Fragment>);
    }
  }
}

const mapStateToProps = (state) => ({
  // the first one is whatever we're getting so it's okay, the 2nd one is the name of the reducer, the 3rd the state in the reducer
  sets: state.sets.sets,
  auth: state.auth,
});

export default connect(mapStateToProps, { getSets, deleteSet })(ListSets);
