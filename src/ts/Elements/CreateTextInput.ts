import { ConstructotTextInput } from '../Interfaces';

export class CreateTextInput {
  private input: HTMLInputElement;
  constructor({ type, placeholder, name, className, id, required}: ConstructotTextInput) {
    this.input = document.createElement('input');
    this.input.type = type;
    this.input.name = name;
    if (placeholder) {
      this.input.placeholder = placeholder;
    }
    if (className) {
      this.input.classList.add(className);
    }
    if (required) {
      this.input.required = true;
    }
    if (id) {
      this.input.id = id;
    }
  }
  getnode() {
    return this.input;
  }
}
