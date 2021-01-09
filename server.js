var app = require('express')();
var http = require('http').Server(app);
var fs = require('fs');

const server_name = 'Fuego Chat';

var dir = './public';

app.use('/', function (req, res) {
  if (req.url == '/') {
    var content = fs.readFileSync(dir + '/index.html');
    res.end(content);
  } else {
    try {
      try {
        var content = fs.readFileSync(dir + req.url + '.html');
        res.end(content);
      } catch {
        var content = fs.readFileSync(dir + req.url);
        res.end(content);
      };
    } catch {
      var content = fs.readFileSync(dir + '/404.html');
      res.status(404);
      res.end(content);
    };
  };
});

function get_hour() {
  var date = new Date();
  var day = date.getDate()
  var mes = date.getMonth() + 1;
  var hour = date.getHours();
  var min = date.getMinutes();
  if (mes < 10) {
    var month = '0' + mes;
  } else {
    var month = mes;
  };
  if (day < 10) {
    var dayy = '0' + day;
  } else {
    var dayy = day;
  };
  if (hour < 10) {
    var hours = '0' + hour;
  } else {
    var hours = hour;
  };
  if (min < 10) {
    var minutes = '0' + min;
  } else {
    var minutes = min;
  };
  var end = hours + ':' + minutes + ' - ' + dayy + '/' + month;
  return end;
};

var io = require('socket.io')(http);
var clients = {};
var history = [];

io.on("connection", function (client) {
  io.emit("status", "started");

  client.on("join", function (name) {
    console.log("Joined: " + name);
    client.emit("status", "conected", server_name);
    client.emit("history", history);
    client.broadcast.emit("status", "join", name)
    clients[client.id] = name;
  });

  client.on("send", function (msg) {
    console.log("Message: " + msg);
    var time = get_hour();
    obj = {
      name: clients[client.id],
      msg: msg,
      hour: time
    };
    history.push(obj)
    client.broadcast.emit("chat", obj);
  });

  client.on("disconnect", function () {
    console.log("Disconnect");
    io.emit("status", "left", clients[client.id]);
    delete clients[client.id];
  });
});


http.listen(process.env.PORT || 19132, function () {
  console.log("Server is online in: " + process.env.PORT);
});