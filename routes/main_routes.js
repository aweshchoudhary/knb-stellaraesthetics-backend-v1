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

module.exports = router;
