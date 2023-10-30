import mongoose from 'mongoose';
import 'dotenv/config';

const URL_DB = process.env.DB_MONGO_ATLAS;
export const init = async () => {
    try {
        console.log("URL_DB", URL_DB)
        await mongoose.connect(URL_DB);
        console.log('Database conected 🚀');
    } catch (error) {
        console.log('Ah ocurrido un error al intentar conectarnos a la DB', error.message);
    }
}