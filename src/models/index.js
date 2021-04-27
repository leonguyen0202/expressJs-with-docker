import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

// Create new folder of your models and define its below.

export default db;
