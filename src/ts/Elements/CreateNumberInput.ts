import { ConstructorNumberInput } from "../Interfaces";

export class CreateNumberInput {
  private input: HTMLInputElement;
  constructor({ type, value, id, className, placeholder, required }: ConstructorNumberInput) {
    this.input = document.createElement('input');
    this.input.type = type;
    if (value) {
      this.input.value = value;
    }
    if (id) {
      this.input.id = id;
    }
    if (className) {
      this.input.classList.add(className);
    }
    if (placeholder) {
      this.input.placeholder = placeholder;
    }
    if (required) {
      this.input.required = true;
    }
  }
  getnode() {
    return this.input;
  }
}
