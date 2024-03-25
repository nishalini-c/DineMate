import cloudinary from "../utils/imagecloudinary";
import Image from "../model/imagemodel";

const uploadImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const newImage =  Image.create({
            url: result.url,
            public_id: result.public_id
        });
          res.status(200).json({
            success: true,
            message: 'Your Image uploaded successfully',
            image: newImage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export{
    uploadImage
};
