//imported dependecies such as hooks, material ui and axios
import React, {forwardRef, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid'
import MaterialTable from '@material-table/core';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
// material ui table componets 
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
// const api is used for connecting to the database using axios
const api = axios.create({
  baseURL: `http://localhost:8080`
})

// this function is used to display patient data on to a table.
function PatientTable() {

  var columns = [
    
    {title: "Treatment ID", field: "treatId",filtering:false},
    {title: "Full Name", field: "name",filtering:false},
    {title: "Category", field: "category", filtering:true},
//if the patient have allergies which is other than none in the input will be shown in red font.
    {title: "Allergies", field: "allergies",render:(rowData)=>
    <div style ={{color:rowData.allergies==="None"?"":"Red"}}><b>{rowData.allergies}</b> </div>},
//if the patinet does have precription with the treatment category it will be highleted in green font. 
    {title: "Prescription", field: "prescription", 
    render:(rowData)=><div style ={{color:rowData.prescription==="Yes"?"Green":""}}>{rowData.prescription}</div> },

    {title: "Start Dart", field: "startDate",filtering:false}
  ]
//table data
  const [data, setData] = useState([]); 

//for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
// hooks to retrive the data and display it on the table
  useEffect(() => { 
    api.get("/GetAllPatients")
        .then(res => {               
            setData(res.data.rows)
         })
         .catch(error=>{
             console.log("Error")
         })
  }, [])

  const handleRowUpdate = (newData, oldData, resolve) => {
//validation
    let errorList = []
    if(newData.treatId === ""){
      errorList.push("Please enter Treatment ID")
    }
    if(newData.name === ""){
      errorList.push("Please enter Full Name")
    }

    if(errorList.length < 1){
      api.put("/updatePatientsData/:name"+newData.id, newData)
      .then(res => {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
        resolve()
        setIserror(false)
        setErrorMessages([])
      })
      .catch(error => {
        setErrorMessages(["Update failed! Server error"])
        setIserror(true)
        resolve()
        
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }
    
  }

  const handleRowAdd = (newData, resolve) => {
  //validation
    let errorList = []
    if(newData.treatId === undefined){
      errorList.push("Please enter Treatment ID")
    }
    if(newData.name === undefined){
      errorList.push("Please enter Full Name")
    }
  //the user can add data on to the without the form..
    if(errorList.length < 1){ //no error
      api.post("/PatientsData/", newData)
      .then(res => {
        let dataToAdd = [...data];
        dataToAdd.push(newData);
        setData(dataToAdd);
        resolve()
        setErrorMessages([])
        setIserror(false)
      })
      .catch(error => {
        setErrorMessages(["Cannot add data. Server error!"])
        setIserror(true)
        resolve()
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }

    
  }

  const handleRowDelete = (oldData, resolve) => {
  // material ui  table also allow the user to remove data. 
    api.delete("/deletePatientsData/:name"+oldData.id)
      .then(res => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }




  return (
    <div className="App" >
      
      <Grid container spacing={1}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
          <div>
            {iserror && 
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
          </div>
            <MaterialTable
            // headers and data retrieved from the database and listed on material ui table
              title="Patients Record"
              columns={columns}
              data={data}
              icons={tableIcons}
              options={{filtering:true}}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                      handleRowUpdate(newData, oldData, resolve);
                      
                  }),
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    handleRowAdd(newData, resolve)
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDelete(oldData, resolve)
                  }),
              }}
            />
          </Grid>
          <Grid item xs={10}></Grid>
        </Grid>
    </div>
  );
}

export default PatientTable;