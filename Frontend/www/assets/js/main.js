const PizzaMenu = require('../../../src/pizza/PizzaMenu');
const PizzaCart = require('../../../src/pizza/PizzaCart');
const Pizza_List = require('../../../src/Pizza_List');

document.addEventListener("DOMContentLoaded", (event) => {
    //This code will execute when the page is ready


    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();
});