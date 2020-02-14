var express = require("express");
const request = require("request");
const parser = require("xml2json");
var router = express.Router();

const HOST = "http://api.nongsaro.go.kr/service/garden/gardenList";
const SERVICE_KEY = "20200206NNRF9K4P2NRBPWZJ2RC8GW";
const requestUrl = `${HOST}?apiKey=${SERVICE_KEY}&&numOfRows=220`;

var data;
const datas = request(
  {
    url: requestUrl,
    method: "GET"
  },
  (error, response, xml) => {
    const json = JSON.parse(parser.toJson(xml));
    data = json.response.body.items.item;
  }
);

/* GET users listing. */
router.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

router.get("/", function(req, res, next) {
  datas;
  res.json(data);
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
