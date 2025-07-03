require("dotenv").config();
const USER_JWT_SECRET_TOKEN = process.env.USER_JWT_SECRET_TOKEN;
const ADMIN_JWT_SECRET_TOKEN = process.env.ADMIN_JWT_SECRET_TOKEN;

module.exports = { USER_JWT_SECRET_TOKEN, ADMIN_JWT_SECRET_TOKEN };