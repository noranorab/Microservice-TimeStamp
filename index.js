// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  const {date} = req.params;

  if (date){
    const timeStamp = Date.parse(date)

    if (timeStamp){
      res.json({unix: timeStamp, utc: new Date(timeStamp)})
    }else{
      res.json({error : "Invalid Date"})
    }
  }else{
    const currentDate = new Date();
    res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString(),
    })
  }
});

app.get("/api/:milliseconds?", function (req, res) {
  const {milliseconds} = req.params
  if (milliseconds){
    const date = new Date(parseInt(milliseconds, 10));

    if (isNaN(date.getTime())) {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
      });
    }
  }else{
    const currentDate = new Date();
    res.send({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString(),
    })
  }
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
