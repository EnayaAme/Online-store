import { CreateElement } from "../Elements/CreateElement";
import { CreateRadio } from "../Elements/CreateRadio";
import { ConstructorSortMenu } from "../Interfaces";

export class CreateSortMenu extends CreateElement {
  private container: HTMLElement;
  private options: HTMLElement;
  private seleted: HTMLElement;
  private option: HTMLElement;

  private input: [HTMLInputElement, HTMLLabelElement];


  constructor ({ tag, className }: ConstructorSortMenu) {
    super({ tag: 'div', className: 'sort-menu' });
    this.container = new CreateElement({ tag: 'div', className: 'select-box' }).getnode();
    this.options = new CreateElement({ tag: 'div', className: 'options-container' }).getnode();
    this.seleted = new CreateElement({ tag: 'div', className: 'selected', content: 'Sort by' }).getnode();
    this.container.append(this.options, this.seleted);
    ///////////////
    this.option = new CreateElement({ tag: 'div', className: 'option' }).getnode();
    this.input =  new CreateRadio({ type: 'radio', className: 'radio', id: 'Rating', name: 'sort', value: 'Rating'}).getnode();
    this.option.append(this.input[0], this.input[1]);
    this.options.append(this.option);

    this.el.append(this.container);

    this.seleted.addEventListener('click', () => {
      this.options!.classList.toggle("active");
    })
  }
}