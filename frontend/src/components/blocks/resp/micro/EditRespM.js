import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSet, updateSet } from "../../../../actions/blocks/resp/micro";
import axios from "axios";
// import { tokenConfig } from '../../../../reducers/auth'
import { tokenConfig } from "../../../../actions/auth";
//FilePond
import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
// Register filepond plugins, FilePondPluginFileEncode
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export class EditRespM extends Component {
  constructor(props) {
    super(props);

    this.state = {
      set: this.props.set,
      setImages: this.props.set.images,
      testing: ["One"],
      files: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  // // constructor
  static propTypes = {
    // addSet: PropTypes.func.isRequired,
    // updateSet: PropTypes.func.isRequired,
    set: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  saveSet(e) {
    e.preventDefault();
    this.props.actions.updateSet(this.state.set);
  }
  serverConfig = {
    process: this.handleProcess,
    revert: this.handleRevert,
    load: (uniqueFileId, load, error, progress, abort, headers) => {
      fetch(`http://127.0.0.1:8000/media/testing3/mantis_death_rgF6Dxf.gif`)
        .then((res) => {
          console.log(res);
          return res.blob();
        })
        .then(load);
    },
    onload: (response) => {
      console.log(response);
      return response;
    },
  };
  onSubmit = async (e) => {
    await this.pond
      .getFiles()
      .map((fileItem) => fileItem.file)
      .forEach((file) => {
        this.setState({
          set: {
            ...this.state.set,
            images: [...this.state.set.images, ("image", file, file.name)],
          },
        });
      });

    // this.saveSet(e)
    this.props.onSave(e);
    console.log(this.state.set, "set state");
  };

  render() {
    // const { files, setFiles } = this.state;
    return (
      <div className="container">
        <div className="row">
          <h1 className="text-info pb-4">Edit Set:</h1>
        </div>
        <div className="row">
          <div className="col-6">
            <form id="setForm">
              <div className="form-group">
                <h4>Title:</h4>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  value={this.props.set.title}
                  placeholder="Title of the set"
                  onChange={this.props.onChange}
                />
              </div>
              <div className="form-group">
                <h4>Explanation:</h4>
                <textarea
                  className="form-control"
                  type="text"
                  name="description"
                  onChange={this.props.onChange}
                  value={this.props.set.description}
                  placeholder="Explanation of the set"
                  rows="6"
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-lg btn-warning btn-block"
                  onClick={this.onSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="col-6">
            <div className="form-group" form="setForm">
              <h4>Upload set images:</h4>
              <FilePond
                name="images"
                ref={(ref) => (this.pond = ref)}
                files={this.state.set.images.map((slide, index) => ({
                  source: slide.image,
                  options: {
                    type: "local",
                  },
                }))}
                allowMultiple={true}
                onuploadfiles={(fileitems) => {
                  this.setState({
                    files: fileitems.map((fileitem) => fileitem.file),
                  });
                }}
                onupdatefiles={(fileitems) => {
                  this.setState({
                    files: fileitems.map((fileitem) => fileitem.file),
                  });
                }}
                form="setForm"
                server={{
                  load: (source, load, error, progress, abort, headers) => {
                    var myRequest = new Request(source);
                    fetch(myRequest).then(function (response) {
                      response.blob().then(function (myBlob) {
                        load(myBlob);
                      });
                    });
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// EditRespM.propTypes = {
//     //Might be needed to be set to an array
//     set: PropTypes.object.isRequired,
//     updateSet:PropTypes.func.isRequired,
//     onSave: PropTypes.func.isRequired,
//     onChange: PropTypes.func.isRequired
//   };
export default connect(null, { updateSet, addSet })(EditRespM);
