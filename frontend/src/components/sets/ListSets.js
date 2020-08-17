import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { getSets, deleteSet } from "../../actions/sets.js";
import FormSet from "./FormSet.js";
import DetailsSet from "./DetailsSet.js";

export class ListSets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: true,
      isCreating: false,
      isViewing: false,
      block: this.props.block,
      subject: this.props.subject,
      selectedSetId: null,
      selectedSet: null,
    };
    this.backToList = this.backToList.bind(this);
  }
  rendering() {
    if (this.state.isUpdating == true) {
      this.setState({
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
    backToSubjects: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getSets(this.props.block, this.props.subject);
  }
  backToList(event) {
    this.setState({ isCreating: false, isViewing: false,});
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
    return (
      <div className="container">
        <h1 className="text-center py-2 text-info">
          {this.state.block} {this.state.subject} Sets
        </h1>
        <Button
          className="btn btn-secondary"
          onClick={this.props.backToSubjects}
        >
          Previous Page
        </Button>
        {user
          ? this.props.auth.user.profile.role && this.props.auth.user.profile.role == "Instructor" && (
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
          : "" }
        <p></p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Owner:</th>
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
                  <Button
                    to={"/sets/" + set.id}
                    className="btn btn-warning"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={(e) => {
                      this.setState({
                        selectedSetId: set.id,
                        isViewing: true,
                        selectedSet: set,
                      });
                    }}
                  >
                    View Set
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // the first one is whatever we're getting so it's okay, the 2nd one is the name of the reducer, the 3rd the state in the reducer
  sets: state.sets.sets,
  auth: state.auth,
});

export default connect(mapStateToProps, { getSets, deleteSet })(ListSets);