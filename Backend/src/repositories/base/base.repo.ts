import { Document, Model } from "mongoose";
import { IRead, IWrite } from "./base.repo.interface";
import logger from "../../utilities/logger";

export class BaseRepository<T extends Document> implements IWrite<T>, IRead<T> {

    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(item: Partial<T>): Promise<T> {
        try {
            const newItem = new this.model(item);
            return await newItem.save();
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error('Error :', errMsg);
            throw new Error(errMsg)
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const res = await this.model.deleteOne({ _id: id });
            return res.deletedCount > 0;
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error('Error :', errMsg);
            throw new Error(errMsg)
        }
    }

    async update(id: string, item: Partial<T>): Promise<T> {
        try {
            const updatedDoc = await this.model.findByIdAndUpdate(
                id,
                item,
                { new: true, runValidators: true }
            );

            if (!updatedDoc) {
                throw new Error("Faild to update doc");
            }
            return updatedDoc;
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error('Error :', errMsg);
            throw new Error(errMsg)
        }
    }

    async findByEmail(email: string): Promise<T | null> {
        try {
            const user = await this.model.findOne({ email });
            return user ?? null;
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error('Error :', errMsg);
            throw new Error(errMsg)
        }
    }

    async findById(id: string): Promise<T | null> {
        try {
            const user = await this.model.findById(id);
            return user ?? null;
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error('Error :', errMsg);
            throw new Error(errMsg)
        }
    }

} 