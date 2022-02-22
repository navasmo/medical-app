var express = require("express")
var cors = require('cors');
var bodyParser = require("body-parser");
var db = require("./database.js")

var app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8080 

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});


// Root endpoint
app.get("/", (req, res, next) => {
   res.json({"message":"Ok"})
});



// list all patients
app.get("/GetAllPatients", (req, res, next) => {
    console.log("SELECT Patient");
    let sql = `SELECT treatId, name, category, allergies, prescription, startDate FROM PatientsData ORDER BY name`;
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            rows
        })
      });
});

// Get patient by name
app.get("/PDS/:name", (req, res, next) => {
    var sql = "select * from PatientsData where name = ?"
    var params = [req.params.name]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

// Create new patient
app.post("/PatientsData/", (req, res, next) => {
    console.log("Create Patient");
    var errors=[]
    if (!req.body.name){
        errors.push("Patient details was not entered properly");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
        treatId : req.body.treatId,
        name: req.body.name,
        category: req.body.category,
        allergies: req.body.allergies,
        prescription: req.body.prescription,
        startDate: req.body.startDate
    }
    var sql ='INSERT INTO PatientsData (treatId, name, category, allergies, prescription, startDate) VALUES (?,?,?,?,?,?)'
    var params =[data.treatId, data.name, data.category, data.allergies, data.prescription, data.startDate ]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "messages": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});


// update patient info
// we use COALESCE function to keep the current value if there is no new value (null)
app.put("/updatePatientsData/:name", (req, res, next) => {
    console.log("UPDATE Patient : " + req.params.name);
    var data = {
        treatId : req.body.treatId,
        name: req.body.name,
        category: req.body.category,
        allergies: req.body.allergies,
        prescription: req.body.prescription,
        startDate: req.body.startDate
    }
    console.log("UPDATE Patient : " + req.params.name);
    db.run(
        `UPDATE PatientsData set 
        treatId = COALESCE(?,treatId), 
        name = COALESCE(?,name),
           category = COALESCE(?,category),
           prescription = COALESCE(?,prescription),
           allergies = COALESCE(?,allergies),
           startDate = COALESCE(?,startDate),
             WHERE name = ?`,
             [data.treatId, data.name, data.category, data.allergies, data.prescription, data.startDate, req.params.name],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data, 
                changes: this.changes
            })
    });
})

// delete patient info
app.delete("/deletePatientsData/:name", (req, res, next) => {

    console.log("DELETE Patient : " + req.params.name);

    db.run(
        'DELETE FROM PatientsData WHERE name = ?',
        req.params.name,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})




// Default response for any other request
app.use(function(req, res){
    res.status(404);
});