import CreateDefaultPage from './DefaultPage';
import { CreateElement } from './Elements/CreateElement';

export class errorpage {
  constructor() {
    const page = new CreateDefaultPage();
    page.CreateHeader();
    const main = new CreateElement({ tag: 'main', className: 'main main_empty' }).getnode();
    const span = new CreateElement({ tag: 'span', className: 'cart-empty', content: '404 Not found' }).getnode();
    main.append(span);
    document.body.append(main);
    page.CreateFooter();
  }
}
