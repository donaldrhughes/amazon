/*first display all items for sale. Include ids, names, prices
---completed up to this point---
The app should then prompt users with two messages.
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
If this activity took you between 8-10 hours, then 
you've put enough time into this assignment. Feel 
free to stop here -- unless you want to take on the 
next challenge.*/

//Require
//=======================
var inquirer = require("inquirer");
var mysql = require("mysql");
var mySqlConn = require("./mysql");

//global variables
//========================
var arrProducts = ["prod1", "prod2", "prod3"];

//Main
//==========================
mySqlConn();

workflow(arrProducts);


//functions
//=========================

//read products from db
function rdProd(){
    
 
}
//push to arrProducts



//establish the inquirer workflow
function workflow(arrProducts) {
    
    inquirer
        .prompt([
            {
                type: "list",
                message: "What is the product you want to buy?",
                choices: arrProducts,
                name: "products",
            },
            {
                type: "input",
                message: "How many units of the product they would like to buy?",
                choices: [1,2,3,4,5],
                name: "qty",
            },

        ])
        .then(answers => {
            // if (answers === "Create") {
            //     inquirer
            // }
        })
}