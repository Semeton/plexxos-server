import express from "express";
// controllers
import facility from "../controllers/facility.js";

const router = express.Router();

router
  .get("/", facility.onGetAllFacilities)
  .post("/", facility.onCreateFacility)
  .get("/:id", facility.onGetFacilityById)
  .delete("/:id", facility.onDeleteFacilityById);

export default router;
