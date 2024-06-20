import { initializeCartControlButtons } from './main.js'

let cartList = document.querySelector('#cart-list');
let cart = document.querySelector('#cart');
export let cartElements = [];

class PizzaCart {

    constructor() {
        this.loadCart();
    }

    buy(cartElementInfo) {
        let found = false;

        for (let elem of cartElements) {
            if (elem.id === cartElementInfo.id && elem.size.size === cartElementInfo.size.size) {
                found = true;
                break;
            }
        }

        if (!found) {
            this._createCartElement(cartElementInfo);
            this._addToCart(cartElementInfo);
        }
    }

    _createCartElement(cartElementInfo) {
        const newCartElement = document.createElement('div');
        newCartElement.classList.add('cart-item');
        newCartElement.setAttribute('data-id', cartElementInfo.id.toString());
        newCartElement.setAttribute('data-price', cartElementInfo.size.price.toString());
        newCartElement.setAttribute('data-size', cartElementInfo.size.size);

        newCartElement.innerHTML = `
            <div class="cart-item-info">
                <h3>${cartElementInfo.title}</h3>

                <div class="size-weight" style="flex-direction: row;">
                    <span class="size"><img src="assets/images/size-icon.svg" alt="Size">${cartElementInfo.size.size}</span>
                    <span class="weight"><img src="assets/images/weight.svg" alt="Weight">${cartElementInfo.size.weight}</span>
                </div>

                <div class="price-quantity-controller-container">
                    <span class="price">${cartElementInfo.size.price}<span>грн</span></span>
                    <button class="btn quantity-controller decrease">-</button>
                    <span class="quantity">${cartElementInfo.quantity}</span>
                    <button class="btn quantity-controller increase">+</button>
                    <button class="btn delete-item">✕</button>
                </div>
            </div>

            <img src="${cartElementInfo.icon}" class="image" alt="${cartElementInfo.title}">
        `;

        cartElementInfo.element = newCartElement;
        cartElements.push(cartElementInfo);
    }

    _addToCart(cartElementInfo) {
        cartList.append(cartElementInfo.element);
        cartList.append(document.createElement('hr'));

        this.saveCart();
        initializeCartControlButtons(cartElementInfo.element);

        this._updateCart();
        this._updateCartTotal(cartElementInfo.size.price * cartElementInfo.quantity, 1);
    }

    removeFromCart(cartElement) {
        cartElement.parentNode.removeChild(cartElement);

        cartElements = cartElements.filter(elem => elem.element !== cartElement);

        this._updateCart();
        this._updateCartTotal(parseInt(cartElement.querySelector('.price').textContent.replace('грн', '')), -1);

        this.saveCart();
    }

    oneLess(cartElement) {
        const quantityElement = cartElement.querySelector('.quantity');
        let currentQuantity = parseInt(quantityElement.textContent);
        if (currentQuantity > 1) {
            currentQuantity -= 1;
            quantityElement.textContent = currentQuantity.toString();

            const pricePerUnit = parseInt(cartElement.dataset.price);
            const newPrice = pricePerUnit * currentQuantity;
            const priceElement = cartElement.querySelector('.price');
            priceElement.textContent = `${newPrice} грн`;

            this._updateCartTotal(pricePerUnit, -1);
        } else {
            this.removeFromCart(cartElement);
        }

        this.saveCart();
    }

    oneMore(cartElement) {
        const quantityElement = cartElement.querySelector('.quantity');
        let currentQuantity = parseInt(quantityElement.textContent);
        currentQuantity += 1;
        quantityElement.textContent = currentQuantity;

        const pricePerUnit = parseInt(cartElement.dataset.price);
        const newPrice = pricePerUnit * currentQuantity;
        const priceElement = cartElement.querySelector('.price');
        priceElement.textContent = `${newPrice} грн`;

        this._updateCartTotal(pricePerUnit, 1);

        this.saveCart();
    }

    clearCart() {
        cartList.innerHTML = '';
        cartElements = [];
        this._updateCart();
        document.querySelector('.summary .price').textContent = '0грн';

        localStorage.clear();
    }

    _updateCart() {
        cart.querySelector('.amount').innerHTML = cartList.querySelectorAll('.cart-item').length;
    }

    _updateCartTotal(price, change) {
        const totalPriceElement = document.querySelector('.summary .price');
        let currentTotal = this._parsePrice(totalPriceElement);
        currentTotal += price * change;
        totalPriceElement.textContent = `${currentTotal}грн`;
    }

    _parsePrice(priceElement) {
        return parseInt(priceElement.textContent.replace('грн', ''));
    }

    saveCart() {
        localStorage.clear();

        const cartItems = [];
        cartList.querySelectorAll('.cart-item').forEach(item => {
            const id = parseInt(item.dataset.id);
            const size = parseInt(item.dataset.size);

            for (const elem of cartElements) {
                if (elem.id == id && elem.size.size === size) {
                    elem.quantity = parseInt(item.querySelector('.quantity').textContent);
                    cartItems.push(elem);
                    break;
                }
            };

        });
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    loadCart() {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        savedCart.forEach(item => {
            this._createCartElement(item);
            this._addToCart(item);
            const cartItem = cartList.querySelector(`[data-id="${item.id}"][data-size="${item.size.size}"]`); 
            const pizzaPrice = item.size.price * item.quantity;
            cartItem.querySelector('.price').textContent = `${pizzaPrice}грн`;
        });
    }
}

export default new PizzaCart();