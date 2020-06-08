var db = require('../config/db');
var express = require('express');
var router = express.Router();




/* GET users listing. */
router.get('/list', function(req, res, next) {
    db.executeSql('select * from bbs_tb join member_tb on bbs_tb.id = member_tb.id', function (error, results, fields) {
        console.log(error, results, fields);
        res.json(results);
    })
});
// /board/content/2
router.get('/content/:id', function(req, res, next) {
    const id = req.params.id
    const sql = 'select * from bbs_tb where tb_id = ' + id

    db.executeSql(sql, function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(400).send('쿼리에러');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
