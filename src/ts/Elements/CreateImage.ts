import { ConstructorImage } from "../Interfaces";

export class CreateImage {
  private el: HTMLImageElement;
  constructor({ src, id, className, alt }: ConstructorImage) {
    this.el = new Image();
    this.el.src = src;
    if (id) {
      this.el.id = id;
    }
    if (className) {
      this.el.classList.add(className);
    }
    if (alt) {
      this.el.alt = alt;
    }
  }
  getnode() {
    return this.el;
  }
}