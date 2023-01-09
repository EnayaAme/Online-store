import { CreateElement } from './Elements/CreateElement';
import { CreateImage } from './Elements/CreateImage';
import { product } from './Interfaces';
import Router from './route';

export class CardPage {
  constructor(product: product) {
    const router = new Router();
    const main = new CreateElement({ tag: 'main', className: 'main' }).getnode();
    const wrapper = new CreateElement({ tag: 'div', className: 'wrapper card-page__wrapper' }).getnode();
    document.body.append(main);
    const DivPath = new CreateElement({ tag: 'div', className: 'DivPath' }).getnode();
    const DivCard = new CreateElement({ tag: 'div', className: 'DivCard' }).getnode();
    main.append(wrapper);
    wrapper.append(DivPath);
    wrapper.append(DivCard);
    // ---------------------- первый див div.path
    for (let i = 0; i < 4; i++) {
      const span = new CreateElement({ tag: 'a', className: 'card_path' }).getnode();
      DivPath.append(span);
    }
    DivPath.childNodes[0].textContent = 'STORE / ';
    router.AddRoutingToHeader(DivPath.childNodes[0] as HTMLElement);
    DivPath.childNodes[1].textContent = product.category + ' / ';
    DivPath.childNodes[2].textContent = product.brand + ' / ';
    DivPath.childNodes[3].textContent = product.model;
    // ------------------- второй див div.card
    // const h1 = new CreateElement({ tag: 'h1', id: 'h1_card', content: product.model }).getnode();
    // DivCard.append(h1);
    const cardcontent = new CreateElement({ tag: 'div', id: 'cardcontent' }).getnode();
    DivCard.append(cardcontent);
    const cardimages = new CreateElement({ tag: 'div', id: 'cardimages' }).getnode();
    const carddata = new CreateElement({ tag: 'div', id: 'carddata' }).getnode();
    const cardprice = new CreateElement({ tag: 'div', id: 'cardprice' }).getnode();
    cardcontent.append(cardimages);
    cardcontent.append(carddata);
    cardcontent.append(cardprice);
    // ---------------------- images:
    const row = new CreateElement({ tag: 'div', id: 'row', className: 'row' }).getnode();
    cardimages.append(row);
    const col2 = new CreateElement({ tag: 'div', id: 'col-2', className: 'col-2' }).getnode();
    row.append(col2);
    const currentimage = new CreateImage({
      src: `${product.images[0]}`,
      id: 'currentimage',
      className: 'currentimage',
    }).getnode();
    const imgRow = new CreateElement({ tag: 'div', id: 'small-img-row', className: 'small-img-row' }).getnode();
    col2.append(currentimage, imgRow);
    // const listimages = new CreateElement({ tag: 'div', id: 'listimages' }).getnode();
    // cardimages.append(listimages);

    product.images.forEach((it) => {
      const smallimgContainer = new CreateElement({
        tag: 'div',
        id: 'smallImgContainer',
        className: 'smallImgContainer',
      }).getnode();
      const smallimg = new CreateImage({ src: `${it}`, id: 'smallImg', className: 'smallImg' }).getnode();
      smallimgContainer.append(smallimg);
      imgRow.append(smallimgContainer);

      // переключение основной картинки //
      smallimg.addEventListener('click', () => {
        currentimage.src = smallimg.src;
      });
    });

    // -----------------data:
    const dataTop = new CreateElement({ tag: 'div', className: 'data-top' }).getnode();
    const h1 = new CreateElement({ tag: 'h1', id: 'h1_card', content: product.model }).getnode();
    const ratingBlock = new CreateElement({ tag: 'div', className: 'rating-block' }).getnode();
    const ratingIcon = new CreateImage({
      src: './assets/images/star-rating.svg',
      className: 'rating-icon',
      alt: 'star',
    }).getnode();
    const ratingNum = new CreateElement({
      tag: 'span',
      className: 'rating-num',
      content: product.rating.toString(),
    }).getnode();
    ratingBlock.append(ratingIcon, ratingNum);
    dataTop.append(h1, ratingBlock);
    const priceBlock = new CreateElement({ tag: 'div', className: 'data__price' }).getnode();
    const priceNoDiscount = new CreateElement({
      tag: 'span',
      className: 'price-no-discount',
      content: '$ ' + ((product.discountPercentage / 100) * product.price + product.price).toFixed(2).toString(),
    }).getnode();
    const priceWithDiscount = new CreateElement({
      tag: 'span',
      className: 'price-with-discount',
      content: '$ ' + product.price.toString(),
    }).getnode();
    priceBlock.append(priceNoDiscount, priceWithDiscount);
    const description = new CreateElement({ tag: 'span', className: 'data__title', content: 'Description:' }).getnode();
    const descriptionText = new CreateElement({
      tag: 'span',
      className: 'data__text',
      content: product.description,
    }).getnode();
    description.append(descriptionText);
    const release = new CreateElement({ tag: 'span', className: 'data__title', content: 'Release date:' }).getnode();
    const releaseText = new CreateElement({
      tag: 'span',
      className: 'data__text',
      content: product.DateOfIssue.toString(),
    }).getnode();
    release.append(releaseText);
    const brand = new CreateElement({ tag: 'span', className: 'data__title', content: 'Brand:' }).getnode();
    const brandtext = new CreateElement({ tag: 'span', className: 'data__text', content: product.brand }).getnode();
    brand.append(brandtext);
    const category = new CreateElement({ tag: 'span', className: 'data__title', content: 'Category:' }).getnode();
    const categoryText = new CreateElement({
      tag: 'span',
      className: 'data__text',
      content: product.category,
    }).getnode();
    category.append(categoryText);
    const buttons = new CreateElement({ tag: 'div', className: 'data__buttons' }).getnode();
    const buyNow = new CreateElement({ tag: 'button', className: 'data__button', content: 'Buy it now' }).getnode();
    const addToCart = new CreateElement({ tag: 'div', className: 'card-page__add-to-cart' }).getnode();
    buttons.append(buyNow, addToCart);

    if (localStorage.getItem('products') !== null) {
      const cards: product[] = JSON.parse(localStorage.getItem('products')!);
      cards.forEach((it) => {
        if (it.id === product.id) {
          addToCart.classList.toggle('_product-added');
        }
      });
    }

    buyNow.addEventListener('click', () => {
      let ProductsFromLocalStorage: product[] = [];
      let totalprice = 0;
      let counter = 0;
      if (!addToCart.classList.contains('_product-added')) {
        if (localStorage.getItem('products') !== null) {
          ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products')!);
          ProductsFromLocalStorage.push(product);
          localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
        } else {
          ProductsFromLocalStorage.push(product);
          localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
        }
      }
      ProductsFromLocalStorage.forEach((it) => {
        counter += it.counter;
        totalprice += it.counter * it.price;
      });
      const cartQuantity = document.getElementById('counter-basket');
      const AllPriceBasket = document.getElementById('all-price-basket');
      const basket = document.getElementById('basket-img');
      if (counter !== 0) {
        let cc = 0;
        ProductsFromLocalStorage.forEach((item) => (cc += item.counter));
        cartQuantity!.textContent = cc.toString();
        cartQuantity!.style.visibility = 'visible';
        cartQuantity!.style.opacity = '1';
        AllPriceBasket!.style.display = 'block';
        basket!.style.display = 'none';
        AllPriceBasket!.textContent = '$ ' + totalprice.toString();
      }
    });

    const fromcard = true;
    router.AddRoutingToBasket(buyNow, fromcard);

    addToCart.addEventListener('click', () => {
      //addToCart.classList.toggle('_product-added');
      let totalprice = 0;
      let counter = 0;
      let ProductsFromLocalStorage: product[] = [];
      if (addToCart.classList.contains('_product-added')) {
        ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products')!);
        let index = 0;
        ProductsFromLocalStorage.forEach((it, ind) => {
          if (it.id === product.id) {
            index = ind;
          }
        });
        ProductsFromLocalStorage.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
      } else {
        if (localStorage.getItem('products') !== null) {
          ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products')!);
          ProductsFromLocalStorage.push(product);
          localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
        } else {
          ProductsFromLocalStorage.push(product);
          localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
        }
      }
      addToCart.classList.toggle('_product-added');
      ProductsFromLocalStorage.forEach((it) => {
        counter += it.counter;
        totalprice += it.counter * it.price;
      });
      const cartQuantity = document.getElementById('counter-basket');
      const AllPriceBasket = document.getElementById('all-price-basket');
      const basket = document.getElementById('basket-img');
      if (counter !== 0) {
        let cc = 0;
        ProductsFromLocalStorage.forEach((item) => (cc += item.counter));
        cartQuantity!.textContent = cc.toString();
        cartQuantity!.style.visibility = 'visible';
        cartQuantity!.style.opacity = '1';
        AllPriceBasket!.style.display = 'block';
        basket!.style.display = 'none';
        AllPriceBasket!.textContent = '$ ' + totalprice.toString();
      } else {
        cartQuantity!.style.visibility = 'hidden';
        cartQuantity!.style.opacity = '0';
        AllPriceBasket!.style.display = 'none';
        basket!.style.display = 'block';
      }
    });
    carddata.append(dataTop, priceBlock, description, release, brand, category, buttons);
  }
}

//http://localhost:8080/url(https://i-product.by/images/o/apple-iphone-14-pro-128gb-kosmicheskij-chernyj_1.jpg
//https://i-product.by/images/o/apple-iphone-14-pro-128gb-kosmicheskij-chernyj_1.jpg
