import React, { Component, Fragment } from "react";
import Subjects from "./Subjects.js";

export class MainPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      block: null
    };
  }
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4 text-info">Welcome to Tawassam!</h1>
          <p className="text-info">
            This is your distentation for learning and teaching visual materials
            in health care!
          </p>
        </div>

        <div className="container">
          <div className="row align-items-start">
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3  text-center mb-4" >
              <img
                src={
                  "https://citytoday.news/wp-content/uploads/2017/10/heart_health.jpg"
                }
                className="img-fluid "
                alt="Responsive image"
                style={{ height: "320px", width: "300" }}
              />{" "}
              <a
                className=" btn btn-warning stretched-link text-center d-block"
                href="/#/cardiovascular"
              >
                Cardiovascular
              </a>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 text-center mb-4" >
              <img
                src={
                  "https://cdn.discordapp.com/attachments/375319053184663554/696058752675348520/unknown.png"
                }
                className="img-fluid"
                alt="Responsive image"
                style={{ height: "320px", width: "300" }}
              />{" "}
              <a
                className=" btn btn-warning stretched-link text-center d-block"
                href="/#/musculoskeletal"
              >
                Musculoskeletal
              </a>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 text-center mb-4" >
              <img
                src={"https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/Resp.jpg"}
                className="img-fluid"
                alt="Responsive image"
                style={{ height: "320px", width: "300" }}
              />{" "}
              <a
                className=" btn btn-warning stretched-link text-center d-block"
                href="/#/respiratory"
              >
                Respiratory
              </a>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 text-center mb-4" >
              <img
                src={"https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/Hema.jpg"}
                className="img-fluid "
                alt="Responsive image"
                style={{ height: "320px", width: "300" }}
              />
              <a
                className=" btn btn-warning stretched-link text-center d-block"
                href="/#/hemOnc"
              >
                Hematology/Oncology
              </a>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 text-center mb-4" >
              <img
                src={"https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/Neuro.jpg"}
                className="img-fluid"
                alt="Responsive image"
                style={{ height: "320px", width: "300" }}
              />
              <a
                className=" btn btn-warning stretched-link text-center d-block"
                href="/#/neurology"
              >
                Neurology
              </a>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 text-center mb-4">
              <img
                src={"https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/Endo2.jpg"}
                className="img-fluid "
                alt="Responsive image"
                style={{ height: "320px", width: "300" }}
              />
              <a
                className=" btn btn-warning stretched-link text-center d-block"
                href="/#/endocrine"
              >
                Endocrine
              </a>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 text-center mb-4">
              <img
                src={"https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/Gastro.jpg"}
                className="img-fluid "
                alt="Responsive image"
                style={{ height: "320px", width: "300" }}
              />
              <a
                className=" btn btn-warning stretched-link text-center d-block"
                href="/#/gastrointestinal"
              >
                Gastrointestinal
              </a>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 text-center mb-4 ">
              <img
                src={"https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/Genito.jpg"}
                className="img-fluid mr-4 ml-4"
                alt="Responsive image"
                style={{ height: "320px", width: "300" }}
              />
              <a
                className=" btn btn-warning stretched-link text-center d-block"
                href="/#/genitourinary"
              >
                Genitourinary
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
