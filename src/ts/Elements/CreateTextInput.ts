import { ConstructotTextInput } from "../Interfaces";

export class CreateTextInput {
  private input: HTMLInputElement;
  constructor({ type, placeholder, name, className }: ConstructotTextInput) {
    this.input = document.createElement('input');
    this.input.type = type;
    this.input.name = name;
    this.input.placeholder = placeholder;
    if (className) {
      this.input.classList.add(className);
    }
  }
  getnode() {
    return this.input;
  }
}