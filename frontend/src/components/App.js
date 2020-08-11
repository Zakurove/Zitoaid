import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

//Redux Stuff
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from '../actions/auth';

//Components

//General
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Dashboard from "./leads/Dashboard";
import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";
import MainPage from "./common/MainPage";

//RespiratoryBlock
import Resp from "./blocks/resp/Resp";
//Micro
import ListRespM from "./blocks/resp/micro/ListRespM";
import DetailsRespM from "./blocks/resp/micro/DetailsRespM";
import FormRespM from "./blocks/resp/micro/FormRespM";
//Patho
import ListRespP from "./blocks/resp/patho/ListRespP";
import DetailsRespP from "./blocks/resp/patho/DetailsRespP";
import FormRespP from "./blocks/resp/patho/FormRespP";
//Imaging
import ListRespI from "./blocks/resp/imaging/ListRespM";
import DetailsRespI from "./blocks/resp/imaging/DetailsRespM";
import FormRespI from "./blocks/resp/imaging/FormRespM";
//Histo
import ListRespH from "./blocks/resp/histo/ListRespM";
import DetailsRespH from "./blocks/resp/histo/DetailsRespM";
import FormRespH from "./blocks/resp/histo/FormRespM";
//Cyto
import ListRespC from "./blocks/resp/cyto/ListRespM";
import DetailsRespC from "./blocks/resp/cyto/DetailsRespM";
import FormRespC from "./blocks/resp/cyto/FormRespM";
//Clinical
import ListRespCT from "./blocks/resp/clinical/ListRespM";
import DetailsRespCT from "./blocks/resp/clinical/DetailsRespM";
import FormRespCT from "./blocks/resp/clinical/FormRespM";
//Alert OPTIONS
const alertOptions = {
  timeout: 3000,
  position: 'top center'
}

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={ AlertTemplate }
        {...alertOptions}>
          <Router>
            <Fragment>
            <Alerts />
              <Header />
              <div>
                <Switch>
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/" component={MainPage} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  {/* Resp */}
                  <Route exact path="/respiratory" component={Resp} />
                  {/* Micro */}
                  <Route exact path="/respiratory/microbiology" component={ListRespM} />
                  <Route exact path="/respiratory/microbiology/create" component={FormRespM} />
                  <Route  path="/respiratory/microbiology/:id" component={DetailsRespM} />
                  {/* Patho */}
                  <Route exact path="/respiratory/pathology" component={ListRespP} />
                  <Route exact path="/respiratory/pathology/create" component={FormRespP} />
                  <Route  path="/respiratory/pathology/:id" component={DetailsRespP} />
                  {/* Imaging */}
                  <Route exact path="/respiratory/imaging" component={ListRespI} />
                  <Route exact path="/respiratory/imaging/create" component={FormRespI} />
                  <Route  path="/respiratory/imaging/:id" component={DetailsRespI} />                  
                  {/* Histo */}
                  <Route exact path="/respiratory/histology" component={ListRespH} />
                  <Route exact path="/respiratory/histology/create" component={FormRespH} />
                  <Route  path="/respiratory/histology/:id" component={DetailsRespH} />
                   {/* Cyto */}
                   <Route exact path="/respiratory/cytology" component={ListRespC} />
                  <Route exact path="/respiratory/cytology/create" component={FormRespC} />
                  <Route  path="/respiratory/cytology/:id" component={DetailsRespC} /> 
                   {/* Clinical */}
                   <Route exact path="/respiratory/clinicalTests" component={ListRespCT} />
                  <Route exact path="/respiratory/clinicalTests/create" component={FormRespCT} />
                  <Route  path="/respiratory/clinicalTests/:id" component={DetailsRespCT} />                     
                </Switch>
              </div>
              <Footer />
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
