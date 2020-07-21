import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import _ from "underscore";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import { showSet, getSets } from "../../../../actions/blocks/resp/micro";


export class DetailsRespM extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSlide: 0,
      name: "",
      modalInputName: "",
      modalShow: false,
      x: 0,
      y: 0
    };
    this.pointXY = this.pointXY.bind(this);
  }
  //X and Y
  pointXY(e) {
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  //Modal
  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    this.setState({ name: this.state.modalInputName });
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
    sets: PropTypes.array.isRequired,
    getSets: PropTypes.func.isRequired,
    showSet: PropTypes.func.isRequired,
  };

  createProject() {
    const item = this.state.itemArray;
    const title = "";
    const text = "";
    item.push({ title, text });
    this.setState({ itemArray: item });
  }

  // onClickImg(e) {
  //   console.log("Hello from the dev!");
  // }

  componentDidMount() {
    //So here we got the id of the set and made it a var,
    // then we got all the sets, then filtered through them and kept the set we require
    const id = this.props.match.params.id;
    this.props.getSets();
    this.props.showSet(id);
  }

  render() {
    const { x, y } = this.state;
    return (
      <Fragment>
        <Modal
          show={this.state.modalShow}
          handleClose={(e) => this.modalClose(e)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          // size="sm"
          // dialogClassName="modal-10w"
          
        >
          <Modal.Header closeButton onClick={(e) => this.modalClose(e)}>
            <Modal.Title id="contained-modal-title-vcenter" className="text-info text-center">
              Add Note
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <textarea
                type="text"
                value={this.state.modalInputName}
                name="modalInputName"
                onChange={(e) => this.handleChange(e)}
                className="form-control"
                rows="3"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => this.modalClose(e)} className="btn btn-warning">Save</Button>
            <Button onClick={(e) => this.modalClose(e)} className="btn btn-secondary ml-2">Cancel</Button>

          </Modal.Footer>
        </Modal>
        {this.props.sets.map((set) => (
          <Fragment key={set.id}>
            <div className="row">
              <div className="col">
                <h1 className="text-info text-center my-3">{set.title}</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-1"></div>
              <div className="col-3">
                <Button
                  variant="warning"
                  className="collapsible btn btn-warning"
                  style={{ marginBottom: "3px" }}
                  onClick={console.log(x, y)}
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
                  variant="warning"
                  className="btn btn-warning fa fa-chevron-circle-left"
                  style={{ fontSize: "20px", marginLeft: "15px" }}
                ></Button>
                <Button
                  onClick={this.next}
                  variant="warning"
                  className="btn btn-warning fa fa-chevron-circle-right ml-1"
                  style={{ fontSize: "20px" }}
                ></Button>
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
                    {set.description}
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
                  {set.images.map((slide, index) => (
                    <div
                      key={index}
                      onClick={ (e) => { 
                        this.modalOpen(e) 
                        this.pointXY(e)
                      }}
                      // onClick={this.pointXY}
                      // onMouseMove={console.log(x, y)}
                      style={{ "pointer-events": "all" }} 
                    >
                      <img
                        index={this.state.index}
                        src={slide.image}
                        style={{
                          maxWidth: "1097px",
                          maxHeight: "800px",
                          "pointer-events": "all",
                        }}
                      />
                    </div>
                    
                  ))}
                </Carousel>
              </div>
            </div>
          </Fragment>
        ))}
        <div></div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  // the first one is whatever we're getting so it's okay, the 2nd one is the name of the reducer, the 3rd the state in the reducer
  sets: state.sets.sets,
});

export default connect(mapStateToProps, { getSets, showSet })(DetailsRespM);
