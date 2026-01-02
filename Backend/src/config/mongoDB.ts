import mongoose from "mongoose";
import logger from "../utilities/logger";

export const mongooseConnection = () => {
    try {
        logger.info("Tyring to connect DB...")
        mongoose.connect(process.env.MONGO_URI as string)
            .then(() => {
                logger.info("Mongoose Connected Successfully...")
            })
            .catch((err) => {
                logger.error("Faild to connect mongoose", err)

            })
    } catch (err) {
        process.exit(1)
    }
}