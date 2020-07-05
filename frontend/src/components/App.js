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
import ListRespM from "./blocks/resp/micro/ListRespM";
import DetailsRespM from "./blocks/resp/micro/DetailsRespM";
import FormRespM from "./blocks/resp/micro/FormRespM";



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
                  <Route exact path="/" component={MainPage} />
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/respiratory/microbiology" component={ListRespM} />
                  <Route exact path="/respiratory/microbiology/create" component={FormRespM} />
                  <Route  path="/respiratory/microbiology/:id" component={DetailsRespM} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
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
