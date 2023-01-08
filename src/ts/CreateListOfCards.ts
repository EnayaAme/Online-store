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
      document.getElementById('store__products')!.append(CardBox);

      CardAddtoCart.addEventListener('click', () => {
        CardAddtoCart.classList.toggle('_product-added');
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