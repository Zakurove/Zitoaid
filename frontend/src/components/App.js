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

//Respiratory Block
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

//Cardio Block
import Cardio from "./blocks/cardio/Cardio";
//Micro
import ListCardioM from "./blocks/cardio/micro/ListCardioM";
import DetailsCardioM from "./blocks/cardio/micro/DetailsCardioM";
import FormCardioM from "./blocks/cardio/micro/FormCardioM";
//Patho
import ListCardioP from "./blocks/cardio/patho/ListCardioP";
import DetailsCardioP from "./blocks/cardio/patho/DetailsCardioP";
import FormCardioP from "./blocks/cardio/patho/FormCardioP";
//Imaging
import ListCardioI from "./blocks/cardio/imaging/ListCardioM";
import DetailsCardioI from "./blocks/cardio/imaging/DetailsCardioM";
import FormCardioI from "./blocks/cardio/imaging/FormCardioM";
//Histo
import ListCardioH from "./blocks/cardio/histo/ListCardioM";
import DetailsCardioH from "./blocks/cardio/histo/DetailsCardioM";
import FormCardioH from "./blocks/cardio/histo/FormCardioM";
//Cyto
import ListCardioC from "./blocks/cardio/cyto/ListCardioM";
import DetailsCardioC from "./blocks/cardio/cyto/DetailsCardioM";
import FormCardioC from "./blocks/cardio/cyto/FormCardioM";
//Clinical
import ListCardioCT from "./blocks/cardio/clinical/ListCardioM";
import DetailsCardioCT from "./blocks/cardio/clinical/DetailsCardioM";
import FormCardioCT from "./blocks/cardio/clinical/FormCardioM";

//MSK Block
import MSK from "./blocks/msk/MSK";
//Micro
import ListMSKM from "./blocks/msk/micro/ListMSKM";
import DetailsMSKM from "./blocks/msk/micro/DetailsMSKM";
import FormMSKM from "./blocks/msk/micro/FormMSKM";
//Patho
import ListMSKP from "./blocks/msk/patho/ListMSKP";
import DetailsMSKP from "./blocks/msk/patho/DetailsMSKP";
import FormMSKP from "./blocks/msk/patho/FormMSKP";
//Imaging
import ListMSKI from "./blocks/msk/imaging/ListMSKM";
import DetailsMSKI from "./blocks/msk/imaging/DetailsMSKM";
import FormMSKI from "./blocks/msk/imaging/FormMSKM";
//Histo
import ListMSKH from "./blocks/msk/histo/ListMSKM";
import DetailsMSKH from "./blocks/msk/histo/DetailsMSKM";
import FormMSKH from "./blocks/msk/histo/FormMSKM";
//Cyto
import ListMSKC from "./blocks/msk/cyto/ListMSKM";
import DetailsMSKC from "./blocks/msk/cyto/DetailsMSKM";
import FormMSKC from "./blocks/msk/cyto/FormMSKM";
//Clinical
import ListMSKCT from "./blocks/msk/clinical/ListMSKM";
import DetailsMSKCT from "./blocks/msk/clinical/DetailsMSKM";
import FormMSKCT from "./blocks/msk/clinical/FormMSKM";

//Hema Block
import Hema from "./blocks/hema/Hema";
//Micro
import ListHemaM from "./blocks/hema/micro/ListHemaM";
import DetailsHemaM from "./blocks/hema/micro/DetailsHemaM";
import FormHemaM from "./blocks/hema/micro/FormHemaM";
//Patho
import ListHemaP from "./blocks/hema/patho/ListHemaP";
import DetailsHemaP from "./blocks/hema/patho/DetailsHemaP";
import FormHemaP from "./blocks/hema/patho/FormHemaP";
//Imaging
import ListHemaI from "./blocks/hema/imaging/ListHemaM";
import DetailsHemaI from "./blocks/hema/imaging/DetailsHemaM";
import FormHemaI from "./blocks/hema/imaging/FormHemaM";
//Histo
import ListHemaH from "./blocks/hema/histo/ListHemaM";
import DetailsHemaH from "./blocks/hema/histo/DetailsHemaM";
import FormHemaH from "./blocks/hema/histo/FormHemaM";
//Cyto
import ListHemaC from "./blocks/hema/cyto/ListHemaM";
import DetailsHemaC from "./blocks/hema/cyto/DetailsHemaM";
import FormHemaC from "./blocks/hema/cyto/FormHemaM";
//Clinical
import ListHemaCT from "./blocks/hema/clinical/ListHemaM";
import DetailsHemaCT from "./blocks/hema/clinical/DetailsHemaM";
import FormHemaCT from "./blocks/hema/clinical/FormHemaM";

