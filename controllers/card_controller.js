const Stage_Model = require("../models/Stage_Model");
const Card_Model = require("../models/Card_Model");
const asyncHandler = require("express-async-handler");
const fs = require("fs");

// Card Functions
const createCard = asyncHandler(async (req, res) => {
  const newCard = new Card_Model({
    ...req.body,
    stage: [
      {
        _id: req.body.stage,
      },
    ],
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
  const card = await Card_Model.findById(cardId);
  card.stages.forEach((stage) => (stage.active = false));
  card.stages.push({ _id: newStageId });
  await card.save();

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

// NOTES CONTROLLERS
const addNote = asyncHandler(async (req, res) => {
  const { cardId, noteBody } = req.body;
  // get card by id
  await Card_Model.findByIdAndUpdate(cardId, {
    $push: {
      notes: {
        body: noteBody,
      },
    },
  });
  res.status(200).json({ message: "Note has been added to card" });
});
const updateNote = asyncHandler(async (req, res) => {
  const { cardId, noteId, noteBody } = req.body;

  // get card by id
  const card = await Card_Model.findById(cardId);
  card.notes.forEach((note) => {
    console.log(note._id);
    if (note.id === noteId) {
      note.body = noteBody;
    }
  });
  await card.save();
  res.status(200).json({ message: "Note has been updated" });
});
const deleteNote = asyncHandler(async (req, res) => {
  const { cardId, noteId } = req.body;
  await Card_Model.findByIdAndUpdate(cardId, {
    $pull: {
      notes: {
        _id: noteId,
      },
    },
  });
  res.status(200).json({ message: "Note has been deleted" });
});

const addActivity = asyncHandler(async (req, res) => {
  const { data } = req.body;
  // get card by id
  await Card_Model.findByIdAndUpdate(cardId, {
    $push: {
      activities: {
        ...data,
      },
    },
  });
  res.status(200).json({ message: "Activity has been added to card" });
});
const updateActivity = asyncHandler(async (req, res) => {
  const { cardId, activityId, data } = req.body;
  // get card by id
  const card = await Card_Model.findById(cardId);
  card.activities.forEach((activity) => {
    if (activity.id === activityId) {
      activity = {
        ...activity,
        ...data,
      };
    }
  });
  await card.save();
  res.status(200).json({ message: "Activity has been updated" });
});
const deleteActivity = asyncHandler(async (req, res) => {
  const { cardId, activityId } = req.body;
  await Card_Model.findByIdAndUpdate(cardId, {
    $pull: {
      notes: {
        _id: activityId,
      },
    },
  });
  res.status(200).json({ message: "Activity has been deleted" });
});

const addFile = asyncHandler(async (req, res) => {
  const { cardId } = req.body;
  // get card by id
  await Card_Model.findByIdAndUpdate(cardId, {
    $push: {
      files: {
        name: req.file.filename,
        size: req.file.size,
        type: req.file.mimetype,
      },
    },
  });
  res.status(200).json({ message: "File has been attached to card" });
});
const getFile = asyncHandler(async (req, res) => {
  const { fileId } = req.body;
  // // get card by id
  // await Card_Model.findByIdAndUpdate(cardId, {
  //   $push: {
  //     activities: {
  //       ...data,
  //     },
  //   },
  // });
  console.log("ehlasdfas");
  res.status(200).json({ message: "Activity has been added to card" });
});
const deleteFile = asyncHandler(async (req, res) => {
  const { cardId, fileId, filename } = req.body;
  await Card_Model.findByIdAndUpdate(cardId, {
    $pull: {
      files: {
        _id: fileId,
      },
    },
  });
  await fs.unlink("public/uploads/" + filename);
  res.status(200).json({ message: "File has been deleted" });
});

module.exports = {
  getCard,
  getCardsByStage,
  updateCardStage,
  createCard,
  updateCard,
  deleteCard,
  addNote,
  updateNote,
  deleteNote,
  addActivity,
  updateActivity,
  deleteActivity,
  addFile,
  getFile,
  deleteFile,
};
