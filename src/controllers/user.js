import makeValidation from "@withvoid/make-validation";
import UserModel from "../models/User.js";
import FacilityModel from "../models/Facility.js";

export default {
  onGetAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onGetUserById: async (req, res) => {
    try {
      const user = await UserModel.getUserById(req.params.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onCreateUser: async (req, res) => {
    try {
      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          firstName: { type: types.string },
          lastName: { type: types.string },
          email: { type: types.string },
          facilityCode: { type: types.string },
        },
      }));

      if (!validation.success) return res.status(400).json(validation);

      const { firstName, lastName, email, facilityCode } = req.body;
      const exist = await FacilityModel.findOne({ facilityCode: facilityCode });
      if (!exist) {
        return res
          .status(401)
          .json({ success: false, error: "Facility code is invalid" });
      }
      const user = await UserModel.createUser(
        firstName,
        lastName,
        email,
        facilityCode
      );
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