//Neuro Block
import Neuro from "./blocks/neuro/Neuro";
//Micro
import ListNeuroM from "./blocks/neuro/micro/ListNeuroM";
import DetailsNeuroM from "./blocks/neuro/micro/DetailsNeuroM";
import FormNeuroM from "./blocks/neuro/micro/FormNeuroM";
//Patho
import ListNeuroP from "./blocks/neuro/patho/ListNeuroP";
import DetailsNeuroP from "./blocks/neuro/patho/DetailsNeuroP";
import FormNeuroP from "./blocks/neuro/patho/FormNeuroP";
//Imaging
import ListNeuroI from "./blocks/neuro/imaging/ListNeuroM";
import DetailsNeuroI from "./blocks/neuro/imaging/DetailsNeuroM";
import FormNeuroI from "./blocks/neuro/imaging/FormNeuroM";
//Histo
import ListNeuroH from "./blocks/neuro/histo/ListNeuroM";
import DetailsNeuroH from "./blocks/neuro/histo/DetailsNeuroM";
import FormNeuroH from "./blocks/neuro/histo/FormNeuroM";
//Cyto
import ListNeuroC from "./blocks/neuro/cyto/ListNeuroM";
import DetailsNeuroC from "./blocks/neuro/cyto/DetailsNeuroM";
import FormNeuroC from "./blocks/neuro/cyto/FormNeuroM";
//Clinical
import ListNeuroCT from "./blocks/neuro/clinical/ListNeuroM";
import DetailsNeuroCT from "./blocks/neuro/clinical/DetailsNeuroM";
import FormNeuroCT from "./blocks/neuro/clinical/FormNeuroM";


//Endo Block
import Endo from "./blocks/endo/Endo";
//Micro
import ListEndoM from "./blocks/endo/micro/ListEndoM";
import DetailsEndoM from "./blocks/endo/micro/DetailsEndoM";
import FormEndoM from "./blocks/endo/micro/FormEndoM";
//Patho
import ListEndoP from "./blocks/endo/patho/ListEndoP";
import DetailsEndoP from "./blocks/endo/patho/DetailsEndoP";
import FormEndoP from "./blocks/endo/patho/FormEndoP";
//Imaging
import ListEndoI from "./blocks/endo/imaging/ListEndoM";
import DetailsEndoI from "./blocks/endo/imaging/DetailsEndoM";
import FormEndoI from "./blocks/endo/imaging/FormEndoM";
//Histo
import ListEndoH from "./blocks/endo/histo/ListEndoM";
import DetailsEndoH from "./blocks/endo/histo/DetailsEndoM";
import FormEndoH from "./blocks/endo/histo/FormEndoM";
//Cyto
import ListEndoC from "./blocks/endo/cyto/ListEndoM";
import DetailsEndoC from "./blocks/endo/cyto/DetailsEndoM";
import FormEndoC from "./blocks/endo/cyto/FormEndoM";
//Clinical
import ListEndoCT from "./blocks/endo/clinical/ListEndoM";
import DetailsEndoCT from "./blocks/endo/clinical/DetailsEndoM";
import FormEndoCT from "./blocks/endo/clinical/FormEndoM";

