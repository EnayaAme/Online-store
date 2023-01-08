import { CreateCartItem } from "./Components/CreateCartItem";
import { CreateElement } from "./Elements/CreateElement";
import { CreateTextInput } from "./Elements/CreateTextInput";
import { product } from "./Interfaces";
import Router from "./route";

export class BasketPage {
  private route = new Router();
  constructor () {
    const body = document.body;
    const main = new CreateElement({ tag: 'main', className: 'main' }).getnode();
    body.append(main);
    const wrapper = new CreateElement({ tag: 'div', className: 'wrapper main__wrapper cart__wrapper' }).getnode();;
    main.append(wrapper);

    const menu = new CreateElement({ tag: 'div', className: 'menu' }).getnode();
    wrapper.append(menu);
    const TextMenu = new CreateElement({ tag: 'h2', className: 'textmenu', content: 'Products In Cart' }).getnode();
    const limit = new CreateTextInput({ type: 'number', placeholder: '3', className: 'limit', name: 'limit' }).getnode();
    const page = new CreateTextInput({ type: 'number', placeholder: '1', className: 'page', name: 'page' }).getnode();
    const LimitSpan = new CreateElement({ tag: 'span', content: 'LIMIT:'}).getnode();
    const PageSpan = new CreateElement({ tag: 'span', content: 'PAGE:'}).getnode();
    limit.value = '3';
    limit.min = '1';
    page.value = '1';
    limit.addEventListener('input', () => {
      this.route.AddRoutingToLimit(limit.value);
    });
    page.addEventListener('input', () => {
      this.route.AddRoutingToPage(page.value);
    });
    menu.append(TextMenu, LimitSpan, limit, PageSpan, page);

    const ListOfProducts = new CreateElement({ tag: 'div', className: 'cart__items' }).getnode();
    //const Summary = new CreateElement({ tag: 'div', className: 'Summary' }).getnode();
    let ProductsFromLocalStorage: product[] = [];
    if (localStorage.getItem('products') !== null && localStorage.getItem('products')?.length !== 0) {
      ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products')!);
      ProductsFromLocalStorage.forEach((item) => {
        const cartItem = new CreateCartItem({
          "id": item.id,
          "model": item.model,
          "description": item.description,
          "price": item.price,
          "discountPercentage": item.discountPercentage,
          "rating": item.rating,
          "DateOfIssue": item.DateOfIssue,
          "brand": item.brand,
          "category": item.category,
          "images": item.images,
          "counter": item.counter,
        }).getnode();
        ListOfProducts.append(cartItem)
      });
    }
    
    wrapper.append(ListOfProducts /*Summary*/);
    //const ListMenu = new CreateElement({ tag: 'div', className: 'SmalMenu' }).getnode();
    //const List = new CreateElement({ tag: 'div', className: 'list' }).getnode();
    //ListOfProducts.append(ListMenu, List);
    //const TextMenu = new CreateElement({ tag: 'h2', className: 'textmenu', content: 'Products In Cart' }).getnode();
    //const limit = new CreateTextInput({ type: 'number', placeholder: '1', className: 'limit', name: 'limit' }).getnode();
    //const page = new CreateTextInput({ type: 'number', placeholder: '1', className: 'page', name: 'page' }).getnode();
    //ListMenu.append(TextMenu, limit, page);
  }
  displaycard() {

  }
}