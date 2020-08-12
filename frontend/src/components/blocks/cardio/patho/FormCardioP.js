import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSet } from '../../../../actions/blocks/cardio/patho';
import axios from 'axios'
import { tokenConfig } from '../../../../reducers/auth'

//FilePond
 import { FilePond, File, registerPlugin } from 'react-filepond';
 import 'filepond/dist/filepond.min.css';
 import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
 import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
 import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
 import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
 // Register filepond plugins, FilePondPluginFileEncode
 registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


 export class FormCardioP extends Component {
   state = {
     title: '',
     description: '',
     slideImages: "this is slideImages, Hello!"
   }
     static propTypes = {
       addSet: PropTypes.func.isRequired
     };

     onChange = e => this.setState ({ [e.target.name]: e.target.value });

     onSubmit = (e) => {
       e.preventDefault();
       const set = new FormData();
       set.append('title', this.state.title)
       set.append('description', this.state.description);
       console.log( this.pond, "Up up here, see it works!")
       this.pond.getFiles()
       .map(fileItem => fileItem.file)
       .forEach(file => {
        set.append('image', file, file.name);
        
       });
       console.log(...set, "testing for set");
       console.log(JSON.stringify(set), "testing for set")
       this.props.addSet(set);
       this.setState({
         title: "",
         description: "",
         slideImages: "this is slideImages, Hello!"
       })
       this.props.history.push('/cardiology/pathology');
       console.log("submit");

     };
     render() {
       const {title, description, files, setFiles } = this.state;
       return (
         <div className="container">
         <div className="row">
          <h1 className="text-info pb-4">Create a learning set:</h1>
         </div>
          <div className="row">
            
            <div className="col-6">
            <form onSubmit={this.onSubmit} id="setForm">
              <div className="form-group">
                <h4>Title:</h4>
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
                <h4>Explanation:</h4>
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
               <h4>Upload set images:</h4> 
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

  export default connect(null, { addSet })(FormCardioP);
