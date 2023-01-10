import { CreateCheckoutPopup } from './CheckoutPopup';
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
      const limit = new CreateTextInput({
        type: 'number',
        placeholder: '3',
        className: 'limit',
        name: 'limit',
      }).getnode();
      const page = new CreateTextInput({ type: 'number', placeholder: '1', className: 'page', name: 'page' }).getnode();
      const LimitSpan = new CreateElement({ tag: 'span', content: 'Limit:' }).getnode();
      const PageSpan = new CreateElement({ tag: 'span', content: 'Page:' }).getnode();
      limit.value = DefaultLimit.toString();
      limit.min = '1';
      limit.max = ProductsFromLocalStorage.length.toString();
      page.value = DefaultPage.toString();
      page.min = '1';
      page.max = pages.toString();
      limit.addEventListener('input', () => {
        this.route.AddRoutingInBasket(+limit.value, +page.value);
      });
      page.addEventListener('input', () => {
        this.route.AddRoutingInBasket(+limit.value, +page.value);
      });
      menu.append(LimitSpan, limit, PageSpan, page);

      const ListOfProducts = new CreateElement({ tag: 'div', className: 'cart__items', id: 'cart-items' }).getnode();
      const summary = new CreateElement({ tag: 'div', className: 'cart__summary' }).getnode();
      ListOfProducts.append(menu);
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
      const summaryPrice = new CreateElement({
        tag: 'span',
        content: '$ ' + totalprice.toString(),
        id: 'subtotal-price',
      }).getnode();
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
        id: 'buyitnowBtn',
        content: 'Go to checkout',
      }).getnode();

      summaryWrapper.append(promocode, orderSummary, total, checkoutButton);
      wrapper.append(ListOfProducts, summary);

      checkoutButton.addEventListener('click', () => {
        const body = document.body;
        const overlay = new CreateElement({ tag: 'div', className: 'popup__overlay' }).getnode();
        const popup = new CreateCheckoutPopup().getnode();
        overlay.append(popup);
        body.append(overlay);
        body.style.overflowY = 'hidden';
        overlay.addEventListener('click', (e) => {
          if ((e.target as HTMLElement).classList.contains('popup__overlay')) {
            popup.remove();
            overlay.remove();
            body.style.overflowY = 'auto';
          }
        });
      });

      let balaxon = '';
      let enayaame = '';
      let balaxonCounter = 0;
      let enayaameCounter = 0;
      let sale = 0;
      if (window.localStorage.getItem('balaxon') !== null) {
        balaxon = 'balaxon';
        balaxonCounter = +window.localStorage.getItem('balaxon')!;
      }
      if (window.localStorage.getItem('enayaame') !== null) {
        enayaame = 'enayaame';
        enayaameCounter = +window.localStorage.getItem('enayaame')!;
      }

      if (balaxon === 'balaxon' && balaxonCounter === 1) {
        const promocode = new CreateElement({ tag: 'div', className: 'summary__li' }).getnode();
        const summaryPromocode1Left = new CreateElement({ tag: 'span', content: balaxon }).getnode();
        const summaryPromocode1Right = new CreateElement({ tag: 'span', content: '-10%' }).getnode();
        const balaxonDel = new CreateElement({
          tag: 'button',
          className: 'summary__promocode-button',
          content: 'del',
        }).getnode();
        balaxonDel.addEventListener('click', () => {
          window.localStorage.removeItem('balaxon');
          location.reload();
        });
        promocode.append(summaryPromocode1Left, summaryPromocode1Right, balaxonDel);
        promocodeTextArea.append(promocode);
        sale += 0.1;
      }

      if (enayaame === 'enayaame' && enayaameCounter === 1) {
        const promocode = new CreateElement({ tag: 'div', className: 'summary__li' }).getnode();
        const summaryPromocode1Left = new CreateElement({ tag: 'span', content: enayaame }).getnode();
        const summaryPromocode1Right = new CreateElement({ tag: 'span', content: '-10%' }).getnode();
        const enayaameDel = new CreateElement({
          tag: 'button',
          className: 'summary__promocode-button',
          content: 'del',
        }).getnode();
        enayaameDel.addEventListener('click', () => {
          window.localStorage.removeItem('enayaame');
          location.reload();
        });
        promocode.append(summaryPromocode1Left, summaryPromocode1Right, enayaameDel);
        promocodeTextArea.append(promocode);
        sale += 0.1;
      }

      if (enayaame === 'enayaame' || balaxon === 'balaxon') {
        const summaryPrice = new CreateElement({ tag: 'span', id: 'summary-price' }).getnode();
        summaryOrder1Right.append(summaryPrice);
        summaryPrice.textContent = '$ ' + (totalprice - totalprice * sale);
        totalPrice.textContent = '$ ' + (20 + (totalprice - totalprice * sale)).toFixed(2);
        summaryPrice.previousElementSibling!.classList.add('price-changed');
      }

      promocodeButton.addEventListener('click', () => {
        if (
          (promocodeInput.value === 'balaxon' && balaxonCounter === 0) ||
          (promocodeInput.value === 'enayaame' && enayaameCounter == 0)
        ) {
          if (promocodeInput.value === 'balaxon') balaxonCounter += 1;
          if (promocodeInput.value === 'enayaame') enayaameCounter += 1;
          if (balaxonCounter === 1 && enayaameCounter === 1) {
            window.localStorage.setItem('balaxon', '1');
            window.localStorage.setItem('enayaame', '1');
          } else {
            if (balaxonCounter === 1) {
              window.localStorage.setItem('balaxon', '1');
            } else {
              window.localStorage.setItem('enayaame', '1');
            }
          }
          location.reload();
        }
      });
    } else {
      const body = document.body;
      const main = new CreateElement({ tag: 'main', className: 'main main_empty' }).getnode();
      const empty = new CreateElement({ tag: 'span', className: 'cart-empty', content: 'Cart is empty' }).getnode();
      main.append(empty);
      body.append(main);
    }
  }
}
