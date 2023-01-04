import { CreateElement } from "../Elements/CreateElement";
import { CreateRadio } from "../Elements/CreateRadio";
import { ConstructorSortMenu } from "../Interfaces";

export class CreateSortMenu extends CreateElement {
  private container: HTMLElement;
  private options: HTMLElement;
  private selected: HTMLElement;
  private sortmenu: string[][];
  private option!: HTMLElement;
  private input!: [HTMLInputElement, HTMLLabelElement];
  constructor ({ tag, className }: ConstructorSortMenu) {
    super({ tag: 'div', className: 'sort-menu' });
    this.sortmenu = [
      ['Rating', 'Rating'],
      ['PriceTH', 'Price from low to high'],
      ['PriceTL', 'Price from high to low'],
      ['RD', 'Release Date']
    ]
    this.container = new CreateElement({ tag: 'div', className: 'select-box' }).getnode();
    this.options = new CreateElement({ tag: 'div', className: 'options-container' }).getnode();
    this.selected = new CreateElement({ tag: 'div', className: 'selected', content: 'Sort by' }).getnode();
    this.container.append(this.options, this.selected);
    this.sortmenu.forEach((item) => {
      this.option = new CreateElement({ tag: 'div', className: 'option' }).getnode();
      this.input =  new CreateRadio({ type: 'radio', className: 'radio', id: item[0], name: 'sort', value: item[1]}).getnode();
      this.option.append(this.input[0], this.input[1]);
      this.options.append(this.option);
      this.option.addEventListener("click", () => {
        this.selected.innerHTML = item[1];
        this.options.classList.remove("active");
      });
    });
    this.el.append(this.container);
    this.selected.addEventListener('click', () => {
      this.options!.classList.toggle("active");
    })
  }
}