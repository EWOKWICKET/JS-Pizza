// import fs from "fs";
let fs;
fetch('http/fs')
.then((result) => {
    fs = fs;
});

let ejs;
fetch('http/ejs')
.then((result) => {
    ejs = ejs;
});


export const PizzaMenu_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/PizzaMenu_OneItem.ejs', "utf8"));

export const PizzaCart_OneItem = ejs.compile(fs.readFileSync('../templates/PizzaCart_OneItem.ejs', "utf8"));
