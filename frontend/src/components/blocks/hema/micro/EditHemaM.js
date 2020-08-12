import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSet, updateSet } from "../../../../actions/blocks/hema/micro";


//FilePond
import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
// Register filepond plugins, FilePondPluginFileEncode
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export class EditHemaM extends Component {
  state = {
    set: this.props.set,
    title: this.props.set.title,
    description: this.props.set.description,
    setImages: this.props.set.images,
    slideImages: "this is slideImages, Hello!",
  };
  static propTypes = {
    set: PropTypes.object.isRequired,
    addSet: PropTypes.func.isRequired,
    updateSet: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = async (e) => {
    e.preventDefault();
    const set = new FormData();
    set.append("title", this.state.title);
    set.append("description", this.state.description);
    console.log(this.pond, "Up up here, see it works!");
    await this.pond
      .getFiles()
      .map((fileItem) => fileItem.file)
      .forEach((file) => {
       set.append("image", file, file.name);
      });
    this.props.updateSet(set, this.state.set.id);
    this.props.onSave(e)
    this.setState({
      title: "",
      description: "",
    });
  };
  componentWillReceiveProps(nextProps) {
    // this.props.getSets();
    if (this.props.set.id != nextProps.set.id) {
      this.setState({ set: nextProps.set });
    }
  }
  render() {
    const { title, description, files, setFiles } = this.state;
    return (
      <div className="container">
        <div className="row">
        <div className="col"><h1 className="text-info pb-4 text-center">Edit Set</h1></div>
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
              <button
                  type="submit"
                  className="btn btn-lg btn-warning btn-block"
                >
                  Submit
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
          <div className="col-6">
            <div className="form-group" form="setForm">
              <h4>Add more images:</h4>
              <FilePond
                name="image"
                ref={(ref) => (this.pond = ref)}
                files={this.state.files}
                // files={this.state.setImages.map((slide, index) => ({
                //   source: slide.image,
                //   options: {
                //     type: "local",
                //   },
                // }))}
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
                // server={{
                //   process: null,
                //   load: (source, load, error, progress, abort, headers) => {
                //     var myRequest = new Request(source);
                //     fetch(myRequest).then(function (response) {
                //       response.blob().then(function (myBlob) {
                //         load(myBlob);
                //       });
                //     });
                //   },
                // }}
                form="setForm"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addSet, updateSet })(EditHemaM);
