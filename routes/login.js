var db = require('../config/db');
var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.render('login');
});


router.post('/', function (req, res, next) {
    var userId = req.body['userId'];
    var userPw = req.body['userPw'];
    db.executeSql("select * from member_tb where member_id =" +
        "'" + userId + "' and member_pw= '" + userPw + "'", function (err, rows, fields) {
        if (!err) {
            if (rows[0]) {
                res.cookie('id', rows[0]['id'])
                res.cookie('pw', rows[0]['member_pw'])
                res.cookie('name', rows[0]['member_name'])
                res.send('id : ' + rows[0]['id'] + '<br>' +
                    'pw : ' + rows[0]['member_pw']);
            } else {
                res.send('no data');
            }

        } else {
            res.send('error : ' + err);
        }
    });
});
module.exports = router;