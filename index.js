const express = require("express");
const connectDB = require("./db");
require("dotenv").config();

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello, world!");
})

// import routes
const departmentRoutes = require("./department/route");
const employeeRoutes = require("./employee/route");

app.use("/departments", departmentRoutes);
app.use("/employees", employeeRoutes);  


// connect tp database
connectDB()
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((error) => {
        console.error("Error connecting to the database", error);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});







// const http = require("http");

// const hostname = "0.0.0.0";
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Contemt-Type", "text/plain");
//   res.end("Hello, World!\n");
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });