const router = require("express").Router();
const {
  getAllStages,
  createStage,
  updateStage,
  deleteStage,
  getStageById,
  reorderStages,
} = require("../controllers/stage_controller");
const {
  getCard,
  createCard,
  deleteCard,
  updateCard,
  updateCardStage,
} = require("../controllers/card_controller");
const {
  addActivity,
  updateActivity,
  deleteActivity,
  getActivitiesByCardId,
  getActivityById,
} = require("../controllers/activity_controller");
const {
  addNote,
  updateNote,
  deleteNote,
  getNotesByCardId,
  getNotesById,
} = require("../controllers/note_controller");
const upload = require("../apps/multer");

// STAGE ENDPOINTS
router.post("/stage", createStage);
router.put("/stage/:id", updateStage);
router.delete("/stage/:id", deleteStage);
router.get("/get-all-stages", getAllStages);
router.get("/get-stage", getStageById);
router.put("/stage/reorder", reorderStages);

// CARD ENDPOINTS
router.get("/get-card", getCard);
router.get("/get-cards", getCard);
router.post("/card", createCard);
router.delete("/card", deleteCard);
router.put("/card", updateCard);
router.put("/update-card-stage", updateCardStage);

router.post("/note/add", addNote);
router.put("/note/update/:id", updateNote);
router.delete("/note/delete/:id", deleteNote);
router.get("/note/get-notes/:cardId", getNotesByCardId);
router.get("/note/get-note/:id", getNotesById);

router.post("/activity/add", addActivity);
router.put("/activity/update", updateActivity);
router.delete("/activity/delete", deleteActivity);
router.get("/activity/get-activities/:cardId", getActivitiesByCardId);
router.get("/activity/get-activities/:id", getActivityById);

// router.post("/file/add", upload.single("file"), addFile);
// router.put("/file/download", getFile);
// router.delete("/file/delete", deleteFile);

module.exports = router;
