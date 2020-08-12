import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSets, deleteSet } from "../../../../actions/blocks/msk/micro";
import { Link } from "react-router-dom";


export class ListMSKM extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isUpdating: true,

    };

  }
rendering(){
  if (this.state.isUpdating == true)  {
    this.setState({
      isUpdating: false,
    });
    this.props.getSets();
  }
}
  static propTypes = {
    //This is the first "set" from the func down below
    sets: PropTypes.array.isRequired,
    getSets: PropTypes.func.isRequired,
    deleteSet: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getSets();

    
  }
  render() {
    const {  user } = this.props.auth;
    {this.rendering()}
    return (
      <div className="container">
        <h1 className="text-center py-2 text-info">MSK: Microbiology Sets</h1>
        <Link className="btn btn-secondary" to="/msk/">
          Previous Page
        </Link>
        {user ? this.props.auth.user.profile.role == 'Instructor' && (
        <Link className="btn btn-info ml-1" to="/msk/microbiology/create/">
          Add a New Set
        </Link>
         ): ""}
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
                  <Link
                    to={"/msk/microbiology/" + set.id}
                    className="btn btn-warning"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    View Set
                  </Link>
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
  auth: state.auth
});

export default connect(mapStateToProps, { getSets, deleteSet })(ListMSKM);
