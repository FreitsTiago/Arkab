const socket = io();
var audio = new Audio('/sounds/new_mesage_sound.wav');
var disconnect = false;
var blur = false;
var joined = false;
var notification = true;
var server_name = null;
var conected_content_show = false;

$(window).focus(function () {
  blur = false;
});

$(window).blur(function () {
  blur = true;
});

$(document).ready(function () {
  $('#mesages').css({ height: ($(window).height() - ($('#container_nav_bar').height() + $('#input_msg_content').height() + 50)).toFixed(0), overflow: "auto" });
  $('#conected_content').fadeOut();
  $('#input_name').select();
  if (localStorage.notification == null) {
    localStorage.setItem('notification', true);
  }
  if (localStorage.notification == 'true') {
    change_notifi(true)
  } else {
    change_notifi(false)
  }
});

function change_notifi_btn() {
  if (notification == true) {
    change_notifi(false)
  } else {
    change_notifi(true)
  }
}

function change_notifi(to) {
  if (localStorage.theme == 'dark') {
    var bg = 'white';
  } else {
    var bg = 'black';
  };
  if (to == false) {
    $('#notifi_btn').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="' + bg + '" width="20px" height="20px"><path d="M3.63 3.63c-.39.39-.39 1.02 0 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"/></svg>');
    notification = false;
    localStorage.setItem('notification', false);
  } else {
    $('#notifi_btn').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="' + bg + '" width="20px" height="20px"><path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 4.45v.2c0 .38.25.71.6.85C17.18 6.53 19 9.06 19 12s-1.82 5.47-4.4 6.5c-.36.14-.6.47-.6.85v.2c0 .63.63 1.07 1.21.85C18.6 19.11 21 15.84 21 12s-2.4-7.11-5.79-8.4c-.58-.23-1.21.22-1.21.85z"/></svg>');
    notification = true;
    localStorage.setItem('notification', true);
    audio.volume = 0.05;
    audio.play();
  };
};

window.onresize = function () {
  $('#mesages').css({ height: ($(window).height() - ($('#container_nav_bar').height() + $('#input_msg_content').height() + 50)).toFixed(0), overflow: "auto" });
};

function get_hour() {
  var date = new Date();
    if ((date.getMonth() + 1) < 10) {var month = '0' + (date.getMonth() + 1)} else {var month = (date.getMonth() + 1)};
    if (date.getDate() < 10) {var day = '0' + date.getDate()} else {var day = date.getDate()};
    if (date.getHours() < 10) {var hours = '0' + date.getHours()} else {var hours = date.getHours()};
    if (date.getMinutes() < 10) {var minutes = '0' + date.getMinutes()} else {var minutes = date.getMinutes()};
    return hours + ':' + minutes + ' - ' + day + '/' + month;
};

function join() {
  if ($('#input_name').val() != '') {
    socket.emit('join', $('#input_name').val());
  } else {
    alert('Você precisa de uma nome!');
  };
};

function print_message(message) {
  if (localStorage.theme == 'dark') {
    var bg = 'bg-s_dark';
    var txt1 = 'text-white';
    var txt2 = 'text-light';
  };
  if (localStorage.theme == 'light') {
    var bg = 'bg-white';
    var txt1 = 'text-black';
    var txt2 = 'text-dark';
  };
  if (message.name == $('#input_name').val()) {
    $('#mesages').append('\
            <a class="list-group-item list-group-item-action flex-column align-items-start mb-1 my_msg">\
                <div class="d-flex w-100 justify-content-between">\
                    <h5 class="mb-1">'+ message.name + '</h5>\
                    <small><svg class="i-clock" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">\
                        <circle cx="16" cy="16" r="14"></circle>\
                        <path d="M16 8 L16 16 20 20"></path>\
                    </svg> '+ message.hour + '</small>\
                </div>\
                <p class="mb-1">'+ message.msg + '</p>\
            </a>\
    ');
  } else {
    $('#mesages').append('\
            <a class="list-group-item list-group-item-action flex-column align-items-start mb-1 msg '+ bg + '">\
                <div class="d-flex w-100 justify-content-between">\
                    <h5 class="mb-1 '+ txt1 + '">' + message.name + '</h5>\
                    <small class="'+ txt2 + '" ><svg class="i-clock" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">\
                        <circle cx="16" cy="16" r="14"></circle>\
                        <path d="M16 8 L16 16 20 20"></path>\
                    </svg> '+ message.hour + '</small>\
                </div>\
                <p class="mb-1 '+ txt2 + '">' + message.msg + '</p>\
            </a>\
    ');
    if (blur) {
      if (notification) {
        audio.volume = 0.05;
        audio.play();
      };
    };
  };
  var objDiv = document.getElementById("mesages");
  objDiv.scrollTop = objDiv.scrollHeight;
};

