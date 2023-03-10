import { CreateElement } from '../Elements/CreateElement';
import { product } from '../Interfaces';
import { CreateImage } from '../Elements/CreateImage';
import { ApplyRouting } from '../ApplyRouting';
import Router from '../route';

export class CreateCartItem {
  constructor(limit: number, page: number) {
    const router = new Router();
    const tag = document.getElementById('cart-items');
    let ProductsFromLocalStorage: product[] = [];
    let counter = 0;
    if (localStorage.getItem('products') !== null && localStorage.getItem('products')?.length !== 0) {
      ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products')!);
      ProductsFromLocalStorage.forEach((data) => {
        const cartItem = new CreateElement({ tag: 'div', className: 'cart__item' }).getnode();
        const cartItemBody = new CreateElement({ tag: 'div', className: 'cart__item-body' }).getnode();
        const photoBlock = new CreateElement({ tag: 'div', className: 'item__photo-block' }).getnode();
        const photo = new CreateImage({
          src: data.images[0],
          className: 'item__photo',
          id: `card-${data.id.toString()}`,
        }).getnode();
        photoBlock.append(photo);
        const description = new CreateElement({ tag: 'div', className: 'item__description' }).getnode();
        const descriptionTitle = new CreateElement({
          tag: 'div',
          className: 'item__description-title',
          content: `${data.model}`,
          id: `card-${data.id.toString()}`,
        }).getnode();
        const descriptionText = new CreateElement({
          tag: 'div',
          className: 'item__description-text',
          content: `${data.description}`,
        }).getnode();
        description.append(descriptionTitle, descriptionText);
        const category = new CreateElement({
          tag: 'div',
          className: 'item__category',
          content: `${data.category}`,
        }).getnode();
        const quantityContainer = new CreateElement({ tag: 'div', className: 'item__quantity' }).getnode();
        const quantityCounter = new CreateElement({
          tag: 'span',
          className: 'item__quantity-counter',
          content: data.counter.toString(),
        }).getnode();
        const quantityButtonLess = new CreateElement({
          tag: 'span',
          className: 'item__quantity-button item__less',
          content: '-',
        }).getnode();
        const quantityButtonMore = new CreateElement({
          tag: 'span',
          className: 'item__quantity-button item__more',
          content: '+',
        }).getnode();
        quantityContainer.append(quantityButtonLess, quantityCounter, quantityButtonMore);
        const price = new CreateElement({
          tag: 'div',
          className: 'item__price',
          content: '$ ' + data.price * data.counter,
        }).getnode();
        cartItemBody.append(photoBlock, description, category, quantityContainer, price);
        const cartItemdelete = new CreateElement({ tag: 'div', className: 'cart__item-delete' }).getnode();
        const icon = new CreateElement({ tag: 'span', className: 'cart__cross-icon' }).getnode();
        cartItemdelete.append(icon);
        cartItem.append(cartItemBody, cartItemdelete);
        cartItem.style.display = 'none';
        if (counter < limit * page && counter > limit * page - limit - 1) {
          cartItem.style.display = 'flex';
        }
        counter += 1;
        tag!.append(cartItem);
        router.AddRoutingToCard(photo);
        router.AddRoutingToCard(descriptionTitle);

        quantityButtonMore.addEventListener('click', () => {
          ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products')!);
          ProductsFromLocalStorage.forEach((item) => {
            if (item.id === data.id) {
              item.counter += 1;
              localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
              quantityCounter.textContent = item.counter.toString();

              price.textContent = `$ ${item.price * item.counter}`;
            }
          });
          this.currentData(ProductsFromLocalStorage);
        });

        quantityButtonLess.addEventListener('click', () => {
          let counter = 0;
          ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products')!);
          ProductsFromLocalStorage.forEach((item) => {
            if (data.id === item.id) {
              if (item.counter > 1) {
                item.counter -= 1;
                localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
                quantityCounter.textContent = item.counter.toString();
                price.textContent = `$ ${item.price * item.counter}`;
              } else {
                item.counter -= 1;
                let index = 0;
                ProductsFromLocalStorage.forEach((it, ind) => {
                  if (it.id === item.id) {
                    index = ind;
                  }
                });
                ProductsFromLocalStorage.splice(index, 1);
                localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
                cartItem.remove();
              }
              counter = item.counter;
            }
          });
          if (counter >= 1) {
            this.currentData(ProductsFromLocalStorage);
          } else {
            this.currentData(ProductsFromLocalStorage);
            new ApplyRouting().init('#basket');
          }
        });

        cartItemdelete.addEventListener('click', () => {
          ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products')!);
          let index = 0;
          ProductsFromLocalStorage.forEach((it, ind) => {
            if (it.id === data.id) {
              index = ind;
            }
          });
          ProductsFromLocalStorage.splice(index, 1);
          localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
          cartItem.remove();
          this.currentData(ProductsFromLocalStorage);
          new ApplyRouting().init('#basket');
        });
      });
    }
  }
  currentData(data: product[]) {
    let sale = 0;
    if (window.localStorage.getItem('balaxon') !== null) {
      sale += 0.1;
    }
    if (window.localStorage.getItem('enayaame') !== null) {
      sale += 0.1;
    }
    let counter = 0;
    let totalprice = 0;
    const counterBasket = document.getElementById('counter-basket');
    const allPriceBasket = document.getElementById('all-price-basket');
    const summaryTotal = document.getElementById('summary-total');
    const subTotal = document.getElementById('subtotal-price');
    const summaryprice = document.getElementById('summary-price');
    data.forEach((item) => {
      counter += item.counter;
      totalprice += item.counter * item.price;
    });
    counterBasket!.textContent = counter.toString();
    allPriceBasket!.textContent = '$ ' + totalprice.toString();
    if (sale === 0) {
      subTotal!.textContent = '$ ' + totalprice.toString();
      summaryTotal!.textContent = '$ ' + (totalprice + 20).toString();
    } else {
      subTotal!.textContent = '$ ' + totalprice;
      summaryprice!.textContent = '$ ' + (totalprice - totalprice * sale);
      summaryTotal!.textContent = '$ ' + (totalprice - totalprice * sale + 20);
    }
  }
}
