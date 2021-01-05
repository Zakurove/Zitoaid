import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCluster, updateCluster } from "../../actions/clusters.js";


export class EditCluster extends Component {
  state = {
    cluster: this.props.cluster,
    title: this.props.cluster.title,
    description: this.props.cluster.description,
  };
  static propTypes = {
    cluster: PropTypes.object.isRequired,
    addCluster: PropTypes.func.isRequired,
    updateCluster: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = async (e) => {
    e.preventDefault();
    const cluster = new FormData();
    cluster.append("title", this.state.title);
    cluster.append("description", this.state.description);
    this.props.updateCluster(cluster, this.state.cluster.id);
    this.props.onSave(e)
    this.setState({
      title: "",
      description: "",
    });
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.cluster.id != nextProps.cluster.id) {
      this.setState({ cluster: nextProps.cluster });
    }
  }
  render() {
    const { title, description } = this.state;
    return (
      <div className="container">
        <div className="row">
        <div className="col"><h1 className="text-info pb-4 text-center">Edit Cluster</h1></div>
        </div>
        <div className="row">
          <div className="col-6">
            <form onSubmit={this.onSubmit} id="clusterForm">
              <div className="form-group">
                <h4>Title:</h4>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  onChange={this.onChange}
                  value={title}
                  placeholder="Title of the cluster"
                />
              </div>
              <div className="form-group">
                <h4>Description:</h4>
                <textarea
                  className="form-control"
                  type="text"
                  name="description"
                  onChange={this.onChange}
                  value={description}
                  placeholder="Cluster description"
                  rows="6"
                />
              </div>
              <div className="form-group">
              <button
                  type="submit"
                  className="btn btn-lg btn-warning btn-block"
                >
                  Update
                </button>
              <button
                  
                  onClick={this.props.onSave}
                  className="btn btn-lg btn-secondary btn-block"
                >
                  Cancel
                </button>


              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addCluster, updateCluster })(EditCluster);

