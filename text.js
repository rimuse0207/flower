const request = require("request");
const parser = require("xml2json");

const HOST = "http://api.nongsaro.go.kr/service/garden/gardenList";
const SERVICE_KEY = "20200206NNRF9K4P2NRBPWZJ2RC8GW";
const requestUrl = `${HOST}?apiKey=${SERVICE_KEY}&&numOfRows=2`;

var data;
var detailData = [];
request(
  {
    url: requestUrl,
    method: "GET"
  },
  (error, response, xml) => {
    const json = JSON.parse(parser.toJson(xml));
    data = json.response.body.items.item;
    data.map(item => {
      console.log(item.cntntsNo);
      const ULR = `http://api.nongsaro.go.kr/service/garden/gardenDtl?apiKey=${SERVICE_KEY}&&cntntsNo=${item.cntntsNo}`;
      console.log(ULR);
      request(
        {
          url: ULR,
          method: "GET"
        },
        (error, response, xml) => {
          const json = JSON.parse(parser.toJson(xml));
          console.log(json.response.body.item.adviseInfo);
        }
      );
    });
  }
);

// request(
//   {
//     url: `${requestUrl}&&cntntsNo=${data.cntntsNo}`,
//     method: "GET"
//   },
//   (error, response, xml) => {
//     const json = JSON.parse(parser.toJson(xml));
//     const detailData = json.resonese.body.items.item;
//   }
// );
