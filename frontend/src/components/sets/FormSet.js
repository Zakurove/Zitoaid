import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import { addSet } from '../../actions/sets.js';


//FilePond
 import { FilePond, File, registerPlugin } from 'react-filepond';
 import 'filepond/dist/filepond.min.css';
 import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
 import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
 import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
 import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
 registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


 export class FormSet extends Component {
   state = {
     title: '',
     description: '',
     slideImages: "this is slideImages, Hello!",
     block: this.props.block,
     subject: this.props.subject,
   }
     static propTypes = {
       addSet: PropTypes.func.isRequired,
       block: PropTypes.string.isRequired,
       subject: PropTypes.string.isRequired,
       backToList: PropTypes.func.isRequired,
     };

     onChange = e => this.setState ({ [e.target.name]: e.target.value });

     onSubmit = (e) => {
       e.preventDefault();
       const set = new FormData();
       set.append('title', this.state.title)
       set.append('description', this.state.description);
       set.append('block', this.props.block);
       set.append('subject', this.props.subject);
       console.log( this.pond, "Up up here, see it works!")
       this.pond.getFiles()
       .map(fileItem => fileItem.file)
       .forEach(file => {
        set.append('image', file, file.name);
        
       });
       this.props.addSet(set);
       this.setState({
         title: "",
         description: "",
         slideImages: "this is slideImages, Hello!"
       })
       
       this.props.backToList()

     };
     render() {
       const {title, description, files, setFiles } = this.state;
       return (
         <div className="container">
           <h1 className="text-center py-2 text-info">{this.props.block} {this.props.subject}: create a set</h1>
           <Button
          className="btn btn-secondary mb-2"
          onClick={this.props.backToList}
          
        >
          Previous Page
        </Button>

          <div className="row pt-4" style={{borderTop: "2px solid #ffc107"}}>
            
            <div className="col-6">
            <form onSubmit={ this.onSubmit} id="setForm">
              <div className="form-group">
                <h4 className="text-info">Title:</h4>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  onChange={this.onChange}
                  value={title}
                  placeholder="Title of the set"
                />
              </div>
              <div className="form-group">
                <h4 className="text-info">Explanation:</h4>
                <textarea
                  className="form-control"
                  type="text"
                  name="description"
                  onChange={this.onChange}
                  value={description}
                  placeholder="Explanation of the set"
                  rows="6"
                />
              </div>
 
              <div className="form-group">
              <button type="submit" className="btn btn-lg btn-warning btn-block">
                Submit
              </button>
            </div>
 
            </form>
            </div>
            <div className = "col-6">
            <div className="form-group" form = "setForm">
               <h4 className="text-info">Upload set images:</h4> 
                <FilePond
              name="image"
              ref={ref => this.pond = ref}
              files={this.state.files}
              allowMultiple={true}
              onuploadfiles={(fileitems => {
                this.setState({
                  files: fileitems.map(fileitem => fileitem.file)
                });
              })}
              onupdatefiles={(fileitems => {
                this.setState({
                  files: fileitems.map(fileitem => fileitem.file)
                });
              })}
              form = "setForm"
              />
              </div>
            </div>
          </div>
          </div>
       )
     }
   }

  export default connect(null, { addSet })(FormSet);
