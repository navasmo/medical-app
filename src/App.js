import React from 'react';
import Header from './Header';
import TreatmentRecordPanel from './MedicalTreatmentPanel';
import PatientTable from './Table';
import "./app.scss" 
//imported dependecies and app components.

function App() {
  return (
    /* three main app components are used for the app which are 
    header, Treatment record panel, and the Patient table which is used
    to display and manipulate data */

    <div className="App" >
       <Header/>
       <TreatmentRecordPanel />
       <PatientTable/>
    </div>
  );
}

export default App;
 