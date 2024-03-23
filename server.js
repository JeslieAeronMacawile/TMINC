const express = require('express');
const SQLQuery = require('./sqlServices.js')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(bodyParser.json());

//Enable For Deployment
app.use(express.static("build"))

// Define a route for the root URL
// app.get('/', (req, res) => {
//     res.send('Hello, Express!');
// });

app.get('/api/loginUser', async (req, res) => {

    console.log(req?.query)

    const { email = "", pass = "" } = req.query


    if (email.length == 0 || pass.length == 0) {
        res.status(400).json("Invalid Email and/or Password")
    } else {
        var responseValue = await SQLQuery(`select * from AccountInfo where StudentID = '${email}' AND acctPassword = '${pass}'`, "GET")
        console.log(responseValue)
        res.send(responseValue);
    }

    //res.send("HELLO WORLD!");
});

app.get('/api/getAccountInfo', async (req, res) => {

    const { id = "" } = req.query

    var responseValue = await SQLQuery(`select * from StudentInfo where StudentID = '${id}'`, "GET")
    console.log(responseValue)
    res.send(responseValue);

    //res.send("HELLO WORLD!");
});

app.post("/api/postEnrollment", (req, res) => {

    try {
        var requestBody = req.body

        console.log(requestBody)
        // if (requestBody.action.toUpperCase() == "ADD") {
        //     var SQLResult = SQLQuery(`INSERT INTO enrollmentList (UserID, Email, AcctPassword, FName,MName, LName, enrollStatus ) VALUES ('${userID}', '${email}', '${pass}', '${fName}', '${mName}', '${lName}', '${status}');`, "POST")
        //     console.log(SQLResult)
        //     res.send("Success");
        // }



        // else if (requestBody.action.toUpperCase() == "DELETE") {
        //     console.log("PASS")
        //     var SQLResult = SQLQuery(`delete Lib_Category where Id = '${requestBody.Id}'`, "POST")
        //     console.log(SQLResult)
        //     res.send("Success");
        // } else if (requestBody.action.toUpperCase() == "EDIT") {
        //     var SQLResult = SQLQuery(`update Lib_Category SET CategoryName = '${requestBody.categoryName}', UpdateDate = GETDATE(), UpdateUser = '${requestBody.user}' WHERE Id = '${requestBody.Id}'`, "POST")
        //     res.send("Success");
        // } 
        // else {
        //     res.status(500).send("Error executing query");
        // }
    } catch (err) {
        res.status(500).send("Error executing query");
        console.log(err)
    }

});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});