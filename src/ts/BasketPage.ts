import { CreateCartItem } from "./Components/CreateCartItem";
import { CreateElement } from "./Elements/CreateElement";
import { CreateTextInput } from "./Elements/CreateTextInput";

export class BasketPage {
  constructor () {
    const body = document.body;
    const main = new CreateElement({ tag: 'main', className: 'main' }).getnode();
    body.append(main);
    const wrapper = new CreateElement({ tag: 'div', className: 'wrapper main__wrapper cart__wrapper' }).getnode();;
    main.append(wrapper);

    const ListOfProducts = new CreateElement({ tag: 'div', className: 'cart__items' }).getnode();
    //const Summary = new CreateElement({ tag: 'div', className: 'Summary' }).getnode();
    const cartItem = new CreateCartItem({
      "id": 1,
      "model":"iPhone 13",
      "description":"Смартфон Apple iPhone 13 128GB (красный)",
      "price":854,
      "discountPercentage":6,
      "rating":4.58,
      "DateOfIssue":2021,
      "brand":"Apple",
      "category":"Smartphone",
      "images":["https://i-product.by/images/o/apple-iphone-13-128gb-krasnyj_1.jpg","https://i-product.by/images/o/apple-iphone-13-128gb-krasnyj_2.jpg","https://i-product.by/images/o/apple-iphone-13-128gb-krasnyj_3.jpg"],
      "counter": 1,
    }).getnode()
    ListOfProducts.append(cartItem)
    wrapper.append(ListOfProducts /*Summary*/);
    //const ListMenu = new CreateElement({ tag: 'div', className: 'SmalMenu' }).getnode();
    //const List = new CreateElement({ tag: 'div', className: 'list' }).getnode();
    //ListOfProducts.append(ListMenu, List);
    //const TextMenu = new CreateElement({ tag: 'h2', className: 'textmenu', content: 'Products In Cart' }).getnode();
    //const limit = new CreateTextInput({ type: 'number', placeholder: '1', className: 'limit', name: 'limit' }).getnode();
    //const page = new CreateTextInput({ type: 'number', placeholder: '1', className: 'page', name: 'page' }).getnode();
    //ListMenu.append(TextMenu, limit, page);
  }
}