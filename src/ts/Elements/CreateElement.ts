import { ConstructorElement } from '../Interfaces';

export class CreateElement {
  protected el: HTMLElement;
  constructor({ tag, id, className, content, BackgroundImg }: ConstructorElement) {
    this.el = document.createElement(tag);
    if (id) {
      this.el.id = id;
    }
    if (className) {
      this.el.className = className;
    }
    if (content) {
      this.el.textContent = content;
    }
    if (BackgroundImg) {
      this.el.style.background = `white url('${BackgroundImg}') no-repeat center / contain`;
    }
  }
  getnode() {
    return this.el;
  }
}
