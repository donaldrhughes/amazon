var mysql = require("mysql");

//connect to mysql db
var mySqlConn = function (connection) {

    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "amazon_db"
    })
    
    connection.connect(function (err) {
        if (err) throw err;
        

    })
 return connection;
    
};
module.exports = mySqlConn;