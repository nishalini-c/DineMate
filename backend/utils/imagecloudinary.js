import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET,

})
const uploadCloudinary=async(path,folder="table") => {
    try{
        const data=await cloudinary.uploader.upload(path, { folder: folder});
            return ({publicId:data.public_id,url:data.secure_url});

            }catch(err){
                console.log(`Error in uploading image to clodinary ${err}`);
                throw err;

    }
};
export default uploadCloudinary;