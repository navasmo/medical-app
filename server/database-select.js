const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('PatientData.db');

let sql = `SELECT treatId, name, category, allergies, prescription, startDate FROM PatientsData
           ORDER BY name`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log("TreatmentID=" + row.treatId + " name ="+row.name+ " Category ="+row.category+ 
    " Allergies ="+row.allergies+ "Prescription ="+row.prescription+ "StartDate ="+row.startDate);
  
  });
  });


// close the database connection
db.close();