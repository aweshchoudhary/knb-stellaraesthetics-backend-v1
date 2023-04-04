const Stage_Model = require("../models/Stage_Model");
const asyncHandler = require("express-async-handler");

// Stage Functions
const getAllStages = asyncHandler(async (req, res) => {
  const stages = await Stage_Model.find({});
  res.status(200).json({ data: stages });
});
const getStageById = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const stage = await Stage_Model.findById(id);
  res.status(200).json({ data: stage });
});
const createStage = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const stages = Stage_Model.find({});
  const newStage = new Stage_Model({
    name,
  });
  const stage = await newStage.save();
  res
    .status(200)
    .json({ message: "Stage has been generated successfully", stage });
});
const deleteStage = asyncHandler(async (req, res) => {
  const { id } = req.body;
  await Stage_Model.findByIdAndDelete(id);
  res.status(200).json({ message: "Stage Has Been Deleted" });
});
const updateStage = asyncHandler(async (req, res) => {
  const { id, title } = req.body;
  await Stage_Model.findByIdAndUpdate(id, { title });
  res.status(200).json({ message: "Stage Has Been Deleted" });
});

module.exports = {
  getAllStages,
  getStageById,
  createStage,
  deleteStage,
  updateStage,
};
