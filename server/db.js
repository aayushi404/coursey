const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    firstname: String,
    lastname:String,
    password: String,
    email: { type: String, unique: true }
});

const adminSchema = new Schema({
    firstname: String,
    lastname:String,
    password: String,
    email: { type: String, uniqu: true }
});

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    duration: String,
    createrId: ObjectId
});

const purchaseSchema = new Schema({
    courseId: ObjectId,
    userId: ObjectId
})

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}
