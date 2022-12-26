interface ConstructorElement {
  tag: string;
  id?: string;
  className?: string;
  content?: string;
}
// схожий с прошлым только для img
interface ConstructorImage {
  src: string;
  id?: string;
  className?: string;
  alt?: string;
}

interface ConstructorCheckbox {
  type: string;
  name: string;
  id: string;
  value: string;
  className?: string;
}

// структура базового элемента //

class CreateElement {
  private el: HTMLElement;
  constructor({ tag, id, className, content }: ConstructorElement) {
    this.el = document.createElement(tag);
    if (id) {
      this.el.id = id;
    }
    if (className) {
      this.el.className = className;
    }
    if (content) {
      this.el.textContent = content;
    }
  }
  getnode() {
    return this.el;
  }
}

// структура картинки
class CreateImage {
  private el: HTMLImageElement;
  constructor({ src, id, className, alt }: ConstructorImage) {
    this.el = new Image();
    this.el.src = src;
    if (id) {
      this.el.id = id;
    }
    if (className) {
      this.el.classList.add(className);
    }
    if (alt) {
      this.el.alt = alt;
    }
  }
  getnode() {
    return this.el;
  }
}

class CreateCheckbox {
  private input: HTMLInputElement;
  private label: HTMLLabelElement;
  constructor({ type, name, id, value, className }: ConstructorCheckbox) {
    this.input = document.createElement('input');
    this.input.type = type;
    this.input.name = name;
    this.input.id = id;
    this.input.value = value;
    if (className) {
      this.input.classList.add(className);
    }
    this.label = document.createElement('label');
    this.label.htmlFor = id;
    this.label.textContent = value;
  }
  getnode() {
    const arr: [HTMLInputElement, HTMLLabelElement] = [this.input, this.label];
    return arr;
  }
}

class CreateDefaultPage {
  // переменная которая хранит body
  private body = document.body;
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
  CreateMain() {
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
    const categories = new CreateElement({ tag: 'div', className: 'aside__choice choice-menu' }).getnode();
    const brands = new CreateElement({ tag: 'div', className: 'aside__choice choice-menu' }).getnode();
    const buttonBottom = new CreateElement({
      tag: 'button',
      className: 'button aside__button',
      content: 'Copy search link',
    }).getnode();
    aside.append(buttonTop, categories, brands, buttonBottom);
    const categoriesTitle = new CreateElement({
      tag: 'h2',
      className: 'choice-menu__title',
      content: 'Category',
    }).getnode();
    categories.append(categoriesTitle);
    const current = new CreateCheckbox({
      type: 'checkbox',
      name: 'Category',
      id: 'Smartphone',
      value: 'Smartphone',
      className: 'choice-menu__option',
    }).getnode();
    categories.append(current[0], current[1]);
    const brandsTitle = new CreateElement({ tag: 'h2', className: 'choice-menu__title', content: 'Brand' }).getnode();
    brands.append(brandsTitle);

    // CreateStore
    const store = new CreateElement({ tag: 'div', className: 'store' }).getnode();
    wrapper.append(store);
    const menu = new CreateElement({ tag: 'div', className: 'store__menu' }).getnode();
    const products = new CreateElement({ tag: 'div', className: 'store__products' }).getnode();
    store.append(menu, products);
  }
  // метод для footer
  // CreateFooter() {}
}

// const Page = new CreateDefaultPage();

// Page.CreateHeader();
// Page.CreateMain();
// Page.CreateFooter();

export default CreateDefaultPage;
