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
      <div className="pt-5">
      {/* Main row for header of this page */}
      <div className="container">
      <div className="row d-flex justify-content-around flex-lg-row-reverse mb-5" >



          {/* For Image */}
          <div className=" col-lg-5 d-flex justify-content-around ">
              <img src={
                  "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/tawassamLogo.png"
                } style={{width: "100%"}} className=" img-fluid float-right" />
              </div>
      
        
                {/* For text content */}
      <div className="col-lg-5 bg-light ps-5 pt-5 mt-3" >
          <h1 className=" tawassamYellow mb-4 pl-2" >El Psy Kongro!</h1>
          <h4 className="tawassamBlue">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis vulputate nunc, quis sagittis sem gravida non. Vivamus sodales turpis eget orci dignissim aliquam.</h4>

          </div>

      
          </div>
          </div>

          {/* Features Row */}
          
            <div className="row d-flex justify-content-around px-5" style={{backgroundColor: "#e9eef7", paddingTop: "5rem"}}>

            <div className="col px-5 d-grid">
              <div className="tawassamBlueBG text-center mx-auto d-flex justify-content-around mb-2" style={{borderRadius:"100%", height: "4.5rem", width: "4.5rem"}}>
            <i class="fas fa-layer-group text-center text-white my-auto" style={{fontSize: "1.75rem"}}></i>
            </div>
            <h3 className="tawassamYellow text-center">Sets</h3>
            <p className="text-center text-secondary mb-0">A platform that aims to facilitate learning visual materials for healthcare specialists.</p>
            </div>

            <div className="col px-5 d-grid">
            <div className="tawassamBlueBG text-center mx-auto d-flex justify-content-around mb-2" style={{borderRadius:"100%", height: "4.5rem", width: "4.5rem"}}>
            <i class="fas fa-sitemap text-center text-white my-auto" style={{fontSize: "1.75rem"}}></i>
            </div>
            <h3 className="tawassamYellow text-center ">Clusters</h3>
            <p className="text-center text-secondary mb-0">A platform that aims to facilitate learning visual materials for healthcare specialists.</p>
            </div>

            <div className="col px-5 d-grid">
            <div className="tawassamBlueBG text-center mx-auto d-flex justify-content-around mb-2" style={{borderRadius:"100%", height: "4.5rem", width: "4.5rem"}}>
            <i class="fas fa-chalkboard-teacher text-center text-white my-auto" style={{fontSize: "1.75rem"}}></i>
            </div>
            <h3 className="tawassamYellow text-center">Creators</h3>
            <p className="text-center text-secondary mb-0"> Can create sets by adding images, explanations, notes with the ability to associate the sets with clusters.</p>
            </div>

            <div className="col px-5 d-grid">
            <div className="tawassamBlueBG text-center mx-auto d-flex justify-content-around mb-2" style={{borderRadius:"100%", height: "4.5rem", width: "4.5rem"}}>
            <i class="fas fa-users text-center text-white my-auto" style={{fontSize: "1.75rem"}}></i>
            </div>
            <h3 className="tawassamYellow text-center">Learners</h3>
             <p className="text-center text-secondary mb-0">Can view all available visual material in the collborative library of sets and clusters which is structured accodring to top academic standards.</p>
            </div>

          </div>

        {/* Blocks Row */}
        <div className="mx-auto bg-dark" id="cards_landscape_wrap-2">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 50 1440 150">
  <path fill="#e9eef7" fill-opacity="1" d="M0,96L120,106.7C240,117,480,139,720,138.7C960,139,1200,117,1320,106.7L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
</svg>
        <div className="container-fluid mt-5 px-5" style={{paddingBottom: "9rem"}} >
          <div className="row">

          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <a href="/#/cardiovascular">
                        <div class="card-flyer">
                            <div class="text-box">
                                <div class="image-box">
                                    <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/CardioTawassam3.jpg" alt="" />
                                </div>
                                <div class="text-container">                                    
                                    <h6>Cardiovascular</h6> 
                                </div>
                            </div>
                        </div>
                    </a>
                </div>


                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <a href="/#/musculoskeletal">
                        <div class="card-flyer">
                            <div class="text-box">
                                <div class="image-box">
                                    <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/MSKTawassam3.jpg" alt="" />
                                </div>
                                <div class="text-container">                                    
                                    <h6>Musculoskeletal</h6> 
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <a href="/#/respiratory">
                        <div class="card-flyer">
                            <div class="text-box">
                                <div class="image-box">
                                    <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/RespTawassam3.jpg" alt="" />
                                </div>
                                <div class="text-container">                                    
                                    <h6>Respiratory</h6> 
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <a href="/#/hemOnc">
                        <div class="card-flyer">
                            <div class="text-box">
                                <div class="image-box">
                                    <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/HemOncTawassam3.jpg" alt="" />
                                </div>
                                <div class="text-container">                                    
                                    <h6>Hematology/Oncology</h6> 
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
        
        
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <a href="/#/neurology">
                        <div class="card-flyer">
                            <div class="text-box">
                                <div class="image-box">
                                    <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/NeuroTawassam3.jpg" alt="" />
                                </div>
                                <div class="text-container">                                    
                                    <h6>Neurology</h6> 
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <a href="/#/endocrine">
                        <div class="card-flyer">
                            <div class="text-box">
                                <div class="image-box">
                                    <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/EndoTawassam3.jpg" alt="" />
                                </div>
                                <div class="text-container">                                    
                                    <h6>Endocrine</h6> 
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <a href="/#/gastrointestinal">
                        <div class="card-flyer">
                            <div class="text-box">
                                <div class="image-box">
                                    <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/GastroTawassam3.jpg" alt="" />
                                </div>
                                <div class="text-container">                                    
                                    <h6>Gastrointestinal</h6> 
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <a href="/#/genitourinary">
                        <div class="card-flyer">
                            <div class="text-box">
                                <div class="image-box">
                                    <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/GenitoTawassam3.jpg" alt="" />
                                </div>
                                <div class="text-container">                                    
                                    <h6>Genitourinary</h6> 
                                </div>
                            </div>
                        </div>
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
