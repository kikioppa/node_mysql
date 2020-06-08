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

function executeSql(sql, callback) {
    var connection = createConnection()
    connection.connect();
    connection.query(sql, function (error, results, fields) {
        console.log(error, results, fields);
        if (callback) callback(error, results, fields)
    });

    connection.end();
}

module.exports = {
    'executeSql': executeSql
}
