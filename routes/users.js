var express = require("express");
var router = express.Router();

/* GET users listing. */
router.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

router.get("/", function(req, res, next) {
  res.json([
    { eamil: "wqeqweqweqwe", password: "qweqweqwe" },
    { eamil: "aasdasdqw", password: "somebasdqwody_els" }
  ]);
  res.send();
});
router.post("/login", (req, res) => {
  console.log("SUCCES ");
  console.log(req.body.email);
});
router.post("/sinup", (req, res) => {
  console.log("SUCCES22");
  console.log(req.body.data);
});

module.exports = router;
