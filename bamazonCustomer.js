/*
Once the customer has placed the order, your 
application should check if your store has enough of 
the product to meet the customer's request.
If not, the app should log a phrase like Insufficient 
quantity!, and then prevent the order from going through.
However, if your store does have enough of the product, 
you should fulfill the customer's order.
This means updating the SQL database to reflect the 
emaining quantity.
Once the update goes through, show the customer the 
total cost of their purchase.
*/

//Required Modules
//=======================
var inquirer = require("inquirer");
var mysql = require("mysql");

//Required Files
//=======================
var mySqlConn = require("./mysql");
var Product = require("./product");


//Global Variables
//========================


//Main
//==========================
main();


//Functions
//=========================

function main() {
    
    store();
   
    
}
function store() {
    var connection = mySqlConn(connection);
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        
        var products = [];
        for (var i = 0; i < res.length; i++) {
            // store.push(res[i].product_name);
            var product = new Product(res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity);
            products.push(product);
        }
        console.table(products)
        connection.end();
        flowProd(products);

    })
}


function flowProd(products) {
    var connection = mySqlConn(connection);

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        
                        var prodInq = [];
                        for (var i = 0; i < res.length; i++) {
                            prodInq.push(res[i].product_name);
                        }
                       
                        return prodInq;
                    },
                    message: "What is the product you want to buy?",
                },
                {
                    type: "input",
                    message: "How many units would you like to buy?",
                    choices: ["1", "2", "3", "4", "5"],
                    name: "qty"
                }

            ])
            .then(function(ans) {
                console.table(products);
                console.log(ans.qty)
                console.log(ans.choice);
                // If the user says yes to another game, play again, otherwise quit the game
                if (ans.qty > 1000) {
                    console.log("greater")
                    connection.end();
                }
                else {
                    console.log("less")
                    connection.end();
                }
              });

    })


    //  console.log(connection);   

}