function send_mesage() {
  msg = $('#input_mesage').val();
  if (msg != '') {
    socket.emit('send', msg);
    obj = {
      name: $('#input_name').val(),
      msg: msg,
      hour: get_hour()
    };
    print_message(obj);
    $('#input_mesage').val('');
    $('#input_mesage').select();
  };
};

function modal(modal_name) {
  if (modal_name == 'creator') {
    $('#creator_modal').modal('show')
  };
};

document.querySelector('body').addEventListener('keydown', function (event) {
  if (event.keyCode == 13) {
    try {
      if (joined == true) {
        send_mesage();
      } else {
        join();
      }
    } catch {
      join();
    };
  };
});

socket.on('status', function (stts, complement) {
  if (stts == 'conected') {
    $('#disconnected_content').fadeOut();
    $('#conected_content').fadeIn();
    $('#server_name').text(complement);
    $('#server_name_info').text('Sala: ' + complement);
    $('#user_info').text('Usuário: ' + $('#input_name').val());
    $('#input_mesage').select();
    server_name = complement;
    joined = true;
    conected_content_show = true;
  };
  if (stts == 'join') {
    if (localStorage.theme == 'dark') {
      var bg = 'bg-s_dark-50';
      var txt1 = 'text-white';
      var txt2 = 'text-light';
    };
    if (localStorage.theme == 'light') {
      var bg = 'bg-white-50';
      var txt1 = 'text-black';
      var txt2 = 'text-dark';
    };
    $('#mesages').append('\
      <a class="list-group-item list-group-item-action flex-column align-items-start mb-1 msg '+ bg + '">\
        <div class="d-flex w-100 justify-content-between">\
          <h5 class="mb-1 '+ txt1 + '">' + complement + ' - Entrou na sala!</h5>\
          <small class="'+ txt2 + '"><svg class="i-clock" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">\
              <circle cx="16" cy="16" r="14"></circle>\
              <path d="M16 8 L16 16 20 20"></path>\
            </svg> '+ get_hour() + '</small>\
          </div>\
        </a>\
  ');
    var objDiv = document.getElementById("mesages");
    objDiv.scrollTop = objDiv.scrollHeight;
  };
  if (stts == 'left') {
    if (localStorage.theme == 'dark') {
      var bg = 'bg-s_dark-50';
      var txt1 = 'text-white';
      var txt2 = 'text-light';
    };
    if (localStorage.theme == 'light') {
      var bg = 'bg-white-50';
      var txt1 = 'text-black';
      var txt2 = 'text-dark';
    };
    $('#mesages').append('\
      <a class="list-group-item list-group-item-action flex-column align-items-start mb-1 msg '+ bg + '">\
        <div class="d-flex w-100 justify-content-between">\
          <h5 class="mb-1 '+ txt1 + '">' + complement + ' - Saiu na sala!</h5>\
          <small class="'+ txt2 + '"><svg class="i-clock" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">\
              <circle cx="16" cy="16" r="14"></circle>\
              <path d="M16 8 L16 16 20 20"></path>\
            </svg> '+ get_hour() + '</small>\
          </div>\
        </a>\
  ');
    var objDiv = document.getElementById("mesages");
    objDiv.scrollTop = objDiv.scrollHeight;
  };
  if (stts == 'name_used') {
    if (localStorage.theme == 'dark') {
      var bg = 'bg-s_dark-50';
      var txt1 = 'text-white';
      var txt2 = 'text-light';
    };
    if (localStorage.theme == 'light') {
      var bg = 'bg-white-50';
      var txt1 = 'text-black';
      var txt2 = 'text-dark';
    };
    $('#disconnected_error_messages').append('\
      <a class="list-group-item list-group-item-action flex-column align-items-start mb-1 msg '+ bg + '">\
        <div class="d-flex w-100 justify-content-between">\
          <h5 class="mb-1 '+ txt1 + ' text-center">Este nome já esta sendo usado neste servidor!</h5>\
          </div>\
        </a>\
  ');
    var objDiv = document.getElementById("mesages");
    objDiv.scrollTop = objDiv.scrollHeight;
  };
});

socket.on('history', function (history) {
  $("#mesages").html('');
  for (message of history) {
    print_message(message);
  };
});

socket.on('chat', function (msg) {
  print_message(msg);
});

socket.on('disconnect', function () {
  disconnect = true;
  joined = false;
  if(conected_content_show){
    $('#server_name').text(server_name + ' - Desconectado');
  }else{
    $('#server_name').text('Arkab - Desconectado');
  };
});

socket.on('connect', () => {
  if (disconnect) {
    if(conected_content_show){
      socket.emit('join', $('#input_name').val());
      disconnect = false;
    }else{
      $('#server_name').text('Arkab');
    }
  };
});