////////////////////////////////////   IMPORTS   ////////////////////////////////////

import { CreateRangeBlock } from './Components/CreateRangeBlock';
import { CreateSortMenu } from './Components/CreateSortMenu';
import { CreateCheckbox } from './Elements/CreateCheckbox';
import { CreateElement } from './Elements/CreateElement';
import { CreateImage } from './Elements/CreateImage';
import data from './data';
import CreateRoute from './route';
import { CreateSearchBar } from './Components/CreateSearchBar';
import { filters } from './Interfaces';

class CreateDefaultPage {
  // переменная которая хранит body
  private body = document.body;
  // Роутер
  private router = new CreateRoute();
  // метод создает header
  CreateHeader() {
    // создаем header, передаем в конструктор не все возможные аргументы, но он не ругается
    const header = new CreateElement({ tag: 'header', className: 'header' }).getnode();
    const wrapper = new CreateElement({ tag: 'div', className: 'wrapper header__wrapper' }).getnode();
    const textBlock = new CreateElement({ tag: 'div', className: 'header__text' }).getnode();
    const cartBlock = new CreateElement({ tag: 'div', className: 'header__cart' }).getnode();
    this.body.append(header);
    header.append(wrapper);
    wrapper.append(textBlock, cartBlock);
    const h1 = new CreateElement({ tag: 'h1', className: 'h1', content: 'Online Store' }).getnode();
    this.router.AddRoutingToHeader(h1);
    const subtitle = new CreateElement({
      tag: 'span',
      className: 'header__subtitle',
      content: 'best products, best sales, best service',
    }).getnode();
    textBlock.append(h1, subtitle);
    const cart = new CreateElement({ tag: 'div', className: 'cart' }).getnode();
    cartBlock.append(cart);
    const cartIcon = new CreateImage({
      src: '../assets/images/cart.svg',
      className: 'cart__icon',
      alt: 'cart icon',
    }).getnode();
    cart.append(cartIcon);
  }
  // метод для main
  CreateMain(filters: filters) {
    const product = new data();
    const main = new CreateElement({ tag: 'main', className: 'main' }).getnode();
    this.body.append(main);
    const wrapper = new CreateElement({ tag: 'div', className: 'wrapper main__wrapper' }).getnode();
    main.append(wrapper);
    // CreateAside
    const aside = new CreateElement({ tag: 'aside', className: 'aside' }).getnode();
    wrapper.append(aside);
    const buttonTop = new CreateElement({
      tag: 'button',
      className: 'button aside__button',
      content: 'Reset',
    }).getnode();
    this.router.AddRoutingToHeader(buttonTop);
    const categories = new CreateElement({ tag: 'div', className: 'aside__choice choice-menu' }).getnode();
    const brands = new CreateElement({ tag: 'div', className: 'aside__choice choice-menu' }).getnode();
    const MaxMinPrices = product.GetMinMaxPrice();
    const prises = new CreateRangeBlock({
      title: 'Prises',
      from: `$ ${MaxMinPrices.min}`,
      to: `$ ${MaxMinPrices.max}`,
      range1Min: MaxMinPrices.min,
      range1Max: MaxMinPrices.max,
      range1Value: MaxMinPrices.min,
      range2Min: MaxMinPrices.min,
      range2Max: MaxMinPrices.max,
      range2Value: MaxMinPrices.max,
      isPrice: true,
      id: 'price-slider',
      router: this.router,
    }).getnode();
    const MaxMinDate = product.GetMinMaxDate();
    const year = new CreateRangeBlock({
      title: 'Release date',
      from: MaxMinDate.min,
      to: MaxMinDate.max,
      range1Min: MaxMinDate.min,
      range1Max: MaxMinDate.max,
      range1Value: MaxMinDate.min,
      range2Min: MaxMinDate.min,
      range2Max: MaxMinDate.max,
      range2Value: MaxMinDate.max,
      isPrice: false,
      id: 'year-slider',
      router: this.router,
    }).getnode();
    const buttonBottom = new CreateElement({
      tag: 'button',
      className: 'button aside__button',
      content: 'Copy search link',
    }).getnode();
    buttonBottom.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
    });
    aside.append(buttonTop, categories, brands, prises, year, buttonBottom);
    const categoriesTitle = new CreateElement({
      tag: 'h2',
      className: 'choice-menu__title',
      content: 'Category',
    }).getnode();
    categories.append(categoriesTitle);
    const ListCategories = product.GetCategories();
    ListCategories.forEach((item) => {
      const current: [HTMLInputElement, HTMLLabelElement] = new CreateCheckbox({
        type: 'checkbox',
        name: 'Category',
        id: item.category,
        value: item.category,
        className: 'choice-menu__option',
        CountCategories: item.count,
      }).getnode();
      this.router.AddRoutingToCategory(current[0]);
      categories.append(current[0], current[1]);
    });
    const brandsTitle = new CreateElement({ tag: 'h2', className: 'choice-menu__title', content: 'Brand' }).getnode();
    brands.append(brandsTitle);
    const ListBrands = product.GetBrands();
    ListBrands.forEach((item) => {
      const current = new CreateCheckbox({
        type: 'checkbox',
        name: 'Category',
        id: item.brand,
        value: item.brand,
        className: 'choice-menu__option',
        CountCategories: item.count,
      }).getnode();
      this.router.AddRoutingToBrand(current[0]);
      brands.append(current[0], current[1]);
    });
    // CreateStore
    const store = new CreateElement({ tag: 'div', className: 'store' }).getnode();
    wrapper.append(store);
    const menu = new CreateElement({ tag: 'div', className: 'store__menu' }).getnode();
    /////  menu
    const foundProducts = new CreateElement({ tag: 'div', className: 'store__quantity', content: 'Found : ' }).getnode();
    const productsAmmount = new CreateElement({ tag: 'span', className: 'store__quantity-found', content: '65' }).getnode();
    foundProducts.append(productsAmmount);
    const sortMenu = new CreateSortMenu({ tag: 'div', className: 'sort-menu', router: this.router }).getnode();
    const searchBar = new CreateSearchBar({ tag: 'div', className: 'search', router: this.router }).getnode();




    menu.append(foundProducts, searchBar, sortMenu);
    ///// products
    const products = new CreateElement({ tag: 'div', className: 'store__products' }).getnode();
    store.append(menu, products);
    const cards = product.Get();
    cards.forEach((item) => {
      const CardBox = new CreateElement({
        tag: 'div',
        className: 'card__box',
        id: `card-${item.id.toString()}`,
        BackgroundImg: item.images[0],
      }).getnode();
      this.router.addrouting(CardBox);
      const CardModel = new CreateElement({ tag: 'h2', className: 'card__model', content: item.model }).getnode();
      const CardPrice = new CreateElement({
        tag: 'h2',
        className: 'card__price',
        content: `${item.price.toString()} $`,
      }).getnode();
      const CardAddtoCart = new CreateElement({tag: 'div', className: 'card__add-to-cart'}).getnode();
      CardBox.append(CardModel, CardPrice, CardAddtoCart);
      products.append(CardBox);

      CardAddtoCart.addEventListener('click', () => {
        CardAddtoCart.classList.toggle('_product-added');
      })
    });
  }
  // метод для footer
  // CreateFooter() {}
}

// const Page = new CreateDefaultPage();

// Page.CreateHeader();
// Page.CreateMain();
// Page.CreateFooter();


// const selected = document.querySelector(".selected");
// const optionsContainer = document.querySelector(".options-container");

// const optionsList = document.querySelectorAll(".option");

// selected!.addEventListener("click", () => {
//   optionsContainer!.classList.toggle("active");
// });

// optionsList.forEach(o => {
//   o.addEventListener("click", () => {
//     selected!.innerHTML = o.querySelector("label").innerHTML;
//     optionsContainer!.classList.remove("active");
//   });
// });

export default CreateDefaultPage;
