import makeValidation from "@withvoid/make-validation";
import FacilityModel from "../models/Facility.js";

export default {
  onGetAllFacilities: async (req, res) => {
    try {
      const facilities = await FacilityModel.getFacilities();
      return res.status(200).json({ success: true, facilities });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onGetFacilityById: async (req, res) => {
    try {
      const facility = await FaciltyModel.getFacilityById(req.params.id);
      return res.status(200).json({ success: true, facility });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onCreateFacility: async (req, res) => {
    try {
      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          facilityName: { type: types.string },
          email: { type: types.string },
          plan: { type: types.number, options: { enum: PLAN_TYPES } },
        },
      }));

      if (!validation.success) return res.status(400).json(validation);

      const { firstName, lastName, email, type } = req.body;
      const user = await FacilityModel.createUser(
        firstName,
        lastName,
        email,
        type
      );
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onDeleteFacilityById: async (req, res) => {
    try {
      const facility = await FacilityModel.deleteByFacilityById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted a count of ${facility.deletedCount} facility.`,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
};
