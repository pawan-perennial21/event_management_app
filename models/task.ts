// models/task.ts

import { Schema, model, Document } from "mongoose";


const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    isImportant: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: String,
        required: true,
    },
});

const TaskModel = model<any>("Task", TaskSchema);

export default TaskModel;
