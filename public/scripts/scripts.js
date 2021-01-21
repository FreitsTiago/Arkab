const socket = io();
const xhr = new XMLHttpRequest();
const ID_aplication = 'x1ax3bzqirx605nrlodt';
var audio = new Audio('/sounds/new_mesage_sound.wav');
var disconnect = false;
var blur = false;
var joined = false;
var notification = true;
var server_name = null;
var conected_content_show = false;

$(window).focus(function () {blur = false});
$(window).blur(function () {blur = true});

$(document).ready(function () {
  $('#mesages').css({ height: ($(window).height() - ($('#container_nav_bar').height() + $('#input_msg_content').height() + 50)).toFixed(0), overflow: "auto" });
  $('#conected_content').fadeOut();
  $('#input_name').select();
  if (localStorage.user_ID == null) {new_user_ID()}else{validate_use_ID(localStorage.user_ID,localStorage.pass_ID); $('#user_id_info').text('ID do usuário: #' + localStorage.user_ID);};
  if (localStorage.notification == null) {localStorage.setItem('notification', true)};
  if (localStorage.notification == 'true') {change_notifi(true)} else {change_notifi(false)};
});

window.onresize = function () {
  $('#mesages').css({ height: ($(window).height() - ($('#container_nav_bar').height() + $('#input_msg_content').height() + 50)).toFixed(0), overflow: "auto" });
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

socket.on('status', function (stts, complement, complement2) {
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
  if(stts == 'server full'){
    $('#disconnected_error_messages').append('\
    <a class="list-group-item list-group-item-action flex-column align-items-start mb-1 msg '+ get_theme().bg_50 + '">\
      <div class="d-flex w-100 justify-content-between">\
        <h5 class="mb-1 '+ get_theme().txt_1 + '">O servidor esta cheio!</h5>\
        </div>\
      </a>\
')
  }
  if (stts == 'join') {
    activit(complement.name + '<small class="'+ get_theme().txt_2 + '"> #' + complement.id + '</small> - Entrou na sala!' + complement2);
    var objDiv = document.getElementById("mesages");
    objDiv.scrollTop = objDiv.scrollHeight;
  };
  if (stts == 'left') {
    activit(complement.name + '<small class="'+ get_theme().txt_2 + '"> #' + complement.id + '</small> - Saiu na sala!' + complement2);
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
      join()
      disconnect = false;
    }else{
      $('#server_name').text('Arkab');
    }
  };
});