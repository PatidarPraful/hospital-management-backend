import express from "express";
import {config} from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js"
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js"
import  appointmentRouter from "./router/appointmentRouter.js"

const app = express();

config({path : "./config/config.env"});

// app.use(
//     cors({
//     origin : [process.env.FRONTEND_URI,process.env.DASHBOARD_URI],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials : true,
// })
// );

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [process.env.FRONTEND_URI, process.env.DASHBOARD_URI];
      if (!origin) return callback(null, true); // Allow requests without origin (e.g., Postman)
      if (allowedOrigins.includes(origin)) {
        callback(null, true); // Allow origin
      } else {
        callback(new Error(`CORS policy does not allow access from origin: ${origin}`));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,  // Allow cookies to be sent with requests
  })
);

// Handle preflight requests
app.options('*', cors());  // Pre-flight handling for all routes


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp/",
}  
));

//routes
app.use("/api/v1/message", messageRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/appointment", appointmentRouter)

dbConnection()

app.use(errorMiddleware)

export default app;
