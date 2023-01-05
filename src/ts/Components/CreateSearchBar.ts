import { CreateElement } from "../Elements/CreateElement";
import { CreateImage } from "../Elements/CreateImage";
import { CreateTextInput } from "../Elements/CreateTextInput";
import { ConstructorElement } from "../Interfaces";


export class CreateSearchBar extends CreateElement {
  private input: HTMLInputElement;
  private button: HTMLElement;
  private icon: HTMLImageElement;

  constructor({ tag, className, router, filter }: ConstructorElement) {
    super({ tag: 'div', className: 'search' });
    this.input = new CreateTextInput ({type: 'text', placeholder: 'Search product', name: 'search', className: 'search__text'}).getnode();
    this.button = new CreateElement({tag: 'button', className: 'search__button'}).getnode();
    this.icon = new CreateImage({ src: './assets/images/search.png', alt: 'search', className: 'search__icon'}).getnode();
    this.input.value = filter!;
    this.button.addEventListener('click', () => {
      console.log(router);
      if (router) {
        router.AddRoutingToSearch(this.input.value);
      }
    });
    this.button.append(this.icon);
    this.el.append(this.input, this.button);
  };
}