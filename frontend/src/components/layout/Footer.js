import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <footer className="page-footer font-small bg-dark pt-3 mt-5 " id="down">
      <div className="container ">
      <p className="text-warning font-weight-bold text-left">
      In case of trying to reach out or having any suggestions, please contact us on:
      </p>
      <div>
      <ul className="list-unstyled list-inline text-center">
         <li className="list-inline-item">
          <a className="btn-floating btn-li mx-1" href="mailto:codepoiesis@gmail.com">
            <i className="fas fa-envelope text-warning" > </i>
          </a>
         </li>
         <li className="list-inline-item">
          <a className="btn-floating btn-tw mx-1 text-warning" href="https://twitter.com/codepoiesis">
            <i className="fab fa-twitter text-warning"> </i>
          </a>
         </li>
      </ul>
      </div>
      </div>
      <div className="footer-copyright text-center pb-3 text-info">© 2020 Copyright:
      <a href="/" className="text-info"> Codepoiesis</a>
      </div>

      </footer>


    );
  }
}

export default Footer;
