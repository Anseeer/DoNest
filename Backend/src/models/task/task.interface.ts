import { Document, Types } from "mongoose";

export interface ITask extends Document {
    title: string,
    description: string,
    completed: boolean,
    userId: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}