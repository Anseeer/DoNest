import mongoose, { Schema } from "mongoose";
import { ITask } from "./task.interface";

const taskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;