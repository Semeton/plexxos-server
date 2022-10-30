import makeValidation from "@withvoid/make-validation";
import FacilityModel from "../models/Facility";

export default {
  onGetAllFacilities: async (req, res) => {
    try {
      const users = await FacilityModel.getFacilities();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onGetFaciltyById: async (req, res) => {
    try {
      const facility = await FaciltyModel.getFaciltyById(req.params.id);
      return res.status(200).json({ success: true, user });
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
      const user = await UserModel.createUser(firstName, lastName, email, type);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onDeleteUserById: async (req, res) => {
    try {
      const user = await UserModel.deleteByUserById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted a count of ${user.deletedCount} user.`,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
};
