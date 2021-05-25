import React, { Component, Fragment } from "react";

export class Loader extends Component {
  render() {
    return (
      <div style={{marginBottom: "6rem"}}>
        
        	  <div className="row">
		<div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 mx-auto">
            <img
              src=
                "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/tawassamLogo.png"
              
              className="img-fluid mt-5"
              alt="Responsive image"
              style={{width: "150%"}}
            />
            </div>
	  </div>
	  <div id="loadingProgressG">
		<div id="loadingProgressG_1" className="loadingProgressG"></div>
	</div>
      </div>
    );
  }
}

export default Loader;
