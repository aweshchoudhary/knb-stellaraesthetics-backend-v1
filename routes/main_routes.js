const router = require("express").Router();
const {
  getAllStages,
  createStage,
  updateStage,
  deleteStage,
  getStageById,
} = require("../controllers/stage_controller");
const {
  getCard,
  createCard,
  deleteCard,
  updateCard,
  updateCardStage,
  addNote,
  updateNote,
  deleteNote,
  addActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/card_controller");

// STAGE ENDPOINTS
router.post("/stage", createStage);
router.put("/stage", updateStage);
router.delete("/stage", deleteStage);
router.get("/get-all-stages", getAllStages);
router.get("/get-stage", getStageById);

// CARD ENDPOINTS
router.get("/get-card", getCard);
router.get("/get-cards", getCard);
router.post("/card", createCard);
router.delete("/card", deleteCard);
router.put("/card", updateCard);
router.put("/update-card-stage", updateCardStage);

router.post("/card/add-note", addNote);
router.put("/card/update-note", updateNote);
router.delete("/card/delete-note", deleteNote);

router.post("/card/add-activity", addActivity);
router.put("/card/update-activity", updateActivity);
router.delete("/card/delete-activity", deleteActivity);

module.exports = router;
