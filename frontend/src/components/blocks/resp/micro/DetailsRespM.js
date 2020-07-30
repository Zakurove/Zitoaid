import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
import _ from "underscore";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { EditRespM } from "./EditRespM";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import * as setActions from "../../../../actions/blocks/resp/micro";

export class DetailsRespM extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSlide: 0,
      modalShow: false,
      noteContent: "",
      x: 0,
      y: 0,
      noteMode: false,
      noteButtonText: "Enable Adding Notes",
      isEditing: false,
      tooltipOpen: false,
      popoverOpen: false,
      set: this.props.set,
      testing: ["hello", "One"]
    };

    this.pointXY = this.pointXY.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateSetState = this.updateSetState.bind(this);
    this.saveSet = this.saveSet.bind(this);
    this.deleteSet = this.deleteSet.bind(this);
  }
  //Functions for updating then saving the state of the selected set, only owner would be able to
  updateSetState(event) {
    const field = event.target.name;
    const set = this.state.set;
    set[field] = event.target.value;
    // set.images = event.target.setImages
    return this.setState({ set: set });
  }
  saveSet(event) {
    // event.preventDefault();
    // this.props.actions.updateSet(this.state.set);
    this.setState({ isEditing: false });
    this.forceUpdate()
  }
//To delete set
 deleteSet(event) {
    this.props.actions.deleteSet(this.state.set.id)
    this.props.history.push("/respiratory/microbiology");
  }
  //For getting the point where the user wanted to add the note
  pointXY(e) {
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }
  //For knowing if the user is editing or not and acting accordingly
  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }
  //For knowing if the user is editing or not and acting accordingly
  togglePopover() {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  }
  // deleteButton(event) {
  //   this.props.actions.deleteSet.bind(this, this.state.set.id);
  //   this.setState({ redirectDelete: true });
  // }
  //Functions related to the modal for adding notes
  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    this.modalClose();
  }

  modalOpen() {
    this.setState({ modalShow: true });
  }
  modalClose() {
    this.setState({
      modalInputName: "",
      modalShow: false,
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    // const set = new FormData();
    // set.append("title", this.state.title);
    // set.append("description", this.state.description);
    const note = new FormData();
    note.append("noteContent", this.state.noteContent);
    note.append("x", this.state.x);
    note.append("y", this.state.y);
    note.append("respMicroImage_id", this.selectedImageId)
    // set.append('note', note)
    // set.images.map(slide, index) => (
    // if slide.id == selectedImageId {
    //   this.slide.n
    // }
    // ))
    // this.props.actions.addNote(set, this.state.set.id)
    this.setState({
      noteContent: "",
      x: "",
      y: "",

    });
    console.log("Adding a note...", this.state.noteContent);
  };

  //Slider functions
  next = () => {
    this.setState((state) => ({
      currentSlide: state.currentSlide + 1,
    }));
  };
  prev = () => {
    this.setState((state) => ({
      currentSlide: state.currentSlide - 1,
    }));
  };
  updateCurrentSlide = (index) => {
    const { currentSlide } = this.state;

    if (currentSlide !== index) {
      this.setState({
        currentSlide: index,
      });
    }
  };

  static propTypes = {
    set: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };


  //For handeling the text on the 'Adding notes' button.
  changeNoteButtonText() {
    if (this.state.noteMode == true) {
      this.setState({
        noteButtonText: "Enable Adding Notes",
      });
    } else {
      this.setState({
        noteButtonText: "Disable Adding Notes",
      });
    }
  }
  //For handeling clicking on the div for adding notes
  handleToggleNoteMode() {
    this.setState((currentState) => ({
      noteMode: !currentState.noteMode,
    }));
  }
  handleOverlay(e) {
    if (this.state.noteMode == true) {
      this.modalOpen();
      this.pointXY(e);
    }
  }

  //The lifecycle
  componentDidMount() {
    this.setState({
      tooltipOpen: true,
    });
    this.props.actions.getSets();
  }
  componentWillReceiveProps(nextProps) {
    // this.props.getSets();
    if ( this.props.set.id != nextProps.set.id) {
      this.setState({set: nextProps.set});
    }
  }
  //Add notes
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  //Finally the Render!!!
  render() {
    const setId = this.props.match.params.id;
    const { x, y } = this.state;
    if (this.state.redirectDelete == true) {
      return <Redirect to={'/respiratory/microbiology'} />
    }
    if (this.state.isEditing) {
      return (
        <div>
          <h1>Edit Set </h1>

          <EditRespM
            rerenderParent={this.rerenderParent}
            set={this.state.set}
            updateSet={this.props.actions.updateSet}
            onChange={this.updateSetState}
            onSave={this.saveSet}
            addSet={this.props.actions.addSet}
          />
        </div>
      );
    }
    return (
      <Fragment>
        <Modal
          show={this.state.modalShow}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton onClick={(e) => this.modalClose(e)}>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="text-info text-center"
            >
              Add Note
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="noteForm" onSubmit={this.onSubmit}>
              <div className="form-group">
                <textarea
                  type="text"
                  value={this.state.noteContent}
                  name="noteContent"
                  onChange={(e) => this.handleChange(e)}
                  className="form-control"
                  rows="3"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              onClick={(e) => this.modalClose(e)}
              className="btn btn-warning"
              form="noteForm"
            >
              Save
            </Button>
            <Button
              onClick={(e) => this.modalClose(e)}
              className="btn btn-secondary ml-2"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>


        <Fragment key={this.props.set.id}>
          <div className="row">
            <div className="col">
              <h1 className="text-info text-center my-3">
                {this.props.set.title}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-3">
              <Button
                className="collapsible btn btn-warning"
                style={{ marginBottom: "3px" }}
                onClick={this.toggleEdit}
              >
                Edit Set
              </Button>
              <Button
                className="collapsible btn btn-danger"
                style={{ marginBottom: "3px" }}
                onClick={this.deleteSet} 
              >
                Delete Set
              </Button>
              <div
                className="collapsible form-group"
                style={{ display: "none" }}
              >
                <a href="#" className="btn btn-info my-2">
                  Update Current Image
                </a>
                <a href="#" className="btn btn-info my-2">
                  Update Title/Description
                </a>
                <a href="#" className="btn btn-info">
                  Add new image
                </a>
              </div>
            </div>
            <div className="col-7" style={{ padding: "1px" }}>
              <Button
                onClick={this.prev}
                className="btn btn-warning fa fa-chevron-circle-left"
                style={{ fontSize: "20px", marginLeft: "15px" }}
              ></Button>
              <Button
                onClick={this.next}
                className="btn btn-warning fa fa-chevron-circle-right ml-1"
                style={{ fontSize: "20px" }}
              ></Button>
              <Button
                onClick={(e) => {
                  this.handleToggleNoteMode(e);
                  this.changeNoteButtonText(e);
                }}
                className="btn btn-info float-right"
                style={{
                  marginRight: "15px",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                }}
              >
                {this.state.noteButtonText}
              </Button>
            </div>
          </div>
          <div className="row " style={{ height: "770px" }}>
            <div className="col-1"></div>
            <div className="col-3" style={{ height: "300px" }}>
              <div
                className=" p-3 pt-4 bg-dark border border-info border-4 rounded"
                style={{ height: "160%" }}
              >
                <p className="font-weight-bolder text-info text-justify ">
                  {this.props.set.description}
                </p>
              </div>
            </div>
            <div className="slide-container col-7">
              <Carousel
                selectedItem={this.state.currentSlide}
                onChange={this.updateCurrentSlide}
                useKeyboardArrows={true}
                swipeable={true}
                emulateTouch={true}
                swipeScrollTolerance={0}
                infiniteLoop={true}
                autoPlay={false}
                showThumbs={false}
                dynamicHeight={true}
              >
                {this.props.set.images.map((slide, index) => (
                  <div
                    key={slide.id}
                    onClick={ (e) => {
                     this.setState({
                        selectedImageId: slide.id
                      })
                      this.handleOverlay(e);
                    //   this.setState

                    //   // this.modalOpen(e);
                    //   // this.pointXY(e);
                    //   // console.log(x, y);
                    }}
                    // onClick={this.handleOverlay}
                    style={{ pointerEvents: "all" }}
                  >
                    <div
                      style={{
                        zIndex: "3",
                        fontSize: "20px",
                        color: "white",
                        pointerEvents: "all",
                        position: "absolute",
                        left: x + "px",
                        top: y + "px",
                      }}
                      className="fas fa-info-circle"
                      id="PopoverLegacy"
                    >
                      <UncontrolledPopover
                        trigger="legacy"
                        placement="bottom"
                        target="PopoverLegacy"
                      >
                        <PopoverHeader>Legacy Trigger</PopoverHeader>
                        <PopoverBody>
                          Not sure if this will work but we'll see.
                        </PopoverBody>
                      </UncontrolledPopover>
                    </div>

                    <img
                      index={this.state.index}
                      src={slide.image}
                      style={{
                        maxWidth: "1097px",
                        maxHeight: "800px",
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </Fragment>
        {/* ))}  */}
        <div></div>
      </Fragment>
    );
  }
}

function getSetById(sets, id) {
  var set = sets.find((set) => set.id == id);
  return Object.assign({ set }, set);
}

function mapStateToProps(state, ownProps) {
  let sets = state.sets.sets;
  let set = { title: "", description: "", id: "", images: [] };
  let setId = ownProps.match.params.id;
  if (setId && sets.length > 0) {
    set = getSetById(sets, setId);
  }
  return { set: set };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators( setActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailsRespM);
