import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

//Alert OPTIONS
const alertOptions = {
  timeout: 3000,
  position: 'top center'
}

//Redux Stuff
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from '../actions/auth.js';

//Components
import Header from "./layout/Header.js";
import Footer from "./layout/Footer.js";
import Alerts from "./layout/Alerts.js";
import Login from "./accounts/Login.js";
import Register from "./accounts/Register.js";
import PrivateRoute from "./common/PrivateRoute.js";
import MainPage from "./common/MainPage.js";
import Subjects from "./common/Subjects.js";
import MySets from "./sets/MySets.js";
import ListSets from "./sets/ListSets.js";
import DetailsSet from "./sets/DetailsSet.js";


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
                  <Route exact path="/cardiovascular" render={(props) => <Subjects {...props} block={`Cardiovascular`} />} />
                  <Route exact path="/cardiovascular/microbiology" render={(props) => <ListSets {...props} block={`Cardiovascular`} subject={`Microbiology`}/>} />
                  <Route exact path="/cardiovascular/microbiology/:id" render={(props) => <DetailsSet {...props} block={`Cardiovascular`} subject={`Microbiology`}/>} />
                  <Route exact path="/cardiovascular/imaging" render={(props) => <ListSets {...props} block={`Cardiovascular`} subject={`Imaging`}/>} />
                  <Route exact path="/cardiovascular/imaging/:id" render={(props) => <DetailsSet {...props} block={`Cardiovascular`} subject={`Imaging`}/>} />
                  <Route exact path="/cardiovascular/pathology" render={(props) => <ListSets {...props} block={`Cardiovascular`} subject={`Pathology`}/>} />
                  <Route exact path="/cardiovascular/pathology/:id" render={(props) => <DetailsSet {...props} block={`Cardiovascular`} subject={`Pathology`}/>} />
                  <Route exact path="/cardiovascular/histology" render={(props) => <ListSets {...props} block={`Cardiovascular`} subject={`Histology`}/>} />
                  <Route exact path="/cardiovascular/histology/:id" render={(props) => <DetailsSet {...props} block={`Cardiovascular`} subject={`Histology`}/>} />
                  <Route exact path="/cardiovascular/cytology" render={(props) => <ListSets {...props} block={`Cardiovascular`} subject={`Cytology`}/>} />
                  <Route exact path="/cardiovascular/cytology/:id" render={(props) => <DetailsSet {...props} block={`Cardiovascular`} subject={`Cytology`}/>} />
                  <Route exact path="/cardiovascular/clinical" render={(props) => <ListSets {...props} block={`Cardiovascular`} subject={`Clinical`}/>} />
                  <Route exact path="/cardiovascular/clinical/:id" render={(props) => <DetailsSet {...props} block={`Cardiovascular`} subject={`Clinical`}/>} />

                  <Route exact path="/musculoskeletal" render={(props) => <Subjects {...props} block={`Musculoskeletal`} />} />
                  <Route exact path="/musculoskeletal/microbiology" render={(props) => <ListSets {...props} block={`Musculoskeletal`} subject={`Microbiology`}/>} />
                  <Route exact path="/musculoskeletal/microbiology/:id" render={(props) => <DetailsSet {...props} block={`Musculoskeletal`} subject={`Microbiology`}/>} />
                  <Route exact path="/musculoskeletal/imaging" render={(props) => <ListSets {...props} block={`Musculoskeletal`} subject={`Imaging`}/>} />
                  <Route exact path="/musculoskeletal/imaging/:id" render={(props) => <DetailsSet {...props} block={`Musculoskeletal`} subject={`Imaging`}/>} />
                  <Route exact path="/musculoskeletal/pathology" render={(props) => <ListSets {...props} block={`Musculoskeletal`} subject={`Pathology`}/>} />
                  <Route exact path="/musculoskeletal/pathology/:id" render={(props) => <DetailsSet {...props} block={`Musculoskeletal`} subject={`Pathology`}/>} />
                  <Route exact path="/musculoskeletal/histology" render={(props) => <ListSets {...props} block={`Musculoskeletal`} subject={`Histology`}/>} />
                  <Route exact path="/musculoskeletal/histology/:id" render={(props) => <DetailsSet {...props} block={`Musculoskeletal`} subject={`Histology`}/>} />
                  <Route exact path="/musculoskeletal/cytology" render={(props) => <ListSets {...props} block={`Musculoskeletal`} subject={`Cytology`}/>} />
                  <Route exact path="/musculoskeletal/cytology/:id" render={(props) => <DetailsSet {...props} block={`Musculoskeletal`} subject={`Cytology`}/>} />
                  <Route exact path="/musculoskeletal/clinical" render={(props) => <ListSets {...props} block={`Musculoskeletal`} subject={`Clinical`}/>} />
                  <Route exact path="/musculoskeletal/clinical/:id" render={(props) => <DetailsSet {...props} block={`Musculoskeletal`} subject={`Clinical`}/>} />

                  <Route exact path="/respiratory" render={(props) => <Subjects {...props} block={`Respiratory`} />} />
                  <Route exact path="/respiratory/microbiology" render={(props) => <ListSets {...props} block={`Respiratory`} subject={`Microbiology`}/>} />
                  <Route exact path="/respiratory/microbiology/:id" render={(props) => <DetailsSet {...props} block={`Respiratory`} subject={`Microbiology`}/>} />
                  <Route exact path="/respiratory/imaging" render={(props) => <ListSets {...props} block={`Respiratory`} subject={`Imaging`}/>} />
                  <Route exact path="/respiratory/imaging/:id" render={(props) => <DetailsSet {...props} block={`Respiratory`} subject={`Imaging`}/>} />
                  <Route exact path="/respiratory/pathology" render={(props) => <ListSets {...props} block={`Respiratory`} subject={`Pathology`}/>} />
                  <Route exact path="/respiratory/pathology/:id" render={(props) => <DetailsSet {...props} block={`Respiratory`} subject={`Pathology`}/>} />
                  <Route exact path="/respiratory/histology" render={(props) => <ListSets {...props} block={`Respiratory`} subject={`Histology`}/>} />
                  <Route exact path="/respiratory/histology/:id" render={(props) => <DetailsSet {...props} block={`Respiratory`} subject={`Histology`}/>} />
                  <Route exact path="/respiratory/cytology" render={(props) => <ListSets {...props} block={`Respiratory`} subject={`Cytology`}/>} />
                  <Route exact path="/respiratory/cytology/:id" render={(props) => <DetailsSet {...props} block={`Respiratory`} subject={`Cytology`}/>} />
                  <Route exact path="/respiratory/clinical" render={(props) => <ListSets {...props} block={`Respiratory`} subject={`Clinical`}/>} />
                  <Route exact path="/respiratory/clinical/:id" render={(props) => <DetailsSet {...props} block={`Respiratory`} subject={`Clinical`}/>} />

                  <Route exact path="/hemOnc" render={(props) => <Subjects {...props} block={`Hematology/Oncology`} />} />
                  <Route exact path="/hemOnc/microbiology" render={(props) => <ListSets {...props} block={`Hematology/Oncology`} subject={`Microbiology`}/>} />
                  <Route exact path="/hemOnc/microbiology/:id" render={(props) => <DetailsSet {...props} block={`Hematology/Oncology`} subject={`Microbiology`}/>} />
                  <Route exact path="/hemOnc/imaging" render={(props) => <ListSets {...props} block={`Hematology/Oncology`} subject={`Imaging`}/>} />
                  <Route exact path="/hemOnc/imaging/:id" render={(props) => <DetailsSet {...props} block={`Hematology/Oncology`} subject={`Imaging`}/>} />
                  <Route exact path="/hemOnc/pathology" render={(props) => <ListSets {...props} block={`Hematology/Oncology`} subject={`Pathology`}/>} />
                  <Route exact path="/hemOnc/pathology/:id" render={(props) => <DetailsSet {...props} block={`Hematology/Oncology`} subject={`Pathology`}/>} />
                  <Route exact path="/hemOnc/histology" render={(props) => <ListSets {...props} block={`Hematology/Oncology`} subject={`Histology`}/>} />
                  <Route exact path="/hemOnc/histology/:id" render={(props) => <DetailsSet {...props} block={`Hematology/Oncology`} subject={`Histology`}/>} />
                  <Route exact path="/hemOnc/cytology" render={(props) => <ListSets {...props} block={`Hematology/Oncology`} subject={`Cytology`}/>} />
                  <Route exact path="/hemOnc/cytology/:id" render={(props) => <DetailsSet {...props} block={`Hematology/Oncology`} subject={`Cytology`}/>} />
                  <Route exact path="/hemOnc/clinical" render={(props) => <ListSets {...props} block={`Hematology/Oncology`} subject={`Clinical`}/>} />
                  <Route exact path="/hemOnc/clinical/:id" render={(props) => <DetailsSet {...props} block={`Hematology/Oncology`} subject={`Clinical`}/>} />

                  <Route exact path="/neurology" render={(props) => <Subjects {...props} block={`Neurology`} />} />
                  <Route exact path="/neurology/microbiology" render={(props) => <ListSets {...props} block={`Neurology`} subject={`Microbiology`}/>} />
                  <Route exact path="/neurology/microbiology/:id" render={(props) => <DetailsSet {...props} block={`Neurology`} subject={`Microbiology`}/>} />
                  <Route exact path="/neurology/imaging" render={(props) => <ListSets {...props} block={`Neurology`} subject={`Imaging`}/>} />
                  <Route exact path="/neurology/imaging/:id" render={(props) => <DetailsSet {...props} block={`Neurology`} subject={`Imaging`}/>} />
                  <Route exact path="/neurology/pathology" render={(props) => <ListSets {...props} block={`Neurology`} subject={`Pathology`}/>} />
                  <Route exact path="/neurology/pathology/:id" render={(props) => <DetailsSet {...props} block={`Neurology`} subject={`Pathology`}/>} />
                  <Route exact path="/neurology/histology" render={(props) => <ListSets {...props} block={`Neurology`} subject={`Histology`}/>} />
                  <Route exact path="/neurology/histology/:id" render={(props) => <DetailsSet {...props} block={`Neurology`} subject={`Histology`}/>} />
                  <Route exact path="/neurology/cytology" render={(props) => <ListSets {...props} block={`Neurology`} subject={`Cytology`}/>} />
                  <Route exact path="/neurology/cytology/:id" render={(props) => <DetailsSet {...props} block={`Neurology`} subject={`Cytology`}/>} />
                  <Route exact path="/neurology/clinical" render={(props) => <ListSets {...props} block={`Neurology`} subject={`Clinical`}/>} />
                  <Route exact path="/neurology/clinical/:id" render={(props) => <DetailsSet {...props} block={`Neurology`} subject={`Clinical`}/>} />

                  <Route exact path="/endocrine" render={(props) => <Subjects {...props} block={`Endocrine`} />} />
                  <Route exact path="/endocrine/microbiology" render={(props) => <ListSets {...props} block={`Endocrine`} subject={`Microbiology`}/>} />
                  <Route exact path="/endocrine/microbiology/:id" render={(props) => <DetailsSet {...props} block={`Endocrine`} subject={`Microbiology`}/>} />
                  <Route exact path="/endocrine/imaging" render={(props) => <ListSets {...props} block={`Endocrine`} subject={`Imaging`}/>} />
                  <Route exact path="/endocrine/imaging/:id" render={(props) => <DetailsSet {...props} block={`Endocrine`} subject={`Imaging`}/>} />
                  <Route exact path="/endocrine/pathology" render={(props) => <ListSets {...props} block={`Endocrine`} subject={`Pathology`}/>} />
                  <Route exact path="/endocrine/pathology/:id" render={(props) => <DetailsSet {...props} block={`Endocrine`} subject={`Pathology`}/>} />
                  <Route exact path="/endocrine/histology" render={(props) => <ListSets {...props} block={`Endocrine`} subject={`Histology`}/>} />
                  <Route exact path="/endocrine/histology/:id" render={(props) => <DetailsSet {...props} block={`Endocrine`} subject={`Histology`}/>} />
                  <Route exact path="/endocrine/cytology" render={(props) => <ListSets {...props} block={`Endocrine`} subject={`Cytology`}/>} />
                  <Route exact path="/endocrine/cytology/:id" render={(props) => <DetailsSet {...props} block={`Endocrine`} subject={`Cytology`}/>} />
                  <Route exact path="/endocrine/clinical" render={(props) => <ListSets {...props} block={`Endocrine`} subject={`Clinical`}/>} />
                  <Route exact path="/endocrine/clinical/:id" render={(props) => <DetailsSet {...props} block={`Endocrine`} subject={`Clinical`}/>} />

                  <Route exact path="/gastrointestinal" render={(props) => <Subjects {...props} block={`Gastrointestinal`} />} />
                  <Route exact path="/gastrointestinal/microbiology" render={(props) => <ListSets {...props} block={`Gastrointestinal`} subject={`Microbiology`}/>} />
                  <Route exact path="/gastrointestinal/microbiology/:id" render={(props) => <DetailsSet {...props} block={`Gastrointestinal`} subject={`Microbiology`}/>} />
                  <Route exact path="/gastrointestinal/imaging" render={(props) => <ListSets {...props} block={`Gastrointestinal`} subject={`Imaging`}/>} />
                  <Route exact path="/gastrointestinal/imaging/:id" render={(props) => <DetailsSet {...props} block={`Gastrointestinal`} subject={`Imaging`}/>} />
                  <Route exact path="/gastrointestinal/pathology" render={(props) => <ListSets {...props} block={`Gastrointestinal`} subject={`Pathology`}/>} />
                  <Route exact path="/gastrointestinal/pathology/:id" render={(props) => <DetailsSet {...props} block={`Gastrointestinal`} subject={`Pathology`}/>} />
                  <Route exact path="/gastrointestinal/histology" render={(props) => <ListSets {...props} block={`Gastrointestinal`} subject={`Histology`}/>} />
                  <Route exact path="/gastrointestinal/histology/:id" render={(props) => <DetailsSet {...props} block={`Gastrointestinal`} subject={`Histology`}/>} />
                  <Route exact path="/gastrointestinal/cytology" render={(props) => <ListSets {...props} block={`Gastrointestinal`} subject={`Cytology`}/>} />
                  <Route exact path="/gastrointestinal/cytology/:id" render={(props) => <DetailsSet {...props} block={`Gastrointestinal`} subject={`Cytology`}/>} />
                  <Route exact path="/gastrointestinal/clinical" render={(props) => <ListSets {...props} block={`Gastrointestinal`} subject={`Clinical`}/>} />
                  <Route exact path="/gastrointestinal/clinical/:id" render={(props) => <DetailsSet {...props} block={`Gastrointestinal`} subject={`Clinical`}/>} />

                  <Route exact path="/genitourinary" render={(props) => <Subjects {...props} block={`Genitourinary`} />} />
                  <Route exact path="/genitourinary/microbiology" render={(props) => <ListSets {...props} block={`Genitourinary`} subject={`Microbiology`}/>} />
                  <Route exact path="/genitourinary/microbiology/:id" render={(props) => <DetailsSet {...props} block={`Genitourinary`} subject={`Microbiology`}/>} />
                  <Route exact path="/genitourinary/imaging" render={(props) => <ListSets {...props} block={`Genitourinary`} subject={`Imaging`}/>} />
                  <Route exact path="/genitourinary/imaging/:id" render={(props) => <DetailsSet {...props} block={`Genitourinary`} subject={`Imaging`}/>} />
                  <Route exact path="/genitourinary/pathology" render={(props) => <ListSets {...props} block={`Genitourinary`} subject={`Pathology`}/>} />
                  <Route exact path="/genitourinary/pathology/:id" render={(props) => <DetailsSet {...props} block={`Genitourinary`} subject={`Pathology`}/>} />
                  <Route exact path="/genitourinary/histology" render={(props) => <ListSets {...props} block={`Genitourinary`} subject={`Histology`}/>} />
                  <Route exact path="/genitourinary/histology/:id" render={(props) => <DetailsSet {...props} block={`Genitourinary`} subject={`Histology`}/>} />
                  <Route exact path="/genitourinary/cytology" render={(props) => <ListSets {...props} block={`Genitourinary`} subject={`Cytology`}/>} />
                  <Route exact path="/genitourinary/cytology/:id" render={(props) => <DetailsSet {...props} block={`Genitourinary`} subject={`Cytology`}/>} />
                  <Route exact path="/genitourinary/clinical" render={(props) => <ListSets {...props} block={`Genitourinary`} subject={`Clinical`}/>} />
                  <Route exact path="/genitourinary/clinical/:id" render={(props) => <DetailsSet {...props} block={`Genitourinary`} subject={`Clinical`}/>} />

                  <Route exact path="/sets/details/:id" component={DetailsSet} />
                  <Route exact path="/mysets" component={MySets} />
                  <Route exact path="/mysets/:id" render={(props) => <DetailsSet {...props} block={`.`} subject={`.`}/>} />

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
