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
    this.quantityCounter = new CreateElement({tag: 'span', className: 'item__quantity-counter', content: '1'}).getnode();
    this.quantityButtonLess = new CreateElement({tag: 'span', className: 'item__quantity-button item__less', content: '-'}).getnode();
    this.quantityButtonMore = new CreateElement({tag: 'span', className: 'item__quantity-button item__more', content: '+'}).getnode();
    this.quantityContainer.append(this.quantityButtonLess, this.quantityCounter, this.quantityButtonMore);
    this.price = new CreateElement({tag: 'div', className: 'item__price', content: '$ ' + data.price}).getnode();
    this.body.append(this.photoBlock, this.description, this.category, this.quantityContainer, this.price);
    this.delete = new CreateElement({tag: 'div', className: 'cart__item-delete'}).getnode();
    this.icon = new CreateElement({tag: 'span', className: 'cart__cross-icon'}).getnode();
    this.delete.append(this.icon)
    this.el.append(this.body, this.delete);

    console.log(+this.quantityCounter.textContent!)

    this.quantityButtonMore.addEventListener('click', () => {
      console.log(+this.quantityCounter.textContent!)
      this.quantityCounter.textContent = (+this.quantityCounter.textContent! + 1).toString();
    });
    this.quantityButtonLess.addEventListener('click', () => {
      console.log(+this.quantityCounter.textContent!)
      if (+this.quantityCounter.textContent! > 1) {
        this.quantityCounter.textContent = (+this.quantityCounter.textContent! - 1).toString();
      }
      if (+this.quantityCounter.textContent! <= 1) {
        this.el.remove();
      }
    });

    this.delete.addEventListener('click', () => {
      this.el.remove();
    })

    
  }
}