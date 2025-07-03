const express = require('express');
const mongoose = require('mongoose');
const adminRouter = require("./router/admin");
const userRouter = require("./router/user");
const courseRouter = require("./router/course");
require("dotenv").config();
const cors = require('cors');

let corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow multiple origins
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended:'true' }));
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.PORT,
        () => console.log(`server started at port ${process.env.PORT}`));
}
main()