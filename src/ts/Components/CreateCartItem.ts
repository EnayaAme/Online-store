import { CreateElement } from "../Elements/CreateElement";
import { product } from "../Interfaces";
import { CreateImage } from "../Elements/CreateImage";

export class CreateCartItem extends CreateElement {
  private body: HTMLElement;
  private delete: HTMLElement;
  private icon: HTMLElement;
  private photo: HTMLImageElement;
  private photoBlock: HTMLElement;
  private description: HTMLElement;
  private category:  HTMLElement;
  private quantityContainer: HTMLElement;
  private quantityCounter: HTMLElement;
  private quantityButtonLess: HTMLElement;
  private quantityButtonMore: HTMLElement;
  private price: HTMLElement;
  private descriptionTitle: HTMLElement;
  private descriptionText: HTMLElement;


  constructor(data: product) {
    let ProductsFromLocalStorage: product[] = [];
    if (localStorage.getItem('products') !== null && localStorage.getItem('products')?.length !== 0) {
      ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products')!);
      ProductsFromLocalStorage.forEach((item) => {
        
      });
    }
    super({ tag: 'div', className: 'cart__item' });
    this.body = new CreateElement({tag: 'div', className: 'cart__item-body'}).getnode();
    this.photoBlock = new CreateElement({tag: 'div', className: 'item__photo-block'}).getnode();
    this.photo = new CreateImage({src: data.images[0], className: 'item__photo'}).getnode();
    this.photoBlock.append(this.photo);
    this.description = new CreateElement({tag: 'div', className: 'item__description'}).getnode();
    this.descriptionTitle = new CreateElement({tag: 'div', className: 'item__description-title', content: `${data.model}`}).getnode();
    this.descriptionText = new CreateElement({tag: 'div', className: 'item__description-text', content: `${data.description}`}).getnode();
    this.description.append(this.descriptionTitle, this.descriptionText);
    this.category = new CreateElement({tag: 'div', className: 'item__category', content: `${data.category}` }).getnode();
    this.quantityContainer = new CreateElement({tag: 'div', className: 'item__quantity'}).getnode();
    this.quantityCounter = new CreateElement({tag: 'span', className: 'item__quantity-counter', content: data.counter.toString() }).getnode();
    this.quantityButtonLess = new CreateElement({tag: 'span', className: 'item__quantity-button item__less', content: '-'}).getnode();
    this.quantityButtonMore = new CreateElement({tag: 'span', className: 'item__quantity-button item__more', content: '+'}).getnode();
    this.quantityContainer.append(this.quantityButtonLess, this.quantityCounter, this.quantityButtonMore);
    this.price = new CreateElement({tag: 'div', className: 'item__price', content: '$ ' + data.price*data.counter}).getnode();
    this.body.append(this.photoBlock, this.description, this.category, this.quantityContainer, this.price);
    this.delete = new CreateElement({tag: 'div', className: 'cart__item-delete'}).getnode();
    this.icon = new CreateElement({tag: 'span', className: 'cart__cross-icon'}).getnode();
    this.delete.append(this.icon)
    this.el.append(this.body, this.delete);
    //let ProductsFromLocalStorage: product[] = [];

    this.quantityButtonMore.addEventListener('click', () => {
      ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products')!);
      ProductsFromLocalStorage.forEach((item) => {
        if (item.id === data.id) {
          item.counter += 1;
          localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
          this.quantityCounter.textContent = item.counter.toString();
          this.price.textContent = `$ ${item.price * item.counter}`;
        }
      });
      this.currentData(ProductsFromLocalStorage);
    });

    this.quantityButtonLess.addEventListener('click', () => {
      ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products')!);
        ProductsFromLocalStorage.forEach((item) => {
          if (data.id === item.id) {
            if (item.counter > 1) {
              item.counter -= 1;
              localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
              this.quantityCounter.textContent = item.counter.toString();
              this.price.textContent = `$ ${item.price * item.counter}`;
            } else {
              let index = 0;
              ProductsFromLocalStorage.forEach((it, ind) => {
                if (it.id === item.id) {
                  index = ind;
                }
              });
              ProductsFromLocalStorage.splice(index, 1);
              localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
              this.el.remove();
            }
          }
        });
      this.currentData(ProductsFromLocalStorage);
    });

    this.delete.addEventListener('click', () => {
      ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products')!);
      let index = 0;
      ProductsFromLocalStorage.forEach((it, ind) => {
        if (it.id === data.id) {
          index = ind;
        }
      });
      ProductsFromLocalStorage.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
      this.el.remove();
      this.currentData(ProductsFromLocalStorage);
      })
  }
  currentData(data: product[]) {
    let counter: number = 0;
    let totalprice: number = 0;
    const counterBasket = document.getElementById('counter-basket');
    const allPriceBasket = document.getElementById('all-price-basket');
    data.forEach((item) => {
      counter += item.counter;
      totalprice += item.counter * item.price;
    });
    counterBasket!.textContent = counter.toString();
    allPriceBasket!.textContent = totalprice.toString() + '$';
  }
}