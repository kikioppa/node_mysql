let db = require('../config/db');
let express = require('express');
let router = express.Router();

router.get('/', function (req, res, next) {
    res.render('new');
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



router.post("/bbs/delete", function (req, res) {
    console.log("게시글 삭제")
    const id = req.cookies.id;
    const tb_id = req.params.id;
    let sql = 'delete from bbs_tb where tb_id = '+ tb_id;
    db.executeSql(sql,datas,function (err,result,fields) {
//응답
        if (err){ throw err
            console.log(err);
        }

        res.json(results);
    })

})



module.exports = router;