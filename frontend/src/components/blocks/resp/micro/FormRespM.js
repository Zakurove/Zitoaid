import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSet } from '../../../../actions/blocks/resp/micro';
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


 export class FormRespM extends Component {
   state = {
     title: '',
     description: '',
     image: null
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


       this.props.addSet(set);
       this.setState({
         title: "",
         description: "",

       })
       this.props.history.push('/respiratory/microbiology');
       console.log("submit");

     };
     render() {
       const {title, description, image} = this.state;
       return (
         <div className="card card-body mt-4 mb-4">
           <h2>Add Set</h2>
           <form onSubmit={this.onSubmit}>
           <div className="form-group">
             <button type="submit" className="btn btn-primary">
               Submit
             </button>
           </div>

             <div className="form-group">
               <label>Title</label>
               <input
                 className="form-control"
                 type="text"
                 name="title"
                 onChange={this.onChange}
                 value={title}
               />
             </div>
             <div className="form-group">
               <label>Description</label>
               <textarea
                 className="form-control"
                 type="text"
                 name="description"
                 onChange={this.onChange}
                 value={description}
               />
             </div>
             <div className="form-group">
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
             />
             </div>
           </form>
         </div>
       )
     }
   }

  export default connect(null, { addSet })(FormRespM);
