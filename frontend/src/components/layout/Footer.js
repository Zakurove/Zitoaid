import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <footer className="footer py-3" style={{backgroundColor: "rgb(233, 238, 247)"}}>
        {/* <div className="container">
          <div className="row">
            <div className="d-block mx-auto pt-1">
              <div className="mb-3 flex-center">
                <a
                  className="tw-ic text-light pl-4 ms-2"
                  href="https://twitter.com/codepoiesis"
                >
                  <i className="fab fa-twitter  me-md-5 me-3 fa-2x">
                    {" "}
                  </i>
                </a>

                <a
                  className="tw-ic text-light"
                  href="mailto:codepoiesis@gmail.com"
                >
                  <i className="far fa-envelope me-md-5 me-3 fa-2x">
                    {" "}
                  </i>
                </a>
              </div>
            </div>
          </div> */}
      
          <div className="footer-copyright text-center py-3 tawassamBlue text-decoration-none" style={{fontWeight: "bold"}}>
          © 2021 Copyright:
          <a href="https://twitter.com/codepoiesis" className="text-decoration-none tawassamYellow" style={{fontWeight: "bold"}}>
            {" "}
            Codepoiesis
          </a>
        </div>
        {/* </div> */}


      </footer>
      // <footer className="footer bg-dark text-center text-white">
      // <div className="container p-4 pb-0">
      //   <div className="mb-4">
      //     <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-twitter"></i></a>

      //     <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-google"></i></a>
      //   </div>
      // </div>

      // <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
      //   © 2020 Copyright:
      //   <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
      // </div>
 
      // </footer>
    );
  }
}

export default Footer;

