
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Carousel } from "react-responsive-carousel";
import { Button, Modal } from "react-bootstrap";
export class DeleteMSKM extends Component {
  state = {
    set: this.props.set,
    title: this.props.set.title,
    description: this.props.set.description,
    setImages: this.props.set.images,
    slideImages: "this is slideImages, Hello!",
    currentSlide: 0,
    selectedImageId: null,
    modalShow: false,
  };
  static propTypes = {
    set: PropTypes.object.isRequired,
    removeImage: PropTypes.func.isRequired,
    doneImage: PropTypes.func.isRequired,
  };
  onImageRemoveSubmit = async (e) => {
    e.preventDefault();
    const set = new FormData();
    set.append("title", this.props.set.title);
    set.append("description", this.props.set.description);
    set.append("editingState", "removingImage");
    set.append("removedImageId", this.state.selectedImageId);
    console.log(this.state.selectedImageId);
    this.props.removeImage(set, this.state.set.id);
    // this.setState({

    // });
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  updateCurrentSlide = (index) => {
    const { currentSlide } = this.state;

    if (currentSlide !== index) {
      this.setState({
        currentSlide: index,
      });
    }
  };
  modalOpen() {
    this.setState({ modalShow: true });
  }
  modalClose() {
    this.setState({
      modalInputName: "",
      modalShow: false,
    });
  }
  handleOverlay(e) {
    this.modalOpen();
  }
  componentWillReceiveProps(nextProps) {
    // this.props.getSets();
    if (this.props.set.id != nextProps.set.id) {
      this.setState({ set: nextProps.set });
    }
  }
  render() {
    const { title, description } = this.state;
    return (
      <div className="container">
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
              Are you sure you want to remove this image from the set?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer style={{ justifyContent: "center" }}>
            <Button
              variant="danger"
              onClick={(e) => {
                this.modalClose(e);
                this.onImageRemoveSubmit(e);
              }}
              style={{ justifyContent: "center" }}
              form="noteForm"
            >
              <i class="far fa-trash-alt"></i>
              <span> </span>
              Remove
            </Button>
            <Button
              onClick={(e) => this.modalClose(e)}
              className="btn btn-secondary ml-2 "
              style={{ justifyContent: "center" }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="row">
          <div className="col"><h1 className="text-info pb-4 text-center">Remove Images</h1></div>
          
        </div>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8 " style={{display: "inlineBlock"}}>
          <Button variant="secondary mb-1" onClick={this.props.doneImage}>Previous Page</Button>
            <span className="text-secondary text-center ml-5" style={{fontSize: '20px'}}>
              (Click on the wanted image to remove it)
            </span>
            
          </div>
          <div className="col-2"></div>
        </div>
        <div className="row">
          <div className="col-2"></div>
          <div className="slide-container col-8">
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
                  onClick={(e) => {
                    this.setState({
                      selectedImageId: slide.id,
                    });
                    this.handleOverlay(e);
                  }}
                  style={{ pointerEvents: "all" }}
                >
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
          <div className="col-2"></div>
        </div>

        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <Button
              variant="success"
              size="lg"
              onClick={this.props.doneImage}
              block
            >
              <i class="far fa-check-circle"></i>
              <span> </span>
              Done
            </Button>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    );
  }
}
// function getSetById(sets, id) {
//     var set = sets.find((set) => set.id == id);
//     return Object.assign({ set }, set);
//   }

//   function mapStateToProps(state, ownProps) {
//     let sets = state.sets.sets;
//     let set = { title: "", description: "", id: "", images: [] };
//     let setId = ownProps.match.params.id;
//     if (setId && sets.length > 0) {
//       set = getSetById(sets, setId);
//     }
//     return { set: set };
//   }

//   function mapDispatchToProps(dispatch) {
//     return {
//       actions: bindActionCreators(setActions, dispatch),
//     };
//   }

// export default connect(mapStateToProps, mapDispatchToProps)(DeleteRespM);
export default connect(null)(DeleteMSKM);