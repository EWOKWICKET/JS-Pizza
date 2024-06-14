import pizzaInfo from "./Pizza_List.js";

let pizza_list = document.querySelector('#pizza-list');
// let cart = document.querySelector('#cart');


document.addEventListener("DOMContentLoaded", () => {
    initialiseMenu("all");

    initialiseButtons();
});

function filterPizzas(button, filter) {
    if (!button.classList.contains('chosen')) {
        document.querySelector('.chosen').classList.remove('chosen');
        button.classList.add('chosen');
        initialiseMenu(filter);
    }
}

function initialiseMenu(filter) {
    let filteredPizzas = [];
    pizza_list.innerHTML = '';

    if (filter == "all") {
        filteredPizzas = pizzaInfo;
    } else if (filter == "vega") {
        filteredPizzas = pizzaInfo.filter((pizza) => {
            return pizza.type == "Вега піца";
        });
    } else {
        filteredPizzas = pizzaInfo.filter((pizza) => {
            return JSON.stringify(pizza.content).includes(filter)
        });
    }

    filteredPizzas.forEach((pizza) => {
        addToMenu(pizza)
    });

    document.querySelector('.sort-title').querySelector('.amount').innerHTML = filteredPizzas.length;
    scalePizzaList(filteredPizzas.length);
}

function addToMenu(pizza) {
    const pizzaSizeContainerInner = pizzaSizes(pizza);
    const description = pizzaDescription(pizza);
    let banner = '';
    if (pizza.title == "Імпреза") {
        banner += '<div class="banner new">Нова</div>';
    } else if (pizza.title == "BBQ") {
        banner += '<div class="banner popular">Популярна</div>';
    }
    
    pizza_list.innerHTML += `
        <div class="pizza-card">
            ${banner}

            <img src="${pizza.icon}" alt="${pizza.title}">

            <div class="caption">
                <h3>${pizza.title}</h3>
                <p class="category">${pizza.type}</p>
                <p class="description">${description}</p>

                <div class="pizza-size-container">
                    ${pizzaSizeContainerInner}
                </div>
            </div>
        </div>
    `;
}

function pizzaSizes(pizza) {
    let pizzaSizeContainerInner = '';
    const pizzaSmallSize = pizza.small_size;
    const pizzaBigSize = pizza.big_size;
    

    if (pizzaSmallSize) {
        pizzaSizeContainerInner += `
            <div class="pizza-size">
                <div class="size-weight">
                    <span class="size"><img src="assets/images/size-icon.svg" alt="size">${pizzaSmallSize.size}</span>
                     <span class="weight"><img src="assets/images/weight.svg" alt="weight">${pizzaSmallSize.weight}</span>
                </div>
                <div class="price-info">
                      <span class="price">${pizzaSmallSize.price}<br>грн</span>
                     <button class="btn">Купити</button>
                   </div>
             </div>
        `;
    }

    if (pizzaBigSize) {
        pizzaSizeContainerInner += `
            <div class="pizza-size">
                <div class="size-weight">
                    <span class="size"><img src="assets/images/size-icon.svg" alt="size">${pizzaBigSize.size}</span>
                     <span class="weight"><img src="assets/images/weight.svg" alt="weight">${pizzaBigSize.weight}</span>
                </div>
                <div class="price-info">
                      <span class="price">${pizzaBigSize.price}<br>грн</span>
                     <button class="btn">Купити</button>
                   </div>
             </div>
        `;
    }

    return pizzaSizeContainerInner;
}

function pizzaDescription(pizza) {
    const pizzaContents = pizza.content;
    let description = '';

    for(const contentGroup in pizzaContents) {
        pizzaContents[contentGroup].forEach((content) => {
            description += content + ', ';
        });
    }

    return format(description);
}

function scalePizzaList(elementsAmount) {
    const width = window.innerWidth;

    if (elementsAmount == 1) {
        pizza_list.style.gridTemplateColumns = '1fr';
        pizza_list.style.width = '270px';
    } else if (elementsAmount == 2 && width > 950) {
        pizza_list.style.gridTemplateColumns = 'repeat(2, 1fr)';
        pizza_list.style.width = '540px';
    } else {
        pizza_list.style.gridTemplateColumns = '';
        pizza_list.style.width = '';
    }
}

function showMenu() {

}

function initialiseCart() {
    
}

function addToCart(pizza, size) {
    
}

function showCart() {
    
}

function initialiseButtons() {
    initialiseFilters();
}

function initialiseFilters() {
    const filters = ['all', 'meat', 'pineapple', 'mushroom', 'ocean', 'vega'];

    const filterButtons = document.querySelector('.navigation').getElementsByTagName('button');

    for (let filtersIndex = 0; filtersIndex < filterButtons.length; filtersIndex++) {
        (function(index) {
            filterButtons[index].addEventListener('click', () => {
                const filter = filters[index];
                filterPizzas(filterButtons[index], filter);
            });
        })(filtersIndex);
    }
}

function initialiseDecrement() {

}

function initialiseIncrement() {
    
}

function initialiseDelete() {
    
}

function format(string) {
    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1, string.length - 2);
}