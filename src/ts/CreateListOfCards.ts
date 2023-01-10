import { CreateElement } from './Elements/CreateElement';
import { product } from './Interfaces';
import CreateRoute from './route';

export class CreateListOfCards {
  constructor(SortData: product[]) {
    const router = new CreateRoute();
    SortData.forEach((item) => {
      const CardBox = new CreateElement({
        tag: 'div',
        className: 'card__box',
        id: `card-${item.id.toString()}`,
        BackgroundImg: item.images[0],
      }).getnode();
      router.AddRoutingToCard(CardBox);
      const CardModel = new CreateElement({ tag: 'h2', className: 'card__model', content: item.model }).getnode();
      const CardPrice = new CreateElement({
        tag: 'h2',
        className: 'card__price',
        content: `${item.price.toString()} $`,
      }).getnode();
      const CardAddtoCart = new CreateElement({ tag: 'div', className: 'card__add-to-cart' }).getnode();
      CardBox.append(CardModel, CardPrice, CardAddtoCart);
      if (localStorage.getItem('products') !== null) {
        const cards: product[] = JSON.parse(localStorage.getItem('products')!);
        cards.forEach((it) => {
          if (it.id === item.id) {
            CardAddtoCart.classList.toggle('_product-added');
          }
        });
      }
      document.getElementById('store__products')!.append(CardBox);
      CardAddtoCart.addEventListener('click', () => {
        let totalprice = 0;
        let counter = 0;
        let ProductsFromLocalStorage: product[] = [];
        if (CardAddtoCart.classList.contains('_product-added')) {
          ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products')!);
          let index = 0;
          ProductsFromLocalStorage.forEach((it, ind) => {
            if (it.id === item.id) {
              index = ind;
            }
          });
          ProductsFromLocalStorage.splice(index, 1);
          localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
        } else {
          if (localStorage.getItem('products') !== null) {
            ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products')!);
            ProductsFromLocalStorage.push(item);
            localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
          } else {
            ProductsFromLocalStorage.push(item);
            localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
          }
        }
        CardAddtoCart.classList.toggle('_product-added');
        ProductsFromLocalStorage.forEach((it) => {
          counter += it.counter;
          totalprice += it.counter * it.price;
        });
        const cartQuantity = document.getElementById('counter-basket');
        const AllPriceBasket = document.getElementById('all-price-basket');
        const basket = document.getElementById('basket-img');
        if (counter !== 0) {
          let cc = 0;
          ProductsFromLocalStorage.forEach((item) => (cc += item.counter));
          cartQuantity!.textContent = cc.toString();
          cartQuantity!.style.visibility = 'visible';
          cartQuantity!.style.opacity = '1';
          AllPriceBasket!.style.display = 'block';
          basket!.style.display = 'none';
          AllPriceBasket!.textContent = '$ ' + totalprice.toString();
        } else {
          cartQuantity!.style.visibility = 'hidden';
          cartQuantity!.style.opacity = '0';
          AllPriceBasket!.style.display = 'none';
          basket!.style.display = 'block';
        }
      });

      document.getElementById('store__optionBlock1')!.addEventListener('click', () => {
        if ((document.getElementById('view1') as HTMLInputElement).checked) {
          if (CardBox.classList.contains('_small-view')) {
            CardBox.classList.remove('_small-view');
          }
        }
      });

      document.getElementById('store__optionBlock2')!.addEventListener('click', () => {
        if ((document.getElementById('view2') as HTMLInputElement).checked) {
          CardBox.classList.add('_small-view');
        }
      });
    });
  }
}
