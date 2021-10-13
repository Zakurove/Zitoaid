import React, { Component, Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect, Routes, useLocation } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { useAnalytics } from 'use-analytics'
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import usePageTracking from "./layout/usePageTracking";
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
import List from "./common/List.js";

import PracticeList from "./practice/PracticeList.js";
import  PracticeDescriptionForm  from "./practice/PracticeDescriptionForm";
import DetailsPracticeDescription  from "./practice/DetailsPracticeDescription";
import ResultsPracticeDescription  from "./practice/ResultsPracticeDescription";
import MyPractice from "./practice/MyPractice.js";

import MySets from "./sets/MySets.js";
import DetailsSet from "./sets/DetailsSet.js";
import ListSets from "./sets/ListSets.js";

import MyClusters from "./clusters/MyClusters.js";
import DetailsCluster from "./clusters/DetailsCluster.js";
import ListClusters from "./clusters/ListClusters.js";



export default function App() {

   let location = useLocation()
   const analytics = useAnalytics()
  useEffect(() => {
    analytics.page()
  }, [location])

    return (
            <div>
            {/* <Alerts /> */}
            <Route path="/" render={(props) => (props.location.pathname !=="/login" && props.location.pathname !=="/register" ) && 
              <Header />}> 
              </Route>   
              <div className="content bg-light p-0">
                <Switch>
                  <Route  path="/register" component={Register} />
                  <Route  path="/login" component={Login} />
                  <Route exact path="/" component={MainPage} />

                  <Route exact path="/cardiovascular" render={(props) => <Subjects {...props} block={`Cardiovascular`} />} />
                  <Route exact path="/cardiovascular/practice" render={(props) => <PracticeList {...props} block={`Cardiovascular`} />} />
                  <Route exact path="/cardiovascular/practice/description" render={(props) => <PracticeDescriptionForm {...props} block={`Cardiovascular`} />} />
                  <Route exact path="/cardiovascular/practice/description/:id" render={(props) => <DetailsPracticeDescription {...props} block={`Cardiovascular`}/>} />
                  <Route exact path="/cardiovascular/practice/description/results/:id" render={(props) => <ResultsPracticeDescription {...props} block={`Cardiovascular`}/>} />
                  <Route exact path="/cardiovascular/microbiology" render={(props) => <List {...props} block={`Cardiovascular`} subject={`Microbiology`}/>} />
                  <Route exact path="/cardiovascular/microbiology/sets" render={(props) => <ListSets {...props} block={`Cardiovascular`} subject={`Microbiology`}/>} />
                  <Route exact path="/cardiovascular/microbiology/sets/:id" render={(props) => <DetailsSet {...props} block={`Cardiovascular`} subject={`Microbiology`}/>} />
                  <Route exact path="/cardiovascular/microbiology/clusters" render={(props) => <ListClusters {...props} block={`Cardiovascular`} subject={`Microbiology`}/>} />
                  <Route exact path="/cardiovascular/microbiology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Cardiovascular`} subject={`Microbiology`}/>} />
                  <Route exact path="/cardiovascular/imaging" render={(props) => <List {...props} block={`Cardiovascular`} subject={`Imaging`}/>} />
                  <Route exact path="/cardiovascular/imaging/sets" render={(props) => <ListSets {...props} block={`Cardiovascular`} subject={`Imaging`}/>} />
                  <Route exact path="/cardiovascular/imaging/sets/:id" render={(props) => <DetailsSet {...props} block={`Cardiovascular`} subject={`Imaging`}/>} />
                  <Route exact path="/cardiovascular/imaging/clusters" render={(props) => <ListClusters {...props} block={`Cardiovascular`} subject={`Imaging`}/>} />
                  <Route exact path="/cardiovascular/imaging/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Cardiovascular`} subject={`Imaging`}/>} />
                  <Route exact path="/cardiovascular/pathology" render={(props) => <List {...props} block={`Cardiovascular`} subject={`Pathology`}/>} />
                  <Route exact path="/cardiovascular/pathology/sets" render={(props) => <ListSets {...props} block={`Cardiovascular`} subject={`Pathology`}/>} />
                  <Route exact path="/cardiovascular/pathology/sets/:id" render={(props) => <DetailsSet {...props} block={`Cardiovascular`} subject={`Pathology`}/>} />
                  <Route exact path="/cardiovascular/pathology/clusters" render={(props) => <ListClusters {...props} block={`Cardiovascular`} subject={`Pathology`}/>} />
                  <Route exact path="/cardiovascular/pathology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Cardiovascular`} subject={`Pathology`}/>} />
                  <Route exact path="/cardiovascular/histology" render={(props) => <List {...props} block={`Cardiovascular`} subject={`Histology`}/>} />
                  <Route exact path="/cardiovascular/histology/sets" render={(props) => <ListSets {...props} block={`Cardiovascular`} subject={`Histology`}/>} />
                  <Route exact path="/cardiovascular/histology/sets/:id" render={(props) => <DetailsSet {...props} block={`Cardiovascular`} subject={`Histology`}/>} />
                  <Route exact path="/cardiovascular/histology/clusters" render={(props) => <ListClusters {...props} block={`Cardiovascular`} subject={`Histology`}/>} />
                  <Route exact path="/cardiovascular/histology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Cardiovascular`} subject={`Histology`}/>} />
                  <Route exact path="/cardiovascular/cytology" render={(props) => <List {...props} block={`Cardiovascular`} subject={`Cytology`}/>} />
                  <Route exact path="/cardiovascular/cytology/sets" render={(props) => <ListSets {...props} block={`Cardiovascular`} subject={`Cytology`}/>} />
                  <Route exact path="/cardiovascular/cytology/sets/:id" render={(props) => <DetailsSet {...props} block={`Cardiovascular`} subject={`Cytology`}/>} />
                  <Route exact path="/cardiovascular/cytology/clusters" render={(props) => <ListClusters {...props} block={`Cardiovascular`} subject={`Cytology`}/>} />
                  <Route exact path="/cardiovascular/cytology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Cardiovascular`} subject={`Cytology`}/>} />
                  <Route exact path="/cardiovascular/clinical" render={(props) => <List {...props} block={`Cardiovascular`} subject={`Clinical`}/>} />
                  <Route exact path="/cardiovascular/clinical/sets" render={(props) => <ListSets {...props} block={`Cardiovascular`} subject={`Clinical`}/>} />
                  <Route exact path="/cardiovascular/clinical/sets/:id" render={(props) => <DetailsSet {...props} block={`Cardiovascular`} subject={`Clinical`}/>} />
                  <Route exact path="/cardiovascular/clinical/clusters" render={(props) => <ListClusters {...props} block={`Cardiovascular`} subject={`Clinical`}/>} />
                  <Route exact path="/cardiovascular/clinical/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Cardiovascular`} subject={`Clinical`}/>} />

                  <Route exact path="/musculoskeletal" render={(props) => <Subjects {...props} block={`Musculoskeletal`} />} />
                  <Route exact path="/musculoskeletal/practice" render={(props) => <PracticeList {...props} block={`Musculoskeletal`} />} />
                  <Route exact path="/musculoskeletal/practice/description" render={(props) => <PracticeDescriptionForm {...props} block={`Musculoskeletal`} />} />
                  <Route exact path="/musculoskeletal/practice/description/:id" render={(props) => <DetailsPracticeDescription {...props} block={`Musculoskeletal`}/>} />
                  <Route exact path="/musculoskeletal/practice/description/results/:id" render={(props) => <ResultsPracticeDescription {...props} block={`Musculoskeletal`}/>} />
                  <Route exact path="/musculoskeletal/microbiology" render={(props) => <List {...props} block={`Musculoskeletal`} subject={`Microbiology`}/>} />
                  <Route exact path="/musculoskeletal/microbiology/sets" render={(props) => <ListSets {...props} block={`Musculoskeletal`} subject={`Microbiology`}/>} />
                  <Route exact path="/musculoskeletal/microbiology/sets/:id" render={(props) => <DetailsSet {...props} block={`Musculoskeletal`} subject={`Microbiology`}/>} />
                  <Route exact path="/musculoskeletal/microbiology/clusters" render={(props) => <ListClusters {...props} block={`Musculoskeletal`} subject={`Microbiology`}/>} />
                  <Route exact path="/musculoskeletal/microbiology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Musculoskeletal`} subject={`Microbiology`}/>} />
                  <Route exact path="/musculoskeletal/imaging" render={(props) => <List {...props} block={`Musculoskeletal`} subject={`Imaging`}/>} />
                  <Route exact path="/musculoskeletal/imaging/sets" render={(props) => <ListSets {...props} block={`Musculoskeletal`} subject={`Imaging`}/>} />
                  <Route exact path="/musculoskeletal/imaging/sets/:id" render={(props) => <DetailsSet {...props} block={`Musculoskeletal`} subject={`Imaging`}/>} />
                  <Route exact path="/musculoskeletal/imaging/clusters" render={(props) => <ListClusters {...props} block={`Musculoskeletal`} subject={`Imaging`}/>} />
                  <Route exact path="/musculoskeletal/imaging/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Musculoskeletal`} subject={`Imaging`}/>} />
                  <Route exact path="/musculoskeletal/pathology" render={(props) => <List {...props} block={`Musculoskeletal`} subject={`Pathology`}/>} />
                  <Route exact path="/musculoskeletal/pathology/sets" render={(props) => <ListSets {...props} block={`Musculoskeletal`} subject={`Pathology`}/>} />
                  <Route exact path="/musculoskeletal/pathology/sets/:id" render={(props) => <DetailsSet {...props} block={`Musculoskeletal`} subject={`Pathology`}/>} />
                  <Route exact path="/musculoskeletal/pathology/clusters" render={(props) => <ListClusters {...props} block={`Musculoskeletal`} subject={`Pathology`}/>} />
                  <Route exact path="/musculoskeletal/pathology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Musculoskeletal`} subject={`Pathology`}/>} />
                  <Route exact path="/musculoskeletal/histology" render={(props) => <List {...props} block={`Musculoskeletal`} subject={`Histology`}/>} />
                  <Route exact path="/musculoskeletal/histology/sets" render={(props) => <ListSets {...props} block={`Musculoskeletal`} subject={`Histology`}/>} />
                  <Route exact path="/musculoskeletal/histology/sets/:id" render={(props) => <DetailsSet {...props} block={`Musculoskeletal`} subject={`Histology`}/>} />
                  <Route exact path="/musculoskeletal/histology/clusters" render={(props) => <ListClusters {...props} block={`Musculoskeletal`} subject={`Histology`}/>} />
                  <Route exact path="/musculoskeletal/histology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Musculoskeletal`} subject={`Histology`}/>} />
                  <Route exact path="/musculoskeletal/cytology" render={(props) => <List {...props} block={`Musculoskeletal`} subject={`Cytology`}/>} />
                  <Route exact path="/musculoskeletal/cytology/sets" render={(props) => <ListSets {...props} block={`Musculoskeletal`} subject={`Cytology`}/>} />
                  <Route exact path="/musculoskeletal/cytology/sets/:id" render={(props) => <DetailsSet {...props} block={`Musculoskeletal`} subject={`Cytology`}/>} />
                  <Route exact path="/musculoskeletal/cytology/clusters" render={(props) => <ListClusters {...props} block={`Musculoskeletal`} subject={`Cytology`}/>} />
                  <Route exact path="/musculoskeletal/cytology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Musculoskeletal`} subject={`Cytology`}/>} />
                  <Route exact path="/musculoskeletal/clinical" render={(props) => <List {...props} block={`Musculoskeletal`} subject={`Clinical`}/>} />
                  <Route exact path="/musculoskeletal/clinical/sets" render={(props) => <ListSets {...props} block={`Musculoskeletal`} subject={`Clinical`}/>} />
                  <Route exact path="/musculoskeletal/clinical/sets/:id" render={(props) => <DetailsSet {...props} block={`Musculoskeletal`} subject={`Clinical`}/>} />
                  <Route exact path="/musculoskeletal/clinical/clusters" render={(props) => <ListClusters {...props} block={`Musculoskeletal`} subject={`Clinical`}/>} />
                  <Route exact path="/musculoskeletal/clinical/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Musculoskeletal`} subject={`Clinical`}/>} />

                  <Route exact path="/respiratory" render={(props) => <Subjects {...props} block={`Respiratory`} />} />
                  <Route exact path="/respiratory/practice" render={(props) => <PracticeList {...props} block={`Respiratory`} />} />
                  <Route exact path="/respiratory/practice/description" render={(props) => <PracticeDescriptionForm {...props} block={`Respiratory`} />} />
                  <Route exact path="/respiratory/practice/description/:id" render={(props) => <DetailsPracticeDescription {...props} block={`Respiratory`}/>} />
                  <Route exact path="/respiratory/practice/description/results/:id" render={(props) => <ResultsPracticeDescription {...props} block={`Respiratory`}/>} />
                  <Route exact path="/respiratory/microbiology" render={(props) => <List {...props} block={`Respiratory`} subject={`Microbiology`}/>} />
                  <Route exact path="/respiratory/microbiology/sets" render={(props) => <ListSets {...props} block={`Respiratory`} subject={`Microbiology`}/>} />
                  <Route exact path="/respiratory/microbiology/sets/:id" render={(props) => <DetailsSet {...props} block={`Respiratory`} subject={`Microbiology`}/>} />
                  <Route exact path="/respiratory/microbiology/clusters" render={(props) => <ListClusters {...props} block={`Respiratory`} subject={`Microbiology`}/>} />
                  <Route exact path="/respiratory/microbiology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Respiratory`} subject={`Microbiology`}/>} />
                  <Route exact path="/respiratory/imaging" render={(props) => <List {...props} block={`Respiratory`} subject={`Imaging`}/>} />
                  <Route exact path="/respiratory/imaging/sets" render={(props) => <ListSets {...props} block={`Respiratory`} subject={`Imaging`}/>} />
                  <Route exact path="/respiratory/imaging/sets/:id" render={(props) => <DetailsSet {...props} block={`Respiratory`} subject={`Imaging`}/>} />
                  <Route exact path="/respiratory/imaging/clusters" render={(props) => <ListClusters {...props} block={`Respiratory`} subject={`Imaging`}/>} />
                  <Route exact path="/respiratory/imaging/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Respiratory`} subject={`Imaging`}/>} />
                  <Route exact path="/respiratory/pathology" render={(props) => <List {...props} block={`Respiratory`} subject={`Pathology`}/>} />
                  <Route exact path="/respiratory/pathology/sets" render={(props) => <ListSets {...props} block={`Respiratory`} subject={`Pathology`}/>} />
                  <Route exact path="/respiratory/pathology/sets/:id" render={(props) => <DetailsSet {...props} block={`Respiratory`} subject={`Pathology`}/>} />
                  <Route exact path="/respiratory/pathology/clusters" render={(props) => <ListClusters {...props} block={`Respiratory`} subject={`Pathology`}/>} />
                  <Route exact path="/respiratory/pathology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Respiratory`} subject={`Pathology`}/>} />
                  <Route exact path="/respiratory/histology" render={(props) => <List {...props} block={`Respiratory`} subject={`Histology`}/>} />
                  <Route exact path="/respiratory/histology/sets" render={(props) => <ListSets {...props} block={`Respiratory`} subject={`Histology`}/>} />
                  <Route exact path="/respiratory/histology/sets/:id" render={(props) => <DetailsSet {...props} block={`Respiratory`} subject={`Histology`}/>} />
                  <Route exact path="/respiratory/histology/clusters" render={(props) => <ListClusters {...props} block={`Respiratory`} subject={`Histology`}/>} />
                  <Route exact path="/respiratory/histology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Respiratory`} subject={`Histology`}/>} />
                  <Route exact path="/respiratory/cytology" render={(props) => <List {...props} block={`Respiratory`} subject={`Cytology`}/>} />
                  <Route exact path="/respiratory/cytology/sets" render={(props) => <ListSets {...props} block={`Respiratory`} subject={`Cytology`}/>} />
                  <Route exact path="/respiratory/cytology/sets/:id" render={(props) => <DetailsSet {...props} block={`Respiratory`} subject={`Cytology`}/>} />
                  <Route exact path="/respiratory/cytology/clusters" render={(props) => <ListClusters {...props} block={`Respiratory`} subject={`Cytology`}/>} />
                  <Route exact path="/respiratory/cytology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Respiratory`} subject={`Cytology`}/>} />
                  <Route exact path="/respiratory/clinical" render={(props) => <List {...props} block={`Respiratory`} subject={`Clinical`}/>} />
                  <Route exact path="/respiratory/clinical/sets" render={(props) => <ListSets {...props} block={`Respiratory`} subject={`Clinical`}/>} />
                  <Route exact path="/respiratory/clinical/sets/:id" render={(props) => <DetailsSet {...props} block={`Respiratory`} subject={`Clinical`}/>} />
                  <Route exact path="/respiratory/clinical/clusters" render={(props) => <ListClusters {...props} block={`Respiratory`} subject={`Clinical`}/>} />
                  <Route exact path="/respiratory/clinical/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Respiratory`} subject={`Clinical`}/>} />

                  <Route exact path="/hemOnc" render={(props) => <Subjects {...props} block={`Hematology/Oncology`} />} />
                  <Route exact path="/hemOnc/practice" render={(props) => <PracticeList {...props} block={`Hematology/Oncology`} />} />
                  <Route exact path="/hemOnc/practice/description" render={(props) => <PracticeDescriptionForm {...props} block={`Hematology/Oncology`} />} />
                  <Route exact path="/hemOnc/practice/description/:id" render={(props) => <DetailsPracticeDescription {...props} block={`Hematology/Oncology`}/>} />
                  <Route exact path="/hemOnc/practice/description/results/:id" render={(props) => <ResultsPracticeDescription {...props} block={`Hematology/Oncology`}/>} />
                  <Route exact path="/hemOnc/microbiology" render={(props) => <List {...props} block={`Hematology/Oncology`} subject={`Microbiology`}/>} />
                  <Route exact path="/hemOnc/microbiology/sets" render={(props) => <ListSets {...props} block={`Hematology/Oncology`} subject={`Microbiology`}/>} />
                  <Route exact path="/hemOnc/microbiology/sets/:id" render={(props) => <DetailsSet {...props} block={`Hematology/Oncology`} subject={`Microbiology`}/>} />
                  <Route exact path="/hemOnc/microbiology/clusters" render={(props) => <ListClusters {...props} block={`Hematology/Oncology`} subject={`Microbiology`}/>} />
                  <Route exact path="/hemOnc/microbiology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Hematology/Oncology`} subject={`Microbiology`}/>} />
                  <Route exact path="/hemOnc/imaging" render={(props) => <List {...props} block={`Hematology/Oncology`} subject={`Imaging`}/>} />
                  <Route exact path="/hemOnc/imaging/sets" render={(props) => <ListSets {...props} block={`Hematology/Oncology`} subject={`Imaging`}/>} />
                  <Route exact path="/hemOnc/imaging/sets/:id" render={(props) => <DetailsSet {...props} block={`Hematology/Oncology`} subject={`Imaging`}/>} />
                  <Route exact path="/hemOnc/imaging/clusters" render={(props) => <ListClusters {...props} block={`Hematology/Oncology`} subject={`Imaging`}/>} />
                  <Route exact path="/hemOnc/imaging/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Hematology/Oncology`} subject={`Imaging`}/>} />
                  <Route exact path="/hemOnc/pathology" render={(props) => <List {...props} block={`Hematology/Oncology`} subject={`Pathology`}/>} />
                  <Route exact path="/hemOnc/pathology/sets" render={(props) => <ListSets {...props} block={`Hematology/Oncology`} subject={`Pathology`}/>} />
                  <Route exact path="/hemOnc/pathology/sets/:id" render={(props) => <DetailsSet {...props} block={`Hematology/Oncology`} subject={`Pathology`}/>} />
                  <Route exact path="/hemOnc/pathology/clusters" render={(props) => <ListClusters {...props} block={`Hematology/Oncology`} subject={`Pathology`}/>} />
                  <Route exact path="/hemOnc/pathology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Hematology/Oncology`} subject={`Pathology`}/>} />
                  <Route exact path="/hemOnc/histology" render={(props) => <List {...props} block={`Hematology/Oncology`} subject={`Histology`}/>} />
                  <Route exact path="/hemOnc/histology/sets" render={(props) => <ListSets {...props} block={`Hematology/Oncology`} subject={`Histology`}/>} />
                  <Route exact path="/hemOnc/histology/sets/:id" render={(props) => <DetailsSet {...props} block={`Hematology/Oncology`} subject={`Histology`}/>} />
                  <Route exact path="/hemOnc/histology/clusters" render={(props) => <ListClusters {...props} block={`Hematology/Oncology`} subject={`Histology`}/>} />
                  <Route exact path="/hemOnc/histology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Hematology/Oncology`} subject={`Histology`}/>} />
                  <Route exact path="/hemOnc/cytology" render={(props) => <List {...props} block={`Hematology/Oncology`} subject={`Cytology`}/>} />
                  <Route exact path="/hemOnc/cytology/sets" render={(props) => <ListSets {...props} block={`Hematology/Oncology`} subject={`Cytology`}/>} />
                  <Route exact path="/hemOnc/cytology/sets/:id" render={(props) => <DetailsSet {...props} block={`Hematology/Oncology`} subject={`Cytology`}/>} />
                  <Route exact path="/hemOnc/cytology/clusters" render={(props) => <ListClusters {...props} block={`Hematology/Oncology`} subject={`Cytology`}/>} />
                  <Route exact path="/hemOnc/cytology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Hematology/Oncology`} subject={`Cytology`}/>} />
                  <Route exact path="/hemOnc/clinical" render={(props) => <List {...props} block={`Hematology/Oncology`} subject={`Clinical`}/>} />
                  <Route exact path="/hemOnc/clinical/sets" render={(props) => <ListSets {...props} block={`Hematology/Oncology`} subject={`Clinical`}/>} />
                  <Route exact path="/hemOnc/clinical/sets/:id" render={(props) => <DetailsSet {...props} block={`Hematology/Oncology`} subject={`Clinical`}/>} />
                  <Route exact path="/hemOnc/clinical/clusters" render={(props) => <ListClusters {...props} block={`Hematology/Oncology`} subject={`Clinical`}/>} />
                  <Route exact path="/hemOnc/clinical/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Hematology/Oncology`} subject={`Clinical`}/>} />

                  <Route exact path="/neurology" render={(props) => <Subjects {...props} block={`Neurology`} />} />
                  <Route exact path="/neurology/practice" render={(props) => <PracticeList {...props} block={`Neurology`} />} />
                  <Route exact path="/neurology/practice/description" render={(props) => <PracticeDescriptionForm {...props} block={`Neurology`} />} />
                  <Route exact path="/neurology/practice/description/:id" render={(props) => <DetailsPracticeDescription {...props} block={`Neurology`}/>} />
                  <Route exact path="/neurology/practice/description/results/:id" render={(props) => <ResultsPracticeDescription {...props} block={`Neurology`}/>} />
                  <Route exact path="/neurology/microbiology" render={(props) => <List {...props} block={`Neurology`} subject={`Microbiology`}/>} />
                  <Route exact path="/neurology/microbiology/sets" render={(props) => <ListSets {...props} block={`Neurology`} subject={`Microbiology`}/>} />
                  <Route exact path="/neurology/microbiology/sets/:id" render={(props) => <DetailsSet {...props} block={`Neurology`} subject={`Microbiology`}/>} />
                  <Route exact path="/neurology/microbiology/clusters" render={(props) => <ListClusters {...props} block={`Neurology`} subject={`Microbiology`}/>} />
                  <Route exact path="/neurology/microbiology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Neurology`} subject={`Microbiology`}/>} />
                  <Route exact path="/neurology/imaging" render={(props) => <List {...props} block={`Neurology`} subject={`Imaging`}/>} />
                  <Route exact path="/neurology/imaging/sets" render={(props) => <ListSets {...props} block={`Neurology`} subject={`Imaging`}/>} />
                  <Route exact path="/neurology/imaging/sets/:id" render={(props) => <DetailsSet {...props} block={`Neurology`} subject={`Imaging`}/>} />
                  <Route exact path="/neurology/imaging/clusters" render={(props) => <ListClusters {...props} block={`Neurology`} subject={`Imaging`}/>} />
                  <Route exact path="/neurology/imaging/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Neurology`} subject={`Imaging`}/>} />
                  <Route exact path="/neurology/pathology" render={(props) => <List {...props} block={`Neurology`} subject={`Pathology`}/>} />
                  <Route exact path="/neurology/pathology/sets" render={(props) => <ListSets {...props} block={`Neurology`} subject={`Pathology`}/>} />
                  <Route exact path="/neurology/pathology/sets/:id" render={(props) => <DetailsSet {...props} block={`Neurology`} subject={`Pathology`}/>} />
                  <Route exact path="/neurology/pathology/clusters" render={(props) => <ListClusters {...props} block={`Neurology`} subject={`Pathology`}/>} />
                  <Route exact path="/neurology/pathology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Neurology`} subject={`Pathology`}/>} />
                  <Route exact path="/neurology/histology" render={(props) => <List {...props} block={`Neurology`} subject={`Histology`}/>} />
                  <Route exact path="/neurology/histology/sets" render={(props) => <ListSets {...props} block={`Neurology`} subject={`Histology`}/>} />
                  <Route exact path="/neurology/histology/sets/:id" render={(props) => <DetailsSet {...props} block={`Neurology`} subject={`Histology`}/>} />
                  <Route exact path="/neurology/histology/clusters" render={(props) => <ListClusters {...props} block={`Neurology`} subject={`Histology`}/>} />
                  <Route exact path="/neurology/histology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Neurology`} subject={`Histology`}/>} />
                  <Route exact path="/neurology/cytology" render={(props) => <List {...props} block={`Neurology`} subject={`Cytology`}/>} />
                  <Route exact path="/neurology/cytology/sets" render={(props) => <ListSets {...props} block={`Neurology`} subject={`Cytology`}/>} />
                  <Route exact path="/neurology/cytology/sets/:id" render={(props) => <DetailsSet {...props} block={`Neurology`} subject={`Cytology`}/>} />
                  <Route exact path="/neurology/cytology/clusters" render={(props) => <ListClusters {...props} block={`Neurology`} subject={`Cytology`}/>} />
                  <Route exact path="/neurology/cytology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Neurology`} subject={`Cytology`}/>} />
                  <Route exact path="/neurology/clinical" render={(props) => <List {...props} block={`Neurology`} subject={`Clinical`}/>} />
                  <Route exact path="/neurology/clinical/sets" render={(props) => <ListSets {...props} block={`Neurology`} subject={`Clinical`}/>} />
                  <Route exact path="/neurology/clinical/sets/:id" render={(props) => <DetailsSet {...props} block={`Neurology`} subject={`Clinical`}/>} />
                  <Route exact path="/neurology/clinical/clusters" render={(props) => <ListClusters {...props} block={`Neurology`} subject={`Clinical`}/>} />
                  <Route exact path="/neurology/clinical/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Neurology`} subject={`Clinical`}/>} />

                  <Route exact path="/endocrine" render={(props) => <Subjects {...props} block={`Endocrine`} />} />
                  <Route exact path="/endocrine/practice" render={(props) => <PracticeList {...props} block={`Endocrine`} />} />
                  <Route exact path="/endocrine/practice/description" render={(props) => <PracticeDescriptionForm {...props} block={`Endocrine`} />} />
                  <Route exact path="/endocrine/practice/description/:id" render={(props) => <DetailsPracticeDescription {...props} block={`Endocrine`}/>} />
                  <Route exact path="/endocrine/practice/description/results/:id" render={(props) => <ResultsPracticeDescription {...props} block={`Endocrine`}/>} />
                  <Route exact path="/endocrine/microbiology" render={(props) => <List {...props} block={`Endocrine`} subject={`Microbiology`}/>} />
                  <Route exact path="/endocrine/microbiology/sets" render={(props) => <ListSets {...props} block={`Endocrine`} subject={`Microbiology`}/>} />
                  <Route exact path="/endocrine/microbiology/sets/:id" render={(props) => <DetailsSet {...props} block={`Endocrine`} subject={`Microbiology`}/>} />
                  <Route exact path="/endocrine/microbiology/clusters" render={(props) => <ListClusters {...props} block={`Endocrine`} subject={`Microbiology`}/>} />
                  <Route exact path="/endocrine/microbiology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Endocrine`} subject={`Microbiology`}/>} />
                  <Route exact path="/endocrine/imaging" render={(props) => <List {...props} block={`Endocrine`} subject={`Imaging`}/>} />
                  <Route exact path="/endocrine/imaging/sets" render={(props) => <ListSets {...props} block={`Endocrine`} subject={`Imaging`}/>} />
                  <Route exact path="/endocrine/imaging/sets/:id" render={(props) => <DetailsSet {...props} block={`Endocrine`} subject={`Imaging`}/>} />
                  <Route exact path="/endocrine/imaging/clusters" render={(props) => <ListClusters {...props} block={`Endocrine`} subject={`Imaging`}/>} />
                  <Route exact path="/endocrine/imaging/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Endocrine`} subject={`Imaging`}/>} />
                  <Route exact path="/endocrine/pathology" render={(props) => <List {...props} block={`Endocrine`} subject={`Pathology`}/>} />
                  <Route exact path="/endocrine/pathology/sets" render={(props) => <ListSets {...props} block={`Endocrine`} subject={`Pathology`}/>} />
                  <Route exact path="/endocrine/pathology/sets/:id" render={(props) => <DetailsSet {...props} block={`Endocrine`} subject={`Pathology`}/>} />
                  <Route exact path="/endocrine/pathology/clusters" render={(props) => <ListClusters {...props} block={`Endocrine`} subject={`Pathology`}/>} />
                  <Route exact path="/endocrine/pathology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Endocrine`} subject={`Pathology`}/>} />
                  <Route exact path="/endocrine/histology" render={(props) => <List {...props} block={`Endocrine`} subject={`Histology`}/>} />
                  <Route exact path="/endocrine/histology/sets" render={(props) => <ListSets {...props} block={`Endocrine`} subject={`Histology`}/>} />
                  <Route exact path="/endocrine/histology/sets/:id" render={(props) => <DetailsSet {...props} block={`Endocrine`} subject={`Histology`}/>} />
                  <Route exact path="/endocrine/histology/clusters" render={(props) => <ListClusters {...props} block={`Endocrine`} subject={`Histology`}/>} />
                  <Route exact path="/endocrine/histology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Endocrine`} subject={`Histology`}/>} />
                  <Route exact path="/endocrine/cytology" render={(props) => <List {...props} block={`Endocrine`} subject={`Cytology`}/>} />
                  <Route exact path="/endocrine/cytology/sets" render={(props) => <ListSets {...props} block={`Endocrine`} subject={`Cytology`}/>} />
                  <Route exact path="/endocrine/cytology/sets/:id" render={(props) => <DetailsSet {...props} block={`Endocrine`} subject={`Cytology`}/>} />
                  <Route exact path="/endocrine/cytology/clusters" render={(props) => <ListClusters {...props} block={`Endocrine`} subject={`Cytology`}/>} />
                  <Route exact path="/endocrine/cytology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Endocrine`} subject={`Cytology`}/>} />
                  <Route exact path="/endocrine/clinical" render={(props) => <List {...props} block={`Endocrine`} subject={`Clinical`}/>} />
                  <Route exact path="/endocrine/clinical/sets" render={(props) => <ListSets {...props} block={`Endocrine`} subject={`Clinical`}/>} />
                  <Route exact path="/endocrine/clinical/sets/:id" render={(props) => <DetailsSet {...props} block={`Endocrine`} subject={`Clinical`}/>} />
                  <Route exact path="/endocrine/clinical/clusters" render={(props) => <ListClusters {...props} block={`Endocrine`} subject={`Clinical`}/>} />
                  <Route exact path="/endocrine/clinical/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Endocrine`} subject={`Clinical`}/>} />

                  <Route exact path="/gastrointestinal" render={(props) => <Subjects {...props} block={`Gastrointestinal`} />} />
                  <Route exact path="/gastrointestinal/practice" render={(props) => <PracticeList {...props} block={`Gastrointestinal`} />} />
                  <Route exact path="/gastrointestinal/practice/description" render={(props) => <PracticeDescriptionForm {...props} block={`Gastrointestinal`} />} />
                  <Route exact path="/gastrointestinal/practice/description/:id" render={(props) => <DetailsPracticeDescription {...props} block={`Gastrointestinal`}/>} />
                  <Route exact path="/gastrointestinal/practice/description/results/:id" render={(props) => <ResultsPracticeDescription {...props} block={`Gastrointestinal`}/>} />
                  <Route exact path="/gastrointestinal/microbiology" render={(props) => <List {...props} block={`Gastrointestinal`} subject={`Microbiology`}/>} />
                  <Route exact path="/gastrointestinal/microbiology/sets" render={(props) => <ListSets {...props} block={`Gastrointestinal`} subject={`Microbiology`}/>} />
                  <Route exact path="/gastrointestinal/microbiology/sets/:id" render={(props) => <DetailsSet {...props} block={`Gastrointestinal`} subject={`Microbiology`}/>} />
                  <Route exact path="/gastrointestinal/microbiology/clusters" render={(props) => <ListClusters {...props} block={`Gastrointestinal`} subject={`Microbiology`}/>} />
                  <Route exact path="/gastrointestinal/microbiology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Gastrointestinal`} subject={`Microbiology`}/>} />
                  <Route exact path="/gastrointestinal/imaging" render={(props) => <List {...props} block={`Gastrointestinal`} subject={`Imaging`}/>} />
                  <Route exact path="/gastrointestinal/imaging/sets" render={(props) => <ListSets {...props} block={`Gastrointestinal`} subject={`Imaging`}/>} />
                  <Route exact path="/gastrointestinal/imaging/sets/:id" render={(props) => <DetailsSet {...props} block={`Gastrointestinal`} subject={`Imaging`}/>} />
                  <Route exact path="/gastrointestinal/imaging/clusters" render={(props) => <ListClusters {...props} block={`Gastrointestinal`} subject={`Imaging`}/>} />
                  <Route exact path="/gastrointestinal/imaging/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Gastrointestinal`} subject={`Imaging`}/>} />
                  <Route exact path="/gastrointestinal/pathology" render={(props) => <List {...props} block={`Gastrointestinal`} subject={`Pathology`}/>} />
                  <Route exact path="/gastrointestinal/pathology/sets" render={(props) => <ListSets {...props} block={`Gastrointestinal`} subject={`Pathology`}/>} />
                  <Route exact path="/gastrointestinal/pathology/sets/:id" render={(props) => <DetailsSet {...props} block={`Gastrointestinal`} subject={`Pathology`}/>} />
                  <Route exact path="/gastrointestinal/pathology/clusters" render={(props) => <ListClusters {...props} block={`Gastrointestinal`} subject={`Pathology`}/>} />
                  <Route exact path="/gastrointestinal/pathology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Gastrointestinal`} subject={`Pathology`}/>} />
                  <Route exact path="/gastrointestinal/histology" render={(props) => <List {...props} block={`Gastrointestinal`} subject={`Histology`}/>} />
                  <Route exact path="/gastrointestinal/histology/sets" render={(props) => <ListSets {...props} block={`Gastrointestinal`} subject={`Histology`}/>} />
                  <Route exact path="/gastrointestinal/histology/sets/:id" render={(props) => <DetailsSet {...props} block={`Gastrointestinal`} subject={`Histology`}/>} />
                  <Route exact path="/gastrointestinal/histology/clusters" render={(props) => <ListClusters {...props} block={`Gastrointestinal`} subject={`Histology`}/>} />
                  <Route exact path="/gastrointestinal/histology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Gastrointestinal`} subject={`Histology`}/>} />
                  <Route exact path="/gastrointestinal/cytology" render={(props) => <List {...props} block={`Gastrointestinal`} subject={`Cytology`}/>} />
                  <Route exact path="/gastrointestinal/cytology/sets" render={(props) => <ListSets {...props} block={`Gastrointestinal`} subject={`Cytology`}/>} />
                  <Route exact path="/gastrointestinal/cytology/sets/:id" render={(props) => <DetailsSet {...props} block={`Gastrointestinal`} subject={`Cytology`}/>} />
                  <Route exact path="/gastrointestinal/cytology/clusters" render={(props) => <ListClusters {...props} block={`Gastrointestinal`} subject={`Cytology`}/>} />
                  <Route exact path="/gastrointestinal/cytology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Gastrointestinal`} subject={`Cytology`}/>} />
                  <Route exact path="/gastrointestinal/clinical" render={(props) => <List {...props} block={`Gastrointestinal`} subject={`Clinical`}/>} />
                  <Route exact path="/gastrointestinal/clinical/sets" render={(props) => <ListSets {...props} block={`Gastrointestinal`} subject={`Clinical`}/>} />
                  <Route exact path="/gastrointestinal/clinical/sets/:id" render={(props) => <DetailsSet {...props} block={`Gastrointestinal`} subject={`Clinical`}/>} />
                  <Route exact path="/gastrointestinal/clinical/clusters" render={(props) => <ListClusters {...props} block={`Gastrointestinal`} subject={`Clinical`}/>} />
                  <Route exact path="/gastrointestinal/clinical/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Gastrointestinal`} subject={`Clinical`}/>} />

                  <Route exact path="/genitourinary" render={(props) => <Subjects {...props} block={`Genitourinary`} />} />
                  <Route exact path="/genitourinary/practice" render={(props) => <PracticeList {...props} block={`Genitourinary`} />} />
                  <Route exact path="/genitourinary/practice/description" render={(props) => <PracticeDescriptionForm {...props} block={`Genitourinary`} />} />
                  <Route exact path="/genitourinary/practice/description/:id" render={(props) => <DetailsPracticeDescription {...props} block={`Genitourinary`}/>} />
                  <Route exact path="/genitourinary/practice/description/results/:id" render={(props) => <ResultsPracticeDescription {...props} block={`Genitourinary`}/>} />
                  <Route exact path="/genitourinary/microbiology" render={(props) => <List {...props} block={`Genitourinary`} subject={`Microbiology`}/>} />
                  <Route exact path="/genitourinary/microbiology/sets" render={(props) => <ListSets {...props} block={`Genitourinary`} subject={`Microbiology`}/>} />
                  <Route exact path="/genitourinary/microbiology/sets/:id" render={(props) => <DetailsSet {...props} block={`Genitourinary`} subject={`Microbiology`}/>} />
                  <Route exact path="/genitourinary/microbiology/clusters" render={(props) => <ListClusters {...props} block={`Genitourinary`} subject={`Microbiology`}/>} />
                  <Route exact path="/genitourinary/microbiology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Genitourinary`} subject={`Microbiology`}/>} />
                  <Route exact path="/genitourinary/imaging" render={(props) => <List {...props} block={`Genitourinary`} subject={`Imaging`}/>} />
                  <Route exact path="/genitourinary/imaging/sets" render={(props) => <ListSets {...props} block={`Genitourinary`} subject={`Imaging`}/>} />
                  <Route exact path="/genitourinary/imaging/sets/:id" render={(props) => <DetailsSet {...props} block={`Genitourinary`} subject={`Imaging`}/>} />
                  <Route exact path="/genitourinary/imaging/clusters" render={(props) => <ListClusters {...props} block={`Genitourinary`} subject={`Imaging`}/>} />
                  <Route exact path="/genitourinary/imaging/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Genitourinary`} subject={`Imaging`}/>} />
                  <Route exact path="/genitourinary/pathology" render={(props) => <List {...props} block={`Genitourinary`} subject={`Pathology`}/>} />
                  <Route exact path="/genitourinary/pathology/sets" render={(props) => <ListSets {...props} block={`Genitourinary`} subject={`Pathology`}/>} />
                  <Route exact path="/genitourinary/pathology/sets/:id" render={(props) => <DetailsSet {...props} block={`Genitourinary`} subject={`Pathology`}/>} />
                  <Route exact path="/genitourinary/pathology/clusters" render={(props) => <ListClusters {...props} block={`Genitourinary`} subject={`Pathology`}/>} />
                  <Route exact path="/genitourinary/pathology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Genitourinary`} subject={`Pathology`}/>} />
                  <Route exact path="/genitourinary/histology" render={(props) => <List {...props} block={`Genitourinary`} subject={`Histology`}/>} />
                  <Route exact path="/genitourinary/histology/sets" render={(props) => <ListSets {...props} block={`Genitourinary`} subject={`Histology`}/>} />
                  <Route exact path="/genitourinary/histology/sets/:id" render={(props) => <DetailsSet {...props} block={`Genitourinary`} subject={`Histology`}/>} />
                  <Route exact path="/genitourinary/histology/clusters" render={(props) => <ListClusters {...props} block={`Genitourinary`} subject={`Histology`}/>} />
                  <Route exact path="/genitourinary/histology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Genitourinary`} subject={`Histology`}/>} />
                  <Route exact path="/genitourinary/cytology" render={(props) => <List {...props} block={`Genitourinary`} subject={`Cytology`}/>} />
                  <Route exact path="/genitourinary/cytology/sets" render={(props) => <ListSets {...props} block={`Genitourinary`} subject={`Cytology`}/>} />
                  <Route exact path="/genitourinary/cytology/sets/:id" render={(props) => <DetailsSet {...props} block={`Genitourinary`} subject={`Cytology`}/>} />
                  <Route exact path="/genitourinary/cytology/clusters" render={(props) => <ListClusters {...props} block={`Genitourinary`} subject={`Cytology`}/>} />
                  <Route exact path="/genitourinary/cytology/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Genitourinary`} subject={`Cytology`}/>} />
                  <Route exact path="/genitourinary/clinical" render={(props) => <List {...props} block={`Genitourinary`} subject={`Clinical`}/>} />
                  <Route exact path="/genitourinary/clinical/sets" render={(props) => <ListSets {...props} block={`Genitourinary`} subject={`Clinical`}/>} />
                  <Route exact path="/genitourinary/clinical/sets/:id" render={(props) => <DetailsSet {...props} block={`Genitourinary`} subject={`Clinical`}/>} />
                  <Route exact path="/genitourinary/clinical/clusters" render={(props) => <ListClusters {...props} block={`Genitourinary`} subject={`Clinical`}/>} />
                  <Route exact path="/genitourinary/clinical/clusters/:id" render={(props) => <DetailsCluster {...props} block={`Genitourinary`} subject={`Clinical`}/>} />

                  <Route exact path="/mypractice" component={MyPractice} />

                  <Route exact path="/sets/details/sets/:id" component={DetailsSet} />
                  <Route exact path="/mysets" component={MySets} />
                  <Route exact path="/mysets/:id" render={(props) => <DetailsSet {...props} block={`.`} subject={`.`}/>} />

                  <Route exact path="/clusters/details/clusters/:id" component={DetailsCluster} />
                  <Route exact path="/myclusters" component={MyClusters} />
                  <Route exact path="/myclusters/:id" render={(props) => <DetailsCluster {...props} block={`.`} subject={`.`}/>} />

                </Switch>
              </div> 
            </div>
    );
  }

// ReactDOM.render([<App key="1" />, <Footer key="2" />], document.getElementById("app"));

