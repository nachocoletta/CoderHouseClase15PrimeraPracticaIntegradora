import mongoose from 'mongoose';
import 'dotenv/config';

const URL_DB = process.env.DB_MONGO_ATLAS;
// const URL_DB = 'mongodb+srv://developer:Zu9gxjCZxXIBdojT@cluster0.mttdfot.mongodb.net/'
export const init = async () => {
    try {
        console.log("URL_DB", URL_DB)
        await mongoose.connect(URL_DB);
        console.log('Database conected 🚀');
    } catch (error) {
        console.log('Ah ocurrido un error al intentar conectarnos a la DB', error.message);
    }
}