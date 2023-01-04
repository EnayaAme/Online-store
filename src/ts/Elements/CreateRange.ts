import { ConstructorRange } from "../Interfaces";

export class CreateRange {
  private input: HTMLInputElement;
  constructor({ type, min, max, value, id, className }: ConstructorRange) {
    this.input = document.createElement('input');
    this.input.type = type;
    this.input.min = min;
    this.input.max = max;
    this.input.id = id;
    this.input.value = value;
    if (className) {
      this.input.classList.add(className);
    }
  }
  getnode() {
    return this.input;
  }
}