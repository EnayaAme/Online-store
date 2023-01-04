import { ConstructorRadio } from "../Interfaces";

export class CreateRadio {
  private input: HTMLInputElement;
  private label: HTMLLabelElement;

  constructor({ type, value, id, name, className }: ConstructorRadio) {
    this.label = document.createElement('label');
    this.label.htmlFor = id;
    this.label.textContent = value;

    this.input = document.createElement('input');
    this.input.type = type;
    this.input.name = name;
    this.input.id = id;
    if (className) {
      this.input.classList.add(className);
    }
  }
  getnode() {
    const arr: [HTMLInputElement, HTMLLabelElement] = [this.input, this.label];
    return arr;
  }
}