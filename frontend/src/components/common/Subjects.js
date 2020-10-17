import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

export class Subjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: null,
      block: null,
      isUpdating: true
    };
  }
  static propTypes = {
    block: PropTypes.string.isRequired,
  };

  rendering() {
    if (this.state.isUpdating == true) {
      if (this.props.block == 'Hematology/Oncology') {
        this.setState({
          block: 'hemOnc',
        });
      }
      if (this.props.block !== 'Hematology/Oncology') {
        const blockLink = this.props.block.toLowerCase()
        this.setState({
          block: blockLink,
        });
      }
      this.setState({
        isUpdating: false,
      });
    }
  }


  render() {
    {
      this.rendering();
    }
    return (
      <Fragment>
        <h1 className="text-center"></h1>

        <div className="container">
          <h1 className="text-center text-info" >{this.props.block} Block</h1>
          {/* <hr/> */}
          <Button
            className="btn btn-secondary"
            href="/#"
          >
            Previous Page
          </Button>

          <div className="row align-items-start pt-2">
            <div className="col-sm-6 col-md-6 col-lg-4 text-center pb-2" >
              <img
                src={
                  "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/micro.jpg"
                }
                className=" img-fluid blocksBorder"
                alt="Responsive image"
                style={{ height: "300px", width: "290" }}
              />{" "}
              <a
                className=" btn btn-rounded1 mt-2 stretched-link text-center d-block" 
                href= {`#/${this.state.block}/microbiology`}
              >
                Microbiology
              </a>
            </div>

            <div className="col-sm-6 col-md-6 col-lg-4 text-center pb-2">
              <img
                src={
                  "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/imaging.jpg"
                }
                className=" img-fluid blocksBorder"
                alt="Responsive image"
                style={{ height: "300px", width: "290" }}
              />
              <a
                href= {`#/${this.state.block}/imaging`}
                className="btn btn-rounded1 mt-2 stretched-link text-center  d-block"
              >
                Imaging
              </a>
            </div>

            <div className="col-sm-6 col-md-6 col-lg-4 text-center pb-2">
              <img
                src={
                  "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/patho.jpg"
                }
                className=" img-fluid blocksBorder"
                alt="Responsive image"
                style={{ height: "300px", width: "290" }}
              />{" "}
              <a
                href= {`#/${this.state.block}/pathology`}
                className="btn btn-rounded1 mt-2 stretched-link text-center  d-block"
              >
                Pathology
              </a>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-4 mt-2 text-center">
              <img
                src={
                  "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/histo.jpg"
                }
                className=" img-fluid blocksBorder"
                alt="Responsive image"
                style={{ height: "300px", width: "290" }}
              />
              <a
                href= {`#/${this.state.block}/histology`}
                className="btn btn-rounded1 mt-2 stretched-link text-center  d-block"
              >
                Histology
              </a>
            </div>

            <div className="col-6-sm col-md-6 col-lg-4 mt-2 text-center">
              <img
                src={
                  "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/cyto.jpg"
                }
                className=" img-fluid blocksBorder"
                alt="Responsive image"
                style={{ height: "300px", width: "290" }}
              />{" "}
              <a
                href= {`#/${this.state.block}/cytology`}
                className="btn btn-rounded1 mt-2 stretched-link text-center  d-block"
              >
                Cytology
              </a>
            </div>

            <div className="col-6-sm col-md-6 col-lg-4 mt-2 text-center">
              <img
                src={
                  "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/clinical.jpg"
                }
                className=" img-fluid blocksBorder"
                alt="Responsive image"
                style={{ height: "300px", width: "290" }}
              />
              <a
                href= {`#/${this.state.block}/clinical`}
                className="btn btn-rounded1 mt-2 stretched-link text-center  d-block"
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
