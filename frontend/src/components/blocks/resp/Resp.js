import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Resp extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="text-center"></h1>

        <div className="container">
          <h1 className="text-left pb-2 text-info">Choose Subject:</h1>
          <Link className="btn btn-secondary" to="/">
            Previous Page
          </Link>
          <div className="row align-items-start pt-2">
            <div className="col text-center pb-2">
              <img
                src={ "/static/media/micro.jpg" }
                className="pb-2 img-fluid"
                alt="Responsive image"
                style={{ height: "300px", width: "290" }}
              />{" "}
              <Link
                to="/respiratory/microbiology"
                className=" btn btn-warning stretched-link text-center"
              >
                Microbiology
              </Link>
            </div>

            <div className="col text-center pb-2">
              <img
                src={ "/static/media/imaging.jpg" }
                className="pb-2 img-fluid"
                alt="Responsive image"
                style={{ height: "300px", width: "290" }}
              />
              <Link
                to="/respiratory/imaging"
                className="btn btn-warning stretched-link text-center"
              >
                Imaging
              </Link>
            </div>

            <div className="col text-center pb-2">
              <img
                src={ "/static/media/patho.jpg" }
                className="pb-2 img-fluid"
                alt="Responsive image"
                style={{ height: "300px", width: "290" }}
              />{" "}
              <Link
                to="/respiratory/pathology"
                className="btn btn-warning stretched-link text-center"
              >
                Pathology
              </Link>
            </div>
          </div>
          <div className="row align-items-center mt-2">
            <div className="col text-center">
              <img
                src={ "/static/media/histo.jpg" }
                className="pb-2 img-fluid"
                alt="Responsive image"
                style={{ height: "300px", width: "290" }}
              />
              <Link
                to="/respiratory/histology"
                className="btn btn-warning stretched-link text-center"
              >
                Histology
              </Link>
            </div>

            <div className="col text-center">
              <img
                src={ "/static/media/cyto.jpg" }
                className="pb-2 img-fluid"
                alt="Responsive image"
                style={{ height: "300px", width: "290" }}
              />{" "}
              <Link
                to="/respiratory/cytology"
                className="btn btn-warning stretched-link text-center"
              >
                Cytology
              </Link>
            </div>

            <div className="col text-center">
              <img
                src={ "/static/media/clinical.jpg" }
                className="pb-2 img-fluid"
                alt="Responsive image"
                style={{ height: "300px", width: "290" }}
              />
              <Link
                to="/respiratory/clinicalTests"
                className="btn btn-warning stretched-link text-center"
              >
                Clinical Tests
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Resp;
