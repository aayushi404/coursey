const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { USER_JWT_SECRET_TOKEN } = require("../config");
const { purchaseModel, userModel, courseModel } = require("../db");
const bycrypt = require("bcrypt");
const { authenticateUser } = require("../middlewares/auth");

userRouter.post("/signUp", async ( req, res ) => {
    //will handle validation here
    const { firstname, lastname, email, password } = req.body;
    try {
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);
        await userModel.create({
            email,
            hashedPassword,
            firstname,
            lastname
        })
        res.status(200).json({message:"Successfully created the user"});
    } catch (err) {
        next(err);
    }
});
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) res.status(403).json({ message: "Invalid email" });
        if (!bycrypt.compare(password, user.password)) {
            res.status(403).json({ message: "Invalid password" });
        }
        const token = jwt.sign({
            id: user._id,
            firstname: user.firstname
        }, USER_JWT_SECRET_TOKEN);
        res.status(200).json({ token: token, username: user.firstname });
    } catch (err) {
        next(err);
    }
});

userRouter.get("/purchases", authenticateUser, async (req, res) => {
    const purchases = await purchaseModel.find({ userId: req.user.id });
    if (!purchases) res.json({ message: "No courses purchased" });
    const courseIds = [];
    for (let i = 0; i < purchases.length; i++){
        courseIds.push(purchases[i].courseId);
    }
    const courseData = await courseModel.find({ _id: { $in: courseIds } });
    res.status(200).json({
        purchases,
        courseData
    });
})
userRouter.get("/info", authenticateUser, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        res.json({
            id: user_id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        });
    } catch (err) {
        next(err);
    }
})
module.exports = userRouter