import mongoose from "mongoose"
const { Schema, models, model } = mongoose

const schema = new Schema({
    uid: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    dueDate: { type: Date, default: () => Date.now() + 7 * 24 * 60 * 60 * 1000 }, // Default to one week from now
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    isCompleted: { type: Boolean, default: false },
    image: { type: String, default: null }
}, { timestamps: true })

export default models.Todo || model("Todo", schema)