import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// <h2>{this.props.match.params.id}</h2>
import {  showSet, getSets } from '../../../../actions/blocks/resp/micro';

export class DetailsRespM extends Component {
  static propTypes = {
    //This is the first "set" from the func down below
    sets: PropTypes.array.isRequired,
    getSets: PropTypes.func.isRequired,
    showSet: PropTypes.func.isRequired,
  };

  componentDidMount() {
    //So here we got the id of the set and made it a var, then we got all the sets, then filtered through them and kept the set we require
    var id = this.props.match.params.id
    this.props.getSets();
    this.props.showSet(id);
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

          </tr>
          </thead>
          <tbody>

            { this.props.sets.map(set =>(
              <tr key={set.id}>
                <td>{set.id}</td>
                <td>{set.title}</td>
                <td>{set.description}</td>
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
   { getSets, showSet }
)(DetailsRespM);
