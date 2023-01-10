import { ConstructorLink } from '../Interfaces';

export class CreateLink {
  private link: HTMLAnchorElement;

  constructor({ href, id, className, target, content }: ConstructorLink) {
    this.link = document.createElement('a');
    this.link.href = href;
    if (content) {
      this.link.textContent = content;
    }
    if (className) {
      this.link.className = className;
    }
    if (id) {
      this.link.id = id;
    }
    if (target) {
      this.link.target = target;
    }
  }
  getnode() {
    return this.link;
  }
}
