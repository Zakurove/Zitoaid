import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import { addSet } from '../../actions/sets.js';
import { createMessage } from "../../actions/messages";


//FilePond
 import { FilePond, File, registerPlugin } from 'react-filepond';
 import 'filepond/dist/filepond.min.css';
 import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
 import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
 import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
 import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
 import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
 registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);


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
       if (this.state.title.trim() == "") {
        this.props.createMessage({ titleEmpty: "'Title field is required" });
      } 
      else if (this.state.title.trim() !== "") {
       const set = new FormData();
       set.append('title', this.state.title)
       set.append('description', this.state.description);
       set.append('block', this.props.block);
       set.append('subject', this.props.subject);
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
    }
     render() {
       const {title, description, files, setFiles } = this.state;
       return (
         <div className="container mb-5 mt-5" >
           <h1 className="text-center py-2 tawassamBlue">{this.props.block} {this.props.subject}: Create Set</h1>
           <Button
          className="btn btn-secondary mb-2"
          onClick={this.props.backToList}
          
        >
         <i class="fas fa-arrow-left"></i> Previous Page
        </Button>
        <hr/>
          <div className="row pt-4 mb-2" >
            
            <div className="col-6">
            <form onSubmit={ this.onSubmit} id="setForm">
              <div className="form-group">
                <h4 className="tawassamYellow">Title:</h4>
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
                <h4 className="tawassamYellow mt-3">Explanation:</h4>
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
 

            </form>
            </div>
            <div className = "col-6">
            <div className="form-group" form = "setForm">
               <h4 className="tawassamYellow text-center">Upload Set Images</h4> 
                <FilePond
              name="image"
              ref={ref => this.pond = ref}
              files={this.state.files}
              allowMultiple={true}
              allowReorder={true}
              acceptedFileTypes='image/*'
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
           
            <div className="form-group d-grid" form = "setForm">
              <button type="submit" className="btn btn-lg tawassamBlueBG btn-block mt-5 mb-5" onClick={this.onSubmit}>
              Create This Set
              </button>
            </div>
 
          </div>
          </div>
       )
     }
   }

  export default connect(null, { addSet, createMessage })(FormSet);
