// function add(a, b) {
//     return a + b;
// }

// let result = add (10 , 30);

// console.log(result);

// const add = (a, b) => a + b;

// console.log(add(20, 10));

//  Callback function 

// function greet(name, callback) {
//     console.log(`Hi ${name}`);

//     callback(); 
// }


// function End() {
//     console.log("end");
// }

// greet("Rahul", End);


// function getUser() {
//     return new Promise((resolve, reject)=> {

//         setTimeout(() => {
//             const user = {      
//                 id: 1,
//                 name: "Aman"
//             };
//             resolve(user);
//         }, 2000);
//     });
    
// }

// getUser()
//    .then((user) => {
//     console.log(user);
//    })
//    .catch((err) => {
//       console.log(err);
//    });

// import express from "express";

// const app = express();

// app.get('/' ,(req, res)=>{
//     res.send("Server is running"); 
// })

//home  route
// app.get('/home' , (req, res) =>{
//     res.send("this is home");
// });
// // about
// app.get('/about', (req, res)=>{
//     res.send('this is about'); 
// });
// // Contact  
// app.get('/contact', (req, res)=>{
//     res.send('this is contact route')
// });

// const PORT = 5000;

// app.listen(PORT, ()=>{
//     console.log(`Server Runnin on ${PORT}`);
// })


import express from "express";
import { pathToFileURL } from "node:url";
import "dotenv/config";

import requestLogger from "./middleware/logger.js";
import routes from "./routes/taskRoute.js";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(requestLogger);
app.use("/", routes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "CRUD API is running",
        routes: [
            "GET /task",
            "GET /task/:id",
            "POST /createtask",
            "PUT /updatetask/:id",
            "DELETE /deletetask/:id"
        ]
    });
});

const startServer = async () => {
    try {
        if (process.env.MONGODB_URI) {
            await connectDB();
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
    startServer();
}

export default app;
