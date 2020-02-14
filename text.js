const fs = require("fs");
const request = require("request");
const parser = require("xml2json");

const HOST = "http://api.nongsaro.go.kr/service/garden/gardenList";
const SERVICE_KEY = "20200206NNRF9K4P2NRBPWZJ2RC8GW";
const requestUrl = `${HOST}?apiKey=${SERVICE_KEY}`;

console.log(requestUrl);

request(
  {
    url: requestUrl,
    method: "GET"
  },
  (error, response, xml) => {
    const json = JSON.parse(parser.toJson(xml));
    const item = json.response.body.items.item;
    console.log(item[0].rtnOrginlFileNm);

    //     const addrs = item.map(i => i.addr);
    //     const template = `
    //   ul
    //     each addr in addrs
    //       li= addr
    //     `;
    //     const html = pug.render(template, { addrs: addrs });
    //     console.log(html);
  }
);
