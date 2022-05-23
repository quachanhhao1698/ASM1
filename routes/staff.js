const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staff");
const workTimeController = require("../controllers/workTime");


router.get("/", staffController.getIndex);
router.get("/attendance", staffController.getAttendance);
router.post("/create-attendance", staffController.postAttendance);
router.post("/end-attendance", staffController.postEndAttendance);
router.get("/profile", staffController.getProfile);
router.post("/update-profile", staffController.postProfile);
router.post("/add-annualLeave",staffController.postAddAnnualLeave);

router.get("/workTime",workTimeController.getWorkTime);
// router.post("/salary",workTimeController.postAddSalary);

module.exports = router;