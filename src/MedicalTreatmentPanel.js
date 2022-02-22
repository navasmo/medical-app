//imported dependecies. 
import React from "react";
import axios from 'axios';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'


function TreatmentRecordPanel() {
// assigned variebles and hooks to collect input data in the  patients form
  const [treatId, setID] = React.useState('');
  const [prescription, setPrescription] = React.useState('');
  const [allergies, setAllergies] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [Pname, setName] = React.useState('');
  const [startDate, setDate] = React.useState('');
  

{
//function to refresh the page when necessary
    function refreshPage() {
        window.location.reload(false);
      }
 // function to save patient data in accordance with the data base
    function saveNewPatient(){
        const value = {
            treatId: treatId,
            prescription: prescription,
            allergies: allergies,
            category: category,
            name: Pname,
            startDate: startDate,
        };
// axios.post along with server details to add data on to the database.
        axios.post('http://localhost:8080/PatientsData', value)
        .then( (response) => {
            // handle success
            var resData = response.data;
            let data = JSON.stringify(resData);
            window.alert("Response recieved from server = " + data);
        });
    }


// function to delete patient data in accordance with the database
    function deletePatientRecord(){
// axios.delete along with server details to remove data on to the database.
        axios.delete(`http://localhost:8080/deletePatientsData/${Pname}`)
        .then( (response) => {
            // handle success
            var resData = response.data;
            const data = JSON.stringify(resData);
            window.alert("Response recieved from server = " + data);
        });
    }
 // function to update patient data in accordance with the database
    function updatePatientRecord(){
        const value = {
            treatId: treatId,
            prescription: prescription,
            allergies: allergies,
            category: category,
            name: Pname,
            startDate: startDate,
        };
// axios.put along with server details to remove data on to the database.
        axios.put(`http://localhost:8080/updatePatientsData/${Pname}`, value)
        .then( (response) => {
            // handle success
            var resData = response.data;
            let data = JSON.stringify(resData);
            window.alert("Response recieved from server = " + data);
        });
    }
// function is used to save data along refresh the page once the task is complete.
    function SaveNPHandler(){
        saveNewPatient();
        refreshPage();
    }

// function to delete the data and to refresh page.
    function DeletePRHandler(){
        deletePatientRecord();
        refreshPage();
    }
// function to update the data.
    function UpdatePRHandler(){
        updatePatientRecord();
        refreshPage();
    }

    return (
        /*input boxes that allows user to enter the patient info as well as datalist is used to
        let the user choose from the options for category of treatment, allergies and prescription 
        followed by buttons to allow the user save, delete, and update data.
        */
        <div className="formHead">
        Type Patient Details Below
        <div className ="patient-form" align="center" >
          <Grid container spacing={1}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
              
            <table>
            <tbody>
            <tr>
            <td>
            <TextField type="text" placeholder='Treatment ID' value ={treatId} onChange ={e => setID(e.target.value) }/></td>
            
                     
            <td><TextField type="text" placeholder='Patient Name' value ={Pname} onChange ={e => setName(e.target.value) }/></td>
          
            
            <td>
            <input placeholder="Choose Category" type="text" list="category" value ={category} onChange ={e => setCategory(e.target.value) } />
            <datalist id="category">
            <option>Consulation</option>
            <option>Tests and Health Checkup</option>
            <option>ER Admission</option>
            <option>Medicines</option>
            <option>Vacination</option>
            <span></span>
            </datalist>
             
            </td>
            <td><input placeholder="Choose Allergies" type="text" list="allergies" value ={allergies} onChange ={e => setAllergies(e.target.value) } />
            <datalist id="allergies">
            <option>None</option>
            <option>Penicillin and related antibiotics</option>
            <option>Anticonvulsants</option>
            <option>Sulfonamides</option>
            <option>Chemotherapy Medicines</option>
            <span></span>
            </datalist></td>
         
            <td><input placeholder="Prescription Required" type="text" list="prescription" value ={prescription} onChange ={e => setPrescription(e.target.value) } />
            <datalist id="prescription">
            <option>Yes</option>
            <option>No</option>
            <span></span>
            </datalist></td>
            
            <td><TextField type="text" placeholder='Start Date' value ={startDate} onChange ={e => setDate(e.target.value) }/></td>
          
            </tr>
            </tbody>
            </table>

    <div className='Buttons'>
          <table>
              <tbody>
                  <tr>
          <td>  <Button color="primary" variant="contained" onClick={SaveNPHandler}>Add Patient</Button> 
            </td>
            <td><Button color="primary" variant="contained" onClick={DeletePRHandler}>Remove Patient</Button> 
            </td>
           <td> <Button color="primary" variant="contained" onClick={UpdatePRHandler}>Update Patient Info</Button> 
            </td> 
            <h3>.</h3>
            </tr>
            </tbody>
            </table>
       
           
            
    <div className='table'>
        
      
        </div>
        
        </div>
        </Grid>
          <Grid item xs={10}></Grid>
        </Grid>
        </div>
        </div>
    );
    

}
}
export default TreatmentRecordPanel;
