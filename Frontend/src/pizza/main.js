import PizzaCart, { cartElements } from "./PizzaCart.js";
import PizzaMenu from "./PizzaMenu.js";

document.addEventListener("DOMContentLoaded", () => {
    initialiseButtons();
});

window.addEventListener('resize', () => {
    PizzaMenu.scalePizzaList();
});

function initialiseButtons() {
    initializeFilters();
    initializeClearCart();
    initializeBuy();
}

function initializeFilters() {
    const filters = ['all', 'meat', 'pineapple', 'mushroom', 'ocean', 'vega'];

    const filterButtons = document.querySelector('.navigation').getElementsByTagName('button');

    for (let filtersIndex = 0; filtersIndex < filterButtons.length; filtersIndex++) {
        (function (index) {
            filterButtons[index].addEventListener('click', () => {
                PizzaMenu.filterPizzas(filterButtons[index], filters[index]);
            });
        })(filtersIndex);
    }
}

export function initializeBuy() {
    const buyButtons = document.querySelectorAll('#pizza-list .btn');

    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sizeContainer = button.closest('.pizza-size');
            const pizzaCard = button.closest('.pizza-card');

            const id = Number(pizzaCard.dataset.id);
            const icon = '../www/' + pizzaCard.querySelector('img').getAttribute('src');
            let title = pizzaCard.querySelector('h3').textContent;
            const weight = Number(sizeContainer.querySelector('.weight').textContent);
            const size = Number(sizeContainer.querySelector('.size').textContent);

            const priceMatch = sizeContainer.querySelector('.price').textContent.match(/\d+/);
            const price = priceMatch ? Number(priceMatch[0]) : 0;

            if (sizeContainer.parentElement.querySelectorAll('.pizza-size').length === 2) {
                title += size === 30 ? ' (Мала)' : ' (Велика)';
            }

            const pizzaInfo = {
                id: id,
                icon: icon,
                title: title,
                size: {
                    weight: weight,
                    size: size,
                    price: price,
                },
                quantity: 1
            };

            PizzaCart.buy(pizzaInfo);
        });
    });
}

export function initializeCartControlButtons(cartItem) {
    initializeDecrement(cartItem);
    initializeIncrement(cartItem);
    initializeDelete(cartItem)
}

function initializeDecrement(cartItem) {
    const decrementButton = cartItem.querySelector('.decrease');
    decrementButton.addEventListener('click', () => {
        PizzaCart.oneLess(cartItem);
    });
}

function initializeIncrement(cartItem) {
    const incrementButton = cartItem.querySelector('.increase');
    incrementButton.addEventListener('click', () => {
        PizzaCart.oneMore(cartItem);
    });
}

function initializeDelete(cartItem) {
    const deleteButton = cartItem.querySelector('.delete-item');
    deleteButton.addEventListener('click', function () {
        const cartItem = deleteButton.closest('.cart-item');
        PizzaCart.removeFromCart(cartItem);
    });
}

function initializeClearCart() {
    const clearButton = document.querySelector('.clear');

    clearButton.addEventListener('click', () => {
        PizzaCart.clearCart();
    });
}