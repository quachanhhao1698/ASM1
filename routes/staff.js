const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staff");
const workTimeController = require("../controllers/workTime");
const covidController = require("../controllers/covid");

router.get("/", staffController.getIndex);

router.get("/attendance", staffController.getAttendance);
router.post("/create-attendance", staffController.postAttendance);
router.post("/end-attendance", staffController.postEndAttendance);
router.post("/add-annualLeave", staffController.postAddAnnualLeave);

router.get("/profile", staffController.getProfile);
router.post("/update-profile", staffController.postProfile);

router.get("/workTime", workTimeController.getWorkTime);
router.post("/salary", workTimeController.getWorkTime);

router.get("/covid", covidController.getCovid);
router.post("/postBodyTemperature", covidController.postBodyTemperature);
router.post("/addVaccineInfo", covidController.postVaccineInfo);
router.post("/postInfectCovidInfo", covidController.postInfectCovidInfo);



module.exports = router;
