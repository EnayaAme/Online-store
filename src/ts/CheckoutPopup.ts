import { CreateElement } from "./Elements/CreateElement";
import { CreateNumberInput } from "./Elements/CreateNumberInput";
import { CreateTextInput } from "./Elements/CreateTextInput";

export class CreateCheckoutPopup extends CreateElement {

  constructor() {
    super({tag: 'div', className: 'popup'})
    const creditCard = new CreateElement({ tag: 'div', className: 'popup__credit-card'}).getnode();
    const flip = new CreateElement({ tag: 'div', className: 'popup__flip'}).getnode();
    const flipFront = new CreateElement({ tag: 'div', className: 'popup__flip-front'}).getnode();
    const flipBack = new CreateElement({ tag: 'div', className: 'popup__flip-back'}).getnode();
    flip.append(flipFront, flipBack);
    ///// front /////
    const frontChip = new CreateElement({ tag: 'div', className: 'popup__front-chip'}).getnode();
    const frontLogo = new CreateElement({ tag: 'div', className: 'popup__front-logo card-logo'}).getnode();
    const frontNumber = new CreateElement({ tag: 'div', className: 'popup__front-number'}).getnode();
    
    const frontName = new CreateElement({ tag: 'div', className: 'popup__front-name'}).getnode();
    
    const namePlaceholder = new CreateElement({ tag: 'span', className: 'popup__front-name-placeholder', content: 'Card holder'}).getnode();
    const nameText = new CreateElement({ tag: 'div', className: 'popup__front-name-text'}).getnode();
    frontName.append(namePlaceholder, nameText);
    const frontExpiration = new CreateElement({ tag: 'div', className: 'popup__front-expiration'}).getnode();
    const expirationPlaceholder = new CreateElement({ tag: 'span', className: 'popup__front-expiration-placeholder', content: 'Expires'}).getnode();
    const expirationText = new CreateElement({ tag: 'div', className: 'popup__front-expiration-text'}).getnode();
    frontExpiration.append(expirationPlaceholder, expirationText);
    flipFront.append(frontChip, frontLogo, frontNumber, frontName, frontExpiration);
    ///// back /////
    const backStrip =  new CreateElement({ tag: 'div', className: 'popup__back-strip'}).getnode();
    const backLogo = new CreateElement({ tag: 'div', className: 'popup__back-logo card-logo'}).getnode();
    const backCcv = new CreateElement({ tag: 'div', className: 'popup__back-ccv'}).getnode();
    const ccvPlaceholder = new CreateElement({ tag: 'span', className: 'popup__back-ccv-placeholder', content: 'Ccv'}).getnode();
    const ccvText = new CreateElement({ tag: 'div', className: 'popup__back-ccv-text'}).getnode();
    backCcv.append(ccvPlaceholder, ccvText);
    flipBack.append(backStrip, backLogo, backCcv);
    creditCard.append(flip);
    ///////////////////////////////////////////////
    const form = new CreateElement({ tag: 'div', className: 'popup__form'}).getnode();
    const formCardNumberBlock = new CreateElement({ tag: 'div', className: 'form__block'}).getnode();
    const formCardNumberPlaceholder = new CreateElement({ tag: 'span', className: 'form__placeholder', content: 'Card number'}).getnode();
    const formCardNumberInputs = new CreateElement({ tag: 'div', className: 'form__inputs'}).getnode();
    const reg = new RegExp('[0-9]');
    const char = new RegExp('[^\d]');
    for (let i = 1; i < 5; i++) {
      const input = new CreateNumberInput({ type: 'text', className: 'form__input', required: true }).getnode();
      
      const number = new CreateElement({ tag: 'div', className: '.popup__number'}).getnode();
      frontNumber.append(number);
      input.maxLength = 4;
      input.onpaste = () => {return false}
      input.addEventListener('input', () => {
        let lastchar = input.value[input.value.length - 1];
        console.log(lastchar);
        input.value = input.value.slice(0, -1);
        number.textContent = input.value;
        if(reg.test(lastchar)) {
          input.value += lastchar;
          number.textContent += lastchar;
          if (i === 1) {
            switch (input.value[0]) {
              case '4':
                frontLogo.textContent = 'VISA';
              break;
              case '5':
                frontLogo.textContent = 'MasterCard';
              break;
              case '6':
                frontLogo.textContent = 'Discover';
              break;
              default:
                frontLogo.textContent = '';
              break;
            }
          }
        }
      });
      formCardNumberInputs.append(input);
    }
    formCardNumberBlock.append(formCardNumberPlaceholder, formCardNumberInputs);
    const formCardNameBlock = new CreateElement({ tag: 'div', className: 'form__block_name'}).getnode();
    const formCardNamePlaceholder = new CreateElement({ tag: 'span', className: 'form__placeholder', content: 'Card holder'}).getnode();
    const formCardNameInput = new CreateTextInput({ type: 'text', name: 'card-holder', className: 'form__input_long', required: true}).getnode();
    formCardNameBlock.append(formCardNamePlaceholder, formCardNameInput);
    const formCardOtherBlock = new CreateElement({ tag: 'div', className: 'form__block_other'}).getnode();
    const formCardExpirationBlock = new CreateElement({ tag: 'div', className: 'form__block-half'}).getnode();
    const formCardExpirationPlaceholder = new CreateElement({ tag: 'span', className: 'form__placeholder', content: 'Expiration date'}).getnode();
    const formCardMonth = new CreateElement({ tag: 'div', className: 'form__input', id: 'month-input'}).getnode();
    const formCardYear = new CreateElement({ tag: 'div', className: 'form__input'}).getnode();

    formCardExpirationBlock.append(formCardExpirationPlaceholder, formCardMonth, formCardYear);


    const formCardCcvBlock = new CreateElement({ tag: 'div', className: 'form__block-half'}).getnode();
    const formCardCcvPlaceholder = new CreateElement({ tag: 'span', className: 'form__placeholder', id: 'ccv-placeholder', content: 'Ccv'}).getnode();
    const formCardCcvInput = new CreateTextInput({ type: 'text', name: 'card-ccv', className: 'form__input', id: 'card-ccv', required: true}).getnode();
    formCardCcvInput.maxLength = 3;
    formCardCcvInput.addEventListener('input', () => {
      let lastchar = formCardCcvInput.value[formCardCcvInput.value.length - 1];
      //console.log(lastchar);
      formCardCcvInput.value = formCardCcvInput.value.slice(0, -1);
      if(reg.test(lastchar)) {
        formCardCcvInput.value += lastchar;
      }
    });
    formCardCcvInput.onpaste = () => {return false}
    formCardCcvBlock.append(formCardCcvPlaceholder, formCardCcvInput);

    formCardOtherBlock.append(formCardExpirationBlock, formCardCcvBlock);

    form.append(formCardNumberBlock, formCardNameBlock, formCardOtherBlock);

    this.el.append(creditCard, form);
  }

}