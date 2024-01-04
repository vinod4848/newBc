const Image = require("../models/imageModel");
const AWS = require('aws-sdk');
const fs = require('fs');


const uploadImage = async (file) => {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const region = "AP-SOUTH-1";
  const accessKeyId = process.env.AWS_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_SECRET_KEY;

  const s3 = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region,
  });

  const fileName = `Event/${file.originalname}`;

  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(file.path);

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileStream,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading to S3:", err);
        reject(err);
      }
      console.log("S3 Upload Data:", data);
      resolve(data.Location);
    });
  });
};

const imageController = {
    createImage: async (req, res) => {
        try {
          const { file } = req;
          if (!file) {
            return res.status(400).json({ error: 'No file provided' });
          }
    
          const { title } = req.body; 
    
          if (!title) {
            return res.status(400).json({ error: 'Title is required' });
          }
    
          const image = await uploadImage(file);
    
          if (!image) {
            return res.status(500).json({ error: 'Failed to upload image' });
          }
    
          const newImage = new Image({
            title: title,
            images: image,
          });
    
          await newImage.save();
          return res.status(201).json(newImage);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      },

  getAllImages: async (req, res) => {
    try {
      const images = await Image.find();
      res.json(images);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = imageController;
