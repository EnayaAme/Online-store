import { CreateElement } from "./Elements/CreateElement";
import { product } from "./Interfaces";
import CreateRoute from './route';

export class CreateListOfCards{
  constructor (SortData: product[]) {
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
      const CardAddtoCart = new CreateElement({tag: 'div', className: 'card__add-to-cart'}).getnode();
      CardBox.append(CardModel, CardPrice, CardAddtoCart);
      if (localStorage.getItem('products') !== null) {
        const cards: product[] = JSON.parse(localStorage.getItem('products')!);
        cards.forEach((it) => {
          if (it.id === item.id) {
            CardAddtoCart.classList.toggle('_product-added');
          }
          console.log(it);
        })
      }
      document.getElementById('store__products')!.append(CardBox);
      let ProductsToLocalStorage: product[] = [];
      CardAddtoCart.addEventListener('click', () => {
        //ProductsToLocalStorage.push(item);
        let ProductsFromLocalStorage: product[] = [];
        if (CardAddtoCart.classList.contains('_product-added')) {
          ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products')!);
          let index = 0;
          ProductsFromLocalStorage.forEach((it, ind) => {
            if (it.id === item.id) {
              index = ind;
            }
          });
          console.log(index);
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
        console.log(localStorage.getItem('products'))
        //localStorage.setItem('')
      })
      
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