//Gastro Block
import Gastro from "./blocks/gastro/Gastro";
//Micro
import ListGastroM from "./blocks/gastro/micro/ListGastroM";
import DetailsGastroM from "./blocks/gastro/micro/DetailsGastroM";
import FormGastroM from "./blocks/gastro/micro/FormGastroM";
//Patho
import ListGastroP from "./blocks/gastro/patho/ListGastroP";
import DetailsGastroP from "./blocks/gastro/patho/DetailsGastroP";
import FormGastroP from "./blocks/gastro/patho/FormGastroP";
//Imaging
import ListGastroI from "./blocks/gastro/imaging/ListGastroM";
import DetailsGastroI from "./blocks/gastro/imaging/DetailsGastroM";
import FormGastroI from "./blocks/gastro/imaging/FormGastroM";
//Histo
import ListGastroH from "./blocks/gastro/histo/ListGastroM";
import DetailsGastroH from "./blocks/gastro/histo/DetailsGastroM";
import FormGastroH from "./blocks/gastro/histo/FormGastroM";
//Cyto
import ListGastroC from "./blocks/gastro/cyto/ListGastroM";
import DetailsGastroC from "./blocks/gastro/cyto/DetailsGastroM";
import FormGastroC from "./blocks/gastro/cyto/FormGastroM";
//Clinical
import ListGastroCT from "./blocks/gastro/clinical/ListGastroM";
import DetailsGastroCT from "./blocks/gastro/clinical/DetailsGastroM";
import FormGastroCT from "./blocks/gastro/clinical/FormGastroM";

