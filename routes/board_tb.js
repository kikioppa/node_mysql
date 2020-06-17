var db = require('../config/db');
var express = require('express');
var router = express.Router();




/* GET users listing. */
router.get('/list', function(req, res, next) {
    console.log('req.cookies', req.cookies);
    const id = req.cookies.id;
    let sql = 'select member_tb.id,tb_id,member_tb.member_name,title,bbs_tb.reg_date ' +
        'from bbs_tb ' +
        'join member_tb ' +
        'on bbs_tb.id = member_tb.id'
        +' where member_tb.id ' + ' = ' + id +' limit ?,?';
    //datas 넣기
    db.executeSql(sql, [10,10],function (error, results, fields) {
        console.log(error, results, fields);
        console.log(req.cookies.name + '냥');


        res.json(results);
    })
});
// /board/content/2
router.get('/list/:id', function(req, res, next) {
    const id = req.params.id
    const sql = 'select tb_id,member_tb.member_name,title,bbs_tb.reg_date,content from bbs_tb join member_tb on bbs_tb.id = member_tb.id where tb_id = ' + id

    console.log('아이디이'+ id)
    db.executeSql(sql, function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(400).send('쿼리에러');
            return;
        }

        console.log(results);
        res.json(results[0]);
    });
});



module.exports = router;
