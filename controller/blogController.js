const Blog = require("../models/blogModel");
const AWS = require("aws-sdk");
const fs = require("fs");
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

  const fileName = `Blog/${file.originalname}`;
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
const blogController = {
  addBlog: async (req, res) => {
    try {
      const newBlog = new Blog(req.body);
      const savedBlog = await newBlog.save();
      res.status(201).json(savedBlog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getAllBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  searchBlogByTitle: async (req, res) => {
    try {
      const { title } = req.query;

      if (!title) {
        return res
          .status(400)
          .json({ message: "Please provide a title parameter" });
      }

      const blogs = await Blog.find({ title: new RegExp(title, "i") });

      if (blogs.length === 0) {
        return res
          .status(404)
          .json({ message: "No blogs found with the provided title" });
      }

      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getBlogById: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateBlog: async (req, res) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  uploadBlogImage: async (req, res) => {
    try {
      const file = req.file;
      const image = await uploadImage(file);
      const updateData = { ...req.body, image };

      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updatedBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteBlog: async (req, res) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
      if (!deletedBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
module.exports = blogController;
