import mongoose from "mongoose"
const { Schema, models, model } = mongoose

const schema = new Schema({
    uid: { type: String, required: true, unique: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
}, { timestamps: true })

export default models.users || model("users", schema);
