import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form } from "react-bootstrap";
import { addCluster } from '../../actions/clusters.js';
import { getSets } from '../../actions/sets.js';


 export class FormCluster extends Component {
   
   state = {
     title: '',
     description: '',
     block: this.props.block,
     subject: this.props.subject,
     sets: [],
     setsArray: [],
     isUpdating: true,
     isPending: true,
     isReady: false,
     
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
        isPending: true
      });
      this.props.getSets(this.state.block, this.state.subject);
    }

    //Pending 
    if (this.state.isPending == true) {
      // To give the 'sets' an isChecked field
      let newSeti;
      let newSets = [...this.props.sets]
      for (newSeti = 0; newSeti < newSets.length; newSeti++) {
        newSets[newSeti] = {...newSets[newSeti], isChecked: false}
      }
      this.setState ({
        sets: newSets,
        isPending: false
      })
    }
    
  }

  static propTypes = {
    sets: PropTypes.array.isRequired,
    getSets: PropTypes.func.isRequired,
    addCluster: PropTypes.func.isRequired,
    block: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    backToList: PropTypes.func.isRequired,
  };

  // this.handleCheckElement = this.handleCheckElement.bind(this);
  handleCheckElement = (e) => {
    let checkedSets = this.state.sets
    checkedSets.forEach(set => {
      if (set.id == e.target.value) {
        set.isChecked =  e.target.checked
      }
      })
    this.setState({sets: checkedSets})
 }
     onChange = e => this.setState ({ [e.target.name]: e.target.value });



     onSubmit = (e) => {
       e.preventDefault();
      
      //Sets related to the cluster
       this.state.sets.forEach(set => {
        if (set.isChecked) {
          let id = set.id
          this.setState(previousState => ({
            setsArray: [...previousState.setsArray, id ]
        }));
        }
       })

       const cluster = new FormData();
       cluster.append('title', this.state.title)
       cluster.append('description', this.state.description);
       setTimeout(() => cluster.append('setsArray', this.state.setsArray), 300);
       cluster.append('block', this.props.block);
       cluster.append('subject', this.props.subject);
      //  this.props.addCluster(cluster);
       setTimeout(() => this.props.addCluster(cluster), 500);
       this.setState({
         title: "",
         description: "",
       })
       
      //  Go to associate sets
      setTimeout(() => this.props.backToList(), 700);
       

     };
     componentDidMount() {
      this.props.getSets(this.props.block, this.props.subject);

    }
     render() {
      
      // The loading handler: isReady(For loading screen) > isUpdating(for fetching sets) > isPending (for adding 'isChecked' for sets) > Then finally loading the page
    if (this.state.isReady == false) {
      setTimeout(() => this.setState({ isReady: true }), 600);
      }
    if (this.state.isReady == true) {
      this.rendering(); 
    }
       const {title, description } = this.state;
       if (this.state.isPending == false) {
        this.rendering(); 
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
 

 
            </form>
            </div>
            <div className="col-6" >
            <h4 className="text-info">Select sets for this cluster:</h4>
            <div style={{ height: "350px", overflow: "auto" }}>
            <table className="table table-striped " > 
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>Title</th>
                <th>Owner</th>
                 </tr>
            </thead>
            <tbody>
              {this.state.sets.map((set) => (
                <tr key={set.id}>
                  <td><input key={set.id} onChange={ (e) => this.handleCheckElement(e) }  type="checkbox" checked={set.isChecked} value={set.id}   /></td>
                  <td>{set.id}</td>
                  <td>{set.title}</td>
                  <td>{set.owner_username}</td>
                  {/* {console.log(set)} */}

                  {/* <td>
                    <a
                      href={`#/${this.state.blockLink}/${this.state.subjectLink}/${cluster.id}`}
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
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
             </div>
            </div>
          </div>
          <div className="row pt-4">     
              {/* <div className="form-group"> */}
              <button type="submit" form="clusterForm" className="btn btn-outline-info btn-lg btn-block">
                Create this cluster
              </button>
            {/* </div> */}
            </div>
          </div>
       )
        }
        if (this.state.isPending == true) {
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
    sets: state.sets.sets,
    // auth: state.auth,
    // loadingState: state.loadingState,
  });
  // export default connect(null, { addCluster })(FormCluster);
  export default connect(mapStateToProps, { getSets, addCluster })(FormCluster);
