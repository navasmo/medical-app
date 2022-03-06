var sqlite3 = require('sqlite3').verbose()

// open the database
let db = new sqlite3.Database('PatientData.db', (err) => {
    if (err) {
      console.error(err.message);
      throw err
    }
    console.log('Connected to the Patients Data database.');
  });


  // create table 'PatientsData'
  const sql='CREATE TABLE PatientsData (treatId int,name varchar(25), category varchar(40),  allergies varchar(40), prescription varchar(10), startDate date)';
  db.run(sql, (err) => {
    if (err) {
        // Table already created 
        console.log('Table already created.');
    }else{
      console.log('Table created.');
      
      // First time Table created, insert some rows
      console.log('First time Table created, creating some rows.');
      
      var insert = 'INSERT INTO PatientsData(treatId, name, category, allergies, prescription, startDate) VALUES(?,?,?,?,?,?)';
      db.run(insert, ['091',	'Allen Smith',	'Consultation',	'None',	'Yes',	'10/04/19]']);
      
    }
  });


// export as module, called db
module.exports = db