//Genito Block
import Genito from "./blocks/genito/Genito";
//Micro
import ListGenitoM from "./blocks/genito/micro/ListGenitoM";
import DetailsGenitoM from "./blocks/genito/micro/DetailsGenitoM";
import FormGenitoM from "./blocks/genito/micro/FormGenitoM";
//Patho
import ListGenitoP from "./blocks/genito/patho/ListGenitoP";
import DetailsGenitoP from "./blocks/genito/patho/DetailsGenitoP";
import FormGenitoP from "./blocks/genito/patho/FormGenitoP";
//Imaging
import ListGenitoI from "./blocks/genito/imaging/ListGenitoM";
import DetailsGenitoI from "./blocks/genito/imaging/DetailsGenitoM";
import FormGenitoI from "./blocks/genito/imaging/FormGenitoM";
//Histo
import ListGenitoH from "./blocks/genito/histo/ListGenitoM";
import DetailsGenitoH from "./blocks/genito/histo/DetailsGenitoM";
import FormGenitoH from "./blocks/genito/histo/FormGenitoM";
//Cyto
import ListGenitoC from "./blocks/genito/cyto/ListGenitoM";
import DetailsGenitoC from "./blocks/genito/cyto/DetailsGenitoM";
import FormGenitoC from "./blocks/genito/cyto/FormGenitoM";
//Clinical
import ListGenitoCT from "./blocks/genito/clinical/ListGenitoM";
import DetailsGenitoCT from "./blocks/genito/clinical/DetailsGenitoM";
import FormGenitoCT from "./blocks/genito/clinical/FormGenitoM";

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
                  {/* Resp--------------------------------------------------------- */}
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
                  {/* Cardio--------------------------------------------------------------------- */}
                  <Route exact path="/cardiology" component={Cardio} />
                  {/* Micro */}
                  <Route exact path="/cardiology/microbiology" component={ListCardioM} />
                  <Route exact path="/cardiology/microbiology/create" component={FormCardioM} />
                  <Route  path="/cardiology/microbiology/:id" component={DetailsCardioM} />
                  {/* Patho */}
                  <Route exact path="/cardiology/pathology" component={ListCardioP} />
                  <Route exact path="/cardiology/pathology/create" component={FormCardioP} />
                  <Route  path="/cardiology/pathology/:id" component={DetailsCardioP} />
                  {/* Imaging */}
                  <Route exact path="/cardiology/imaging" component={ListCardioI} />
                  <Route exact path="/cardiology/imaging/create" component={FormCardioI} />
                  <Route  path="/cardiology/imaging/:id" component={DetailsCardioI} />                  
                  {/* Histo */}
                  <Route exact path="/cardiology/histology" component={ListCardioH} />
                  <Route exact path="/cardiology/histology/create" component={FormCardioH} />
                  <Route  path="/cardiology/histology/:id" component={DetailsCardioH} />
                   {/* Cyto */}
                   <Route exact path="/cardiology/cytology" component={ListCardioC} />
                  <Route exact path="/cardiology/cytology/create" component={FormCardioC} />
                  <Route  path="/cardiology/cytology/:id" component={DetailsCardioC} /> 
                   {/* Clinical */}
                   <Route exact path="/cardiology/clinicalTests" component={ListCardioCT} />
                  <Route exact path="/cardiology/clinicalTests/create" component={FormCardioCT} />
                  <Route  path="/cardiology/clinicalTests/:id" component={DetailsCardioCT} />     
                  {/* MSK--------------------------------------------------------------------- */}
                  <Route exact path="/msk" component={MSK} />
                  {/* Micro */}
                  <Route exact path="/msk/microbiology" component={ListMSKM} />
                  <Route exact path="/msk/microbiology/create" component={FormMSKM} />
                  <Route  path="/msk/microbiology/:id" component={DetailsMSKM} />
                  {/* Patho */}
                  <Route exact path="/msk/pathology" component={ListMSKP} />
                  <Route exact path="/msk/pathology/create" component={FormMSKP} />
                  <Route  path="/msk/pathology/:id" component={DetailsMSKP} />
                  {/* Imaging */}
                  <Route exact path="/msk/imaging" component={ListMSKI} />
                  <Route exact path="/msk/imaging/create" component={FormMSKI} />
                  <Route  path="/msk/imaging/:id" component={DetailsMSKI} />                  
                  {/* Histo */}
                  <Route exact path="/msk/histology" component={ListMSKH} />
                  <Route exact path="/msk/histology/create" component={FormMSKH} />
                  <Route  path="/msk/histology/:id" component={DetailsMSKH} />
                   {/* Cyto */}
                   <Route exact path="/msk/cytology" component={ListMSKC} />
                  <Route exact path="/msk/cytology/create" component={FormMSKC} />
                  <Route  path="/msk/cytology/:id" component={DetailsMSKC} /> 
                   {/* Clinical */}
                   <Route exact path="/msk/clinicalTests" component={ListMSKCT} />
                  <Route exact path="/msk/clinicalTests/create" component={FormMSKCT} />
                  <Route  path="/msk/clinicalTests/:id" component={DetailsMSKCT} />          
                  {/* Hema--------------------------------------------------------------------- */}
                  <Route exact path="/hemeonc" component={Hema} />
                  {/* Micro */}
                  <Route exact path="/hemeonc/microbiology" component={ListHemaM} />
                  <Route exact path="/hemeonc/microbiology/create" component={FormHemaM} />
                  <Route  path="/hemeonc/microbiology/:id" component={DetailsHemaM} />
                  {/* Patho */}
                  <Route exact path="/hemeonc/pathology" component={ListHemaP} />
                  <Route exact path="/hemeonc/pathology/create" component={FormHemaP} />
                  <Route  path="/hemeonc/pathology/:id" component={DetailsHemaP} />
                  {/* Imaging */}
                  <Route exact path="/hemeonc/imaging" component={ListHemaI} />
                  <Route exact path="/hemeonc/imaging/create" component={FormHemaI} />
                  <Route  path="/hemeonc/imaging/:id" component={DetailsHemaI} />                  
                  {/* Histo */}
                  <Route exact path="/hemeonc/histology" component={ListHemaH} />
                  <Route exact path="/hemeonc/histology/create" component={FormHemaH} />
                  <Route  path="/hemeonc/histology/:id" component={DetailsHemaH} />
                   {/* Cyto */}
                   <Route exact path="/hemeonc/cytology" component={ListHemaC} />
                  <Route exact path="/hemeonc/cytology/create" component={FormHemaC} />
                  <Route  path="/hemeonc/cytology/:id" component={DetailsHemaC} /> 
                   {/* Clinical */}
                   <Route exact path="/hemeonc/clinicalTests" component={ListHemaCT} />
                  <Route exact path="/hemeonc/clinicalTests/create" component={FormHemaCT} />
                  <Route  path="/hemeonc/clinicalTests/:id" component={DetailsHemaCT} />  
                  {/* Neuro--------------------------------------------------------------------- */}
                  <Route exact path="/neurology" component={Neuro} />
                  {/* Micro */}
                  <Route exact path="/neurology/microbiology" component={ListNeuroM} />
                  <Route exact path="/neurology/microbiology/create" component={FormNeuroM} />
                  <Route  path="/neurology/microbiology/:id" component={DetailsNeuroM} />
                  {/* Patho */}
                  <Route exact path="/neurology/pathology" component={ListNeuroP} />
                  <Route exact path="/neurology/pathology/create" component={FormNeuroP} />
                  <Route  path="/neurology/pathology/:id" component={DetailsNeuroP} />
                  {/* Imaging */}
                  <Route exact path="/neurology/imaging" component={ListNeuroI} />
                  <Route exact path="/neurology/imaging/create" component={FormNeuroI} />
                  <Route  path="/neurology/imaging/:id" component={DetailsNeuroI} />                  
                  {/* Histo */}
                  <Route exact path="/neurology/histology" component={ListNeuroH} />
                  <Route exact path="/neurology/histology/create" component={FormNeuroH} />
                  <Route  path="/neurology/histology/:id" component={DetailsNeuroH} />
                   {/* Cyto */}
                   <Route exact path="/neurology/cytology" component={ListNeuroC} />
                  <Route exact path="/neurology/cytology/create" component={FormNeuroC} />
                  <Route  path="/neurology/cytology/:id" component={DetailsNeuroC} /> 
                   {/* Clinical */}
                   <Route exact path="/neurology/clinicalTests" component={ListNeuroCT} />
                  <Route exact path="/neurology/clinicalTests/create" component={FormNeuroCT} />
                  <Route  path="/neurology/clinicalTests/:id" component={DetailsNeuroCT} />  
                  {/* Endo--------------------------------------------------------------------- */}
                  <Route exact path="/endocrine" component={Endo} />
                  {/* Micro */}
                  <Route exact path="/endocrine/microbiology" component={ListEndoM} />
                  <Route exact path="/endocrine/microbiology/create" component={FormEndoM} />
                  <Route  path="/endocrine/microbiology/:id" component={DetailsEndoM} />
                  {/* Patho */}
                  <Route exact path="/endocrine/pathology" component={ListEndoP} />
                  <Route exact path="/endocrine/pathology/create" component={FormEndoP} />
                  <Route  path="/endocrine/pathology/:id" component={DetailsEndoP} />
                  {/* Imaging */}
                  <Route exact path="/endocrine/imaging" component={ListEndoI} />
                  <Route exact path="/endocrine/imaging/create" component={FormEndoI} />
                  <Route  path="/endocrine/imaging/:id" component={DetailsEndoI} />                  
                  {/* Histo */}
                  <Route exact path="/endocrine/histology" component={ListEndoH} />
                  <Route exact path="/endocrine/histology/create" component={FormEndoH} />
                  <Route  path="/endocrine/histology/:id" component={DetailsEndoH} />
                   {/* Cyto */}
                   <Route exact path="/endocrine/cytology" component={ListEndoC} />
                  <Route exact path="/endocrine/cytology/create" component={FormEndoC} />
                  <Route  path="/endocrine/cytology/:id" component={DetailsEndoC} /> 
                   {/* Clinical */}
                   <Route exact path="/endocrine/clinicalTests" component={ListEndoCT} />
                  <Route exact path="/endocrine/clinicalTests/create" component={FormEndoCT} />
                  <Route  path="/endocrine/clinicalTests/:id" component={DetailsEndoCT} />   
                  {/* Gastro--------------------------------------------------------------------- */}
                  <Route exact path="/gastrointestinal" component={Gastro} />
                  {/* Micro */}
                  <Route exact path="/gastrointestinal/microbiology" component={ListGastroM} />
                  <Route exact path="/gastrointestinal/microbiology/create" component={FormGastroM} />
                  <Route  path="/gastrointestinal/microbiology/:id" component={DetailsGastroM} />
                  {/* Patho */}
                  <Route exact path="/gastrointestinal/pathology" component={ListGastroP} />
                  <Route exact path="/gastrointestinal/pathology/create" component={FormGastroP} />
                  <Route  path="/gastrointestinal/pathology/:id" component={DetailsGastroP} />
                  {/* Imaging */}
                  <Route exact path="/gastrointestinal/imaging" component={ListGastroI} />
                  <Route exact path="/gastrointestinal/imaging/create" component={FormGastroI} />
                  <Route  path="/gastrointestinal/imaging/:id" component={DetailsGastroI} />                  
                  {/* Histo */}
                  <Route exact path="/gastrointestinal/histology" component={ListGastroH} />
                  <Route exact path="/gastrointestinal/histology/create" component={FormGastroH} />
                  <Route  path="/gastrointestinal/histology/:id" component={DetailsGastroH} />
                   {/* Cyto */}
                   <Route exact path="/gastrointestinal/cytology" component={ListGastroC} />
                  <Route exact path="/gastrointestinal/cytology/create" component={FormGastroC} />
                  <Route  path="/gastrointestinal/cytology/:id" component={DetailsGastroC} /> 
                   {/* Clinical */}
                   <Route exact path="/gastrointestinal/clinicalTests" component={ListGastroCT} />
                  <Route exact path="/gastrointestinal/clinicalTests/create" component={FormGastroCT} />
                  <Route  path="/gastrointestinal/clinicalTests/:id" component={DetailsGastroCT} />  
                  {/* Genito--------------------------------------------------------------------- */}
                  <Route exact path="/genitourinary" component={Genito} />
                  {/* Micro */}
                  <Route exact path="/genitourinary/microbiology" component={ListGenitoM} />
                  <Route exact path="/genitourinary/microbiology/create" component={FormGenitoM} />
                  <Route  path="/genitourinary/microbiology/:id" component={DetailsGenitoM} />
                  {/* Patho */}
                  <Route exact path="/genitourinary/pathology" component={ListGenitoP} />
                  <Route exact path="/genitourinary/pathology/create" component={FormGenitoP} />
                  <Route  path="/genitourinary/pathology/:id" component={DetailsGenitoP} />
                  {/* Imaging */}
                  <Route exact path="/genitourinary/imaging" component={ListGenitoI} />
                  <Route exact path="/genitourinary/imaging/create" component={FormGenitoI} />
                  <Route  path="/genitourinary/imaging/:id" component={DetailsGenitoI} />                  
                  {/* Histo */}
                  <Route exact path="/genitourinary/histology" component={ListGenitoH} />
                  <Route exact path="/genitourinary/histology/create" component={FormGenitoH} />
                  <Route  path="/genitourinary/histology/:id" component={DetailsGenitoH} />
                   {/* Cyto */}
                   <Route exact path="/genitourinary/cytology" component={ListGenitoC} />
                  <Route exact path="/genitourinary/cytology/create" component={FormGenitoC} />
                  <Route  path="/genitourinary/cytology/:id" component={DetailsGenitoC} /> 
                   {/* Clinical */}
                   <Route exact path="/genitourinary/clinicalTests" component={ListGenitoCT} />
                  <Route exact path="/genitourinary/clinicalTests/create" component={FormGenitoCT} />
                  <Route  path="/genitourinary/clinicalTests/:id" component={DetailsGenitoCT} />                                        
                                                                                                  
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
