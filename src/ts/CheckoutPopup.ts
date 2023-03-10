import { CreateElement } from './Elements/CreateElement';
import { CreateNumberInput } from './Elements/CreateNumberInput';
import { CreateTextInput } from './Elements/CreateTextInput';

export class CreateCheckoutPopup extends CreateElement {
  constructor() {
    super({ tag: 'div', className: 'popup' });
    const creditCard = new CreateElement({ tag: 'div', className: 'popup__credit-card' }).getnode();
    const flip = new CreateElement({ tag: 'div', className: 'popup__flip' }).getnode();
    const flipFront = new CreateElement({ tag: 'div', className: 'popup__flip-front' }).getnode();
    const flipBack = new CreateElement({ tag: 'div', className: 'popup__flip-back' }).getnode();
    flip.append(flipFront, flipBack);
    const frontChip = new CreateElement({ tag: 'div', className: 'popup__front-chip' }).getnode();
    const frontLogo = new CreateElement({ tag: 'div', className: 'popup__front-logo card-logo' }).getnode();
    const frontNumber = new CreateElement({ tag: 'div', className: 'popup__front-number' }).getnode();
    const frontName = new CreateElement({ tag: 'div', className: 'popup__front-name' }).getnode();
    const namePlaceholder = new CreateElement({
      tag: 'span',
      className: 'popup__front-name-placeholder',
      content: 'Card holder',
    }).getnode();
    const nameText = new CreateElement({ tag: 'div', className: 'popup__front-name-text' }).getnode();
    frontName.append(namePlaceholder, nameText);
    const frontExpiration = new CreateElement({ tag: 'div', className: 'popup__front-expiration' }).getnode();
    const expirationPlaceholder = new CreateElement({
      tag: 'span',
      className: 'popup__front-expiration-placeholder',
      content: 'Expires',
    }).getnode();
    const expirationText = new CreateElement({ tag: 'div', className: 'popup__front-expiration-text' }).getnode();
    frontExpiration.append(expirationPlaceholder, expirationText);
    flipFront.append(frontChip, frontLogo, frontNumber, frontName, frontExpiration);
    const backStrip = new CreateElement({ tag: 'div', className: 'popup__back-strip' }).getnode();
    const backLogo = new CreateElement({ tag: 'div', className: 'popup__back-logo card-logo' }).getnode();
    const backCcv = new CreateElement({ tag: 'div', className: 'popup__back-ccv' }).getnode();
    const ccvPlaceholder = new CreateElement({
      tag: 'span',
      className: 'popup__back-ccv-placeholder',
      content: 'Ccv',
    }).getnode();
    const ccvText = new CreateElement({ tag: 'div', className: 'popup__back-ccv-text' }).getnode();
    backCcv.append(ccvPlaceholder, ccvText);
    flipBack.append(backStrip, backLogo, backCcv);
    creditCard.append(flip);
    const form = new CreateElement({ tag: 'div', className: 'popup__form' }).getnode();
    const formCardNumberBlock = new CreateElement({ tag: 'div', className: 'form__block' }).getnode();
    const formCardNumberPlaceholder = new CreateElement({
      tag: 'span',
      className: 'form__placeholder',
      content: 'Card number',
    }).getnode();
    const formCardNumberInputs = new CreateElement({ tag: 'div', className: 'form__inputs' }).getnode();
    const reg = new RegExp('[0-9]');
    for (let i = 1; i < 5; i++) {
      const input = new CreateNumberInput({
        type: 'text',
        className: 'form__input',
        id: i.toString(),
        required: true,
      }).getnode();
      const number = new CreateElement({ tag: 'div', className: '.popup__number' }).getnode();
      frontNumber.append(number);
      input.minLength = 4;
      input.maxLength = 4;
      input.onpaste = () => {
        return false;
      };
      input.addEventListener('input', () => {
        const lastchar = input.value[input.value.length - 1];
        input.value = input.value.slice(0, -1);
        number.textContent = input.value;
        if (reg.test(lastchar)) {
          input.value += lastchar;
          number.textContent += lastchar;
          if (i === 1) {
            switch (input.value[0]) {
              case '4':
                frontLogo.style.background = `url('./assets/images/visa.svg') no-repeat center / contain`;
                backLogo.style.background = `url('./assets/images/visa.svg') no-repeat center / contain`;
                break;
              case '5':
                frontLogo.style.background = `url('./assets/images/mastercard.svg') no-repeat center / contain`;
                backLogo.style.background = `url('./assets/images/mastercard.svg') no-repeat center / contain`;
                break;
              case '6':
                frontLogo.style.background = `url('./assets/images/discover.svg') no-repeat center / contain`;
                backLogo.style.background = `url('./assets/images/discover.svg') no-repeat center / contain`;
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
    const formCardNameBlock = new CreateElement({ tag: 'div', className: 'form__block_name' }).getnode();
    const formCardNamePlaceholder = new CreateElement({
      tag: 'span',
      className: 'form__placeholder',
      content: 'Card holder',
    }).getnode();
    const formCardNameInput = new CreateTextInput({
      type: 'text',
      name: 'card-holder',
      className: 'form__input_long',
      required: true,
    }).getnode();
    formCardNameInput.addEventListener('input', () => {
      nameText.textContent = formCardNameInput.value.toUpperCase();
    });
    formCardNameBlock.append(formCardNamePlaceholder, formCardNameInput);
    const formCardOtherBlock = new CreateElement({ tag: 'div', className: 'form__block_other' }).getnode();
    const formCardExpirationBlock = new CreateElement({ tag: 'div', className: 'form__block-half' }).getnode();
    const formCardExpirationPlaceholder = new CreateElement({
      tag: 'span',
      className: 'form__placeholder',
      content: 'Expiration date',
    }).getnode();
    const formCardMonth = new CreateElement({ tag: 'div', className: 'form__input', id: 'month-input' }).getnode();
    const MonthSelect = new CreateElement({ tag: 'select', className: 'form__select' }).getnode();
    const monthOption = new CreateElement({ tag: 'option' }).getnode();
    MonthSelect.append(monthOption);
    for (let i = 1; i < 13; i++) {
      const value = i.toString().padStart(2, '0');
      const option = new CreateElement({ tag: 'option', content: value }).getnode();
      MonthSelect.append(option);
    }
    formCardMonth.append(MonthSelect);
    const formCardYear = new CreateElement({ tag: 'div', className: 'form__input' }).getnode();
    const YearSelect = new CreateElement({ tag: 'select', className: 'form__select' }).getnode();
    const yearOption = new CreateElement({ tag: 'option' }).getnode();
    YearSelect.append(yearOption);
    for (let i = 2022; i < 2031; i++) {
      const value = i.toString();
      const option = new CreateElement({ tag: 'option', content: value }).getnode();
      YearSelect.append(option);
    }
    formCardYear.append(YearSelect);
    formCardExpirationBlock.append(formCardExpirationPlaceholder, formCardMonth, formCardYear);
    const formCardCcvBlock = new CreateElement({ tag: 'div', className: 'form__block-half' }).getnode();
    const formCardCcvPlaceholder = new CreateElement({
      tag: 'span',
      className: 'form__placeholder',
      id: 'ccv-placeholder',
      content: 'Ccv',
    }).getnode();
    const formCardCcvInput = new CreateTextInput({
      type: 'text',
      name: 'card-ccv',
      className: 'form__input',
      id: 'card-ccv',
      required: true,
    }).getnode();

    formCardCcvInput.addEventListener('click', () => {
      formCardCcvInput.focus();
      if (!creditCard.classList.contains('hover')) creditCard.classList.add('hover');
    });

    form.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).id !== 'card-ccv') {
        if (creditCard.classList.contains('hover')) creditCard.classList.remove('hover');
      }
    });

    formCardCcvInput.maxLength = 3;
    formCardCcvInput.addEventListener('input', () => {
      const lastchar = formCardCcvInput.value[formCardCcvInput.value.length - 1];
      formCardCcvInput.value = formCardCcvInput.value.slice(0, -1);
      if (reg.test(lastchar)) {
        formCardCcvInput.value += lastchar;
      }
      ccvText.textContent = formCardCcvInput.value;
    });
    formCardCcvInput.onpaste = () => {
      return false;
    };
    formCardCcvBlock.append(formCardCcvPlaceholder, formCardCcvInput);
    formCardOtherBlock.append(formCardExpirationBlock, formCardCcvBlock);
    const formCardAddressBlock = new CreateElement({ tag: 'div', className: 'form__block_address' }).getnode();
    const formAddressPlaceholder = new CreateElement({
      tag: 'span',
      className: 'form__placeholder',
      content: 'Shipping address',
    }).getnode();
    const formCardAddressInput = new CreateTextInput({
      type: 'text',
      name: 'address',
      className: 'form__input_long',
      required: true,
    }).getnode();

    formCardAddressBlock.append(formAddressPlaceholder, formCardAddressInput);
    const formCardContactsBlock = new CreateElement({ tag: 'div', className: 'form__block_other' }).getnode();
    const formPhoneBlock = new CreateElement({ tag: 'div', className: 'form__block-half' }).getnode();
    const formPhonePlaceholder = new CreateElement({
      tag: 'span',
      className: 'form__placeholder',
      id: 'phone-placeholder',
      content: 'Phone number',
    }).getnode();
    const formPhoneInput = new CreateTextInput({
      type: 'tel',
      name: 'phone',
      className: 'form__input_half',
      id: 'phone-input',
      required: true,
    }).getnode();

    formPhoneBlock.append(formPhonePlaceholder, formPhoneInput);
    const formEmailBlock = new CreateElement({ tag: 'div', className: 'form__block-half' }).getnode();
    const formEmailPlaceholder = new CreateElement({
      tag: 'span',
      className: 'form__placeholder',
      id: 'email-placeholder',
      content: 'E-mail',
    }).getnode();
    const formEmailInput = new CreateTextInput({
      type: 'email',
      name: 'email',
      className: 'form__input_half',
      id: 'email-input',
      required: true,
    }).getnode();
    formEmailBlock.append(formEmailPlaceholder, formEmailInput);
    formCardContactsBlock.append(formPhoneBlock, formEmailBlock);
    const confirmButton = new CreateElement({
      tag: 'button',
      className: 'popup__button',
      content: 'confirm',
    }).getnode();

    const MY = {
      month: '',
      year: '',
    };

    MonthSelect.addEventListener('change', () => {
      const month = Array.from(MonthSelect.getElementsByTagName('option')).filter((option) => {
        return option.selected;
      });
      MY.month = month[0].textContent!;
      expirationText.textContent = MY.month + '/' + MY.year;
    });

    YearSelect.addEventListener('change', () => {
      const Year = Array.from(YearSelect.getElementsByTagName('option')).filter((option) => {
        return option.selected;
      });
      MY.year = Year[0].textContent!;
      expirationText.textContent = MY.month + '/' + MY.year;
    });

    confirmButton.addEventListener('click', () => {
      let message = '';
      const month = Array.from(MonthSelect.getElementsByTagName('option')).filter((option) => {
        return option.selected;
      });
      const year = Array.from(MonthSelect.getElementsByTagName('option')).filter((option) => {
        return option.selected;
      });

      if (!/^([.a-zA-Z]{3,}[\s]){2,}$/.test((formCardNameInput.value += ' '))) {
        message += '\nCard holder name should contain at least 2 words each one not less than 3 letters!';
      }
      if (!month[0].textContent) {
        message += '\nChose expiration month!';
      }
      if (!year[0].textContent) {
        message += '\nChose expiration year!';
      }
      if (formCardAddressInput.value.toString().split('').reverse()[0] !== ' ') {
        formCardAddressInput.value += ' ';
      }
      if (!/^([.0-9a-zA-Z\-\,]{5,}[\s]){3,}$/.test(formCardAddressInput.value)) {
        message += '\nShipping address should contain at least 3 words each one not less than 5 symbols!';
      }
      if (!/^[\+][0-9]{9,15}$/.test(formPhoneInput.value)) {
        message += "\nPhone number should start with '+' and contain 9 or more digits!";
      }
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formEmailInput.value)) {
        message += '\nInvalid email address!';
      }
      let CardLength = 0;
      frontNumber.childNodes.forEach((it) => {
        CardLength += it.textContent!.split('').length!;
      });
      if (CardLength !== 16) {
        message += '\nInvalid Card!';
      }
      if (formCardCcvInput.value.split('').length !== 3) {
        message += '\nInvalid CCV!';
      }
      if (message) {
        alert(message);
      }
    });

    form.append(
      formCardNumberBlock,
      formCardNameBlock,
      formCardOtherBlock,
      formCardAddressBlock,
      formCardContactsBlock,
      confirmButton
    );

    this.el.append(creditCard, form);
  }
}
