import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import { addCluster } from '../../actions/clusters.js';


 export class FormCluster extends Component {
   state = {
     title: '',
     description: '',
     block: this.props.block,
     subject: this.props.subject,
   }
     static propTypes = {
       addCluster: PropTypes.func.isRequired,
       block: PropTypes.string.isRequired,
       subject: PropTypes.string.isRequired,
       backToList: PropTypes.func.isRequired,
     };

     onChange = e => this.setState ({ [e.target.name]: e.target.value });

     onSubmit = (e) => {
       e.preventDefault();
       const cluster = new FormData();
       cluster.append('title', this.state.title)
       cluster.append('description', this.state.description);
       cluster.append('block', this.props.block);
       cluster.append('subject', this.props.subject);
       this.props.addCluster(cluster);
       this.setState({
         title: "",
         description: "",
       })
       
      //  Go to associate sets
       this.props.backToList()

     };
     render() {
       const {title, description } = this.state;
       return (
         <div className="container">
           <h1 className="text-center py-2 text-info">{this.props.block} {this.props.subject}: create a cluster</h1>
           <Button
          className="btn btn-secondary mb-2"
          onClick={this.props.backToList}
          
        >
          Previous Page
        </Button>

          <div className="row pt-4" style={{borderTop: "2px solid #ffc107"}}>
            
            <div className="col-6">
            <form onSubmit={ this.onSubmit} id="clusterForm">
              <div className="form-group">
                <h4 className="text-info">Title:</h4>
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
                <h4 className="text-info">Description:</h4>
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
              <button type="submit" className="btn btn-lg btn-warning btn-block">
                Next
              </button>
            </div>
 
            </form>
            </div>
          </div>
          </div>
       )
     }
   }

  export default connect(null, { addCluster })(FormCluster);
