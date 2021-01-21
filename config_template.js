// ARKAB - CONFIGS
// Aqui você configura seu servidor de acordo com seus gostos e necessidades
// Caso queria pode usar variaveis locais, são as seguintes porta: SERVER_PORT, nome: SERVER_NAME, maximo de mensagens: MAX_MESAGES_DB, maximo de ususarios: MAX_USERS

const configs = {
    server_name: 'Arkab Server', // Aqui você coloca o nome que desaja que seu servidor tenha entre as ""
    server_port: 8080, // A porta em que o servidor vai operar
    max_mesages_db: 650, // O numero maximo de mensagens salvas pelo servidor
    max_users: 150 // Define a quantidade maxima de usuarios conectados ao servidor em tempo real
};

module.exports = configs;