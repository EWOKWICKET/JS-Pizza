import fs from 'fs';
import fs from 'ejs';

export const PizzaMenu_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/PizzaMenu_OneItem.ejs', "utf8"));
export const PizzaCart_OneItem = ejs.compile(fs.readFileSync('../templates/PizzaCart_OneItem.ejs', "utf8"));