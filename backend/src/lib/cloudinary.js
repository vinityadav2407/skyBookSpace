import {v2 as cloudinary} from 'cloudinary';
import 'dotenv/config';

cloudinary.config({

    cloud_name:process.env.COLUDINARY_CLOUD_NAME,
    api_key:process.env.COLUDINARY_API_KEY,
    api_secret:process.env.COLUDINARY_SECRET_KEY,

})

export default cloudinary;