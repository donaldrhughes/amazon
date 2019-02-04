/*
fulfill the customer's order updating the SQL database 
to reflect the remaining quantity.
Once the update goes through, show the customer the 
total cost of their purchase.
*/

//Required Modules
//=======================
var inquirer = require("inquirer");
var mysql = require("mysql");

//Required Files
//=======================
//extra -- mysql connection is built outside of the main js file
var mySqlConn = require("./mysql");
//extra  -- Products built by an external constructor function and imported in
var Product = require("./product");


//Global Variables
//========================
//(none) - challenge keep all vars out of global

//Main
//==========================
main();


//Functions
//=========================

//wrapper function
function main() {

    store();

}
//connect to the db, pulls and displays data, runs the func to buy products
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

//func to buy products
function flowProd(products) {
    //connect to mysql
    var connection = mySqlConn(connection);
    //get products info from db
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        //start user menu workflow to buy products
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    //user chooses which prod they want to buy
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
                    type: "list",
                    message: "How many units would you like to buy?",
                    //user chooses how many they want to buy
                    choices: ["1", "2", "3", "4", "5"],
                    name: "qty"
                }

            ])
            .then(function (ans) {
              
                numAns = Number(ans.qty);
                
                for (var i = 0; i < products.length; i++) {
                   
                    if (products[i].prodname == ans.choice) {
                        var foundName = products[i].prodname;
                        var foundPrice = products[i].price;
                        var foundQty = products[i].qty;
                        var foundId = products[i].itemid;
                        break;
                    }
                }
                console.log("Quantity found: " + foundQty);
             
                console.log("You chose to buy Total: " + numAns + " of Product: " + ans.choice);
               
                //verification
                //foundName == ans.choice &&

                //check if qty is ok
                //if product qty not ok inform user & restart
                if ( numAns >= foundQty) {
                    console.log("Unfortunately, " + foundName + " is not available at this time!");
                   
                    store();
                }
                else {
                    //if ok, remove prod from db qty and show total price
                    console.log("Product: " + foundName + " is available!.");
                    var newQty = (foundQty - numAns)
                   
                    //update database to reflect remaining quantity
                    var connection = mySqlConn(connection);
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity:newQty
                        
                    },{
                        item_id:foundId
                    }],
                        function (err, res) {
                         if (err) throw err;
                         products[i].qty = newQty;
                         console.log("order complete. Qty remaining: " + products[i].qty);
                         console.log("The price was: $" + (foundPrice * numAns));
                    connection.end();
                    store();
                        });

                    

                }
            });

    })

}