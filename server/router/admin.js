const express = require("express");
const bycrypt = require("bcrypt");
const adminRouter = express.Router();
const jwt = require("jsonwebtoken");
const { adminModel, userModel } = require("../db");
const { ADMIN_JWT_SECRET_TOKEN } = require("../config");
const { authenticateAdmin } = require("../middlewares/auth");

adminRouter.post("/signUp", async (req, res) => {
    //will handle validation here
    const { firstname, lastname, email, password } = req.body;
    try {
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);
        await adminModel.create({
            email:email,
            password:hashedPassword,
            firstname:firstname,
            lastname:lastname
        })
        res.status(200).json({message:'Successfully created the admin'});
    } catch (err) {
        next(err);
    }
});

adminRouter.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const admin = await adminModel.findOne({ email });
        if (!admin) res.status(403).json({ message: "Invalid email" });
        else if (!bycrypt.compare(password, admin.password)) {
            res.status(403).json({ message: "Invalid password" });
        }
        else {
            const token = jwt.sign({
                id: admin._id,
                firstname: admin.firstname
            }, ADMIN_JWT_SECRET_TOKEN);
            res.status(200).json({ token: token, username: admin.firstname});
        }
        
    } catch (err) {
        next(err);
    }
})
adminRouter.get("/info", authenticateAdmin, async (req, res, next) => {
    try {
        const admin = await adminModel.findById(req.user.id);
        res.status(200).json({
            id: admin._id,
            firstname: admin.firstname,
            lastname: admin.lastname,
            email: admin.email
        });
    } catch (error) {
        next(error);
    }
});
adminRouter.get("/users", authenticateAdmin, async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (err) {
        next(err);
    }
})
module.exports = adminRouter;