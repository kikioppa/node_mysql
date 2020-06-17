let express = require('express');
let db = require('../config/db');
let router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});*/




router.get('/', function(req, res, next) {

  const pageNum = Number(req.query.pageNum) || 1; // NOTE: 쿼리스트링으로 받을 페이지 번호 값, 기본값은 1
  const contentSize = 10; // NOTE: 페이지에서 보여줄 컨텐츠 수.
  const pnSize = 10; // NOTE: 페이지네이션 개수 설정.
  const skipSize = (pageNum - 1) * contentSize; // NOTE: 다음 페이지 갈 때 건너뛸 리스트 개수.

  let sql ='SELECT count(*) as count FROM bbs_tb'
  db.executeSql(sql, (countQueryErr, countQueryResult) => {
    if (countQueryErr) throw countQueryErr;
    const totalCount = Number(countQueryResult[0].count); // NOTE: 전체 글 개수.
    const pnTotal = Math.ceil(totalCount / contentSize); // NOTE: 페이지네이션의 전체 카운트
    const pnStart = ((Math.ceil(pageNum / pnSize) - 1) * pnSize) + 1; // NOTE: 현재 페이지의 페이지네이션 시작 번호.
    let pnEnd = (pnStart + pnSize) - 1; // NOTE: 현재 페이지의 페이지네이션 끝 번호.
    let sql ='SELECT * FROM `bbs_tb` ORDER BY id DESC LIMIT ?, ?'
    db.executeSql(sql, [skipSize, contentSize], (contentQueryErr, contentQueryResult) => {
      if (contentQueryErr) throw contentQueryErr;
      if (pnEnd > pnTotal) pnEnd = pnTotal; // NOTE: 페이지네이션의 끝 번호가 페이지네이션 전체 카운트보다 높을 경우.
      const result = {
        pageNum,
        pnStart,
        pnEnd,
        pnTotal,
        contents: contentQueryResult,
      };
      res.render('index', {
        articles: result,
      });
    });

    console.log(sql+'카운트');
  });
});











module.exports = router;
