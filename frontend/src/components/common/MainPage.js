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
        {/* <div className="jumbotron">
          <h1 className="display-4 text-info">Welcome to Tawassam!</h1>
          <p className="text-info">
            This is your distentation for learning and teaching visual materials
            in health care!
          </p>
        </div> */}
{/* style={{fontSize: "56px"}} */}

      {/* Main row for header of this page */}
      <div className="row flex-lg-row-reverse">

        

          {/* For Image */}
          <div className=" col-lg-7 ">
      <img
                src={
                  "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/19876.jpg"
                }
                className="img-fluid float-right"
                alt="Responsive image"
                style={{ width: "150%" }}
              />
              </div>
      
      

        {/* For text content */}
      <div className="col-lg-4  jumbotron bg-light " style={{marginTop: "100px"}}>
          <h1 className="display-4 text-info mb-4 pl-2" >Welcome to <span style={{fontWeight: "bold", color: "#06D6D6"}}>Tawassam</span></h1>
          {/* <p className="text-info" style={{fontSize: "1.5rem"}}>
            This is your distentation for learning and teaching visual materials
            in health care!
          </p> */}
          <ul className="fa-ul">

          
          <li className="mt-4">
          <span class="fa-li"><i class="fas fa-laptop text-secondary" style={{fontSize: "1.7rem", marginTop: "0.8rem"}}></i></span>
          <p className="text-info ml-2" style={{fontSize: "1.3rem", fontWeight: "bold"}}>
          <span style={{color: "#06D6D6"}}>Tawassam</span> is a platform that aims to facilitate learning visual materials for healthcare students.
          </p>
          </li> 

          <li className="mt-4">
          <span class="fa-li"><i class="fas fa-chalkboard-teacher text-secondary" style={{fontSize: "1.7rem", marginTop: "1.1rem"}}></i></span>
          <p className="text-info ml-2" style={{fontSize: "1.3rem", fontWeight: "bold"}}>
          <span style={{color: "#06D6D6"}}>Instructors</span> can create sets by uploading images, explanations, as well as adding notes.        
          </p>
          </li>

          <li className="mt-4"> 
          <span class="fa-li"><i class="fas fa-users text-secondary" style={{fontSize: "1.7rem" , marginTop: "0.6rem"}}></i> </span>
            <p className="text-info ml-2" style={{fontSize: "1.3rem", fontWeight: "bold"}}>
            <span style={{color: "#06D6D6"}}>Students</span> can study all available sets, including our own library.
            </p>
            </li>

            </ul>

            {/* <button className="text-info" style={{fontSize: "1.5rem"}}>
            Go to Blocks
        
            </button> */}

          </div>


          <div className="col-1"></div>
          </div>

        {/* Blocks Row */}
        <hr></hr>
        {/* ml-5 mt-5 mr-5 */}
        <div className="mx-auto" style={{maxWidth: "1500px"}}>
        <div className="container-fluid mt-5" >
          <div className="row align-items-start">

            {/* Cardio */}
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3  text-center mb-5" >
              {/* <div className="mx-auto" style={{width:"300px"}}> */}

              <img
                src={
                  "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/Cardio3.jpg"
                }
                className="img-fluid blocksBorder"
                alt="Responsive image"
                style={{ height: "390px", width: "300px" }}
              />{" "}
              <a
                className="btn btn-rounded1 mt-2 stretched-link text-center d-block mx-auto "
                style={{  maxWidth: "300px" }}
                href="/#/cardiovascular"
              >
                Cardiovascular
              </a>
            </div>
             {/* </div> */}


            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 text-center mb-5" >
              <img
                src={
                  "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/MSK2.jpg"
                }
                className="img-fluid blocksBorder"
                alt="Responsive image"
                style={{ height: "390px", width: "300px" }}
              />{" "}
              <a
              style={{  maxWidth: "300px" }}
                className=" btn btn-rounded1 mt-2 stretched-link text-center d-block mx-auto"
                href="/#/musculoskeletal"
              >
                Musculoskeletal
              </a>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 text-center mb-5" >
              <img
                src={"https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/Resp.jpg"}
                className="img-fluid blocksBorder"
                alt="Responsive image"
                style={{ height: "390px", width: "300px" }}
              />{" "}
              <a
              style={{  maxWidth: "300px" }}
                className=" btn btn-rounded1 mt-2 stretched-link text-center d-block mx-auto"
                href="/#/respiratory"
              >
                Respiratory
              </a>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 text-center mb-5" >
              <img
                src={"https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/Hema.jpg"}
                className="img-fluid blocksBorder"
                alt="Responsive image"
                style={{ height: "390px", width: "300px" }}
              />
              <a
              style={{  maxWidth: "300px" }}
                className=" btn btn-rounded1 mt-2 stretched-link text-center d-block mx-auto"
                href="/#/hemOnc"
              >
                Hematology/Oncology
              </a>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 text-center mb-5" >
              <img
                src={"https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/Neuro.jpg"}
                className="img-fluid blocksBorder"
                alt="Responsive image"
                style={{ height: "390px", width: "300px" }}
              />
              <a
              style={{  maxWidth: "300px" }}
                className=" btn btn-rounded1 mt-2 stretched-link text-center d-block mx-auto"
                href="/#/neurology"
              >
                Neurology
              </a>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 text-center mb-5">
              <img
                src={"https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/Endo2.jpg"}
                className="img-fluid blocksBorder"
                alt="Responsive image"
                style={{ height: "390px", width: "300px" }}
              />
              <a
              style={{  maxWidth: "300px" }}
                className=" btn btn-rounded1 mt-2 stretched-link text-center d-block mx-auto"
                href="/#/endocrine"
              >
                Endocrine
              </a>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 text-center mb-5">
              <img
                src={"https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/Gastro.jpg"}
                className="img-fluid blocksBorder"
                alt="Responsive image"
                style={{ height: "390px", width: "300px" }}
              />
              <a
              style={{  maxWidth: "300px" }}
                className=" btn btn-rounded1 mt-2 stretched-link text-center d-block mx-auto"
                href="/#/gastrointestinal"
              >
                Gastrointestinal
              </a>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 text-center mb-5 ">
              <img
                src={"https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/Genito.jpg"}
                className="img-fluid mr-4 ml-4 blocksBorder"
                alt="Responsive image"
                style={{ height: "390px", width: "300px" }}
                
              />
              <a
              style={{  maxWidth: "300px" }}
                className=" btn btn-rounded1 mt-2 stretched-link text-center d-block mx-auto "
                href="/#/genitourinary"
              >
                Genitourinary
              </a>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
