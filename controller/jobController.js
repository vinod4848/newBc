const Job = require("../models/jobModel");

const jobController = {
  getAllJobs: async (req, res) => {
    try {
      const jobs = await Job.find();
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getJobById: async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.status(200).json(job);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  searchJobByTitle: async (req, res) => {
    try {
      const { title } = req.query;

      if (!title) {
        return res
          .status(400)
          .json({ message: "Please provide a title parameter" });
      }

      const jobs = await Job.find({ title: new RegExp(title, "i") });

      if (jobs.length === 0) {
        return res
          .status(404)
          .json({ message: "No jobs found with the provided title" });
      }

      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  addJob: async (req, res) => {
    try {
      const newJob = new Job(req.body);
      const savedJob = await newJob.save();
      res.status(201).json(savedJob);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  updateJob: async (req, res) => {
    try {
      const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updatedJob) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.status(200).json(updatedJob);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteJob: async (req, res) => {
    try {
      const deletedJob = await Job.findByIdAndDelete(req.params.id);
      if (!deletedJob) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  approvejob: async (req, res) => {
    try {
      const { jobId } = req.params;

      if (req.user.role !== "admin") {
        return res
          .status(403)
          .json({ message: "Unauthorized to approve jobs" });
      }

      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Matrimonial not found" });
      }

      job.isApproved = true;
      job.isPublic = true;
      await job.save();

      res
        .status(200)
        .json({ message: "Matrimonial approved successfully", job });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = jobController;
