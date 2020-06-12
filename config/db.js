var mysql      = require('mysql');

function createConnection() {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'dpaxldlwl_!',
        database : 'member'
    });

    return connection;
}

function executeSql(sql,datas, callback) {
    var connection = createConnection()
    connection.connect();
    connection.query(sql,datas, function (error, results, fields) {
        console.log(sql, '\n', error, results);
        if (callback) callback(error, results, fields)
    });

    connection.end();
}


function executeSql2(sql,callback) {
    var connection = createConnection()
    connection.connect();
    connection.query(sql,function (error, results, fields) {
        console.log(sql, '\n', error, results);
        if (callback) callback(error, results, fields)
    });

    connection.end();
}

module.exports = {
    'executeSql': executeSql, //??? 다른이름 가능?,
    'executeSql2': executeSql2 //??? 다른이름 가능?
}
