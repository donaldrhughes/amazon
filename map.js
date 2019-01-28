inquirer
.prompt([/* Pass your questions in here*/
{
    name: "action",
    message: "What action",
    choices: ["Create", "Read", "Update", "Delete"]
}

])
.then(answers => {
    if (answers.action === "Create"){
        inquirer
    }
})