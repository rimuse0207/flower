const request = require("request");
const parser = require("xml2json");

const HOST = "http://api.nongsaro.go.kr/service/garden/gardenList";
const SERVICE_KEY = "20200206NNRF9K4P2NRBPWZJ2RC8GW";
const requestUrl = `${HOST}?apiKey=${SERVICE_KEY}&&numOfRows=220`;

request(
  {
    url: requestUrl,
    method: "GET"
  },
  (error, response, xml) => {
    const json = JSON.parse(parser.toJson(xml));
    const item = json.response.body.items.item;
    console.log(item.length);
  }
);
