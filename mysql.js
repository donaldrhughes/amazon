var mysql = require("mysql");

//connect to mysql db
var mySqlConn = function mySqlConnect() {

    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "amazon_db"
    })
    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected to mysql: " + connection.threadId);

    })
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        console.log(res);
        console.log(res[0].product_name);
    })
};
module.exports = mySqlConn;