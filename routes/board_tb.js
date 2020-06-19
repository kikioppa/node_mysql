var db = require('../config/db');
var express = require('express');
var router = express.Router();


/* GET users listing. */


router.get('/list', function (req, res, next) {
    console.log('req.cookies', req.cookies);
    let page = req.query.page ? parseInt(req.query.page, 10) : 1

    console.log(page);
    console.log(req.query);
    if (!page || page <= 0) page = 1
    const id = req.cookies.id;
    const query_body = 'from bbs_tb ' +
        'join member_tb ' +
        'on bbs_tb.id = member_tb.id ' +
        'where member_tb.id = ? ';

    let list_sql = 'select member_tb.id,tb_id,member_tb.member_name,title,bbs_tb.reg_date ' +
        query_body +
        'limit ?, ?'

    let count_sql = 'select count(*) as cnt ' +
        query_body;

    const list_count = 1;

    let limit_start = (page - 1) * list_count;

    const query_result = {
        is_error: true,
        error: null,
        total_count: 0,
        board_list: [],
        page: page,
        total_page :0,
        last: 0,
        prev : page-10,
        next : page+10,
        pageGroup : 0
        /*next : last+1,
        prev : first-1,
        first :last -(total_count-1)*!/*/
    }
    //datas 넣기

    const data = [id, limit_start, list_count]
    db.executeSql(count_sql, data, function (count_error, count_results, count_fields) {
        if (count_error || !count_results || count_results.length <= 0 ) {
            if (count_error) {
                query_result.error = count_error;
            } else {
                query_result.error = 'count result is empty';
            }
            res.status(400).json(query_result);
        } else {
            query_result.total_count =  count_results[0]["cnt"];
            query_result.total_page =   Math.ceil(count_results[0]["cnt"]/list_count);
            query_result.last =   page * count_results[0]["cnt"];
            query_result.pageGroup = Math.ceil(page/count_results[0]["cnt"]/list_count);
            db.executeSql(list_sql, data, function (error, results, fields) {
                // console.log(error, results, fields);
                console.log(req.cookies.name + '냥');
                if (error) {
                    query_result.error = error;
                } else {
                    query_result.is_error = false;
                    query_result.board_list = results;
                }
                /*data.push(results)*/
                res.json(query_result);
            })
        }
    })
});


// /board/content/2
router.get('/list?id', function (req, res, next) {
    const id = req.params.id
    const sql = 'select tb_id,member_tb.member_name,title,bbs_tb.reg_date,content from bbs_tb join member_tb on bbs_tb.id = member_tb.id where tb_id = ' + id

    console.log('아이디이' + id)
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


// /board/content/2
router.get('/list/:id', function (req, res, next) {
    const id = req.params.id
    const sql = 'select tb_id,member_tb.member_name,title,bbs_tb.reg_date,content from bbs_tb join member_tb on bbs_tb.id = member_tb.id where tb_id = ' + id

    console.log('아이디이' + id)
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
