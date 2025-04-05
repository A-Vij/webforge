import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path"

import authRoutes from "./routes/auth.route.js"
import tutRoutes from "./routes/tutorial.route.js"
import sysRoutes from "./routes/system.route.js"

import connectDB from "./db/connectDB.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 8000;
const __dirname =  path.resolve();

app.use(cors({origin: "http://localhost:5173", credentials: true}));


app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/tutorials", tutRoutes);
app.use("/quest", sysRoutes);

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/client/dist")));
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    });
}


app.listen(PORT, ()=>{
    connectDB();
    console.log("running on port", PORT);
})
