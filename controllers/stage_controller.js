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
  const { id } = req.params;
  await Stage_Model.findByIdAndDelete(id);
  res.status(200).json({ message: "Stage Has Been Deleted" });
});
const updateStage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await Stage_Model.findByIdAndUpdate(id, { name });
  res.status(200).json({ message: "Stage Has Been Deleted" });
});

const reorderStages = asyncHandler(async (req, res) => {
  const { stageId, position } = req.body;
  const stages = await Stage_Model.find({});
  if (stages.length < position) {
    return res
      .status(400)
      .json({ message: "Item position cannot be greater then total length" });
  }
  // [ 1, 2, 3];
  let isPlus;
  stages.forEach(async (item) => {
    if (item.id === stageId) {
      item.position > position ? (isPlus = true) : (isPlus = false);
      item.position = position;
      await item.save();
    }
    if (isPlus) {
      if (item.position <= position && item.id !== stageId) {
        item.position += 1;
        await item.save();
      }
    } else {
      if (item.position >= position && item.id !== stageId) {
        item.position -= 1;
        await item.save();
      }
    }
  });
  res.status(200).json({ message: "items reordered" });
});

module.exports = {
  getAllStages,
  getStageById,
  createStage,
  deleteStage,
  updateStage,
  reorderStages,
};
