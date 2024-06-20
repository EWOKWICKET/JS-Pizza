import pizzaInfo from "../Pizza_List.js";
import format from '../utils/format.js';
import {initializeBuy} from './main.js';    

let pizza_list = document.querySelector('#pizza-list');
let allPizzas = [];
let pizzasToShow = [];
let pizza_list_childs = 8;

class PizzaMenu {

    constructor() {
        this.init();
    }

    init() {
        pizzaInfo.forEach(pizza => {
            this.addToMenu(pizza)
        });
    }

    filterPizzas(button, filter) {
        if (!button.classList.contains('chosen')) {
            button.parentNode.querySelector('.chosen').classList.remove('chosen');
            button.classList.add('chosen');

            pizza_list.innerHTML = '';

            if (filter === 'all') {
                pizzasToShow = allPizzas;
            } else {
                pizzasToShow = allPizzas.filter(pizza => pizza.dataset.filters.split(',').includes(filter));
            }

            this.showMenu();
        }
    }

    addToMenu(pizza) {
        const pizzaSizeContainer = this.pizzaSizes(pizza);
        const description = this.pizzaDescription(pizza);
        let banner = this.checkBanner(pizza);
        const filterTypes = this.checkFilters(pizza);
        const filterTypesString = filterTypes.join(',');

        const pizzaCard = document.createElement('div');
        pizzaCard.classList.add('pizza-card');
        pizzaCard.setAttribute('data-filters', filterTypesString);
        pizzaCard.setAttribute('data-id', pizza.id.toString());
        pizzaCard.innerHTML = `
            ${banner}
            <img src="${'../www/' + pizza.icon}" alt="${pizza.title}">
        `;

        const caption = document.createElement('div');
        caption.classList.add('caption');
        caption.innerHTML = `
            <h3>${pizza.title}</h3>
            <p class="category">${pizza.type}</p>
        `;
        caption.append(description, pizzaSizeContainer);

        pizzaCard.append(caption);

        allPizzas.push(pizzaCard);
    }

    checkFilters(pizza) {
        let filterTypes = [];

        if (pizza.type === "Вега піца") filterTypes.push('vega');

        Object.keys(pizza.content).forEach(key => {
            switch (key) {
                case 'meat':
                    filterTypes.push('meat');
                    break;
                case 'pineapple':
                    filterTypes.push('pineapple');
                    break;
                case 'mushroom':
                    filterTypes.push('mushroom');
                    break;
                case 'ocean':
                    filterTypes.push('ocean');
                    break;
            }
        });

        return filterTypes;
    }

    checkBanner(pizza) {
        if (pizza.is_new) {
            return '<div class="banner new">Нова</div>';
        } else if (pizza.is_popular) {
            return '<div class="banner popular">Популярна</div>';
        } else {
            return '';
        }
    }

    pizzaSizes(pizza) {
        const pizzaSizeContainer = document.createElement('div');
        pizzaSizeContainer.classList.add('pizza-size-container');

        if (pizza.small_size) {
            const pizzaSmallSize = pizza.small_size;
            pizzaSizeContainer.innerHTML += `
                <div class="pizza-size">
                    <div class="size-weight">
                        <span class="size"><img src="../www/assets/images/size-icon.svg" alt="size">${pizzaSmallSize.size}</span>
                        <span class="weight"><img src="../www/assets/images/weight.svg" alt="weight">${pizzaSmallSize.weight}</span>
                    </div>
                    <div class="price-info">
                        <span class="price">${pizzaSmallSize.price}грн</span>
                        <button class="btn">Купити</button>
                    </div>
                </div>
            `;
        }

        if (pizza.big_size) {
            const pizzaBigSize = pizza.big_size;
            pizzaSizeContainer.innerHTML += `
                <div class="pizza-size">
                    <div class="size-weight">
                        <span class="size"><img src="../www/assets/images/size-icon.svg" alt="size">${pizzaBigSize.size}</span>
                        <span class="weight"><img src="../www/assets/images/weight.svg" alt="weight">${pizzaBigSize.weight}</span>
                    </div>
                    <div class="price-info">
                        <span class="price">${pizzaBigSize.price}грн</span>
                        <button class="btn">Купити</button>
                    </div>
                </div>
            `;
        }

        return pizzaSizeContainer;
    }

    pizzaDescription(pizza) {
        const description = document.createElement('p');
        description.classList.add('description');
        let inner = '';

        Object.values(pizza.content).forEach(contents => {
            contents.forEach(content => {
                inner += content + ', ';
            });
        });

        description.innerHTML = format(inner); 

        return description;
    }

    showMenu() {
        pizzasToShow.forEach(pizza => {
            pizza_list.append(pizza);
        });

        initializeBuy();

        const pizzasInList = pizzasToShow.length;
        pizza_list_childs = pizzasInList;
        document.querySelector('.amount').innerHTML = '' + pizzasInList;
    }

    scalePizzaList() {
        const width = window.innerWidth;

        if (pizza_list_childs === 1) {
            pizza_list.style.gridTemplateColumns = '1fr';
            pizza_list.style.width = '270px';
        } else if (pizza_list_childs === 2 && width > 950) {
            pizza_list.style.gridTemplateColumns = 'repeat(2, 1fr)';
            pizza_list.style.width = '540px';
        } else {
            pizza_list.style.gridTemplateColumns = '';
            pizza_list.style.width = '';
        }
    }
}

export default new PizzaMenu();