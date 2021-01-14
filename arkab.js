//Modulo de funções basicas Arkab

// Verifica a existencia de algo em um array ex:
// Esta é a lista: [{id: 'as5d45asd4', name:'tiago'}, {id: 'a45s4d5as68', name:'milena'}, {id: '4d45sf458', name: 'joãozinho'}]
// Este é o valor: 'tiago'
// Este é o item: 'name'
// Este é o retorno: true
exports.exist = (value, item, list) => {
    var found = false;
    list.forEach(function (cell) {
        if (cell[item] == value) {
            found = true;
        };
    });
    return found;
};

// Procura algo em um arrey com uma referencia ex: 
// Esta é a lista: [{id: 'as5d45asd4', name:'tiago'}, {id: 'a45s4d5as68', name:'milena'}, {id: '4d45sf458', name: 'joãozinho'}]
// Esta é a referencia: {item:'id',value:'a45s4d5as68'}
// Este é o item: 'name'
// Este é o retorno: 'milena'
exports.search = (reference, item, list) => {
    var value_ = false;
    list.forEach(function (cell) {
        if (cell[reference.item] == reference.value) {
            value_ = cell[item];
        };
    });
    return value_;
};

// Deleta algo de uma lista com uma referencia ex:
// Esta é a lista: [{id: 'as5d45asd4', name:'tiago'}, {id: 'a45s4d5as68', name:'milena'}, {id: '4d45sf458', name: 'joãozinho'}]
// Esta é a referencia: {item:'id',value:'a45s4d5as68'}
// Este é o retorno: [{id: 'as5d45asd4', name:'tiago'}, {id: '4d45sf458', name: 'joãozinho'}]
exports.delete = (reference, list) => {
    var list_ = list
    list_.forEach(function (cell, position) {
        if (cell[reference.item] == reference.value) {
            list_.splice(position, 1);
        };
    });
    return list_;
};

// Pega o horario e retorna ele formatado
// Retorno: 16:32 - 14/01
exports.get_hours = () => {
    var date = new Date();
    if ((date.getMonth() + 1) < 10) {var month = '0' + (date.getMonth() + 1)} else {var month = (date.getMonth() + 1)};
    if (date.getDate() < 10) {var day = '0' + date.getDate()} else {var day = date.getDate()};
    if (date.getHours() < 10) {var hours = '0' + date.getHours()} else {var hours = date.getHours()};
    if (date.getMinutes() < 10) {var minutes = '0' + date.getMinutes()} else {var minutes = date.getMinutes()};
    return hours + ':' + minutes + ' - ' + day + '/' + month;
};