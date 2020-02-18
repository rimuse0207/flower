var express = require("express");
const request = require("request");
const parser = require("xml2json");
var router = express.Router();

const HOST = "http://api.nongsaro.go.kr/service/garden/gardenList";
const SERVICE_KEY = "20200206NNRF9K4P2NRBPWZJ2RC8GW";
const requestUrl = `${HOST}?apiKey=${SERVICE_KEY}&&numOfRows=217`;

const HOST2 = "http://api.nongsaro.go.kr/service/garden/gardenDtl";
const requestUrl2 = `${HOST2}?apiKey=${SERVICE_KEY}&&cntntsNo=`;

var data = [{}];
var data3 = [{}];
var data2 = [];
var data4 = [{}];
{
  try {
    request(
      {
        url: requestUrl,
        method: "GET"
      },
      (error, response, xml) => {
        const json = JSON.parse(parser.toJson(xml));

        data = json.response.body.items.item;

        data.map(item => {
          request(
            {
              url: `${requestUrl2}${item.cntntsNo}`,
              method: "GET"
            },
            (error, response, xml) => {
              const json = JSON.parse(parser.toJson(xml));
              data4 = json.response.body.item;
              data2.push(json.response.body.item);
            }
          );
        });
      }
    );
  } catch (error) {
    console.log("asdasd", error);
  }
}

// try {
//   request(
//     {
//       url: requestUrl,
//       method: "GET"
//     },
//     (error, response, xml) => {
//       const json = JSON.parse(parser.toJson(xml));
//       data4 = json.response.body.items.item;
//     }
//   );
// } catch (error) {
//   console.log("asdasd", error);
// }

const datas2 = async ip => {
  try {
    console.log(`${requestUrl2}${ip}`);
    await request(
      {
        url: `${requestUrl2}${ip}`,
        method: "GET"
      },
      (error, response, xml) => {
        const json = JSON.parse(parser.toJson(xml));
        data3 = json.response.body.item;
      }
    );
  } catch (err) {
    console.log("Detail error ", err);
  }
};

/* GET users listing. */

router.get("/", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  res.json(data);
  res.send();
});

router.get("/qwe", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  res.json(data2);
  res.send();
});

router.post("/login", (req, res) => {
  console.log("SUCCES ");
  console.log(req.body.email);
  console.log(req.body.password);
});
router.post("/sinup", (req, res) => {
  console.log("SUCCES22");
  console.log(req.body.data);
  console.log(req.body);
  console.log(req);
});

// router.get("/Detail", (req, res) => {
//   var ip = req.param("ip");
//   datas2(ip);
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.json(data3);
//   res.send();
// });

module.exports = router;
