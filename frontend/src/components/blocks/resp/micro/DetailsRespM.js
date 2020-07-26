import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
      NoteContent: "",
      x: 0,
      y: 0,
      noteMode: false,
      noteButtonText: "Enable Adding Notes",
      isEditing: false,
      tooltipOpen: false,
      popoverOpen: false,
      set: this.props.set,
    };

    this.pointXY = this.pointXY.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateSetState = this.updateSetState.bind(this);
    this.saveSet = this.saveSet.bind(this);
    this.rerenderParent = this.rerenderParent.bind(this);
  }
  //Functions for updating then saving the state of the selected set, only owner would be able to
  updateSetState(event) {
    const field = event.target.name;
    const set = this.state.set;
    console.log("moshi mosh!")
    set[field] = event.target.value;
    return this.setState({ set: set });
  }
  saveSet(event) {
    event.preventDefault();
    this.props.actions.updateSet(this.state.set);
    this.forceUpdate()
    this.setState({ isEditing: false });
  }
  rerenderParent() {
    this.forceUpdate();
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
    const note = new FormData();
    note.append("NoteContent", this.state.NoteContent);
    note.append("x", this.state.x);
    note.append("y", this.state.y);

    this.setState({
      NoteContent: "",
      x: "",
      y: "",
    });
    console.log("Adding a note...", this.state.NoteContent);
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
    // getSets: PropTypes.func.isRequired,
    // updateSet: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
    //   // actions: PropTypes.object.isRequired
  };
  //I have no idea what this is, but won't remove it till later.
  createProject() {
    const item = this.state.itemArray;
    const title = "";
    const text = "";
    item.push({ title, text });
    this.setState({ itemArray: item });
  }

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
    //So here we got the id of the set and made it a var,
    // then we got all the sets, then filtered through them and kept the set we require
    // const id = this.props.match.params.id;
    // const setId = this.props.match.params.id;
    this.setState({
      tooltipOpen: true,
    });
    this.props.actions.getSets();

    // this.props.sets.filter(set => set.id == setId).map((set) => {
    //   this.setState({setTest: set});
    // })

    // this.props.showSet(id);
  }
  componentWillReceiveProps(nextProps) {
    // this.props.getSets();
    if ( this.props.set.id != nextProps.set.id) {
      this.setState({set: nextProps.set});
    }
  }
  //Finally the Render!!!
  render() {
    const setId = this.props.match.params.id;
    const { x, y } = this.state;
    if (this.state.isEditing) {
      return (
        <div>
          <h1>Edit Set </h1>

          <EditRespM
            rerenderParent={this.rerenderParent}
            set={this.state.set}
            onChange={this.updateSetState}
            onSave={this.saveSet}
            
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
                  value={this.state.NoteContent}
                  name="NoteContent"
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

        {/* {this.props.sets.filter(set => set.id == setId).map((set) => (   */}
        <Fragment key={this.props.set.id}>
          {console.log(this.props.set.title, "la title")}
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
                    key={index}
                    onClick={(e) => {
                      this.handleOverlay(e);
                      // this.modalOpen(e);
                      // this.pointXY(e);
                      // console.log(x, y);
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
  console.log("The function started");
  var set = sets.find((set) => set.id == id);
  console.log(set, "de set hermano");
  return Object.assign({ set }, set);
}

function mapStateToProps(state, ownProps) {
  let sets = state.sets.sets;
  let set = { title: "", description: "", id: "", images: [] };
  let setId = ownProps.match.params.id;
  if (setId && sets.length > 0) {
    set = getSetById(sets, setId);
    console.log(set, "assignment");
  }
  return { set: set };
}

// const mapStateToProps = (state) => ({
//   // the first one is whatever we're getting so it's okay, the 2nd one is the name of the reducer, the 3rd the state in the reducer
//   sets: state.sets.sets,
// });

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators( setActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailsRespM);
