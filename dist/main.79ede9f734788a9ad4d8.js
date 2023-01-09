/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./style.scss */ "./src/style.scss");
const ApplyRouting_1 = __webpack_require__(/*! ./ts/ApplyRouting */ "./src/ts/ApplyRouting.ts");
const data_1 = __importDefault(__webpack_require__(/*! ./ts/data */ "./src/ts/data.ts"));
const DefaultPage_1 = __importDefault(__webpack_require__(/*! ./ts/DefaultPage */ "./src/ts/DefaultPage.ts"));
const products = new data_1.default();
const AppRouting = new ApplyRouting_1.ApplyRouting();
const newarr = [];
newarr.push(products.Get()[0]);
newarr.push(products.Get()[1]);
newarr.push(products.Get()[2]);
products.GetMinMaxDate();
const hash = location.hash;
const Page = new DefaultPage_1.default();
Page.CreateHeader();
AppRouting.init(hash);
window.addEventListener('hashchange', () => {
    AppRouting.init(location.hash);
}, false);


/***/ }),

/***/ "./src/ts/ApplyFilters.ts":
/*!********************************!*\
  !*** ./src/ts/ApplyFilters.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplyFilters = void 0;
const data_1 = __importDefault(__webpack_require__(/*! ./data */ "./src/ts/data.ts"));
class ApplyFilters {
    //private
    constructor(filters) {
        this.data = new data_1.default();
        this.DataAfterFilters = [];
        this.DataAfterFilters = new data_1.default().Get();
        if (filters.Category.length !== 0) {
            this.category(filters.Category);
        }
        if (filters.Brand.length !== 0) {
            this.brand(filters.Brand);
        }
        if (filters.MinPrice !== this.data.GetMinMaxPrice().min || filters.MaxPrice !== this.data.GetMinMaxPrice().max) {
            this.price(filters.MinPrice, filters.MaxPrice);
        }
        if (filters.MinYear !== this.data.GetMinMaxDate().min || filters.MaxYear !== this.data.GetMinMaxDate().max) {
            this.date(filters.MinYear, filters.MaxYear);
        }
        if (filters.Search !== '') {
            this.search(filters.Search);
        }
    }
    return() {
        return this.DataAfterFilters;
    }
    category(categories) {
        const TempArray = [];
        categories.forEach((item) => {
            this.DataAfterFilters.forEach((it) => {
                if (item === it.category) {
                    TempArray.push(it);
                }
            });
        });
        this.DataAfterFilters = TempArray;
    }
    brand(brands) {
        const TempArray = [];
        brands.forEach((item) => {
            this.DataAfterFilters.forEach((it) => {
                if (item === it.brand) {
                    TempArray.push(it);
                }
            });
        });
        this.DataAfterFilters = TempArray;
    }
    price(min, max) {
        const TempArray = [];
        this.DataAfterFilters.forEach((it) => {
            if (+min <= it.price && it.price <= +max) {
                TempArray.push(it);
            }
        });
        this.DataAfterFilters = TempArray;
    }
    date(min, max) {
        const TempArray = [];
        this.DataAfterFilters.forEach((it) => {
            if (+min <= it.DateOfIssue && it.DateOfIssue <= +max) {
                TempArray.push(it);
            }
        });
        this.DataAfterFilters = TempArray;
    }
    search(search) {
        search = search.toLowerCase();
        const TempArray = [];
        this.DataAfterFilters.forEach((item) => {
            if (item.category.toLowerCase().includes(search)) {
                TempArray.push(item);
            }
            else if (item.brand.toLowerCase().includes(search)) {
                TempArray.push(item);
            }
            else if (item.price.toString().includes(search)) {
                TempArray.push(item);
            }
            else if (item.DateOfIssue.toString().includes(search)) {
                TempArray.push(item);
            }
            else if (item.model.toLowerCase().includes(search)) {
                TempArray.push(item);
            }
            else if (item.description.toLowerCase().includes(search)) {
                TempArray.push(item);
            }
            else if (item.discountPercentage.toString().includes(search)) {
                TempArray.push(item);
            }
            else if (item.rating.toString().includes(search)) {
                TempArray.push(item);
            }
        });
        this.DataAfterFilters = TempArray;
    }
    swap(first, second) {
        const temp = first;
        first = second;
        second = temp;
    }
}
exports.ApplyFilters = ApplyFilters;


/***/ }),

/***/ "./src/ts/ApplyRouting.ts":
/*!********************************!*\
  !*** ./src/ts/ApplyRouting.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplyRouting = void 0;
const ApplyFilters_1 = __webpack_require__(/*! ./ApplyFilters */ "./src/ts/ApplyFilters.ts");
const ApplySort_1 = __webpack_require__(/*! ./ApplySort */ "./src/ts/ApplySort.ts");
const BasketPage_1 = __webpack_require__(/*! ./BasketPage */ "./src/ts/BasketPage.ts");
const CardPage_1 = __webpack_require__(/*! ./CardPage */ "./src/ts/CardPage.ts");
const CreateCartItem_1 = __webpack_require__(/*! ./Components/CreateCartItem */ "./src/ts/Components/CreateCartItem.ts");
const CreateListOfCards_1 = __webpack_require__(/*! ./CreateListOfCards */ "./src/ts/CreateListOfCards.ts");
const data_1 = __importDefault(__webpack_require__(/*! ./data */ "./src/ts/data.ts"));
const DefaultPage_1 = __importDefault(__webpack_require__(/*! ./DefaultPage */ "./src/ts/DefaultPage.ts"));
class ApplyRouting {
    constructor() {
        this.MainPage = new DefaultPage_1.default();
        this.products = new data_1.default();
        this.body = document.body;
        this.checker = false;
        this.ToPages = false;
        this.isChangePrice = false;
        this.LimitPage = {
            limit: 3,
            page: 1,
        };
        this.filters = {
            Category: [],
            Brand: [],
            MinPrice: this.products.GetMinMaxPrice().min,
            MaxPrice: this.products.GetMinMaxPrice().max,
            MinYear: this.products.GetMinMaxDate().min,
            MaxYear: this.products.GetMinMaxDate().max,
            Search: '',
            Sort: 'Sort by',
        };
    }
    init(hash) {
        var _a;
        if (hash[1] === '?') {
            this.createFilters(hash);
            if (document.body.childNodes[2]) {
                document.body.childNodes[2].remove();
                document.body.childNodes[2].remove();
            }
            const data = new ApplyFilters_1.ApplyFilters(this.filters).return();
            this.MainPage.CreateMain(this.filters, data);
            const DataSort = new ApplySort_1.ApplySort(this.filters.Sort, data);
            new CreateListOfCards_1.CreateListOfCards(DataSort.return());
            this.MainPage.CreateFooter();
        }
        if (hash.split('-')[0] === '#card') {
            if (this.body.children[1] && this.body.children[2]) {
                this.body.children[2].remove();
                this.body.children[1].remove();
            }
            new CardPage_1.CardPage(this.products.GetById(hash.split('-')[1]));
            this.MainPage.CreateFooter();
        }
        if (hash === '') {
            this.ToDefaultFilters();
            this.MainPage = new DefaultPage_1.default();
            if (document.body.childNodes[2]) {
                document.body.childNodes[2].remove();
                document.body.childNodes[2].remove();
            }
            const data = new ApplyFilters_1.ApplyFilters(this.filters).return();
            const DataSort = new ApplySort_1.ApplySort(this.filters.Sort, data);
            this.MainPage.CreateMain(this.filters, DataSort.return());
            new CreateListOfCards_1.CreateListOfCards(DataSort.return());
            this.MainPage.CreateFooter();
            this.checker = true;
        }
        if (hash === '#basket') {
            this.checker = true;
            if (this.body.children[1] && this.body.children[2]) {
                this.body.children[2].remove();
                this.body.children[1].remove();
            }
            new BasketPage_1.BasketPage(3, 1);
            new CreateCartItem_1.CreateCartItem(3, 1);
            this.MainPage.CreateFooter();
            if (localStorage.getItem('fromcard') === 'true') {
                (_a = document.getElementById('buyitnowBtn')) === null || _a === void 0 ? void 0 : _a.click();
                localStorage.removeItem('fromcard');
            }
        }
        if (hash[7] === '!') {
            if (this.body.children[1] && this.body.children[2]) {
                this.body.children[2].remove();
                this.body.children[1].remove();
            }
            const filt = hash.split('!')[1];
            if (filt.includes('&')) {
                this.LimitPage.limit = +filt.split('&')[0].split('=')[1];
                this.LimitPage.page = +filt.split('&')[1].split('=')[1];
            }
            else {
                if (filt.includes('limit')) {
                    this.LimitPage.limit = +filt.split('=')[1];
                    this.LimitPage.page = 1;
                }
                else {
                    this.LimitPage.page = +filt.split('=')[1];
                }
            }
            //console.log(this.LimitPage);
            new BasketPage_1.BasketPage(this.LimitPage.limit, this.LimitPage.page);
            new CreateCartItem_1.CreateCartItem(this.LimitPage.limit, this.LimitPage.page);
            this.MainPage.CreateFooter();
        }
        ///filters///
        ///Category///
        // if (id.split('=')[0] === 'Category') {
        //   if(!this.filters.Category.includes(id.split('=')[1])){
        //     this.filters.Category.push(id.split('=')[1]);
        //   }
        // }
        // if (this.checker === false) {
        // }
    }
    createFilters(hash) {
        const ArrayFilters = hash.slice(2).split('&');
        this.ToDefaultFilters();
        ArrayFilters.forEach((item) => {
            const key = item.split('=')[0];
            const values = item.split('=')[1];
            switch (key) {
                case 'Category':
                    this.filters.Category = values.split('+');
                    break;
                case 'Brand':
                    this.filters.Brand = values.split('+');
                    break;
                case 'Price':
                    this.filters.MinPrice = values.split('+')[0];
                    this.filters.MaxPrice = values.split('+')[1];
                    break;
                case 'Date':
                    this.filters.MinYear = values.split('+')[0];
                    this.filters.MaxYear = values.split('+')[1];
                    break;
                case 'Search':
                    this.filters.Search = decodeURI(values);
                    break;
                case 'Sort':
                    this.filters.Sort = values;
                    break;
                default:
                    break;
            }
        });
    }
    ToDefaultFilters() {
        this.filters.Brand = [];
        this.filters.Category = [];
        this.filters.MinPrice = this.products.GetMinMaxPrice().min;
        this.filters.MaxPrice = this.products.GetMinMaxPrice().max;
        this.filters.MinYear = this.products.GetMinMaxDate().min;
        this.filters.MaxYear = this.products.GetMinMaxDate().max;
        this.filters.Search = '';
        this.filters.Sort = 'Sort by';
    }
}
exports.ApplyRouting = ApplyRouting;


/***/ }),

/***/ "./src/ts/ApplySort.ts":
/*!*****************************!*\
  !*** ./src/ts/ApplySort.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplySort = void 0;
class ApplySort {
    //private
    constructor(sort, products) {
        this.DataAfterFilters = [];
        this.DataAfterFilters = products;
        if (sort !== 'Sort by') {
            switch (sort) {
                case 'Rating':
                    this.SortByRating(this.DataAfterFilters);
                    break;
                case 'PriceTH':
                    this.SortByPriceLtoH(this.DataAfterFilters);
                    break;
                case 'PriceTL':
                    this.SortByPriceHtoL(this.DataAfterFilters);
                    break;
                case 'RD':
                    this.SortByReleaseDate(this.DataAfterFilters);
                    break;
                default:
                    //this.SortByID(this.DataAfterFilters);
                    break;
            }
        }
        if (sort === 'Sort by') {
            this.SortByID(this.DataAfterFilters);
        }
    }
    return() {
        return this.DataAfterFilters;
    }
    SortByRating(products) {
        let counter = 1;
        let temp;
        for (let k = 0; k < products.length; k++) {
            for (let i = counter; i < products.length; i++) {
                if (products[k].rating > products[i].rating) {
                    temp = products[k];
                    products[k] = products[i];
                    products[i] = temp;
                }
            }
            counter += 1;
        }
    }
    SortByID(products) {
        let counter = 1;
        let temp;
        for (let k = 0; k < products.length; k++) {
            for (let i = counter; i < products.length; i++) {
                if (products[k].id > products[i].id) {
                    temp = products[k];
                    products[k] = products[i];
                    products[i] = temp;
                }
            }
            counter += 1;
        }
    }
    SortByPriceLtoH(products) {
        let counter = 1;
        let temp;
        for (let k = 0; k < products.length; k++) {
            for (let i = counter; i < products.length; i++) {
                if (products[k].price > products[i].price) {
                    temp = products[k];
                    products[k] = products[i];
                    products[i] = temp;
                }
            }
            counter += 1;
        }
    }
    SortByPriceHtoL(products) {
        let counter = 1;
        let temp;
        for (let k = 0; k < products.length; k++) {
            for (let i = counter; i < products.length; i++) {
                if (products[k].price < products[i].price) {
                    temp = products[k];
                    products[k] = products[i];
                    products[i] = temp;
                }
            }
            counter += 1;
        }
    }
    SortByReleaseDate(products) {
        let counter = 1;
        let temp;
        for (let k = 0; k < products.length; k++) {
            for (let i = counter; i < products.length; i++) {
                if (products[k].DateOfIssue > products[i].DateOfIssue) {
                    temp = products[k];
                    products[k] = products[i];
                    products[i] = temp;
                }
            }
            counter += 1;
        }
    }
    swap(first, second) {
        const temp = first;
        first = second;
        second = temp;
    }
}
exports.ApplySort = ApplySort;


/***/ }),

/***/ "./src/ts/BasketPage.ts":
/*!******************************!*\
  !*** ./src/ts/BasketPage.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BasketPage = void 0;
const CheckoutPopup_1 = __webpack_require__(/*! ./CheckoutPopup */ "./src/ts/CheckoutPopup.ts");
const CreateElement_1 = __webpack_require__(/*! ./Elements/CreateElement */ "./src/ts/Elements/CreateElement.ts");
const CreateTextInput_1 = __webpack_require__(/*! ./Elements/CreateTextInput */ "./src/ts/Elements/CreateTextInput.ts");
const route_1 = __importDefault(__webpack_require__(/*! ./route */ "./src/ts/route.ts"));
class BasketPage {
    constructor(DefaultLimit, DefaultPage) {
        var _a;
        this.route = new route_1.default();
        if (localStorage.getItem('products') !== null && ((_a = localStorage.getItem('products')) === null || _a === void 0 ? void 0 : _a.length) !== 2) {
            let ProductsFromLocalStorage = [];
            ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products'));
            const pages = Math.ceil(ProductsFromLocalStorage.length / DefaultLimit);
            let totalprice = 0;
            ProductsFromLocalStorage.forEach((item) => {
                totalprice += item.counter * item.price;
            });
            const body = document.body;
            const main = new CreateElement_1.CreateElement({ tag: 'main', className: 'main' }).getnode();
            body.append(main);
            const wrapper = new CreateElement_1.CreateElement({ tag: 'div', className: 'wrapper main__wrapper cart__wrapper' }).getnode();
            main.append(wrapper);
            const menu = new CreateElement_1.CreateElement({ tag: 'div', className: 'menu' }).getnode();
            // wrapper.append(menu);
            //const TextMenu = new CreateElement({ tag: 'h2', className: 'textmenu', content: 'Products In Cart' }).getnode();
            const limit = new CreateTextInput_1.CreateTextInput({
                type: 'number',
                placeholder: '3',
                className: 'limit',
                name: 'limit',
            }).getnode();
            const page = new CreateTextInput_1.CreateTextInput({ type: 'number', placeholder: '1', className: 'page', name: 'page' }).getnode();
            const LimitSpan = new CreateElement_1.CreateElement({ tag: 'span', content: 'Limit:' }).getnode();
            const PageSpan = new CreateElement_1.CreateElement({ tag: 'span', content: 'Page:' }).getnode();
            limit.value = DefaultLimit.toString();
            limit.min = '1';
            limit.max = ProductsFromLocalStorage.length.toString();
            page.value = DefaultPage.toString();
            page.min = '1';
            page.max = pages.toString();
            limit.addEventListener('input', () => {
                this.route.AddRoutingInBasket(+limit.value, +page.value);
                //console.log(document.getElementsByTagName('input')[1].value)
            });
            page.addEventListener('input', () => {
                this.route.AddRoutingInBasket(+limit.value, +page.value);
            });
            menu.append(/*TextMenu*/ LimitSpan, limit, PageSpan, page);
            const ListOfProducts = new CreateElement_1.CreateElement({ tag: 'div', className: 'cart__items', id: 'cart-items' }).getnode();
            const summary = new CreateElement_1.CreateElement({ tag: 'div', className: 'cart__summary' }).getnode();
            ListOfProducts.append(menu);
            ////// SUMMARY //////
            const summaryWrapper = new CreateElement_1.CreateElement({ tag: 'div', className: 'summary__wrapper' }).getnode();
            summary.append(summaryWrapper);
            const promocode = new CreateElement_1.CreateElement({ tag: 'div', className: 'summary__promocode' }).getnode();
            const promocodeTitle = new CreateElement_1.CreateElement({
                tag: 'span',
                className: 'summary__title',
                content: 'Promo Code',
            }).getnode();
            const promocodeArea = new CreateElement_1.CreateElement({ tag: 'div', className: 'summary__promocode-area' }).getnode();
            const promocodeInput = new CreateTextInput_1.CreateTextInput({
                type: 'text',
                placeholder: 'balaxon | enayaame',
                name: 'promocode',
                className: 'summary__promocode-input',
            }).getnode();
            const promocodeButton = new CreateElement_1.CreateElement({
                tag: 'button',
                className: 'summary__promocode-button',
                content: 'add',
            }).getnode();
            const promocodeTextArea = new CreateElement_1.CreateElement({ tag: 'div', className: 'summary__text-area' }).getnode();
            promocodeArea.append(promocodeInput, promocodeButton);
            promocode.append(promocodeTitle, promocodeArea, promocodeTextArea);
            const orderSummary = new CreateElement_1.CreateElement({ tag: 'div', className: 'summary__order-summary' }).getnode();
            const orderTitle = new CreateElement_1.CreateElement({
                tag: 'span',
                className: 'summary__title',
                content: 'Order summary',
            }).getnode();
            const orderTextArea = new CreateElement_1.CreateElement({ tag: 'div', className: 'summary__text-area' }).getnode();
            const orderSubtotal = new CreateElement_1.CreateElement({ tag: 'div', className: 'summary__li' }).getnode();
            const summaryOrder1Left = new CreateElement_1.CreateElement({ tag: 'span', content: 'Subtotal' }).getnode();
            const summaryOrder1Right = new CreateElement_1.CreateElement({ tag: 'div', className: 'summary__price-change' }).getnode();
            const summaryPrice = new CreateElement_1.CreateElement({
                tag: 'span',
                content: '$ ' + totalprice.toString(),
                id: 'subtotal-price',
            }).getnode();
            summaryOrder1Right.append(summaryPrice);
            orderSubtotal.append(summaryOrder1Left, summaryOrder1Right);
            const orderShipping = new CreateElement_1.CreateElement({ tag: 'div', className: 'summary__li' }).getnode();
            const summaryOrder2Left = new CreateElement_1.CreateElement({ tag: 'span', content: 'Shipping' }).getnode();
            const summaryOrder2Right = new CreateElement_1.CreateElement({ tag: 'span', content: '$ 20' }).getnode();
            orderShipping.append(summaryOrder2Left, summaryOrder2Right);
            orderTextArea.append(orderSubtotal, orderShipping);
            orderSummary.append(orderTitle, orderTextArea);
            const total = new CreateElement_1.CreateElement({ tag: 'div', className: 'summary__total' }).getnode();
            const totalTitle = new CreateElement_1.CreateElement({ tag: 'span', className: 'summary__title', content: 'Total' }).getnode();
            const totalPrice = new CreateElement_1.CreateElement({
                tag: 'span',
                className: 'summary__title',
                content: '$ ' + (totalprice + 20).toString(),
                id: 'summary-total',
            }).getnode();
            total.append(totalTitle, totalPrice);
            const checkoutButton = new CreateElement_1.CreateElement({
                tag: 'button',
                className: 'summary__checkout-button',
                id: 'buyitnowBtn',
                content: 'Go to checkout',
            }).getnode();
            summaryWrapper.append(promocode, orderSummary, total, checkoutButton);
            wrapper.append(ListOfProducts, summary);
            ///////////////////
            checkoutButton.addEventListener('click', () => {
                const body = document.body;
                const overlay = new CreateElement_1.CreateElement({ tag: 'div', className: 'popup__overlay' }).getnode();
                const popup = new CheckoutPopup_1.CreateCheckoutPopup().getnode();
                overlay.append(popup);
                body.append(overlay);
                body.style.overflowY = 'hidden';
                overlay.addEventListener('click', (e) => {
                    if (e.target.classList.contains('popup__overlay')) {
                        popup.remove();
                        overlay.remove();
                        body.style.overflowY = 'auto';
                    }
                });
            });
            ///////////////////
            let balaxon = '';
            let enayaame = '';
            let balaxonCounter = 0;
            let enayaameCounter = 0;
            let sale = 0;
            if (window.localStorage.getItem('balaxon') !== null) {
                balaxon = 'balaxon';
                balaxonCounter = +window.localStorage.getItem('balaxon');
            }
            if (window.localStorage.getItem('enayaame') !== null) {
                enayaame = 'enayaame';
                enayaameCounter = +window.localStorage.getItem('enayaame');
            }
            if (balaxon === 'balaxon' && balaxonCounter === 1) {
                const promocode = new CreateElement_1.CreateElement({ tag: 'div', className: 'summary__li' }).getnode();
                const summaryPromocode1Left = new CreateElement_1.CreateElement({ tag: 'span', content: balaxon }).getnode();
                const summaryPromocode1Right = new CreateElement_1.CreateElement({ tag: 'span', content: '-10%' }).getnode();
                const balaxonDel = new CreateElement_1.CreateElement({
                    tag: 'button',
                    className: 'summary__promocode-button',
                    content: 'del',
                }).getnode();
                balaxonDel.addEventListener('click', () => {
                    window.localStorage.removeItem('balaxon');
                    location.reload();
                });
                promocode.append(summaryPromocode1Left, summaryPromocode1Right, balaxonDel);
                promocodeTextArea.append(promocode);
                sale += 0.1;
            }
            if (enayaame === 'enayaame' && enayaameCounter === 1) {
                const promocode = new CreateElement_1.CreateElement({ tag: 'div', className: 'summary__li' }).getnode();
                const summaryPromocode1Left = new CreateElement_1.CreateElement({ tag: 'span', content: enayaame }).getnode();
                const summaryPromocode1Right = new CreateElement_1.CreateElement({ tag: 'span', content: '-10%' }).getnode();
                const enayaameDel = new CreateElement_1.CreateElement({
                    tag: 'button',
                    className: 'summary__promocode-button',
                    content: 'del',
                }).getnode();
                enayaameDel.addEventListener('click', () => {
                    window.localStorage.removeItem('enayaame');
                    location.reload();
                });
                promocode.append(summaryPromocode1Left, summaryPromocode1Right, enayaameDel);
                promocodeTextArea.append(promocode);
                sale += 0.1;
            }
            if (enayaame === 'enayaame' || balaxon === 'balaxon') {
                const summaryPrice = new CreateElement_1.CreateElement({ tag: 'span', id: 'summary-price' }).getnode();
                summaryOrder1Right.append(summaryPrice);
                //const newPrice =  (Number(summaryPrice.previousElementSibling!.textContent?.slice(2)) - (Number(summaryPrice.previousElementSibling!.textContent?.slice(2)) / 100 * 10)).toFixed(2);
                summaryPrice.textContent = '$ ' + (totalprice - totalprice * sale);
                totalPrice.textContent = '$ ' + (20 + (totalprice - totalprice * sale)).toFixed(2);
                summaryPrice.previousElementSibling.classList.add('price-changed');
            }
            promocodeButton.addEventListener('click', () => {
                if ((promocodeInput.value === 'balaxon' && balaxonCounter === 0) ||
                    (promocodeInput.value === 'enayaame' && enayaameCounter == 0)) {
                    // const promocode = new CreateElement({ tag: 'div', className: 'summary__li' }).getnode();
                    // const summaryPromocode1Left = new CreateElement({ tag: 'span', content: promocodeInput.value }).getnode();
                    // const summaryPromocode1Right = new CreateElement({ tag: 'span', content: '-10%' }).getnode();
                    // promocode.append(summaryPromocode1Left, summaryPromocode1Right);
                    // promocodeTextArea.append(promocode);
                    if (promocodeInput.value === 'balaxon')
                        balaxonCounter += 1;
                    if (promocodeInput.value === 'enayaame')
                        enayaameCounter += 1;
                    // if(window.localStorage.getItem('balaxon') === null && window.localStorage.getItem('enayaame') === null) {
                    //   const summaryPrice = new CreateElement({ tag: 'span', id: 'summary-price' }).getnode();
                    //   summaryOrder1Right.append(summaryPrice);
                    // const newPrice =  (Number(summaryPrice.previousElementSibling!.textContent?.slice(2)) - (Number(summaryPrice.previousElementSibling!.textContent?.slice(2)) / 100 * 10)).toFixed(2);
                    // summaryPrice.textContent = '$ ' + newPrice;
                    // totalPrice.textContent = '$ ' + ((20 + +newPrice)).toFixed(2);
                    // summaryPrice.previousElementSibling!.classList.add('price-changed');
                    // }
                    if (balaxonCounter === 1 && enayaameCounter === 1) {
                        window.localStorage.setItem('balaxon', '1');
                        window.localStorage.setItem('enayaame', '1');
                    }
                    else {
                        if (balaxonCounter === 1) {
                            window.localStorage.setItem('balaxon', '1');
                        }
                        else {
                            window.localStorage.setItem('enayaame', '1');
                        }
                    }
                    location.reload();
                }
            });
        }
        else {
            const body = document.body;
            const main = new CreateElement_1.CreateElement({ tag: 'main', className: 'main main_empty' }).getnode();
            const empty = new CreateElement_1.CreateElement({ tag: 'span', className: 'cart-empty', content: 'Cart is empty' }).getnode();
            main.append(empty);
            body.append(main);
        }
    }
}
exports.BasketPage = BasketPage;


/***/ }),

/***/ "./src/ts/CardPage.ts":
/*!****************************!*\
  !*** ./src/ts/CardPage.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CardPage = void 0;
const CreateElement_1 = __webpack_require__(/*! ./Elements/CreateElement */ "./src/ts/Elements/CreateElement.ts");
const CreateImage_1 = __webpack_require__(/*! ./Elements/CreateImage */ "./src/ts/Elements/CreateImage.ts");
const route_1 = __importDefault(__webpack_require__(/*! ./route */ "./src/ts/route.ts"));
class CardPage {
    constructor(product) {
        const router = new route_1.default();
        const main = new CreateElement_1.CreateElement({ tag: 'main', className: 'main' }).getnode();
        const wrapper = new CreateElement_1.CreateElement({ tag: 'div', className: 'wrapper card-page__wrapper' }).getnode();
        document.body.append(main);
        const DivPath = new CreateElement_1.CreateElement({ tag: 'div', className: 'DivPath' }).getnode();
        const DivCard = new CreateElement_1.CreateElement({ tag: 'div', className: 'DivCard' }).getnode();
        main.append(wrapper);
        wrapper.append(DivPath);
        wrapper.append(DivCard);
        // ---------------------- первый див div.path
        for (let i = 0; i < 4; i++) {
            const span = new CreateElement_1.CreateElement({ tag: 'a', className: 'card_path' }).getnode();
            DivPath.append(span);
        }
        DivPath.childNodes[0].textContent = 'STORE / ';
        router.AddRoutingToHeader(DivPath.childNodes[0]);
        DivPath.childNodes[1].textContent = product.category + ' / ';
        DivPath.childNodes[2].textContent = product.brand + ' / ';
        DivPath.childNodes[3].textContent = product.model;
        // ------------------- второй див div.card
        // const h1 = new CreateElement({ tag: 'h1', id: 'h1_card', content: product.model }).getnode();
        // DivCard.append(h1);
        const cardcontent = new CreateElement_1.CreateElement({ tag: 'div', id: 'cardcontent' }).getnode();
        DivCard.append(cardcontent);
        const cardimages = new CreateElement_1.CreateElement({ tag: 'div', id: 'cardimages' }).getnode();
        const carddata = new CreateElement_1.CreateElement({ tag: 'div', id: 'carddata' }).getnode();
        const cardprice = new CreateElement_1.CreateElement({ tag: 'div', id: 'cardprice' }).getnode();
        cardcontent.append(cardimages);
        cardcontent.append(carddata);
        cardcontent.append(cardprice);
        // ---------------------- images:
        const row = new CreateElement_1.CreateElement({ tag: 'div', id: 'row', className: 'row' }).getnode();
        cardimages.append(row);
        const col2 = new CreateElement_1.CreateElement({ tag: 'div', id: 'col-2', className: 'col-2' }).getnode();
        row.append(col2);
        const currentimage = new CreateImage_1.CreateImage({
            src: `${product.images[0]}`,
            id: 'currentimage',
            className: 'currentimage',
        }).getnode();
        const imgRow = new CreateElement_1.CreateElement({ tag: 'div', id: 'small-img-row', className: 'small-img-row' }).getnode();
        col2.append(currentimage, imgRow);
        // const listimages = new CreateElement({ tag: 'div', id: 'listimages' }).getnode();
        // cardimages.append(listimages);
        product.images.forEach((it) => {
            const smallimgContainer = new CreateElement_1.CreateElement({
                tag: 'div',
                id: 'smallImgContainer',
                className: 'smallImgContainer',
            }).getnode();
            const smallimg = new CreateImage_1.CreateImage({ src: `${it}`, id: 'smallImg', className: 'smallImg' }).getnode();
            smallimgContainer.append(smallimg);
            imgRow.append(smallimgContainer);
            // переключение основной картинки //
            smallimg.addEventListener('click', () => {
                currentimage.src = smallimg.src;
            });
        });
        // -----------------data:
        const dataTop = new CreateElement_1.CreateElement({ tag: 'div', className: 'data-top' }).getnode();
        const h1 = new CreateElement_1.CreateElement({ tag: 'h1', id: 'h1_card', content: product.model }).getnode();
        const ratingBlock = new CreateElement_1.CreateElement({ tag: 'div', className: 'rating-block' }).getnode();
        const ratingIcon = new CreateImage_1.CreateImage({
            src: './assets/images/star-rating.svg',
            className: 'rating-icon',
            alt: 'star',
        }).getnode();
        const ratingNum = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'rating-num',
            content: product.rating.toString(),
        }).getnode();
        ratingBlock.append(ratingIcon, ratingNum);
        dataTop.append(h1, ratingBlock);
        const priceBlock = new CreateElement_1.CreateElement({ tag: 'div', className: 'data__price' }).getnode();
        const priceNoDiscount = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'price-no-discount',
            content: '$ ' + ((product.discountPercentage / 100) * product.price + product.price).toFixed(2).toString(),
        }).getnode();
        const priceWithDiscount = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'price-with-discount',
            content: '$ ' + product.price.toString(),
        }).getnode();
        priceBlock.append(priceNoDiscount, priceWithDiscount);
        const description = new CreateElement_1.CreateElement({ tag: 'span', className: 'data__title', content: 'Description:' }).getnode();
        const descriptionText = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'data__text',
            content: product.description,
        }).getnode();
        description.append(descriptionText);
        const release = new CreateElement_1.CreateElement({ tag: 'span', className: 'data__title', content: 'Release date:' }).getnode();
        const releaseText = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'data__text',
            content: product.DateOfIssue.toString(),
        }).getnode();
        release.append(releaseText);
        const brand = new CreateElement_1.CreateElement({ tag: 'span', className: 'data__title', content: 'Brand:' }).getnode();
        const brandtext = new CreateElement_1.CreateElement({ tag: 'span', className: 'data__text', content: product.brand }).getnode();
        brand.append(brandtext);
        const category = new CreateElement_1.CreateElement({ tag: 'span', className: 'data__title', content: 'Category:' }).getnode();
        const categoryText = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'data__text',
            content: product.category,
        }).getnode();
        category.append(categoryText);
        const buttons = new CreateElement_1.CreateElement({ tag: 'div', className: 'data__buttons' }).getnode();
        const buyNow = new CreateElement_1.CreateElement({ tag: 'button', className: 'data__button', content: 'Buy it now' }).getnode();
        const addToCart = new CreateElement_1.CreateElement({ tag: 'div', className: 'card-page__add-to-cart' }).getnode();
        buttons.append(buyNow, addToCart);
        if (localStorage.getItem('products') !== null) {
            const cards = JSON.parse(localStorage.getItem('products'));
            cards.forEach((it) => {
                if (it.id === product.id) {
                    addToCart.classList.toggle('_product-added');
                }
            });
        }
        buyNow.addEventListener('click', () => {
            let ProductsFromLocalStorage = [];
            let totalprice = 0;
            let counter = 0;
            if (!addToCart.classList.contains('_product-added')) {
                if (localStorage.getItem('products') !== null) {
                    ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products'));
                    ProductsFromLocalStorage.push(product);
                    localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
                }
                else {
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
                cartQuantity.textContent = cc.toString();
                cartQuantity.style.visibility = 'visible';
                cartQuantity.style.opacity = '1';
                AllPriceBasket.style.display = 'block';
                basket.style.display = 'none';
                AllPriceBasket.textContent = '$ ' + totalprice.toString();
            }
        });
        const fromcard = true;
        router.AddRoutingToBasket(buyNow, fromcard);
        addToCart.addEventListener('click', () => {
            //addToCart.classList.toggle('_product-added');
            let totalprice = 0;
            let counter = 0;
            let ProductsFromLocalStorage = [];
            if (addToCart.classList.contains('_product-added')) {
                ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products'));
                let index = 0;
                ProductsFromLocalStorage.forEach((it, ind) => {
                    if (it.id === product.id) {
                        index = ind;
                    }
                });
                ProductsFromLocalStorage.splice(index, 1);
                localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
            }
            else {
                if (localStorage.getItem('products') !== null) {
                    ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products'));
                    ProductsFromLocalStorage.push(product);
                    localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
                }
                else {
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
                cartQuantity.textContent = cc.toString();
                cartQuantity.style.visibility = 'visible';
                cartQuantity.style.opacity = '1';
                AllPriceBasket.style.display = 'block';
                basket.style.display = 'none';
                AllPriceBasket.textContent = '$ ' + totalprice.toString();
            }
            else {
                cartQuantity.style.visibility = 'hidden';
                cartQuantity.style.opacity = '0';
                AllPriceBasket.style.display = 'none';
                basket.style.display = 'block';
            }
        });
        carddata.append(dataTop, priceBlock, description, release, brand, category, buttons);
    }
}
exports.CardPage = CardPage;
//http://localhost:8080/url(https://i-product.by/images/o/apple-iphone-14-pro-128gb-kosmicheskij-chernyj_1.jpg
//https://i-product.by/images/o/apple-iphone-14-pro-128gb-kosmicheskij-chernyj_1.jpg


/***/ }),

/***/ "./src/ts/CheckoutPopup.ts":
/*!*********************************!*\
  !*** ./src/ts/CheckoutPopup.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCheckoutPopup = void 0;
const CreateElement_1 = __webpack_require__(/*! ./Elements/CreateElement */ "./src/ts/Elements/CreateElement.ts");
const CreateNumberInput_1 = __webpack_require__(/*! ./Elements/CreateNumberInput */ "./src/ts/Elements/CreateNumberInput.ts");
const CreateTextInput_1 = __webpack_require__(/*! ./Elements/CreateTextInput */ "./src/ts/Elements/CreateTextInput.ts");
class CreateCheckoutPopup extends CreateElement_1.CreateElement {
    constructor() {
        super({ tag: 'div', className: 'popup' });
        const creditCard = new CreateElement_1.CreateElement({ tag: 'div', className: 'popup__credit-card' }).getnode();
        const flip = new CreateElement_1.CreateElement({ tag: 'div', className: 'popup__flip' }).getnode();
        const flipFront = new CreateElement_1.CreateElement({ tag: 'div', className: 'popup__flip-front' }).getnode();
        const flipBack = new CreateElement_1.CreateElement({ tag: 'div', className: 'popup__flip-back' }).getnode();
        flip.append(flipFront, flipBack);
        ///// front /////
        const frontChip = new CreateElement_1.CreateElement({ tag: 'div', className: 'popup__front-chip' }).getnode();
        const frontLogo = new CreateElement_1.CreateElement({ tag: 'div', className: 'popup__front-logo card-logo' }).getnode();
        const frontNumber = new CreateElement_1.CreateElement({ tag: 'div', className: 'popup__front-number' }).getnode();
        const frontName = new CreateElement_1.CreateElement({ tag: 'div', className: 'popup__front-name' }).getnode();
        const namePlaceholder = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'popup__front-name-placeholder',
            content: 'Card holder',
        }).getnode();
        const nameText = new CreateElement_1.CreateElement({ tag: 'div', className: 'popup__front-name-text' }).getnode();
        frontName.append(namePlaceholder, nameText);
        const frontExpiration = new CreateElement_1.CreateElement({ tag: 'div', className: 'popup__front-expiration' }).getnode();
        const expirationPlaceholder = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'popup__front-expiration-placeholder',
            content: 'Expires',
        }).getnode();
        const expirationText = new CreateElement_1.CreateElement({ tag: 'div', className: 'popup__front-expiration-text' }).getnode();
        frontExpiration.append(expirationPlaceholder, expirationText);
        flipFront.append(frontChip, frontLogo, frontNumber, frontName, frontExpiration);
        ///// back /////
        const backStrip = new CreateElement_1.CreateElement({ tag: 'div', className: 'popup__back-strip' }).getnode();
        const backLogo = new CreateElement_1.CreateElement({ tag: 'div', className: 'popup__back-logo card-logo' }).getnode();
        const backCcv = new CreateElement_1.CreateElement({ tag: 'div', className: 'popup__back-ccv' }).getnode();
        const ccvPlaceholder = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'popup__back-ccv-placeholder',
            content: 'Ccv',
        }).getnode();
        const ccvText = new CreateElement_1.CreateElement({ tag: 'div', className: 'popup__back-ccv-text' }).getnode();
        backCcv.append(ccvPlaceholder, ccvText);
        flipBack.append(backStrip, backLogo, backCcv);
        creditCard.append(flip);
        ///////////////////////////////////////////////
        const form = new CreateElement_1.CreateElement({ tag: 'div', className: 'popup__form' }).getnode();
        const formCardNumberBlock = new CreateElement_1.CreateElement({ tag: 'div', className: 'form__block' }).getnode();
        const formCardNumberPlaceholder = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'form__placeholder',
            content: 'Card number',
        }).getnode();
        const formCardNumberInputs = new CreateElement_1.CreateElement({ tag: 'div', className: 'form__inputs' }).getnode();
        const reg = new RegExp('[0-9]');
        for (let i = 1; i < 5; i++) {
            const input = new CreateNumberInput_1.CreateNumberInput({
                type: 'text',
                className: 'form__input',
                id: i.toString(),
                required: true,
            }).getnode();
            const number = new CreateElement_1.CreateElement({ tag: 'div', className: '.popup__number' }).getnode();
            frontNumber.append(number);
            input.minLength = 4;
            input.maxLength = 4;
            input.onpaste = () => {
                return false;
            };
            input.addEventListener('input', () => {
                const lastchar = input.value[input.value.length - 1];
                console.log(lastchar);
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
                                //frontLogo.textContent = 'VISA';
                                break;
                            case '5':
                                frontLogo.style.background = `url('./assets/images/mastercard.svg') no-repeat center / contain`;
                                backLogo.style.background = `url('./assets/images/mastercard.svg') no-repeat center / contain`;
                                //frontLogo.textContent = 'MasterCard';
                                break;
                            case '6':
                                frontLogo.style.background = `url('./assets/images/discover.svg') no-repeat center / contain`;
                                backLogo.style.background = `url('./assets/images/discover.svg') no-repeat center / contain`;
                                //frontLogo.textContent = 'Discover';
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
        const formCardNameBlock = new CreateElement_1.CreateElement({ tag: 'div', className: 'form__block_name' }).getnode();
        const formCardNamePlaceholder = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'form__placeholder',
            content: 'Card holder',
        }).getnode();
        const formCardNameInput = new CreateTextInput_1.CreateTextInput({
            type: 'text',
            name: 'card-holder',
            className: 'form__input_long',
            required: true,
        }).getnode();
        formCardNameInput.addEventListener('input', () => {
            nameText.textContent = formCardNameInput.value.toUpperCase();
        });
        formCardNameBlock.append(formCardNamePlaceholder, formCardNameInput);
        const formCardOtherBlock = new CreateElement_1.CreateElement({ tag: 'div', className: 'form__block_other' }).getnode();
        const formCardExpirationBlock = new CreateElement_1.CreateElement({ tag: 'div', className: 'form__block-half' }).getnode();
        const formCardExpirationPlaceholder = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'form__placeholder',
            content: 'Expiration date',
        }).getnode();
        const formCardMonth = new CreateElement_1.CreateElement({ tag: 'div', className: 'form__input', id: 'month-input' }).getnode();
        const MonthSelect = new CreateElement_1.CreateElement({ tag: 'select', className: 'form__select' }).getnode();
        const monthOption = new CreateElement_1.CreateElement({ tag: 'option' }).getnode();
        MonthSelect.append(monthOption);
        for (let i = 1; i < 13; i++) {
            const value = i.toString().padStart(2, '0');
            const option = new CreateElement_1.CreateElement({ tag: 'option', content: value }).getnode();
            MonthSelect.append(option);
        }
        formCardMonth.append(MonthSelect);
        const formCardYear = new CreateElement_1.CreateElement({ tag: 'div', className: 'form__input' }).getnode();
        const YearSelect = new CreateElement_1.CreateElement({ tag: 'select', className: 'form__select' }).getnode();
        const yearOption = new CreateElement_1.CreateElement({ tag: 'option' }).getnode();
        YearSelect.append(yearOption);
        for (let i = 2022; i < 2031; i++) {
            const value = i.toString();
            const option = new CreateElement_1.CreateElement({ tag: 'option', content: value }).getnode();
            YearSelect.append(option);
        }
        formCardYear.append(YearSelect);
        formCardExpirationBlock.append(formCardExpirationPlaceholder, formCardMonth, formCardYear);
        const formCardCcvBlock = new CreateElement_1.CreateElement({ tag: 'div', className: 'form__block-half' }).getnode();
        const formCardCcvPlaceholder = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'form__placeholder',
            id: 'ccv-placeholder',
            content: 'Ccv',
        }).getnode();
        const formCardCcvInput = new CreateTextInput_1.CreateTextInput({
            type: 'text',
            name: 'card-ccv',
            className: 'form__input',
            id: 'card-ccv',
            required: true,
        }).getnode();
        formCardCcvInput.addEventListener('click', () => {
            formCardCcvInput.focus();
            if (!creditCard.classList.contains('hover'))
                creditCard.classList.add('hover');
        });
        form.addEventListener('click', (e) => {
            if (e.target.id !== 'card-ccv') {
                if (creditCard.classList.contains('hover'))
                    creditCard.classList.remove('hover');
            }
        });
        formCardCcvInput.maxLength = 3;
        formCardCcvInput.addEventListener('input', () => {
            const lastchar = formCardCcvInput.value[formCardCcvInput.value.length - 1];
            //console.log(lastchar);
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
        const formCardAddressBlock = new CreateElement_1.CreateElement({ tag: 'div', className: 'form__block_address' }).getnode();
        const formAddressPlaceholder = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'form__placeholder',
            content: 'Shipping address',
        }).getnode();
        const formCardAddressInput = new CreateTextInput_1.CreateTextInput({
            type: 'text',
            name: 'address',
            className: 'form__input_long',
            required: true,
        }).getnode();
        formCardAddressBlock.append(formAddressPlaceholder, formCardAddressInput);
        const formCardContactsBlock = new CreateElement_1.CreateElement({ tag: 'div', className: 'form__block_other' }).getnode();
        const formPhoneBlock = new CreateElement_1.CreateElement({ tag: 'div', className: 'form__block-half' }).getnode();
        const formPhonePlaceholder = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'form__placeholder',
            id: 'phone-placeholder',
            content: 'Phone number',
        }).getnode();
        const formPhoneInput = new CreateTextInput_1.CreateTextInput({
            type: 'tel',
            name: 'phone',
            className: 'form__input_half',
            id: 'phone-input',
            required: true,
        }).getnode();
        formPhoneBlock.append(formPhonePlaceholder, formPhoneInput);
        const formEmailBlock = new CreateElement_1.CreateElement({ tag: 'div', className: 'form__block-half' }).getnode();
        const formEmailPlaceholder = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'form__placeholder',
            id: 'email-placeholder',
            content: 'E-mail',
        }).getnode();
        const formEmailInput = new CreateTextInput_1.CreateTextInput({
            type: 'email',
            name: 'email',
            className: 'form__input_half',
            id: 'email-input',
            required: true,
        }).getnode();
        formEmailBlock.append(formEmailPlaceholder, formEmailInput);
        formCardContactsBlock.append(formPhoneBlock, formEmailBlock);
        //////////////
        const confirmButton = new CreateElement_1.CreateElement({
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
            MY.month = month[0].textContent;
            expirationText.textContent = MY.month + '/' + MY.year;
        });
        YearSelect.addEventListener('change', () => {
            const Year = Array.from(YearSelect.getElementsByTagName('option')).filter((option) => {
                return option.selected;
            });
            MY.year = Year[0].textContent;
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
            if (!/^([.0-9a-zA-Z\-\,]{5,}[\s]){3,}$/.test((formCardAddressInput.value += ' '))) {
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
                CardLength += it.textContent.split('').length;
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
        form.append(formCardNumberBlock, formCardNameBlock, formCardOtherBlock, formCardAddressBlock, formCardContactsBlock, confirmButton);
        this.el.append(creditCard, form);
    }
}
exports.CreateCheckoutPopup = CreateCheckoutPopup;


/***/ }),

/***/ "./src/ts/Components/CreateCartItem.ts":
/*!*********************************************!*\
  !*** ./src/ts/Components/CreateCartItem.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCartItem = void 0;
const CreateElement_1 = __webpack_require__(/*! ../Elements/CreateElement */ "./src/ts/Elements/CreateElement.ts");
const CreateImage_1 = __webpack_require__(/*! ../Elements/CreateImage */ "./src/ts/Elements/CreateImage.ts");
const ApplyRouting_1 = __webpack_require__(/*! ../ApplyRouting */ "./src/ts/ApplyRouting.ts");
const route_1 = __importDefault(__webpack_require__(/*! ../route */ "./src/ts/route.ts"));
class CreateCartItem {
    constructor(limit, page) {
        var _a;
        const router = new route_1.default();
        const tag = document.getElementById('cart-items');
        let ProductsFromLocalStorage = [];
        let counter = 0;
        if (localStorage.getItem('products') !== null && ((_a = localStorage.getItem('products')) === null || _a === void 0 ? void 0 : _a.length) !== 0) {
            ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products'));
            ProductsFromLocalStorage.forEach((data) => {
                const cartItem = new CreateElement_1.CreateElement({ tag: 'div', className: 'cart__item' }).getnode();
                const cartItemBody = new CreateElement_1.CreateElement({ tag: 'div', className: 'cart__item-body' }).getnode();
                const photoBlock = new CreateElement_1.CreateElement({ tag: 'div', className: 'item__photo-block' }).getnode();
                const photo = new CreateImage_1.CreateImage({
                    src: data.images[0],
                    className: 'item__photo',
                    id: `card-${data.id.toString()}`,
                }).getnode();
                photoBlock.append(photo);
                const description = new CreateElement_1.CreateElement({ tag: 'div', className: 'item__description' }).getnode();
                const descriptionTitle = new CreateElement_1.CreateElement({
                    tag: 'div',
                    className: 'item__description-title',
                    content: `${data.model}`,
                    id: `card-${data.id.toString()}`,
                }).getnode();
                const descriptionText = new CreateElement_1.CreateElement({
                    tag: 'div',
                    className: 'item__description-text',
                    content: `${data.description}`,
                }).getnode();
                description.append(descriptionTitle, descriptionText);
                const category = new CreateElement_1.CreateElement({
                    tag: 'div',
                    className: 'item__category',
                    content: `${data.category}`,
                }).getnode();
                const quantityContainer = new CreateElement_1.CreateElement({ tag: 'div', className: 'item__quantity' }).getnode();
                const quantityCounter = new CreateElement_1.CreateElement({
                    tag: 'span',
                    className: 'item__quantity-counter',
                    content: data.counter.toString(),
                }).getnode();
                const quantityButtonLess = new CreateElement_1.CreateElement({
                    tag: 'span',
                    className: 'item__quantity-button item__less',
                    content: '-',
                }).getnode();
                const quantityButtonMore = new CreateElement_1.CreateElement({
                    tag: 'span',
                    className: 'item__quantity-button item__more',
                    content: '+',
                }).getnode();
                quantityContainer.append(quantityButtonLess, quantityCounter, quantityButtonMore);
                const price = new CreateElement_1.CreateElement({
                    tag: 'div',
                    className: 'item__price',
                    content: '$ ' + data.price * data.counter,
                }).getnode();
                cartItemBody.append(photoBlock, description, category, quantityContainer, price);
                const cartItemdelete = new CreateElement_1.CreateElement({ tag: 'div', className: 'cart__item-delete' }).getnode();
                const icon = new CreateElement_1.CreateElement({ tag: 'span', className: 'cart__cross-icon' }).getnode();
                cartItemdelete.append(icon);
                cartItem.append(cartItemBody, cartItemdelete);
                cartItem.style.display = 'none';
                //console.log(counter)
                if (counter < limit * page && counter > limit * page - limit - 1) {
                    cartItem.style.display = 'flex';
                }
                counter += 1;
                tag.append(cartItem);
                router.AddRoutingToCard(photo);
                router.AddRoutingToCard(descriptionTitle);
                quantityButtonMore.addEventListener('click', () => {
                    ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products'));
                    ProductsFromLocalStorage.forEach((item) => {
                        if (item.id === data.id) {
                            item.counter += 1;
                            localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
                            quantityCounter.textContent = item.counter.toString();
                            price.textContent = `$ ${item.price * item.counter}`;
                        }
                    });
                    this.currentData(ProductsFromLocalStorage);
                });
                quantityButtonLess.addEventListener('click', () => {
                    let counter = 0;
                    ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products'));
                    ProductsFromLocalStorage.forEach((item) => {
                        if (data.id === item.id) {
                            if (item.counter > 1) {
                                item.counter -= 1;
                                localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
                                quantityCounter.textContent = item.counter.toString();
                                price.textContent = `$ ${item.price * item.counter}`;
                            }
                            else {
                                item.counter -= 1;
                                let index = 0;
                                ProductsFromLocalStorage.forEach((it, ind) => {
                                    if (it.id === item.id) {
                                        index = ind;
                                    }
                                });
                                ProductsFromLocalStorage.splice(index, 1);
                                localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
                                cartItem.remove();
                            }
                            counter = item.counter;
                        }
                    });
                    if (counter >= 1) {
                        this.currentData(ProductsFromLocalStorage);
                    }
                    else {
                        this.currentData(ProductsFromLocalStorage);
                        new ApplyRouting_1.ApplyRouting().init('#basket');
                    }
                });
                cartItemdelete.addEventListener('click', () => {
                    ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products'));
                    let index = 0;
                    ProductsFromLocalStorage.forEach((it, ind) => {
                        if (it.id === data.id) {
                            index = ind;
                        }
                    });
                    ProductsFromLocalStorage.splice(index, 1);
                    localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
                    cartItem.remove();
                    this.currentData(ProductsFromLocalStorage);
                    new ApplyRouting_1.ApplyRouting().init('#basket');
                });
            });
        }
        //ProductsFromLocalStorage.forEach();
        //this.ListOfDisplay(limit);
    }
    currentData(data) {
        let sale = 0;
        if (window.localStorage.getItem('balaxon') !== null) {
            sale += 0.1;
        }
        if (window.localStorage.getItem('enayaame') !== null) {
            sale += 0.1;
        }
        let counter = 0;
        let totalprice = 0;
        const counterBasket = document.getElementById('counter-basket');
        const allPriceBasket = document.getElementById('all-price-basket');
        const summaryTotal = document.getElementById('summary-total');
        const subTotal = document.getElementById('subtotal-price');
        const summaryprice = document.getElementById('summary-price');
        data.forEach((item) => {
            counter += item.counter;
            totalprice += item.counter * item.price;
        });
        counterBasket.textContent = counter.toString();
        allPriceBasket.textContent = '$ ' + totalprice.toString();
        if (sale === 0) {
            subTotal.textContent = '$ ' + totalprice.toString();
            summaryTotal.textContent = '$ ' + (totalprice + 20).toString();
        }
        else {
            subTotal.textContent = '$ ' + totalprice;
            summaryprice.textContent = '$ ' + (totalprice - totalprice * sale);
            summaryTotal.textContent = '$ ' + (totalprice - totalprice * sale + 20);
        }
    }
}
exports.CreateCartItem = CreateCartItem;


/***/ }),

/***/ "./src/ts/Components/CreateRangeBlock.ts":
/*!***********************************************!*\
  !*** ./src/ts/Components/CreateRangeBlock.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRangeBlock = void 0;
const CreateElement_1 = __webpack_require__(/*! ../Elements/CreateElement */ "./src/ts/Elements/CreateElement.ts");
const CreateRange_1 = __webpack_require__(/*! ../Elements/CreateRange */ "./src/ts/Elements/CreateRange.ts");
class CreateRangeBlock extends CreateElement_1.CreateElement {
    constructor({ title, from, to, range1Min, range1Max, range1Value, range2Min, range2Max, range2Value, isPrice, id, router, current, }) {
        super({ tag: 'div', className: 'aside__range range-menu' });
        this.title = new CreateElement_1.CreateElement({ tag: 'h2', className: 'range-menu__title', content: title }).getnode();
        this.nums = new CreateElement_1.CreateElement({ tag: 'div', className: 'range-menu__numbers' }).getnode();
        this.from = new CreateElement_1.CreateElement({ tag: 'span', className: 'range-menu__from', content: from }).getnode();
        this.to = new CreateElement_1.CreateElement({ tag: 'span', className: 'range-menu__to', content: to }).getnode();
        this.nums.append(this.from, this.to);
        this.rangeBlock = new CreateElement_1.CreateElement({ tag: 'div', className: 'range-menu__range' }).getnode();
        this.rangeLine = new CreateElement_1.CreateElement({ tag: 'div', className: 'range-menu__tracker' }).getnode();
        if (range1Value === '16') {
            range1Value = current.min;
        }
        if (range2Value === '1559') {
            range2Value = current.max;
        }
        if (range1Value === '2013') {
            range1Value = current.min;
        }
        if (range2Value === '2022') {
            range2Value = current.max;
        }
        this.range1 = new CreateRange_1.CreateRange({
            type: 'range',
            min: range1Min,
            max: range1Max,
            value: range1Value,
            id: `${id}-1`,
            className: 'range-menu__slider',
        }).getnode();
        //console.log('CRB');
        this.range2 = new CreateRange_1.CreateRange({
            type: 'range',
            min: range2Min,
            max: range2Max,
            value: range2Value,
            id: `${id}-2`,
            className: 'range-menu__slider',
        }).getnode();
        this.rangeBlock.append(this.rangeLine, this.range1, this.range2);
        this.el.append(this.title, this.nums, this.rangeBlock);
        if (isPrice) {
            this.from.textContent = '$ ' + this.range1.value;
            this.to.textContent = '$ ' + this.range2.value;
        }
        else {
            this.from.textContent = this.range1.value;
            this.to.textContent = this.range2.value;
        }
        ////////////////////// функционал //////////////////////
        const dis = +this.range1.max - +this.range1.min;
        const step = 100 / (+this.range1.max - +this.range1.min);
        const percent1 = (dis - (+this.range1.max - +this.range1.value)) * step;
        const percent2 = (dis - (+this.range1.max - +this.range2.value)) * step;
        this.rangeLine.style.background = `linear-gradient(to right, rgba(105, 0, 31, 0.08) ${percent1}% , #69001F ${percent1}% , #69001F ${percent2}%, rgba(105, 0, 31, 0.08) ${percent2}%)`;
        //console.log(this.range1.value);
        this.range1.addEventListener('input', () => {
            //console.log(this.range1.value);
            if (parseInt(this.range2.value) - parseInt(this.range1.value) <= 0) {
                this.range1.value = String(parseInt(this.range2.value) - 0);
            }
            if (isPrice) {
                this.from.textContent = '$ ' + this.range1.value;
            }
            else {
                this.from.textContent = this.range1.value;
            }
            const dis = +this.range1.max - +this.range1.min;
            const step = 100 / (+this.range1.max - +this.range1.min);
            const percent1 = (dis - (+this.range1.max - +this.range1.value)) * step;
            const percent2 = (dis - (+this.range1.max - +this.range2.value)) * step;
            this.rangeLine.style.background = `linear-gradient(to right, rgba(105, 0, 31, 0.08) ${percent1}% , #69001F ${percent1}% , #69001F ${percent2}%, rgba(105, 0, 31, 0.08) ${percent2}%)`;
        });
        this.range1.addEventListener('mouseup', () => {
            if (id === 'price-slider') {
                router.AddRoutingToPriceMin(this.range1.value);
                router.AddRoutingToPriceMax(this.range2.value);
            }
            else {
                router.AddRoutingToYearMin(this.range1.value);
                router.AddRoutingToYearMax(this.range2.value);
            }
        });
        this.range2.addEventListener('input', () => {
            if (parseInt(this.range2.value) - parseInt(this.range1.value) <= 0) {
                this.range2.value = String(parseInt(this.range1.value) + 0);
            }
            if (isPrice) {
                this.to.textContent = '$ ' + this.range2.value;
            }
            else {
                this.to.textContent = this.range2.value;
            }
            const dis = +this.range1.max - +this.range1.min;
            const step = 100 / (+this.range1.max - +this.range1.min);
            const percent1 = (dis - (+this.range1.max - +this.range1.value)) * step;
            const percent2 = (dis - (+this.range1.max - +this.range2.value)) * step;
            this.rangeLine.style.background = `linear-gradient(to right, rgba(105, 0, 31, 0.08) ${percent1}% , #69001F ${percent1}% , #69001F ${percent2}%, rgba(105, 0, 31, 0.08) ${percent2}%)`;
        });
        this.range2.addEventListener('mouseup', () => {
            if (id === 'price-slider') {
                router.AddRoutingToPriceMin(this.range1.value);
                router.AddRoutingToPriceMax(this.range2.value);
            }
            else {
                router.AddRoutingToYearMin(this.range1.value);
                router.AddRoutingToYearMax(this.range2.value);
            }
        });
    }
}
exports.CreateRangeBlock = CreateRangeBlock;


/***/ }),

/***/ "./src/ts/Components/CreateSearchBar.ts":
/*!**********************************************!*\
  !*** ./src/ts/Components/CreateSearchBar.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSearchBar = void 0;
const CreateElement_1 = __webpack_require__(/*! ../Elements/CreateElement */ "./src/ts/Elements/CreateElement.ts");
const CreateImage_1 = __webpack_require__(/*! ../Elements/CreateImage */ "./src/ts/Elements/CreateImage.ts");
const CreateTextInput_1 = __webpack_require__(/*! ../Elements/CreateTextInput */ "./src/ts/Elements/CreateTextInput.ts");
class CreateSearchBar extends CreateElement_1.CreateElement {
    constructor({ router, filter }) {
        super({ tag: 'div', className: 'search' });
        this.input = new CreateTextInput_1.CreateTextInput({
            type: 'text',
            placeholder: 'Search product',
            name: 'search',
            className: 'search__text',
        }).getnode();
        this.button = new CreateElement_1.CreateElement({ tag: 'button', className: 'search__button' }).getnode();
        this.icon = new CreateImage_1.CreateImage({
            src: './assets/images/search.png',
            alt: 'search',
            className: 'search__icon',
        }).getnode();
        this.input.value = filter;
        this.button.addEventListener('click', () => {
            //console.log(router);
            if (router) {
                router.AddRoutingToSearch(this.input.value);
            }
        });
        this.button.append(this.icon);
        this.el.append(this.input, this.button);
    }
}
exports.CreateSearchBar = CreateSearchBar;


/***/ }),

/***/ "./src/ts/Components/CreateSortMenu.ts":
/*!*********************************************!*\
  !*** ./src/ts/Components/CreateSortMenu.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSortMenu = void 0;
const CreateElement_1 = __webpack_require__(/*! ../Elements/CreateElement */ "./src/ts/Elements/CreateElement.ts");
const CreateRadio_1 = __webpack_require__(/*! ../Elements/CreateRadio */ "./src/ts/Elements/CreateRadio.ts");
class CreateSortMenu extends CreateElement_1.CreateElement {
    constructor({ router, filter }) {
        super({ tag: 'div', className: 'sort-menu' });
        this.sortmenu = [
            ['Rating', 'Rating'],
            ['PriceTH', 'Price (low to high)'],
            ['PriceTL', 'Price (high to low)'],
            ['RD', 'Release Date'],
        ];
        this.sortmenu.forEach((it) => {
            if (filter === it[0]) {
                filter = it[1];
            }
        });
        this.container = new CreateElement_1.CreateElement({ tag: 'div', className: 'select-box' }).getnode();
        this.options = new CreateElement_1.CreateElement({ tag: 'div', className: 'options-container' }).getnode();
        this.selected = new CreateElement_1.CreateElement({ tag: 'div', className: 'selected', id: 'selected', content: filter }).getnode();
        this.container.append(this.options, this.selected);
        this.sortmenu.forEach((item) => {
            this.option = new CreateElement_1.CreateElement({ tag: 'div', className: 'option' }).getnode();
            this.input = new CreateRadio_1.CreateRadio({
                type: 'radio',
                className: 'radio',
                id: item[0],
                name: 'sort',
                value: item[1],
            }).getnode();
            this.option.append(this.input[0], this.input[1]);
            this.options.append(this.option);
            this.input[0].addEventListener('click', () => {
                if (router) {
                    router.AddRoutingToSort(item[0]);
                }
                //this.selected.innerHTML = item[1];
                this.options.classList.remove('active');
            });
        });
        this.el.append(this.container);
        this.selected.addEventListener('click', () => {
            this.options.classList.toggle('active');
        });
    }
}
exports.CreateSortMenu = CreateSortMenu;


/***/ }),

/***/ "./src/ts/CreateListOfCards.ts":
/*!*************************************!*\
  !*** ./src/ts/CreateListOfCards.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateListOfCards = void 0;
const CreateElement_1 = __webpack_require__(/*! ./Elements/CreateElement */ "./src/ts/Elements/CreateElement.ts");
const route_1 = __importDefault(__webpack_require__(/*! ./route */ "./src/ts/route.ts"));
class CreateListOfCards {
    constructor(SortData) {
        const router = new route_1.default();
        SortData.forEach((item) => {
            const CardBox = new CreateElement_1.CreateElement({
                tag: 'div',
                className: 'card__box',
                id: `card-${item.id.toString()}`,
                BackgroundImg: item.images[0],
            }).getnode();
            router.AddRoutingToCard(CardBox);
            const CardModel = new CreateElement_1.CreateElement({ tag: 'h2', className: 'card__model', content: item.model }).getnode();
            const CardPrice = new CreateElement_1.CreateElement({
                tag: 'h2',
                className: 'card__price',
                content: `${item.price.toString()} $`,
            }).getnode();
            const CardAddtoCart = new CreateElement_1.CreateElement({ tag: 'div', className: 'card__add-to-cart' }).getnode();
            CardBox.append(CardModel, CardPrice, CardAddtoCart);
            if (localStorage.getItem('products') !== null) {
                const cards = JSON.parse(localStorage.getItem('products'));
                cards.forEach((it) => {
                    if (it.id === item.id) {
                        CardAddtoCart.classList.toggle('_product-added');
                    }
                });
            }
            document.getElementById('store__products').append(CardBox);
            CardAddtoCart.addEventListener('click', () => {
                //ProductsToLocalStorage.push(item);
                let totalprice = 0;
                let counter = 0;
                let ProductsFromLocalStorage = [];
                if (CardAddtoCart.classList.contains('_product-added')) {
                    ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products'));
                    let index = 0;
                    ProductsFromLocalStorage.forEach((it, ind) => {
                        if (it.id === item.id) {
                            index = ind;
                        }
                    });
                    ProductsFromLocalStorage.splice(index, 1);
                    localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
                }
                else {
                    if (localStorage.getItem('products') !== null) {
                        ProductsFromLocalStorage = JSON.parse(localStorage.getItem('products'));
                        ProductsFromLocalStorage.push(item);
                        localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
                    }
                    else {
                        ProductsFromLocalStorage.push(item);
                        localStorage.setItem('products', JSON.stringify(ProductsFromLocalStorage));
                    }
                }
                CardAddtoCart.classList.toggle('_product-added');
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
                    cartQuantity.textContent = cc.toString();
                    cartQuantity.style.visibility = 'visible';
                    cartQuantity.style.opacity = '1';
                    AllPriceBasket.style.display = 'block';
                    basket.style.display = 'none';
                    AllPriceBasket.textContent = '$ ' + totalprice.toString();
                }
                else {
                    cartQuantity.style.visibility = 'hidden';
                    cartQuantity.style.opacity = '0';
                    AllPriceBasket.style.display = 'none';
                    basket.style.display = 'block';
                }
                //localStorage.setItem('')
            });
            document.getElementById('store__optionBlock1').addEventListener('click', () => {
                if (document.getElementById('view1').checked) {
                    if (CardBox.classList.contains('_small-view')) {
                        CardBox.classList.remove('_small-view');
                    }
                }
            });
            document.getElementById('store__optionBlock2').addEventListener('click', () => {
                if (document.getElementById('view2').checked) {
                    CardBox.classList.add('_small-view');
                }
            });
        });
    }
}
exports.CreateListOfCards = CreateListOfCards;


/***/ }),

/***/ "./src/ts/DefaultPage.ts":
/*!*******************************!*\
  !*** ./src/ts/DefaultPage.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


////////////////////////////////////   IMPORTS   ////////////////////////////////////
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const CreateRangeBlock_1 = __webpack_require__(/*! ./Components/CreateRangeBlock */ "./src/ts/Components/CreateRangeBlock.ts");
const CreateSortMenu_1 = __webpack_require__(/*! ./Components/CreateSortMenu */ "./src/ts/Components/CreateSortMenu.ts");
const CreateCheckbox_1 = __webpack_require__(/*! ./Elements/CreateCheckbox */ "./src/ts/Elements/CreateCheckbox.ts");
const CreateElement_1 = __webpack_require__(/*! ./Elements/CreateElement */ "./src/ts/Elements/CreateElement.ts");
const CreateImage_1 = __webpack_require__(/*! ./Elements/CreateImage */ "./src/ts/Elements/CreateImage.ts");
const data_1 = __importDefault(__webpack_require__(/*! ./data */ "./src/ts/data.ts"));
const route_1 = __importDefault(__webpack_require__(/*! ./route */ "./src/ts/route.ts"));
const CreateSearchBar_1 = __webpack_require__(/*! ./Components/CreateSearchBar */ "./src/ts/Components/CreateSearchBar.ts");
const CreateRadio_1 = __webpack_require__(/*! ./Elements/CreateRadio */ "./src/ts/Elements/CreateRadio.ts");
const CreateLink_1 = __webpack_require__(/*! ./Elements/CreateLink */ "./src/ts/Elements/CreateLink.ts");
class CreateDefaultPage {
    constructor() {
        // переменная которая хранит body
        this.body = document.body;
        // Роутер
        this.router = new route_1.default();
    }
    // метод создает header
    CreateHeader() {
        // создаем header, передаем в конструктор не все возможные аргументы, но он не ругается
        const header = new CreateElement_1.CreateElement({ tag: 'header', className: 'header' }).getnode();
        const wrapper = new CreateElement_1.CreateElement({ tag: 'div', className: 'wrapper header__wrapper' }).getnode();
        const textBlock = new CreateElement_1.CreateElement({ tag: 'div', className: 'header__text' }).getnode();
        const cartBlock = new CreateElement_1.CreateElement({ tag: 'div', className: 'header__cart' }).getnode();
        this.body.append(header);
        header.append(wrapper);
        wrapper.append(textBlock, cartBlock);
        const h1 = new CreateElement_1.CreateElement({ tag: 'h1', className: 'h1', content: 'Online Store' }).getnode();
        this.router.AddRoutingToHeader(h1);
        const subtitle = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'header__subtitle',
            content: 'best products, best sales, best service',
        }).getnode();
        textBlock.append(h1, subtitle);
        const cart = new CreateElement_1.CreateElement({ tag: 'div', className: 'cart', id: 'basket' }).getnode();
        this.router.AddRoutingToBasket(cart);
        cartBlock.append(cart);
        const cartIcon = new CreateImage_1.CreateImage({
            src: './assets/images/cart.svg',
            className: 'cart__icon',
            alt: 'cart icon',
            id: 'basket-img',
        }).getnode();
        const cartTotal = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'cart__total',
            id: 'all-price-basket',
            content: '10000$',
        }).getnode();
        const cartQuantity = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'cart__quantity',
            id: 'counter-basket',
            content: '1',
        }).getnode();
        if (localStorage.getItem('products') !== null) {
            const DataFromLocal = JSON.parse(localStorage.getItem('products'));
            if (DataFromLocal.length !== 0) {
                let cc = 0;
                let totalprice = 0;
                DataFromLocal.forEach((item) => {
                    cc += item.counter;
                    totalprice += item.price * item.counter;
                });
                cartQuantity.textContent = cc.toString();
                cartQuantity.style.visibility = 'visible';
                cartQuantity.style.opacity = '1';
                cartTotal.textContent = '$ ' + totalprice.toString();
                cartTotal.style.display = 'block';
                cartIcon.style.display = 'none';
                //cartQuantity.classList.add('cart__quantity_visible');
            }
        }
        cart.append(cartIcon, cartTotal, cartQuantity);
    }
    // метод для main
    CreateMain(filters, ProductsCards) {
        this.router.GetFilters(filters);
        const product = new data_1.default();
        const main = new CreateElement_1.CreateElement({ tag: 'main', className: 'main' }).getnode();
        this.body.append(main);
        const wrapper = new CreateElement_1.CreateElement({ tag: 'div', className: 'wrapper main__wrapper' }).getnode();
        main.append(wrapper);
        // CreateAside
        const aside = new CreateElement_1.CreateElement({ tag: 'aside', className: 'aside' }).getnode();
        wrapper.append(aside);
        const buttonTop = new CreateElement_1.CreateElement({
            tag: 'button',
            className: 'button aside__button',
            content: 'Reset',
        }).getnode();
        this.router.AddRoutingToHeader(buttonTop);
        const categories = new CreateElement_1.CreateElement({ tag: 'div', className: 'aside__choice choice-menu' }).getnode();
        const brands = new CreateElement_1.CreateElement({ tag: 'div', className: 'aside__choice choice-menu' }).getnode();
        const CurrentPrice = product.GetCurrentMinMaxPrice(ProductsCards);
        const MaxMinPrices = product.GetMinMaxPrice();
        const prises = new CreateRangeBlock_1.CreateRangeBlock({
            title: 'Prises',
            from: `$ ${filters.MinPrice}`,
            to: `$ ${filters.MaxPrice}`,
            range1Min: MaxMinPrices.min,
            range1Max: MaxMinPrices.max,
            range1Value: filters.MinPrice,
            range2Min: MaxMinPrices.min,
            range2Max: MaxMinPrices.max,
            range2Value: filters.MaxPrice,
            isPrice: true,
            id: 'price-slider',
            router: this.router,
            filters: filters,
            current: CurrentPrice,
        }).getnode();
        const CurrentDate = product.GetCurrentMinMaxDate(ProductsCards);
        const MaxMinDate = product.GetMinMaxDate();
        const year = new CreateRangeBlock_1.CreateRangeBlock({
            title: 'Release date',
            from: filters.MinYear,
            to: filters.MaxYear,
            range1Min: MaxMinDate.min,
            range1Max: MaxMinDate.max,
            range1Value: filters.MinYear,
            range2Min: MaxMinDate.min,
            range2Max: MaxMinDate.max,
            range2Value: filters.MaxYear,
            isPrice: false,
            id: 'year-slider',
            router: this.router,
            filters: filters,
            current: CurrentDate,
        }).getnode();
        const buttonBottom = new CreateElement_1.CreateElement({
            tag: 'button',
            className: 'button aside__button',
            content: 'Copy search link',
        }).getnode();
        buttonBottom.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href);
        });
        aside.append(buttonTop, categories, brands, prises, year, buttonBottom);
        const categoriesTitle = new CreateElement_1.CreateElement({
            tag: 'h2',
            className: 'choice-menu__title',
            content: 'Category',
        }).getnode();
        categories.append(categoriesTitle);
        const ListCategories = product.GetCategories(ProductsCards);
        //const ListOfCurrentCategories = product.GetCurrentCategories(ProductsCards);
        ListCategories.forEach((item) => {
            const current = new CreateCheckbox_1.CreateCheckbox({
                type: 'checkbox',
                name: 'Category',
                id: item.category,
                value: item.category,
                className: 'choice-menu__option',
                Count: item.count,
                Current: item.CurrentCategory,
                filters: filters.Category,
            }).getnode();
            this.router.AddRoutingToCategory(current[0]);
            categories.append(current[0], current[1]);
        });
        const brandsTitle = new CreateElement_1.CreateElement({ tag: 'h2', className: 'choice-menu__title', content: 'Brand' }).getnode();
        brands.append(brandsTitle);
        const ListBrands = product.GetBrands(ProductsCards);
        ListBrands.forEach((item) => {
            const current = new CreateCheckbox_1.CreateCheckbox({
                type: 'checkbox',
                name: 'Category',
                id: item.brand,
                value: item.brand,
                className: 'choice-menu__option',
                Count: item.count,
                Current: item.CurrentBrand,
                filters: filters.Brand,
            }).getnode();
            this.router.AddRoutingToBrand(current[0]);
            brands.append(current[0], current[1]);
        });
        // CreateStore
        const store = new CreateElement_1.CreateElement({ tag: 'div', className: 'store' }).getnode();
        wrapper.append(store);
        const menu = new CreateElement_1.CreateElement({ tag: 'div', className: 'store__menu' }).getnode();
        /////  menu
        const viewOptions = new CreateElement_1.CreateElement({ tag: 'div', className: 'store__view' }).getnode();
        const viewBlock1 = new CreateElement_1.CreateElement({
            tag: 'div',
            className: 'store__optionBlock1',
            id: 'store__optionBlock1',
        }).getnode();
        const view1 = new CreateRadio_1.CreateRadio({
            type: 'radio',
            value: '',
            id: 'view1',
            name: 'view',
            className: 'view-option1',
            checked: true,
        }).getnode();
        viewBlock1.append(view1[0], view1[1]);
        const view2 = new CreateRadio_1.CreateRadio({
            type: 'radio',
            value: '',
            id: 'view2',
            name: 'view',
            className: 'view-option2',
        }).getnode();
        const viewBlock2 = new CreateElement_1.CreateElement({
            tag: 'div',
            className: 'store__optionBlock2',
            id: 'store__optionBlock2',
        }).getnode();
        viewBlock2.append(view2[0], view2[1]);
        viewOptions.append(viewBlock1, viewBlock2);
        ///////
        const foundProducts = new CreateElement_1.CreateElement({
            tag: 'div',
            className: 'store__quantity',
            content: 'Found : ',
        }).getnode();
        const productsAmmount = new CreateElement_1.CreateElement({
            tag: 'span',
            className: 'store__quantity-found',
            content: ProductsCards.length.toString(),
        }).getnode();
        foundProducts.append(productsAmmount);
        const sortMenu = new CreateSortMenu_1.CreateSortMenu({
            tag: 'div',
            className: 'sort-menu',
            router: this.router,
            filter: filters.Sort,
        }).getnode();
        const searchBar = new CreateSearchBar_1.CreateSearchBar({
            tag: 'div',
            className: 'search',
            router: this.router,
            filter: filters.Search,
        }).getnode();
        menu.append(viewOptions, foundProducts, searchBar, sortMenu);
        ///// products
        const products = new CreateElement_1.CreateElement({ tag: 'div', className: 'store__products', id: 'store__products' }).getnode();
        store.append(menu, products);
    }
    // метод для footer
    CreateFooter() {
        const footer = new CreateElement_1.CreateElement({ tag: 'footer', className: 'footer' }).getnode();
        const wrapper = new CreateElement_1.CreateElement({ tag: 'div', className: 'wrapper footer__wrapper' }).getnode();
        footer.append(wrapper);
        this.body.append(footer);
        const cartBlock = new CreateElement_1.CreateElement({ tag: 'div', className: 'footer__cart' }).getnode();
        const footerCart = new CreateLink_1.CreateLink({
            href: 'https://rs.school/js/',
            target: '_blank',
            className: 'footer__cart_light',
        }).getnode();
        const footerIcon = new CreateImage_1.CreateImage({
            src: './assets/images/logo_rs_text.svg',
            alt: 'RS School',
            className: 'footer__logo',
        }).getnode();
        const references = new CreateElement_1.CreateElement({ tag: 'div', className: 'footer__references' }).getnode();
        const year = new CreateElement_1.CreateElement({ tag: 'span', className: 'footer__year', content: '2022' }).getnode();
        const SashaLink = new CreateLink_1.CreateLink({
            href: 'https://github.com/balaxon',
            target: '_blank',
            className: 'footer__SashaGit',
            content: 'balaxon',
        }).getnode();
        const NataLink = new CreateLink_1.CreateLink({
            href: 'https://github.com/EnayaAme',
            target: '_blank',
            className: 'footer__NataGit',
            content: 'EnayaAme',
        }).getnode();
        references.append(SashaLink, NataLink, year);
        footerCart.append(footerIcon);
        cartBlock.append(footerCart);
        wrapper.append(cartBlock, references);
    }
}
// const Page = new CreateDefaultPage();
// Page.CreateHeader();
// Page.CreateMain();
// Page.CreateFooter();
exports["default"] = CreateDefaultPage;


/***/ }),

/***/ "./src/ts/Elements/CreateCheckbox.ts":
/*!*******************************************!*\
  !*** ./src/ts/Elements/CreateCheckbox.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCheckbox = void 0;
class CreateCheckbox {
    constructor({ type, name, id, value, className, Count, Current, filters }) {
        this.input = document.createElement('input');
        this.input.type = type;
        this.input.name = name;
        this.input.id = id;
        this.input.value = value;
        filters === null || filters === void 0 ? void 0 : filters.forEach((item) => {
            if (item === value) {
                this.input.checked = true;
            }
        });
        if (className) {
            this.input.classList.add(className);
        }
        this.label = document.createElement('label');
        this.label.htmlFor = id;
        this.label.textContent = value;
        const quantity = document.createElement('span');
        quantity.textContent = `  (${Current}/${Count})`;
        this.label.append(quantity);
    }
    getnode() {
        const arr = [this.input, this.label];
        return arr;
    }
}
exports.CreateCheckbox = CreateCheckbox;


/***/ }),

/***/ "./src/ts/Elements/CreateElement.ts":
/*!******************************************!*\
  !*** ./src/ts/Elements/CreateElement.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateElement = void 0;
class CreateElement {
    constructor({ tag, id, className, content, BackgroundImg }) {
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
exports.CreateElement = CreateElement;


/***/ }),

/***/ "./src/ts/Elements/CreateImage.ts":
/*!****************************************!*\
  !*** ./src/ts/Elements/CreateImage.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateImage = void 0;
class CreateImage {
    constructor({ src, id, className, alt }) {
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
exports.CreateImage = CreateImage;


/***/ }),

/***/ "./src/ts/Elements/CreateLink.ts":
/*!***************************************!*\
  !*** ./src/ts/Elements/CreateLink.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateLink = void 0;
class CreateLink {
    constructor({ href, id, className, target, content }) {
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
exports.CreateLink = CreateLink;


/***/ }),

/***/ "./src/ts/Elements/CreateNumberInput.ts":
/*!**********************************************!*\
  !*** ./src/ts/Elements/CreateNumberInput.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateNumberInput = void 0;
class CreateNumberInput {
    constructor({ type, value, id, className, placeholder, required }) {
        this.input = document.createElement('input');
        this.input.type = type;
        if (value) {
            this.input.value = value;
        }
        if (id) {
            this.input.id = id;
        }
        if (className) {
            this.input.classList.add(className);
        }
        if (placeholder) {
            this.input.placeholder = placeholder;
        }
        if (required) {
            this.input.required = true;
        }
    }
    getnode() {
        return this.input;
    }
}
exports.CreateNumberInput = CreateNumberInput;


/***/ }),

/***/ "./src/ts/Elements/CreateRadio.ts":
/*!****************************************!*\
  !*** ./src/ts/Elements/CreateRadio.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRadio = void 0;
class CreateRadio {
    constructor({ type, value, id, name, className, checked }) {
        this.label = document.createElement('label');
        this.label.htmlFor = id;
        this.label.textContent = value;
        this.input = document.createElement('input');
        this.input.type = type;
        this.input.name = name;
        this.input.id = id;
        if (className) {
            this.input.classList.add(className);
        }
        if (checked) {
            this.input.checked = checked;
        }
    }
    getnode() {
        const arr = [this.input, this.label];
        return arr;
    }
}
exports.CreateRadio = CreateRadio;


/***/ }),

/***/ "./src/ts/Elements/CreateRange.ts":
/*!****************************************!*\
  !*** ./src/ts/Elements/CreateRange.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRange = void 0;
class CreateRange {
    constructor({ type, min, max, value, id, className }) {
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
exports.CreateRange = CreateRange;


/***/ }),

/***/ "./src/ts/Elements/CreateTextInput.ts":
/*!********************************************!*\
  !*** ./src/ts/Elements/CreateTextInput.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTextInput = void 0;
class CreateTextInput {
    constructor({ type, placeholder, name, className, id, required }) {
        this.input = document.createElement('input');
        this.input.type = type;
        this.input.name = name;
        if (placeholder) {
            this.input.placeholder = placeholder;
        }
        if (className) {
            this.input.classList.add(className);
        }
        if (required) {
            this.input.required = true;
        }
        if (id) {
            this.input.id = id;
        }
    }
    getnode() {
        return this.input;
    }
}
exports.CreateTextInput = CreateTextInput;


/***/ }),

/***/ "./src/ts/data.ts":
/*!************************!*\
  !*** ./src/ts/data.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const data_json_1 = __importDefault(__webpack_require__(/*! ../assets/files/data.json */ "./src/assets/files/data.json"));
const ApplySort_1 = __webpack_require__(/*! ./ApplySort */ "./src/ts/ApplySort.ts");
class data {
    constructor() {
        this.ListCategories = [];
        this.arr = data_json_1.default;
        this.ListBrands = [];
        this.arr.forEach((item) => {
            if (this.ListCategories.includes(item.category) === false) {
                this.ListCategories.push(item.category);
            }
        });
        this.arr.forEach((item) => {
            if (this.ListBrands.includes(item.brand) === false) {
                this.ListBrands.push(item.brand);
            }
        });
    }
    Get() {
        return data_json_1.default;
    }
    GetCategories(categories) {
        const cat = new ApplySort_1.ApplySort('Sort by', data_json_1.default).return();
        this.ListCategories = [];
        cat.forEach((item) => {
            if (this.ListCategories.includes(item.category) === false) {
                this.ListCategories.push(item.category);
            }
        });
        const ResCategory = [];
        this.ListCategories.forEach((item) => {
            let counter = 0;
            let current = 0;
            this.arr.forEach((it) => {
                if (item === it.category) {
                    counter += 1;
                }
            });
            categories.forEach((it) => {
                if (it.category === item) {
                    current += 1;
                }
            });
            const obj = {
                category: item,
                count: counter,
                CurrentCategory: current,
            };
            ResCategory.push(obj);
        });
        return ResCategory;
    }
    GetBrands(brands) {
        this.ListBrands = [];
        const brand = new ApplySort_1.ApplySort('Sort by', data_json_1.default).return();
        brand.forEach((item) => {
            if (this.ListBrands.includes(item.brand) === false) {
                this.ListBrands.push(item.brand);
            }
        });
        const ResBrands = [];
        this.ListBrands.forEach((item) => {
            let counter = 0;
            let current = 0;
            this.arr.forEach((it) => {
                if (item === it.brand) {
                    counter += 1;
                }
            });
            brands.forEach((it) => {
                if (it.brand === item) {
                    current += 1;
                }
            });
            const obj = {
                brand: item,
                count: counter,
                CurrentBrand: current,
            };
            ResBrands.push(obj);
        });
        return ResBrands;
    }
    GetMinMaxPrice(arr = data_json_1.default) {
        const ListPrice = [];
        arr.forEach((item) => {
            ListPrice.push(item.price);
        });
        const min = Math.min.apply(null, ListPrice);
        const max = Math.max.apply(null, ListPrice);
        const obj = {
            max: max.toString(),
            min: min.toString(),
        };
        return obj;
    }
    GetMinMaxDate(arr = data_json_1.default) {
        const ListDate = [];
        arr.forEach((item) => {
            ListDate.push(item.DateOfIssue);
        });
        const min = Math.min.apply(null, ListDate);
        const max = Math.max.apply(null, ListDate);
        const obj = {
            max: max.toString(),
            min: min.toString(),
        };
        return obj;
    }
    GetById(id) {
        let ObjById;
        data_json_1.default.forEach((item) => {
            if (item.id.toString() === id) {
                ObjById = item;
            }
        });
        return ObjById;
    }
    GetCurrentMinMaxPrice(Price) {
        const AllPrices = [];
        Price.forEach((element) => {
            AllPrices.push(element.price);
        });
        const min = Math.min.apply(null, AllPrices);
        const max = Math.max.apply(null, AllPrices);
        const obj = {
            max: max.toString(),
            min: min.toString(),
        };
        return obj;
    }
    GetCurrentMinMaxDate(Date) {
        const AllDates = [];
        Date.forEach((element) => {
            AllDates.push(element.DateOfIssue);
        });
        const min = Math.min.apply(null, AllDates);
        const max = Math.max.apply(null, AllDates);
        const obj = {
            max: max.toString(),
            min: min.toString(),
        };
        return obj;
    }
}
exports["default"] = data;


/***/ }),

/***/ "./src/ts/route.ts":
/*!*************************!*\
  !*** ./src/ts/route.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const data_1 = __importDefault(__webpack_require__(/*! ./data */ "./src/ts/data.ts"));
class Router {
    constructor() {
        this.products = new data_1.default();
        this.LimitPage = {
            limit: 0,
            page: 0,
        };
        this.filters = {
            Category: [],
            Brand: [],
            MinPrice: this.products.GetMinMaxPrice().min,
            MaxPrice: this.products.GetMinMaxPrice().max,
            MinYear: this.products.GetMinMaxDate().min,
            MaxYear: this.products.GetMinMaxDate().max,
            Search: '',
            Sort: 'Sort by',
        };
        this.body = document.body;
        this.checker = false;
        this.ToPages = false;
        this.isChangePrice = false;
    }
    // constructor(filters: filters) {
    //   this.filters = filters;
    // }
    AddURL(id) {
        if (id.split('-')[0] === '#card') {
            const newurl = `${id}`;
            window.location.hash = newurl;
            this.checker = true;
            this.ToPages = true;
        }
        if (id === '') {
            window.location.hash = '';
            this.checker = true;
        }
        if (id === 'basket') {
            const newurl = `${id}`;
            window.location.hash = newurl;
            this.checker = true;
        }
    }
    AddCategoryFilters(id) {
        this.filters.Category.push(id);
        this.AddFilters();
    }
    AddBrandFilters(id) {
        this.filters.Brand.push(id);
        this.AddFilters();
    }
    AddFilters() {
        if (this.filters.Category.length !== 0 ||
            this.filters.Brand.length !== 0 ||
            this.filters.MinPrice !== this.products.GetMinMaxPrice().min ||
            this.filters.MaxPrice !== this.products.GetMinMaxPrice().max ||
            this.filters.MinYear !== this.products.GetMinMaxDate().min ||
            this.filters.MaxYear !== this.products.GetMinMaxDate().max ||
            this.filters.Search !== '' ||
            this.filters.Sort !== 'Sort by') {
            let newurl = '#?';
            if (this.filters.Category.length !== 0) {
                newurl += 'Category=';
                this.filters.Category.forEach((item) => {
                    newurl += `${item}+`;
                });
                newurl = newurl.slice(0, -1);
            }
            if (this.filters.Brand.length !== 0) {
                if (this.filters.Category.length === 0) {
                    newurl += 'Brand=';
                }
                else {
                    newurl += '&Brand=';
                }
                this.filters.Brand.forEach((item) => {
                    newurl += `${item}+`;
                });
                newurl = newurl.slice(0, -1);
            }
            if (this.filters.MinPrice !== this.products.GetMinMaxPrice().min ||
                this.filters.MaxPrice !== this.products.GetMinMaxPrice().max) {
                if (newurl === '#?') {
                    newurl += `Price=${this.filters.MinPrice}+${this.filters.MaxPrice}`;
                }
                else {
                    newurl += `&Price=${this.filters.MinPrice}+${this.filters.MaxPrice}`;
                }
                this.isChangePrice = true;
            }
            if (this.filters.MinYear !== this.products.GetMinMaxDate().min ||
                this.filters.MaxYear !== this.products.GetMinMaxDate().max) {
                if (newurl === '#?') {
                    newurl += `Date=${this.filters.MinYear}+${this.filters.MaxYear}`;
                }
                else {
                    newurl += `&Date=${this.filters.MinYear}+${this.filters.MaxYear}`;
                }
                this.isChangePrice = true;
            }
            if (this.filters.Search !== '') {
                if (newurl === '#?') {
                    newurl += `Search=${this.filters.Search}`;
                }
                else {
                    newurl += `&Search=${this.filters.Search}`;
                }
            }
            if (this.filters.Sort !== 'Sort by') {
                if (newurl === '#?') {
                    newurl += `Sort=${this.filters.Sort}`;
                }
                else {
                    newurl += `&Sort=${this.filters.Sort}`;
                }
            }
            window.location.hash = newurl;
        }
        else {
            window.location.hash = '';
        }
    }
    RemoveCategoryFilters(id) {
        const index = this.filters.Category.findIndex((element) => {
            return element === id;
        });
        this.filters.Category.splice(index, 1);
        this.AddFilters();
    }
    RemoveBrandFilters(id) {
        const index = this.filters.Brand.findIndex((element) => {
            return element === id;
        });
        this.filters.Brand.splice(index, 1);
        this.AddFilters();
    }
    AddRoutingToCard(tag) {
        tag.onclick = (e) => {
            const target = e.target;
            const id = target.id;
            console.log(id);
            this.AddURL(`#${id}`);
        };
    }
    AddRoutingToHeader(tag) {
        tag.onclick = (e) => {
            const target = e.target;
            const id = target.id;
            this.AddURL(`${id}`);
        };
    }
    AddRoutingToBasket(tag, fromcard) {
        tag.onclick = () => {
            if (fromcard) {
                localStorage.setItem('fromcard', 'true');
            }
            this.AddURL(`basket`);
        };
    }
    AddRoutingInBasket(limit, page) {
        this.LimitPage.limit = limit;
        this.LimitPage.page = page;
        console.log(this.LimitPage);
        let newurl = 'basket';
        if (this.LimitPage.limit > 0) {
            newurl += `!limit=${this.LimitPage.limit}`;
            window.location.hash = newurl;
        }
        if (this.LimitPage.page > 0 && this.LimitPage.page !== 1) {
            if (newurl === 'basket') {
                newurl += `!page=${this.LimitPage.page}`;
            }
            else {
                newurl += `&page=${this.LimitPage.page}`;
            }
            window.location.hash = newurl;
        }
    }
    // AddRoutingToLimit(count: string) {
    //   this.LimitPage.limit = +count;
    //   console.log(this.LimitPage.limit)
    //   this.AddRoutingInBasket();
    // }
    // AddRoutingToPage(count: string) {
    //   this.LimitPage.page = +count;
    //   console.log(this.LimitPage.page)
    //   this.AddRoutingInBasket();
    // }
    AddRoutingToCategory(tag) {
        tag.onclick = (e) => {
            const target = e.target;
            const id = target.id;
            if (tag.checked) {
                this.AddCategoryFilters(id);
            }
            else {
                this.RemoveCategoryFilters(id);
            }
        };
    }
    AddRoutingToBrand(tag) {
        tag.onclick = (e) => {
            const target = e.target;
            const id = target.id;
            if (tag.checked) {
                this.AddBrandFilters(id);
            }
            else {
                this.RemoveBrandFilters(id);
            }
        };
    }
    AddRoutingToPriceMin(MinPrice) {
        this.filters.MinPrice = MinPrice;
        this.AddFilters();
    }
    AddRoutingToPriceMax(MaxPrice) {
        this.filters.MaxPrice = MaxPrice;
        this.AddFilters();
    }
    AddRoutingToYearMin(MinYear) {
        this.filters.MinYear = MinYear;
        this.AddFilters();
    }
    AddRoutingToYearMax(MaxYear) {
        this.filters.MaxYear = MaxYear;
        this.AddFilters();
    }
    AddRoutingToSearch(text) {
        this.filters.Search = text;
        this.AddFilters();
    }
    AddRoutingToSort(id) {
        this.filters.Sort = id;
        this.AddFilters();
    }
    GetFilters(filters) {
        this.filters = filters;
    }
}
exports["default"] = Router;


/***/ }),

/***/ "./src/assets/files/data.json":
/*!************************************!*\
  !*** ./src/assets/files/data.json ***!
  \************************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"id":1,"model":"iPhone 13","description":"Смартфон Apple iPhone 13 128GB (красный)","price":854,"discountPercentage":6,"rating":4.58,"DateOfIssue":2021,"brand":"Apple","category":"Smartphone","images":["https://i-product.by/images/o/apple-iphone-13-128gb-krasnyj_1.jpg","https://i-product.by/images/o/apple-iphone-13-128gb-krasnyj_2.jpg","https://i-product.by/images/o/apple-iphone-13-128gb-krasnyj_3.jpg"],"counter":1},{"id":2,"model":"iPhone 14","description":"Смартфон Apple iPhone 14 Pro 128GB (космический черный)","price":1400,"discountPercentage":6,"rating":4.6,"DateOfIssue":2022,"brand":"Apple","category":"Smartphone","images":["https://i-product.by/images/o/apple-iphone-14-pro-128gb-kosmicheskij-chernyj_1.jpg","https://i-product.by/images/o/apple-iphone-14-pro-128gb-kosmicheskij-chernyj_2.jpg","https://i-product.by/images/o/apple-iphone-14-pro-128gb-kosmicheskij-chernyj_3.jpg"],"counter":1},{"id":3,"model":"iPhone 12","description":"Смартфон Apple iPhone 12 128GB (черный)","price":773,"discountPercentage":20,"rating":4.8,"DateOfIssue":2020,"brand":"Apple","category":"Smartphone","images":["https://i-product.by/images/o/apple-iphone-12-128gb-chernyj_1.jpg","https://i-product.by/images/o/apple-iphone-12-128gb-chernyj_2.jpg","https://i-product.by/images/o/apple-iphone-12-128gb-chernyj_3.jpg"],"counter":1},{"id":4,"model":"Galaxy A12","description":"Смартфон Samsung Galaxy A12 4GB/64GB (синий)","price":229,"discountPercentage":5,"rating":4.25,"DateOfIssue":2021,"brand":"Samsung","category":"Smartphone","images":["https://img.5element.by/import/images/ut/goods/good_ecb0f0f2-3ae8-11eb-bb92-0050560120e8/sm-a125f-siniy-64gb-telefon-gsm-samsung-galaxy-a12-1.jpg","https://img.5element.by/import/images/ut/goods/good_ecb0f0f2-3ae8-11eb-bb92-0050560120e8/sm-a125f-siniy-64gb-telefon-gsm-samsung-galaxy-a12-2.jpg","https://img.5element.by/import/images/ut/goods/good_ecb0f0f2-3ae8-11eb-bb92-0050560120e8/sm-a125f-siniy-64gb-telefon-gsm-samsung-galaxy-a12-7.jpg"],"counter":1},{"id":5,"model":"Galaxy A52","description":"Смартфон Samsung Galaxy A52 SM-A525F/DS 4GB/128GB (черный)","price":355,"discountPercentage":7,"rating":4.2,"DateOfIssue":2021,"brand":"Samsung","category":"Smartphone","images":["https://shop.by/images/samsung_galaxy_a52_4gb_128gb_black_(sm_a525f_ds)_1.jpg","https://shop.by/images/samsung_galaxy_a52_4gb_128gb_black_(sm_a525f_ds)_2.jpg","https://shop.by/images/samsung_galaxy_a52_4gb_128gb_black_(sm_a525f_ds)_3.jpg"],"counter":1},{"id":6,"model":"Galaxy S10","description":"Смартфон Samsung Galaxy S10 G973 8GB/128GB Dual SIM Exynos 9820 (перламутр)","price":552,"discountPercentage":17,"rating":4.59,"DateOfIssue":2019,"brand":"Samsung","category":"Smartphone","images":["https://agroup.by/upload/Sh/imageCache/323/974/9747502883754810.jpg.webp","https://agroup.by/upload/Sh/imageCache/426/477/4776304276478782.jpg.webp"],"counter":1},{"id":7,"model":"Mi A2 Lite","description":"Смартфон Xiaomi Mi A2 Lite 3GB/32GB (черный)","price":118,"discountPercentage":11,"rating":4.15,"DateOfIssue":2018,"brand":"Xiaomi","category":"Smartphone","images":["https://img.5element.by/import/images/ut/goods/good_824fe8a5-9722-11e8-80c3-00505684296c/good_img_9b3542f7-9730-11e8-80c3-00505684296c.jpg","https://img.5element.by/import/images/ut/goods/good_824fe8a5-9722-11e8-80c3-00505684296c/good_img_a56a59c3-9730-11e8-80c3-00505684296c.jpg","https://img.5element.by/import/images/ut/goods/good_824fe8a5-9722-11e8-80c3-00505684296c/good_img_a56a59c4-9730-11e8-80c3-00505684296c.jpg"],"counter":1},{"id":8,"model":"P20 Pro","description":"Смартфон Huawei P20 Pro CLT-L09 Single SIM (черный)","price":276,"discountPercentage":10,"rating":4.6,"DateOfIssue":2018,"brand":"Huawei","category":"Smartphone","images":["https://cdn.ultra.by/media/catalog/product/cache/1/image/490x/9df78eab33525d08d6e5fb8d27136e95/h/u/huawei_p20_pro_clt-l29_.jpg","https://cdn.ultra.by/media/catalog/product/cache/1/image/490x/9df78eab33525d08d6e5fb8d27136e95/h/u/huawei_p20_pro_clt-l29_1.jpg"],"counter":1},{"id":9,"model":"Macbook Air 13 2020","description":"Ноутбук Apple Macbook Air 13\'\' M1 2020 MGN63","price":1156,"discountPercentage":20,"rating":4.74,"DateOfIssue":2020,"brand":"Apple","category":"Notebook","images":["https://shop.by/images/apple_macbook_air_13_m1_2020_(mgn63)_1.jpg","https://shop.by/images/apple_macbook_air_13_m1_2020_(mgn63)_2.jpg","https://shop.by/images/apple_macbook_air_13_m1_2020_(mgn63)_3.jpg","https://shop.by/images/apple_macbook_air_13_m1_2020_(mgn63)_6.jpg"],"counter":1},{"id":10,"model":"MacBook Pro 13 2017","description":"Ноутбук Apple MacBook Pro 13\'\' (2017 год) [MPXQ2]","price":1487,"discountPercentage":20,"rating":4.63,"DateOfIssue":2017,"brand":"Apple","category":"Notebook","images":["https://nsv.by/upload/image_resize/a2c/4e2/95badccfc242eaead7a18514248f910a.webp","https://nsv.by/upload/image_resize/611/51f/4f4e721bd9357536c995f60aca3935e4.webp","https://nsv.by/upload/image_resize/d42/d86/311bf1c9d94bf905863180e4f92e25e1.webp"],"counter":1},{"id":11,"model":"Galaxy Book Ion 13","description":"Ноутбук Samsung Galaxy Book Ion 13 NP930XCJ-K01DE","price":1303,"discountPercentage":14,"rating":4.33,"DateOfIssue":2021,"brand":"Samsung","category":"Notebook","images":["https://media.notebookinfo.de/produkt/39568/ffffff/samsung-galaxy-book-ion-13-3-aura-silver-np930xcj-k01de-1.jpg","https://media.notebookinfo.de/produkt/39568/ffffff/samsung-galaxy-book-ion-13-3-aura-silver-np930xcj-k01de-2.jpg","https://media.notebookinfo.de/produkt/39568/ffffff/samsung-galaxy-book-ion-13-3-aura-silver-np930xcj-k01de-5.jpg"],"counter":1},{"id":12,"model":"Vostro 15 3500","description":"Ноутбук Dell Vostro 15 3500 N3001VN3500EMEA01_2201_UBU_BY","price":924,"discountPercentage":8,"rating":4.5,"DateOfIssue":2021,"brand":"Dell","category":"Notebook","images":["https://itx.by/upload/iblock/d47/d47ab1a532744d605b098a4dfe7da9d2.jpg"],"counter":1},{"id":13,"model":"Latitude 14 7490","description":"Ноутбук Dell Latitude 14 7490 210-ANQQ","price":955,"discountPercentage":15,"rating":5,"DateOfIssue":2018,"brand":"Dell","category":"Notebook","images":["https://agroup.by/upload/Sh/imageCache/259/514/514457870270555.jpg","https://agroup.by/upload/Sh/imageCache/294/163/1637372902316897.jpg","https://agroup.by/upload/Sh/imageCache/166/786/7868571209016589.jpg"],"counter":1},{"id":14,"model":"RedmiBook 16","description":"Ноутбук Xiaomi RedmiBook 16 JYU4277CN","price":1137,"discountPercentage":16,"rating":3.8,"DateOfIssue":2020,"brand":"Xiaomi","category":"Notebook","images":["https://5zv.by/image/cache/foto_edit/redmibook-16-1-1000x1000.jpg","https://5zv.by/image/cache/foto_edit/redmibook-16-3-1000x1000.jpg","https://5zv.by/image/cache/foto_edit/redmibook-16-2-1000x1000.jpg"],"counter":1},{"id":15,"model":"RedmiBook Pro 15","description":"Ноутбук Xiaomi RedmiBook Pro 15 JYU4335CN","price":1559,"discountPercentage":18,"rating":5,"DateOfIssue":2021,"brand":"Xiaomi","category":"Notebook","images":["https://5zv.by/image/cache/foto_edit/redmibook_pro_15____%20(1)-1000x1000.jpg","https://5zv.by/image/cache/foto_edit/redmibook_pro_15____%20(4)-1000x1000.jpg","https://5zv.by/image/cache/foto_edit/redmibook_pro_15____%20(2)-1000x1000.jpg"],"counter":1},{"id":16,"model":"C24RG50FZI","description":"Игровой монитор Samsung C24RG50FZI","price":248,"discountPercentage":5,"rating":4.29,"DateOfIssue":2021,"brand":"Samsung","category":"Monitor","images":["https://img.5element.by/import/images/ut/goods/good_87244f94-747a-11ec-bb94-0050560120e8/c24rg50fzi-lc24rg50fzixci-monitor-samsung-1.jpg","https://img.5element.by/import/images/ut/goods/good_87244f94-747a-11ec-bb94-0050560120e8/c24rg50fzi-lc24rg50fzixci-monitor-samsung-2.jpg","https://img.5element.by/import/images/ut/goods/good_87244f94-747a-11ec-bb94-0050560120e8/c24rg50fzi-lc24rg50fzixci-monitor-samsung-3.jpg"],"counter":1},{"id":17,"model":"C27F390FHI","description":"Монитор Samsung C27F390FHI [LC27F390FHIX]","price":252,"discountPercentage":10,"rating":4.12,"DateOfIssue":2016,"brand":"Samsung","category":"Monitor","images":["https://img.5element.by/import/images/ut/goods/good_40f2bec2-1a08-11e7-80e7-005056842056/good_img_b2e3eeed-87d9-11e7-80eb-005056842056.jpg","https://img.5element.by/import/images/ut/goods/good_40f2bec2-1a08-11e7-80e7-005056842056/good_img_b2e3eeee-87d9-11e7-80eb-005056842056.jpg","https://img.5element.by/import/images/ut/goods/good_40f2bec2-1a08-11e7-80e7-005056842056/good_img_b2e3eeef-87d9-11e7-80eb-005056842056.jpg"],"counter":1},{"id":18,"model":"E2221HN","description":"Монитор Dell E2221HN","price":185,"discountPercentage":8,"rating":4.88,"DateOfIssue":2020,"brand":"Dell","category":"Monitor","images":["https://avatars.mds.yandex.net/get-mpic/3741589/img_id6057718650881887040.jpeg/orig","https://avatars.mds.yandex.net/get-mpic/4559636/img_id7315690290779760160.jpeg/orig","https://avatars.mds.yandex.net/get-mpic/4338525/img_id8150861918497741398.jpeg/orig"],"counter":1},{"id":19,"model":"S2721DGFA","description":"Игровой монитор Dell S2721DGFA","price":592,"discountPercentage":18,"rating":4.6,"DateOfIssue":2020,"brand":"Dell","category":"Monitor","images":["https://img.5element.by/import/images/ut/goods/good_ea1883ec-f391-11ec-bb95-0050560120e8/s2721dgfa-210-axrq-monitor-dell-1.jpg","https://img.5element.by/import/images/ut/goods/good_ea1883ec-f391-11ec-bb95-0050560120e8/s2721dgfa-210-axrq-monitor-dell-2.jpg","https://img.5element.by/import/images/ut/goods/good_ea1883ec-f391-11ec-bb95-0050560120e8/s2721dgfa-210-axrq-monitor-dell-3.jpg"],"counter":1},{"id":20,"model":"Mi Curved Gaming Monitor 34","description":"Игровой монитор Xiaomi Mi Curved Gaming Monitor 34\'\' XMMNTWQ34 (китайская версия)","price":404,"discountPercentage":20,"rating":4.5,"DateOfIssue":2019,"brand":"Xiaomi","category":"Monitor","images":["https://shop.by/images/xiaomi_mi_surface_display_34__xmmntwq34_(kitayskaya_versiya)_1.jpg","https://shop.by/images/xiaomi_mi_surface_display_34__xmmntwq34_(kitayskaya_versiya)_2.jpg","https://shop.by/images/xiaomi_mi_surface_display_34__xmmntwq34_(kitayskaya_versiya)_3.jpg"],"counter":1},{"id":21,"model":"Mi Desktop Monitor 1C","description":"Монитор Xiaomi Mi Desktop Monitor 1C 23.8\'\' RMMNT238NF (международная версия)","price":206,"discountPercentage":19,"rating":3.75,"DateOfIssue":2021,"brand":"Xiaomi","category":"Monitor","images":["https://x-s.by/models/1324/2/monitor-xiaomi-mi-desktop-monitor-1c-238-1.jpg","https://x-s.by/models/1324/2/monitor-xiaomi-mi-desktop-monitor-1c-238-2.jpg","https://x-s.by/models/1324/2/monitor-xiaomi-mi-desktop-monitor-1c-238-4.jpg"],"counter":1},{"id":22,"model":"22MK430H-B","description":"Монитор LG 22MK430H-B","price":212,"discountPercentage":10,"rating":4.4,"DateOfIssue":2018,"brand":"LG","category":"Monitor","images":["https://img.5element.by/import/images/ut/goods/good_d99fe247-1bc4-11e8-80c4-005056840c70/good_img_a3ac13c7-bc44-11ea-80c8-005056840c70.jpg","https://img.5element.by/import/images/ut/goods/good_d99fe247-1bc4-11e8-80c4-005056840c70/good_img_dfc69be4-1d46-11e8-8126-005056841710.jpg","https://img.5element.by/import/images/ut/goods/good_d99fe247-1bc4-11e8-80c4-005056840c70/good_img_efc6b381-1d46-11e8-8126-005056841710.jpg"],"counter":1},{"id":23,"model":"UltraGear","description":"Игровой монитор LG UltraGear 27GN800-B","price":454,"discountPercentage":6,"rating":4.3,"DateOfIssue":2021,"brand":"LG","category":"Monitor","images":["https://img.5element.by/import/images/ut/goods/good_07ccc8a6-6c48-11eb-bb92-0050560120e8/27gn800-b-monitor-lg-1.jpg","https://img.5element.by/import/images/ut/goods/good_07ccc8a6-6c48-11eb-bb92-0050560120e8/27gn800-b-monitor-lg-2.jpg","https://img.5element.by/import/images/ut/goods/good_07ccc8a6-6c48-11eb-bb92-0050560120e8/27gn800-b-monitor-lg-6.jpg"],"counter":1},{"id":24,"model":"iPad 10.2","description":"Планшет Apple iPad 10.2\'\' 2021 64GB MK2K3 (серый космос)","price":403,"discountPercentage":11,"rating":4.5,"DateOfIssue":2021,"brand":"Apple","category":"PC-Tablet","images":["https://shop.by/images/apple_ipad_10_2__2021_64gb_space_gray_1.jpg","https://shop.by/images/apple_ipad_10_2__2021_64gb_space_gray_2.jpg","https://shop.by/images/apple_ipad_10_2__2021_64gb_space_gray_3.jpg"],"counter":1},{"id":25,"model":"iPad Pro 11","description":"Планшет Apple iPad Pro 11\'\' 64GB LTE MU0M2 (серый космос)","price":1154,"discountPercentage":20,"rating":4.75,"DateOfIssue":2018,"brand":"Apple","category":"PC-Tablet","images":["https://agroup.by/upload/Sh/imageCache/379/458/4588942914279584.jpg","https://agroup.by/upload/Sh/imageCache/801/497/497312310438136.jpg","https://agroup.by/upload/Sh/imageCache/167/542/5428481658706008.jpg"],"counter":1},{"id":26,"model":"Galaxy Tab A","description":"Планшет Samsung Galaxy Tab A (2018) 32GB (черный)","price":387,"discountPercentage":6,"rating":5,"DateOfIssue":2018,"brand":"Samsung","category":"PC-Tablet","images":["https://sila.by/img/catalog2015/img9/tovar98462.jpg","https://sila.by/img/catalog2015/img9/img.php?image=tovar98462_2","https://sila.by/img/catalog2015/img9/img.php?image=tovar98462_4"],"counter":1},{"id":27,"model":"Galaxy Tab A8 LTE","description":"Планшет Samsung Galaxy Tab A8 LTE SM-X205 128GB (темно-серый)","price":413,"discountPercentage":9,"rating":4.8,"DateOfIssue":2021,"brand":"Samsung","category":"PC-Tablet","images":["https://img.5element.by/import/images/ut/goods/good_2fe8b460-84cd-11ec-bb94-0050560120e8/sm-x205-seryy-128gb-planshet-samsung-galaxy-tab-a8-lte-1_600.jpg","https://img.5element.by/import/images/ut/goods/good_2fe8b460-84cd-11ec-bb94-0050560120e8/sm-x205-seryy-128gb-planshet-samsung-galaxy-tab-a8-lte-4_600.jpg","https://img.5element.by/import/images/ut/goods/good_2fe8b460-84cd-11ec-bb94-0050560120e8/sm-x205-seryy-128gb-planshet-samsung-galaxy-tab-a8-lte-2_600.jpg"],"counter":1},{"id":28,"model":"Pad 5","description":"Планшет Xiaomi Pad 5 128GB (международная версия, серый космос)","price":410,"discountPercentage":11,"rating":4.75,"DateOfIssue":2021,"brand":"Xiaomi","category":"PC-Tablet","images":["https://shop.mts.by/upload/resize_cache/webp/iblock/448/310_620_1/XIAOMI_Pad_5_black_3.webp","https://shop.mts.by/upload/resize_cache/webp/iblock/290/310_620_1/XIAOMI_Pad_5_black_5.webp","https://shop.mts.by/upload/resize_cache/webp/iblock/67f/310_620_1/XIAOMI_Pad_5_black_6.webp"],"counter":1},{"id":29,"model":"Mi Pad 5","description":"Планшет Xiaomi Mi Pad 5 128GB (китайская версия, белый)","price":399,"discountPercentage":11,"rating":4.7,"DateOfIssue":2021,"brand":"Xiaomi","category":"PC-Tablet","images":["https://xistore.by/upload/resize/element/71859/fb0/b395f864403daa1747f7ddd62de9d0c8_482_482_50@x2.webp"],"counter":1},{"id":30,"model":"MatePad 11","description":"Планшет Huawei MatePad 11 (2021) 6GB/128GB (серый матовый)","price":467,"discountPercentage":7,"rating":5,"DateOfIssue":2021,"brand":"Huawei","category":"PC-Tablet","images":["https://img.5element.by/import/images/ut/goods/good_6a2aefb8-ff42-11eb-bb92-0050560120e8/matepad-11-dby-w09-planshet-huawei-1_600.jpg","https://img.5element.by/import/images/ut/goods/good_6a2aefb8-ff42-11eb-bb92-0050560120e8/matepad-11-dby-w09-planshet-huawei-3_600.jpg","https://img.5element.by/import/images/ut/goods/good_6a2aefb8-ff42-11eb-bb92-0050560120e8/matepad-11-dby-w09-planshet-huawei-2_600.jpg"],"counter":1},{"id":31,"model":"MediaPad M5 lite","description":"Планшет Huawei MediaPad M5 lite BAH2-L09 32GB LTE (серый)","price":335,"discountPercentage":15,"rating":5,"DateOfIssue":2018,"brand":"Huawei","category":"PC-Tablet","images":["https://img.5element.by/import/images/ut/goods/good_f31c183e-2071-11e9-80c7-005056840c70/good_img_ac3b7375-2092-11e9-80c7-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_f31c183e-2071-11e9-80c7-005056840c70/good_img_a638249a-2092-11e9-80c7-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_f31c183e-2071-11e9-80c7-005056840c70/good_img_ac3b7376-2092-11e9-80c7-005056840c70_600.jpg"],"counter":1},{"id":32,"model":"K120","description":"Клавиатура Logitech K120","price":24,"discountPercentage":5,"rating":4.66,"DateOfIssue":2017,"brand":"Logitech","category":"Keyboard","images":["https://img.5element.by/import/images/ut/goods/good_6c782256-ec19-11e9-80c7-005056840c70/k120-l920-002522-logitech-klaviatura-for-business-1_600.jpg","https://img.5element.by/import/images/ut/goods/good_6c782256-ec19-11e9-80c7-005056840c70/k120-l920-002522-logitech-klaviatura-for-business-4_600.jpg","https://img.5element.by/import/images/ut/goods/good_6c782256-ec19-11e9-80c7-005056840c70/k120-l920-002522-logitech-klaviatura-for-business-5_600.jpg","https://img.5element.by/import/images/ut/goods/good_6c782256-ec19-11e9-80c7-005056840c70/k120-l920-002522-logitech-klaviatura-for-business-6_600.jpg"],"counter":1},{"id":33,"model":"K280e","description":"Клавиатура Logitech Corded Keyboard K280e (920-005215)","price":43,"discountPercentage":15,"rating":4.68,"DateOfIssue":2018,"brand":"Logitech","category":"Keyboard","images":["https://img.5element.by/import/images/ut/goods/good_47208934-4b91-11e7-80e7-005056842056/klaviatura-logitech-k280e-chernyy-1_600.jpg","https://img.5element.by/import/images/ut/goods/good_47208934-4b91-11e7-80e7-005056842056/klaviatura-logitech-k280e-chernyy-2_600.jpg","https://img.5element.by/import/images/ut/goods/good_47208934-4b91-11e7-80e7-005056842056/klaviatura-logitech-k280e-chernyy-3_600.jpg","https://img.5element.by/import/images/ut/goods/good_47208934-4b91-11e7-80e7-005056842056/klaviatura-logitech-k280e-chernyy-4_600.jpg","https://img.5element.by/import/images/ut/goods/good_47208934-4b91-11e7-80e7-005056842056/klaviatura-logitech-k280e-chernyy-5_600.jpg","https://img.5element.by/import/images/ut/goods/good_47208934-4b91-11e7-80e7-005056842056/klaviatura-logitech-k280e-chernyy-6_600.jpg"],"counter":1},{"id":34,"model":"Alloy Origins Core","description":"Клавиатура HyperX Alloy Origins Core (HyperX Red)","price":126,"discountPercentage":11,"rating":4.75,"DateOfIssue":2019,"brand":"HyperX","category":"Keyboard","images":["https://img.5element.by/import/images/ut/goods/good_4789088e-2181-11ea-80c7-005056840c70/good_img_48a577bb-22f1-11ea-80c7-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_4789088e-2181-11ea-80c7-005056840c70/good_img_48a577bc-22f1-11ea-80c7-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_4789088e-2181-11ea-80c7-005056840c70/good_img_48a577b9-22f1-11ea-80c7-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_4789088e-2181-11ea-80c7-005056840c70/good_img_9ffc9230-22f1-11ea-80c7-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_4789088e-2181-11ea-80c7-005056840c70/good_img_9ffc922f-22f1-11ea-80c7-005056840c70_600.jpg"],"counter":1},{"id":35,"model":"Alloy Origins 60","description":"Клавиатура HyperX Alloy Origins 60","price":154,"discountPercentage":19,"rating":5,"DateOfIssue":2021,"brand":"HyperX","category":"Keyboard","images":["https://img.5element.by/import/images/ut/goods/good_035465ff-ef8b-11eb-bb92-0050560120e8/hkbo1s-rb-ru-g-alloy-origins-60-kingston-klaviatura-hyperx-1_600.jpg","https://img.5element.by/import/images/ut/goods/good_035465ff-ef8b-11eb-bb92-0050560120e8/hkbo1s-rb-ru-g-alloy-origins-60-kingston-klaviatura-hyperx-2_600.jpg","https://img.5element.by/import/images/ut/goods/good_035465ff-ef8b-11eb-bb92-0050560120e8/hkbo1s-rb-ru-g-alloy-origins-60-kingston-klaviatura-hyperx-3_600.jpg","https://img.5element.by/import/images/ut/goods/good_035465ff-ef8b-11eb-bb92-0050560120e8/hkbo1s-rb-ru-g-alloy-origins-60-kingston-klaviatura-hyperx-4_600.jpg","https://img.5element.by/import/images/ut/goods/good_035465ff-ef8b-11eb-bb92-0050560120e8/hkbo1s-rb-ru-g-alloy-origins-60-kingston-klaviatura-hyperx-5_600.jpg"],"counter":1},{"id":36,"model":"KV-300H","description":"Клавиатура A4Tech KV-300H","price":35,"discountPercentage":11,"rating":4.65,"DateOfIssue":2014,"brand":"A4Tech","category":"Keyboard","images":["https://img.5element.by/import/images/ut/goods/good_c3115ae6-bc0e-11e4-8121-00505684b891/kv-300h-a4tech-klaviatura-usb-1_600.jpg","https://img.5element.by/import/images/ut/goods/good_c3115ae6-bc0e-11e4-8121-00505684b891/kv-300h-a4tech-klaviatura-usb-2_600.jpg","https://img.5element.by/import/images/ut/goods/good_c3115ae6-bc0e-11e4-8121-00505684b891/kv-300h-a4tech-klaviatura-usb-3_600.jpg","https://img.5element.by/import/images/ut/goods/good_c3115ae6-bc0e-11e4-8121-00505684b891/kv-300h-a4tech-klaviatura-usb-4_600.jpg"],"counter":1},{"id":37,"model":"Bloody S510N","description":"Клавиатура A4Tech Bloody S510N (белый, Bloody BLMS Red)","price":57,"discountPercentage":9,"rating":4.77,"DateOfIssue":2022,"brand":"A4Tech","category":"Keyboard","images":["https://img-shop.e-tiketka.com/upload/thumb/6/b107a2d786f8798c91d25c1c7964f0ca.jpg"],"counter":1},{"id":38,"model":"G102 Lightsync","description":"Игровая мышь Logitech G102 Lightsync (черный)","price":32,"discountPercentage":10,"rating":4.4,"DateOfIssue":2020,"brand":"Logitech","category":"Mouse","images":["https://img.5element.by/import/images/ut/goods/good_52c3a15a-ec3a-11ea-80c1-005056844aec/good_img_9987ea98-ec60-11ea-80c1-005056844aec_600.jpg","https://img.5element.by/import/images/ut/goods/good_52c3a15a-ec3a-11ea-80c1-005056844aec/good_img_9987ea96-ec60-11ea-80c1-005056844aec_600.jpg","https://img.5element.by/import/images/ut/goods/good_52c3a15a-ec3a-11ea-80c1-005056844aec/good_img_9987ea97-ec60-11ea-80c1-005056844aec_600.jpg","https://img.5element.by/import/images/ut/goods/good_52c3a15a-ec3a-11ea-80c1-005056844aec/good_img_9987ea9c-ec60-11ea-80c1-005056844aec_600.jpg"],"counter":1},{"id":39,"model":"G Pro Wireless","description":"Игровая мышь Logitech G Pro Wireless","price":130,"discountPercentage":12,"rating":4.6,"DateOfIssue":2018,"brand":"Logitech","category":"Mouse","images":["https://img.5element.by/import/images/ut/goods/good_1fbc930f-f57a-11e9-80c7-005056840c70/good_img_3670fa95-f57c-11e9-80c7-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_1fbc930f-f57a-11e9-80c7-005056840c70/good_img_3670fa93-f57c-11e9-80c7-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_1fbc930f-f57a-11e9-80c7-005056840c70/good_img_3670fa94-f57c-11e9-80c7-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_1fbc930f-f57a-11e9-80c7-005056840c70/good_img_3670fa96-f57c-11e9-80c7-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_1fbc930f-f57a-11e9-80c7-005056840c70/good_img_303f7b1e-f57c-11e9-80c7-005056840c70_600.jpg"],"counter":1},{"id":40,"model":"Bloody J95S","description":"Игровая мышь A4Tech Bloody J95S Grey","price":26,"discountPercentage":18,"rating":4.6,"DateOfIssue":2020,"brand":"A4Tech","category":"Mouse","images":["https://i.unishop.by/models/myshi/a4_tech/bloody_j95s.webp","https://i.unishop.by/models/myshi/a4_tech/bloody_j95s-1.webp"],"counter":1},{"id":41,"model":"Bloody V8","description":"Игровая мышь A4Tech Bloody V8","price":22,"discountPercentage":20,"rating":4.1,"DateOfIssue":2013,"brand":"A4Tech","category":"Mouse","images":["https://sila.by/img/catalog2015/img5/tovar51066.jpg","https://sila.by/img/catalog2015/img5/img.php?image=tovar51066_2","https://sila.by/img/catalog2015/img5/img.php?image=tovar51066_3","https://sila.by/img/catalog2015/img5/img.php?image=tovar51066_4"],"counter":1},{"id":42,"model":"Pulsefire Surge","description":"Игровая мышь HyperX Pulsefire Surge","price":54,"discountPercentage":15,"rating":4,"DateOfIssue":2018,"brand":"HyperX","category":"Mouse","images":["https://img.5element.by/import/images/ut/goods/good_ff8fd2a9-c612-11e8-80c3-00505684296c/good_img_89051b5a-cc84-11e8-80c4-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_ff8fd2a9-c612-11e8-80c3-00505684296c/good_img_89051b59-cc84-11e8-80c4-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_ff8fd2a9-c612-11e8-80c3-00505684296c/good_img_a2cc9661-cc84-11e8-80c4-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_ff8fd2a9-c612-11e8-80c3-00505684296c/good_img_a9de3334-cc84-11e8-80c4-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_ff8fd2a9-c612-11e8-80c3-00505684296c/good_img_c45d43c3-cc84-11e8-80c4-005056840c70_600.jpg"],"counter":1},{"id":43,"model":"Pulsefire Haste","description":"Игровая мышь HyperX Pulsefire Haste (черный)","price":63,"discountPercentage":12,"rating":4.6,"DateOfIssue":2020,"brand":"HyperX","category":"Mouse","images":["https://img.5element.by/import/images/ut/goods/good_34ffd5b9-9e7b-11eb-bb92-0050560120e8/hmsh1-a-bk-g-hyperx-mysh-kompyuternaya-pulsefire-haste-kingston-1_600.jpg","https://img.5element.by/import/images/ut/goods/good_34ffd5b9-9e7b-11eb-bb92-0050560120e8/hmsh1-a-bk-g-hyperx-mysh-kompyuternaya-pulsefire-haste-kingston-2_600.jpg","https://img.5element.by/import/images/ut/goods/good_34ffd5b9-9e7b-11eb-bb92-0050560120e8/hmsh1-a-bk-g-hyperx-mysh-kompyuternaya-pulsefire-haste-kingston-3_600.jpg","https://img.5element.by/import/images/ut/goods/good_34ffd5b9-9e7b-11eb-bb92-0050560120e8/hmsh1-a-bk-g-hyperx-mysh-kompyuternaya-pulsefire-haste-kingston-4_600.jpg","https://img.5element.by/import/images/ut/goods/good_34ffd5b9-9e7b-11eb-bb92-0050560120e8/hmsh1-a-bk-g-hyperx-mysh-kompyuternaya-pulsefire-haste-kingston-5_600.jpg","https://img.5element.by/import/images/ut/goods/good_34ffd5b9-9e7b-11eb-bb92-0050560120e8/hmsh1-a-bk-g-hyperx-mysh-kompyuternaya-pulsefire-haste-kingston-6_600.jpg"],"counter":1},{"id":44,"model":"Mi Dual Mode Wireless Mouse Silent Edition","description":"Мышь Xiaomi Mi Dual Mode Wireless Mouse Silent Edition (черный)","price":16,"discountPercentage":18,"rating":3.7,"DateOfIssue":2020,"brand":"Xiaomi","category":"Mouse","images":["https://img.5element.by/import/images/ut/goods/good_bcb14274-a1aa-11ea-80c8-005056840c70/good_img_6f9ec3d3-a404-11ea-80c8-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_bcb14274-a1aa-11ea-80c8-005056840c70/good_img_6f9ec3d5-a404-11ea-80c8-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_bcb14274-a1aa-11ea-80c8-005056840c70/good_img_6f9ec3d7-a404-11ea-80c8-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_bcb14274-a1aa-11ea-80c8-005056840c70/good_img_6f9ec3d6-a404-11ea-80c8-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_bcb14274-a1aa-11ea-80c8-005056840c70/good_img_6f9ec3d4-a404-11ea-80c8-005056840c70_600.jpg"],"counter":1},{"id":45,"model":"Mi Portable Mouse 2","description":"Мышь Xiaomi Mi Portable Mouse 2 (серый/черный)","price":23,"discountPercentage":11,"rating":5,"DateOfIssue":2020,"brand":"Xiaomi","category":"Mouse","images":["https://mx.by/pics/items/xiaomi-mi-portable-mouse-2-bxsbmw02-grey_1.jpg","https://mx.by/pics/items/xiaomi-mi-portable-mouse-2-bxsbmw02-grey_2.jpg","https://mx.by/pics/items/xiaomi-mi-portable-mouse-2-bxsbmw02-grey_4.jpg","https://mx.by/pics/items/xiaomi-mi-portable-mouse-2-bxsbmw02-grey_3.jpg","https://mx.by/pics/items/xiaomi-mi-portable-mouse-2-bxsbmw02-grey_5.jpg"],"counter":1},{"id":46,"model":"MS5120W","description":"Мышь Dell MS5120W (серый)","price":38,"discountPercentage":9,"rating":5,"DateOfIssue":2020,"brand":"Dell","category":"Mouse","images":["https://img.5element.by/import/images/ut/goods/good_ea1883ee-f391-11ec-bb95-0050560120e8/ms5120w-titan-gray-570-abhl-mysh-dell-1_600.jpg","https://img.5element.by/import/images/ut/goods/good_ea1883ee-f391-11ec-bb95-0050560120e8/ms5120w-titan-gray-570-abhl-mysh-dell-2_600.jpg","https://img.5element.by/import/images/ut/goods/good_ea1883ee-f391-11ec-bb95-0050560120e8/ms5120w-titan-gray-570-abhl-mysh-dell-3_600.jpg","https://img.5element.by/import/images/ut/goods/good_ea1883ee-f391-11ec-bb95-0050560120e8/ms5120w-titan-gray-570-abhl-mysh-dell-4_600.jpg","https://img.5element.by/import/images/ut/goods/good_ea1883ee-f391-11ec-bb95-0050560120e8/ms5120w-titan-gray-570-abhl-mysh-dell-5_600.jpg"],"counter":1},{"id":47,"model":"MS5320W","description":"Мышь Dell MS5320W","price":53,"discountPercentage":10,"rating":5,"DateOfIssue":2022,"brand":"Dell","category":"Mouse","images":["https://img.5element.by/import/images/ut/goods/good_ea1883e3-f391-11ec-bb95-0050560120e8/ms5320w-570-abhi-mysh-dell-1_600.jpg","https://img.5element.by/import/images/ut/goods/good_ea1883e3-f391-11ec-bb95-0050560120e8/ms5320w-570-abhi-mysh-dell-2_600.jpg","https://img.5element.by/import/images/ut/goods/good_ea1883e3-f391-11ec-bb95-0050560120e8/ms5320w-570-abhi-mysh-dell-3_600.jpg"],"counter":1},{"id":48,"model":"AF30","description":"Мышь Huawei AF30 (серый)","price":42,"discountPercentage":17,"rating":5,"DateOfIssue":2019,"brand":"Huawei","category":"Mouse","images":["https://img.5element.by/import/images/ut/goods/good_6e8f9435-a48f-11e9-80c7-005056840c70/good_img_278362ad-a4a1-11e9-80c7-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_6e8f9435-a48f-11e9-80c7-005056840c70/good_img_278362ac-a4a1-11e9-80c7-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_6e8f9435-a48f-11e9-80c7-005056840c70/good_img_278362a9-a4a1-11e9-80c7-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_6e8f9435-a48f-11e9-80c7-005056840c70/good_img_278362aa-a4a1-11e9-80c7-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_6e8f9435-a48f-11e9-80c7-005056840c70/good_img_278362ab-a4a1-11e9-80c7-005056840c70_600.jpg"],"counter":1},{"id":49,"model":"Redmi Buds 4 Pro","description":"Наушники Xiaomi Redmi Buds 4 Pro M2132E1 (черный, международная версия)","price":98,"discountPercentage":7,"rating":5,"DateOfIssue":2022,"brand":"Xiaomi","category":"Headset","images":["https://mx.by/pics/items/20220829150823025_xiaomi-redmi-buds-4-pro_8.jpg","https://mx.by/pics/items/20220829150823149_xiaomi-redmi-buds-4-pro_9.jpg","https://mx.by/pics/items/20220829150823097_xiaomi-redmi-buds-4-pro_10.jpg"],"counter":1},{"id":50,"model":"Mi True Wireless Earbuds Basic 2","description":"Наушники Xiaomi Mi True Wireless Earbuds Basic 2 TWSEJ061LS (международная версия)","price":26,"discountPercentage":8,"rating":3.6,"DateOfIssue":2020,"brand":"Xiaomi","category":"Headset","images":["https://shop.by/images/xiaomi_mi_true_wireless_earbuds_basic_2_twsej061ls_1.jpg","https://shop.by/images/xiaomi_mi_true_wireless_earbuds_basic_2_twsej061ls_2.jpg","https://shop.by/images/xiaomi_mi_true_wireless_earbuds_basic_2_twsej061ls_3.jpg"],"counter":1},{"id":51,"model":"AirPods Pro","description":"Наушники Apple AirPods Pro (с поддержкой MagSafe)","price":229,"discountPercentage":14,"rating":4,"DateOfIssue":2021,"brand":"Apple","category":"Headset","images":["https://img.5element.by/import/images/ut/goods/good_e14683b1-618c-11ec-bb94-0050560120e8/mlwk3ru-a-besprovodnye-naushniki-apple-airpods-pro-s-magsafe-2_600.jpg","https://img.5element.by/import/images/ut/goods/good_e14683b1-618c-11ec-bb94-0050560120e8/mlwk3ru-a-besprovodnye-naushniki-apple-airpods-pro-s-magsafe-3_600.jpg","https://img.5element.by/import/images/ut/goods/good_e14683b1-618c-11ec-bb94-0050560120e8/mlwk3ru-a-besprovodnye-naushniki-apple-airpods-pro-s-magsafe-1_600.jpg"],"counter":1},{"id":52,"model":"AirPods 3","description":"Наушники Apple AirPods 3 (с поддержкой MagSafe)","price":207,"discountPercentage":5,"rating":4.6,"DateOfIssue":2021,"brand":"Apple","category":"Headset","images":["https://shop.by/images/apple_airpods_3_1.jpg","https://shop.by/images/apple_airpods_3_2.jpg","https://shop.by/images/apple_airpods_3_3.jpg"],"counter":1},{"id":53,"model":"Galaxy Buds 2","description":"Наушники Samsung Galaxy Buds 2 (графитовый)","price":101,"discountPercentage":11,"rating":4.6,"DateOfIssue":2021,"brand":"Samsung","category":"Headset","images":["https://shop.by/images/samsung_galaxy_buds_2_pro_(grafitovyiy)_6.jpg","https://shop.by/images/samsung_galaxy_buds_2_pro_(grafitovyiy)_1.jpg","https://shop.by/images/samsung_galaxy_buds_2_pro_(grafitovyiy)_2.jpg"],"counter":1},{"id":54,"model":"Galaxy Buds Live","description":"Наушники Samsung Galaxy Buds Live (графитовый)","price":87,"discountPercentage":19,"rating":4.3,"DateOfIssue":2020,"brand":"Samsung","category":"Headset","images":["https://photo-shop.by/pics/items/20210415120412073_samsung_galaxy_buds_live_black_1.jpg","https://photo-shop.by/pics/items/20210415120416711_samsung_galaxy_buds_live_black_5.jpg","https://photo-shop.by/pics/items/20210415120421393_samsung_galaxy_buds_live_black_2_1.jpg"],"counter":1},{"id":55,"model":"G Pro X","description":"Наушники Logitech G Pro X","price":146,"discountPercentage":7,"rating":4.3,"DateOfIssue":2019,"brand":"Logitech","category":"Headset","images":["https://img.5element.by/import/images/ut/goods/good_6069416e-061d-11ea-80c7-005056840c70/g-pro-x-l981-000818-igrovaya-garnitura-logitech-1_600.jpg","https://img.5element.by/import/images/ut/goods/good_6069416e-061d-11ea-80c7-005056840c70/g-pro-x-l981-000818-igrovaya-garnitura-logitech-2_600.jpg","https://img.5element.by/import/images/ut/goods/good_6069416e-061d-11ea-80c7-005056840c70/g-pro-x-l981-000818-igrovaya-garnitura-logitech-3_600.jpg"],"counter":1},{"id":56,"model":"G335","description":"Наушники Logitech G335 (черный)","price":79,"discountPercentage":19,"rating":5,"DateOfIssue":2021,"brand":"Logitech","category":"Headset","images":["https://img.5element.by/import/images/ut/goods/good_aee76c6c-414c-11ec-bb94-0050560120e8/981-000978-g335-igrovaya-garnitura-logitech-black-1_600.jpg","https://img.5element.by/import/images/ut/goods/good_aee76c6c-414c-11ec-bb94-0050560120e8/981-000978-g335-igrovaya-garnitura-logitech-black-2_600.jpg","https://img.5element.by/import/images/ut/goods/good_aee76c6c-414c-11ec-bb94-0050560120e8/981-000978-g335-igrovaya-garnitura-logitech-black-3_600.jpg","https://img.5element.by/import/images/ut/goods/good_aee76c6c-414c-11ec-bb94-0050560120e8/981-000978-g335-igrovaya-garnitura-logitech-black-4_600.jpg","https://img.5element.by/import/images/ut/goods/good_aee76c6c-414c-11ec-bb94-0050560120e8/981-000978-g335-igrovaya-garnitura-logitech-black-5_600.jpg","https://img.5element.by/import/images/ut/goods/good_aee76c6c-414c-11ec-bb94-0050560120e8/981-000978-g335-igrovaya-garnitura-logitech-black-6_600.jpg"],"counter":1},{"id":57,"model":"FreeBuds 4","description":"Наушники Huawei FreeBuds 4 (мерцающий серебристый, международная версия)","price":169,"discountPercentage":17,"rating":4.1,"DateOfIssue":2021,"brand":"Huawei","category":"Headset","images":["https://img.5element.by/import/images/ut/goods/good_0e05d463-276f-11ec-bb96-00505683f369/t0004-freebuds-4-silver-frost-besprovodnye-naushniki-huawei-1_600.jpg","https://img.5element.by/import/images/ut/goods/good_0e05d463-276f-11ec-bb96-00505683f369/t0004-freebuds-4-silver-frost-besprovodnye-naushniki-huawei-2_600.jpg","https://img.5element.by/import/images/ut/goods/good_0e05d463-276f-11ec-bb96-00505683f369/t0004-freebuds-4-silver-frost-besprovodnye-naushniki-huawei-4_600.jpg","https://img.5element.by/import/images/ut/goods/good_0e05d463-276f-11ec-bb96-00505683f369/t0004-freebuds-4-silver-frost-besprovodnye-naushniki-huawei-6_600.jpg"],"counter":1},{"id":58,"model":"FreeBuds Pro","description":"Наушники Huawei FreeBuds Pro (мерцающий серебристый, международная версия)","price":230,"discountPercentage":8,"rating":4.3,"DateOfIssue":2020,"brand":"Huawei","category":"Headset","images":["https://shop.by/images/huawei_freebuds_pro_silver_1.jpg","https://shop.by/images/huawei_freebuds_pro_silver_2.jpg","https://shop.by/images/huawei_freebuds_pro_silver_3.jpg","https://shop.by/images/huawei_freebuds_pro_silver_4.jpg"],"counter":1},{"id":59,"model":"Cloud Stinger","description":"Наушники HyperX Cloud Stinger (черный)","price":67,"discountPercentage":12,"rating":3.9,"DateOfIssue":2016,"brand":"HyperX","category":"Headset","images":["https://img.5element.by/import/images/ut/goods/good_67e3b268-c613-11e8-80c3-00505684296c/good_img_61d0ddb0-d10a-11e8-80c4-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_67e3b268-c613-11e8-80c3-00505684296c/good_img_61d0ddae-d10a-11e8-80c4-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_67e3b268-c613-11e8-80c3-00505684296c/good_img_684c4552-d10a-11e8-80c4-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_67e3b268-c613-11e8-80c3-00505684296c/good_img_61d0ddb1-d10a-11e8-80c4-005056840c70_600.jpg"],"counter":1},{"id":60,"model":"Cloud Alpha S","description":"Наушники HyperX Cloud Alpha S (черный/синий)","price":135,"discountPercentage":14,"rating":4.25,"DateOfIssue":2019,"brand":"HyperX","category":"Headset","images":["https://img.5element.by/import/images/ut/goods/good_fcd39a95-df6e-11e9-80c7-005056840c70/good_img_36b512b8-df9f-11e9-80c7-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_fcd39a95-df6e-11e9-80c7-005056840c70/good_img_36b512b6-df9f-11e9-80c7-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_fcd39a95-df6e-11e9-80c7-005056840c70/good_img_36b512b2-df9f-11e9-80c7-005056840c70_600.jpg","https://img.5element.by/import/images/ut/goods/good_fcd39a95-df6e-11e9-80c7-005056840c70/good_img_36b512b3-df9f-11e9-80c7-005056840c70_600.jpg"],"counter":1},{"id":61,"model":"Tone Free HBS-FN4","description":"Наушники LG Tone Free HBS-FN4 (черный)","price":59,"discountPercentage":14,"rating":3.6,"DateOfIssue":2020,"brand":"LG","category":"Headset","images":["https://img.5element.by/import/images/ut/goods/good_6f8d3063-07ce-11eb-80c1-005056844aec/hbs-fn4-abrubk-besprovodnye-naushniki-lg-tone-free-1_600.jpg","https://img.5element.by/import/images/ut/goods/good_6f8d3063-07ce-11eb-80c1-005056844aec/hbs-fn4-abrubk-besprovodnye-naushniki-lg-tone-free-2_600.jpg","https://img.5element.by/import/images/ut/goods/good_6f8d3063-07ce-11eb-80c1-005056844aec/hbs-fn4-abrubk-besprovodnye-naushniki-lg-tone-free-3_600.jpg","https://img.5element.by/import/images/ut/goods/good_6f8d3063-07ce-11eb-80c1-005056844aec/hbs-fn4-abrubk-besprovodnye-naushniki-lg-tone-free-7_600.jpg"],"counter":1},{"id":62,"model":"Tone Free HBS-FN7","description":"Наушники LG Tone Free HBS-FN7 (черный)","price":165,"discountPercentage":17,"rating":5,"DateOfIssue":2021,"brand":"LG","category":"Headset","images":["https://shop.by/images/lg_tone_free_hbs_fn7_(chernyiy)_1.jpg","https://shop.by/images/lg_tone_free_hbs_fn7_(chernyiy)_2.jpg","https://shop.by/images/lg_tone_free_hbs_fn7_(chernyiy)_4.jpg"],"counter":1},{"id":63,"model":"Alienware AW988","description":"Наушники Dell Alienware AW988","price":318,"discountPercentage":6,"rating":4.66,"DateOfIssue":2018,"brand":"Dell","category":"Headset","images":["https://images.prom.ua/2723725245_w640_h640_naushniki-igrovye-alienware.jpg"],"counter":1}]');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL3N0eWxlLnNjc3M/YmMzYiIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL3RzL0FwcGx5RmlsdGVycy50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvQXBwbHlSb3V0aW5nLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9BcHBseVNvcnQudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL3RzL0Jhc2tldFBhZ2UudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL3RzL0NhcmRQYWdlLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9DaGVja291dFBvcHVwLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9Db21wb25lbnRzL0NyZWF0ZUNhcnRJdGVtLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9Db21wb25lbnRzL0NyZWF0ZVJhbmdlQmxvY2sudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL3RzL0NvbXBvbmVudHMvQ3JlYXRlU2VhcmNoQmFyLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9Db21wb25lbnRzL0NyZWF0ZVNvcnRNZW51LnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9DcmVhdGVMaXN0T2ZDYXJkcy50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvRGVmYXVsdFBhZ2UudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL3RzL0VsZW1lbnRzL0NyZWF0ZUNoZWNrYm94LnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9FbGVtZW50cy9DcmVhdGVFbGVtZW50LnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9FbGVtZW50cy9DcmVhdGVJbWFnZS50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvRWxlbWVudHMvQ3JlYXRlTGluay50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvRWxlbWVudHMvQ3JlYXRlTnVtYmVySW5wdXQudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL3RzL0VsZW1lbnRzL0NyZWF0ZVJhZGlvLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9FbGVtZW50cy9DcmVhdGVSYW5nZS50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvRWxlbWVudHMvQ3JlYXRlVGV4dElucHV0LnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9kYXRhLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9yb3V0ZS50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCAnLi9zdHlsZS5zY3NzJztcclxuaW1wb3J0IHsgQXBwbHlSb3V0aW5nIH0gZnJvbSAnLi90cy9BcHBseVJvdXRpbmcnO1xyXG5pbXBvcnQgZGF0YSBmcm9tICcuL3RzL2RhdGEnO1xyXG5cclxuaW1wb3J0IENyZWF0ZURlZmF1bHRQYWdlIGZyb20gJy4vdHMvRGVmYXVsdFBhZ2UnO1xyXG5pbXBvcnQgeyBDcmVhdGVFbGVtZW50IH0gZnJvbSAnLi90cy9FbGVtZW50cy9DcmVhdGVFbGVtZW50JztcclxuXHJcbmNvbnN0IHByb2R1Y3RzID0gbmV3IGRhdGEoKTtcclxuY29uc3QgQXBwUm91dGluZyA9IG5ldyBBcHBseVJvdXRpbmcoKTtcclxuXHJcbmNvbnN0IG5ld2FyciA9IFtdO1xyXG5uZXdhcnIucHVzaChwcm9kdWN0cy5HZXQoKVswXSk7XHJcbm5ld2Fyci5wdXNoKHByb2R1Y3RzLkdldCgpWzFdKTtcclxubmV3YXJyLnB1c2gocHJvZHVjdHMuR2V0KClbMl0pO1xyXG5wcm9kdWN0cy5HZXRNaW5NYXhEYXRlKCk7XHJcbmNvbnN0IGhhc2ggPSBsb2NhdGlvbi5oYXNoO1xyXG5cclxuY29uc3QgUGFnZSA9IG5ldyBDcmVhdGVEZWZhdWx0UGFnZSgpO1xyXG5QYWdlLkNyZWF0ZUhlYWRlcigpO1xyXG5BcHBSb3V0aW5nLmluaXQoaGFzaCk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxyXG4gICdoYXNoY2hhbmdlJyxcclxuICAoKSA9PiB7XHJcbiAgICBBcHBSb3V0aW5nLmluaXQobG9jYXRpb24uaGFzaCk7XHJcbiAgfSxcclxuICBmYWxzZVxyXG4pO1xyXG4iLCJpbXBvcnQgZGF0YSBmcm9tICcuL2RhdGEnO1xyXG5pbXBvcnQgeyBmaWx0ZXJzLCBwcm9kdWN0IH0gZnJvbSAnLi9JbnRlcmZhY2VzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBseUZpbHRlcnMge1xyXG4gIHByaXZhdGUgZGF0YSA9IG5ldyBkYXRhKCk7XHJcbiAgcHJpdmF0ZSBEYXRhQWZ0ZXJGaWx0ZXJzOiBwcm9kdWN0W10gPSBbXTtcclxuICAvL3ByaXZhdGVcclxuICBjb25zdHJ1Y3RvcihmaWx0ZXJzOiBmaWx0ZXJzKSB7XHJcbiAgICB0aGlzLkRhdGFBZnRlckZpbHRlcnMgPSBuZXcgZGF0YSgpLkdldCgpO1xyXG4gICAgaWYgKGZpbHRlcnMuQ2F0ZWdvcnkubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgIHRoaXMuY2F0ZWdvcnkoZmlsdGVycy5DYXRlZ29yeSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsdGVycy5CcmFuZC5sZW5ndGggIT09IDApIHtcclxuICAgICAgdGhpcy5icmFuZChmaWx0ZXJzLkJyYW5kKTtcclxuICAgIH1cclxuICAgIGlmIChmaWx0ZXJzLk1pblByaWNlICE9PSB0aGlzLmRhdGEuR2V0TWluTWF4UHJpY2UoKS5taW4gfHwgZmlsdGVycy5NYXhQcmljZSAhPT0gdGhpcy5kYXRhLkdldE1pbk1heFByaWNlKCkubWF4KSB7XHJcbiAgICAgIHRoaXMucHJpY2UoZmlsdGVycy5NaW5QcmljZSwgZmlsdGVycy5NYXhQcmljZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsdGVycy5NaW5ZZWFyICE9PSB0aGlzLmRhdGEuR2V0TWluTWF4RGF0ZSgpLm1pbiB8fCBmaWx0ZXJzLk1heFllYXIgIT09IHRoaXMuZGF0YS5HZXRNaW5NYXhEYXRlKCkubWF4KSB7XHJcbiAgICAgIHRoaXMuZGF0ZShmaWx0ZXJzLk1pblllYXIsIGZpbHRlcnMuTWF4WWVhcik7XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsdGVycy5TZWFyY2ggIT09ICcnKSB7XHJcbiAgICAgIHRoaXMuc2VhcmNoKGZpbHRlcnMuU2VhcmNoKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuRGF0YUFmdGVyRmlsdGVycztcclxuICB9XHJcbiAgY2F0ZWdvcnkoY2F0ZWdvcmllczogc3RyaW5nW10pIHtcclxuICAgIGNvbnN0IFRlbXBBcnJheTogcHJvZHVjdFtdID0gW107XHJcbiAgICBjYXRlZ29yaWVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgdGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzLmZvckVhY2goKGl0KSA9PiB7XHJcbiAgICAgICAgaWYgKGl0ZW0gPT09IGl0LmNhdGVnb3J5KSB7XHJcbiAgICAgICAgICBUZW1wQXJyYXkucHVzaChpdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzID0gVGVtcEFycmF5O1xyXG4gIH1cclxuICBicmFuZChicmFuZHM6IHN0cmluZ1tdKSB7XHJcbiAgICBjb25zdCBUZW1wQXJyYXk6IHByb2R1Y3RbXSA9IFtdO1xyXG4gICAgYnJhbmRzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgdGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzLmZvckVhY2goKGl0KSA9PiB7XHJcbiAgICAgICAgaWYgKGl0ZW0gPT09IGl0LmJyYW5kKSB7XHJcbiAgICAgICAgICBUZW1wQXJyYXkucHVzaChpdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzID0gVGVtcEFycmF5O1xyXG4gIH1cclxuICBwcmljZShtaW46IHN0cmluZywgbWF4OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IFRlbXBBcnJheTogcHJvZHVjdFtdID0gW107XHJcbiAgICB0aGlzLkRhdGFBZnRlckZpbHRlcnMuZm9yRWFjaCgoaXQpID0+IHtcclxuICAgICAgaWYgKCttaW4gPD0gaXQucHJpY2UgJiYgaXQucHJpY2UgPD0gK21heCkge1xyXG4gICAgICAgIFRlbXBBcnJheS5wdXNoKGl0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLkRhdGFBZnRlckZpbHRlcnMgPSBUZW1wQXJyYXk7XHJcbiAgfVxyXG4gIGRhdGUobWluOiBzdHJpbmcsIG1heDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBUZW1wQXJyYXk6IHByb2R1Y3RbXSA9IFtdO1xyXG4gICAgdGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzLmZvckVhY2goKGl0KSA9PiB7XHJcbiAgICAgIGlmICgrbWluIDw9IGl0LkRhdGVPZklzc3VlICYmIGl0LkRhdGVPZklzc3VlIDw9ICttYXgpIHtcclxuICAgICAgICBUZW1wQXJyYXkucHVzaChpdCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzID0gVGVtcEFycmF5O1xyXG4gIH1cclxuICBzZWFyY2goc2VhcmNoOiBzdHJpbmcpIHtcclxuICAgIHNlYXJjaCA9IHNlYXJjaC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgY29uc3QgVGVtcEFycmF5OiBwcm9kdWN0W10gPSBbXTtcclxuICAgIHRoaXMuRGF0YUFmdGVyRmlsdGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGlmIChpdGVtLmNhdGVnb3J5LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoKSkge1xyXG4gICAgICAgIFRlbXBBcnJheS5wdXNoKGl0ZW0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGl0ZW0uYnJhbmQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2gpKSB7XHJcbiAgICAgICAgVGVtcEFycmF5LnB1c2goaXRlbSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5wcmljZS50b1N0cmluZygpLmluY2x1ZGVzKHNlYXJjaCkpIHtcclxuICAgICAgICBUZW1wQXJyYXkucHVzaChpdGVtKTtcclxuICAgICAgfSBlbHNlIGlmIChpdGVtLkRhdGVPZklzc3VlLnRvU3RyaW5nKCkuaW5jbHVkZXMoc2VhcmNoKSkge1xyXG4gICAgICAgIFRlbXBBcnJheS5wdXNoKGl0ZW0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGl0ZW0ubW9kZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2gpKSB7XHJcbiAgICAgICAgVGVtcEFycmF5LnB1c2goaXRlbSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5kZXNjcmlwdGlvbi50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaCkpIHtcclxuICAgICAgICBUZW1wQXJyYXkucHVzaChpdGVtKTtcclxuICAgICAgfSBlbHNlIGlmIChpdGVtLmRpc2NvdW50UGVyY2VudGFnZS50b1N0cmluZygpLmluY2x1ZGVzKHNlYXJjaCkpIHtcclxuICAgICAgICBUZW1wQXJyYXkucHVzaChpdGVtKTtcclxuICAgICAgfSBlbHNlIGlmIChpdGVtLnJhdGluZy50b1N0cmluZygpLmluY2x1ZGVzKHNlYXJjaCkpIHtcclxuICAgICAgICBUZW1wQXJyYXkucHVzaChpdGVtKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLkRhdGFBZnRlckZpbHRlcnMgPSBUZW1wQXJyYXk7XHJcbiAgfVxyXG4gIHN3YXAoZmlyc3Q6IHByb2R1Y3QsIHNlY29uZDogcHJvZHVjdCkge1xyXG4gICAgY29uc3QgdGVtcDogcHJvZHVjdCA9IGZpcnN0O1xyXG4gICAgZmlyc3QgPSBzZWNvbmQ7XHJcbiAgICBzZWNvbmQgPSB0ZW1wO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBBcHBseUZpbHRlcnMgfSBmcm9tICcuL0FwcGx5RmlsdGVycyc7XHJcbmltcG9ydCB7IEFwcGx5U29ydCB9IGZyb20gJy4vQXBwbHlTb3J0JztcclxuaW1wb3J0IHsgQmFza2V0UGFnZSB9IGZyb20gJy4vQmFza2V0UGFnZSc7XHJcbmltcG9ydCB7IENhcmRQYWdlIH0gZnJvbSAnLi9DYXJkUGFnZSc7XHJcbmltcG9ydCB7IENyZWF0ZUNhcnRJdGVtIH0gZnJvbSAnLi9Db21wb25lbnRzL0NyZWF0ZUNhcnRJdGVtJztcclxuaW1wb3J0IHsgQ3JlYXRlTGlzdE9mQ2FyZHMgfSBmcm9tICcuL0NyZWF0ZUxpc3RPZkNhcmRzJztcclxuaW1wb3J0IGRhdGEgZnJvbSAnLi9kYXRhJztcclxuaW1wb3J0IENyZWF0ZURlZmF1bHRQYWdlIGZyb20gJy4vRGVmYXVsdFBhZ2UnO1xyXG5pbXBvcnQgeyBmaWx0ZXJzIH0gZnJvbSAnLi9JbnRlcmZhY2VzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBseVJvdXRpbmcge1xyXG4gIHByaXZhdGUgTWFpblBhZ2UgPSBuZXcgQ3JlYXRlRGVmYXVsdFBhZ2UoKTtcclxuICBwcml2YXRlIHByb2R1Y3RzID0gbmV3IGRhdGEoKTtcclxuICBwcml2YXRlIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG4gIHByaXZhdGUgY2hlY2tlciA9IGZhbHNlO1xyXG4gIHByaXZhdGUgVG9QYWdlcyA9IGZhbHNlO1xyXG4gIHByaXZhdGUgaXNDaGFuZ2VQcmljZSA9IGZhbHNlO1xyXG4gIHByaXZhdGUgTGltaXRQYWdlID0ge1xyXG4gICAgbGltaXQ6IDMsXHJcbiAgICBwYWdlOiAxLFxyXG4gIH07XHJcbiAgcHJpdmF0ZSBmaWx0ZXJzOiBmaWx0ZXJzID0ge1xyXG4gICAgQ2F0ZWdvcnk6IFtdLFxyXG4gICAgQnJhbmQ6IFtdLFxyXG4gICAgTWluUHJpY2U6IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4UHJpY2UoKS5taW4sXHJcbiAgICBNYXhQcmljZTogdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhQcmljZSgpLm1heCxcclxuICAgIE1pblllYXI6IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4RGF0ZSgpLm1pbixcclxuICAgIE1heFllYXI6IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4RGF0ZSgpLm1heCxcclxuICAgIFNlYXJjaDogJycsXHJcbiAgICBTb3J0OiAnU29ydCBieScsXHJcbiAgfTtcclxuXHJcbiAgaW5pdChoYXNoOiBzdHJpbmcpIHtcclxuICAgIGlmIChoYXNoWzFdID09PSAnPycpIHtcclxuICAgICAgdGhpcy5jcmVhdGVGaWx0ZXJzKGhhc2gpO1xyXG4gICAgICBpZiAoZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzWzJdKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzWzJdLnJlbW92ZSgpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1syXS5yZW1vdmUoKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBkYXRhID0gbmV3IEFwcGx5RmlsdGVycyh0aGlzLmZpbHRlcnMpLnJldHVybigpO1xyXG4gICAgICB0aGlzLk1haW5QYWdlLkNyZWF0ZU1haW4odGhpcy5maWx0ZXJzLCBkYXRhKTtcclxuICAgICAgY29uc3QgRGF0YVNvcnQgPSBuZXcgQXBwbHlTb3J0KHRoaXMuZmlsdGVycy5Tb3J0LCBkYXRhKTtcclxuICAgICAgbmV3IENyZWF0ZUxpc3RPZkNhcmRzKERhdGFTb3J0LnJldHVybigpKTtcclxuICAgICAgdGhpcy5NYWluUGFnZS5DcmVhdGVGb290ZXIoKTtcclxuICAgIH1cclxuICAgIGlmIChoYXNoLnNwbGl0KCctJylbMF0gPT09ICcjY2FyZCcpIHtcclxuICAgICAgaWYgKHRoaXMuYm9keS5jaGlsZHJlblsxXSAmJiB0aGlzLmJvZHkuY2hpbGRyZW5bMl0pIHtcclxuICAgICAgICB0aGlzLmJvZHkuY2hpbGRyZW5bMl0ucmVtb3ZlKCk7XHJcbiAgICAgICAgdGhpcy5ib2R5LmNoaWxkcmVuWzFdLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIG5ldyBDYXJkUGFnZSh0aGlzLnByb2R1Y3RzLkdldEJ5SWQoaGFzaC5zcGxpdCgnLScpWzFdKSk7XHJcbiAgICAgIHRoaXMuTWFpblBhZ2UuQ3JlYXRlRm9vdGVyKCk7XHJcbiAgICB9XHJcbiAgICBpZiAoaGFzaCA9PT0gJycpIHtcclxuICAgICAgdGhpcy5Ub0RlZmF1bHRGaWx0ZXJzKCk7XHJcbiAgICAgIHRoaXMuTWFpblBhZ2UgPSBuZXcgQ3JlYXRlRGVmYXVsdFBhZ2UoKTtcclxuICAgICAgaWYgKGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1syXSkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1syXS5yZW1vdmUoKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMl0ucmVtb3ZlKCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgZGF0YSA9IG5ldyBBcHBseUZpbHRlcnModGhpcy5maWx0ZXJzKS5yZXR1cm4oKTtcclxuXHJcbiAgICAgIGNvbnN0IERhdGFTb3J0ID0gbmV3IEFwcGx5U29ydCh0aGlzLmZpbHRlcnMuU29ydCwgZGF0YSk7XHJcbiAgICAgIHRoaXMuTWFpblBhZ2UuQ3JlYXRlTWFpbih0aGlzLmZpbHRlcnMsIERhdGFTb3J0LnJldHVybigpKTtcclxuICAgICAgbmV3IENyZWF0ZUxpc3RPZkNhcmRzKERhdGFTb3J0LnJldHVybigpKTtcclxuICAgICAgdGhpcy5NYWluUGFnZS5DcmVhdGVGb290ZXIoKTtcclxuICAgICAgdGhpcy5jaGVja2VyID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChoYXNoID09PSAnI2Jhc2tldCcpIHtcclxuICAgICAgdGhpcy5jaGVja2VyID0gdHJ1ZTtcclxuICAgICAgaWYgKHRoaXMuYm9keS5jaGlsZHJlblsxXSAmJiB0aGlzLmJvZHkuY2hpbGRyZW5bMl0pIHtcclxuICAgICAgICB0aGlzLmJvZHkuY2hpbGRyZW5bMl0ucmVtb3ZlKCk7XHJcbiAgICAgICAgdGhpcy5ib2R5LmNoaWxkcmVuWzFdLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIG5ldyBCYXNrZXRQYWdlKDMsIDEpO1xyXG4gICAgICBuZXcgQ3JlYXRlQ2FydEl0ZW0oMywgMSk7XHJcbiAgICAgIHRoaXMuTWFpblBhZ2UuQ3JlYXRlRm9vdGVyKCk7XHJcbiAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZnJvbWNhcmQnKSA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1eWl0bm93QnRuJyk/LmNsaWNrKCk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Zyb21jYXJkJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChoYXNoWzddID09PSAnIScpIHtcclxuICAgICAgaWYgKHRoaXMuYm9keS5jaGlsZHJlblsxXSAmJiB0aGlzLmJvZHkuY2hpbGRyZW5bMl0pIHtcclxuICAgICAgICB0aGlzLmJvZHkuY2hpbGRyZW5bMl0ucmVtb3ZlKCk7XHJcbiAgICAgICAgdGhpcy5ib2R5LmNoaWxkcmVuWzFdLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGZpbHQgPSBoYXNoLnNwbGl0KCchJylbMV07XHJcbiAgICAgIGlmIChmaWx0LmluY2x1ZGVzKCcmJykpIHtcclxuICAgICAgICB0aGlzLkxpbWl0UGFnZS5saW1pdCA9ICtmaWx0LnNwbGl0KCcmJylbMF0uc3BsaXQoJz0nKVsxXTtcclxuICAgICAgICB0aGlzLkxpbWl0UGFnZS5wYWdlID0gK2ZpbHQuc3BsaXQoJyYnKVsxXS5zcGxpdCgnPScpWzFdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChmaWx0LmluY2x1ZGVzKCdsaW1pdCcpKSB7XHJcbiAgICAgICAgICB0aGlzLkxpbWl0UGFnZS5saW1pdCA9ICtmaWx0LnNwbGl0KCc9JylbMV07XHJcbiAgICAgICAgICB0aGlzLkxpbWl0UGFnZS5wYWdlID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5MaW1pdFBhZ2UucGFnZSA9ICtmaWx0LnNwbGl0KCc9JylbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vY29uc29sZS5sb2codGhpcy5MaW1pdFBhZ2UpO1xyXG4gICAgICBuZXcgQmFza2V0UGFnZSh0aGlzLkxpbWl0UGFnZS5saW1pdCwgdGhpcy5MaW1pdFBhZ2UucGFnZSk7XHJcbiAgICAgIG5ldyBDcmVhdGVDYXJ0SXRlbSh0aGlzLkxpbWl0UGFnZS5saW1pdCwgdGhpcy5MaW1pdFBhZ2UucGFnZSk7XHJcbiAgICAgIHRoaXMuTWFpblBhZ2UuQ3JlYXRlRm9vdGVyKCk7XHJcbiAgICB9XHJcbiAgICAvLy9maWx0ZXJzLy8vXHJcblxyXG4gICAgLy8vQ2F0ZWdvcnkvLy9cclxuICAgIC8vIGlmIChpZC5zcGxpdCgnPScpWzBdID09PSAnQ2F0ZWdvcnknKSB7XHJcbiAgICAvLyAgIGlmKCF0aGlzLmZpbHRlcnMuQ2F0ZWdvcnkuaW5jbHVkZXMoaWQuc3BsaXQoJz0nKVsxXSkpe1xyXG4gICAgLy8gICAgIHRoaXMuZmlsdGVycy5DYXRlZ29yeS5wdXNoKGlkLnNwbGl0KCc9JylbMV0pO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcbiAgICAvLyBpZiAodGhpcy5jaGVja2VyID09PSBmYWxzZSkge1xyXG4gICAgLy8gfVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlRmlsdGVycyhoYXNoOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IEFycmF5RmlsdGVyczogc3RyaW5nW10gPSBoYXNoLnNsaWNlKDIpLnNwbGl0KCcmJyk7XHJcbiAgICB0aGlzLlRvRGVmYXVsdEZpbHRlcnMoKTtcclxuICAgIEFycmF5RmlsdGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleTogc3RyaW5nID0gaXRlbS5zcGxpdCgnPScpWzBdO1xyXG4gICAgICBjb25zdCB2YWx1ZXM6IHN0cmluZyA9IGl0ZW0uc3BsaXQoJz0nKVsxXTtcclxuICAgICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICBjYXNlICdDYXRlZ29yeSc6XHJcbiAgICAgICAgICB0aGlzLmZpbHRlcnMuQ2F0ZWdvcnkgPSB2YWx1ZXMuc3BsaXQoJysnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0JyYW5kJzpcclxuICAgICAgICAgIHRoaXMuZmlsdGVycy5CcmFuZCA9IHZhbHVlcy5zcGxpdCgnKycpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnUHJpY2UnOlxyXG4gICAgICAgICAgdGhpcy5maWx0ZXJzLk1pblByaWNlID0gdmFsdWVzLnNwbGl0KCcrJylbMF07XHJcbiAgICAgICAgICB0aGlzLmZpbHRlcnMuTWF4UHJpY2UgPSB2YWx1ZXMuc3BsaXQoJysnKVsxXTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0RhdGUnOlxyXG4gICAgICAgICAgdGhpcy5maWx0ZXJzLk1pblllYXIgPSB2YWx1ZXMuc3BsaXQoJysnKVswXTtcclxuICAgICAgICAgIHRoaXMuZmlsdGVycy5NYXhZZWFyID0gdmFsdWVzLnNwbGl0KCcrJylbMV07XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdTZWFyY2gnOlxyXG4gICAgICAgICAgdGhpcy5maWx0ZXJzLlNlYXJjaCA9IGRlY29kZVVSSSh2YWx1ZXMpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnU29ydCc6XHJcbiAgICAgICAgICB0aGlzLmZpbHRlcnMuU29ydCA9IHZhbHVlcztcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIFRvRGVmYXVsdEZpbHRlcnMoKSB7XHJcbiAgICB0aGlzLmZpbHRlcnMuQnJhbmQgPSBbXTtcclxuICAgIHRoaXMuZmlsdGVycy5DYXRlZ29yeSA9IFtdO1xyXG4gICAgdGhpcy5maWx0ZXJzLk1pblByaWNlID0gdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhQcmljZSgpLm1pbjtcclxuICAgIHRoaXMuZmlsdGVycy5NYXhQcmljZSA9IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4UHJpY2UoKS5tYXg7XHJcbiAgICB0aGlzLmZpbHRlcnMuTWluWWVhciA9IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4RGF0ZSgpLm1pbjtcclxuICAgIHRoaXMuZmlsdGVycy5NYXhZZWFyID0gdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhEYXRlKCkubWF4O1xyXG4gICAgdGhpcy5maWx0ZXJzLlNlYXJjaCA9ICcnO1xyXG4gICAgdGhpcy5maWx0ZXJzLlNvcnQgPSAnU29ydCBieSc7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IHByb2R1Y3QgfSBmcm9tICcuL0ludGVyZmFjZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcGx5U29ydCB7XHJcbiAgcHJpdmF0ZSBEYXRhQWZ0ZXJGaWx0ZXJzOiBwcm9kdWN0W10gPSBbXTtcclxuICAvL3ByaXZhdGVcclxuICBjb25zdHJ1Y3Rvcihzb3J0OiBzdHJpbmcsIHByb2R1Y3RzOiBwcm9kdWN0W10pIHtcclxuICAgIHRoaXMuRGF0YUFmdGVyRmlsdGVycyA9IHByb2R1Y3RzO1xyXG4gICAgaWYgKHNvcnQgIT09ICdTb3J0IGJ5Jykge1xyXG4gICAgICBzd2l0Y2ggKHNvcnQpIHtcclxuICAgICAgICBjYXNlICdSYXRpbmcnOlxyXG4gICAgICAgICAgdGhpcy5Tb3J0QnlSYXRpbmcodGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ1ByaWNlVEgnOlxyXG4gICAgICAgICAgdGhpcy5Tb3J0QnlQcmljZUx0b0godGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ1ByaWNlVEwnOlxyXG4gICAgICAgICAgdGhpcy5Tb3J0QnlQcmljZUh0b0wodGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ1JEJzpcclxuICAgICAgICAgIHRoaXMuU29ydEJ5UmVsZWFzZURhdGUodGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAvL3RoaXMuU29ydEJ5SUQodGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc29ydCA9PT0gJ1NvcnQgYnknKSB7XHJcbiAgICAgIHRoaXMuU29ydEJ5SUQodGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybigpIHtcclxuICAgIHJldHVybiB0aGlzLkRhdGFBZnRlckZpbHRlcnM7XHJcbiAgfVxyXG5cclxuICBTb3J0QnlSYXRpbmcocHJvZHVjdHM6IHByb2R1Y3RbXSkge1xyXG4gICAgbGV0IGNvdW50ZXIgPSAxO1xyXG4gICAgbGV0IHRlbXA6IHByb2R1Y3Q7XHJcbiAgICBmb3IgKGxldCBrID0gMDsgayA8IHByb2R1Y3RzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSBjb3VudGVyOyBpIDwgcHJvZHVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAocHJvZHVjdHNba10ucmF0aW5nID4gcHJvZHVjdHNbaV0ucmF0aW5nKSB7XHJcbiAgICAgICAgICB0ZW1wID0gcHJvZHVjdHNba107XHJcbiAgICAgICAgICBwcm9kdWN0c1trXSA9IHByb2R1Y3RzW2ldO1xyXG4gICAgICAgICAgcHJvZHVjdHNbaV0gPSB0ZW1wO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb3VudGVyICs9IDE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBTb3J0QnlJRChwcm9kdWN0czogcHJvZHVjdFtdKSB7XHJcbiAgICBsZXQgY291bnRlciA9IDE7XHJcbiAgICBsZXQgdGVtcDogcHJvZHVjdDtcclxuICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcHJvZHVjdHMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgZm9yIChsZXQgaSA9IGNvdW50ZXI7IGkgPCBwcm9kdWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChwcm9kdWN0c1trXS5pZCA+IHByb2R1Y3RzW2ldLmlkKSB7XHJcbiAgICAgICAgICB0ZW1wID0gcHJvZHVjdHNba107XHJcbiAgICAgICAgICBwcm9kdWN0c1trXSA9IHByb2R1Y3RzW2ldO1xyXG4gICAgICAgICAgcHJvZHVjdHNbaV0gPSB0ZW1wO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb3VudGVyICs9IDE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBTb3J0QnlQcmljZUx0b0gocHJvZHVjdHM6IHByb2R1Y3RbXSkge1xyXG4gICAgbGV0IGNvdW50ZXIgPSAxO1xyXG4gICAgbGV0IHRlbXA6IHByb2R1Y3Q7XHJcbiAgICBmb3IgKGxldCBrID0gMDsgayA8IHByb2R1Y3RzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSBjb3VudGVyOyBpIDwgcHJvZHVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAocHJvZHVjdHNba10ucHJpY2UgPiBwcm9kdWN0c1tpXS5wcmljZSkge1xyXG4gICAgICAgICAgdGVtcCA9IHByb2R1Y3RzW2tdO1xyXG4gICAgICAgICAgcHJvZHVjdHNba10gPSBwcm9kdWN0c1tpXTtcclxuICAgICAgICAgIHByb2R1Y3RzW2ldID0gdGVtcDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY291bnRlciArPSAxO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgU29ydEJ5UHJpY2VIdG9MKHByb2R1Y3RzOiBwcm9kdWN0W10pIHtcclxuICAgIGxldCBjb3VudGVyID0gMTtcclxuICAgIGxldCB0ZW1wOiBwcm9kdWN0O1xyXG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCBwcm9kdWN0cy5sZW5ndGg7IGsrKykge1xyXG4gICAgICBmb3IgKGxldCBpID0gY291bnRlcjsgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHByb2R1Y3RzW2tdLnByaWNlIDwgcHJvZHVjdHNbaV0ucHJpY2UpIHtcclxuICAgICAgICAgIHRlbXAgPSBwcm9kdWN0c1trXTtcclxuICAgICAgICAgIHByb2R1Y3RzW2tdID0gcHJvZHVjdHNbaV07XHJcbiAgICAgICAgICBwcm9kdWN0c1tpXSA9IHRlbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvdW50ZXIgKz0gMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFNvcnRCeVJlbGVhc2VEYXRlKHByb2R1Y3RzOiBwcm9kdWN0W10pIHtcclxuICAgIGxldCBjb3VudGVyID0gMTtcclxuICAgIGxldCB0ZW1wOiBwcm9kdWN0O1xyXG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCBwcm9kdWN0cy5sZW5ndGg7IGsrKykge1xyXG4gICAgICBmb3IgKGxldCBpID0gY291bnRlcjsgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHByb2R1Y3RzW2tdLkRhdGVPZklzc3VlID4gcHJvZHVjdHNbaV0uRGF0ZU9mSXNzdWUpIHtcclxuICAgICAgICAgIHRlbXAgPSBwcm9kdWN0c1trXTtcclxuICAgICAgICAgIHByb2R1Y3RzW2tdID0gcHJvZHVjdHNbaV07XHJcbiAgICAgICAgICBwcm9kdWN0c1tpXSA9IHRlbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvdW50ZXIgKz0gMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN3YXAoZmlyc3Q6IHByb2R1Y3QsIHNlY29uZDogcHJvZHVjdCkge1xyXG4gICAgY29uc3QgdGVtcDogcHJvZHVjdCA9IGZpcnN0O1xyXG4gICAgZmlyc3QgPSBzZWNvbmQ7XHJcbiAgICBzZWNvbmQgPSB0ZW1wO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDcmVhdGVDaGVja291dFBvcHVwIH0gZnJvbSAnLi9DaGVja291dFBvcHVwJztcclxuaW1wb3J0IHsgQ3JlYXRlRWxlbWVudCB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlRWxlbWVudCc7XHJcbmltcG9ydCB7IENyZWF0ZVRleHRJbnB1dCB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlVGV4dElucHV0JztcclxuaW1wb3J0IHsgcHJvZHVjdCB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi9yb3V0ZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFza2V0UGFnZSB7XHJcbiAgcHJpdmF0ZSByb3V0ZSA9IG5ldyBSb3V0ZXIoKTtcclxuICBjb25zdHJ1Y3RvcihEZWZhdWx0TGltaXQ6IG51bWJlciwgRGVmYXVsdFBhZ2U6IG51bWJlcikge1xyXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpICE9PSBudWxsICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpPy5sZW5ndGggIT09IDIpIHtcclxuICAgICAgbGV0IFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZTogcHJvZHVjdFtdID0gW107XHJcbiAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykhKTtcclxuICAgICAgY29uc3QgcGFnZXMgPSBNYXRoLmNlaWwoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLmxlbmd0aCAvIERlZmF1bHRMaW1pdCk7XHJcbiAgICAgIGxldCB0b3RhbHByaWNlID0gMDtcclxuICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICB0b3RhbHByaWNlICs9IGl0ZW0uY291bnRlciAqIGl0ZW0ucHJpY2U7XHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgY29uc3QgbWFpbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnbWFpbicsIGNsYXNzTmFtZTogJ21haW4nIH0pLmdldG5vZGUoKTtcclxuICAgICAgYm9keS5hcHBlbmQobWFpbik7XHJcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3dyYXBwZXIgbWFpbl9fd3JhcHBlciBjYXJ0X193cmFwcGVyJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIG1haW4uYXBwZW5kKHdyYXBwZXIpO1xyXG5cclxuICAgICAgY29uc3QgbWVudSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnbWVudScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICAvLyB3cmFwcGVyLmFwcGVuZChtZW51KTtcclxuICAgICAgLy9jb25zdCBUZXh0TWVudSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnaDInLCBjbGFzc05hbWU6ICd0ZXh0bWVudScsIGNvbnRlbnQ6ICdQcm9kdWN0cyBJbiBDYXJ0JyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGNvbnN0IGxpbWl0ID0gbmV3IENyZWF0ZVRleHRJbnB1dCh7XHJcbiAgICAgICAgdHlwZTogJ251bWJlcicsXHJcbiAgICAgICAgcGxhY2Vob2xkZXI6ICczJyxcclxuICAgICAgICBjbGFzc05hbWU6ICdsaW1pdCcsXHJcbiAgICAgICAgbmFtZTogJ2xpbWl0JyxcclxuICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBwYWdlID0gbmV3IENyZWF0ZVRleHRJbnB1dCh7IHR5cGU6ICdudW1iZXInLCBwbGFjZWhvbGRlcjogJzEnLCBjbGFzc05hbWU6ICdwYWdlJywgbmFtZTogJ3BhZ2UnIH0pLmdldG5vZGUoKTtcclxuICAgICAgY29uc3QgTGltaXRTcGFuID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY29udGVudDogJ0xpbWl0OicgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBQYWdlU3BhbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNvbnRlbnQ6ICdQYWdlOicgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBsaW1pdC52YWx1ZSA9IERlZmF1bHRMaW1pdC50b1N0cmluZygpO1xyXG4gICAgICBsaW1pdC5taW4gPSAnMSc7XHJcbiAgICAgIGxpbWl0Lm1heCA9IFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5sZW5ndGgudG9TdHJpbmcoKTtcclxuICAgICAgcGFnZS52YWx1ZSA9IERlZmF1bHRQYWdlLnRvU3RyaW5nKCk7XHJcbiAgICAgIHBhZ2UubWluID0gJzEnO1xyXG4gICAgICBwYWdlLm1heCA9IHBhZ2VzLnRvU3RyaW5nKCk7XHJcbiAgICAgIGxpbWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucm91dGUuQWRkUm91dGluZ0luQmFza2V0KCtsaW1pdC52YWx1ZSwgK3BhZ2UudmFsdWUpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JylbMV0udmFsdWUpXHJcbiAgICAgIH0pO1xyXG4gICAgICBwYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucm91dGUuQWRkUm91dGluZ0luQmFza2V0KCtsaW1pdC52YWx1ZSwgK3BhZ2UudmFsdWUpO1xyXG4gICAgICB9KTtcclxuICAgICAgbWVudS5hcHBlbmQoLypUZXh0TWVudSovIExpbWl0U3BhbiwgbGltaXQsIFBhZ2VTcGFuLCBwYWdlKTtcclxuXHJcbiAgICAgIGNvbnN0IExpc3RPZlByb2R1Y3RzID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdjYXJ0X19pdGVtcycsIGlkOiAnY2FydC1pdGVtcycgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBzdW1tYXJ5ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdjYXJ0X19zdW1tYXJ5JyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIExpc3RPZlByb2R1Y3RzLmFwcGVuZChtZW51KTtcclxuICAgICAgLy8vLy8vIFNVTU1BUlkgLy8vLy8vXHJcbiAgICAgIGNvbnN0IHN1bW1hcnlXcmFwcGVyID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzdW1tYXJ5X193cmFwcGVyJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIHN1bW1hcnkuYXBwZW5kKHN1bW1hcnlXcmFwcGVyKTtcclxuICAgICAgY29uc3QgcHJvbW9jb2RlID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzdW1tYXJ5X19wcm9tb2NvZGUnIH0pLmdldG5vZGUoKTtcclxuICAgICAgY29uc3QgcHJvbW9jb2RlVGl0bGUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgICAgY2xhc3NOYW1lOiAnc3VtbWFyeV9fdGl0bGUnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICdQcm9tbyBDb2RlJyxcclxuICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBwcm9tb2NvZGVBcmVhID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzdW1tYXJ5X19wcm9tb2NvZGUtYXJlYScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBwcm9tb2NvZGVJbnB1dCA9IG5ldyBDcmVhdGVUZXh0SW5wdXQoe1xyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICBwbGFjZWhvbGRlcjogJ2JhbGF4b24gfCBlbmF5YWFtZScsXHJcbiAgICAgICAgbmFtZTogJ3Byb21vY29kZScsXHJcbiAgICAgICAgY2xhc3NOYW1lOiAnc3VtbWFyeV9fcHJvbW9jb2RlLWlucHV0JyxcclxuICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBwcm9tb2NvZGVCdXR0b24gPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgICAgdGFnOiAnYnV0dG9uJyxcclxuICAgICAgICBjbGFzc05hbWU6ICdzdW1tYXJ5X19wcm9tb2NvZGUtYnV0dG9uJyxcclxuICAgICAgICBjb250ZW50OiAnYWRkJyxcclxuICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBwcm9tb2NvZGVUZXh0QXJlYSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc3VtbWFyeV9fdGV4dC1hcmVhJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIHByb21vY29kZUFyZWEuYXBwZW5kKHByb21vY29kZUlucHV0LCBwcm9tb2NvZGVCdXR0b24pO1xyXG4gICAgICBwcm9tb2NvZGUuYXBwZW5kKHByb21vY29kZVRpdGxlLCBwcm9tb2NvZGVBcmVhLCBwcm9tb2NvZGVUZXh0QXJlYSk7XHJcbiAgICAgIGNvbnN0IG9yZGVyU3VtbWFyeSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc3VtbWFyeV9fb3JkZXItc3VtbWFyeScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBvcmRlclRpdGxlID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICAgIHRhZzogJ3NwYW4nLFxyXG4gICAgICAgIGNsYXNzTmFtZTogJ3N1bW1hcnlfX3RpdGxlJyxcclxuICAgICAgICBjb250ZW50OiAnT3JkZXIgc3VtbWFyeScsXHJcbiAgICAgIH0pLmdldG5vZGUoKTtcclxuICAgICAgY29uc3Qgb3JkZXJUZXh0QXJlYSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc3VtbWFyeV9fdGV4dC1hcmVhJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGNvbnN0IG9yZGVyU3VidG90YWwgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N1bW1hcnlfX2xpJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGNvbnN0IHN1bW1hcnlPcmRlcjFMZWZ0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY29udGVudDogJ1N1YnRvdGFsJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGNvbnN0IHN1bW1hcnlPcmRlcjFSaWdodCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc3VtbWFyeV9fcHJpY2UtY2hhbmdlJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGNvbnN0IHN1bW1hcnlQcmljZSA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgICB0YWc6ICdzcGFuJyxcclxuICAgICAgICBjb250ZW50OiAnJCAnICsgdG90YWxwcmljZS50b1N0cmluZygpLFxyXG4gICAgICAgIGlkOiAnc3VidG90YWwtcHJpY2UnLFxyXG4gICAgICB9KS5nZXRub2RlKCk7XHJcbiAgICAgIHN1bW1hcnlPcmRlcjFSaWdodC5hcHBlbmQoc3VtbWFyeVByaWNlKTtcclxuICAgICAgb3JkZXJTdWJ0b3RhbC5hcHBlbmQoc3VtbWFyeU9yZGVyMUxlZnQsIHN1bW1hcnlPcmRlcjFSaWdodCk7XHJcbiAgICAgIGNvbnN0IG9yZGVyU2hpcHBpbmcgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N1bW1hcnlfX2xpJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGNvbnN0IHN1bW1hcnlPcmRlcjJMZWZ0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY29udGVudDogJ1NoaXBwaW5nJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGNvbnN0IHN1bW1hcnlPcmRlcjJSaWdodCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNvbnRlbnQ6ICckIDIwJyB9KS5nZXRub2RlKCk7XHJcblxyXG4gICAgICBvcmRlclNoaXBwaW5nLmFwcGVuZChzdW1tYXJ5T3JkZXIyTGVmdCwgc3VtbWFyeU9yZGVyMlJpZ2h0KTtcclxuICAgICAgb3JkZXJUZXh0QXJlYS5hcHBlbmQob3JkZXJTdWJ0b3RhbCwgb3JkZXJTaGlwcGluZyk7XHJcbiAgICAgIG9yZGVyU3VtbWFyeS5hcHBlbmQob3JkZXJUaXRsZSwgb3JkZXJUZXh0QXJlYSk7XHJcblxyXG4gICAgICBjb25zdCB0b3RhbCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc3VtbWFyeV9fdG90YWwnIH0pLmdldG5vZGUoKTtcclxuICAgICAgY29uc3QgdG90YWxUaXRsZSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNsYXNzTmFtZTogJ3N1bW1hcnlfX3RpdGxlJywgY29udGVudDogJ1RvdGFsJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGNvbnN0IHRvdGFsUHJpY2UgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgICAgY2xhc3NOYW1lOiAnc3VtbWFyeV9fdGl0bGUnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICckICcgKyAodG90YWxwcmljZSArIDIwKS50b1N0cmluZygpLFxyXG4gICAgICAgIGlkOiAnc3VtbWFyeS10b3RhbCcsXHJcbiAgICAgIH0pLmdldG5vZGUoKTtcclxuXHJcbiAgICAgIHRvdGFsLmFwcGVuZCh0b3RhbFRpdGxlLCB0b3RhbFByaWNlKTtcclxuXHJcbiAgICAgIGNvbnN0IGNoZWNrb3V0QnV0dG9uID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICAgIHRhZzogJ2J1dHRvbicsXHJcbiAgICAgICAgY2xhc3NOYW1lOiAnc3VtbWFyeV9fY2hlY2tvdXQtYnV0dG9uJyxcclxuICAgICAgICBpZDogJ2J1eWl0bm93QnRuJyxcclxuICAgICAgICBjb250ZW50OiAnR28gdG8gY2hlY2tvdXQnLFxyXG4gICAgICB9KS5nZXRub2RlKCk7XHJcblxyXG4gICAgICBzdW1tYXJ5V3JhcHBlci5hcHBlbmQocHJvbW9jb2RlLCBvcmRlclN1bW1hcnksIHRvdGFsLCBjaGVja291dEJ1dHRvbik7XHJcbiAgICAgIHdyYXBwZXIuYXBwZW5kKExpc3RPZlByb2R1Y3RzLCBzdW1tYXJ5KTtcclxuXHJcbiAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgY2hlY2tvdXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAncG9wdXBfX292ZXJsYXknIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBjb25zdCBwb3B1cCA9IG5ldyBDcmVhdGVDaGVja291dFBvcHVwKCkuZ2V0bm9kZSgpO1xyXG4gICAgICAgIG92ZXJsYXkuYXBwZW5kKHBvcHVwKTtcclxuICAgICAgICBib2R5LmFwcGVuZChvdmVybGF5KTtcclxuICAgICAgICBib2R5LnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nO1xyXG4gICAgICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKChlLnRhcmdldCBhcyBIVE1MRWxlbWVudCkuY2xhc3NMaXN0LmNvbnRhaW5zKCdwb3B1cF9fb3ZlcmxheScpKSB7XHJcbiAgICAgICAgICAgIHBvcHVwLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBvdmVybGF5LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBib2R5LnN0eWxlLm92ZXJmbG93WSA9ICdhdXRvJztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgIGxldCBiYWxheG9uID0gJyc7XHJcbiAgICAgIGxldCBlbmF5YWFtZSA9ICcnO1xyXG4gICAgICBsZXQgYmFsYXhvbkNvdW50ZXIgPSAwO1xyXG4gICAgICBsZXQgZW5heWFhbWVDb3VudGVyID0gMDtcclxuICAgICAgbGV0IHNhbGUgPSAwO1xyXG4gICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiYWxheG9uJykgIT09IG51bGwpIHtcclxuICAgICAgICBiYWxheG9uID0gJ2JhbGF4b24nO1xyXG4gICAgICAgIGJhbGF4b25Db3VudGVyID0gK3dpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmFsYXhvbicpITtcclxuICAgICAgfVxyXG4gICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlbmF5YWFtZScpICE9PSBudWxsKSB7XHJcbiAgICAgICAgZW5heWFhbWUgPSAnZW5heWFhbWUnO1xyXG4gICAgICAgIGVuYXlhYW1lQ291bnRlciA9ICt3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2VuYXlhYW1lJykhO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYmFsYXhvbiA9PT0gJ2JhbGF4b24nICYmIGJhbGF4b25Db3VudGVyID09PSAxKSB7XHJcbiAgICAgICAgY29uc3QgcHJvbW9jb2RlID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzdW1tYXJ5X19saScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICAgIGNvbnN0IHN1bW1hcnlQcm9tb2NvZGUxTGVmdCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNvbnRlbnQ6IGJhbGF4b24gfSkuZ2V0bm9kZSgpO1xyXG4gICAgICAgIGNvbnN0IHN1bW1hcnlQcm9tb2NvZGUxUmlnaHQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBjb250ZW50OiAnLTEwJScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICAgIGNvbnN0IGJhbGF4b25EZWwgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgICAgICB0YWc6ICdidXR0b24nLFxyXG4gICAgICAgICAgY2xhc3NOYW1lOiAnc3VtbWFyeV9fcHJvbW9jb2RlLWJ1dHRvbicsXHJcbiAgICAgICAgICBjb250ZW50OiAnZGVsJyxcclxuICAgICAgICB9KS5nZXRub2RlKCk7XHJcbiAgICAgICAgYmFsYXhvbkRlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYmFsYXhvbicpO1xyXG4gICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcHJvbW9jb2RlLmFwcGVuZChzdW1tYXJ5UHJvbW9jb2RlMUxlZnQsIHN1bW1hcnlQcm9tb2NvZGUxUmlnaHQsIGJhbGF4b25EZWwpO1xyXG4gICAgICAgIHByb21vY29kZVRleHRBcmVhLmFwcGVuZChwcm9tb2NvZGUpO1xyXG4gICAgICAgIHNhbGUgKz0gMC4xO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZW5heWFhbWUgPT09ICdlbmF5YWFtZScgJiYgZW5heWFhbWVDb3VudGVyID09PSAxKSB7XHJcbiAgICAgICAgY29uc3QgcHJvbW9jb2RlID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzdW1tYXJ5X19saScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICAgIGNvbnN0IHN1bW1hcnlQcm9tb2NvZGUxTGVmdCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNvbnRlbnQ6IGVuYXlhYW1lIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBjb25zdCBzdW1tYXJ5UHJvbW9jb2RlMVJpZ2h0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY29udGVudDogJy0xMCUnIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBjb25zdCBlbmF5YWFtZURlbCA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgICAgIHRhZzogJ2J1dHRvbicsXHJcbiAgICAgICAgICBjbGFzc05hbWU6ICdzdW1tYXJ5X19wcm9tb2NvZGUtYnV0dG9uJyxcclxuICAgICAgICAgIGNvbnRlbnQ6ICdkZWwnLFxyXG4gICAgICAgIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBlbmF5YWFtZURlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZW5heWFhbWUnKTtcclxuICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHByb21vY29kZS5hcHBlbmQoc3VtbWFyeVByb21vY29kZTFMZWZ0LCBzdW1tYXJ5UHJvbW9jb2RlMVJpZ2h0LCBlbmF5YWFtZURlbCk7XHJcbiAgICAgICAgcHJvbW9jb2RlVGV4dEFyZWEuYXBwZW5kKHByb21vY29kZSk7XHJcbiAgICAgICAgc2FsZSArPSAwLjE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChlbmF5YWFtZSA9PT0gJ2VuYXlhYW1lJyB8fCBiYWxheG9uID09PSAnYmFsYXhvbicpIHtcclxuICAgICAgICBjb25zdCBzdW1tYXJ5UHJpY2UgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBpZDogJ3N1bW1hcnktcHJpY2UnIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBzdW1tYXJ5T3JkZXIxUmlnaHQuYXBwZW5kKHN1bW1hcnlQcmljZSk7XHJcbiAgICAgICAgLy9jb25zdCBuZXdQcmljZSA9ICAoTnVtYmVyKHN1bW1hcnlQcmljZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIS50ZXh0Q29udGVudD8uc2xpY2UoMikpIC0gKE51bWJlcihzdW1tYXJ5UHJpY2UucHJldmlvdXNFbGVtZW50U2libGluZyEudGV4dENvbnRlbnQ/LnNsaWNlKDIpKSAvIDEwMCAqIDEwKSkudG9GaXhlZCgyKTtcclxuICAgICAgICBzdW1tYXJ5UHJpY2UudGV4dENvbnRlbnQgPSAnJCAnICsgKHRvdGFscHJpY2UgLSB0b3RhbHByaWNlICogc2FsZSk7XHJcbiAgICAgICAgdG90YWxQcmljZS50ZXh0Q29udGVudCA9ICckICcgKyAoMjAgKyAodG90YWxwcmljZSAtIHRvdGFscHJpY2UgKiBzYWxlKSkudG9GaXhlZCgyKTtcclxuICAgICAgICBzdW1tYXJ5UHJpY2UucHJldmlvdXNFbGVtZW50U2libGluZyEuY2xhc3NMaXN0LmFkZCgncHJpY2UtY2hhbmdlZCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwcm9tb2NvZGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgKHByb21vY29kZUlucHV0LnZhbHVlID09PSAnYmFsYXhvbicgJiYgYmFsYXhvbkNvdW50ZXIgPT09IDApIHx8XHJcbiAgICAgICAgICAocHJvbW9jb2RlSW5wdXQudmFsdWUgPT09ICdlbmF5YWFtZScgJiYgZW5heWFhbWVDb3VudGVyID09IDApXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAvLyBjb25zdCBwcm9tb2NvZGUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N1bW1hcnlfX2xpJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgICAgICAvLyBjb25zdCBzdW1tYXJ5UHJvbW9jb2RlMUxlZnQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBjb250ZW50OiBwcm9tb2NvZGVJbnB1dC52YWx1ZSB9KS5nZXRub2RlKCk7XHJcbiAgICAgICAgICAvLyBjb25zdCBzdW1tYXJ5UHJvbW9jb2RlMVJpZ2h0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY29udGVudDogJy0xMCUnIH0pLmdldG5vZGUoKTtcclxuICAgICAgICAgIC8vIHByb21vY29kZS5hcHBlbmQoc3VtbWFyeVByb21vY29kZTFMZWZ0LCBzdW1tYXJ5UHJvbW9jb2RlMVJpZ2h0KTtcclxuICAgICAgICAgIC8vIHByb21vY29kZVRleHRBcmVhLmFwcGVuZChwcm9tb2NvZGUpO1xyXG4gICAgICAgICAgaWYgKHByb21vY29kZUlucHV0LnZhbHVlID09PSAnYmFsYXhvbicpIGJhbGF4b25Db3VudGVyICs9IDE7XHJcbiAgICAgICAgICBpZiAocHJvbW9jb2RlSW5wdXQudmFsdWUgPT09ICdlbmF5YWFtZScpIGVuYXlhYW1lQ291bnRlciArPSAxO1xyXG5cclxuICAgICAgICAgIC8vIGlmKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmFsYXhvbicpID09PSBudWxsICYmIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZW5heWFhbWUnKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgLy8gICBjb25zdCBzdW1tYXJ5UHJpY2UgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBpZDogJ3N1bW1hcnktcHJpY2UnIH0pLmdldG5vZGUoKTtcclxuICAgICAgICAgIC8vICAgc3VtbWFyeU9yZGVyMVJpZ2h0LmFwcGVuZChzdW1tYXJ5UHJpY2UpO1xyXG5cclxuICAgICAgICAgIC8vIGNvbnN0IG5ld1ByaWNlID0gIChOdW1iZXIoc3VtbWFyeVByaWNlLnByZXZpb3VzRWxlbWVudFNpYmxpbmchLnRleHRDb250ZW50Py5zbGljZSgyKSkgLSAoTnVtYmVyKHN1bW1hcnlQcmljZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIS50ZXh0Q29udGVudD8uc2xpY2UoMikpIC8gMTAwICogMTApKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgLy8gc3VtbWFyeVByaWNlLnRleHRDb250ZW50ID0gJyQgJyArIG5ld1ByaWNlO1xyXG4gICAgICAgICAgLy8gdG90YWxQcmljZS50ZXh0Q29udGVudCA9ICckICcgKyAoKDIwICsgK25ld1ByaWNlKSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgIC8vIHN1bW1hcnlQcmljZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIS5jbGFzc0xpc3QuYWRkKCdwcmljZS1jaGFuZ2VkJyk7XHJcbiAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICBpZiAoYmFsYXhvbkNvdW50ZXIgPT09IDEgJiYgZW5heWFhbWVDb3VudGVyID09PSAxKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYmFsYXhvbicsICcxJyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZW5heWFhbWUnLCAnMScpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGJhbGF4b25Db3VudGVyID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdiYWxheG9uJywgJzEnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VuYXlhYW1lJywgJzEnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG4gICAgICBjb25zdCBtYWluID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdtYWluJywgY2xhc3NOYW1lOiAnbWFpbiBtYWluX2VtcHR5JyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGNvbnN0IGVtcHR5ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY2xhc3NOYW1lOiAnY2FydC1lbXB0eScsIGNvbnRlbnQ6ICdDYXJ0IGlzIGVtcHR5JyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIG1haW4uYXBwZW5kKGVtcHR5KTtcclxuICAgICAgYm9keS5hcHBlbmQobWFpbik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENyZWF0ZUVsZW1lbnQgfSBmcm9tICcuL0VsZW1lbnRzL0NyZWF0ZUVsZW1lbnQnO1xyXG5pbXBvcnQgeyBDcmVhdGVJbWFnZSB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlSW1hZ2UnO1xyXG5pbXBvcnQgeyBwcm9kdWN0IH0gZnJvbSAnLi9JbnRlcmZhY2VzJztcclxuaW1wb3J0IFJvdXRlciBmcm9tICcuL3JvdXRlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDYXJkUGFnZSB7XHJcbiAgY29uc3RydWN0b3IocHJvZHVjdDogcHJvZHVjdCkge1xyXG4gICAgY29uc3Qgcm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG4gICAgY29uc3QgbWFpbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnbWFpbicsIGNsYXNzTmFtZTogJ21haW4nIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHdyYXBwZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3dyYXBwZXIgY2FyZC1wYWdlX193cmFwcGVyJyB9KS5nZXRub2RlKCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZChtYWluKTtcclxuICAgIGNvbnN0IERpdlBhdGggPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ0RpdlBhdGgnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IERpdkNhcmQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ0RpdkNhcmQnIH0pLmdldG5vZGUoKTtcclxuICAgIG1haW4uYXBwZW5kKHdyYXBwZXIpO1xyXG4gICAgd3JhcHBlci5hcHBlbmQoRGl2UGF0aCk7XHJcbiAgICB3cmFwcGVyLmFwcGVuZChEaXZDYXJkKTtcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0g0L/QtdGA0LLRi9C5INC00LjQsiBkaXYucGF0aFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgY29uc3Qgc3BhbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnYScsIGNsYXNzTmFtZTogJ2NhcmRfcGF0aCcgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBEaXZQYXRoLmFwcGVuZChzcGFuKTtcclxuICAgIH1cclxuICAgIERpdlBhdGguY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudCA9ICdTVE9SRSAvICc7XHJcbiAgICByb3V0ZXIuQWRkUm91dGluZ1RvSGVhZGVyKERpdlBhdGguY2hpbGROb2Rlc1swXSBhcyBIVE1MRWxlbWVudCk7XHJcbiAgICBEaXZQYXRoLmNoaWxkTm9kZXNbMV0udGV4dENvbnRlbnQgPSBwcm9kdWN0LmNhdGVnb3J5ICsgJyAvICc7XHJcbiAgICBEaXZQYXRoLmNoaWxkTm9kZXNbMl0udGV4dENvbnRlbnQgPSBwcm9kdWN0LmJyYW5kICsgJyAvICc7XHJcbiAgICBEaXZQYXRoLmNoaWxkTm9kZXNbM10udGV4dENvbnRlbnQgPSBwcm9kdWN0Lm1vZGVsO1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLSDQstGC0L7RgNC+0Lkg0LTQuNCyIGRpdi5jYXJkXHJcbiAgICAvLyBjb25zdCBoMSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnaDEnLCBpZDogJ2gxX2NhcmQnLCBjb250ZW50OiBwcm9kdWN0Lm1vZGVsIH0pLmdldG5vZGUoKTtcclxuICAgIC8vIERpdkNhcmQuYXBwZW5kKGgxKTtcclxuICAgIGNvbnN0IGNhcmRjb250ZW50ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBpZDogJ2NhcmRjb250ZW50JyB9KS5nZXRub2RlKCk7XHJcbiAgICBEaXZDYXJkLmFwcGVuZChjYXJkY29udGVudCk7XHJcbiAgICBjb25zdCBjYXJkaW1hZ2VzID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBpZDogJ2NhcmRpbWFnZXMnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGNhcmRkYXRhID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBpZDogJ2NhcmRkYXRhJyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBjYXJkcHJpY2UgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGlkOiAnY2FyZHByaWNlJyB9KS5nZXRub2RlKCk7XHJcbiAgICBjYXJkY29udGVudC5hcHBlbmQoY2FyZGltYWdlcyk7XHJcbiAgICBjYXJkY29udGVudC5hcHBlbmQoY2FyZGRhdGEpO1xyXG4gICAgY2FyZGNvbnRlbnQuYXBwZW5kKGNhcmRwcmljZSk7XHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGltYWdlczpcclxuICAgIGNvbnN0IHJvdyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgaWQ6ICdyb3cnLCBjbGFzc05hbWU6ICdyb3cnIH0pLmdldG5vZGUoKTtcclxuICAgIGNhcmRpbWFnZXMuYXBwZW5kKHJvdyk7XHJcbiAgICBjb25zdCBjb2wyID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBpZDogJ2NvbC0yJywgY2xhc3NOYW1lOiAnY29sLTInIH0pLmdldG5vZGUoKTtcclxuICAgIHJvdy5hcHBlbmQoY29sMik7XHJcbiAgICBjb25zdCBjdXJyZW50aW1hZ2UgPSBuZXcgQ3JlYXRlSW1hZ2Uoe1xyXG4gICAgICBzcmM6IGAke3Byb2R1Y3QuaW1hZ2VzWzBdfWAsXHJcbiAgICAgIGlkOiAnY3VycmVudGltYWdlJyxcclxuICAgICAgY2xhc3NOYW1lOiAnY3VycmVudGltYWdlJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGltZ1JvdyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgaWQ6ICdzbWFsbC1pbWctcm93JywgY2xhc3NOYW1lOiAnc21hbGwtaW1nLXJvdycgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29sMi5hcHBlbmQoY3VycmVudGltYWdlLCBpbWdSb3cpO1xyXG4gICAgLy8gY29uc3QgbGlzdGltYWdlcyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgaWQ6ICdsaXN0aW1hZ2VzJyB9KS5nZXRub2RlKCk7XHJcbiAgICAvLyBjYXJkaW1hZ2VzLmFwcGVuZChsaXN0aW1hZ2VzKTtcclxuXHJcbiAgICBwcm9kdWN0LmltYWdlcy5mb3JFYWNoKChpdCkgPT4ge1xyXG4gICAgICBjb25zdCBzbWFsbGltZ0NvbnRhaW5lciA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgICB0YWc6ICdkaXYnLFxyXG4gICAgICAgIGlkOiAnc21hbGxJbWdDb250YWluZXInLFxyXG4gICAgICAgIGNsYXNzTmFtZTogJ3NtYWxsSW1nQ29udGFpbmVyJyxcclxuICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBzbWFsbGltZyA9IG5ldyBDcmVhdGVJbWFnZSh7IHNyYzogYCR7aXR9YCwgaWQ6ICdzbWFsbEltZycsIGNsYXNzTmFtZTogJ3NtYWxsSW1nJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIHNtYWxsaW1nQ29udGFpbmVyLmFwcGVuZChzbWFsbGltZyk7XHJcbiAgICAgIGltZ1Jvdy5hcHBlbmQoc21hbGxpbWdDb250YWluZXIpO1xyXG5cclxuICAgICAgLy8g0L/QtdGA0LXQutC70Y7Rh9C10L3QuNC1INC+0YHQvdC+0LLQvdC+0Lkg0LrQsNGA0YLQuNC90LrQuCAvL1xyXG4gICAgICBzbWFsbGltZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBjdXJyZW50aW1hZ2Uuc3JjID0gc21hbGxpbWcuc3JjO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tZGF0YTpcclxuICAgIGNvbnN0IGRhdGFUb3AgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2RhdGEtdG9wJyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBoMSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnaDEnLCBpZDogJ2gxX2NhcmQnLCBjb250ZW50OiBwcm9kdWN0Lm1vZGVsIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHJhdGluZ0Jsb2NrID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdyYXRpbmctYmxvY2snIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHJhdGluZ0ljb24gPSBuZXcgQ3JlYXRlSW1hZ2Uoe1xyXG4gICAgICBzcmM6ICcuL2Fzc2V0cy9pbWFnZXMvc3Rhci1yYXRpbmcuc3ZnJyxcclxuICAgICAgY2xhc3NOYW1lOiAncmF0aW5nLWljb24nLFxyXG4gICAgICBhbHQ6ICdzdGFyJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHJhdGluZ051bSA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ3JhdGluZy1udW0nLFxyXG4gICAgICBjb250ZW50OiBwcm9kdWN0LnJhdGluZy50b1N0cmluZygpLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgcmF0aW5nQmxvY2suYXBwZW5kKHJhdGluZ0ljb24sIHJhdGluZ051bSk7XHJcbiAgICBkYXRhVG9wLmFwcGVuZChoMSwgcmF0aW5nQmxvY2spO1xyXG4gICAgY29uc3QgcHJpY2VCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZGF0YV9fcHJpY2UnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHByaWNlTm9EaXNjb3VudCA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ3ByaWNlLW5vLWRpc2NvdW50JyxcclxuICAgICAgY29udGVudDogJyQgJyArICgocHJvZHVjdC5kaXNjb3VudFBlcmNlbnRhZ2UgLyAxMDApICogcHJvZHVjdC5wcmljZSArIHByb2R1Y3QucHJpY2UpLnRvRml4ZWQoMikudG9TdHJpbmcoKSxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHByaWNlV2l0aERpc2NvdW50ID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICB0YWc6ICdzcGFuJyxcclxuICAgICAgY2xhc3NOYW1lOiAncHJpY2Utd2l0aC1kaXNjb3VudCcsXHJcbiAgICAgIGNvbnRlbnQ6ICckICcgKyBwcm9kdWN0LnByaWNlLnRvU3RyaW5nKCksXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBwcmljZUJsb2NrLmFwcGVuZChwcmljZU5vRGlzY291bnQsIHByaWNlV2l0aERpc2NvdW50KTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY2xhc3NOYW1lOiAnZGF0YV9fdGl0bGUnLCBjb250ZW50OiAnRGVzY3JpcHRpb246JyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvblRleHQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgIHRhZzogJ3NwYW4nLFxyXG4gICAgICBjbGFzc05hbWU6ICdkYXRhX190ZXh0JyxcclxuICAgICAgY29udGVudDogcHJvZHVjdC5kZXNjcmlwdGlvbixcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGRlc2NyaXB0aW9uLmFwcGVuZChkZXNjcmlwdGlvblRleHQpO1xyXG4gICAgY29uc3QgcmVsZWFzZSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNsYXNzTmFtZTogJ2RhdGFfX3RpdGxlJywgY29udGVudDogJ1JlbGVhc2UgZGF0ZTonIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHJlbGVhc2VUZXh0ID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICB0YWc6ICdzcGFuJyxcclxuICAgICAgY2xhc3NOYW1lOiAnZGF0YV9fdGV4dCcsXHJcbiAgICAgIGNvbnRlbnQ6IHByb2R1Y3QuRGF0ZU9mSXNzdWUudG9TdHJpbmcoKSxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIHJlbGVhc2UuYXBwZW5kKHJlbGVhc2VUZXh0KTtcclxuICAgIGNvbnN0IGJyYW5kID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY2xhc3NOYW1lOiAnZGF0YV9fdGl0bGUnLCBjb250ZW50OiAnQnJhbmQ6JyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBicmFuZHRleHQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBjbGFzc05hbWU6ICdkYXRhX190ZXh0JywgY29udGVudDogcHJvZHVjdC5icmFuZCB9KS5nZXRub2RlKCk7XHJcbiAgICBicmFuZC5hcHBlbmQoYnJhbmR0ZXh0KTtcclxuICAgIGNvbnN0IGNhdGVnb3J5ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY2xhc3NOYW1lOiAnZGF0YV9fdGl0bGUnLCBjb250ZW50OiAnQ2F0ZWdvcnk6JyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBjYXRlZ29yeVRleHQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgIHRhZzogJ3NwYW4nLFxyXG4gICAgICBjbGFzc05hbWU6ICdkYXRhX190ZXh0JyxcclxuICAgICAgY29udGVudDogcHJvZHVjdC5jYXRlZ29yeSxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNhdGVnb3J5LmFwcGVuZChjYXRlZ29yeVRleHQpO1xyXG4gICAgY29uc3QgYnV0dG9ucyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZGF0YV9fYnV0dG9ucycgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgYnV5Tm93ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdidXR0b24nLCBjbGFzc05hbWU6ICdkYXRhX19idXR0b24nLCBjb250ZW50OiAnQnV5IGl0IG5vdycgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgYWRkVG9DYXJ0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdjYXJkLXBhZ2VfX2FkZC10by1jYXJ0JyB9KS5nZXRub2RlKCk7XHJcbiAgICBidXR0b25zLmFwcGVuZChidXlOb3csIGFkZFRvQ2FydCk7XHJcblxyXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpICE9PSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IGNhcmRzOiBwcm9kdWN0W10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpISk7XHJcbiAgICAgIGNhcmRzLmZvckVhY2goKGl0KSA9PiB7XHJcbiAgICAgICAgaWYgKGl0LmlkID09PSBwcm9kdWN0LmlkKSB7XHJcbiAgICAgICAgICBhZGRUb0NhcnQuY2xhc3NMaXN0LnRvZ2dsZSgnX3Byb2R1Y3QtYWRkZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1eU5vdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgbGV0IFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZTogcHJvZHVjdFtdID0gW107XHJcbiAgICAgIGxldCB0b3RhbHByaWNlID0gMDtcclxuICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICBpZiAoIWFkZFRvQ2FydC5jbGFzc0xpc3QuY29udGFpbnMoJ19wcm9kdWN0LWFkZGVkJykpIHtcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykgIT09IG51bGwpIHtcclxuICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykhKTtcclxuICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5wdXNoKHByb2R1Y3QpO1xyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5wdXNoKHByb2R1Y3QpO1xyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5mb3JFYWNoKChpdCkgPT4ge1xyXG4gICAgICAgIGNvdW50ZXIgKz0gaXQuY291bnRlcjtcclxuICAgICAgICB0b3RhbHByaWNlICs9IGl0LmNvdW50ZXIgKiBpdC5wcmljZTtcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnN0IGNhcnRRdWFudGl0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudGVyLWJhc2tldCcpO1xyXG4gICAgICBjb25zdCBBbGxQcmljZUJhc2tldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGwtcHJpY2UtYmFza2V0Jyk7XHJcbiAgICAgIGNvbnN0IGJhc2tldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYXNrZXQtaW1nJyk7XHJcbiAgICAgIGlmIChjb3VudGVyICE9PSAwKSB7XHJcbiAgICAgICAgbGV0IGNjID0gMDtcclxuICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UuZm9yRWFjaCgoaXRlbSkgPT4gKGNjICs9IGl0ZW0uY291bnRlcikpO1xyXG4gICAgICAgIGNhcnRRdWFudGl0eSEudGV4dENvbnRlbnQgPSBjYy50b1N0cmluZygpO1xyXG4gICAgICAgIGNhcnRRdWFudGl0eSEuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcclxuICAgICAgICBjYXJ0UXVhbnRpdHkhLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgQWxsUHJpY2VCYXNrZXQhLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGJhc2tldCEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBBbGxQcmljZUJhc2tldCEudGV4dENvbnRlbnQgPSAnJCAnICsgdG90YWxwcmljZS50b1N0cmluZygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBmcm9tY2FyZCA9IHRydWU7XHJcbiAgICByb3V0ZXIuQWRkUm91dGluZ1RvQmFza2V0KGJ1eU5vdywgZnJvbWNhcmQpO1xyXG5cclxuICAgIGFkZFRvQ2FydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgLy9hZGRUb0NhcnQuY2xhc3NMaXN0LnRvZ2dsZSgnX3Byb2R1Y3QtYWRkZWQnKTtcclxuICAgICAgbGV0IHRvdGFscHJpY2UgPSAwO1xyXG4gICAgICBsZXQgY291bnRlciA9IDA7XHJcbiAgICAgIGxldCBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2U6IHByb2R1Y3RbXSA9IFtdO1xyXG4gICAgICBpZiAoYWRkVG9DYXJ0LmNsYXNzTGlzdC5jb250YWlucygnX3Byb2R1Y3QtYWRkZWQnKSkge1xyXG4gICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykhKTtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5mb3JFYWNoKChpdCwgaW5kKSA9PiB7XHJcbiAgICAgICAgICBpZiAoaXQuaWQgPT09IHByb2R1Y3QuaWQpIHtcclxuICAgICAgICAgICAgaW5kZXggPSBpbmQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpISk7XHJcbiAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UucHVzaChwcm9kdWN0KTtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0cycsIEpTT04uc3RyaW5naWZ5KFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UucHVzaChwcm9kdWN0KTtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0cycsIEpTT04uc3RyaW5naWZ5KFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBhZGRUb0NhcnQuY2xhc3NMaXN0LnRvZ2dsZSgnX3Byb2R1Y3QtYWRkZWQnKTtcclxuICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLmZvckVhY2goKGl0KSA9PiB7XHJcbiAgICAgICAgY291bnRlciArPSBpdC5jb3VudGVyO1xyXG4gICAgICAgIHRvdGFscHJpY2UgKz0gaXQuY291bnRlciAqIGl0LnByaWNlO1xyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgY2FydFF1YW50aXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50ZXItYmFza2V0Jyk7XHJcbiAgICAgIGNvbnN0IEFsbFByaWNlQmFza2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsbC1wcmljZS1iYXNrZXQnKTtcclxuICAgICAgY29uc3QgYmFza2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jhc2tldC1pbWcnKTtcclxuICAgICAgaWYgKGNvdW50ZXIgIT09IDApIHtcclxuICAgICAgICBsZXQgY2MgPSAwO1xyXG4gICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5mb3JFYWNoKChpdGVtKSA9PiAoY2MgKz0gaXRlbS5jb3VudGVyKSk7XHJcbiAgICAgICAgY2FydFF1YW50aXR5IS50ZXh0Q29udGVudCA9IGNjLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY2FydFF1YW50aXR5IS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG4gICAgICAgIGNhcnRRdWFudGl0eSEuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICBBbGxQcmljZUJhc2tldCEuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgYmFza2V0IS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIEFsbFByaWNlQmFza2V0IS50ZXh0Q29udGVudCA9ICckICcgKyB0b3RhbHByaWNlLnRvU3RyaW5nKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2FydFF1YW50aXR5IS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgY2FydFF1YW50aXR5IS5zdHlsZS5vcGFjaXR5ID0gJzAnO1xyXG4gICAgICAgIEFsbFByaWNlQmFza2V0IS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGJhc2tldCEuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgY2FyZGRhdGEuYXBwZW5kKGRhdGFUb3AsIHByaWNlQmxvY2ssIGRlc2NyaXB0aW9uLCByZWxlYXNlLCBicmFuZCwgY2F0ZWdvcnksIGJ1dHRvbnMpO1xyXG4gIH1cclxufVxyXG5cclxuLy9odHRwOi8vbG9jYWxob3N0OjgwODAvdXJsKGh0dHBzOi8vaS1wcm9kdWN0LmJ5L2ltYWdlcy9vL2FwcGxlLWlwaG9uZS0xNC1wcm8tMTI4Z2Ita29zbWljaGVza2lqLWNoZXJueWpfMS5qcGdcclxuLy9odHRwczovL2ktcHJvZHVjdC5ieS9pbWFnZXMvby9hcHBsZS1pcGhvbmUtMTQtcHJvLTEyOGdiLWtvc21pY2hlc2tpai1jaGVybnlqXzEuanBnXHJcbiIsImltcG9ydCB7IENyZWF0ZUVsZW1lbnQgfSBmcm9tICcuL0VsZW1lbnRzL0NyZWF0ZUVsZW1lbnQnO1xyXG5pbXBvcnQgeyBDcmVhdGVOdW1iZXJJbnB1dCB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlTnVtYmVySW5wdXQnO1xyXG5pbXBvcnQgeyBDcmVhdGVUZXh0SW5wdXQgfSBmcm9tICcuL0VsZW1lbnRzL0NyZWF0ZVRleHRJbnB1dCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3JlYXRlQ2hlY2tvdXRQb3B1cCBleHRlbmRzIENyZWF0ZUVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cCcgfSk7XHJcbiAgICBjb25zdCBjcmVkaXRDYXJkID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fY3JlZGl0LWNhcmQnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZsaXAgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3BvcHVwX19mbGlwJyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBmbGlwRnJvbnQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3BvcHVwX19mbGlwLWZyb250JyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBmbGlwQmFjayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAncG9wdXBfX2ZsaXAtYmFjaycgfSkuZ2V0bm9kZSgpO1xyXG4gICAgZmxpcC5hcHBlbmQoZmxpcEZyb250LCBmbGlwQmFjayk7XHJcbiAgICAvLy8vLyBmcm9udCAvLy8vL1xyXG4gICAgY29uc3QgZnJvbnRDaGlwID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fZnJvbnQtY2hpcCcgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgZnJvbnRMb2dvID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fZnJvbnQtbG9nbyBjYXJkLWxvZ28nIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZyb250TnVtYmVyID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fZnJvbnQtbnVtYmVyJyB9KS5nZXRub2RlKCk7XHJcblxyXG4gICAgY29uc3QgZnJvbnROYW1lID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fZnJvbnQtbmFtZScgfSkuZ2V0bm9kZSgpO1xyXG5cclxuICAgIGNvbnN0IG5hbWVQbGFjZWhvbGRlciA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ3BvcHVwX19mcm9udC1uYW1lLXBsYWNlaG9sZGVyJyxcclxuICAgICAgY29udGVudDogJ0NhcmQgaG9sZGVyJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IG5hbWVUZXh0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fZnJvbnQtbmFtZS10ZXh0JyB9KS5nZXRub2RlKCk7XHJcbiAgICBmcm9udE5hbWUuYXBwZW5kKG5hbWVQbGFjZWhvbGRlciwgbmFtZVRleHQpO1xyXG4gICAgY29uc3QgZnJvbnRFeHBpcmF0aW9uID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fZnJvbnQtZXhwaXJhdGlvbicgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgZXhwaXJhdGlvblBsYWNlaG9sZGVyID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICB0YWc6ICdzcGFuJyxcclxuICAgICAgY2xhc3NOYW1lOiAncG9wdXBfX2Zyb250LWV4cGlyYXRpb24tcGxhY2Vob2xkZXInLFxyXG4gICAgICBjb250ZW50OiAnRXhwaXJlcycsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBleHBpcmF0aW9uVGV4dCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAncG9wdXBfX2Zyb250LWV4cGlyYXRpb24tdGV4dCcgfSkuZ2V0bm9kZSgpO1xyXG4gICAgZnJvbnRFeHBpcmF0aW9uLmFwcGVuZChleHBpcmF0aW9uUGxhY2Vob2xkZXIsIGV4cGlyYXRpb25UZXh0KTtcclxuICAgIGZsaXBGcm9udC5hcHBlbmQoZnJvbnRDaGlwLCBmcm9udExvZ28sIGZyb250TnVtYmVyLCBmcm9udE5hbWUsIGZyb250RXhwaXJhdGlvbik7XHJcbiAgICAvLy8vLyBiYWNrIC8vLy8vXHJcbiAgICBjb25zdCBiYWNrU3RyaXAgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3BvcHVwX19iYWNrLXN0cmlwJyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBiYWNrTG9nbyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAncG9wdXBfX2JhY2stbG9nbyBjYXJkLWxvZ28nIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGJhY2tDY3YgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3BvcHVwX19iYWNrLWNjdicgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgY2N2UGxhY2Vob2xkZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgIHRhZzogJ3NwYW4nLFxyXG4gICAgICBjbGFzc05hbWU6ICdwb3B1cF9fYmFjay1jY3YtcGxhY2Vob2xkZXInLFxyXG4gICAgICBjb250ZW50OiAnQ2N2JyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGNjdlRleHQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3BvcHVwX19iYWNrLWNjdi10ZXh0JyB9KS5nZXRub2RlKCk7XHJcbiAgICBiYWNrQ2N2LmFwcGVuZChjY3ZQbGFjZWhvbGRlciwgY2N2VGV4dCk7XHJcbiAgICBmbGlwQmFjay5hcHBlbmQoYmFja1N0cmlwLCBiYWNrTG9nbywgYmFja0Njdik7XHJcbiAgICBjcmVkaXRDYXJkLmFwcGVuZChmbGlwKTtcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICBjb25zdCBmb3JtID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fZm9ybScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgZm9ybUNhcmROdW1iZXJCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9fYmxvY2snIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZvcm1DYXJkTnVtYmVyUGxhY2Vob2xkZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgIHRhZzogJ3NwYW4nLFxyXG4gICAgICBjbGFzc05hbWU6ICdmb3JtX19wbGFjZWhvbGRlcicsXHJcbiAgICAgIGNvbnRlbnQ6ICdDYXJkIG51bWJlcicsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBmb3JtQ2FyZE51bWJlcklucHV0cyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9faW5wdXRzJyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKCdbMC05XScpO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCA1OyBpKyspIHtcclxuICAgICAgY29uc3QgaW5wdXQgPSBuZXcgQ3JlYXRlTnVtYmVySW5wdXQoe1xyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICBjbGFzc05hbWU6ICdmb3JtX19pbnB1dCcsXHJcbiAgICAgICAgaWQ6IGkudG9TdHJpbmcoKSxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBudW1iZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJy5wb3B1cF9fbnVtYmVyJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGZyb250TnVtYmVyLmFwcGVuZChudW1iZXIpO1xyXG4gICAgICBpbnB1dC5taW5MZW5ndGggPSA0O1xyXG4gICAgICBpbnB1dC5tYXhMZW5ndGggPSA0O1xyXG4gICAgICBpbnB1dC5vbnBhc3RlID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfTtcclxuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGFzdGNoYXIgPSBpbnB1dC52YWx1ZVtpbnB1dC52YWx1ZS5sZW5ndGggLSAxXTtcclxuICAgICAgICBjb25zb2xlLmxvZyhsYXN0Y2hhcik7XHJcbiAgICAgICAgaW5wdXQudmFsdWUgPSBpbnB1dC52YWx1ZS5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgbnVtYmVyLnRleHRDb250ZW50ID0gaW5wdXQudmFsdWU7XHJcbiAgICAgICAgaWYgKHJlZy50ZXN0KGxhc3RjaGFyKSkge1xyXG4gICAgICAgICAgaW5wdXQudmFsdWUgKz0gbGFzdGNoYXI7XHJcbiAgICAgICAgICBudW1iZXIudGV4dENvbnRlbnQgKz0gbGFzdGNoYXI7XHJcbiAgICAgICAgICBpZiAoaSA9PT0gMSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGlucHV0LnZhbHVlWzBdKSB7XHJcbiAgICAgICAgICAgICAgY2FzZSAnNCc6XHJcbiAgICAgICAgICAgICAgICBmcm9udExvZ28uc3R5bGUuYmFja2dyb3VuZCA9IGB1cmwoJy4vYXNzZXRzL2ltYWdlcy92aXNhLnN2ZycpIG5vLXJlcGVhdCBjZW50ZXIgLyBjb250YWluYDtcclxuICAgICAgICAgICAgICAgIGJhY2tMb2dvLnN0eWxlLmJhY2tncm91bmQgPSBgdXJsKCcuL2Fzc2V0cy9pbWFnZXMvdmlzYS5zdmcnKSBuby1yZXBlYXQgY2VudGVyIC8gY29udGFpbmA7XHJcbiAgICAgICAgICAgICAgICAvL2Zyb250TG9nby50ZXh0Q29udGVudCA9ICdWSVNBJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJzUnOlxyXG4gICAgICAgICAgICAgICAgZnJvbnRMb2dvLnN0eWxlLmJhY2tncm91bmQgPSBgdXJsKCcuL2Fzc2V0cy9pbWFnZXMvbWFzdGVyY2FyZC5zdmcnKSBuby1yZXBlYXQgY2VudGVyIC8gY29udGFpbmA7XHJcbiAgICAgICAgICAgICAgICBiYWNrTG9nby5zdHlsZS5iYWNrZ3JvdW5kID0gYHVybCgnLi9hc3NldHMvaW1hZ2VzL21hc3RlcmNhcmQuc3ZnJykgbm8tcmVwZWF0IGNlbnRlciAvIGNvbnRhaW5gO1xyXG4gICAgICAgICAgICAgICAgLy9mcm9udExvZ28udGV4dENvbnRlbnQgPSAnTWFzdGVyQ2FyZCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICc2JzpcclxuICAgICAgICAgICAgICAgIGZyb250TG9nby5zdHlsZS5iYWNrZ3JvdW5kID0gYHVybCgnLi9hc3NldHMvaW1hZ2VzL2Rpc2NvdmVyLnN2ZycpIG5vLXJlcGVhdCBjZW50ZXIgLyBjb250YWluYDtcclxuICAgICAgICAgICAgICAgIGJhY2tMb2dvLnN0eWxlLmJhY2tncm91bmQgPSBgdXJsKCcuL2Fzc2V0cy9pbWFnZXMvZGlzY292ZXIuc3ZnJykgbm8tcmVwZWF0IGNlbnRlciAvIGNvbnRhaW5gO1xyXG4gICAgICAgICAgICAgICAgLy9mcm9udExvZ28udGV4dENvbnRlbnQgPSAnRGlzY292ZXInO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGZyb250TG9nby50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBmb3JtQ2FyZE51bWJlcklucHV0cy5hcHBlbmQoaW5wdXQpO1xyXG4gICAgfVxyXG4gICAgZm9ybUNhcmROdW1iZXJCbG9jay5hcHBlbmQoZm9ybUNhcmROdW1iZXJQbGFjZWhvbGRlciwgZm9ybUNhcmROdW1iZXJJbnB1dHMpO1xyXG4gICAgY29uc3QgZm9ybUNhcmROYW1lQmxvY2sgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2Zvcm1fX2Jsb2NrX25hbWUnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZvcm1DYXJkTmFtZVBsYWNlaG9sZGVyID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICB0YWc6ICdzcGFuJyxcclxuICAgICAgY2xhc3NOYW1lOiAnZm9ybV9fcGxhY2Vob2xkZXInLFxyXG4gICAgICBjb250ZW50OiAnQ2FyZCBob2xkZXInLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgZm9ybUNhcmROYW1lSW5wdXQgPSBuZXcgQ3JlYXRlVGV4dElucHV0KHtcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBuYW1lOiAnY2FyZC1ob2xkZXInLFxyXG4gICAgICBjbGFzc05hbWU6ICdmb3JtX19pbnB1dF9sb25nJyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBmb3JtQ2FyZE5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcclxuICAgICAgbmFtZVRleHQudGV4dENvbnRlbnQgPSBmb3JtQ2FyZE5hbWVJbnB1dC52YWx1ZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgfSk7XHJcbiAgICBmb3JtQ2FyZE5hbWVCbG9jay5hcHBlbmQoZm9ybUNhcmROYW1lUGxhY2Vob2xkZXIsIGZvcm1DYXJkTmFtZUlucHV0KTtcclxuICAgIGNvbnN0IGZvcm1DYXJkT3RoZXJCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9fYmxvY2tfb3RoZXInIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZvcm1DYXJkRXhwaXJhdGlvbkJsb2NrID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdmb3JtX19ibG9jay1oYWxmJyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBmb3JtQ2FyZEV4cGlyYXRpb25QbGFjZWhvbGRlciA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ2Zvcm1fX3BsYWNlaG9sZGVyJyxcclxuICAgICAgY29udGVudDogJ0V4cGlyYXRpb24gZGF0ZScsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBmb3JtQ2FyZE1vbnRoID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdmb3JtX19pbnB1dCcsIGlkOiAnbW9udGgtaW5wdXQnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IE1vbnRoU2VsZWN0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzZWxlY3QnLCBjbGFzc05hbWU6ICdmb3JtX19zZWxlY3QnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IG1vbnRoT3B0aW9uID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdvcHRpb24nIH0pLmdldG5vZGUoKTtcclxuICAgIE1vbnRoU2VsZWN0LmFwcGVuZChtb250aE9wdGlvbik7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IDEzOyBpKyspIHtcclxuICAgICAgY29uc3QgdmFsdWUgPSBpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuICAgICAgY29uc3Qgb3B0aW9uID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdvcHRpb24nLCBjb250ZW50OiB2YWx1ZSB9KS5nZXRub2RlKCk7XHJcbiAgICAgIE1vbnRoU2VsZWN0LmFwcGVuZChvcHRpb24pO1xyXG4gICAgfVxyXG4gICAgZm9ybUNhcmRNb250aC5hcHBlbmQoTW9udGhTZWxlY3QpO1xyXG5cclxuICAgIGNvbnN0IGZvcm1DYXJkWWVhciA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9faW5wdXQnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IFllYXJTZWxlY3QgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NlbGVjdCcsIGNsYXNzTmFtZTogJ2Zvcm1fX3NlbGVjdCcgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgeWVhck9wdGlvbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnb3B0aW9uJyB9KS5nZXRub2RlKCk7XHJcbiAgICBZZWFyU2VsZWN0LmFwcGVuZCh5ZWFyT3B0aW9uKTtcclxuICAgIGZvciAobGV0IGkgPSAyMDIyOyBpIDwgMjAzMTsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gaS50b1N0cmluZygpO1xyXG4gICAgICBjb25zdCBvcHRpb24gPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ29wdGlvbicsIGNvbnRlbnQ6IHZhbHVlIH0pLmdldG5vZGUoKTtcclxuICAgICAgWWVhclNlbGVjdC5hcHBlbmQob3B0aW9uKTtcclxuICAgIH1cclxuICAgIGZvcm1DYXJkWWVhci5hcHBlbmQoWWVhclNlbGVjdCk7XHJcbiAgICBmb3JtQ2FyZEV4cGlyYXRpb25CbG9jay5hcHBlbmQoZm9ybUNhcmRFeHBpcmF0aW9uUGxhY2Vob2xkZXIsIGZvcm1DYXJkTW9udGgsIGZvcm1DYXJkWWVhcik7XHJcblxyXG4gICAgY29uc3QgZm9ybUNhcmRDY3ZCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9fYmxvY2staGFsZicgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgZm9ybUNhcmRDY3ZQbGFjZWhvbGRlciA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ2Zvcm1fX3BsYWNlaG9sZGVyJyxcclxuICAgICAgaWQ6ICdjY3YtcGxhY2Vob2xkZXInLFxyXG4gICAgICBjb250ZW50OiAnQ2N2JyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZvcm1DYXJkQ2N2SW5wdXQgPSBuZXcgQ3JlYXRlVGV4dElucHV0KHtcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBuYW1lOiAnY2FyZC1jY3YnLFxyXG4gICAgICBjbGFzc05hbWU6ICdmb3JtX19pbnB1dCcsXHJcbiAgICAgIGlkOiAnY2FyZC1jY3YnLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGZvcm1DYXJkQ2N2SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGZvcm1DYXJkQ2N2SW5wdXQuZm9jdXMoKTtcclxuICAgICAgaWYgKCFjcmVkaXRDYXJkLmNsYXNzTGlzdC5jb250YWlucygnaG92ZXInKSkgY3JlZGl0Q2FyZC5jbGFzc0xpc3QuYWRkKCdob3ZlcicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgIGlmICgoZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkICE9PSAnY2FyZC1jY3YnKSB7XHJcbiAgICAgICAgaWYgKGNyZWRpdENhcmQuY2xhc3NMaXN0LmNvbnRhaW5zKCdob3ZlcicpKSBjcmVkaXRDYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZvcm1DYXJkQ2N2SW5wdXQubWF4TGVuZ3RoID0gMztcclxuICAgIGZvcm1DYXJkQ2N2SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGxhc3RjaGFyID0gZm9ybUNhcmRDY3ZJbnB1dC52YWx1ZVtmb3JtQ2FyZENjdklucHV0LnZhbHVlLmxlbmd0aCAtIDFdO1xyXG4gICAgICAvL2NvbnNvbGUubG9nKGxhc3RjaGFyKTtcclxuICAgICAgZm9ybUNhcmRDY3ZJbnB1dC52YWx1ZSA9IGZvcm1DYXJkQ2N2SW5wdXQudmFsdWUuc2xpY2UoMCwgLTEpO1xyXG4gICAgICBpZiAocmVnLnRlc3QobGFzdGNoYXIpKSB7XHJcbiAgICAgICAgZm9ybUNhcmRDY3ZJbnB1dC52YWx1ZSArPSBsYXN0Y2hhcjtcclxuICAgICAgfVxyXG4gICAgICBjY3ZUZXh0LnRleHRDb250ZW50ID0gZm9ybUNhcmRDY3ZJbnB1dC52YWx1ZTtcclxuICAgIH0pO1xyXG4gICAgZm9ybUNhcmRDY3ZJbnB1dC5vbnBhc3RlID0gKCkgPT4ge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgZm9ybUNhcmRDY3ZCbG9jay5hcHBlbmQoZm9ybUNhcmRDY3ZQbGFjZWhvbGRlciwgZm9ybUNhcmRDY3ZJbnB1dCk7XHJcblxyXG4gICAgZm9ybUNhcmRPdGhlckJsb2NrLmFwcGVuZChmb3JtQ2FyZEV4cGlyYXRpb25CbG9jaywgZm9ybUNhcmRDY3ZCbG9jayk7XHJcblxyXG4gICAgY29uc3QgZm9ybUNhcmRBZGRyZXNzQmxvY2sgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2Zvcm1fX2Jsb2NrX2FkZHJlc3MnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZvcm1BZGRyZXNzUGxhY2Vob2xkZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgIHRhZzogJ3NwYW4nLFxyXG4gICAgICBjbGFzc05hbWU6ICdmb3JtX19wbGFjZWhvbGRlcicsXHJcbiAgICAgIGNvbnRlbnQ6ICdTaGlwcGluZyBhZGRyZXNzJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZvcm1DYXJkQWRkcmVzc0lucHV0ID0gbmV3IENyZWF0ZVRleHRJbnB1dCh7XHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgbmFtZTogJ2FkZHJlc3MnLFxyXG4gICAgICBjbGFzc05hbWU6ICdmb3JtX19pbnB1dF9sb25nJyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcblxyXG4gICAgZm9ybUNhcmRBZGRyZXNzQmxvY2suYXBwZW5kKGZvcm1BZGRyZXNzUGxhY2Vob2xkZXIsIGZvcm1DYXJkQWRkcmVzc0lucHV0KTtcclxuICAgIGNvbnN0IGZvcm1DYXJkQ29udGFjdHNCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9fYmxvY2tfb3RoZXInIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZvcm1QaG9uZUJsb2NrID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdmb3JtX19ibG9jay1oYWxmJyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBmb3JtUGhvbmVQbGFjZWhvbGRlciA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ2Zvcm1fX3BsYWNlaG9sZGVyJyxcclxuICAgICAgaWQ6ICdwaG9uZS1wbGFjZWhvbGRlcicsXHJcbiAgICAgIGNvbnRlbnQ6ICdQaG9uZSBudW1iZXInLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgZm9ybVBob25lSW5wdXQgPSBuZXcgQ3JlYXRlVGV4dElucHV0KHtcclxuICAgICAgdHlwZTogJ3RlbCcsXHJcbiAgICAgIG5hbWU6ICdwaG9uZScsXHJcbiAgICAgIGNsYXNzTmFtZTogJ2Zvcm1fX2lucHV0X2hhbGYnLFxyXG4gICAgICBpZDogJ3Bob25lLWlucHV0JyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcblxyXG4gICAgZm9ybVBob25lQmxvY2suYXBwZW5kKGZvcm1QaG9uZVBsYWNlaG9sZGVyLCBmb3JtUGhvbmVJbnB1dCk7XHJcbiAgICBjb25zdCBmb3JtRW1haWxCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9fYmxvY2staGFsZicgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgZm9ybUVtYWlsUGxhY2Vob2xkZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgIHRhZzogJ3NwYW4nLFxyXG4gICAgICBjbGFzc05hbWU6ICdmb3JtX19wbGFjZWhvbGRlcicsXHJcbiAgICAgIGlkOiAnZW1haWwtcGxhY2Vob2xkZXInLFxyXG4gICAgICBjb250ZW50OiAnRS1tYWlsJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZvcm1FbWFpbElucHV0ID0gbmV3IENyZWF0ZVRleHRJbnB1dCh7XHJcbiAgICAgIHR5cGU6ICdlbWFpbCcsXHJcbiAgICAgIG5hbWU6ICdlbWFpbCcsXHJcbiAgICAgIGNsYXNzTmFtZTogJ2Zvcm1fX2lucHV0X2hhbGYnLFxyXG4gICAgICBpZDogJ2VtYWlsLWlucHV0JyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBmb3JtRW1haWxCbG9jay5hcHBlbmQoZm9ybUVtYWlsUGxhY2Vob2xkZXIsIGZvcm1FbWFpbElucHV0KTtcclxuICAgIGZvcm1DYXJkQ29udGFjdHNCbG9jay5hcHBlbmQoZm9ybVBob25lQmxvY2ssIGZvcm1FbWFpbEJsb2NrKTtcclxuICAgIC8vLy8vLy8vLy8vLy8vXHJcbiAgICBjb25zdCBjb25maXJtQnV0dG9uID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICB0YWc6ICdidXR0b24nLFxyXG4gICAgICBjbGFzc05hbWU6ICdwb3B1cF9fYnV0dG9uJyxcclxuICAgICAgY29udGVudDogJ2NvbmZpcm0nLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG5cclxuICAgIGNvbnN0IE1ZID0ge1xyXG4gICAgICBtb250aDogJycsXHJcbiAgICAgIHllYXI6ICcnLFxyXG4gICAgfTtcclxuICAgIE1vbnRoU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgY29uc3QgbW9udGggPSBBcnJheS5mcm9tKE1vbnRoU2VsZWN0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdvcHRpb24nKSkuZmlsdGVyKChvcHRpb24pID0+IHtcclxuICAgICAgICByZXR1cm4gb3B0aW9uLnNlbGVjdGVkO1xyXG4gICAgICB9KTtcclxuICAgICAgTVkubW9udGggPSBtb250aFswXS50ZXh0Q29udGVudCE7XHJcbiAgICAgIGV4cGlyYXRpb25UZXh0LnRleHRDb250ZW50ID0gTVkubW9udGggKyAnLycgKyBNWS55ZWFyO1xyXG4gICAgfSk7XHJcblxyXG4gICAgWWVhclNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IFllYXIgPSBBcnJheS5mcm9tKFllYXJTZWxlY3QuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ29wdGlvbicpKS5maWx0ZXIoKG9wdGlvbikgPT4ge1xyXG4gICAgICAgIHJldHVybiBvcHRpb24uc2VsZWN0ZWQ7XHJcbiAgICAgIH0pO1xyXG4gICAgICBNWS55ZWFyID0gWWVhclswXS50ZXh0Q29udGVudCE7XHJcbiAgICAgIGV4cGlyYXRpb25UZXh0LnRleHRDb250ZW50ID0gTVkubW9udGggKyAnLycgKyBNWS55ZWFyO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgbGV0IG1lc3NhZ2UgPSAnJztcclxuXHJcbiAgICAgIGNvbnN0IG1vbnRoID0gQXJyYXkuZnJvbShNb250aFNlbGVjdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnb3B0aW9uJykpLmZpbHRlcigob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbi5zZWxlY3RlZDtcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnN0IHllYXIgPSBBcnJheS5mcm9tKE1vbnRoU2VsZWN0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdvcHRpb24nKSkuZmlsdGVyKChvcHRpb24pID0+IHtcclxuICAgICAgICByZXR1cm4gb3B0aW9uLnNlbGVjdGVkO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICghL14oWy5hLXpBLVpdezMsfVtcXHNdKXsyLH0kLy50ZXN0KChmb3JtQ2FyZE5hbWVJbnB1dC52YWx1ZSArPSAnICcpKSkge1xyXG4gICAgICAgIG1lc3NhZ2UgKz0gJ1xcbkNhcmQgaG9sZGVyIG5hbWUgc2hvdWxkIGNvbnRhaW4gYXQgbGVhc3QgMiB3b3JkcyBlYWNoIG9uZSBub3QgbGVzcyB0aGFuIDMgbGV0dGVycyEnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIW1vbnRoWzBdLnRleHRDb250ZW50KSB7XHJcbiAgICAgICAgbWVzc2FnZSArPSAnXFxuQ2hvc2UgZXhwaXJhdGlvbiBtb250aCEnO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICgheWVhclswXS50ZXh0Q29udGVudCkge1xyXG4gICAgICAgIG1lc3NhZ2UgKz0gJ1xcbkNob3NlIGV4cGlyYXRpb24geWVhciEnO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghL14oWy4wLTlhLXpBLVpcXC1cXCxdezUsfVtcXHNdKXszLH0kLy50ZXN0KChmb3JtQ2FyZEFkZHJlc3NJbnB1dC52YWx1ZSArPSAnICcpKSkge1xyXG4gICAgICAgIG1lc3NhZ2UgKz0gJ1xcblNoaXBwaW5nIGFkZHJlc3Mgc2hvdWxkIGNvbnRhaW4gYXQgbGVhc3QgMyB3b3JkcyBlYWNoIG9uZSBub3QgbGVzcyB0aGFuIDUgc3ltYm9scyEnO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghL15bXFwrXVswLTldezksMTV9JC8udGVzdChmb3JtUGhvbmVJbnB1dC52YWx1ZSkpIHtcclxuICAgICAgICBtZXNzYWdlICs9IFwiXFxuUGhvbmUgbnVtYmVyIHNob3VsZCBzdGFydCB3aXRoICcrJyBhbmQgY29udGFpbiA5IG9yIG1vcmUgZGlnaXRzIVwiO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghL15cXHcrKFtcXC4tXT9cXHcrKSpAXFx3KyhbXFwuLV0/XFx3KykqKFxcLlxcd3syLDN9KSskLy50ZXN0KGZvcm1FbWFpbElucHV0LnZhbHVlKSkge1xyXG4gICAgICAgIG1lc3NhZ2UgKz0gJ1xcbkludmFsaWQgZW1haWwgYWRkcmVzcyEnO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBDYXJkTGVuZ3RoID0gMDtcclxuICAgICAgZnJvbnROdW1iZXIuY2hpbGROb2Rlcy5mb3JFYWNoKChpdCkgPT4ge1xyXG4gICAgICAgIENhcmRMZW5ndGggKz0gaXQudGV4dENvbnRlbnQhLnNwbGl0KCcnKS5sZW5ndGghO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKENhcmRMZW5ndGggIT09IDE2KSB7XHJcbiAgICAgICAgbWVzc2FnZSArPSAnXFxuSW52YWxpZCBDYXJkISc7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGZvcm1DYXJkQ2N2SW5wdXQudmFsdWUuc3BsaXQoJycpLmxlbmd0aCAhPT0gMykge1xyXG4gICAgICAgIG1lc3NhZ2UgKz0gJ1xcbkludmFsaWQgQ0NWISc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChtZXNzYWdlKSB7XHJcbiAgICAgICAgYWxlcnQobWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZvcm0uYXBwZW5kKFxyXG4gICAgICBmb3JtQ2FyZE51bWJlckJsb2NrLFxyXG4gICAgICBmb3JtQ2FyZE5hbWVCbG9jayxcclxuICAgICAgZm9ybUNhcmRPdGhlckJsb2NrLFxyXG4gICAgICBmb3JtQ2FyZEFkZHJlc3NCbG9jayxcclxuICAgICAgZm9ybUNhcmRDb250YWN0c0Jsb2NrLFxyXG4gICAgICBjb25maXJtQnV0dG9uXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuZWwuYXBwZW5kKGNyZWRpdENhcmQsIGZvcm0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDcmVhdGVFbGVtZW50IH0gZnJvbSAnLi4vRWxlbWVudHMvQ3JlYXRlRWxlbWVudCc7XHJcbmltcG9ydCB7IHByb2R1Y3QgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgQ3JlYXRlSW1hZ2UgfSBmcm9tICcuLi9FbGVtZW50cy9DcmVhdGVJbWFnZSc7XHJcbmltcG9ydCB7IEFwcGx5Um91dGluZyB9IGZyb20gJy4uL0FwcGx5Um91dGluZyc7XHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi4vcm91dGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENyZWF0ZUNhcnRJdGVtIHtcclxuICBjb25zdHJ1Y3RvcihsaW1pdDogbnVtYmVyLCBwYWdlOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcclxuICAgIGNvbnN0IHRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJ0LWl0ZW1zJyk7XHJcbiAgICBsZXQgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlOiBwcm9kdWN0W10gPSBbXTtcclxuICAgIGxldCBjb3VudGVyID0gMDtcclxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKSAhPT0gbnVsbCAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKT8ubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykhKTtcclxuICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLmZvckVhY2goKGRhdGEpID0+IHtcclxuICAgICAgICBjb25zdCBjYXJ0SXRlbSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnY2FydF9faXRlbScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICAgIGNvbnN0IGNhcnRJdGVtQm9keSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnY2FydF9faXRlbS1ib2R5JyB9KS5nZXRub2RlKCk7XHJcbiAgICAgICAgY29uc3QgcGhvdG9CbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnaXRlbV9fcGhvdG8tYmxvY2snIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBjb25zdCBwaG90byA9IG5ldyBDcmVhdGVJbWFnZSh7XHJcbiAgICAgICAgICBzcmM6IGRhdGEuaW1hZ2VzWzBdLFxyXG4gICAgICAgICAgY2xhc3NOYW1lOiAnaXRlbV9fcGhvdG8nLFxyXG4gICAgICAgICAgaWQ6IGBjYXJkLSR7ZGF0YS5pZC50b1N0cmluZygpfWAsXHJcbiAgICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICAgIHBob3RvQmxvY2suYXBwZW5kKHBob3RvKTtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnaXRlbV9fZGVzY3JpcHRpb24nIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvblRpdGxlID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICAgICAgdGFnOiAnZGl2JyxcclxuICAgICAgICAgIGNsYXNzTmFtZTogJ2l0ZW1fX2Rlc2NyaXB0aW9uLXRpdGxlJyxcclxuICAgICAgICAgIGNvbnRlbnQ6IGAke2RhdGEubW9kZWx9YCxcclxuICAgICAgICAgIGlkOiBgY2FyZC0ke2RhdGEuaWQudG9TdHJpbmcoKX1gLFxyXG4gICAgICAgIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvblRleHQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgICAgICB0YWc6ICdkaXYnLFxyXG4gICAgICAgICAgY2xhc3NOYW1lOiAnaXRlbV9fZGVzY3JpcHRpb24tdGV4dCcsXHJcbiAgICAgICAgICBjb250ZW50OiBgJHtkYXRhLmRlc2NyaXB0aW9ufWAsXHJcbiAgICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICAgIGRlc2NyaXB0aW9uLmFwcGVuZChkZXNjcmlwdGlvblRpdGxlLCBkZXNjcmlwdGlvblRleHQpO1xyXG4gICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICAgICAgdGFnOiAnZGl2JyxcclxuICAgICAgICAgIGNsYXNzTmFtZTogJ2l0ZW1fX2NhdGVnb3J5JyxcclxuICAgICAgICAgIGNvbnRlbnQ6IGAke2RhdGEuY2F0ZWdvcnl9YCxcclxuICAgICAgICB9KS5nZXRub2RlKCk7XHJcbiAgICAgICAgY29uc3QgcXVhbnRpdHlDb250YWluZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2l0ZW1fX3F1YW50aXR5JyB9KS5nZXRub2RlKCk7XHJcbiAgICAgICAgY29uc3QgcXVhbnRpdHlDb3VudGVyID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgICAgICBjbGFzc05hbWU6ICdpdGVtX19xdWFudGl0eS1jb3VudGVyJyxcclxuICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuY291bnRlci50b1N0cmluZygpLFxyXG4gICAgICAgIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBjb25zdCBxdWFudGl0eUJ1dHRvbkxlc3MgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgICAgICB0YWc6ICdzcGFuJyxcclxuICAgICAgICAgIGNsYXNzTmFtZTogJ2l0ZW1fX3F1YW50aXR5LWJ1dHRvbiBpdGVtX19sZXNzJyxcclxuICAgICAgICAgIGNvbnRlbnQ6ICctJyxcclxuICAgICAgICB9KS5nZXRub2RlKCk7XHJcbiAgICAgICAgY29uc3QgcXVhbnRpdHlCdXR0b25Nb3JlID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgICAgICBjbGFzc05hbWU6ICdpdGVtX19xdWFudGl0eS1idXR0b24gaXRlbV9fbW9yZScsXHJcbiAgICAgICAgICBjb250ZW50OiAnKycsXHJcbiAgICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICAgIHF1YW50aXR5Q29udGFpbmVyLmFwcGVuZChxdWFudGl0eUJ1dHRvbkxlc3MsIHF1YW50aXR5Q291bnRlciwgcXVhbnRpdHlCdXR0b25Nb3JlKTtcclxuICAgICAgICBjb25zdCBwcmljZSA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgICAgIHRhZzogJ2RpdicsXHJcbiAgICAgICAgICBjbGFzc05hbWU6ICdpdGVtX19wcmljZScsXHJcbiAgICAgICAgICBjb250ZW50OiAnJCAnICsgZGF0YS5wcmljZSAqIGRhdGEuY291bnRlcixcclxuICAgICAgICB9KS5nZXRub2RlKCk7XHJcbiAgICAgICAgY2FydEl0ZW1Cb2R5LmFwcGVuZChwaG90b0Jsb2NrLCBkZXNjcmlwdGlvbiwgY2F0ZWdvcnksIHF1YW50aXR5Q29udGFpbmVyLCBwcmljZSk7XHJcbiAgICAgICAgY29uc3QgY2FydEl0ZW1kZWxldGUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2NhcnRfX2l0ZW0tZGVsZXRlJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgICAgY29uc3QgaWNvbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNsYXNzTmFtZTogJ2NhcnRfX2Nyb3NzLWljb24nIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBjYXJ0SXRlbWRlbGV0ZS5hcHBlbmQoaWNvbik7XHJcbiAgICAgICAgY2FydEl0ZW0uYXBwZW5kKGNhcnRJdGVtQm9keSwgY2FydEl0ZW1kZWxldGUpO1xyXG4gICAgICAgIGNhcnRJdGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhjb3VudGVyKVxyXG4gICAgICAgIGlmIChjb3VudGVyIDwgbGltaXQgKiBwYWdlICYmIGNvdW50ZXIgPiBsaW1pdCAqIHBhZ2UgLSBsaW1pdCAtIDEpIHtcclxuICAgICAgICAgIGNhcnRJdGVtLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvdW50ZXIgKz0gMTtcclxuICAgICAgICB0YWchLmFwcGVuZChjYXJ0SXRlbSk7XHJcblxyXG4gICAgICAgIHJvdXRlci5BZGRSb3V0aW5nVG9DYXJkKHBob3RvKTtcclxuICAgICAgICByb3V0ZXIuQWRkUm91dGluZ1RvQ2FyZChkZXNjcmlwdGlvblRpdGxlKTtcclxuXHJcbiAgICAgICAgcXVhbnRpdHlCdXR0b25Nb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKSEpO1xyXG4gICAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IGRhdGEuaWQpIHtcclxuICAgICAgICAgICAgICBpdGVtLmNvdW50ZXIgKz0gMTtcclxuICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvZHVjdHMnLCBKU09OLnN0cmluZ2lmeShQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UpKTtcclxuICAgICAgICAgICAgICBxdWFudGl0eUNvdW50ZXIudGV4dENvbnRlbnQgPSBpdGVtLmNvdW50ZXIudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgICAgICAgcHJpY2UudGV4dENvbnRlbnQgPSBgJCAke2l0ZW0ucHJpY2UgKiBpdGVtLmNvdW50ZXJ9YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnREYXRhKFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHF1YW50aXR5QnV0dG9uTGVzcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykhKTtcclxuICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmlkID09PSBpdGVtLmlkKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGl0ZW0uY291bnRlciA+IDEpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY291bnRlciAtPSAxO1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKSk7XHJcbiAgICAgICAgICAgICAgICBxdWFudGl0eUNvdW50ZXIudGV4dENvbnRlbnQgPSBpdGVtLmNvdW50ZXIudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHByaWNlLnRleHRDb250ZW50ID0gYCQgJHtpdGVtLnByaWNlICogaXRlbS5jb3VudGVyfWA7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY291bnRlciAtPSAxO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5mb3JFYWNoKChpdCwgaW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChpdC5pZCA9PT0gaXRlbS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaW5kO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKSk7XHJcbiAgICAgICAgICAgICAgICBjYXJ0SXRlbS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY291bnRlciA9IGl0ZW0uY291bnRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBpZiAoY291bnRlciA+PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGEoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGEoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKTtcclxuICAgICAgICAgICAgbmV3IEFwcGx5Um91dGluZygpLmluaXQoJyNiYXNrZXQnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2FydEl0ZW1kZWxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpISk7XHJcbiAgICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLmZvckVhY2goKGl0LCBpbmQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGl0LmlkID09PSBkYXRhLmlkKSB7XHJcbiAgICAgICAgICAgICAgaW5kZXggPSBpbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvZHVjdHMnLCBKU09OLnN0cmluZ2lmeShQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UpKTtcclxuICAgICAgICAgIGNhcnRJdGVtLnJlbW92ZSgpO1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50RGF0YShQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UpO1xyXG4gICAgICAgICAgbmV3IEFwcGx5Um91dGluZygpLmluaXQoJyNiYXNrZXQnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvL1Byb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5mb3JFYWNoKCk7XHJcbiAgICAvL3RoaXMuTGlzdE9mRGlzcGxheShsaW1pdCk7XHJcbiAgfVxyXG4gIGN1cnJlbnREYXRhKGRhdGE6IHByb2R1Y3RbXSkge1xyXG4gICAgbGV0IHNhbGUgPSAwO1xyXG4gICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmFsYXhvbicpICE9PSBudWxsKSB7XHJcbiAgICAgIHNhbGUgKz0gMC4xO1xyXG4gICAgfVxyXG4gICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZW5heWFhbWUnKSAhPT0gbnVsbCkge1xyXG4gICAgICBzYWxlICs9IDAuMTtcclxuICAgIH1cclxuICAgIGxldCBjb3VudGVyID0gMDtcclxuICAgIGxldCB0b3RhbHByaWNlID0gMDtcclxuICAgIGNvbnN0IGNvdW50ZXJCYXNrZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY291bnRlci1iYXNrZXQnKTtcclxuICAgIGNvbnN0IGFsbFByaWNlQmFza2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsbC1wcmljZS1iYXNrZXQnKTtcclxuICAgIGNvbnN0IHN1bW1hcnlUb3RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdW1tYXJ5LXRvdGFsJyk7XHJcbiAgICBjb25zdCBzdWJUb3RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJ0b3RhbC1wcmljZScpO1xyXG4gICAgY29uc3Qgc3VtbWFyeXByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1bW1hcnktcHJpY2UnKTtcclxuICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBjb3VudGVyICs9IGl0ZW0uY291bnRlcjtcclxuICAgICAgdG90YWxwcmljZSArPSBpdGVtLmNvdW50ZXIgKiBpdGVtLnByaWNlO1xyXG4gICAgfSk7XHJcbiAgICBjb3VudGVyQmFza2V0IS50ZXh0Q29udGVudCA9IGNvdW50ZXIudG9TdHJpbmcoKTtcclxuICAgIGFsbFByaWNlQmFza2V0IS50ZXh0Q29udGVudCA9ICckICcgKyB0b3RhbHByaWNlLnRvU3RyaW5nKCk7XHJcbiAgICBpZiAoc2FsZSA9PT0gMCkge1xyXG4gICAgICBzdWJUb3RhbCEudGV4dENvbnRlbnQgPSAnJCAnICsgdG90YWxwcmljZS50b1N0cmluZygpO1xyXG4gICAgICBzdW1tYXJ5VG90YWwhLnRleHRDb250ZW50ID0gJyQgJyArICh0b3RhbHByaWNlICsgMjApLnRvU3RyaW5nKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdWJUb3RhbCEudGV4dENvbnRlbnQgPSAnJCAnICsgdG90YWxwcmljZTtcclxuICAgICAgc3VtbWFyeXByaWNlIS50ZXh0Q29udGVudCA9ICckICcgKyAodG90YWxwcmljZSAtIHRvdGFscHJpY2UgKiBzYWxlKTtcclxuICAgICAgc3VtbWFyeVRvdGFsIS50ZXh0Q29udGVudCA9ICckICcgKyAodG90YWxwcmljZSAtIHRvdGFscHJpY2UgKiBzYWxlICsgMjApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gTGlzdE9mRGlzcGxheShsaW1pdDogbnVtYmVyKSB7XHJcbiAgLy8gICBsZXQgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlOiBwcm9kdWN0W10gPSBbXTtcclxuICAvLyAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykhKTtcclxuICAvLyAgIGNvbnN0IHBhZ2VzID0gTWF0aC5jZWlsKFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5sZW5ndGggLyBsaW1pdCk7XHJcbiAgLy8gICBsZXQgYXJyID0gbmV3IEFycmF5KCk7XHJcbiAgLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZ2VzOyBpKyspIHtcclxuICAvLyAgICAgYXJyLnB1c2gobmV3IEFycmF5KCkpO1xyXG4gIC8vICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UuZm9yRWFjaCgoaXRlbSwgaW5kKSA9PiB7XHJcbiAgLy8gICAgICAgYXJyW2ldLnB1c2goaXRlbSk7XHJcbiAgLy8gICAgICAgaWYgKGluZCA9IHBhZ2VzKSB7XHJcbiAgLy8gICAgICAgfVxyXG4gIC8vICAgICB9KTtcclxuICAvLyAgIH1cclxuICAvLyAgIGNvbnNvbGUubG9nKGFyciEpXHJcbiAgLy8gfVxyXG59XHJcbiIsImltcG9ydCB7IENyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi9FbGVtZW50cy9DcmVhdGVFbGVtZW50JztcclxuaW1wb3J0IHsgQ3JlYXRlUmFuZ2UgfSBmcm9tICcuLi9FbGVtZW50cy9DcmVhdGVSYW5nZSc7XHJcbmltcG9ydCB7IENvbnN0cnVjdG9yUmFuZ2VCbG9jayB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENyZWF0ZVJhbmdlQmxvY2sgZXh0ZW5kcyBDcmVhdGVFbGVtZW50IHtcclxuICBwcml2YXRlIHRpdGxlOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIG51bXM6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgZnJvbTogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSB0bzogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByYW5nZUJsb2NrOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIHJhbmdlTGluZTogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByYW5nZTE6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByYW5nZTI6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHtcclxuICAgIHRpdGxlLFxyXG4gICAgZnJvbSxcclxuICAgIHRvLFxyXG4gICAgcmFuZ2UxTWluLFxyXG4gICAgcmFuZ2UxTWF4LFxyXG4gICAgcmFuZ2UxVmFsdWUsXHJcbiAgICByYW5nZTJNaW4sXHJcbiAgICByYW5nZTJNYXgsXHJcbiAgICByYW5nZTJWYWx1ZSxcclxuICAgIGlzUHJpY2UsXHJcbiAgICBpZCxcclxuICAgIHJvdXRlcixcclxuICAgIGN1cnJlbnQsXHJcbiAgfTogQ29uc3RydWN0b3JSYW5nZUJsb2NrKSB7XHJcbiAgICBzdXBlcih7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2FzaWRlX19yYW5nZSByYW5nZS1tZW51JyB9KTtcclxuICAgIHRoaXMudGl0bGUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2gyJywgY2xhc3NOYW1lOiAncmFuZ2UtbWVudV9fdGl0bGUnLCBjb250ZW50OiB0aXRsZSB9KS5nZXRub2RlKCk7XHJcbiAgICB0aGlzLm51bXMgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3JhbmdlLW1lbnVfX251bWJlcnMnIH0pLmdldG5vZGUoKTtcclxuICAgIHRoaXMuZnJvbSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNsYXNzTmFtZTogJ3JhbmdlLW1lbnVfX2Zyb20nLCBjb250ZW50OiBmcm9tIH0pLmdldG5vZGUoKTtcclxuICAgIHRoaXMudG8gPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBjbGFzc05hbWU6ICdyYW5nZS1tZW51X190bycsIGNvbnRlbnQ6IHRvIH0pLmdldG5vZGUoKTtcclxuICAgIHRoaXMubnVtcy5hcHBlbmQodGhpcy5mcm9tLCB0aGlzLnRvKTtcclxuICAgIHRoaXMucmFuZ2VCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAncmFuZ2UtbWVudV9fcmFuZ2UnIH0pLmdldG5vZGUoKTtcclxuICAgIHRoaXMucmFuZ2VMaW5lID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdyYW5nZS1tZW51X190cmFja2VyJyB9KS5nZXRub2RlKCk7XHJcbiAgICBpZiAocmFuZ2UxVmFsdWUgPT09ICcxNicpIHtcclxuICAgICAgcmFuZ2UxVmFsdWUgPSBjdXJyZW50IS5taW4hO1xyXG4gICAgfVxyXG4gICAgaWYgKHJhbmdlMlZhbHVlID09PSAnMTU1OScpIHtcclxuICAgICAgcmFuZ2UyVmFsdWUgPSBjdXJyZW50IS5tYXghO1xyXG4gICAgfVxyXG4gICAgaWYgKHJhbmdlMVZhbHVlID09PSAnMjAxMycpIHtcclxuICAgICAgcmFuZ2UxVmFsdWUgPSBjdXJyZW50IS5taW4hO1xyXG4gICAgfVxyXG4gICAgaWYgKHJhbmdlMlZhbHVlID09PSAnMjAyMicpIHtcclxuICAgICAgcmFuZ2UyVmFsdWUgPSBjdXJyZW50IS5tYXghO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yYW5nZTEgPSBuZXcgQ3JlYXRlUmFuZ2Uoe1xyXG4gICAgICB0eXBlOiAncmFuZ2UnLFxyXG4gICAgICBtaW46IHJhbmdlMU1pbixcclxuICAgICAgbWF4OiByYW5nZTFNYXgsXHJcbiAgICAgIHZhbHVlOiByYW5nZTFWYWx1ZSxcclxuICAgICAgaWQ6IGAke2lkfS0xYCxcclxuICAgICAgY2xhc3NOYW1lOiAncmFuZ2UtbWVudV9fc2xpZGVyJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIC8vY29uc29sZS5sb2coJ0NSQicpO1xyXG4gICAgdGhpcy5yYW5nZTIgPSBuZXcgQ3JlYXRlUmFuZ2Uoe1xyXG4gICAgICB0eXBlOiAncmFuZ2UnLFxyXG4gICAgICBtaW46IHJhbmdlMk1pbixcclxuICAgICAgbWF4OiByYW5nZTJNYXgsXHJcbiAgICAgIHZhbHVlOiByYW5nZTJWYWx1ZSxcclxuICAgICAgaWQ6IGAke2lkfS0yYCxcclxuICAgICAgY2xhc3NOYW1lOiAncmFuZ2UtbWVudV9fc2xpZGVyJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIHRoaXMucmFuZ2VCbG9jay5hcHBlbmQodGhpcy5yYW5nZUxpbmUsIHRoaXMucmFuZ2UxLCB0aGlzLnJhbmdlMik7XHJcbiAgICB0aGlzLmVsLmFwcGVuZCh0aGlzLnRpdGxlLCB0aGlzLm51bXMsIHRoaXMucmFuZ2VCbG9jayk7XHJcbiAgICBpZiAoaXNQcmljZSkge1xyXG4gICAgICB0aGlzLmZyb20udGV4dENvbnRlbnQgPSAnJCAnICsgdGhpcy5yYW5nZTEudmFsdWU7XHJcbiAgICAgIHRoaXMudG8udGV4dENvbnRlbnQgPSAnJCAnICsgdGhpcy5yYW5nZTIudmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZyb20udGV4dENvbnRlbnQgPSB0aGlzLnJhbmdlMS52YWx1ZTtcclxuICAgICAgdGhpcy50by50ZXh0Q29udGVudCA9IHRoaXMucmFuZ2UyLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyDRhNGD0L3QutGG0LjQvtC90LDQuyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgY29uc3QgZGlzID0gK3RoaXMucmFuZ2UxLm1heCAtICt0aGlzLnJhbmdlMS5taW47XHJcbiAgICBjb25zdCBzdGVwID0gMTAwIC8gKCt0aGlzLnJhbmdlMS5tYXggLSArdGhpcy5yYW5nZTEubWluKTtcclxuICAgIGNvbnN0IHBlcmNlbnQxID0gKGRpcyAtICgrdGhpcy5yYW5nZTEubWF4IC0gK3RoaXMucmFuZ2UxLnZhbHVlKSkgKiBzdGVwO1xyXG4gICAgY29uc3QgcGVyY2VudDIgPSAoZGlzIC0gKCt0aGlzLnJhbmdlMS5tYXggLSArdGhpcy5yYW5nZTIudmFsdWUpKSAqIHN0ZXA7XHJcbiAgICB0aGlzLnJhbmdlTGluZS5zdHlsZS5iYWNrZ3JvdW5kID0gYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSgxMDUsIDAsIDMxLCAwLjA4KSAke3BlcmNlbnQxfSUgLCAjNjkwMDFGICR7cGVyY2VudDF9JSAsICM2OTAwMUYgJHtwZXJjZW50Mn0lLCByZ2JhKDEwNSwgMCwgMzEsIDAuMDgpICR7cGVyY2VudDJ9JSlgO1xyXG5cclxuICAgIC8vY29uc29sZS5sb2codGhpcy5yYW5nZTEudmFsdWUpO1xyXG4gICAgdGhpcy5yYW5nZTEuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XHJcbiAgICAgIC8vY29uc29sZS5sb2codGhpcy5yYW5nZTEudmFsdWUpO1xyXG4gICAgICBpZiAocGFyc2VJbnQodGhpcy5yYW5nZTIudmFsdWUpIC0gcGFyc2VJbnQodGhpcy5yYW5nZTEudmFsdWUpIDw9IDApIHtcclxuICAgICAgICB0aGlzLnJhbmdlMS52YWx1ZSA9IFN0cmluZyhwYXJzZUludCh0aGlzLnJhbmdlMi52YWx1ZSkgLSAwKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNQcmljZSkge1xyXG4gICAgICAgIHRoaXMuZnJvbS50ZXh0Q29udGVudCA9ICckICcgKyB0aGlzLnJhbmdlMS52YWx1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZyb20udGV4dENvbnRlbnQgPSB0aGlzLnJhbmdlMS52YWx1ZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBkaXMgPSArdGhpcy5yYW5nZTEubWF4IC0gK3RoaXMucmFuZ2UxLm1pbjtcclxuICAgICAgY29uc3Qgc3RlcCA9IDEwMCAvICgrdGhpcy5yYW5nZTEubWF4IC0gK3RoaXMucmFuZ2UxLm1pbik7XHJcbiAgICAgIGNvbnN0IHBlcmNlbnQxID0gKGRpcyAtICgrdGhpcy5yYW5nZTEubWF4IC0gK3RoaXMucmFuZ2UxLnZhbHVlKSkgKiBzdGVwO1xyXG4gICAgICBjb25zdCBwZXJjZW50MiA9IChkaXMgLSAoK3RoaXMucmFuZ2UxLm1heCAtICt0aGlzLnJhbmdlMi52YWx1ZSkpICogc3RlcDtcclxuICAgICAgdGhpcy5yYW5nZUxpbmUuc3R5bGUuYmFja2dyb3VuZCA9IGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJnYmEoMTA1LCAwLCAzMSwgMC4wOCkgJHtwZXJjZW50MX0lICwgIzY5MDAxRiAke3BlcmNlbnQxfSUgLCAjNjkwMDFGICR7cGVyY2VudDJ9JSwgcmdiYSgxMDUsIDAsIDMxLCAwLjA4KSAke3BlcmNlbnQyfSUpYDtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yYW5nZTEuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgaWYgKGlkID09PSAncHJpY2Utc2xpZGVyJykge1xyXG4gICAgICAgIHJvdXRlciEuQWRkUm91dGluZ1RvUHJpY2VNaW4odGhpcy5yYW5nZTEudmFsdWUpO1xyXG4gICAgICAgIHJvdXRlciEuQWRkUm91dGluZ1RvUHJpY2VNYXgodGhpcy5yYW5nZTIudmFsdWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJvdXRlciEuQWRkUm91dGluZ1RvWWVhck1pbih0aGlzLnJhbmdlMS52YWx1ZSk7XHJcbiAgICAgICAgcm91dGVyIS5BZGRSb3V0aW5nVG9ZZWFyTWF4KHRoaXMucmFuZ2UyLnZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJhbmdlMi5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcclxuICAgICAgaWYgKHBhcnNlSW50KHRoaXMucmFuZ2UyLnZhbHVlKSAtIHBhcnNlSW50KHRoaXMucmFuZ2UxLnZhbHVlKSA8PSAwKSB7XHJcbiAgICAgICAgdGhpcy5yYW5nZTIudmFsdWUgPSBTdHJpbmcocGFyc2VJbnQodGhpcy5yYW5nZTEudmFsdWUpICsgMCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzUHJpY2UpIHtcclxuICAgICAgICB0aGlzLnRvLnRleHRDb250ZW50ID0gJyQgJyArIHRoaXMucmFuZ2UyLnZhbHVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudG8udGV4dENvbnRlbnQgPSB0aGlzLnJhbmdlMi52YWx1ZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBkaXMgPSArdGhpcy5yYW5nZTEubWF4IC0gK3RoaXMucmFuZ2UxLm1pbjtcclxuICAgICAgY29uc3Qgc3RlcCA9IDEwMCAvICgrdGhpcy5yYW5nZTEubWF4IC0gK3RoaXMucmFuZ2UxLm1pbik7XHJcbiAgICAgIGNvbnN0IHBlcmNlbnQxID0gKGRpcyAtICgrdGhpcy5yYW5nZTEubWF4IC0gK3RoaXMucmFuZ2UxLnZhbHVlKSkgKiBzdGVwO1xyXG4gICAgICBjb25zdCBwZXJjZW50MiA9IChkaXMgLSAoK3RoaXMucmFuZ2UxLm1heCAtICt0aGlzLnJhbmdlMi52YWx1ZSkpICogc3RlcDtcclxuICAgICAgdGhpcy5yYW5nZUxpbmUuc3R5bGUuYmFja2dyb3VuZCA9IGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJnYmEoMTA1LCAwLCAzMSwgMC4wOCkgJHtwZXJjZW50MX0lICwgIzY5MDAxRiAke3BlcmNlbnQxfSUgLCAjNjkwMDFGICR7cGVyY2VudDJ9JSwgcmdiYSgxMDUsIDAsIDMxLCAwLjA4KSAke3BlcmNlbnQyfSUpYDtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yYW5nZTIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgaWYgKGlkID09PSAncHJpY2Utc2xpZGVyJykge1xyXG4gICAgICAgIHJvdXRlciEuQWRkUm91dGluZ1RvUHJpY2VNaW4odGhpcy5yYW5nZTEudmFsdWUpO1xyXG4gICAgICAgIHJvdXRlciEuQWRkUm91dGluZ1RvUHJpY2VNYXgodGhpcy5yYW5nZTIudmFsdWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJvdXRlciEuQWRkUm91dGluZ1RvWWVhck1pbih0aGlzLnJhbmdlMS52YWx1ZSk7XHJcbiAgICAgICAgcm91dGVyIS5BZGRSb3V0aW5nVG9ZZWFyTWF4KHRoaXMucmFuZ2UyLnZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi9FbGVtZW50cy9DcmVhdGVFbGVtZW50JztcclxuaW1wb3J0IHsgQ3JlYXRlSW1hZ2UgfSBmcm9tICcuLi9FbGVtZW50cy9DcmVhdGVJbWFnZSc7XHJcbmltcG9ydCB7IENyZWF0ZVRleHRJbnB1dCB9IGZyb20gJy4uL0VsZW1lbnRzL0NyZWF0ZVRleHRJbnB1dCc7XHJcbmltcG9ydCB7IENvbnN0cnVjdG9yRWxlbWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENyZWF0ZVNlYXJjaEJhciBleHRlbmRzIENyZWF0ZUVsZW1lbnQge1xyXG4gIHByaXZhdGUgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBidXR0b246IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgaWNvbjogSFRNTEltYWdlRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoeyByb3V0ZXIsIGZpbHRlciB9OiBDb25zdHJ1Y3RvckVsZW1lbnQpIHtcclxuICAgIHN1cGVyKHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc2VhcmNoJyB9KTtcclxuICAgIHRoaXMuaW5wdXQgPSBuZXcgQ3JlYXRlVGV4dElucHV0KHtcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBwbGFjZWhvbGRlcjogJ1NlYXJjaCBwcm9kdWN0JyxcclxuICAgICAgbmFtZTogJ3NlYXJjaCcsXHJcbiAgICAgIGNsYXNzTmFtZTogJ3NlYXJjaF9fdGV4dCcsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICB0aGlzLmJ1dHRvbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnYnV0dG9uJywgY2xhc3NOYW1lOiAnc2VhcmNoX19idXR0b24nIH0pLmdldG5vZGUoKTtcclxuICAgIHRoaXMuaWNvbiA9IG5ldyBDcmVhdGVJbWFnZSh7XHJcbiAgICAgIHNyYzogJy4vYXNzZXRzL2ltYWdlcy9zZWFyY2gucG5nJyxcclxuICAgICAgYWx0OiAnc2VhcmNoJyxcclxuICAgICAgY2xhc3NOYW1lOiAnc2VhcmNoX19pY29uJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIHRoaXMuaW5wdXQudmFsdWUgPSBmaWx0ZXIhO1xyXG4gICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIC8vY29uc29sZS5sb2cocm91dGVyKTtcclxuICAgICAgaWYgKHJvdXRlcikge1xyXG4gICAgICAgIHJvdXRlci5BZGRSb3V0aW5nVG9TZWFyY2godGhpcy5pbnB1dC52YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5idXR0b24uYXBwZW5kKHRoaXMuaWNvbik7XHJcbiAgICB0aGlzLmVsLmFwcGVuZCh0aGlzLmlucHV0LCB0aGlzLmJ1dHRvbik7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi9FbGVtZW50cy9DcmVhdGVFbGVtZW50JztcclxuaW1wb3J0IHsgQ3JlYXRlUmFkaW8gfSBmcm9tICcuLi9FbGVtZW50cy9DcmVhdGVSYWRpbyc7XHJcbmltcG9ydCB7IENvbnN0cnVjdG9yU29ydE1lbnUgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDcmVhdGVTb3J0TWVudSBleHRlbmRzIENyZWF0ZUVsZW1lbnQge1xyXG4gIHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIG9wdGlvbnM6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgc2VsZWN0ZWQ6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgc29ydG1lbnU6IHN0cmluZ1tdW107XHJcbiAgcHJpdmF0ZSBvcHRpb24hOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIGlucHV0ITogW0hUTUxJbnB1dEVsZW1lbnQsIEhUTUxMYWJlbEVsZW1lbnRdO1xyXG4gIGNvbnN0cnVjdG9yKHsgcm91dGVyLCBmaWx0ZXIgfTogQ29uc3RydWN0b3JTb3J0TWVudSkge1xyXG4gICAgc3VwZXIoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzb3J0LW1lbnUnIH0pO1xyXG4gICAgdGhpcy5zb3J0bWVudSA9IFtcclxuICAgICAgWydSYXRpbmcnLCAnUmF0aW5nJ10sXHJcbiAgICAgIFsnUHJpY2VUSCcsICdQcmljZSAobG93IHRvIGhpZ2gpJ10sXHJcbiAgICAgIFsnUHJpY2VUTCcsICdQcmljZSAoaGlnaCB0byBsb3cpJ10sXHJcbiAgICAgIFsnUkQnLCAnUmVsZWFzZSBEYXRlJ10sXHJcbiAgICBdO1xyXG4gICAgdGhpcy5zb3J0bWVudS5mb3JFYWNoKChpdCkgPT4ge1xyXG4gICAgICBpZiAoZmlsdGVyID09PSBpdFswXSkge1xyXG4gICAgICAgIGZpbHRlciA9IGl0WzFdO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuY29udGFpbmVyID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzZWxlY3QtYm94JyB9KS5nZXRub2RlKCk7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ29wdGlvbnMtY29udGFpbmVyJyB9KS5nZXRub2RlKCk7XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzZWxlY3RlZCcsIGlkOiAnc2VsZWN0ZWQnLCBjb250ZW50OiBmaWx0ZXIgfSkuZ2V0bm9kZSgpO1xyXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kKHRoaXMub3B0aW9ucywgdGhpcy5zZWxlY3RlZCk7XHJcbiAgICB0aGlzLnNvcnRtZW51LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgdGhpcy5vcHRpb24gPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ29wdGlvbicgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICB0aGlzLmlucHV0ID0gbmV3IENyZWF0ZVJhZGlvKHtcclxuICAgICAgICB0eXBlOiAncmFkaW8nLFxyXG4gICAgICAgIGNsYXNzTmFtZTogJ3JhZGlvJyxcclxuICAgICAgICBpZDogaXRlbVswXSxcclxuICAgICAgICBuYW1lOiAnc29ydCcsXHJcbiAgICAgICAgdmFsdWU6IGl0ZW1bMV0sXHJcbiAgICAgIH0pLmdldG5vZGUoKTtcclxuICAgICAgdGhpcy5vcHRpb24uYXBwZW5kKHRoaXMuaW5wdXRbMF0sIHRoaXMuaW5wdXRbMV0pO1xyXG4gICAgICB0aGlzLm9wdGlvbnMuYXBwZW5kKHRoaXMub3B0aW9uKTtcclxuICAgICAgdGhpcy5pbnB1dFswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBpZiAocm91dGVyKSB7XHJcbiAgICAgICAgICByb3V0ZXIuQWRkUm91dGluZ1RvU29ydChpdGVtWzBdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLnNlbGVjdGVkLmlubmVySFRNTCA9IGl0ZW1bMV07XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5lbC5hcHBlbmQodGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy5zZWxlY3RlZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdGhpcy5vcHRpb25zIS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDcmVhdGVFbGVtZW50IH0gZnJvbSAnLi9FbGVtZW50cy9DcmVhdGVFbGVtZW50JztcclxuaW1wb3J0IHsgcHJvZHVjdCB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XHJcbmltcG9ydCBDcmVhdGVSb3V0ZSBmcm9tICcuL3JvdXRlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDcmVhdGVMaXN0T2ZDYXJkcyB7XHJcbiAgY29uc3RydWN0b3IoU29ydERhdGE6IHByb2R1Y3RbXSkge1xyXG4gICAgY29uc3Qgcm91dGVyID0gbmV3IENyZWF0ZVJvdXRlKCk7XHJcbiAgICBTb3J0RGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IENhcmRCb3ggPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgICAgdGFnOiAnZGl2JyxcclxuICAgICAgICBjbGFzc05hbWU6ICdjYXJkX19ib3gnLFxyXG4gICAgICAgIGlkOiBgY2FyZC0ke2l0ZW0uaWQudG9TdHJpbmcoKX1gLFxyXG4gICAgICAgIEJhY2tncm91bmRJbWc6IGl0ZW0uaW1hZ2VzWzBdLFxyXG4gICAgICB9KS5nZXRub2RlKCk7XHJcbiAgICAgIHJvdXRlci5BZGRSb3V0aW5nVG9DYXJkKENhcmRCb3gpO1xyXG4gICAgICBjb25zdCBDYXJkTW9kZWwgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2gyJywgY2xhc3NOYW1lOiAnY2FyZF9fbW9kZWwnLCBjb250ZW50OiBpdGVtLm1vZGVsIH0pLmdldG5vZGUoKTtcclxuICAgICAgY29uc3QgQ2FyZFByaWNlID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICAgIHRhZzogJ2gyJyxcclxuICAgICAgICBjbGFzc05hbWU6ICdjYXJkX19wcmljZScsXHJcbiAgICAgICAgY29udGVudDogYCR7aXRlbS5wcmljZS50b1N0cmluZygpfSAkYCxcclxuICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBDYXJkQWRkdG9DYXJ0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdjYXJkX19hZGQtdG8tY2FydCcgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBDYXJkQm94LmFwcGVuZChDYXJkTW9kZWwsIENhcmRQcmljZSwgQ2FyZEFkZHRvQ2FydCk7XHJcbiAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnN0IGNhcmRzOiBwcm9kdWN0W10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpISk7XHJcbiAgICAgICAgY2FyZHMuZm9yRWFjaCgoaXQpID0+IHtcclxuICAgICAgICAgIGlmIChpdC5pZCA9PT0gaXRlbS5pZCkge1xyXG4gICAgICAgICAgICBDYXJkQWRkdG9DYXJ0LmNsYXNzTGlzdC50b2dnbGUoJ19wcm9kdWN0LWFkZGVkJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3JlX19wcm9kdWN0cycpIS5hcHBlbmQoQ2FyZEJveCk7XHJcbiAgICAgIENhcmRBZGR0b0NhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgLy9Qcm9kdWN0c1RvTG9jYWxTdG9yYWdlLnB1c2goaXRlbSk7XHJcbiAgICAgICAgbGV0IHRvdGFscHJpY2UgPSAwO1xyXG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuICAgICAgICBsZXQgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlOiBwcm9kdWN0W10gPSBbXTtcclxuICAgICAgICBpZiAoQ2FyZEFkZHRvQ2FydC5jbGFzc0xpc3QuY29udGFpbnMoJ19wcm9kdWN0LWFkZGVkJykpIHtcclxuICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykhKTtcclxuICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UuZm9yRWFjaCgoaXQsIGluZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXQuaWQgPT09IGl0ZW0uaWQpIHtcclxuICAgICAgICAgICAgICBpbmRleCA9IGluZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2Uuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0cycsIEpTT04uc3RyaW5naWZ5KFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKSEpO1xyXG4gICAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENhcmRBZGR0b0NhcnQuY2xhc3NMaXN0LnRvZ2dsZSgnX3Byb2R1Y3QtYWRkZWQnKTtcclxuICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UuZm9yRWFjaCgoaXQpID0+IHtcclxuICAgICAgICAgIGNvdW50ZXIgKz0gaXQuY291bnRlcjtcclxuICAgICAgICAgIHRvdGFscHJpY2UgKz0gaXQuY291bnRlciAqIGl0LnByaWNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGNhcnRRdWFudGl0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudGVyLWJhc2tldCcpO1xyXG4gICAgICAgIGNvbnN0IEFsbFByaWNlQmFza2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsbC1wcmljZS1iYXNrZXQnKTtcclxuICAgICAgICBjb25zdCBiYXNrZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFza2V0LWltZycpO1xyXG4gICAgICAgIGlmIChjb3VudGVyICE9PSAwKSB7XHJcbiAgICAgICAgICBsZXQgY2MgPSAwO1xyXG4gICAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLmZvckVhY2goKGl0ZW0pID0+IChjYyArPSBpdGVtLmNvdW50ZXIpKTtcclxuICAgICAgICAgIGNhcnRRdWFudGl0eSEudGV4dENvbnRlbnQgPSBjYy50b1N0cmluZygpO1xyXG4gICAgICAgICAgY2FydFF1YW50aXR5IS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG4gICAgICAgICAgY2FydFF1YW50aXR5IS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgQWxsUHJpY2VCYXNrZXQhLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgYmFza2V0IS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgQWxsUHJpY2VCYXNrZXQhLnRleHRDb250ZW50ID0gJyQgJyArIHRvdGFscHJpY2UudG9TdHJpbmcoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2FydFF1YW50aXR5IS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgICBjYXJ0UXVhbnRpdHkhLnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICAgICAgICBBbGxQcmljZUJhc2tldCEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgIGJhc2tldCEuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vbG9jYWxTdG9yYWdlLnNldEl0ZW0oJycpXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3JlX19vcHRpb25CbG9jazEnKSEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldzEnKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkKSB7XHJcbiAgICAgICAgICBpZiAoQ2FyZEJveC5jbGFzc0xpc3QuY29udGFpbnMoJ19zbWFsbC12aWV3JykpIHtcclxuICAgICAgICAgICAgQ2FyZEJveC5jbGFzc0xpc3QucmVtb3ZlKCdfc21hbGwtdmlldycpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RvcmVfX29wdGlvbkJsb2NrMicpIS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBpZiAoKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3MicpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQpIHtcclxuICAgICAgICAgIENhcmRCb3guY2xhc3NMaXN0LmFkZCgnX3NtYWxsLXZpZXcnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAgIElNUE9SVFMgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbmltcG9ydCB7IENyZWF0ZVJhbmdlQmxvY2sgfSBmcm9tICcuL0NvbXBvbmVudHMvQ3JlYXRlUmFuZ2VCbG9jayc7XHJcbmltcG9ydCB7IENyZWF0ZVNvcnRNZW51IH0gZnJvbSAnLi9Db21wb25lbnRzL0NyZWF0ZVNvcnRNZW51JztcclxuaW1wb3J0IHsgQ3JlYXRlQ2hlY2tib3ggfSBmcm9tICcuL0VsZW1lbnRzL0NyZWF0ZUNoZWNrYm94JztcclxuaW1wb3J0IHsgQ3JlYXRlRWxlbWVudCB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlRWxlbWVudCc7XHJcbmltcG9ydCB7IENyZWF0ZUltYWdlIH0gZnJvbSAnLi9FbGVtZW50cy9DcmVhdGVJbWFnZSc7XHJcbmltcG9ydCBkYXRhIGZyb20gJy4vZGF0YSc7XHJcbmltcG9ydCBDcmVhdGVSb3V0ZSBmcm9tICcuL3JvdXRlJztcclxuaW1wb3J0IHsgQ3JlYXRlU2VhcmNoQmFyIH0gZnJvbSAnLi9Db21wb25lbnRzL0NyZWF0ZVNlYXJjaEJhcic7XHJcbmltcG9ydCB7IGZpbHRlcnMsIHByb2R1Y3QgfSBmcm9tICcuL0ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBDcmVhdGVSYWRpbyB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlUmFkaW8nO1xyXG5pbXBvcnQgeyBDcmVhdGVMaW5rIH0gZnJvbSAnLi9FbGVtZW50cy9DcmVhdGVMaW5rJztcclxuXHJcbmNsYXNzIENyZWF0ZURlZmF1bHRQYWdlIHtcclxuICAvLyDQv9C10YDQtdC80LXQvdC90LDRjyDQutC+0YLQvtGA0LDRjyDRhdGA0LDQvdC40YIgYm9keVxyXG4gIHByaXZhdGUgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcbiAgLy8g0KDQvtGD0YLQtdGAXHJcbiAgcHJpdmF0ZSByb3V0ZXIgPSBuZXcgQ3JlYXRlUm91dGUoKTtcclxuICAvLyDQvNC10YLQvtC0INGB0L7Qt9C00LDQtdGCIGhlYWRlclxyXG4gIENyZWF0ZUhlYWRlcigpIHtcclxuICAgIC8vINGB0L7Qt9C00LDQtdC8IGhlYWRlciwg0L/QtdGA0LXQtNCw0LXQvCDQsiDQutC+0L3RgdGC0YDRg9C60YLQvtGAINC90LUg0LLRgdC1INCy0L7Qt9C80L7QttC90YvQtSDQsNGA0LPRg9C80LXQvdGC0YssINC90L4g0L7QvSDQvdC1INGA0YPQs9Cw0LXRgtGB0Y9cclxuICAgIGNvbnN0IGhlYWRlciA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnaGVhZGVyJywgY2xhc3NOYW1lOiAnaGVhZGVyJyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCB3cmFwcGVyID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICd3cmFwcGVyIGhlYWRlcl9fd3JhcHBlcicgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgdGV4dEJsb2NrID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdoZWFkZXJfX3RleHQnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGNhcnRCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnaGVhZGVyX19jYXJ0JyB9KS5nZXRub2RlKCk7XHJcbiAgICB0aGlzLmJvZHkuYXBwZW5kKGhlYWRlcik7XHJcbiAgICBoZWFkZXIuYXBwZW5kKHdyYXBwZXIpO1xyXG4gICAgd3JhcHBlci5hcHBlbmQodGV4dEJsb2NrLCBjYXJ0QmxvY2spO1xyXG4gICAgY29uc3QgaDEgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2gxJywgY2xhc3NOYW1lOiAnaDEnLCBjb250ZW50OiAnT25saW5lIFN0b3JlJyB9KS5nZXRub2RlKCk7XHJcbiAgICB0aGlzLnJvdXRlci5BZGRSb3V0aW5nVG9IZWFkZXIoaDEpO1xyXG4gICAgY29uc3Qgc3VidGl0bGUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgIHRhZzogJ3NwYW4nLFxyXG4gICAgICBjbGFzc05hbWU6ICdoZWFkZXJfX3N1YnRpdGxlJyxcclxuICAgICAgY29udGVudDogJ2Jlc3QgcHJvZHVjdHMsIGJlc3Qgc2FsZXMsIGJlc3Qgc2VydmljZScsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICB0ZXh0QmxvY2suYXBwZW5kKGgxLCBzdWJ0aXRsZSk7XHJcbiAgICBjb25zdCBjYXJ0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdjYXJ0JywgaWQ6ICdiYXNrZXQnIH0pLmdldG5vZGUoKTtcclxuICAgIHRoaXMucm91dGVyLkFkZFJvdXRpbmdUb0Jhc2tldChjYXJ0KTtcclxuICAgIGNhcnRCbG9jay5hcHBlbmQoY2FydCk7XHJcbiAgICBjb25zdCBjYXJ0SWNvbiA9IG5ldyBDcmVhdGVJbWFnZSh7XHJcbiAgICAgIHNyYzogJy4vYXNzZXRzL2ltYWdlcy9jYXJ0LnN2ZycsXHJcbiAgICAgIGNsYXNzTmFtZTogJ2NhcnRfX2ljb24nLFxyXG4gICAgICBhbHQ6ICdjYXJ0IGljb24nLFxyXG4gICAgICBpZDogJ2Jhc2tldC1pbWcnLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgY2FydFRvdGFsID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICB0YWc6ICdzcGFuJyxcclxuICAgICAgY2xhc3NOYW1lOiAnY2FydF9fdG90YWwnLFxyXG4gICAgICBpZDogJ2FsbC1wcmljZS1iYXNrZXQnLFxyXG4gICAgICBjb250ZW50OiAnMTAwMDAkJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGNhcnRRdWFudGl0eSA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ2NhcnRfX3F1YW50aXR5JyxcclxuICAgICAgaWQ6ICdjb3VudGVyLWJhc2tldCcsXHJcbiAgICAgIGNvbnRlbnQ6ICcxJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKSAhPT0gbnVsbCkge1xyXG4gICAgICBjb25zdCBEYXRhRnJvbUxvY2FsOiBwcm9kdWN0W10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpISk7XHJcbiAgICAgIGlmIChEYXRhRnJvbUxvY2FsLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgIGxldCBjYyA9IDA7XHJcbiAgICAgICAgbGV0IHRvdGFscHJpY2UgPSAwO1xyXG4gICAgICAgIERhdGFGcm9tTG9jYWwuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgY2MgKz0gaXRlbS5jb3VudGVyO1xyXG4gICAgICAgICAgdG90YWxwcmljZSArPSBpdGVtLnByaWNlICogaXRlbS5jb3VudGVyO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNhcnRRdWFudGl0eS50ZXh0Q29udGVudCA9IGNjLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY2FydFF1YW50aXR5LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcbiAgICAgICAgY2FydFF1YW50aXR5LnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgY2FydFRvdGFsLnRleHRDb250ZW50ID0gJyQgJyArIHRvdGFscHJpY2UudG9TdHJpbmcoKTtcclxuICAgICAgICBjYXJ0VG90YWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgY2FydEljb24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAvL2NhcnRRdWFudGl0eS5jbGFzc0xpc3QuYWRkKCdjYXJ0X19xdWFudGl0eV92aXNpYmxlJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNhcnQuYXBwZW5kKGNhcnRJY29uLCBjYXJ0VG90YWwsIGNhcnRRdWFudGl0eSk7XHJcbiAgfVxyXG4gIC8vINC80LXRgtC+0LQg0LTQu9GPIG1haW5cclxuICBDcmVhdGVNYWluKGZpbHRlcnM6IGZpbHRlcnMsIFByb2R1Y3RzQ2FyZHM6IHByb2R1Y3RbXSkge1xyXG4gICAgdGhpcy5yb3V0ZXIuR2V0RmlsdGVycyhmaWx0ZXJzKTtcclxuICAgIGNvbnN0IHByb2R1Y3QgPSBuZXcgZGF0YSgpO1xyXG4gICAgY29uc3QgbWFpbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnbWFpbicsIGNsYXNzTmFtZTogJ21haW4nIH0pLmdldG5vZGUoKTtcclxuICAgIHRoaXMuYm9keS5hcHBlbmQobWFpbik7XHJcbiAgICBjb25zdCB3cmFwcGVyID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICd3cmFwcGVyIG1haW5fX3dyYXBwZXInIH0pLmdldG5vZGUoKTtcclxuICAgIG1haW4uYXBwZW5kKHdyYXBwZXIpO1xyXG4gICAgLy8gQ3JlYXRlQXNpZGVcclxuICAgIGNvbnN0IGFzaWRlID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdhc2lkZScsIGNsYXNzTmFtZTogJ2FzaWRlJyB9KS5nZXRub2RlKCk7XHJcbiAgICB3cmFwcGVyLmFwcGVuZChhc2lkZSk7XHJcbiAgICBjb25zdCBidXR0b25Ub3AgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgIHRhZzogJ2J1dHRvbicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ2J1dHRvbiBhc2lkZV9fYnV0dG9uJyxcclxuICAgICAgY29udGVudDogJ1Jlc2V0JyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIHRoaXMucm91dGVyLkFkZFJvdXRpbmdUb0hlYWRlcihidXR0b25Ub3ApO1xyXG4gICAgY29uc3QgY2F0ZWdvcmllcyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnYXNpZGVfX2Nob2ljZSBjaG9pY2UtbWVudScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgYnJhbmRzID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdhc2lkZV9fY2hvaWNlIGNob2ljZS1tZW51JyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBDdXJyZW50UHJpY2UgPSBwcm9kdWN0LkdldEN1cnJlbnRNaW5NYXhQcmljZShQcm9kdWN0c0NhcmRzKTtcclxuICAgIGNvbnN0IE1heE1pblByaWNlcyA9IHByb2R1Y3QuR2V0TWluTWF4UHJpY2UoKTtcclxuICAgIGNvbnN0IHByaXNlcyA9IG5ldyBDcmVhdGVSYW5nZUJsb2NrKHtcclxuICAgICAgdGl0bGU6ICdQcmlzZXMnLFxyXG4gICAgICBmcm9tOiBgJCAke2ZpbHRlcnMuTWluUHJpY2V9YCxcclxuICAgICAgdG86IGAkICR7ZmlsdGVycy5NYXhQcmljZX1gLFxyXG4gICAgICByYW5nZTFNaW46IE1heE1pblByaWNlcy5taW4sXHJcbiAgICAgIHJhbmdlMU1heDogTWF4TWluUHJpY2VzLm1heCxcclxuICAgICAgcmFuZ2UxVmFsdWU6IGZpbHRlcnMuTWluUHJpY2UsXHJcbiAgICAgIHJhbmdlMk1pbjogTWF4TWluUHJpY2VzLm1pbixcclxuICAgICAgcmFuZ2UyTWF4OiBNYXhNaW5QcmljZXMubWF4LFxyXG4gICAgICByYW5nZTJWYWx1ZTogZmlsdGVycy5NYXhQcmljZSxcclxuICAgICAgaXNQcmljZTogdHJ1ZSxcclxuICAgICAgaWQ6ICdwcmljZS1zbGlkZXInLFxyXG4gICAgICByb3V0ZXI6IHRoaXMucm91dGVyLFxyXG4gICAgICBmaWx0ZXJzOiBmaWx0ZXJzLFxyXG4gICAgICBjdXJyZW50OiBDdXJyZW50UHJpY2UsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBDdXJyZW50RGF0ZSA9IHByb2R1Y3QuR2V0Q3VycmVudE1pbk1heERhdGUoUHJvZHVjdHNDYXJkcyk7XHJcbiAgICBjb25zdCBNYXhNaW5EYXRlID0gcHJvZHVjdC5HZXRNaW5NYXhEYXRlKCk7XHJcbiAgICBjb25zdCB5ZWFyID0gbmV3IENyZWF0ZVJhbmdlQmxvY2soe1xyXG4gICAgICB0aXRsZTogJ1JlbGVhc2UgZGF0ZScsXHJcbiAgICAgIGZyb206IGZpbHRlcnMuTWluWWVhcixcclxuICAgICAgdG86IGZpbHRlcnMuTWF4WWVhcixcclxuICAgICAgcmFuZ2UxTWluOiBNYXhNaW5EYXRlLm1pbixcclxuICAgICAgcmFuZ2UxTWF4OiBNYXhNaW5EYXRlLm1heCxcclxuICAgICAgcmFuZ2UxVmFsdWU6IGZpbHRlcnMuTWluWWVhcixcclxuICAgICAgcmFuZ2UyTWluOiBNYXhNaW5EYXRlLm1pbixcclxuICAgICAgcmFuZ2UyTWF4OiBNYXhNaW5EYXRlLm1heCxcclxuICAgICAgcmFuZ2UyVmFsdWU6IGZpbHRlcnMuTWF4WWVhcixcclxuICAgICAgaXNQcmljZTogZmFsc2UsXHJcbiAgICAgIGlkOiAneWVhci1zbGlkZXInLFxyXG4gICAgICByb3V0ZXI6IHRoaXMucm91dGVyLFxyXG4gICAgICBmaWx0ZXJzOiBmaWx0ZXJzLFxyXG4gICAgICBjdXJyZW50OiBDdXJyZW50RGF0ZSxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGJ1dHRvbkJvdHRvbSA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgdGFnOiAnYnV0dG9uJyxcclxuICAgICAgY2xhc3NOYW1lOiAnYnV0dG9uIGFzaWRlX19idXR0b24nLFxyXG4gICAgICBjb250ZW50OiAnQ29weSBzZWFyY2ggbGluaycsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBidXR0b25Cb3R0b20uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgIH0pO1xyXG4gICAgYXNpZGUuYXBwZW5kKGJ1dHRvblRvcCwgY2F0ZWdvcmllcywgYnJhbmRzLCBwcmlzZXMsIHllYXIsIGJ1dHRvbkJvdHRvbSk7XHJcbiAgICBjb25zdCBjYXRlZ29yaWVzVGl0bGUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgIHRhZzogJ2gyJyxcclxuICAgICAgY2xhc3NOYW1lOiAnY2hvaWNlLW1lbnVfX3RpdGxlJyxcclxuICAgICAgY29udGVudDogJ0NhdGVnb3J5JyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNhdGVnb3JpZXMuYXBwZW5kKGNhdGVnb3JpZXNUaXRsZSk7XHJcbiAgICBjb25zdCBMaXN0Q2F0ZWdvcmllcyA9IHByb2R1Y3QuR2V0Q2F0ZWdvcmllcyhQcm9kdWN0c0NhcmRzKTtcclxuICAgIC8vY29uc3QgTGlzdE9mQ3VycmVudENhdGVnb3JpZXMgPSBwcm9kdWN0LkdldEN1cnJlbnRDYXRlZ29yaWVzKFByb2R1Y3RzQ2FyZHMpO1xyXG4gICAgTGlzdENhdGVnb3JpZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBjb25zdCBjdXJyZW50OiBbSFRNTElucHV0RWxlbWVudCwgSFRNTExhYmVsRWxlbWVudF0gPSBuZXcgQ3JlYXRlQ2hlY2tib3goe1xyXG4gICAgICAgIHR5cGU6ICdjaGVja2JveCcsXHJcbiAgICAgICAgbmFtZTogJ0NhdGVnb3J5JyxcclxuICAgICAgICBpZDogaXRlbS5jYXRlZ29yeSxcclxuICAgICAgICB2YWx1ZTogaXRlbS5jYXRlZ29yeSxcclxuICAgICAgICBjbGFzc05hbWU6ICdjaG9pY2UtbWVudV9fb3B0aW9uJyxcclxuICAgICAgICBDb3VudDogaXRlbS5jb3VudCxcclxuICAgICAgICBDdXJyZW50OiBpdGVtLkN1cnJlbnRDYXRlZ29yeSxcclxuICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJzLkNhdGVnb3J5LFxyXG4gICAgICB9KS5nZXRub2RlKCk7XHJcbiAgICAgIHRoaXMucm91dGVyLkFkZFJvdXRpbmdUb0NhdGVnb3J5KGN1cnJlbnRbMF0pO1xyXG4gICAgICBjYXRlZ29yaWVzLmFwcGVuZChjdXJyZW50WzBdLCBjdXJyZW50WzFdKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgYnJhbmRzVGl0bGUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2gyJywgY2xhc3NOYW1lOiAnY2hvaWNlLW1lbnVfX3RpdGxlJywgY29udGVudDogJ0JyYW5kJyB9KS5nZXRub2RlKCk7XHJcbiAgICBicmFuZHMuYXBwZW5kKGJyYW5kc1RpdGxlKTtcclxuICAgIGNvbnN0IExpc3RCcmFuZHMgPSBwcm9kdWN0LkdldEJyYW5kcyhQcm9kdWN0c0NhcmRzKTtcclxuICAgIExpc3RCcmFuZHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBjb25zdCBjdXJyZW50ID0gbmV3IENyZWF0ZUNoZWNrYm94KHtcclxuICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgICAgIG5hbWU6ICdDYXRlZ29yeScsXHJcbiAgICAgICAgaWQ6IGl0ZW0uYnJhbmQsXHJcbiAgICAgICAgdmFsdWU6IGl0ZW0uYnJhbmQsXHJcbiAgICAgICAgY2xhc3NOYW1lOiAnY2hvaWNlLW1lbnVfX29wdGlvbicsXHJcbiAgICAgICAgQ291bnQ6IGl0ZW0uY291bnQsXHJcbiAgICAgICAgQ3VycmVudDogaXRlbS5DdXJyZW50QnJhbmQsXHJcbiAgICAgICAgZmlsdGVyczogZmlsdGVycy5CcmFuZCxcclxuICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICB0aGlzLnJvdXRlci5BZGRSb3V0aW5nVG9CcmFuZChjdXJyZW50WzBdKTtcclxuICAgICAgYnJhbmRzLmFwcGVuZChjdXJyZW50WzBdLCBjdXJyZW50WzFdKTtcclxuICAgIH0pO1xyXG4gICAgLy8gQ3JlYXRlU3RvcmVcclxuICAgIGNvbnN0IHN0b3JlID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzdG9yZScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgd3JhcHBlci5hcHBlbmQoc3RvcmUpO1xyXG4gICAgY29uc3QgbWVudSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc3RvcmVfX21lbnUnIH0pLmdldG5vZGUoKTtcclxuICAgIC8vLy8vICBtZW51XHJcbiAgICBjb25zdCB2aWV3T3B0aW9ucyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc3RvcmVfX3ZpZXcnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHZpZXdCbG9jazEgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgIHRhZzogJ2RpdicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ3N0b3JlX19vcHRpb25CbG9jazEnLFxyXG4gICAgICBpZDogJ3N0b3JlX19vcHRpb25CbG9jazEnLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgdmlldzEgPSBuZXcgQ3JlYXRlUmFkaW8oe1xyXG4gICAgICB0eXBlOiAncmFkaW8nLFxyXG4gICAgICB2YWx1ZTogJycsXHJcbiAgICAgIGlkOiAndmlldzEnLFxyXG4gICAgICBuYW1lOiAndmlldycsXHJcbiAgICAgIGNsYXNzTmFtZTogJ3ZpZXctb3B0aW9uMScsXHJcbiAgICAgIGNoZWNrZWQ6IHRydWUsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICB2aWV3QmxvY2sxLmFwcGVuZCh2aWV3MVswXSwgdmlldzFbMV0pO1xyXG4gICAgY29uc3QgdmlldzIgPSBuZXcgQ3JlYXRlUmFkaW8oe1xyXG4gICAgICB0eXBlOiAncmFkaW8nLFxyXG4gICAgICB2YWx1ZTogJycsXHJcbiAgICAgIGlkOiAndmlldzInLFxyXG4gICAgICBuYW1lOiAndmlldycsXHJcbiAgICAgIGNsYXNzTmFtZTogJ3ZpZXctb3B0aW9uMicsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCB2aWV3QmxvY2syID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICB0YWc6ICdkaXYnLFxyXG4gICAgICBjbGFzc05hbWU6ICdzdG9yZV9fb3B0aW9uQmxvY2syJyxcclxuICAgICAgaWQ6ICdzdG9yZV9fb3B0aW9uQmxvY2syJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIHZpZXdCbG9jazIuYXBwZW5kKHZpZXcyWzBdLCB2aWV3MlsxXSk7XHJcbiAgICB2aWV3T3B0aW9ucy5hcHBlbmQodmlld0Jsb2NrMSwgdmlld0Jsb2NrMik7XHJcbiAgICAvLy8vLy8vXHJcbiAgICBjb25zdCBmb3VuZFByb2R1Y3RzID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICB0YWc6ICdkaXYnLFxyXG4gICAgICBjbGFzc05hbWU6ICdzdG9yZV9fcXVhbnRpdHknLFxyXG4gICAgICBjb250ZW50OiAnRm91bmQgOiAnLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgcHJvZHVjdHNBbW1vdW50ID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICB0YWc6ICdzcGFuJyxcclxuICAgICAgY2xhc3NOYW1lOiAnc3RvcmVfX3F1YW50aXR5LWZvdW5kJyxcclxuICAgICAgY29udGVudDogUHJvZHVjdHNDYXJkcy5sZW5ndGgudG9TdHJpbmcoKSxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGZvdW5kUHJvZHVjdHMuYXBwZW5kKHByb2R1Y3RzQW1tb3VudCk7XHJcbiAgICBjb25zdCBzb3J0TWVudSA9IG5ldyBDcmVhdGVTb3J0TWVudSh7XHJcbiAgICAgIHRhZzogJ2RpdicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ3NvcnQtbWVudScsXHJcbiAgICAgIHJvdXRlcjogdGhpcy5yb3V0ZXIsXHJcbiAgICAgIGZpbHRlcjogZmlsdGVycy5Tb3J0LFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3Qgc2VhcmNoQmFyID0gbmV3IENyZWF0ZVNlYXJjaEJhcih7XHJcbiAgICAgIHRhZzogJ2RpdicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ3NlYXJjaCcsXHJcbiAgICAgIHJvdXRlcjogdGhpcy5yb3V0ZXIsXHJcbiAgICAgIGZpbHRlcjogZmlsdGVycy5TZWFyY2gsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBtZW51LmFwcGVuZCh2aWV3T3B0aW9ucywgZm91bmRQcm9kdWN0cywgc2VhcmNoQmFyLCBzb3J0TWVudSk7XHJcblxyXG4gICAgLy8vLy8gcHJvZHVjdHNcclxuXHJcbiAgICBjb25zdCBwcm9kdWN0cyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc3RvcmVfX3Byb2R1Y3RzJywgaWQ6ICdzdG9yZV9fcHJvZHVjdHMnIH0pLmdldG5vZGUoKTtcclxuICAgIHN0b3JlLmFwcGVuZChtZW51LCBwcm9kdWN0cyk7XHJcbiAgfVxyXG4gIC8vINC80LXRgtC+0LQg0LTQu9GPIGZvb3RlclxyXG4gIENyZWF0ZUZvb3RlcigpIHtcclxuICAgIGNvbnN0IGZvb3RlciA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZm9vdGVyJywgY2xhc3NOYW1lOiAnZm9vdGVyJyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCB3cmFwcGVyID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICd3cmFwcGVyIGZvb3Rlcl9fd3JhcHBlcicgfSkuZ2V0bm9kZSgpO1xyXG4gICAgZm9vdGVyLmFwcGVuZCh3cmFwcGVyKTtcclxuICAgIHRoaXMuYm9keS5hcHBlbmQoZm9vdGVyKTtcclxuICAgIGNvbnN0IGNhcnRCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9vdGVyX19jYXJ0JyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBmb290ZXJDYXJ0ID0gbmV3IENyZWF0ZUxpbmsoe1xyXG4gICAgICBocmVmOiAnaHR0cHM6Ly9ycy5zY2hvb2wvanMvJyxcclxuICAgICAgdGFyZ2V0OiAnX2JsYW5rJyxcclxuICAgICAgY2xhc3NOYW1lOiAnZm9vdGVyX19jYXJ0X2xpZ2h0JyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZvb3Rlckljb24gPSBuZXcgQ3JlYXRlSW1hZ2Uoe1xyXG4gICAgICBzcmM6ICcuL2Fzc2V0cy9pbWFnZXMvbG9nb19yc190ZXh0LnN2ZycsXHJcbiAgICAgIGFsdDogJ1JTIFNjaG9vbCcsXHJcbiAgICAgIGNsYXNzTmFtZTogJ2Zvb3Rlcl9fbG9nbycsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCByZWZlcmVuY2VzID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdmb290ZXJfX3JlZmVyZW5jZXMnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHllYXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBjbGFzc05hbWU6ICdmb290ZXJfX3llYXInLCBjb250ZW50OiAnMjAyMicgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgU2FzaGFMaW5rID0gbmV3IENyZWF0ZUxpbmsoe1xyXG4gICAgICBocmVmOiAnaHR0cHM6Ly9naXRodWIuY29tL2JhbGF4b24nLFxyXG4gICAgICB0YXJnZXQ6ICdfYmxhbmsnLFxyXG4gICAgICBjbGFzc05hbWU6ICdmb290ZXJfX1Nhc2hhR2l0JyxcclxuICAgICAgY29udGVudDogJ2JhbGF4b24nLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgTmF0YUxpbmsgPSBuZXcgQ3JlYXRlTGluayh7XHJcbiAgICAgIGhyZWY6ICdodHRwczovL2dpdGh1Yi5jb20vRW5heWFBbWUnLFxyXG4gICAgICB0YXJnZXQ6ICdfYmxhbmsnLFxyXG4gICAgICBjbGFzc05hbWU6ICdmb290ZXJfX05hdGFHaXQnLFxyXG4gICAgICBjb250ZW50OiAnRW5heWFBbWUnLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgcmVmZXJlbmNlcy5hcHBlbmQoU2FzaGFMaW5rLCBOYXRhTGluaywgeWVhcik7XHJcbiAgICBmb290ZXJDYXJ0LmFwcGVuZChmb290ZXJJY29uKTtcclxuICAgIGNhcnRCbG9jay5hcHBlbmQoZm9vdGVyQ2FydCk7XHJcbiAgICB3cmFwcGVyLmFwcGVuZChjYXJ0QmxvY2ssIHJlZmVyZW5jZXMpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gY29uc3QgUGFnZSA9IG5ldyBDcmVhdGVEZWZhdWx0UGFnZSgpO1xyXG5cclxuLy8gUGFnZS5DcmVhdGVIZWFkZXIoKTtcclxuLy8gUGFnZS5DcmVhdGVNYWluKCk7XHJcbi8vIFBhZ2UuQ3JlYXRlRm9vdGVyKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDcmVhdGVEZWZhdWx0UGFnZTtcclxuIiwiaW1wb3J0IHsgQ29uc3RydWN0b3JDaGVja2JveCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENyZWF0ZUNoZWNrYm94IHtcclxuICBwcml2YXRlIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHByaXZhdGUgbGFiZWw6IEhUTUxMYWJlbEVsZW1lbnQ7XHJcbiAgY29uc3RydWN0b3IoeyB0eXBlLCBuYW1lLCBpZCwgdmFsdWUsIGNsYXNzTmFtZSwgQ291bnQsIEN1cnJlbnQsIGZpbHRlcnMgfTogQ29uc3RydWN0b3JDaGVja2JveCkge1xyXG4gICAgdGhpcy5pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICB0aGlzLmlucHV0LnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5pbnB1dC5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuaW5wdXQuaWQgPSBpZDtcclxuICAgIHRoaXMuaW5wdXQudmFsdWUgPSB2YWx1ZTtcclxuXHJcbiAgICBmaWx0ZXJzPy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGlmIChpdGVtID09PSB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuaW5wdXQuY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKGNsYXNzTmFtZSkge1xyXG4gICAgICB0aGlzLmlucHV0LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgIH1cclxuICAgIHRoaXMubGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgdGhpcy5sYWJlbC5odG1sRm9yID0gaWQ7XHJcbiAgICB0aGlzLmxhYmVsLnRleHRDb250ZW50ID0gdmFsdWU7XHJcbiAgICBjb25zdCBxdWFudGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIHF1YW50aXR5LnRleHRDb250ZW50ID0gYCAgKCR7Q3VycmVudH0vJHtDb3VudH0pYDtcclxuICAgIHRoaXMubGFiZWwuYXBwZW5kKHF1YW50aXR5KTtcclxuICB9XHJcbiAgZ2V0bm9kZSgpIHtcclxuICAgIGNvbnN0IGFycjogW0hUTUxJbnB1dEVsZW1lbnQsIEhUTUxMYWJlbEVsZW1lbnRdID0gW3RoaXMuaW5wdXQsIHRoaXMubGFiZWxdO1xyXG4gICAgcmV0dXJuIGFycjtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29uc3RydWN0b3JFbGVtZW50IH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3JlYXRlRWxlbWVudCB7XHJcbiAgcHJvdGVjdGVkIGVsOiBIVE1MRWxlbWVudDtcclxuICBjb25zdHJ1Y3Rvcih7IHRhZywgaWQsIGNsYXNzTmFtZSwgY29udGVudCwgQmFja2dyb3VuZEltZyB9OiBDb25zdHJ1Y3RvckVsZW1lbnQpIHtcclxuICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcbiAgICBpZiAoaWQpIHtcclxuICAgICAgdGhpcy5lbC5pZCA9IGlkO1xyXG4gICAgfVxyXG4gICAgaWYgKGNsYXNzTmFtZSkge1xyXG4gICAgICB0aGlzLmVsLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuICAgIH1cclxuICAgIGlmIChjb250ZW50KSB7XHJcbiAgICAgIHRoaXMuZWwudGV4dENvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgfVxyXG4gICAgaWYgKEJhY2tncm91bmRJbWcpIHtcclxuICAgICAgdGhpcy5lbC5zdHlsZS5iYWNrZ3JvdW5kID0gYHdoaXRlIHVybCgnJHtCYWNrZ3JvdW5kSW1nfScpIG5vLXJlcGVhdCBjZW50ZXIgLyBjb250YWluYDtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0bm9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmVsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb25zdHJ1Y3RvckltYWdlIH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3JlYXRlSW1hZ2Uge1xyXG4gIHByaXZhdGUgZWw6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgY29uc3RydWN0b3IoeyBzcmMsIGlkLCBjbGFzc05hbWUsIGFsdCB9OiBDb25zdHJ1Y3RvckltYWdlKSB7XHJcbiAgICB0aGlzLmVsID0gbmV3IEltYWdlKCk7XHJcbiAgICB0aGlzLmVsLnNyYyA9IHNyYztcclxuICAgIGlmIChpZCkge1xyXG4gICAgICB0aGlzLmVsLmlkID0gaWQ7XHJcbiAgICB9XHJcbiAgICBpZiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGFsdCkge1xyXG4gICAgICB0aGlzLmVsLmFsdCA9IGFsdDtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0bm9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmVsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb25zdHJ1Y3RvckxpbmsgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDcmVhdGVMaW5rIHtcclxuICBwcml2YXRlIGxpbms6IEhUTUxBbmNob3JFbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3Rvcih7IGhyZWYsIGlkLCBjbGFzc05hbWUsIHRhcmdldCwgY29udGVudCB9OiBDb25zdHJ1Y3RvckxpbmspIHtcclxuICAgIHRoaXMubGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgIHRoaXMubGluay5ocmVmID0gaHJlZjtcclxuICAgIGlmIChjb250ZW50KSB7XHJcbiAgICAgIHRoaXMubGluay50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICB9XHJcbiAgICBpZiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgIHRoaXMubGluay5jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcbiAgICB9XHJcbiAgICBpZiAoaWQpIHtcclxuICAgICAgdGhpcy5saW5rLmlkID0gaWQ7XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgIHRoaXMubGluay50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRub2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGluaztcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29uc3RydWN0b3JOdW1iZXJJbnB1dCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENyZWF0ZU51bWJlcklucHV0IHtcclxuICBwcml2YXRlIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIGNvbnN0cnVjdG9yKHsgdHlwZSwgdmFsdWUsIGlkLCBjbGFzc05hbWUsIHBsYWNlaG9sZGVyLCByZXF1aXJlZCB9OiBDb25zdHJ1Y3Rvck51bWJlcklucHV0KSB7XHJcbiAgICB0aGlzLmlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIHRoaXMuaW5wdXQudHlwZSA9IHR5cGU7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5pbnB1dC52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKGlkKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuaWQgPSBpZDtcclxuICAgIH1cclxuICAgIGlmIChjbGFzc05hbWUpIHtcclxuICAgICAgdGhpcy5pbnB1dC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICB9XHJcbiAgICBpZiAocGxhY2Vob2xkZXIpIHtcclxuICAgICAgdGhpcy5pbnB1dC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xyXG4gICAgfVxyXG4gICAgaWYgKHJlcXVpcmVkKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQucmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRub2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5wdXQ7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbnN0cnVjdG9yUmFkaW8gfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDcmVhdGVSYWRpbyB7XHJcbiAgcHJpdmF0ZSBpbnB1dDogSFRNTElucHV0RWxlbWVudDtcclxuICBwcml2YXRlIGxhYmVsOiBIVE1MTGFiZWxFbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3Rvcih7IHR5cGUsIHZhbHVlLCBpZCwgbmFtZSwgY2xhc3NOYW1lLCBjaGVja2VkIH06IENvbnN0cnVjdG9yUmFkaW8pIHtcclxuICAgIHRoaXMubGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgdGhpcy5sYWJlbC5odG1sRm9yID0gaWQ7XHJcbiAgICB0aGlzLmxhYmVsLnRleHRDb250ZW50ID0gdmFsdWU7XHJcblxyXG4gICAgdGhpcy5pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICB0aGlzLmlucHV0LnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5pbnB1dC5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuaW5wdXQuaWQgPSBpZDtcclxuICAgIGlmIChjbGFzc05hbWUpIHtcclxuICAgICAgdGhpcy5pbnB1dC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hlY2tlZCkge1xyXG4gICAgICB0aGlzLmlucHV0LmNoZWNrZWQgPSBjaGVja2VkO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRub2RlKCkge1xyXG4gICAgY29uc3QgYXJyOiBbSFRNTElucHV0RWxlbWVudCwgSFRNTExhYmVsRWxlbWVudF0gPSBbdGhpcy5pbnB1dCwgdGhpcy5sYWJlbF07XHJcbiAgICByZXR1cm4gYXJyO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb25zdHJ1Y3RvclJhbmdlIH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3JlYXRlUmFuZ2Uge1xyXG4gIHByaXZhdGUgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgY29uc3RydWN0b3IoeyB0eXBlLCBtaW4sIG1heCwgdmFsdWUsIGlkLCBjbGFzc05hbWUgfTogQ29uc3RydWN0b3JSYW5nZSkge1xyXG4gICAgdGhpcy5pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICB0aGlzLmlucHV0LnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5pbnB1dC5taW4gPSBtaW47XHJcbiAgICB0aGlzLmlucHV0Lm1heCA9IG1heDtcclxuICAgIHRoaXMuaW5wdXQuaWQgPSBpZDtcclxuICAgIHRoaXMuaW5wdXQudmFsdWUgPSB2YWx1ZTtcclxuICAgIGlmIChjbGFzc05hbWUpIHtcclxuICAgICAgdGhpcy5pbnB1dC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldG5vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnB1dDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29uc3RydWN0b3RUZXh0SW5wdXQgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDcmVhdGVUZXh0SW5wdXQge1xyXG4gIHByaXZhdGUgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgY29uc3RydWN0b3IoeyB0eXBlLCBwbGFjZWhvbGRlciwgbmFtZSwgY2xhc3NOYW1lLCBpZCwgcmVxdWlyZWQgfTogQ29uc3RydWN0b3RUZXh0SW5wdXQpIHtcclxuICAgIHRoaXMuaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgdGhpcy5pbnB1dC50eXBlID0gdHlwZTtcclxuICAgIHRoaXMuaW5wdXQubmFtZSA9IG5hbWU7XHJcbiAgICBpZiAocGxhY2Vob2xkZXIpIHtcclxuICAgICAgdGhpcy5pbnB1dC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xyXG4gICAgfVxyXG4gICAgaWYgKGNsYXNzTmFtZSkge1xyXG4gICAgICB0aGlzLmlucHV0LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgIH1cclxuICAgIGlmIChyZXF1aXJlZCkge1xyXG4gICAgICB0aGlzLmlucHV0LnJlcXVpcmVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChpZCkge1xyXG4gICAgICB0aGlzLmlucHV0LmlkID0gaWQ7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldG5vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnB1dDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHByb2R1Y3RzIGZyb20gJy4uL2Fzc2V0cy9maWxlcy9kYXRhLmpzb24nO1xyXG5pbXBvcnQgeyBBcHBseVNvcnQgfSBmcm9tICcuL0FwcGx5U29ydCc7XHJcbmltcG9ydCB7IEdldE1pbk1heCwgcHJvZHVjdCB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XHJcblxyXG5pbnRlcmZhY2UgR2V0Q2F0ZWdvcmllcyB7XHJcbiAgY2F0ZWdvcnk6IHN0cmluZztcclxuICBjb3VudDogbnVtYmVyO1xyXG4gIEN1cnJlbnRDYXRlZ29yeTogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgR2V0QnJhbmRzIHtcclxuICBicmFuZDogc3RyaW5nO1xyXG4gIGNvdW50OiBudW1iZXI7XHJcbiAgQ3VycmVudEJyYW5kOiBudW1iZXI7XHJcbn1cclxuXHJcbmNsYXNzIGRhdGEge1xyXG4gIHByaXZhdGUgTGlzdENhdGVnb3JpZXM6IHN0cmluZ1tdID0gW107XHJcbiAgcHJpdmF0ZSBhcnI6IHByb2R1Y3RbXSA9IHByb2R1Y3RzO1xyXG4gIHByaXZhdGUgTGlzdEJyYW5kczogc3RyaW5nW10gPSBbXTtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuYXJyLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgaWYgKHRoaXMuTGlzdENhdGVnb3JpZXMuaW5jbHVkZXMoaXRlbS5jYXRlZ29yeSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5MaXN0Q2F0ZWdvcmllcy5wdXNoKGl0ZW0uY2F0ZWdvcnkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYXJyLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgaWYgKHRoaXMuTGlzdEJyYW5kcy5pbmNsdWRlcyhpdGVtLmJyYW5kKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLkxpc3RCcmFuZHMucHVzaChpdGVtLmJyYW5kKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIEdldCgpIHtcclxuICAgIHJldHVybiBwcm9kdWN0cztcclxuICB9XHJcbiAgR2V0Q2F0ZWdvcmllcyhjYXRlZ29yaWVzOiBwcm9kdWN0W10pOiBHZXRDYXRlZ29yaWVzW10ge1xyXG4gICAgY29uc3QgY2F0ID0gbmV3IEFwcGx5U29ydCgnU29ydCBieScsIHByb2R1Y3RzKS5yZXR1cm4oKTtcclxuICAgIHRoaXMuTGlzdENhdGVnb3JpZXMgPSBbXTtcclxuICAgIGNhdC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLkxpc3RDYXRlZ29yaWVzLmluY2x1ZGVzKGl0ZW0uY2F0ZWdvcnkpID09PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuTGlzdENhdGVnb3JpZXMucHVzaChpdGVtLmNhdGVnb3J5KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBSZXNDYXRlZ29yeTogR2V0Q2F0ZWdvcmllc1tdID0gW107XHJcbiAgICB0aGlzLkxpc3RDYXRlZ29yaWVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICBsZXQgY3VycmVudCA9IDA7XHJcbiAgICAgIHRoaXMuYXJyLmZvckVhY2goKGl0KSA9PiB7XHJcbiAgICAgICAgaWYgKGl0ZW0gPT09IGl0LmNhdGVnb3J5KSB7XHJcbiAgICAgICAgICBjb3VudGVyICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgY2F0ZWdvcmllcy5mb3JFYWNoKChpdCkgPT4ge1xyXG4gICAgICAgIGlmIChpdC5jYXRlZ29yeSA9PT0gaXRlbSkge1xyXG4gICAgICAgICAgY3VycmVudCArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnN0IG9iajogR2V0Q2F0ZWdvcmllcyA9IHtcclxuICAgICAgICBjYXRlZ29yeTogaXRlbSxcclxuICAgICAgICBjb3VudDogY291bnRlcixcclxuICAgICAgICBDdXJyZW50Q2F0ZWdvcnk6IGN1cnJlbnQsXHJcbiAgICAgIH07XHJcbiAgICAgIFJlc0NhdGVnb3J5LnB1c2gob2JqKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIFJlc0NhdGVnb3J5O1xyXG4gIH1cclxuICBHZXRCcmFuZHMoYnJhbmRzOiBwcm9kdWN0W10pOiBHZXRCcmFuZHNbXSB7XHJcbiAgICB0aGlzLkxpc3RCcmFuZHMgPSBbXTtcclxuICAgIGNvbnN0IGJyYW5kID0gbmV3IEFwcGx5U29ydCgnU29ydCBieScsIHByb2R1Y3RzKS5yZXR1cm4oKTtcclxuICAgIGJyYW5kLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgaWYgKHRoaXMuTGlzdEJyYW5kcy5pbmNsdWRlcyhpdGVtLmJyYW5kKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLkxpc3RCcmFuZHMucHVzaChpdGVtLmJyYW5kKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBSZXNCcmFuZHM6IEdldEJyYW5kc1tdID0gW107XHJcbiAgICB0aGlzLkxpc3RCcmFuZHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBsZXQgY291bnRlciA9IDA7XHJcbiAgICAgIGxldCBjdXJyZW50ID0gMDtcclxuICAgICAgdGhpcy5hcnIuZm9yRWFjaCgoaXQpID0+IHtcclxuICAgICAgICBpZiAoaXRlbSA9PT0gaXQuYnJhbmQpIHtcclxuICAgICAgICAgIGNvdW50ZXIgKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBicmFuZHMuZm9yRWFjaCgoaXQpID0+IHtcclxuICAgICAgICBpZiAoaXQuYnJhbmQgPT09IGl0ZW0pIHtcclxuICAgICAgICAgIGN1cnJlbnQgKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCBvYmo6IEdldEJyYW5kcyA9IHtcclxuICAgICAgICBicmFuZDogaXRlbSxcclxuICAgICAgICBjb3VudDogY291bnRlcixcclxuICAgICAgICBDdXJyZW50QnJhbmQ6IGN1cnJlbnQsXHJcbiAgICAgIH07XHJcbiAgICAgIFJlc0JyYW5kcy5wdXNoKG9iaik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBSZXNCcmFuZHM7XHJcbiAgfVxyXG4gIEdldE1pbk1heFByaWNlKGFycjogcHJvZHVjdFtdID0gcHJvZHVjdHMpIHtcclxuICAgIGNvbnN0IExpc3RQcmljZTogbnVtYmVyW10gPSBbXTtcclxuICAgIGFyci5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIExpc3RQcmljZS5wdXNoKGl0ZW0ucHJpY2UpO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbi5hcHBseShudWxsLCBMaXN0UHJpY2UpO1xyXG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgTGlzdFByaWNlKTtcclxuICAgIGNvbnN0IG9iajogR2V0TWluTWF4ID0ge1xyXG4gICAgICBtYXg6IG1heC50b1N0cmluZygpLFxyXG4gICAgICBtaW46IG1pbi50b1N0cmluZygpLFxyXG4gICAgfTtcclxuICAgIHJldHVybiBvYmo7XHJcbiAgfVxyXG4gIEdldE1pbk1heERhdGUoYXJyOiBwcm9kdWN0W10gPSBwcm9kdWN0cykge1xyXG4gICAgY29uc3QgTGlzdERhdGU6IG51bWJlcltdID0gW107XHJcbiAgICBhcnIuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBMaXN0RGF0ZS5wdXNoKGl0ZW0uRGF0ZU9mSXNzdWUpO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbi5hcHBseShudWxsLCBMaXN0RGF0ZSk7XHJcbiAgICBjb25zdCBtYXggPSBNYXRoLm1heC5hcHBseShudWxsLCBMaXN0RGF0ZSk7XHJcbiAgICBjb25zdCBvYmo6IEdldE1pbk1heCA9IHtcclxuICAgICAgbWF4OiBtYXgudG9TdHJpbmcoKSxcclxuICAgICAgbWluOiBtaW4udG9TdHJpbmcoKSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gb2JqO1xyXG4gIH1cclxuICBHZXRCeUlkKGlkOiBzdHJpbmcpIHtcclxuICAgIGxldCBPYmpCeUlkOiBwcm9kdWN0O1xyXG4gICAgcHJvZHVjdHMuZm9yRWFjaCgoaXRlbTogcHJvZHVjdCkgPT4ge1xyXG4gICAgICBpZiAoaXRlbS5pZC50b1N0cmluZygpID09PSBpZCkge1xyXG4gICAgICAgIE9iakJ5SWQgPSBpdGVtO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBPYmpCeUlkITtcclxuICB9XHJcbiAgR2V0Q3VycmVudE1pbk1heFByaWNlKFByaWNlOiBwcm9kdWN0W10pIHtcclxuICAgIGNvbnN0IEFsbFByaWNlczogbnVtYmVyW10gPSBbXTtcclxuICAgIFByaWNlLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgQWxsUHJpY2VzLnB1c2goZWxlbWVudC5wcmljZSk7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG1pbiA9IE1hdGgubWluLmFwcGx5KG51bGwsIEFsbFByaWNlcyk7XHJcbiAgICBjb25zdCBtYXggPSBNYXRoLm1heC5hcHBseShudWxsLCBBbGxQcmljZXMpO1xyXG4gICAgY29uc3Qgb2JqOiBHZXRNaW5NYXggPSB7XHJcbiAgICAgIG1heDogbWF4LnRvU3RyaW5nKCksXHJcbiAgICAgIG1pbjogbWluLnRvU3RyaW5nKCksXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG9iajtcclxuICB9XHJcbiAgR2V0Q3VycmVudE1pbk1heERhdGUoRGF0ZTogcHJvZHVjdFtdKSB7XHJcbiAgICBjb25zdCBBbGxEYXRlczogbnVtYmVyW10gPSBbXTtcclxuICAgIERhdGUuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICBBbGxEYXRlcy5wdXNoKGVsZW1lbnQuRGF0ZU9mSXNzdWUpO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbi5hcHBseShudWxsLCBBbGxEYXRlcyk7XHJcbiAgICBjb25zdCBtYXggPSBNYXRoLm1heC5hcHBseShudWxsLCBBbGxEYXRlcyk7XHJcbiAgICBjb25zdCBvYmo6IEdldE1pbk1heCA9IHtcclxuICAgICAgbWF4OiBtYXgudG9TdHJpbmcoKSxcclxuICAgICAgbWluOiBtaW4udG9TdHJpbmcoKSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gb2JqO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGF0YTtcclxuIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9kYXRhJztcclxuaW1wb3J0IHsgZmlsdGVycyB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XHJcblxyXG5jbGFzcyBSb3V0ZXIge1xyXG4gIHByaXZhdGUgcHJvZHVjdHMgPSBuZXcgZGF0YSgpO1xyXG4gIHByaXZhdGUgTGltaXRQYWdlID0ge1xyXG4gICAgbGltaXQ6IDAsXHJcbiAgICBwYWdlOiAwLFxyXG4gIH07XHJcbiAgcHJpdmF0ZSBmaWx0ZXJzOiBmaWx0ZXJzID0ge1xyXG4gICAgQ2F0ZWdvcnk6IFtdLFxyXG4gICAgQnJhbmQ6IFtdLFxyXG4gICAgTWluUHJpY2U6IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4UHJpY2UoKS5taW4sXHJcbiAgICBNYXhQcmljZTogdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhQcmljZSgpLm1heCxcclxuICAgIE1pblllYXI6IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4RGF0ZSgpLm1pbixcclxuICAgIE1heFllYXI6IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4RGF0ZSgpLm1heCxcclxuICAgIFNlYXJjaDogJycsXHJcbiAgICBTb3J0OiAnU29ydCBieScsXHJcbiAgfTtcclxuICBwcml2YXRlIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG4gIHByaXZhdGUgY2hlY2tlciA9IGZhbHNlO1xyXG4gIHByaXZhdGUgVG9QYWdlcyA9IGZhbHNlO1xyXG4gIHByaXZhdGUgaXNDaGFuZ2VQcmljZSA9IGZhbHNlO1xyXG5cclxuICAvLyBjb25zdHJ1Y3RvcihmaWx0ZXJzOiBmaWx0ZXJzKSB7XHJcbiAgLy8gICB0aGlzLmZpbHRlcnMgPSBmaWx0ZXJzO1xyXG4gIC8vIH1cclxuXHJcbiAgQWRkVVJMKGlkOiBzdHJpbmcpIHtcclxuICAgIGlmIChpZC5zcGxpdCgnLScpWzBdID09PSAnI2NhcmQnKSB7XHJcbiAgICAgIGNvbnN0IG5ld3VybCA9IGAke2lkfWA7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gbmV3dXJsO1xyXG4gICAgICB0aGlzLmNoZWNrZXIgPSB0cnVlO1xyXG4gICAgICB0aGlzLlRvUGFnZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKGlkID09PSAnJykge1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcnO1xyXG4gICAgICB0aGlzLmNoZWNrZXIgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKGlkID09PSAnYmFza2V0Jykge1xyXG4gICAgICBjb25zdCBuZXd1cmwgPSBgJHtpZH1gO1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IG5ld3VybDtcclxuICAgICAgdGhpcy5jaGVja2VyID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEFkZENhdGVnb3J5RmlsdGVycyhpZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmZpbHRlcnMuQ2F0ZWdvcnkucHVzaChpZCk7XHJcbiAgICB0aGlzLkFkZEZpbHRlcnMoKTtcclxuICB9XHJcblxyXG4gIEFkZEJyYW5kRmlsdGVycyhpZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmZpbHRlcnMuQnJhbmQucHVzaChpZCk7XHJcbiAgICB0aGlzLkFkZEZpbHRlcnMoKTtcclxuICB9XHJcblxyXG4gIEFkZEZpbHRlcnMoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuZmlsdGVycy5DYXRlZ29yeS5sZW5ndGggIT09IDAgfHxcclxuICAgICAgdGhpcy5maWx0ZXJzLkJyYW5kLmxlbmd0aCAhPT0gMCB8fFxyXG4gICAgICB0aGlzLmZpbHRlcnMuTWluUHJpY2UgIT09IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4UHJpY2UoKS5taW4gfHxcclxuICAgICAgdGhpcy5maWx0ZXJzLk1heFByaWNlICE9PSB0aGlzLnByb2R1Y3RzLkdldE1pbk1heFByaWNlKCkubWF4IHx8XHJcbiAgICAgIHRoaXMuZmlsdGVycy5NaW5ZZWFyICE9PSB0aGlzLnByb2R1Y3RzLkdldE1pbk1heERhdGUoKS5taW4gfHxcclxuICAgICAgdGhpcy5maWx0ZXJzLk1heFllYXIgIT09IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4RGF0ZSgpLm1heCB8fFxyXG4gICAgICB0aGlzLmZpbHRlcnMuU2VhcmNoICE9PSAnJyB8fFxyXG4gICAgICB0aGlzLmZpbHRlcnMuU29ydCAhPT0gJ1NvcnQgYnknXHJcbiAgICApIHtcclxuICAgICAgbGV0IG5ld3VybCA9ICcjPyc7XHJcbiAgICAgIGlmICh0aGlzLmZpbHRlcnMuQ2F0ZWdvcnkubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgbmV3dXJsICs9ICdDYXRlZ29yeT0nO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycy5DYXRlZ29yeS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBuZXd1cmwgKz0gYCR7aXRlbX0rYDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBuZXd1cmwgPSBuZXd1cmwuc2xpY2UoMCwgLTEpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmZpbHRlcnMuQnJhbmQubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVycy5DYXRlZ29yeS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIG5ld3VybCArPSAnQnJhbmQ9JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmV3dXJsICs9ICcmQnJhbmQ9JztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzLkJyYW5kLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgIG5ld3VybCArPSBgJHtpdGVtfStgO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG5ld3VybCA9IG5ld3VybC5zbGljZSgwLCAtMSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuZmlsdGVycy5NaW5QcmljZSAhPT0gdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhQcmljZSgpLm1pbiB8fFxyXG4gICAgICAgIHRoaXMuZmlsdGVycy5NYXhQcmljZSAhPT0gdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhQcmljZSgpLm1heFxyXG4gICAgICApIHtcclxuICAgICAgICBpZiAobmV3dXJsID09PSAnIz8nKSB7XHJcbiAgICAgICAgICBuZXd1cmwgKz0gYFByaWNlPSR7dGhpcy5maWx0ZXJzLk1pblByaWNlfSske3RoaXMuZmlsdGVycy5NYXhQcmljZX1gO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuZXd1cmwgKz0gYCZQcmljZT0ke3RoaXMuZmlsdGVycy5NaW5QcmljZX0rJHt0aGlzLmZpbHRlcnMuTWF4UHJpY2V9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc0NoYW5nZVByaWNlID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5maWx0ZXJzLk1pblllYXIgIT09IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4RGF0ZSgpLm1pbiB8fFxyXG4gICAgICAgIHRoaXMuZmlsdGVycy5NYXhZZWFyICE9PSB0aGlzLnByb2R1Y3RzLkdldE1pbk1heERhdGUoKS5tYXhcclxuICAgICAgKSB7XHJcbiAgICAgICAgaWYgKG5ld3VybCA9PT0gJyM/Jykge1xyXG4gICAgICAgICAgbmV3dXJsICs9IGBEYXRlPSR7dGhpcy5maWx0ZXJzLk1pblllYXJ9KyR7dGhpcy5maWx0ZXJzLk1heFllYXJ9YDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmV3dXJsICs9IGAmRGF0ZT0ke3RoaXMuZmlsdGVycy5NaW5ZZWFyfSske3RoaXMuZmlsdGVycy5NYXhZZWFyfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNDaGFuZ2VQcmljZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuZmlsdGVycy5TZWFyY2ggIT09ICcnKSB7XHJcbiAgICAgICAgaWYgKG5ld3VybCA9PT0gJyM/Jykge1xyXG4gICAgICAgICAgbmV3dXJsICs9IGBTZWFyY2g9JHt0aGlzLmZpbHRlcnMuU2VhcmNofWA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5ld3VybCArPSBgJlNlYXJjaD0ke3RoaXMuZmlsdGVycy5TZWFyY2h9YDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuZmlsdGVycy5Tb3J0ICE9PSAnU29ydCBieScpIHtcclxuICAgICAgICBpZiAobmV3dXJsID09PSAnIz8nKSB7XHJcbiAgICAgICAgICBuZXd1cmwgKz0gYFNvcnQ9JHt0aGlzLmZpbHRlcnMuU29ydH1gO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuZXd1cmwgKz0gYCZTb3J0PSR7dGhpcy5maWx0ZXJzLlNvcnR9YDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBuZXd1cmw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgUmVtb3ZlQ2F0ZWdvcnlGaWx0ZXJzKGlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maWx0ZXJzLkNhdGVnb3J5LmZpbmRJbmRleCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbWVudCA9PT0gaWQ7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuZmlsdGVycy5DYXRlZ29yeS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgdGhpcy5BZGRGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBSZW1vdmVCcmFuZEZpbHRlcnMoaWQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmZpbHRlcnMuQnJhbmQuZmluZEluZGV4KChlbGVtZW50KSA9PiB7XHJcbiAgICAgIHJldHVybiBlbGVtZW50ID09PSBpZDtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5maWx0ZXJzLkJyYW5kLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB0aGlzLkFkZEZpbHRlcnMoKTtcclxuICB9XHJcblxyXG4gIEFkZFJvdXRpbmdUb0NhcmQodGFnOiBIVE1MRWxlbWVudCkge1xyXG4gICAgdGFnLm9uY2xpY2sgPSAoZTogRXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcbiAgICAgIGNvbnN0IGlkID0gKHRhcmdldCBhcyBIVE1MQnV0dG9uRWxlbWVudCkuaWQ7XHJcbiAgICAgIGNvbnNvbGUubG9nKGlkKTtcclxuICAgICAgdGhpcy5BZGRVUkwoYCMke2lkfWApO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIEFkZFJvdXRpbmdUb0hlYWRlcih0YWc6IEhUTUxFbGVtZW50KSB7XHJcbiAgICB0YWcub25jbGljayA9IChlOiBFdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcclxuICAgICAgY29uc3QgaWQgPSAodGFyZ2V0IGFzIEhUTUxCdXR0b25FbGVtZW50KS5pZDtcclxuICAgICAgdGhpcy5BZGRVUkwoYCR7aWR9YCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgQWRkUm91dGluZ1RvQmFza2V0KHRhZzogSFRNTEVsZW1lbnQsIGZyb21jYXJkPzogYm9vbGVhbikge1xyXG4gICAgdGFnLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChmcm9tY2FyZCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmcm9tY2FyZCcsICd0cnVlJyk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5BZGRVUkwoYGJhc2tldGApO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIEFkZFJvdXRpbmdJbkJhc2tldChsaW1pdDogbnVtYmVyLCBwYWdlOiBudW1iZXIpIHtcclxuICAgIHRoaXMuTGltaXRQYWdlLmxpbWl0ID0gbGltaXQ7XHJcbiAgICB0aGlzLkxpbWl0UGFnZS5wYWdlID0gcGFnZTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuTGltaXRQYWdlKTtcclxuICAgIGxldCBuZXd1cmwgPSAnYmFza2V0JztcclxuICAgIGlmICh0aGlzLkxpbWl0UGFnZS5saW1pdCA+IDApIHtcclxuICAgICAgbmV3dXJsICs9IGAhbGltaXQ9JHt0aGlzLkxpbWl0UGFnZS5saW1pdH1gO1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IG5ld3VybDtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLkxpbWl0UGFnZS5wYWdlID4gMCAmJiB0aGlzLkxpbWl0UGFnZS5wYWdlICE9PSAxKSB7XHJcbiAgICAgIGlmIChuZXd1cmwgPT09ICdiYXNrZXQnKSB7XHJcbiAgICAgICAgbmV3dXJsICs9IGAhcGFnZT0ke3RoaXMuTGltaXRQYWdlLnBhZ2V9YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXd1cmwgKz0gYCZwYWdlPSR7dGhpcy5MaW1pdFBhZ2UucGFnZX1gO1xyXG4gICAgICB9XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gbmV3dXJsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQWRkUm91dGluZ1RvTGltaXQoY291bnQ6IHN0cmluZykge1xyXG4gIC8vICAgdGhpcy5MaW1pdFBhZ2UubGltaXQgPSArY291bnQ7XHJcbiAgLy8gICBjb25zb2xlLmxvZyh0aGlzLkxpbWl0UGFnZS5saW1pdClcclxuICAvLyAgIHRoaXMuQWRkUm91dGluZ0luQmFza2V0KCk7XHJcbiAgLy8gfVxyXG5cclxuICAvLyBBZGRSb3V0aW5nVG9QYWdlKGNvdW50OiBzdHJpbmcpIHtcclxuICAvLyAgIHRoaXMuTGltaXRQYWdlLnBhZ2UgPSArY291bnQ7XHJcbiAgLy8gICBjb25zb2xlLmxvZyh0aGlzLkxpbWl0UGFnZS5wYWdlKVxyXG4gIC8vICAgdGhpcy5BZGRSb3V0aW5nSW5CYXNrZXQoKTtcclxuICAvLyB9XHJcblxyXG4gIEFkZFJvdXRpbmdUb0NhdGVnb3J5KHRhZzogSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgdGFnLm9uY2xpY2sgPSAoZTogRXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcbiAgICAgIGNvbnN0IGlkID0gKHRhcmdldCBhcyBIVE1MQnV0dG9uRWxlbWVudCkuaWQ7XHJcbiAgICAgIGlmICh0YWcuY2hlY2tlZCkge1xyXG4gICAgICAgIHRoaXMuQWRkQ2F0ZWdvcnlGaWx0ZXJzKGlkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlJlbW92ZUNhdGVnb3J5RmlsdGVycyhpZCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBBZGRSb3V0aW5nVG9CcmFuZCh0YWc6IEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgIHRhZy5vbmNsaWNrID0gKGU6IEV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG4gICAgICBjb25zdCBpZCA9ICh0YXJnZXQgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpLmlkO1xyXG4gICAgICBpZiAodGFnLmNoZWNrZWQpIHtcclxuICAgICAgICB0aGlzLkFkZEJyYW5kRmlsdGVycyhpZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5SZW1vdmVCcmFuZEZpbHRlcnMoaWQpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgQWRkUm91dGluZ1RvUHJpY2VNaW4oTWluUHJpY2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5maWx0ZXJzLk1pblByaWNlID0gTWluUHJpY2U7XHJcbiAgICB0aGlzLkFkZEZpbHRlcnMoKTtcclxuICB9XHJcblxyXG4gIEFkZFJvdXRpbmdUb1ByaWNlTWF4KE1heFByaWNlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuZmlsdGVycy5NYXhQcmljZSA9IE1heFByaWNlO1xyXG4gICAgdGhpcy5BZGRGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBBZGRSb3V0aW5nVG9ZZWFyTWluKE1pblllYXI6IHN0cmluZykge1xyXG4gICAgdGhpcy5maWx0ZXJzLk1pblllYXIgPSBNaW5ZZWFyO1xyXG4gICAgdGhpcy5BZGRGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBBZGRSb3V0aW5nVG9ZZWFyTWF4KE1heFllYXI6IHN0cmluZykge1xyXG4gICAgdGhpcy5maWx0ZXJzLk1heFllYXIgPSBNYXhZZWFyO1xyXG4gICAgdGhpcy5BZGRGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBBZGRSb3V0aW5nVG9TZWFyY2godGV4dDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmZpbHRlcnMuU2VhcmNoID0gdGV4dDtcclxuICAgIHRoaXMuQWRkRmlsdGVycygpO1xyXG4gIH1cclxuICBBZGRSb3V0aW5nVG9Tb3J0KGlkOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuZmlsdGVycy5Tb3J0ID0gaWQ7XHJcbiAgICB0aGlzLkFkZEZpbHRlcnMoKTtcclxuICB9XHJcblxyXG4gIEdldEZpbHRlcnMoZmlsdGVyczogZmlsdGVycykge1xyXG4gICAgdGhpcy5maWx0ZXJzID0gZmlsdGVycztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJvdXRlcjtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9