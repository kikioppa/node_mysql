let db = require('../config/db');
let express = require('express');
let router = express.Router();

router.get('/', function (req, res, next) {
    res.render('new');
});

router.get('/edit', function (req, res, next) {
    res.render('edit');
});

router.post("/new", function (req, res) {
    console.log("삽입 포스트 데이터 진행")
    console.log('req.body',req.body)
    let title = req.body['title'];
    let content = req.body['content'];
    const id = req.cookies.id;
    let datas = [id,title,content]
    let sql = 'insert into bbs_tb (id,title,content) values (?,?,?)';
    db.executeSql(sql,datas,function (err,result,fields) {
//응답
            if (err){ throw err
                console.log(err);
            }

        res.redirect('/');
    })

})


router.post("/edit/:id", function (req, res) {
    console.log("수정진행")
    console.log('req.body',req.body)
  /*  let title = req.body['title'];
    let content = req.body['content'];
    const id = req.cookies.id;
    let datas = [id,title,content]
    let sql = 'insert into bbs_tb (id,title,content) values (?,?,?)';*/

    const id = req.params.id
    const sql = 'select tb_id,member_tb.member_name,title,bbs_tb.reg_date,content from bbs_tb join member_tb on bbs_tb.id = member_tb.id where tb_id = ' + id


    db.executeSql(sql,datas,function (err,result,fields) {
//응답
        if (err) {
            console.error(err);
            res.status(400).send('쿼리에러');
            return;
        }

        console.log(sql +"이힝");
        res.json(result[0]);
    })

})



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



/*router.post("/edit", function (req, res) {
    console.log("게시글 삭제")
    const tb_id = req.body.tb_id;
    const title = req.body.title;
    const content = req.body.content;

    let sql = 'update bbs_tb set title = '[title] + ', content = ' + [content] + 'where tb_id =' + tb_id;
    console.log('sql'+sql);
    db.executeSql2(sql,function (err,result,fields) {
//응답
        if (err){
            console.log(err);
        }


        res.json(result);
    })

})*/

















router.post("/delete", function (req, res) {
    console.log("게시글 삭제")
    const tb_id = req.body.tb_id;
    let sql = 'delete from bbs_tb where tb_id = '+ tb_id;
    console.log('sql'+sql);
    db.executeSql2(sql,function (err,result,fields) {
//응답
        if (err){
            console.log(err);
        }


        res.json(result);
    })

})



module.exports = router;