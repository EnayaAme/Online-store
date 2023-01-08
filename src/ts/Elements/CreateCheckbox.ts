import { ConstructorCheckbox } from '../Interfaces';

export class CreateCheckbox {
  private input: HTMLInputElement;
  private label: HTMLLabelElement;
  constructor({ type, name, id, value, className, Count, Current, filters }: ConstructorCheckbox) {
    this.input = document.createElement('input');
    this.input.type = type;
    this.input.name = name;
    this.input.id = id;
    this.input.value = value;

    filters?.forEach((item) => {
      if (item === value) {
        this.input.checked = true;
      }
    });
    if (className) {
      this.input.classList.add(className);
    }
    this.label = document.createElement('label');
    this.label.htmlFor = id;
    this.label.textContent = value;
    const quantity = document.createElement('span');
    quantity.textContent = `  (${Current}/${Count})`;
    this.label.append(quantity);
  }
  getnode() {
    const arr: [HTMLInputElement, HTMLLabelElement] = [this.input, this.label];
    return arr;
  }
}
