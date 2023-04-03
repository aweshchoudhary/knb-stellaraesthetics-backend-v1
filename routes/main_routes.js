const router = require("express").Router();
const {
  getAllStages,
  createStage,
  updateStage,
  deleteStage,
  getCard,
  createCard,
  deleteCard,
  updateCard,
  getStageById,
  updateCardStage,
} = require("../controllers/main_controller");

router.post("/stage", createStage);
router.put("/stage", updateStage);
router.delete("/stage", deleteStage);
router.get("/get-all-stages", getAllStages);
router.get("/get-stage", getStageById);

router.get("/get-card", getCard);
router.get("/get-cards", getCard);
router.post("/card", createCard);
router.delete("/card", deleteCard);
router.put("/card", updateCard);
router.put("/update-card-stage", updateCardStage);

module.exports = router;
