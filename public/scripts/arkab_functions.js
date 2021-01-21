function get_theme() {
    if (localStorage.theme == 'dark') {
        var bg = 'bg-s_dark';
        var bg_50 = 'bg-s_dark-50';
        var bgsgv = 'white';
        var txt1 = 'text-white';
        var txt2 = 'text-light';
        var txt_3 = 'text-black';
        var marked = 'marked_msg_dark';
    };
    if (localStorage.theme == 'light') {
        var bg = 'bg-white';
        var bg_50 = 'bg-white-50';
        var bgsgv = 'black';
        var txt1 = 'text-black';
        var txt2 = 'text-dark';
        var txt_3 = 'text-white';
        var marked = 'marked_msg_light';
    };
    return { bg: bg, bg_50: bg_50, bgsgv: bgsgv, txt_1: txt1, txt_2: txt2, txt_3: txt_3, marked: marked }
}

function change_notifi_btn() {
    if (notification == true) {
        change_notifi(false);
    } else {
        change_notifi(true);
    };
};

function change_notifi(to) {
    if (to == false) {
        $('#notifi_btn').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="' + get_theme().bgsgv + '" width="20px" height="20px"><path d="M3.63 3.63c-.39.39-.39 1.02 0 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"/></svg>');
        notification = false;
        localStorage.setItem('notification', false);
    } else {
        $('#notifi_btn').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="' + get_theme().bgsgv + '" width="20px" height="20px"><path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 4.45v.2c0 .38.25.71.6.85C17.18 6.53 19 9.06 19 12s-1.82 5.47-4.4 6.5c-.36.14-.6.47-.6.85v.2c0 .63.63 1.07 1.21.85C18.6 19.11 21 15.84 21 12s-2.4-7.11-5.79-8.4c-.58-.23-1.21.22-1.21.85z"/></svg>');
        notification = true;
        localStorage.setItem('notification', true);
        audio.volume = 0.05;
        audio.play();
    };
};

function get_hour() {
    var date = new Date();
    if ((date.getMonth() + 1) < 10) { var month = '0' + (date.getMonth() + 1) } else { var month = (date.getMonth() + 1) };
    if (date.getDate() < 10) { var day = '0' + date.getDate() } else { var day = date.getDate() };
    if (date.getHours() < 10) { var hours = '0' + date.getHours() } else { var hours = date.getHours() };
    if (date.getMinutes() < 10) { var minutes = '0' + date.getMinutes() } else { var minutes = date.getMinutes() };
    return hours + ':' + minutes + ' - ' + day + '/' + month;
};

function join() {
    if ($('#input_name').val() != '') {
        socket.emit('join', {name: $('#input_name').val(), id: localStorage.user_ID});
    } else {
        alert('Você precisa de uma nome!');
    };
};

function print_message(message) {
    // colocar a função get theme
    if (message.id == localStorage.user_ID) {
        $('#mesages').append('\
              <a class="list-group-item list-group-item-action flex-column align-items-start mb-1 my_msg">\
                  <div class="d-flex w-100 justify-content-between">\
                      <h5 class="mb-1">'+ message.name + '<small> #'+ localStorage.user_ID +'</small></h5>\
                      <small><svg class="i-clock" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">\
                          <circle cx="16" cy="16" r="14"></circle>\
                          <path d="M16 8 L16 16 20 20"></path>\
                      </svg> '+ message.hour + '</small>\
                  </div>\
                  <p class="mb-1">'+ message.msg + '</p>\
              </a>\
      ');
    } else if(message.msg.match(localStorage.user_ID)){
        $('#mesages').append('\
              <a class="list-group-item list-group-item-action flex-column align-items-start mb-1 msg '+ get_theme().bg + '">\
                  <div class="d-flex w-100 justify-content-between">\
                      <h5 class="mb-1 '+ get_theme().txt_1 + '">' + message.name + '<small class="'+ get_theme().txt_2 + '"> #'+ message.id +'</small></h5>\
                      <small class="'+ get_theme().txt_2 + '" ><svg class="i-clock" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">\
                          <circle cx="16" cy="16" r="14"></circle>\
                          <path d="M16 8 L16 16 20 20"></path>\
                      </svg> '+ message.hour + '</small>\
                  </div>\
                  <p class="mb-1 '+ get_theme().txt_3 + ' ' + get_theme().marked + '">' + message.msg + '</p>\
              </a>\
      ');
    }else{
        $('#mesages').append('\
              <a class="list-group-item list-group-item-action flex-column align-items-start mb-1 msg '+ get_theme().bg + '">\
                  <div class="d-flex w-100 justify-content-between">\
                      <h5 class="mb-1 '+ get_theme().txt_1 + '">' + message.name + '<small class="'+ get_theme().txt_2 + '"> #'+ message.id +'</small></h5>\
                      <small class="'+ get_theme().txt_2 + '" ><svg class="i-clock" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">\
                          <circle cx="16" cy="16" r="14"></circle>\
                          <path d="M16 8 L16 16 20 20"></path>\
                      </svg> '+ message.hour + '</small>\
                  </div>\
                  <p class="mb-1 '+ get_theme().txt_2 + '">' + message.msg + '</p>\
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
            id: localStorage.user_ID,
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
        $('#config_modal').modal('hide');
        $('#creator_modal').modal('show');
    }else if(modal_name == 'config_modal'){
        $('#config_modal').modal('show');
    };
};

function activit(msg) {
    $('#mesages').append('\
      <a class="list-group-item list-group-item-action flex-column align-items-start mb-1 msg '+ get_theme().bg_50 + '">\
        <div class="d-flex w-100 justify-content-between">\
          <h5 class="mb-1 '+ get_theme().txt_1 + '">' + msg + '</h5>\
          <small class="'+ get_theme().txt_2 + '"><svg class="i-clock" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">\
              <circle cx="16" cy="16" r="14"></circle>\
              <path d="M16 8 L16 16 20 20"></path>\
            </svg> '+ get_hour() + '</small>\
          </div>\
        </a>\
  ');
};

function new_user_ID() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", '/ID/new_user_id/' + ID_aplication, false);
    xhttp.send();

    if (xhttp.responseText != 'desatulized application') {
        var IDS = JSON.parse(xhttp.responseText);
        localStorage.setItem('user_ID', IDS.ID);
        localStorage.setItem('pass_ID', IDS.ID_pass);
        document.location.reload();
    } else {
        alert('Seu aplicativo está desatualisado!');
    };
};

function validate_use_ID(id, pass_id) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", '/ID/validate_use_id/' + ID_aplication + '/' + id + '/' + pass_id, false);
    xhttp.send();

    if (xhttp.responseText != 'desatulized application') {
        var response = JSON.parse(xhttp.responseText);
        if (response.status == 'authorized') {

        } else {
            alert('Seu ID não foi autorizado ou não existe, isso pode ocorrer por alguma perda do servidor, ou caso você estaja tentando usar o ID de outro despositivo sem habilitar o Multi Despositivos!');
            new_user_ID();
        };
    } else {
        alert('Seu aplicativo está desatualisado!');
    };
};