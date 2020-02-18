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





<form action="action_page.php" method="post">
  <div class="imgcontainer">
    <img src="img_avatar2.png" alt="Avatar" class="avatar">
  </div>

  <div class="container">
    <label for="uname"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="uname" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required>

    <button type="submit">Login</button>
    <label>
      <input type="checkbox" checked="checked" name="remember"> Remember me
    </label>
  </div>

  <div class="container" style="background-color:#f1f1f1">
    <button type="button" class="cancelbtn">Cancel</button>
    <span class="psw">Forgot <a href="#">password?</a></span>
  </div>
</form>