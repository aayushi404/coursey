const express = require("express");
const courseRouter = express.Router();
const { courseModel, purchaseModel } = require("../db");
const { authenticateUser, authenticateAdmin } = require("../middlewares/auth");

courseRouter.get("/", async (req, res, next) => {
    try {
        const courses = await courseModel.find();
        res.status(200).json({ courses });
    } catch (err) {
        next(err);
    }
});
courseRouter.get("/course/:id", async (req, res, next) => {
    try {
        const course = await courseModel.findById(req.params.id);
        if (!course) res.status(404).json({ message: "data not found" });
        else res.json({ course });
    } catch (err) {
        next(err);
    }
});
courseRouter.post("/course", authenticateAdmin, async (req, res, next) => {
    try {
        const { title, description, duration, price } = req.body;
        await courseModel.create({
            title,
            description,
            duration,
            price,
            createrId: req.user.id
        });
        res.status(200).json({ message: "sucessfully created course" });
    } catch (err) {
        next(err);
    }
})
courseRouter.put("/course/:id", authenticateAdmin, async (req, res, next) => {
    try {
        const { title, description, duration, price } = req.body;
        const course = await courseModel.findById(req.params.id);
        course.title = title;
        course.description = description;
        course.duration = duration;
        course.price = price;
        course.save();
        res.json({ message: "sucessfully updated" });
    } catch (err) {
        next(err);
    }
});
courseRouter.delete("/course/:id", authenticateAdmin, async (req, res, next) => {
    try {
        await courseModel.findByIdAndDelete(req.params.id)
        res.json({ messahe: "course sucessfully deleted" });
    } catch (err) {
        next(err);
    }
});
courseRouter.get("/purchase/:id", authenticateUser, async (req, res, next) => {
    try {
        const courseId = req.params.id;
        const userId = req.user.id;
        await purchaseModel.create({ userId, courseId });
        res.json({ message: "course purchased" });
    } catch (err) {
        next(err);
    }
})
module.exports = courseRouter