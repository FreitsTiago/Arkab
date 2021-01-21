// Aréa de definição inical
require('dotenv/config');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const low = require('lowdb');
const fs = require('fs');
const FileSync = require('lowdb/adapters/FileSync')
const arkab = require('./arkab');
const ID_ADM = require('./ID_administrator');
const dir = './public';
var configs = {};

// Aréa de configurações
if(process.env.NAME == null || process.env.PORT == null || process.env.MAX_MESAGES_DB == null || process.env.MAX_USERS == null){
  try{
    configs = require('./config.js');
    if(configs.server_name == null || configs.server_port == null || configs.max_mesages_db == null || configs.max_users == null){
      console.log('Seu arquivo de configs fois rezetado por não ter algumas configurações!')
      fs.writeFileSync('./config.js', fs.readFileSync('./config_template.js', 'utf-8'), 'utf-8');
      configs = require('./config_template.js');
    };
  }catch{
    fs.writeFileSync('./config.js', fs.readFileSync('./config_template.js', 'utf-8'), 'utf-8');
    configs = require('./config_template.js');
  };
};

// Aréa do banco de dados
const db = low(new FileSync('messages_DB.json'));
db.defaults({ mesages: [] }).write() // Usado para criar a parte das mensagens no arquivo

// Aréa do Express
app.use('/ID', ID_ADM);

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

  client.on("join", function (obj) {
    if(clients.length >= (process.env.MAX_USERS || configs.max_users || 150)){
      console.log(obj.name +" #" + obj.id + ' tentou entrar com o servidor cheio!');
      client.emit("status", "server full");

    }else{
      clients.push({ id: client.id, name: obj.name , user_id: obj.id});
      console.log("Joined: " + obj.name +" #" + obj.id + ' ' + clients.length + '/' + (process.env.MAX_USERS || configs.max_users || 150));
      client.emit("status", "conected", process.env.NAME || configs.server_name || 'unnamed server');
      client.emit("history", db.get('mesages').value());
      client.broadcast.emit("status", "join", obj, ' ' + clients.length + '/' + (process.env.MAX_USERS || configs.max_users || 150));
    };
  });

  client.on("send", function (msg) {
    console.log("Message: " + msg);
    var time = arkab.get_hours();
    obj = {
      name: arkab.search({ item: 'id', value: client.id }, 'name', clients),
      id: arkab.search({ item: 'id', value: client.id }, 'user_id', clients),
      msg: msg,
      hour: time
    };
    if (db.get('mesages').value().length >= (process.env.MAX_MESAGES_DB || configs.max_mesages_db || 650)) {
      db.get('mesages').splice(0, 1).write();
      db.get('mesages').push(obj).write();
    } else {
      db.get('mesages').push(obj).write();
    };

    client.broadcast.emit("chat", obj);
  });

  client.on("disconnect", function () {
    console.log("Disconnect");
    if (!arkab.search({ item: 'id', value: client.id }, 'name', clients)) {
      console.log('nonexistent user')
    } else {
      io.emit("status", "left", {name: arkab.search({ item: 'id', value: client.id }, 'name', clients), id: arkab.search({ item: 'id', value: client.id }, 'user_id', clients)}, ' ' + (clients.length - 1) + '/' + (process.env.MAX_USERS || configs.max_users || 150));
    };
    clients = arkab.delete({ item: 'id', value: client.id }, clients);
  });
});


http.listen(process.env.PORT || configs.server_port || 8080, function () {
  console.log('Server is online in: ' + (process.env.PORT || configs.server_port || 8080));
  console.log('Server name: ' + (process.env.NAME || configs.server_name || 'unnamed server'));
  console.log('Numero max de msg salvas: ' + (process.env.MAX_MESAGES_DB || configs.max_mesages_db || 650));
  console.log('Numero max de usuarios oline: ' + (process.env.MAX_USERS || configs.max_users || 150));
});