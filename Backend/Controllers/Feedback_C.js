const Feedback_M = require('../Models/Feedback')

//___---- Get All Feedbacks----___

async function getAllFeedbacks(req, res) {
    try {
      const Feedbacks = await Feedback_M.find().populate('userId').populate('cityAreaId');
      return res.status(200).json(Feedbacks);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Feedbacks " });    
    }
  }
  
//___---- Get Feedback by Id----___

async function getFeedback(req, res) {
    try {
      const id = req.params.id
      const FeedbackId = await Feedback_M.findById(id).populate('userId').populate('cityAreaId')
      return res.status(200).json(FeedbackId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get Feedback by Id " });    
    }
  }

  
//___---- Create Feedback----___

async function addFeedback(req, res) {
  try {
    const FeedData = req.body;
    const { userId, feedback,cityAreaId } = FeedData;

    // Check required fields
    if (!userId || !feedback || !cityAreaId) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Create feedback in the database
    const Create_Feedback = await Feedback_M.create({
      userId, feedback,cityAreaId
    });

    // Send response with created feedback
    res.status(201).json(Create_Feedback);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to Add Feedback" });
  }
}
  
//___---- Update Feedback----___

async function updateFeedback(req, res) {
    try {
      const FeedbackId = req.params.id;
      const {name,feedback} = req.body;
      const updated=await Feedback_M.findByIdAndUpdate(FeedbackId,{name,feedback},{new:true});
      if (!updated) return res.status(404).json({ message: `Failed to Update Feedback because it is not found` });
      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to Update Feedback" });
    }
  }

  
//___---- Delete Feedback----___

async function deleteFeedback(req, res) {
    try {
      const FeedbackId = req.params.id;
      const deleted = await Feedback_M.findByIdAndDelete(FeedbackId);
      if (!deleted) return res.status(404).json({ message: `Failed to Delete Feedback because .It is not Found` });
      return res.status(200).json(deleted);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: `Failed to delete Feedback` });
    }
  }
  module.exports = {
    getAllFeedbacks,
    getFeedback,
    addFeedback,
    updateFeedback,
    deleteFeedback
  }

