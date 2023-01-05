import { CreateElement } from "./Elements/CreateElement";
import { product } from "./Interfaces";
import Router from "./route";

export class CardPage{
  constructor(product: product) {
    console.log(product);
    const router = new Router();
    const main = new CreateElement({ tag: 'main', className: 'main' }).getnode();
    document.body.append(main);
    const DivPath = new CreateElement({ tag: 'div', className: 'DivPath' }).getnode();
    const DivCard = new CreateElement({ tag: 'div', className: 'DivCard' }).getnode();
    main.append(DivPath);
    main.append(DivCard);
    // ---------------------- первый див div.path
    for (let i = 0; i < 4; i++) {
      const span = new CreateElement({ tag: 'a', className: 'card_path' }).getnode();
      DivPath.append(span);
    }
    DivPath.childNodes[0].textContent = 'STORE';
    router.AddRoutingToHeader(DivPath.childNodes[0] as HTMLElement);
    DivPath.childNodes[1].textContent = product.category;
    DivPath.childNodes[2].textContent = product.brand;
    DivPath.childNodes[3].textContent = product.model;
    // ------------------- второй див div.card
    const h1 = new CreateElement({ tag: 'h1', id: 'h1_card', content: product.model }).getnode();
    h1.style.width = '100%';
    h1.style.textAlign = 'center';
    DivCard.append(h1);
    const cardcontent = new CreateElement({ tag: 'div', id: 'cardcontent' }).getnode();
    DivCard.append(cardcontent);
    const cardimages =new CreateElement({ tag: 'div', id: 'cardimages' }).getnode();
    const carddata = new CreateElement({ tag: 'div', id: 'carddata' }).getnode();
    const cardprice = new CreateElement({ tag: 'div', id: 'cardprice' }).getnode();
    cardcontent.append(cardimages);
    cardcontent.append(carddata);
    cardcontent.append(cardprice);
    // ---------------------- images:
    const listimages = new CreateElement({ tag: 'div', id: 'listimages' }).getnode();
    cardimages.append(listimages);
    const currentimage = new CreateElement({ tag: 'div', id: 'currentimage' }).getnode();
    currentimage.style.background = `url('${product.images[0]}') no-repeat center / contain`;
    cardimages.append(currentimage);
    product.images.forEach((it) => {
      const smallimg = new Image(150, 100);
      smallimg.src = `${it}`;
      smallimg.style.margin = '20px';
      smallimg.onclick = () => {
        currentimage.style.background = `url('${smallimg.src}') no-repeat center / contain`;
      };
      listimages.append(smallimg);
    });
    // -----------------data:
    for (let i = 0; i < 6; i++) {
      const smalldatacardbox = new CreateElement({ tag: 'div', className: 'smalldatacardbox' }).getnode();
      smalldatacardbox.append(new CreateElement({ tag: 'h3', className: 'datasmalldescription' }).getnode());
      smalldatacardbox.append(new CreateElement({ tag: 'p', className: 'datasmalldescription' }).getnode());
      carddata.append(smalldatacardbox);
    }
    carddata.childNodes[0].childNodes[0].textContent = 'Description:';
    carddata.childNodes[0].childNodes[1].textContent = product.description;
    carddata.childNodes[1].childNodes[0].textContent = 'Discount Percentage:';
    carddata.childNodes[1].childNodes[1].textContent = product.discountPercentage.toString();
    carddata.childNodes[2].childNodes[0].textContent = 'Rating:';
    carddata.childNodes[2].childNodes[1].textContent = product.rating.toString();
    carddata.childNodes[3].childNodes[0].textContent = 'Date release:';
    carddata.childNodes[3].childNodes[1].textContent = product.DateOfIssue.toString();
    carddata.childNodes[4].childNodes[0].textContent = 'Brand:';
    carddata.childNodes[4].childNodes[1].textContent = product.brand;
    carddata.childNodes[5].childNodes[0].textContent = 'Category:';
    carddata.childNodes[5].childNodes[1].textContent = product.category;
  }
}