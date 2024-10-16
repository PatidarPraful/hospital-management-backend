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

app.use(
    cors({
    origin : [process.env.FRONTEND_URI,process.env.DASHBOARD_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus: 200, // For legacy browser support
})
);



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp/",
}  
));

app.set("trust proxy", 1);

//routes
app.use("/api/v1/message", messageRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/appointment", appointmentRouter)

dbConnection()

app.use(errorMiddleware)

export default app;
