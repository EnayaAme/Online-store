////////////////////////////////////   IMPORTS   ////////////////////////////////////

import { CreateRangeBlock } from './Components/CreateRangeBlock';
import { CreateSortMenu } from './Components/CreateSortMenu';
import { CreateCheckbox } from './Elements/CreateCheckbox';
import { CreateElement } from './Elements/CreateElement';
import { CreateImage } from './Elements/CreateImage';
import data from './data';
import CreateRoute from './route';
import { CreateSearchBar } from './Components/CreateSearchBar';
import { filters, product } from './Interfaces';
import { CreateRadio } from './Elements/CreateRadio';
import { CreateLink } from './Elements/CreateLink';

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
  CreateMain(filters: filters, ProductsCards: product[]) {
    console.log(filters);
    this.router.GetFilters(filters);
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
    const CurrentPrice = product.GetCurrentMinMaxPrice(ProductsCards);
    // if (filters.MinPrice === '16') {
    //   filters.MinPrice = CurrentPrice.min;
    // }
    const MaxMinPrices = product.GetMinMaxPrice();
    const prises = new CreateRangeBlock({
      title: 'Prises',
      from: `$ ${filters.MinPrice}`,
      to: `$ ${filters.MaxPrice}`,
      range1Min: MaxMinPrices.min,
      range1Max: MaxMinPrices.max,
      range1Value: filters.MinPrice,
      range2Min: MaxMinPrices.min,
      range2Max: MaxMinPrices.max,
      range2Value: filters.MaxPrice,
      isPrice: true,
      id: 'price-slider',
      router: this.router,
      filters: filters,
      current: CurrentPrice,
    }).getnode();
    const CurrentDate = product.GetCurrentMinMaxDate(new data().Get());
    console.log(new data().Get())
    const MaxMinDate = product.GetMinMaxDate();
    const year = new CreateRangeBlock({
      title: 'Release date',
      from: filters.MinYear,
      to: filters.MaxYear,
      range1Min: MaxMinDate.min,
      range1Max: MaxMinDate.max,
      range1Value: filters.MinYear,
      range2Min: MaxMinDate.min,
      range2Max: MaxMinDate.max,
      range2Value: filters.MaxYear,
      isPrice: false,
      id: 'year-slider',
      router: this.router,
      filters: filters,
      current: CurrentDate,
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
    //console.log(filters, ProductsCards)
    const ListCategories = product.GetCategories(ProductsCards);
    //const ListOfCurrentCategories = product.GetCurrentCategories(ProductsCards);
    ListCategories.forEach((item) => {
      const current: [HTMLInputElement, HTMLLabelElement] = new CreateCheckbox({
        type: 'checkbox',
        name: 'Category',
        id: item.category,
        value: item.category,
        className: 'choice-menu__option',
        Count: item.count,
        Current: item.CurrentCategory,
        filters: filters.Category,
      }).getnode();
      this.router.AddRoutingToCategory(current[0]);
      categories.append(current[0], current[1]);
    });
    const brandsTitle = new CreateElement({ tag: 'h2', className: 'choice-menu__title', content: 'Brand' }).getnode();
    brands.append(brandsTitle);
    const ListBrands = product.GetBrands(ProductsCards);
    ListBrands.forEach((item) => {
      const current = new CreateCheckbox({
        type: 'checkbox',
        name: 'Category',
        id: item.brand,
        value: item.brand,
        className: 'choice-menu__option',
        Count: item.count,
        Current: item.CurrentBrand,
        filters: filters.Brand,
      }).getnode();
      this.router.AddRoutingToBrand(current[0]);
      brands.append(current[0], current[1]);
    });
    // CreateStore
    const store = new CreateElement({ tag: 'div', className: 'store' }).getnode();
    wrapper.append(store);
    const menu = new CreateElement({ tag: 'div', className: 'store__menu' }).getnode();
    /////  menu
    const viewOptions = new CreateElement({ tag:'div', className:'store__view' }).getnode();
    const viewBlock1 = new CreateElement({ tag:'div', className:'store__optionBlock1' }).getnode();
    const view1 = new CreateRadio({type: 'radio', value: '', id: 'view1', name: 'view', className: 'view-option1', checked: true }).getnode();
    viewBlock1.append(view1[0], view1[1]);
    const view2 = new CreateRadio({type: 'radio', value: '', id: 'view2', name: 'view', className: 'view-option2' }).getnode();
    const viewBlock2 = new CreateElement({ tag:'div', className:'store__optionBlock2' }).getnode();
    viewBlock2.append(view2[0], view2[1]);
    viewOptions.append(viewBlock1, viewBlock2);
    ///////
    const foundProducts = new CreateElement({ tag: 'div', className: 'store__quantity', content: 'Found : ' }).getnode();
    const productsAmmount = new CreateElement({ tag: 'span', className: 'store__quantity-found', content: ProductsCards.length.toString() }).getnode();
    foundProducts.append(productsAmmount);
    const sortMenu = new CreateSortMenu({ tag: 'div', className: 'sort-menu', router: this.router, filter: filters.Sort }).getnode();
    const searchBar = new CreateSearchBar({ tag: 'div', className: 'search', router: this.router, filter: filters.Search }).getnode();
    menu.append(viewOptions, foundProducts, searchBar, sortMenu);

    ///// products
    const products = new CreateElement({ tag: 'div', className: 'store__products' }).getnode();
    store.append(menu, products);
    const cards = product.Get();
    ProductsCards.forEach((item) => {
      const CardBox = new CreateElement({
        tag: 'div',
        className: 'card__box',
        id: `card-${item.id.toString()}`,
        BackgroundImg: item.images[0],
      }).getnode();
      this.router.AddRoutingToCard(CardBox);
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
      
      viewBlock1.addEventListener('click', () => {
        if (view1[0].checked) {
          if (CardBox.classList.contains('_small-view')) {
            CardBox.classList.remove('_small-view');
          }
        }
      });
      
      viewBlock2.addEventListener('click', () => {
        if (view2[0].checked) {
          CardBox.classList.add('_small-view');
        }
      });
    });
  }
  // метод для footer
  CreateFooter() {
    const footer = new CreateElement({ tag: 'footer', className: 'footer' }).getnode();
    const wrapper = new CreateElement({ tag: 'div', className: 'wrapper footer__wrapper' }).getnode();
    footer.append(wrapper);
    this.body.append(footer);
    const cartBlock = new CreateElement({ tag: 'div', className: 'footer__cart' }).getnode();
    const footerCart = new CreateLink({ href: 'https://rs.school/js/', target: '_blank', className: 'footer__cart_light' }).getnode();
    const footerIcon = new CreateImage({ src: './assets/images/logo_rs_text.svg', alt: 'RS School', className: 'footer__logo'}).getnode();
    const references = new CreateElement({ tag: 'div', className: 'footer__references' }).getnode();
    const year = new CreateElement({ tag: 'span', className: 'footer__year', content: '2022' }).getnode();
    const SashaLink = new CreateLink({ href: 'https://github.com/balaxon', target: '_blank', className: 'footer__SashaGit', content: 'balaxon' }).getnode();
    const NataLink = new CreateLink({ href: 'https://github.com/EnayaAme', target: '_blank', className: 'footer__NataGit', content: 'EnayaAme' }).getnode();
    references.append(SashaLink, NataLink, year);
    footerCart.append(footerIcon);
    cartBlock.append(footerCart);
    wrapper.append(cartBlock, references);
  }
}

// const Page = new CreateDefaultPage();

// Page.CreateHeader();
// Page.CreateMain();
// Page.CreateFooter();


export default CreateDefaultPage;
