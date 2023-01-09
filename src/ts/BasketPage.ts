import { CreateElement } from './Elements/CreateElement';
import { CreateTextInput } from './Elements/CreateTextInput';
import { product } from './Interfaces';
import Router from './route';

export class BasketPage {
  private route = new Router();
  constructor(DefaultLimit: number, DefaultPage: number) {
    if (localStorage.getItem('products') !== null && localStorage.getItem('products')?.length !== 2) {
      let ProductsFromLocalStorage: product[] = [];
      ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products')!);
      const pages = Math.ceil(ProductsFromLocalStorage.length / DefaultLimit);
      let totalprice = 0;
      ProductsFromLocalStorage.forEach((item) => {
        totalprice += item.counter * item.price;
      });
      const body = document.body;
      const main = new CreateElement({ tag: 'main', className: 'main' }).getnode();
      body.append(main);
      const wrapper = new CreateElement({ tag: 'div', className: 'wrapper main__wrapper cart__wrapper' }).getnode();
      main.append(wrapper);

      const menu = new CreateElement({ tag: 'div', className: 'menu' }).getnode();
      // wrapper.append(menu);
      //const TextMenu = new CreateElement({ tag: 'h2', className: 'textmenu', content: 'Products In Cart' }).getnode();
      const limit = new CreateTextInput({
        type: 'number',
        placeholder: '3',
        className: 'limit',
        name: 'limit',
      }).getnode();
      const page = new CreateTextInput({ type: 'number', placeholder: '1', className: 'page', name: 'page' }).getnode();
      const LimitSpan = new CreateElement({ tag: 'span', content: 'LIMIT:' }).getnode();
      const PageSpan = new CreateElement({ tag: 'span', content: 'PAGE:' }).getnode();
      limit.value = DefaultLimit.toString();
      limit.min = '1';
      limit.max = ProductsFromLocalStorage.length.toString();
      page.value = DefaultPage.toString();
      page.min = '1';
      page.max = pages.toString();
      limit.addEventListener('input', () => {
        this.route.AddRoutingInBasket(+limit.value, +page.value);
        //console.log(document.getElementsByTagName('input')[1].value)
      });
      page.addEventListener('input', () => {
        this.route.AddRoutingInBasket(+limit.value, +page.value);
      });
      menu.append(/*TextMenu*/ LimitSpan, limit, PageSpan, page);

      const ListOfProducts = new CreateElement({ tag: 'div', className: 'cart__items', id: 'cart-items' }).getnode();
      const summary = new CreateElement({ tag: 'div', className: 'cart__summary' }).getnode();
      ListOfProducts.append(menu);
      ////// SUMMARY //////
      const summaryWrapper = new CreateElement({ tag: 'div', className: 'summary__wrapper' }).getnode();
      summary.append(summaryWrapper);
      const promocode = new CreateElement({ tag: 'div', className: 'summary__promocode' }).getnode();
      const promocodeTitle = new CreateElement({
        tag: 'span',
        className: 'summary__title',
        content: 'Promo Code',
      }).getnode();
      const promocodeArea = new CreateElement({ tag: 'div', className: 'summary__promocode-area' }).getnode();
      const promocodeInput = new CreateTextInput({
        type: 'text',
        placeholder: 'balaxon | enayaame',
        name: 'promocode',
        className: 'summary__promocode-input',
      }).getnode();
      const promocodeButton = new CreateElement({
        tag: 'button',
        className: 'summary__promocode-button',
        content: 'add',
      }).getnode();
      const promocodeTextArea = new CreateElement({ tag: 'div', className: 'summary__text-area' }).getnode();
      promocodeArea.append(promocodeInput, promocodeButton);
      promocode.append(promocodeTitle, promocodeArea, promocodeTextArea);
      const orderSummary = new CreateElement({ tag: 'div', className: 'summary__order-summary' }).getnode();
      const orderTitle = new CreateElement({
        tag: 'span',
        className: 'summary__title',
        content: 'Order summary',
      }).getnode();
      const orderTextArea = new CreateElement({ tag: 'div', className: 'summary__text-area' }).getnode();
      const orderSubtotal = new CreateElement({ tag: 'div', className: 'summary__li' }).getnode();
      const summaryOrder1Left = new CreateElement({ tag: 'span', content: 'Subtotal' }).getnode();
      const summaryOrder1Right = new CreateElement({ tag: 'div', className: 'summary__price-change' }).getnode();
      const summaryPrice = new CreateElement({ tag: 'span', content: '$ ' + totalprice.toString() }).getnode();
      summaryOrder1Right.append(summaryPrice);
      orderSubtotal.append(summaryOrder1Left, summaryOrder1Right);
      const orderShipping = new CreateElement({ tag: 'div', className: 'summary__li' }).getnode();
      const summaryOrder2Left = new CreateElement({ tag: 'span', content: 'Shipping' }).getnode();
      const summaryOrder2Right = new CreateElement({ tag: 'span', content: '$ 20' }).getnode();

      orderShipping.append(summaryOrder2Left, summaryOrder2Right);
      orderTextArea.append(orderSubtotal, orderShipping);
      orderSummary.append(orderTitle, orderTextArea);

      const total = new CreateElement({ tag: 'div', className: 'summary__total' }).getnode();
      const totalTitle = new CreateElement({ tag: 'span', className: 'summary__title', content: 'Total' }).getnode();
      const totalPrice = new CreateElement({
        tag: 'span',
        className: 'summary__title',
        content: '$ ' + (totalprice + 20).toString(),
        id: 'summary-total',
      }).getnode();

      total.append(totalTitle, totalPrice);

      const checkoutButton = new CreateElement({
        tag: 'button',
        className: 'summary__checkout-button',
        content: 'Go to checkout',
      }).getnode();

      summaryWrapper.append(promocode, orderSummary, total, checkoutButton);
      wrapper.append(ListOfProducts, summary);


      ///////////////////
      let balaxonCounter = 0;
      let enayaameCounter = 0;
      promocodeButton.addEventListener('click', () => {
        if ((promocodeInput.value === 'balaxon' && balaxonCounter === 0) || (promocodeInput.value === 'enayaame' && enayaameCounter == 0)) {
          const promocode = new CreateElement({ tag: 'div', className: 'summary__li' }).getnode();
          const summaryPromocode1Left = new CreateElement({ tag: 'span', content: promocodeInput.value }).getnode();
          const summaryPromocode1Right = new CreateElement({ tag: 'span', content: '-10%' }).getnode();
          promocode.append(summaryPromocode1Left, summaryPromocode1Right);
          promocodeTextArea.append(promocode);
          if (promocodeInput.value === 'balaxon') balaxonCounter+=1;
          if (promocodeInput.value === 'enayaame') enayaameCounter+=1;

          
          const summaryPrice = new CreateElement({ tag: 'span'}).getnode();
          summaryOrder1Right.append(summaryPrice);
          const newPrice =  (Number(summaryPrice.previousElementSibling!.textContent?.slice(2)) - (Number(summaryPrice.previousElementSibling!.textContent?.slice(2)) / 100 * 10)).toFixed(2);
          summaryPrice.textContent = '$ ' + newPrice;
          totalPrice.textContent = '$ ' + ((20 + +newPrice)).toFixed(2);
          summaryPrice.previousElementSibling!.classList.add('price-changed');
        }
      })

      //const Summary = new CreateElement({ tag: 'div', className: 'Summary' }).getnode();
      // let ProductsFromLocalStorage: product[] = [];
      //   ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products')!);
      //   ProductsFromLocalStorage.forEach((item) => {
      //     const cartItem = new CreateCartItem({
      //       "id": item.id,
      //       "model": item.model,
      //       "description": item.description,
      //       "price": item.price,
      //       "discountPercentage": item.discountPercentage,
      //       "rating": item.rating,
      //       "DateOfIssue": item.DateOfIssue,
      //       "brand": item.brand,
      //       "category": item.category,
      //       "images": item.images,
      //       "counter": item.counter,
      //     }).getnode();
      //     ListOfProducts.append(cartItem)
      //   });

      //const ListMenu = new CreateElement({ tag: 'div', className: 'SmalMenu' }).getnode();
      //const List = new CreateElement({ tag: 'div', className: 'list' }).getnode();
      //ListOfProducts.append(ListMenu, List);
      //const TextMenu = new CreateElement({ tag: 'h2', className: 'textmenu', content: 'Products In Cart' }).getnode();
      //const limit = new CreateTextInput({ type: 'number', placeholder: '1', className: 'limit', name: 'limit' }).getnode();
      //const page = new CreateTextInput({ type: 'number', placeholder: '1', className: 'page', name: 'page' }).getnode();
      //ListMenu.append(TextMenu, limit, page);
    } else {
      const body = document.body;
      const main = new CreateElement({ tag: 'main', className: 'main main_empty'}).getnode();
      const empty = new CreateElement({ tag: 'span', className: 'cart-empty', content: 'Cart is empty' }).getnode();
      main.append(empty);
      body.append(main);
    }
  }
}
