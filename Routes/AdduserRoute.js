const express = require("express");
const { useradd } = require("../controlers/user.add.controlers");
const router = express.Router();
module.exports = router;

router.route("/").get(useradd).post();
