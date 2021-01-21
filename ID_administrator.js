require('dotenv/config');
const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const arkab = require('./arkab');
const APLICATION_ID = 'x1ax3bzqirx605nrlodt';

// Aréa do banco de dados
const db = low(new FileSync('users_DB.json'));
db.defaults({ UserID: [] }).write() // Usado para criar a parte das mensagens no arquivo

// Aréa do Express
router.get('/new_user_ID/:aplication_id', (req, res) => {
    if(req.params.aplication_id == APLICATION_ID){
        while (q9fcos3hpkkagxpno1yj = true) {
            var ID = Math.random().toString(36).slice(-5);
            var ID_pass = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
            if (!arkab.exist(ID, 'ID', db.get('UserID').value()) && !arkab.exist(ID_pass, 'ID_pass', db.get('UserID').value())) {
                db.get('UserID').push({ ID: ID, ID_pass: ID_pass, multi_device: 'disabled' }).write();
                res.json({ID: ID, ID_pass: ID_pass});
                break;
            };
        };
    }else{
        res.send('desatulized application');
    };
});

router.get('/validate_use_id/:aplication_id/:id/:pass_id', (req, res) => {
    if(req.params.aplication_id == APLICATION_ID){
        if(!arkab.search({item:'ID', value:req.params.id},'ID_pass', db.get('UserID').value())){
            res.json({status: 'nonexistent'})
        }else{
            if(arkab.search({item:'ID', value:req.params.id},'ID_pass', db.get('UserID').value()) == req.params.pass_id){
                res.json({status: 'authorized'});
            }else{
                res.json({status: 'uauthorized'});
            };
        };
    }else{
        res.send('desatulized application');
    };
});

module.exports = router;