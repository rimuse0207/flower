var express = require("express");
const request = require("request");
const parser = require("xml2json");
var router = express.Router();

const HOST = "http://api.nongsaro.go.kr/service/garden/gardenList";
const SERVICE_KEY = "20200206NNRF9K4P2NRBPWZJ2RC8GW";
const requestUrl = `${HOST}?apiKey=${SERVICE_KEY}&&numOfRows=217`;

var data = [{}];

const datas = async () => {
  try {
    await request(
      {
        url: requestUrl,
        method: "GET"
      },
      (error, response, xml) => {
        const json = JSON.parse(parser.toJson(xml));
        data = json.response.body.items.item;
      }
    );
  } catch (error) {
    console.log("asdasd", error);
  }
};

/* GET users listing. */

router.get("/", function(req, res, next) {
  datas();
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
router.post("/Detail", (req, res) => {
  console.log("asdasdasd");
  console.log(req.body.name);
});

module.exports = router;
