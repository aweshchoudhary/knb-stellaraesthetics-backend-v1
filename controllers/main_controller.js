const Stage_Model = require("../models/Stage_Model");
const Card_Model = require("../models/Card_Model");
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

// Card Functions
const createCard = asyncHandler(async (req, res) => {
  const newCard = new Card_Model({
    ...req.body,
  });
  const card = await newCard.save();
  await Stage_Model.findByIdAndUpdate(req.body.stage, {
    $push: { items: card._id },
  });
  res.status(200).json({ message: "Card has been created", data: card });
});
const getCard = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const card = await Card_Model.findById(id);
  res.status(200).json({ data: card });
});
const updateCardStage = asyncHandler(async (req, res) => {
  const { newStageId, prevStageId, cardId } = req.body;
  // Remove card id from previous stage
  await Stage_Model.findByIdAndUpdate(prevStageId, {
    $pull: { items: cardId },
  });
  // add card id to new stage
  await Stage_Model.findByIdAndUpdate(newStageId, {
    $push: { items: cardId },
  });
  // update card stage
  await Card_Model.findByIdAndUpdate(cardId, {
    stage: newStageId,
  });
  res.status(200).json({ message: "stage has been changed" });
});
const getCardsByStage = asyncHandler(async (req, res) => {
  const { stage } = req.query;
  const cards = await Card_Model.find({ stage });
  res.status(200).json({ data: cards });
});
const updateCard = asyncHandler(async (req, res) => {
  const { id, update } = req.body;
  await Card_Model.findByIdAndUpdate(id, { ...update });
  res.status(200).json({ message: "Card Has Been Updated" });
});
const deleteCard = asyncHandler(async (req, res) => {
  const { id } = req.body;
  await Card_Model.findByIdAndDelete(id);
  res.status(200).json({ message: "Card Has Been Deleted" });
});

module.exports = {
  getAllStages,
  getStageById,
  createStage,
  deleteStage,
  updateStage,
  getCard,
  getCardsByStage,
  updateCardStage,
  createCard,
  updateCard,
  deleteCard,
};
