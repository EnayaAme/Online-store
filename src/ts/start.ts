////////////////////////////////////   INTERFACES   ////////////////////////////////////

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

interface ConstructorRange {
  type: string;
  min: string;
  max: string;
  value: string;
  id: string;
  className?: string;
}

interface ConstructorRangeBlock {
  title: string;
  from: string;
  to: string;
  range1Min: string;
  range2Min: string;
  range1Max: string;
  range2Max: string;
  range1Value: string;
  range2Value: string;
}

////////////////////////////////////   CLASSES   ////////////////////////////////////

// структура базового элемента //

class CreateElement {
  protected el: HTMLElement;
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
    const quantity = document.createElement('span');
    quantity.textContent = '  (10/15)';
    this.label.append(quantity);
  }
  getnode() {
    const arr: [HTMLInputElement, HTMLLabelElement] = [this.input, this.label];
    return arr;
  }
}

class CreateRange {
  private input: HTMLInputElement;
  constructor({ type, min, max, value, id, className }: ConstructorRange) {
    this.input = document.createElement('input');
    this.input.type = type;
    this.input.min = min;
    this.input.max = max;
    this.input.id = id;
    this.input.value = value;
    if (className) {
      this.input.classList.add(className);
    }
  }

  getnode() {
    return this.input;
  }
}

class CreateRangeBlock extends CreateElement {
  private title: HTMLElement;
  private nums: HTMLElement;
  private from: HTMLElement;
  private to: HTMLElement;
  private rangeBlock: HTMLElement;
  private rangeLine: HTMLElement;
  private range1: HTMLInputElement;
  private range2: HTMLInputElement;

  constructor({
    title,
    from,
    to,
    range1Min,
    range1Max,
    range1Value,
    range2Min,
    range2Max,
    range2Value,
  }: ConstructorRangeBlock) {
    super({ tag: 'div', className: 'aside__range range-menu' });
    this.title = new CreateElement({ tag: 'h2', className: 'range-menu__title', content: title }).getnode();
    this.nums = new CreateElement({ tag: 'div', className: 'range-menu__numbers' }).getnode();
    this.from = new CreateElement({ tag: 'span', className: 'range-menu__from', content: from }).getnode();
    this.to = new CreateElement({ tag: 'span', className: 'range-menu__to', content: to }).getnode();
    this.nums.append(this.from, this.to);
    this.rangeBlock = new CreateElement({ tag: 'div', className: 'range-menu__range' }).getnode();
    this.rangeLine = new CreateElement({ tag: 'div', className: 'range-menu__tracker' }).getnode();
    this.range1 = new CreateRange({
      type: 'range',
      min: range1Min,
      max: range1Max,
      value: range1Value,
      id: 'slider-1',
      className: 'range-menu__slider',
    }).getnode();
    this.range2 = new CreateRange({
      type: 'range',
      min: range2Min,
      max: range2Max,
      value: range2Value,
      id: 'slider-2',
      className: 'range-menu__slider',
    }).getnode();
    this.rangeBlock.append(this.rangeLine, this.range1, this.range2);
    this.el.append(this.title, this.nums, this.rangeBlock);
    ////////////////////// функционал //////////////////////
    this.range1.addEventListener('input', () => {
      if (parseInt(this.range2.value) - parseInt(this.range1.value) <= 0) {
        this.range1.value = String(parseInt(this.range2.value) - 0);
      }
      this.from.textContent = '$ ' + this.range1.value;
      const percent1 = (+this.range1.value / +this.range1.max) * 100;
      const percent2 = (+this.range2.value / +this.range1.max) * 100;
      this.rangeLine.style.background = `linear-gradient(to right, rgba(105, 0, 31, 0.08) ${percent1}% , #69001F ${percent1}% , #69001F ${percent2}%, rgba(105, 0, 31, 0.08) ${percent2}%)`;
    });
    this.range2.addEventListener('input', () => {
      if (parseInt(this.range2.value) - parseInt(this.range1.value) <= 0) {
        this.range2.value = String(parseInt(this.range1.value) + 0);
      }
      this.to.textContent = '$ ' + this.range2.value;
      const percent1 = (+this.range1.value / +this.range1.max) * 100;
      const percent2 = (+this.range2.value / +this.range1.max) * 100;
      this.rangeLine.style.background = `linear-gradient(to right, rgba(105, 0, 31, 0.08) ${percent1}% , #69001F ${percent1}% , #69001F ${percent2}%, rgba(105, 0, 31, 0.08) ${percent2}%)`;
    });
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

    const prises = new CreateRangeBlock({
      title: 'Prises',
      from: '$ 0',
      to: '$ 1000',
      range1Min: '0',
      range1Max: '1000',
      range1Value: '0',
      range2Min: '0',
      range2Max: '1000',
      range2Value: '1000',
    }).getnode();
    const year = new CreateRangeBlock({
      title: 'Release date',
      from: '2017',
      to: '2022',
      range1Min: '0',
      range1Max: '1000',
      range1Value: '0',
      range2Min: '0',
      range2Max: '1000',
      range2Value: '1000',
    }).getnode();
    const buttonBottom = new CreateElement({
      tag: 'button',
      className: 'button aside__button',
      content: 'Copy search link',
    }).getnode();
    aside.append(buttonTop, categories, brands, prises, year, buttonBottom);
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
