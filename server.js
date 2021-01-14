// Aréa de definição inical
const app = require('express')();
const http = require('http').Server(app);
const fs = require('fs');
const io = require('socket.io')(http);
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const arkab = require('./arkab');
const server_name = 'Arkab Oficial';

// Aréa do banco de dados
const db = low(new FileSync('mesages_history.json'));
//db.defaults({ mesages: [] }).write() // Usado para criar a parte das mensagens no arquivo

// Aréa do servidor express
const dir = './public';

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

// Aréa do socketIO
var clients = [];

io.on("connection", function (client) {
  io.emit("status", "started");

  client.on("join", function (name) {
    if (!arkab.exist(name, 'name', clients)) {
      console.log("Joined: " + name);
      clients.push({ id: client.id, name: name });
      client.emit("status", "conected", server_name);
      client.emit("history", db.get('mesages').value());
      client.broadcast.emit("status", "join", name);
    } else {
      client.emit("status", "name_used");
    };
  });

  client.on("send", function (msg) {
    console.log("Message: " + msg);
    var time = arkab.get_hours();
    obj = {
      name: arkab.search({ item: 'id', value: client.id }, 'name', clients),
      msg: msg,
      hour: time
    };
    db.get('mesages').push(obj).write();
    client.broadcast.emit("chat", obj);
  });

  client.on("disconnect", function () {
    console.log("Disconnect");
    if(arkab.search({ item: 'id', value: client.id }, 'name', clients) != 'not_found'){
      io.emit("status", "left", arkab.search({ item: 'id', value: client.id }, 'name', clients));
    }else{
      console.log('tava certo!')
    }
    clients = arkab.delete({ item: 'id', value: client.id }, clients);
  });
});


http.listen(process.env.PORT || 19132, function () {
  console.log("Server is online in: " + process.env.PORT);
});