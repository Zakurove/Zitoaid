import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSets, deleteSet } from '../../../../actions/blocks/resp/micro';
import { Link } from 'react-router-dom'

export class ListRespM extends Component {
  static propTypes = {
    //This is the first "set" from the func down below
    sets: PropTypes.array.isRequired,
    getSets: PropTypes.func.isRequired,
    deleteSet: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getSets();
  }
  render() {
    return (
      <div className='container'>
        <h1>Sets List</h1>
        <table className="table table-striped">
          <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Created by:</th>
            <th />
          </tr>
          </thead>
          <tbody>

            { this.props.sets.map(set =>(
              <tr key={set.id}>
                <td>{set.id}</td>
                <td>{set.title}</td>
                <td>{set.description}</td>
                <td>
                <Link to={'/respiratory/microbiology/'+set.id} >Show </Link>
                <button onClick={this.props.deleteSet.bind
                  (this, set.id)}
                   className="btn btn-warning">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  // the first one is whatever we're getting so it's okay, the 2nd one is the name of the reducer, the 3rd the state in the reducer
  sets: state.sets.sets
})

export default connect(mapStateToProps,
   { getSets, deleteSet }
)(ListRespM);
