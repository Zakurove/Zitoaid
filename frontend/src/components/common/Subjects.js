import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import ListSets from "../sets/ListSets.js";

export class Subjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      choseSubject: false,
      subject: null,
      block: this.props.block
    };
    this.backToSubjects = this.backToSubjects.bind(this);
  }
  static propTypes = {
    block: PropTypes.string.isRequired,
    backToBlocks: PropTypes.func.isRequired,
  };

  backToSubjects(event) {
    this.setState({ choseSubject: false });
  }
  render() {
    if (this.state.choseSubject) {
      return (
        <Fragment>
          <ListSets
            block={this.props.block}
            subject={this.state.subject}
            backToSubjects={this.backToSubjects}
          />
        </Fragment>
      );
    }
    return (
      <Fragment>
        <h1 className="text-center"></h1>

        <div className="container">
          <h1 className="text-center text-info">{this.state.block} Block</h1>
          <Button
            className="btn btn-secondary"
            onClick={this.props.backToBlocks}
          >
            Previous Page
          </Button>
          <div className="row align-items-start pt-2">
            <div className="col-sm-6 col-md-6 col-lg-4 text-center pb-2" >
              <img
                src={
                  "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/micro.jpg"
                }
                className=" img-fluid"
                alt="Responsive image"
                style={{ height: "300px", width: "290" }}
              />{" "}
              <a
                className=" btn btn-warning stretched-link text-center d-block" 
                onClick={(e) => {
                  this.setState({
                    subject: "Microbiology",
                    choseSubject: true,
                  });
                }}
              >
                Microbiology
              </a>
            </div>

            <div className="col-sm-6 col-md-6 col-lg-4 text-center pb-2">
              <img
                src={
                  "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/imaging.jpg"
                }
                className=" img-fluid"
                alt="Responsive image"
                style={{ height: "300px", width: "290" }}
              />
              <a
                onClick={(e) => {
                  this.setState({
                    subject: "Imaging",
                    choseSubject: true,
                  });
                }}
                className="btn btn-warning stretched-link text-center  d-block"
              >
                Imaging
              </a>
            </div>

            <div className="col-sm-6 col-md-6 col-lg-4 text-center pb-2">
              <img
                src={
                  "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/patho.jpg"
                }
                className=" img-fluid"
                alt="Responsive image"
                style={{ height: "300px", width: "290" }}
              />{" "}
              <a
                onClick={(e) => {
                  this.setState({
                    subject: "Pathology",
                    choseSubject: true,
                  });
                }}
                className="btn btn-warning stretched-link text-center  d-block"
              >
                Pathology
              </a>
            </div>
          {/* </div> */}
          {/* <div className="row align-items-center mt-2"> */}
            <div className="col-sm-6 col-md-6 col-lg-4 mt-2 text-center">
              <img
                src={
                  "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/histo.jpg"
                }
                className=" img-fluid"
                alt="Responsive image"
                style={{ height: "300px", width: "290" }}
              />
              <a
                onClick={(e) => {
                  this.setState({
                    subject: "Histology",
                    choseSubject: true,
                  });
                }}
                className="btn btn-warning stretched-link text-center  d-block"
              >
                Histology
              </a>
            </div>

            <div className="col-6-sm col-md-6 col-lg-4 mt-2 text-center">
              <img
                src={
                  "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/cyto.jpg"
                }
                className=" img-fluid"
                alt="Responsive image"
                style={{ height: "300px", width: "290" }}
              />{" "}
              <a
                onClick={(e) => {
                  this.setState({
                    subject: "Cytology",
                    choseSubject: true,
                  });
                }}
                className="btn btn-warning stretched-link text-center  d-block"
              >
                Cytology
              </a>
            </div>

            <div className="col-6-sm col-md-6 col-lg-4 mt-2 text-center">
              <img
                src={
                  "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/clinical.jpg"
                }
                className=" img-fluid"
                alt="Responsive image"
                style={{ height: "300px", width: "290" }}
              />
              <a
                onClick={(e) => {
                  this.setState({
                    subject: "Clinical",
                    choseSubject: true,
                  });
                }}
                className="btn btn-warning stretched-link text-center  d-block"
              >
                Clinical
              </a>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Subjects;
