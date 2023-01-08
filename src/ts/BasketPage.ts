import { CreateElement } from "./Elements/CreateElement";
import { CreateTextInput } from "./Elements/CreateTextInput";

export class BasketPage {
  constructor () {
    const body = document.body;
    const main = new CreateElement({ tag: 'main', }).getnode();
    body.append(main);
    const wrapper = new CreateElement({ tag: 'div', className: 'wrapper' }).getnode();;
    main.append(wrapper);
    const ListOfProducts = new CreateElement({ tag: 'div', className: 'ProductsInBasket' }).getnode();
    const Summary = new CreateElement({ tag: 'div', className: 'Summary' }).getnode();
    wrapper.append(ListOfProducts, Summary);
    const ListMenu = new CreateElement({ tag: 'div', className: 'SmalMenu' }).getnode();
    const List = new CreateElement({ tag: 'div', className: 'list' }).getnode();
    ListOfProducts.append(ListMenu, List);
    const TextMenu = new CreateElement({ tag: 'h2', className: 'textmenu', content: 'Products In Cart' }).getnode();
    const limit = new CreateTextInput({ type: 'number', placeholder: '1', className: 'limit', name: 'limit' }).getnode();
    const page = new CreateTextInput({ type: 'number', placeholder: '1', className: 'page', name: 'page' }).getnode();
    ListMenu.append(TextMenu, limit, page);
  }
}