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

/***/ "./src/ts/404.ts":
/*!***********************!*\
  !*** ./src/ts/404.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.errorpage = void 0;
const DefaultPage_1 = __importDefault(__webpack_require__(/*! ./DefaultPage */ "./src/ts/DefaultPage.ts"));
const CreateElement_1 = __webpack_require__(/*! ./Elements/CreateElement */ "./src/ts/Elements/CreateElement.ts");
class errorpage {
    constructor() {
        const page = new DefaultPage_1.default();
        page.CreateHeader();
        const main = new CreateElement_1.CreateElement({ tag: 'main', className: 'main main_empty' }).getnode();
        const span = new CreateElement_1.CreateElement({ tag: 'span', className: 'cart-empty', content: '404 Not found' }).getnode();
        main.append(span);
        document.body.append(main);
        page.CreateFooter();
    }
}
exports.errorpage = errorpage;


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
const _404_1 = __webpack_require__(/*! ./404 */ "./src/ts/404.ts");
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
        else if (hash.split('-')[0] === '#card' && +hash.split('-')[1] < 64) {
            if (this.body.children[1] && this.body.children[2]) {
                this.body.children[2].remove();
                this.body.children[1].remove();
            }
            new CardPage_1.CardPage(this.products.GetById(hash.split('-')[1]));
            this.MainPage.CreateFooter();
        }
        else if (hash === '') {
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
        else if (hash === '#basket') {
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
        else if (hash[7] === '!') {
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
        else {
            this.body.innerHTML = ' ';
            new _404_1.errorpage();
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
exports.CreateDefaultPage = void 0;
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
exports.CreateDefaultPage = CreateDefaultPage;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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M2IiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy80MDQudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL3RzL0FwcGx5RmlsdGVycy50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvQXBwbHlSb3V0aW5nLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9BcHBseVNvcnQudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL3RzL0Jhc2tldFBhZ2UudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL3RzL0NhcmRQYWdlLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9DaGVja291dFBvcHVwLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9Db21wb25lbnRzL0NyZWF0ZUNhcnRJdGVtLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9Db21wb25lbnRzL0NyZWF0ZVJhbmdlQmxvY2sudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL3RzL0NvbXBvbmVudHMvQ3JlYXRlU2VhcmNoQmFyLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9Db21wb25lbnRzL0NyZWF0ZVNvcnRNZW51LnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9DcmVhdGVMaXN0T2ZDYXJkcy50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvRGVmYXVsdFBhZ2UudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL3RzL0VsZW1lbnRzL0NyZWF0ZUNoZWNrYm94LnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9FbGVtZW50cy9DcmVhdGVFbGVtZW50LnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9FbGVtZW50cy9DcmVhdGVJbWFnZS50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvRWxlbWVudHMvQ3JlYXRlTGluay50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvRWxlbWVudHMvQ3JlYXRlTnVtYmVySW5wdXQudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL3RzL0VsZW1lbnRzL0NyZWF0ZVJhZGlvLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9FbGVtZW50cy9DcmVhdGVSYW5nZS50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvRWxlbWVudHMvQ3JlYXRlVGV4dElucHV0LnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9kYXRhLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9yb3V0ZS50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCAnLi9zdHlsZS5zY3NzJztcclxuaW1wb3J0IHsgQXBwbHlSb3V0aW5nIH0gZnJvbSAnLi90cy9BcHBseVJvdXRpbmcnO1xyXG5pbXBvcnQgZGF0YSBmcm9tICcuL3RzL2RhdGEnO1xyXG5cclxuaW1wb3J0IENyZWF0ZURlZmF1bHRQYWdlIGZyb20gJy4vdHMvRGVmYXVsdFBhZ2UnO1xyXG5pbXBvcnQgeyBDcmVhdGVFbGVtZW50IH0gZnJvbSAnLi90cy9FbGVtZW50cy9DcmVhdGVFbGVtZW50JztcclxuXHJcbmNvbnN0IHByb2R1Y3RzID0gbmV3IGRhdGEoKTtcclxuY29uc3QgQXBwUm91dGluZyA9IG5ldyBBcHBseVJvdXRpbmcoKTtcclxuXHJcbmNvbnN0IG5ld2FyciA9IFtdO1xyXG5uZXdhcnIucHVzaChwcm9kdWN0cy5HZXQoKVswXSk7XHJcbm5ld2Fyci5wdXNoKHByb2R1Y3RzLkdldCgpWzFdKTtcclxubmV3YXJyLnB1c2gocHJvZHVjdHMuR2V0KClbMl0pO1xyXG5wcm9kdWN0cy5HZXRNaW5NYXhEYXRlKCk7XHJcbmNvbnN0IGhhc2ggPSBsb2NhdGlvbi5oYXNoO1xyXG5cclxuY29uc3QgUGFnZSA9IG5ldyBDcmVhdGVEZWZhdWx0UGFnZSgpO1xyXG5QYWdlLkNyZWF0ZUhlYWRlcigpO1xyXG5BcHBSb3V0aW5nLmluaXQoaGFzaCk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxyXG4gICdoYXNoY2hhbmdlJyxcclxuICAoKSA9PiB7XHJcbiAgICBBcHBSb3V0aW5nLmluaXQobG9jYXRpb24uaGFzaCk7XHJcbiAgfSxcclxuICBmYWxzZVxyXG4pO1xyXG4iLCJpbXBvcnQgQ3JlYXRlRGVmYXVsdFBhZ2UgZnJvbSBcIi4vRGVmYXVsdFBhZ2VcIjtcclxuaW1wb3J0IHsgQ3JlYXRlRWxlbWVudCB9IGZyb20gXCIuL0VsZW1lbnRzL0NyZWF0ZUVsZW1lbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBlcnJvcnBhZ2Uge1xyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIGNvbnN0IHBhZ2UgPSBuZXcgQ3JlYXRlRGVmYXVsdFBhZ2UoKTtcclxuICAgIHBhZ2UuQ3JlYXRlSGVhZGVyKCk7XHJcbiAgICBjb25zdCBtYWluID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdtYWluJywgY2xhc3NOYW1lOiAnbWFpbiBtYWluX2VtcHR5J30pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHNwYW4gPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBjbGFzc05hbWU6ICdjYXJ0LWVtcHR5JywgY29udGVudDogJzQwNCBOb3QgZm91bmQnfSkuZ2V0bm9kZSgpO1xyXG4gICAgbWFpbi5hcHBlbmQoc3Bhbik7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZChtYWluKTtcclxuICAgIHBhZ2UuQ3JlYXRlRm9vdGVyKCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9kYXRhJztcclxuaW1wb3J0IHsgZmlsdGVycywgcHJvZHVjdCB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwbHlGaWx0ZXJzIHtcclxuICBwcml2YXRlIGRhdGEgPSBuZXcgZGF0YSgpO1xyXG4gIHByaXZhdGUgRGF0YUFmdGVyRmlsdGVyczogcHJvZHVjdFtdID0gW107XHJcbiAgLy9wcml2YXRlXHJcbiAgY29uc3RydWN0b3IoZmlsdGVyczogZmlsdGVycykge1xyXG4gICAgdGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzID0gbmV3IGRhdGEoKS5HZXQoKTtcclxuICAgIGlmIChmaWx0ZXJzLkNhdGVnb3J5Lmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICB0aGlzLmNhdGVnb3J5KGZpbHRlcnMuQ2F0ZWdvcnkpO1xyXG4gICAgfVxyXG4gICAgaWYgKGZpbHRlcnMuQnJhbmQubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgIHRoaXMuYnJhbmQoZmlsdGVycy5CcmFuZCk7XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsdGVycy5NaW5QcmljZSAhPT0gdGhpcy5kYXRhLkdldE1pbk1heFByaWNlKCkubWluIHx8IGZpbHRlcnMuTWF4UHJpY2UgIT09IHRoaXMuZGF0YS5HZXRNaW5NYXhQcmljZSgpLm1heCkge1xyXG4gICAgICB0aGlzLnByaWNlKGZpbHRlcnMuTWluUHJpY2UsIGZpbHRlcnMuTWF4UHJpY2UpO1xyXG4gICAgfVxyXG4gICAgaWYgKGZpbHRlcnMuTWluWWVhciAhPT0gdGhpcy5kYXRhLkdldE1pbk1heERhdGUoKS5taW4gfHwgZmlsdGVycy5NYXhZZWFyICE9PSB0aGlzLmRhdGEuR2V0TWluTWF4RGF0ZSgpLm1heCkge1xyXG4gICAgICB0aGlzLmRhdGUoZmlsdGVycy5NaW5ZZWFyLCBmaWx0ZXJzLk1heFllYXIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGZpbHRlcnMuU2VhcmNoICE9PSAnJykge1xyXG4gICAgICB0aGlzLnNlYXJjaChmaWx0ZXJzLlNlYXJjaCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybigpIHtcclxuICAgIHJldHVybiB0aGlzLkRhdGFBZnRlckZpbHRlcnM7XHJcbiAgfVxyXG4gIGNhdGVnb3J5KGNhdGVnb3JpZXM6IHN0cmluZ1tdKSB7XHJcbiAgICBjb25zdCBUZW1wQXJyYXk6IHByb2R1Y3RbXSA9IFtdO1xyXG4gICAgY2F0ZWdvcmllcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIHRoaXMuRGF0YUFmdGVyRmlsdGVycy5mb3JFYWNoKChpdCkgPT4ge1xyXG4gICAgICAgIGlmIChpdGVtID09PSBpdC5jYXRlZ29yeSkge1xyXG4gICAgICAgICAgVGVtcEFycmF5LnB1c2goaXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuRGF0YUFmdGVyRmlsdGVycyA9IFRlbXBBcnJheTtcclxuICB9XHJcbiAgYnJhbmQoYnJhbmRzOiBzdHJpbmdbXSkge1xyXG4gICAgY29uc3QgVGVtcEFycmF5OiBwcm9kdWN0W10gPSBbXTtcclxuICAgIGJyYW5kcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIHRoaXMuRGF0YUFmdGVyRmlsdGVycy5mb3JFYWNoKChpdCkgPT4ge1xyXG4gICAgICAgIGlmIChpdGVtID09PSBpdC5icmFuZCkge1xyXG4gICAgICAgICAgVGVtcEFycmF5LnB1c2goaXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuRGF0YUFmdGVyRmlsdGVycyA9IFRlbXBBcnJheTtcclxuICB9XHJcbiAgcHJpY2UobWluOiBzdHJpbmcsIG1heDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBUZW1wQXJyYXk6IHByb2R1Y3RbXSA9IFtdO1xyXG4gICAgdGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzLmZvckVhY2goKGl0KSA9PiB7XHJcbiAgICAgIGlmICgrbWluIDw9IGl0LnByaWNlICYmIGl0LnByaWNlIDw9ICttYXgpIHtcclxuICAgICAgICBUZW1wQXJyYXkucHVzaChpdCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzID0gVGVtcEFycmF5O1xyXG4gIH1cclxuICBkYXRlKG1pbjogc3RyaW5nLCBtYXg6IHN0cmluZykge1xyXG4gICAgY29uc3QgVGVtcEFycmF5OiBwcm9kdWN0W10gPSBbXTtcclxuICAgIHRoaXMuRGF0YUFmdGVyRmlsdGVycy5mb3JFYWNoKChpdCkgPT4ge1xyXG4gICAgICBpZiAoK21pbiA8PSBpdC5EYXRlT2ZJc3N1ZSAmJiBpdC5EYXRlT2ZJc3N1ZSA8PSArbWF4KSB7XHJcbiAgICAgICAgVGVtcEFycmF5LnB1c2goaXQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuRGF0YUFmdGVyRmlsdGVycyA9IFRlbXBBcnJheTtcclxuICB9XHJcbiAgc2VhcmNoKHNlYXJjaDogc3RyaW5nKSB7XHJcbiAgICBzZWFyY2ggPSBzZWFyY2gudG9Mb3dlckNhc2UoKTtcclxuICAgIGNvbnN0IFRlbXBBcnJheTogcHJvZHVjdFtdID0gW107XHJcbiAgICB0aGlzLkRhdGFBZnRlckZpbHRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbS5jYXRlZ29yeS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaCkpIHtcclxuICAgICAgICBUZW1wQXJyYXkucHVzaChpdGVtKTtcclxuICAgICAgfSBlbHNlIGlmIChpdGVtLmJyYW5kLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoKSkge1xyXG4gICAgICAgIFRlbXBBcnJheS5wdXNoKGl0ZW0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGl0ZW0ucHJpY2UudG9TdHJpbmcoKS5pbmNsdWRlcyhzZWFyY2gpKSB7XHJcbiAgICAgICAgVGVtcEFycmF5LnB1c2goaXRlbSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5EYXRlT2ZJc3N1ZS50b1N0cmluZygpLmluY2x1ZGVzKHNlYXJjaCkpIHtcclxuICAgICAgICBUZW1wQXJyYXkucHVzaChpdGVtKTtcclxuICAgICAgfSBlbHNlIGlmIChpdGVtLm1vZGVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoKSkge1xyXG4gICAgICAgIFRlbXBBcnJheS5wdXNoKGl0ZW0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGl0ZW0uZGVzY3JpcHRpb24udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2gpKSB7XHJcbiAgICAgICAgVGVtcEFycmF5LnB1c2goaXRlbSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5kaXNjb3VudFBlcmNlbnRhZ2UudG9TdHJpbmcoKS5pbmNsdWRlcyhzZWFyY2gpKSB7XHJcbiAgICAgICAgVGVtcEFycmF5LnB1c2goaXRlbSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5yYXRpbmcudG9TdHJpbmcoKS5pbmNsdWRlcyhzZWFyY2gpKSB7XHJcbiAgICAgICAgVGVtcEFycmF5LnB1c2goaXRlbSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzID0gVGVtcEFycmF5O1xyXG4gIH1cclxuICBzd2FwKGZpcnN0OiBwcm9kdWN0LCBzZWNvbmQ6IHByb2R1Y3QpIHtcclxuICAgIGNvbnN0IHRlbXA6IHByb2R1Y3QgPSBmaXJzdDtcclxuICAgIGZpcnN0ID0gc2Vjb25kO1xyXG4gICAgc2Vjb25kID0gdGVtcDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgZXJyb3JwYWdlIH0gZnJvbSAnLi80MDQnO1xyXG5pbXBvcnQgeyBBcHBseUZpbHRlcnMgfSBmcm9tICcuL0FwcGx5RmlsdGVycyc7XHJcbmltcG9ydCB7IEFwcGx5U29ydCB9IGZyb20gJy4vQXBwbHlTb3J0JztcclxuaW1wb3J0IHsgQmFza2V0UGFnZSB9IGZyb20gJy4vQmFza2V0UGFnZSc7XHJcbmltcG9ydCB7IENhcmRQYWdlIH0gZnJvbSAnLi9DYXJkUGFnZSc7XHJcbmltcG9ydCB7IENyZWF0ZUNhcnRJdGVtIH0gZnJvbSAnLi9Db21wb25lbnRzL0NyZWF0ZUNhcnRJdGVtJztcclxuaW1wb3J0IHsgQ3JlYXRlTGlzdE9mQ2FyZHMgfSBmcm9tICcuL0NyZWF0ZUxpc3RPZkNhcmRzJztcclxuaW1wb3J0IGRhdGEgZnJvbSAnLi9kYXRhJztcclxuaW1wb3J0IENyZWF0ZURlZmF1bHRQYWdlIGZyb20gJy4vRGVmYXVsdFBhZ2UnO1xyXG5pbXBvcnQgeyBmaWx0ZXJzIH0gZnJvbSAnLi9JbnRlcmZhY2VzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBseVJvdXRpbmcge1xyXG4gIHByaXZhdGUgTWFpblBhZ2UgPSBuZXcgQ3JlYXRlRGVmYXVsdFBhZ2UoKTtcclxuICBwcml2YXRlIHByb2R1Y3RzID0gbmV3IGRhdGEoKTtcclxuICBwcml2YXRlIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG4gIHByaXZhdGUgY2hlY2tlciA9IGZhbHNlO1xyXG4gIHByaXZhdGUgVG9QYWdlcyA9IGZhbHNlO1xyXG4gIHByaXZhdGUgaXNDaGFuZ2VQcmljZSA9IGZhbHNlO1xyXG4gIHByaXZhdGUgTGltaXRQYWdlID0ge1xyXG4gICAgbGltaXQ6IDMsXHJcbiAgICBwYWdlOiAxLFxyXG4gIH07XHJcbiAgcHJpdmF0ZSBmaWx0ZXJzOiBmaWx0ZXJzID0ge1xyXG4gICAgQ2F0ZWdvcnk6IFtdLFxyXG4gICAgQnJhbmQ6IFtdLFxyXG4gICAgTWluUHJpY2U6IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4UHJpY2UoKS5taW4sXHJcbiAgICBNYXhQcmljZTogdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhQcmljZSgpLm1heCxcclxuICAgIE1pblllYXI6IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4RGF0ZSgpLm1pbixcclxuICAgIE1heFllYXI6IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4RGF0ZSgpLm1heCxcclxuICAgIFNlYXJjaDogJycsXHJcbiAgICBTb3J0OiAnU29ydCBieScsXHJcbiAgfTtcclxuXHJcbiAgaW5pdChoYXNoOiBzdHJpbmcpIHtcclxuICAgIGlmIChoYXNoWzFdID09PSAnPycpIHtcclxuICAgICAgdGhpcy5jcmVhdGVGaWx0ZXJzKGhhc2gpO1xyXG4gICAgICBpZiAoZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzWzJdKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzWzJdLnJlbW92ZSgpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1syXS5yZW1vdmUoKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBkYXRhID0gbmV3IEFwcGx5RmlsdGVycyh0aGlzLmZpbHRlcnMpLnJldHVybigpO1xyXG4gICAgICB0aGlzLk1haW5QYWdlLkNyZWF0ZU1haW4odGhpcy5maWx0ZXJzLCBkYXRhKTtcclxuICAgICAgY29uc3QgRGF0YVNvcnQgPSBuZXcgQXBwbHlTb3J0KHRoaXMuZmlsdGVycy5Tb3J0LCBkYXRhKTtcclxuICAgICAgbmV3IENyZWF0ZUxpc3RPZkNhcmRzKERhdGFTb3J0LnJldHVybigpKTtcclxuICAgICAgdGhpcy5NYWluUGFnZS5DcmVhdGVGb290ZXIoKTtcclxuICAgIH0gZWxzZSBcclxuICAgIGlmIChoYXNoLnNwbGl0KCctJylbMF0gPT09ICcjY2FyZCcgJiYgK2hhc2guc3BsaXQoJy0nKVsxXSA8IDY0KSB7XHJcbiAgICAgIGlmICh0aGlzLmJvZHkuY2hpbGRyZW5bMV0gJiYgdGhpcy5ib2R5LmNoaWxkcmVuWzJdKSB7XHJcbiAgICAgICAgdGhpcy5ib2R5LmNoaWxkcmVuWzJdLnJlbW92ZSgpO1xyXG4gICAgICAgIHRoaXMuYm9keS5jaGlsZHJlblsxXS5yZW1vdmUoKTtcclxuICAgICAgfVxyXG4gICAgICBuZXcgQ2FyZFBhZ2UodGhpcy5wcm9kdWN0cy5HZXRCeUlkKGhhc2guc3BsaXQoJy0nKVsxXSkpO1xyXG4gICAgICB0aGlzLk1haW5QYWdlLkNyZWF0ZUZvb3RlcigpO1xyXG4gICAgfSBlbHNlXHJcbiAgICBpZiAoaGFzaCA9PT0gJycpIHtcclxuICAgICAgdGhpcy5Ub0RlZmF1bHRGaWx0ZXJzKCk7XHJcbiAgICAgIHRoaXMuTWFpblBhZ2UgPSBuZXcgQ3JlYXRlRGVmYXVsdFBhZ2UoKTtcclxuICAgICAgaWYgKGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1syXSkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1syXS5yZW1vdmUoKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMl0ucmVtb3ZlKCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgZGF0YSA9IG5ldyBBcHBseUZpbHRlcnModGhpcy5maWx0ZXJzKS5yZXR1cm4oKTtcclxuXHJcbiAgICAgIGNvbnN0IERhdGFTb3J0ID0gbmV3IEFwcGx5U29ydCh0aGlzLmZpbHRlcnMuU29ydCwgZGF0YSk7XHJcbiAgICAgIHRoaXMuTWFpblBhZ2UuQ3JlYXRlTWFpbih0aGlzLmZpbHRlcnMsIERhdGFTb3J0LnJldHVybigpKTtcclxuICAgICAgbmV3IENyZWF0ZUxpc3RPZkNhcmRzKERhdGFTb3J0LnJldHVybigpKTtcclxuICAgICAgdGhpcy5NYWluUGFnZS5DcmVhdGVGb290ZXIoKTtcclxuICAgICAgdGhpcy5jaGVja2VyID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBcclxuICAgIGlmIChoYXNoID09PSAnI2Jhc2tldCcpIHtcclxuICAgICAgdGhpcy5jaGVja2VyID0gdHJ1ZTtcclxuICAgICAgaWYgKHRoaXMuYm9keS5jaGlsZHJlblsxXSAmJiB0aGlzLmJvZHkuY2hpbGRyZW5bMl0pIHtcclxuICAgICAgICB0aGlzLmJvZHkuY2hpbGRyZW5bMl0ucmVtb3ZlKCk7XHJcbiAgICAgICAgdGhpcy5ib2R5LmNoaWxkcmVuWzFdLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIG5ldyBCYXNrZXRQYWdlKDMsIDEpO1xyXG4gICAgICBuZXcgQ3JlYXRlQ2FydEl0ZW0oMywgMSk7XHJcbiAgICAgIHRoaXMuTWFpblBhZ2UuQ3JlYXRlRm9vdGVyKCk7XHJcbiAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZnJvbWNhcmQnKSA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1eWl0bm93QnRuJyk/LmNsaWNrKCk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Zyb21jYXJkJyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBcclxuICAgIGlmIChoYXNoWzddID09PSAnIScpIHtcclxuICAgICAgaWYgKHRoaXMuYm9keS5jaGlsZHJlblsxXSAmJiB0aGlzLmJvZHkuY2hpbGRyZW5bMl0pIHtcclxuICAgICAgICB0aGlzLmJvZHkuY2hpbGRyZW5bMl0ucmVtb3ZlKCk7XHJcbiAgICAgICAgdGhpcy5ib2R5LmNoaWxkcmVuWzFdLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGZpbHQgPSBoYXNoLnNwbGl0KCchJylbMV07XHJcbiAgICAgIGlmIChmaWx0LmluY2x1ZGVzKCcmJykpIHtcclxuICAgICAgICB0aGlzLkxpbWl0UGFnZS5saW1pdCA9ICtmaWx0LnNwbGl0KCcmJylbMF0uc3BsaXQoJz0nKVsxXTtcclxuICAgICAgICB0aGlzLkxpbWl0UGFnZS5wYWdlID0gK2ZpbHQuc3BsaXQoJyYnKVsxXS5zcGxpdCgnPScpWzFdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChmaWx0LmluY2x1ZGVzKCdsaW1pdCcpKSB7XHJcbiAgICAgICAgICB0aGlzLkxpbWl0UGFnZS5saW1pdCA9ICtmaWx0LnNwbGl0KCc9JylbMV07XHJcbiAgICAgICAgICB0aGlzLkxpbWl0UGFnZS5wYWdlID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5MaW1pdFBhZ2UucGFnZSA9ICtmaWx0LnNwbGl0KCc9JylbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vY29uc29sZS5sb2codGhpcy5MaW1pdFBhZ2UpO1xyXG4gICAgICBuZXcgQmFza2V0UGFnZSh0aGlzLkxpbWl0UGFnZS5saW1pdCwgdGhpcy5MaW1pdFBhZ2UucGFnZSk7XHJcbiAgICAgIG5ldyBDcmVhdGVDYXJ0SXRlbSh0aGlzLkxpbWl0UGFnZS5saW1pdCwgdGhpcy5MaW1pdFBhZ2UucGFnZSk7XHJcbiAgICAgIHRoaXMuTWFpblBhZ2UuQ3JlYXRlRm9vdGVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmJvZHkuaW5uZXJIVE1MID0gJyAnO1xyXG4gICAgICBuZXcgZXJyb3JwYWdlKCk7XHJcbiAgICB9XHJcbiAgICAvLy9maWx0ZXJzLy8vXHJcblxyXG4gICAgLy8vQ2F0ZWdvcnkvLy9cclxuICAgIC8vIGlmIChpZC5zcGxpdCgnPScpWzBdID09PSAnQ2F0ZWdvcnknKSB7XHJcbiAgICAvLyAgIGlmKCF0aGlzLmZpbHRlcnMuQ2F0ZWdvcnkuaW5jbHVkZXMoaWQuc3BsaXQoJz0nKVsxXSkpe1xyXG4gICAgLy8gICAgIHRoaXMuZmlsdGVycy5DYXRlZ29yeS5wdXNoKGlkLnNwbGl0KCc9JylbMV0pO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcbiAgICAvLyBpZiAodGhpcy5jaGVja2VyID09PSBmYWxzZSkge1xyXG4gICAgLy8gfVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlRmlsdGVycyhoYXNoOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IEFycmF5RmlsdGVyczogc3RyaW5nW10gPSBoYXNoLnNsaWNlKDIpLnNwbGl0KCcmJyk7XHJcbiAgICB0aGlzLlRvRGVmYXVsdEZpbHRlcnMoKTtcclxuICAgIEFycmF5RmlsdGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleTogc3RyaW5nID0gaXRlbS5zcGxpdCgnPScpWzBdO1xyXG4gICAgICBjb25zdCB2YWx1ZXM6IHN0cmluZyA9IGl0ZW0uc3BsaXQoJz0nKVsxXTtcclxuICAgICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICBjYXNlICdDYXRlZ29yeSc6XHJcbiAgICAgICAgICB0aGlzLmZpbHRlcnMuQ2F0ZWdvcnkgPSB2YWx1ZXMuc3BsaXQoJysnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0JyYW5kJzpcclxuICAgICAgICAgIHRoaXMuZmlsdGVycy5CcmFuZCA9IHZhbHVlcy5zcGxpdCgnKycpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnUHJpY2UnOlxyXG4gICAgICAgICAgdGhpcy5maWx0ZXJzLk1pblByaWNlID0gdmFsdWVzLnNwbGl0KCcrJylbMF07XHJcbiAgICAgICAgICB0aGlzLmZpbHRlcnMuTWF4UHJpY2UgPSB2YWx1ZXMuc3BsaXQoJysnKVsxXTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0RhdGUnOlxyXG4gICAgICAgICAgdGhpcy5maWx0ZXJzLk1pblllYXIgPSB2YWx1ZXMuc3BsaXQoJysnKVswXTtcclxuICAgICAgICAgIHRoaXMuZmlsdGVycy5NYXhZZWFyID0gdmFsdWVzLnNwbGl0KCcrJylbMV07XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdTZWFyY2gnOlxyXG4gICAgICAgICAgdGhpcy5maWx0ZXJzLlNlYXJjaCA9IGRlY29kZVVSSSh2YWx1ZXMpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnU29ydCc6XHJcbiAgICAgICAgICB0aGlzLmZpbHRlcnMuU29ydCA9IHZhbHVlcztcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIFRvRGVmYXVsdEZpbHRlcnMoKSB7XHJcbiAgICB0aGlzLmZpbHRlcnMuQnJhbmQgPSBbXTtcclxuICAgIHRoaXMuZmlsdGVycy5DYXRlZ29yeSA9IFtdO1xyXG4gICAgdGhpcy5maWx0ZXJzLk1pblByaWNlID0gdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhQcmljZSgpLm1pbjtcclxuICAgIHRoaXMuZmlsdGVycy5NYXhQcmljZSA9IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4UHJpY2UoKS5tYXg7XHJcbiAgICB0aGlzLmZpbHRlcnMuTWluWWVhciA9IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4RGF0ZSgpLm1pbjtcclxuICAgIHRoaXMuZmlsdGVycy5NYXhZZWFyID0gdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhEYXRlKCkubWF4O1xyXG4gICAgdGhpcy5maWx0ZXJzLlNlYXJjaCA9ICcnO1xyXG4gICAgdGhpcy5maWx0ZXJzLlNvcnQgPSAnU29ydCBieSc7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IHByb2R1Y3QgfSBmcm9tICcuL0ludGVyZmFjZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcGx5U29ydCB7XHJcbiAgcHJpdmF0ZSBEYXRhQWZ0ZXJGaWx0ZXJzOiBwcm9kdWN0W10gPSBbXTtcclxuICAvL3ByaXZhdGVcclxuICBjb25zdHJ1Y3Rvcihzb3J0OiBzdHJpbmcsIHByb2R1Y3RzOiBwcm9kdWN0W10pIHtcclxuICAgIHRoaXMuRGF0YUFmdGVyRmlsdGVycyA9IHByb2R1Y3RzO1xyXG4gICAgaWYgKHNvcnQgIT09ICdTb3J0IGJ5Jykge1xyXG4gICAgICBzd2l0Y2ggKHNvcnQpIHtcclxuICAgICAgICBjYXNlICdSYXRpbmcnOlxyXG4gICAgICAgICAgdGhpcy5Tb3J0QnlSYXRpbmcodGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ1ByaWNlVEgnOlxyXG4gICAgICAgICAgdGhpcy5Tb3J0QnlQcmljZUx0b0godGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ1ByaWNlVEwnOlxyXG4gICAgICAgICAgdGhpcy5Tb3J0QnlQcmljZUh0b0wodGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ1JEJzpcclxuICAgICAgICAgIHRoaXMuU29ydEJ5UmVsZWFzZURhdGUodGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAvL3RoaXMuU29ydEJ5SUQodGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc29ydCA9PT0gJ1NvcnQgYnknKSB7XHJcbiAgICAgIHRoaXMuU29ydEJ5SUQodGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybigpIHtcclxuICAgIHJldHVybiB0aGlzLkRhdGFBZnRlckZpbHRlcnM7XHJcbiAgfVxyXG5cclxuICBTb3J0QnlSYXRpbmcocHJvZHVjdHM6IHByb2R1Y3RbXSkge1xyXG4gICAgbGV0IGNvdW50ZXIgPSAxO1xyXG4gICAgbGV0IHRlbXA6IHByb2R1Y3Q7XHJcbiAgICBmb3IgKGxldCBrID0gMDsgayA8IHByb2R1Y3RzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSBjb3VudGVyOyBpIDwgcHJvZHVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAocHJvZHVjdHNba10ucmF0aW5nID4gcHJvZHVjdHNbaV0ucmF0aW5nKSB7XHJcbiAgICAgICAgICB0ZW1wID0gcHJvZHVjdHNba107XHJcbiAgICAgICAgICBwcm9kdWN0c1trXSA9IHByb2R1Y3RzW2ldO1xyXG4gICAgICAgICAgcHJvZHVjdHNbaV0gPSB0ZW1wO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb3VudGVyICs9IDE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBTb3J0QnlJRChwcm9kdWN0czogcHJvZHVjdFtdKSB7XHJcbiAgICBsZXQgY291bnRlciA9IDE7XHJcbiAgICBsZXQgdGVtcDogcHJvZHVjdDtcclxuICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcHJvZHVjdHMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgZm9yIChsZXQgaSA9IGNvdW50ZXI7IGkgPCBwcm9kdWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChwcm9kdWN0c1trXS5pZCA+IHByb2R1Y3RzW2ldLmlkKSB7XHJcbiAgICAgICAgICB0ZW1wID0gcHJvZHVjdHNba107XHJcbiAgICAgICAgICBwcm9kdWN0c1trXSA9IHByb2R1Y3RzW2ldO1xyXG4gICAgICAgICAgcHJvZHVjdHNbaV0gPSB0ZW1wO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb3VudGVyICs9IDE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBTb3J0QnlQcmljZUx0b0gocHJvZHVjdHM6IHByb2R1Y3RbXSkge1xyXG4gICAgbGV0IGNvdW50ZXIgPSAxO1xyXG4gICAgbGV0IHRlbXA6IHByb2R1Y3Q7XHJcbiAgICBmb3IgKGxldCBrID0gMDsgayA8IHByb2R1Y3RzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSBjb3VudGVyOyBpIDwgcHJvZHVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAocHJvZHVjdHNba10ucHJpY2UgPiBwcm9kdWN0c1tpXS5wcmljZSkge1xyXG4gICAgICAgICAgdGVtcCA9IHByb2R1Y3RzW2tdO1xyXG4gICAgICAgICAgcHJvZHVjdHNba10gPSBwcm9kdWN0c1tpXTtcclxuICAgICAgICAgIHByb2R1Y3RzW2ldID0gdGVtcDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY291bnRlciArPSAxO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgU29ydEJ5UHJpY2VIdG9MKHByb2R1Y3RzOiBwcm9kdWN0W10pIHtcclxuICAgIGxldCBjb3VudGVyID0gMTtcclxuICAgIGxldCB0ZW1wOiBwcm9kdWN0O1xyXG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCBwcm9kdWN0cy5sZW5ndGg7IGsrKykge1xyXG4gICAgICBmb3IgKGxldCBpID0gY291bnRlcjsgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHByb2R1Y3RzW2tdLnByaWNlIDwgcHJvZHVjdHNbaV0ucHJpY2UpIHtcclxuICAgICAgICAgIHRlbXAgPSBwcm9kdWN0c1trXTtcclxuICAgICAgICAgIHByb2R1Y3RzW2tdID0gcHJvZHVjdHNbaV07XHJcbiAgICAgICAgICBwcm9kdWN0c1tpXSA9IHRlbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvdW50ZXIgKz0gMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFNvcnRCeVJlbGVhc2VEYXRlKHByb2R1Y3RzOiBwcm9kdWN0W10pIHtcclxuICAgIGxldCBjb3VudGVyID0gMTtcclxuICAgIGxldCB0ZW1wOiBwcm9kdWN0O1xyXG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCBwcm9kdWN0cy5sZW5ndGg7IGsrKykge1xyXG4gICAgICBmb3IgKGxldCBpID0gY291bnRlcjsgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHByb2R1Y3RzW2tdLkRhdGVPZklzc3VlID4gcHJvZHVjdHNbaV0uRGF0ZU9mSXNzdWUpIHtcclxuICAgICAgICAgIHRlbXAgPSBwcm9kdWN0c1trXTtcclxuICAgICAgICAgIHByb2R1Y3RzW2tdID0gcHJvZHVjdHNbaV07XHJcbiAgICAgICAgICBwcm9kdWN0c1tpXSA9IHRlbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvdW50ZXIgKz0gMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN3YXAoZmlyc3Q6IHByb2R1Y3QsIHNlY29uZDogcHJvZHVjdCkge1xyXG4gICAgY29uc3QgdGVtcDogcHJvZHVjdCA9IGZpcnN0O1xyXG4gICAgZmlyc3QgPSBzZWNvbmQ7XHJcbiAgICBzZWNvbmQgPSB0ZW1wO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDcmVhdGVDaGVja291dFBvcHVwIH0gZnJvbSAnLi9DaGVja291dFBvcHVwJztcclxuaW1wb3J0IHsgQ3JlYXRlRWxlbWVudCB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlRWxlbWVudCc7XHJcbmltcG9ydCB7IENyZWF0ZVRleHRJbnB1dCB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlVGV4dElucHV0JztcclxuaW1wb3J0IHsgcHJvZHVjdCB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi9yb3V0ZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFza2V0UGFnZSB7XHJcbiAgcHJpdmF0ZSByb3V0ZSA9IG5ldyBSb3V0ZXIoKTtcclxuICBjb25zdHJ1Y3RvcihEZWZhdWx0TGltaXQ6IG51bWJlciwgRGVmYXVsdFBhZ2U6IG51bWJlcikge1xyXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpICE9PSBudWxsICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpPy5sZW5ndGggIT09IDIpIHtcclxuICAgICAgbGV0IFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZTogcHJvZHVjdFtdID0gW107XHJcbiAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykhKTtcclxuICAgICAgY29uc3QgcGFnZXMgPSBNYXRoLmNlaWwoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLmxlbmd0aCAvIERlZmF1bHRMaW1pdCk7XHJcbiAgICAgIGxldCB0b3RhbHByaWNlID0gMDtcclxuICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICB0b3RhbHByaWNlICs9IGl0ZW0uY291bnRlciAqIGl0ZW0ucHJpY2U7XHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgY29uc3QgbWFpbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnbWFpbicsIGNsYXNzTmFtZTogJ21haW4nIH0pLmdldG5vZGUoKTtcclxuICAgICAgYm9keS5hcHBlbmQobWFpbik7XHJcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3dyYXBwZXIgbWFpbl9fd3JhcHBlciBjYXJ0X193cmFwcGVyJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIG1haW4uYXBwZW5kKHdyYXBwZXIpO1xyXG5cclxuICAgICAgY29uc3QgbWVudSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnbWVudScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICAvLyB3cmFwcGVyLmFwcGVuZChtZW51KTtcclxuICAgICAgLy9jb25zdCBUZXh0TWVudSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnaDInLCBjbGFzc05hbWU6ICd0ZXh0bWVudScsIGNvbnRlbnQ6ICdQcm9kdWN0cyBJbiBDYXJ0JyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGNvbnN0IGxpbWl0ID0gbmV3IENyZWF0ZVRleHRJbnB1dCh7XHJcbiAgICAgICAgdHlwZTogJ251bWJlcicsXHJcbiAgICAgICAgcGxhY2Vob2xkZXI6ICczJyxcclxuICAgICAgICBjbGFzc05hbWU6ICdsaW1pdCcsXHJcbiAgICAgICAgbmFtZTogJ2xpbWl0JyxcclxuICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBwYWdlID0gbmV3IENyZWF0ZVRleHRJbnB1dCh7IHR5cGU6ICdudW1iZXInLCBwbGFjZWhvbGRlcjogJzEnLCBjbGFzc05hbWU6ICdwYWdlJywgbmFtZTogJ3BhZ2UnIH0pLmdldG5vZGUoKTtcclxuICAgICAgY29uc3QgTGltaXRTcGFuID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY29udGVudDogJ0xpbWl0OicgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBQYWdlU3BhbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNvbnRlbnQ6ICdQYWdlOicgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBsaW1pdC52YWx1ZSA9IERlZmF1bHRMaW1pdC50b1N0cmluZygpO1xyXG4gICAgICBsaW1pdC5taW4gPSAnMSc7XHJcbiAgICAgIGxpbWl0Lm1heCA9IFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5sZW5ndGgudG9TdHJpbmcoKTtcclxuICAgICAgcGFnZS52YWx1ZSA9IERlZmF1bHRQYWdlLnRvU3RyaW5nKCk7XHJcbiAgICAgIHBhZ2UubWluID0gJzEnO1xyXG4gICAgICBwYWdlLm1heCA9IHBhZ2VzLnRvU3RyaW5nKCk7XHJcbiAgICAgIGxpbWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucm91dGUuQWRkUm91dGluZ0luQmFza2V0KCtsaW1pdC52YWx1ZSwgK3BhZ2UudmFsdWUpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JylbMV0udmFsdWUpXHJcbiAgICAgIH0pO1xyXG4gICAgICBwYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucm91dGUuQWRkUm91dGluZ0luQmFza2V0KCtsaW1pdC52YWx1ZSwgK3BhZ2UudmFsdWUpO1xyXG4gICAgICB9KTtcclxuICAgICAgbWVudS5hcHBlbmQoLypUZXh0TWVudSovIExpbWl0U3BhbiwgbGltaXQsIFBhZ2VTcGFuLCBwYWdlKTtcclxuXHJcbiAgICAgIGNvbnN0IExpc3RPZlByb2R1Y3RzID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdjYXJ0X19pdGVtcycsIGlkOiAnY2FydC1pdGVtcycgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBzdW1tYXJ5ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdjYXJ0X19zdW1tYXJ5JyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIExpc3RPZlByb2R1Y3RzLmFwcGVuZChtZW51KTtcclxuICAgICAgLy8vLy8vIFNVTU1BUlkgLy8vLy8vXHJcbiAgICAgIGNvbnN0IHN1bW1hcnlXcmFwcGVyID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzdW1tYXJ5X193cmFwcGVyJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIHN1bW1hcnkuYXBwZW5kKHN1bW1hcnlXcmFwcGVyKTtcclxuICAgICAgY29uc3QgcHJvbW9jb2RlID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzdW1tYXJ5X19wcm9tb2NvZGUnIH0pLmdldG5vZGUoKTtcclxuICAgICAgY29uc3QgcHJvbW9jb2RlVGl0bGUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgICAgY2xhc3NOYW1lOiAnc3VtbWFyeV9fdGl0bGUnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICdQcm9tbyBDb2RlJyxcclxuICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBwcm9tb2NvZGVBcmVhID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzdW1tYXJ5X19wcm9tb2NvZGUtYXJlYScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBwcm9tb2NvZGVJbnB1dCA9IG5ldyBDcmVhdGVUZXh0SW5wdXQoe1xyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICBwbGFjZWhvbGRlcjogJ2JhbGF4b24gfCBlbmF5YWFtZScsXHJcbiAgICAgICAgbmFtZTogJ3Byb21vY29kZScsXHJcbiAgICAgICAgY2xhc3NOYW1lOiAnc3VtbWFyeV9fcHJvbW9jb2RlLWlucHV0JyxcclxuICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBwcm9tb2NvZGVCdXR0b24gPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgICAgdGFnOiAnYnV0dG9uJyxcclxuICAgICAgICBjbGFzc05hbWU6ICdzdW1tYXJ5X19wcm9tb2NvZGUtYnV0dG9uJyxcclxuICAgICAgICBjb250ZW50OiAnYWRkJyxcclxuICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBwcm9tb2NvZGVUZXh0QXJlYSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc3VtbWFyeV9fdGV4dC1hcmVhJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIHByb21vY29kZUFyZWEuYXBwZW5kKHByb21vY29kZUlucHV0LCBwcm9tb2NvZGVCdXR0b24pO1xyXG4gICAgICBwcm9tb2NvZGUuYXBwZW5kKHByb21vY29kZVRpdGxlLCBwcm9tb2NvZGVBcmVhLCBwcm9tb2NvZGVUZXh0QXJlYSk7XHJcbiAgICAgIGNvbnN0IG9yZGVyU3VtbWFyeSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc3VtbWFyeV9fb3JkZXItc3VtbWFyeScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBvcmRlclRpdGxlID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICAgIHRhZzogJ3NwYW4nLFxyXG4gICAgICAgIGNsYXNzTmFtZTogJ3N1bW1hcnlfX3RpdGxlJyxcclxuICAgICAgICBjb250ZW50OiAnT3JkZXIgc3VtbWFyeScsXHJcbiAgICAgIH0pLmdldG5vZGUoKTtcclxuICAgICAgY29uc3Qgb3JkZXJUZXh0QXJlYSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc3VtbWFyeV9fdGV4dC1hcmVhJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGNvbnN0IG9yZGVyU3VidG90YWwgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N1bW1hcnlfX2xpJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGNvbnN0IHN1bW1hcnlPcmRlcjFMZWZ0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY29udGVudDogJ1N1YnRvdGFsJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGNvbnN0IHN1bW1hcnlPcmRlcjFSaWdodCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc3VtbWFyeV9fcHJpY2UtY2hhbmdlJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGNvbnN0IHN1bW1hcnlQcmljZSA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgICB0YWc6ICdzcGFuJyxcclxuICAgICAgICBjb250ZW50OiAnJCAnICsgdG90YWxwcmljZS50b1N0cmluZygpLFxyXG4gICAgICAgIGlkOiAnc3VidG90YWwtcHJpY2UnLFxyXG4gICAgICB9KS5nZXRub2RlKCk7XHJcbiAgICAgIHN1bW1hcnlPcmRlcjFSaWdodC5hcHBlbmQoc3VtbWFyeVByaWNlKTtcclxuICAgICAgb3JkZXJTdWJ0b3RhbC5hcHBlbmQoc3VtbWFyeU9yZGVyMUxlZnQsIHN1bW1hcnlPcmRlcjFSaWdodCk7XHJcbiAgICAgIGNvbnN0IG9yZGVyU2hpcHBpbmcgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N1bW1hcnlfX2xpJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGNvbnN0IHN1bW1hcnlPcmRlcjJMZWZ0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY29udGVudDogJ1NoaXBwaW5nJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGNvbnN0IHN1bW1hcnlPcmRlcjJSaWdodCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNvbnRlbnQ6ICckIDIwJyB9KS5nZXRub2RlKCk7XHJcblxyXG4gICAgICBvcmRlclNoaXBwaW5nLmFwcGVuZChzdW1tYXJ5T3JkZXIyTGVmdCwgc3VtbWFyeU9yZGVyMlJpZ2h0KTtcclxuICAgICAgb3JkZXJUZXh0QXJlYS5hcHBlbmQob3JkZXJTdWJ0b3RhbCwgb3JkZXJTaGlwcGluZyk7XHJcbiAgICAgIG9yZGVyU3VtbWFyeS5hcHBlbmQob3JkZXJUaXRsZSwgb3JkZXJUZXh0QXJlYSk7XHJcblxyXG4gICAgICBjb25zdCB0b3RhbCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc3VtbWFyeV9fdG90YWwnIH0pLmdldG5vZGUoKTtcclxuICAgICAgY29uc3QgdG90YWxUaXRsZSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNsYXNzTmFtZTogJ3N1bW1hcnlfX3RpdGxlJywgY29udGVudDogJ1RvdGFsJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGNvbnN0IHRvdGFsUHJpY2UgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgICAgY2xhc3NOYW1lOiAnc3VtbWFyeV9fdGl0bGUnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICckICcgKyAodG90YWxwcmljZSArIDIwKS50b1N0cmluZygpLFxyXG4gICAgICAgIGlkOiAnc3VtbWFyeS10b3RhbCcsXHJcbiAgICAgIH0pLmdldG5vZGUoKTtcclxuXHJcbiAgICAgIHRvdGFsLmFwcGVuZCh0b3RhbFRpdGxlLCB0b3RhbFByaWNlKTtcclxuXHJcbiAgICAgIGNvbnN0IGNoZWNrb3V0QnV0dG9uID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICAgIHRhZzogJ2J1dHRvbicsXHJcbiAgICAgICAgY2xhc3NOYW1lOiAnc3VtbWFyeV9fY2hlY2tvdXQtYnV0dG9uJyxcclxuICAgICAgICBpZDogJ2J1eWl0bm93QnRuJyxcclxuICAgICAgICBjb250ZW50OiAnR28gdG8gY2hlY2tvdXQnLFxyXG4gICAgICB9KS5nZXRub2RlKCk7XHJcblxyXG4gICAgICBzdW1tYXJ5V3JhcHBlci5hcHBlbmQocHJvbW9jb2RlLCBvcmRlclN1bW1hcnksIHRvdGFsLCBjaGVja291dEJ1dHRvbik7XHJcbiAgICAgIHdyYXBwZXIuYXBwZW5kKExpc3RPZlByb2R1Y3RzLCBzdW1tYXJ5KTtcclxuXHJcbiAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgY2hlY2tvdXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAncG9wdXBfX292ZXJsYXknIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBjb25zdCBwb3B1cCA9IG5ldyBDcmVhdGVDaGVja291dFBvcHVwKCkuZ2V0bm9kZSgpO1xyXG4gICAgICAgIG92ZXJsYXkuYXBwZW5kKHBvcHVwKTtcclxuICAgICAgICBib2R5LmFwcGVuZChvdmVybGF5KTtcclxuICAgICAgICBib2R5LnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nO1xyXG4gICAgICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKChlLnRhcmdldCBhcyBIVE1MRWxlbWVudCkuY2xhc3NMaXN0LmNvbnRhaW5zKCdwb3B1cF9fb3ZlcmxheScpKSB7XHJcbiAgICAgICAgICAgIHBvcHVwLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBvdmVybGF5LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBib2R5LnN0eWxlLm92ZXJmbG93WSA9ICdhdXRvJztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgIGxldCBiYWxheG9uID0gJyc7XHJcbiAgICAgIGxldCBlbmF5YWFtZSA9ICcnO1xyXG4gICAgICBsZXQgYmFsYXhvbkNvdW50ZXIgPSAwO1xyXG4gICAgICBsZXQgZW5heWFhbWVDb3VudGVyID0gMDtcclxuICAgICAgbGV0IHNhbGUgPSAwO1xyXG4gICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiYWxheG9uJykgIT09IG51bGwpIHtcclxuICAgICAgICBiYWxheG9uID0gJ2JhbGF4b24nO1xyXG4gICAgICAgIGJhbGF4b25Db3VudGVyID0gK3dpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmFsYXhvbicpITtcclxuICAgICAgfVxyXG4gICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlbmF5YWFtZScpICE9PSBudWxsKSB7XHJcbiAgICAgICAgZW5heWFhbWUgPSAnZW5heWFhbWUnO1xyXG4gICAgICAgIGVuYXlhYW1lQ291bnRlciA9ICt3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2VuYXlhYW1lJykhO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYmFsYXhvbiA9PT0gJ2JhbGF4b24nICYmIGJhbGF4b25Db3VudGVyID09PSAxKSB7XHJcbiAgICAgICAgY29uc3QgcHJvbW9jb2RlID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzdW1tYXJ5X19saScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICAgIGNvbnN0IHN1bW1hcnlQcm9tb2NvZGUxTGVmdCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNvbnRlbnQ6IGJhbGF4b24gfSkuZ2V0bm9kZSgpO1xyXG4gICAgICAgIGNvbnN0IHN1bW1hcnlQcm9tb2NvZGUxUmlnaHQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBjb250ZW50OiAnLTEwJScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICAgIGNvbnN0IGJhbGF4b25EZWwgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgICAgICB0YWc6ICdidXR0b24nLFxyXG4gICAgICAgICAgY2xhc3NOYW1lOiAnc3VtbWFyeV9fcHJvbW9jb2RlLWJ1dHRvbicsXHJcbiAgICAgICAgICBjb250ZW50OiAnZGVsJyxcclxuICAgICAgICB9KS5nZXRub2RlKCk7XHJcbiAgICAgICAgYmFsYXhvbkRlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYmFsYXhvbicpO1xyXG4gICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcHJvbW9jb2RlLmFwcGVuZChzdW1tYXJ5UHJvbW9jb2RlMUxlZnQsIHN1bW1hcnlQcm9tb2NvZGUxUmlnaHQsIGJhbGF4b25EZWwpO1xyXG4gICAgICAgIHByb21vY29kZVRleHRBcmVhLmFwcGVuZChwcm9tb2NvZGUpO1xyXG4gICAgICAgIHNhbGUgKz0gMC4xO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZW5heWFhbWUgPT09ICdlbmF5YWFtZScgJiYgZW5heWFhbWVDb3VudGVyID09PSAxKSB7XHJcbiAgICAgICAgY29uc3QgcHJvbW9jb2RlID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzdW1tYXJ5X19saScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICAgIGNvbnN0IHN1bW1hcnlQcm9tb2NvZGUxTGVmdCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNvbnRlbnQ6IGVuYXlhYW1lIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBjb25zdCBzdW1tYXJ5UHJvbW9jb2RlMVJpZ2h0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY29udGVudDogJy0xMCUnIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBjb25zdCBlbmF5YWFtZURlbCA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgICAgIHRhZzogJ2J1dHRvbicsXHJcbiAgICAgICAgICBjbGFzc05hbWU6ICdzdW1tYXJ5X19wcm9tb2NvZGUtYnV0dG9uJyxcclxuICAgICAgICAgIGNvbnRlbnQ6ICdkZWwnLFxyXG4gICAgICAgIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBlbmF5YWFtZURlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZW5heWFhbWUnKTtcclxuICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHByb21vY29kZS5hcHBlbmQoc3VtbWFyeVByb21vY29kZTFMZWZ0LCBzdW1tYXJ5UHJvbW9jb2RlMVJpZ2h0LCBlbmF5YWFtZURlbCk7XHJcbiAgICAgICAgcHJvbW9jb2RlVGV4dEFyZWEuYXBwZW5kKHByb21vY29kZSk7XHJcbiAgICAgICAgc2FsZSArPSAwLjE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChlbmF5YWFtZSA9PT0gJ2VuYXlhYW1lJyB8fCBiYWxheG9uID09PSAnYmFsYXhvbicpIHtcclxuICAgICAgICBjb25zdCBzdW1tYXJ5UHJpY2UgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBpZDogJ3N1bW1hcnktcHJpY2UnIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBzdW1tYXJ5T3JkZXIxUmlnaHQuYXBwZW5kKHN1bW1hcnlQcmljZSk7XHJcbiAgICAgICAgLy9jb25zdCBuZXdQcmljZSA9ICAoTnVtYmVyKHN1bW1hcnlQcmljZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIS50ZXh0Q29udGVudD8uc2xpY2UoMikpIC0gKE51bWJlcihzdW1tYXJ5UHJpY2UucHJldmlvdXNFbGVtZW50U2libGluZyEudGV4dENvbnRlbnQ/LnNsaWNlKDIpKSAvIDEwMCAqIDEwKSkudG9GaXhlZCgyKTtcclxuICAgICAgICBzdW1tYXJ5UHJpY2UudGV4dENvbnRlbnQgPSAnJCAnICsgKHRvdGFscHJpY2UgLSB0b3RhbHByaWNlICogc2FsZSk7XHJcbiAgICAgICAgdG90YWxQcmljZS50ZXh0Q29udGVudCA9ICckICcgKyAoMjAgKyAodG90YWxwcmljZSAtIHRvdGFscHJpY2UgKiBzYWxlKSkudG9GaXhlZCgyKTtcclxuICAgICAgICBzdW1tYXJ5UHJpY2UucHJldmlvdXNFbGVtZW50U2libGluZyEuY2xhc3NMaXN0LmFkZCgncHJpY2UtY2hhbmdlZCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwcm9tb2NvZGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgKHByb21vY29kZUlucHV0LnZhbHVlID09PSAnYmFsYXhvbicgJiYgYmFsYXhvbkNvdW50ZXIgPT09IDApIHx8XHJcbiAgICAgICAgICAocHJvbW9jb2RlSW5wdXQudmFsdWUgPT09ICdlbmF5YWFtZScgJiYgZW5heWFhbWVDb3VudGVyID09IDApXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAvLyBjb25zdCBwcm9tb2NvZGUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N1bW1hcnlfX2xpJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgICAgICAvLyBjb25zdCBzdW1tYXJ5UHJvbW9jb2RlMUxlZnQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBjb250ZW50OiBwcm9tb2NvZGVJbnB1dC52YWx1ZSB9KS5nZXRub2RlKCk7XHJcbiAgICAgICAgICAvLyBjb25zdCBzdW1tYXJ5UHJvbW9jb2RlMVJpZ2h0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY29udGVudDogJy0xMCUnIH0pLmdldG5vZGUoKTtcclxuICAgICAgICAgIC8vIHByb21vY29kZS5hcHBlbmQoc3VtbWFyeVByb21vY29kZTFMZWZ0LCBzdW1tYXJ5UHJvbW9jb2RlMVJpZ2h0KTtcclxuICAgICAgICAgIC8vIHByb21vY29kZVRleHRBcmVhLmFwcGVuZChwcm9tb2NvZGUpO1xyXG4gICAgICAgICAgaWYgKHByb21vY29kZUlucHV0LnZhbHVlID09PSAnYmFsYXhvbicpIGJhbGF4b25Db3VudGVyICs9IDE7XHJcbiAgICAgICAgICBpZiAocHJvbW9jb2RlSW5wdXQudmFsdWUgPT09ICdlbmF5YWFtZScpIGVuYXlhYW1lQ291bnRlciArPSAxO1xyXG5cclxuICAgICAgICAgIC8vIGlmKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmFsYXhvbicpID09PSBudWxsICYmIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZW5heWFhbWUnKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgLy8gICBjb25zdCBzdW1tYXJ5UHJpY2UgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBpZDogJ3N1bW1hcnktcHJpY2UnIH0pLmdldG5vZGUoKTtcclxuICAgICAgICAgIC8vICAgc3VtbWFyeU9yZGVyMVJpZ2h0LmFwcGVuZChzdW1tYXJ5UHJpY2UpO1xyXG5cclxuICAgICAgICAgIC8vIGNvbnN0IG5ld1ByaWNlID0gIChOdW1iZXIoc3VtbWFyeVByaWNlLnByZXZpb3VzRWxlbWVudFNpYmxpbmchLnRleHRDb250ZW50Py5zbGljZSgyKSkgLSAoTnVtYmVyKHN1bW1hcnlQcmljZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIS50ZXh0Q29udGVudD8uc2xpY2UoMikpIC8gMTAwICogMTApKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgLy8gc3VtbWFyeVByaWNlLnRleHRDb250ZW50ID0gJyQgJyArIG5ld1ByaWNlO1xyXG4gICAgICAgICAgLy8gdG90YWxQcmljZS50ZXh0Q29udGVudCA9ICckICcgKyAoKDIwICsgK25ld1ByaWNlKSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgIC8vIHN1bW1hcnlQcmljZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIS5jbGFzc0xpc3QuYWRkKCdwcmljZS1jaGFuZ2VkJyk7XHJcbiAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICBpZiAoYmFsYXhvbkNvdW50ZXIgPT09IDEgJiYgZW5heWFhbWVDb3VudGVyID09PSAxKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYmFsYXhvbicsICcxJyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZW5heWFhbWUnLCAnMScpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGJhbGF4b25Db3VudGVyID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdiYWxheG9uJywgJzEnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VuYXlhYW1lJywgJzEnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG4gICAgICBjb25zdCBtYWluID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdtYWluJywgY2xhc3NOYW1lOiAnbWFpbiBtYWluX2VtcHR5JyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGNvbnN0IGVtcHR5ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY2xhc3NOYW1lOiAnY2FydC1lbXB0eScsIGNvbnRlbnQ6ICdDYXJ0IGlzIGVtcHR5JyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIG1haW4uYXBwZW5kKGVtcHR5KTtcclxuICAgICAgYm9keS5hcHBlbmQobWFpbik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENyZWF0ZUVsZW1lbnQgfSBmcm9tICcuL0VsZW1lbnRzL0NyZWF0ZUVsZW1lbnQnO1xyXG5pbXBvcnQgeyBDcmVhdGVJbWFnZSB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlSW1hZ2UnO1xyXG5pbXBvcnQgeyBwcm9kdWN0IH0gZnJvbSAnLi9JbnRlcmZhY2VzJztcclxuaW1wb3J0IFJvdXRlciBmcm9tICcuL3JvdXRlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDYXJkUGFnZSB7XHJcbiAgY29uc3RydWN0b3IocHJvZHVjdDogcHJvZHVjdCkge1xyXG4gICAgY29uc3Qgcm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG4gICAgY29uc3QgbWFpbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnbWFpbicsIGNsYXNzTmFtZTogJ21haW4nIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHdyYXBwZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3dyYXBwZXIgY2FyZC1wYWdlX193cmFwcGVyJyB9KS5nZXRub2RlKCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZChtYWluKTtcclxuICAgIGNvbnN0IERpdlBhdGggPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ0RpdlBhdGgnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IERpdkNhcmQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ0RpdkNhcmQnIH0pLmdldG5vZGUoKTtcclxuICAgIG1haW4uYXBwZW5kKHdyYXBwZXIpO1xyXG4gICAgd3JhcHBlci5hcHBlbmQoRGl2UGF0aCk7XHJcbiAgICB3cmFwcGVyLmFwcGVuZChEaXZDYXJkKTtcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0g0L/QtdGA0LLRi9C5INC00LjQsiBkaXYucGF0aFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgY29uc3Qgc3BhbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnYScsIGNsYXNzTmFtZTogJ2NhcmRfcGF0aCcgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBEaXZQYXRoLmFwcGVuZChzcGFuKTtcclxuICAgIH1cclxuICAgIERpdlBhdGguY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudCA9ICdTVE9SRSAvICc7XHJcbiAgICByb3V0ZXIuQWRkUm91dGluZ1RvSGVhZGVyKERpdlBhdGguY2hpbGROb2Rlc1swXSBhcyBIVE1MRWxlbWVudCk7XHJcbiAgICBEaXZQYXRoLmNoaWxkTm9kZXNbMV0udGV4dENvbnRlbnQgPSBwcm9kdWN0LmNhdGVnb3J5ICsgJyAvICc7XHJcbiAgICBEaXZQYXRoLmNoaWxkTm9kZXNbMl0udGV4dENvbnRlbnQgPSBwcm9kdWN0LmJyYW5kICsgJyAvICc7XHJcbiAgICBEaXZQYXRoLmNoaWxkTm9kZXNbM10udGV4dENvbnRlbnQgPSBwcm9kdWN0Lm1vZGVsO1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLSDQstGC0L7RgNC+0Lkg0LTQuNCyIGRpdi5jYXJkXHJcbiAgICAvLyBjb25zdCBoMSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnaDEnLCBpZDogJ2gxX2NhcmQnLCBjb250ZW50OiBwcm9kdWN0Lm1vZGVsIH0pLmdldG5vZGUoKTtcclxuICAgIC8vIERpdkNhcmQuYXBwZW5kKGgxKTtcclxuICAgIGNvbnN0IGNhcmRjb250ZW50ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBpZDogJ2NhcmRjb250ZW50JyB9KS5nZXRub2RlKCk7XHJcbiAgICBEaXZDYXJkLmFwcGVuZChjYXJkY29udGVudCk7XHJcbiAgICBjb25zdCBjYXJkaW1hZ2VzID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBpZDogJ2NhcmRpbWFnZXMnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGNhcmRkYXRhID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBpZDogJ2NhcmRkYXRhJyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBjYXJkcHJpY2UgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGlkOiAnY2FyZHByaWNlJyB9KS5nZXRub2RlKCk7XHJcbiAgICBjYXJkY29udGVudC5hcHBlbmQoY2FyZGltYWdlcyk7XHJcbiAgICBjYXJkY29udGVudC5hcHBlbmQoY2FyZGRhdGEpO1xyXG4gICAgY2FyZGNvbnRlbnQuYXBwZW5kKGNhcmRwcmljZSk7XHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGltYWdlczpcclxuICAgIGNvbnN0IHJvdyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgaWQ6ICdyb3cnLCBjbGFzc05hbWU6ICdyb3cnIH0pLmdldG5vZGUoKTtcclxuICAgIGNhcmRpbWFnZXMuYXBwZW5kKHJvdyk7XHJcbiAgICBjb25zdCBjb2wyID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBpZDogJ2NvbC0yJywgY2xhc3NOYW1lOiAnY29sLTInIH0pLmdldG5vZGUoKTtcclxuICAgIHJvdy5hcHBlbmQoY29sMik7XHJcbiAgICBjb25zdCBjdXJyZW50aW1hZ2UgPSBuZXcgQ3JlYXRlSW1hZ2Uoe1xyXG4gICAgICBzcmM6IGAke3Byb2R1Y3QuaW1hZ2VzWzBdfWAsXHJcbiAgICAgIGlkOiAnY3VycmVudGltYWdlJyxcclxuICAgICAgY2xhc3NOYW1lOiAnY3VycmVudGltYWdlJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGltZ1JvdyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgaWQ6ICdzbWFsbC1pbWctcm93JywgY2xhc3NOYW1lOiAnc21hbGwtaW1nLXJvdycgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29sMi5hcHBlbmQoY3VycmVudGltYWdlLCBpbWdSb3cpO1xyXG4gICAgLy8gY29uc3QgbGlzdGltYWdlcyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgaWQ6ICdsaXN0aW1hZ2VzJyB9KS5nZXRub2RlKCk7XHJcbiAgICAvLyBjYXJkaW1hZ2VzLmFwcGVuZChsaXN0aW1hZ2VzKTtcclxuXHJcbiAgICBwcm9kdWN0LmltYWdlcy5mb3JFYWNoKChpdCkgPT4ge1xyXG4gICAgICBjb25zdCBzbWFsbGltZ0NvbnRhaW5lciA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgICB0YWc6ICdkaXYnLFxyXG4gICAgICAgIGlkOiAnc21hbGxJbWdDb250YWluZXInLFxyXG4gICAgICAgIGNsYXNzTmFtZTogJ3NtYWxsSW1nQ29udGFpbmVyJyxcclxuICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBzbWFsbGltZyA9IG5ldyBDcmVhdGVJbWFnZSh7IHNyYzogYCR7aXR9YCwgaWQ6ICdzbWFsbEltZycsIGNsYXNzTmFtZTogJ3NtYWxsSW1nJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIHNtYWxsaW1nQ29udGFpbmVyLmFwcGVuZChzbWFsbGltZyk7XHJcbiAgICAgIGltZ1Jvdy5hcHBlbmQoc21hbGxpbWdDb250YWluZXIpO1xyXG5cclxuICAgICAgLy8g0L/QtdGA0LXQutC70Y7Rh9C10L3QuNC1INC+0YHQvdC+0LLQvdC+0Lkg0LrQsNGA0YLQuNC90LrQuCAvL1xyXG4gICAgICBzbWFsbGltZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBjdXJyZW50aW1hZ2Uuc3JjID0gc21hbGxpbWcuc3JjO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tZGF0YTpcclxuICAgIGNvbnN0IGRhdGFUb3AgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2RhdGEtdG9wJyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBoMSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnaDEnLCBpZDogJ2gxX2NhcmQnLCBjb250ZW50OiBwcm9kdWN0Lm1vZGVsIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHJhdGluZ0Jsb2NrID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdyYXRpbmctYmxvY2snIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHJhdGluZ0ljb24gPSBuZXcgQ3JlYXRlSW1hZ2Uoe1xyXG4gICAgICBzcmM6ICcuL2Fzc2V0cy9pbWFnZXMvc3Rhci1yYXRpbmcuc3ZnJyxcclxuICAgICAgY2xhc3NOYW1lOiAncmF0aW5nLWljb24nLFxyXG4gICAgICBhbHQ6ICdzdGFyJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHJhdGluZ051bSA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ3JhdGluZy1udW0nLFxyXG4gICAgICBjb250ZW50OiBwcm9kdWN0LnJhdGluZy50b1N0cmluZygpLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgcmF0aW5nQmxvY2suYXBwZW5kKHJhdGluZ0ljb24sIHJhdGluZ051bSk7XHJcbiAgICBkYXRhVG9wLmFwcGVuZChoMSwgcmF0aW5nQmxvY2spO1xyXG4gICAgY29uc3QgcHJpY2VCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZGF0YV9fcHJpY2UnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHByaWNlTm9EaXNjb3VudCA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ3ByaWNlLW5vLWRpc2NvdW50JyxcclxuICAgICAgY29udGVudDogJyQgJyArICgocHJvZHVjdC5kaXNjb3VudFBlcmNlbnRhZ2UgLyAxMDApICogcHJvZHVjdC5wcmljZSArIHByb2R1Y3QucHJpY2UpLnRvRml4ZWQoMikudG9TdHJpbmcoKSxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHByaWNlV2l0aERpc2NvdW50ID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICB0YWc6ICdzcGFuJyxcclxuICAgICAgY2xhc3NOYW1lOiAncHJpY2Utd2l0aC1kaXNjb3VudCcsXHJcbiAgICAgIGNvbnRlbnQ6ICckICcgKyBwcm9kdWN0LnByaWNlLnRvU3RyaW5nKCksXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBwcmljZUJsb2NrLmFwcGVuZChwcmljZU5vRGlzY291bnQsIHByaWNlV2l0aERpc2NvdW50KTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY2xhc3NOYW1lOiAnZGF0YV9fdGl0bGUnLCBjb250ZW50OiAnRGVzY3JpcHRpb246JyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvblRleHQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgIHRhZzogJ3NwYW4nLFxyXG4gICAgICBjbGFzc05hbWU6ICdkYXRhX190ZXh0JyxcclxuICAgICAgY29udGVudDogcHJvZHVjdC5kZXNjcmlwdGlvbixcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGRlc2NyaXB0aW9uLmFwcGVuZChkZXNjcmlwdGlvblRleHQpO1xyXG4gICAgY29uc3QgcmVsZWFzZSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNsYXNzTmFtZTogJ2RhdGFfX3RpdGxlJywgY29udGVudDogJ1JlbGVhc2UgZGF0ZTonIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHJlbGVhc2VUZXh0ID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICB0YWc6ICdzcGFuJyxcclxuICAgICAgY2xhc3NOYW1lOiAnZGF0YV9fdGV4dCcsXHJcbiAgICAgIGNvbnRlbnQ6IHByb2R1Y3QuRGF0ZU9mSXNzdWUudG9TdHJpbmcoKSxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIHJlbGVhc2UuYXBwZW5kKHJlbGVhc2VUZXh0KTtcclxuICAgIGNvbnN0IGJyYW5kID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY2xhc3NOYW1lOiAnZGF0YV9fdGl0bGUnLCBjb250ZW50OiAnQnJhbmQ6JyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBicmFuZHRleHQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBjbGFzc05hbWU6ICdkYXRhX190ZXh0JywgY29udGVudDogcHJvZHVjdC5icmFuZCB9KS5nZXRub2RlKCk7XHJcbiAgICBicmFuZC5hcHBlbmQoYnJhbmR0ZXh0KTtcclxuICAgIGNvbnN0IGNhdGVnb3J5ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY2xhc3NOYW1lOiAnZGF0YV9fdGl0bGUnLCBjb250ZW50OiAnQ2F0ZWdvcnk6JyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBjYXRlZ29yeVRleHQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgIHRhZzogJ3NwYW4nLFxyXG4gICAgICBjbGFzc05hbWU6ICdkYXRhX190ZXh0JyxcclxuICAgICAgY29udGVudDogcHJvZHVjdC5jYXRlZ29yeSxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNhdGVnb3J5LmFwcGVuZChjYXRlZ29yeVRleHQpO1xyXG4gICAgY29uc3QgYnV0dG9ucyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZGF0YV9fYnV0dG9ucycgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgYnV5Tm93ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdidXR0b24nLCBjbGFzc05hbWU6ICdkYXRhX19idXR0b24nLCBjb250ZW50OiAnQnV5IGl0IG5vdycgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgYWRkVG9DYXJ0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdjYXJkLXBhZ2VfX2FkZC10by1jYXJ0JyB9KS5nZXRub2RlKCk7XHJcbiAgICBidXR0b25zLmFwcGVuZChidXlOb3csIGFkZFRvQ2FydCk7XHJcblxyXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpICE9PSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IGNhcmRzOiBwcm9kdWN0W10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpISk7XHJcbiAgICAgIGNhcmRzLmZvckVhY2goKGl0KSA9PiB7XHJcbiAgICAgICAgaWYgKGl0LmlkID09PSBwcm9kdWN0LmlkKSB7XHJcbiAgICAgICAgICBhZGRUb0NhcnQuY2xhc3NMaXN0LnRvZ2dsZSgnX3Byb2R1Y3QtYWRkZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1eU5vdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgbGV0IFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZTogcHJvZHVjdFtdID0gW107XHJcbiAgICAgIGxldCB0b3RhbHByaWNlID0gMDtcclxuICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICBpZiAoIWFkZFRvQ2FydC5jbGFzc0xpc3QuY29udGFpbnMoJ19wcm9kdWN0LWFkZGVkJykpIHtcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykgIT09IG51bGwpIHtcclxuICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykhKTtcclxuICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5wdXNoKHByb2R1Y3QpO1xyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5wdXNoKHByb2R1Y3QpO1xyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5mb3JFYWNoKChpdCkgPT4ge1xyXG4gICAgICAgIGNvdW50ZXIgKz0gaXQuY291bnRlcjtcclxuICAgICAgICB0b3RhbHByaWNlICs9IGl0LmNvdW50ZXIgKiBpdC5wcmljZTtcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnN0IGNhcnRRdWFudGl0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudGVyLWJhc2tldCcpO1xyXG4gICAgICBjb25zdCBBbGxQcmljZUJhc2tldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGwtcHJpY2UtYmFza2V0Jyk7XHJcbiAgICAgIGNvbnN0IGJhc2tldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYXNrZXQtaW1nJyk7XHJcbiAgICAgIGlmIChjb3VudGVyICE9PSAwKSB7XHJcbiAgICAgICAgbGV0IGNjID0gMDtcclxuICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UuZm9yRWFjaCgoaXRlbSkgPT4gKGNjICs9IGl0ZW0uY291bnRlcikpO1xyXG4gICAgICAgIGNhcnRRdWFudGl0eSEudGV4dENvbnRlbnQgPSBjYy50b1N0cmluZygpO1xyXG4gICAgICAgIGNhcnRRdWFudGl0eSEuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcclxuICAgICAgICBjYXJ0UXVhbnRpdHkhLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgQWxsUHJpY2VCYXNrZXQhLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGJhc2tldCEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBBbGxQcmljZUJhc2tldCEudGV4dENvbnRlbnQgPSAnJCAnICsgdG90YWxwcmljZS50b1N0cmluZygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBmcm9tY2FyZCA9IHRydWU7XHJcbiAgICByb3V0ZXIuQWRkUm91dGluZ1RvQmFza2V0KGJ1eU5vdywgZnJvbWNhcmQpO1xyXG5cclxuICAgIGFkZFRvQ2FydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgLy9hZGRUb0NhcnQuY2xhc3NMaXN0LnRvZ2dsZSgnX3Byb2R1Y3QtYWRkZWQnKTtcclxuICAgICAgbGV0IHRvdGFscHJpY2UgPSAwO1xyXG4gICAgICBsZXQgY291bnRlciA9IDA7XHJcbiAgICAgIGxldCBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2U6IHByb2R1Y3RbXSA9IFtdO1xyXG4gICAgICBpZiAoYWRkVG9DYXJ0LmNsYXNzTGlzdC5jb250YWlucygnX3Byb2R1Y3QtYWRkZWQnKSkge1xyXG4gICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykhKTtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5mb3JFYWNoKChpdCwgaW5kKSA9PiB7XHJcbiAgICAgICAgICBpZiAoaXQuaWQgPT09IHByb2R1Y3QuaWQpIHtcclxuICAgICAgICAgICAgaW5kZXggPSBpbmQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpISk7XHJcbiAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UucHVzaChwcm9kdWN0KTtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0cycsIEpTT04uc3RyaW5naWZ5KFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UucHVzaChwcm9kdWN0KTtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0cycsIEpTT04uc3RyaW5naWZ5KFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBhZGRUb0NhcnQuY2xhc3NMaXN0LnRvZ2dsZSgnX3Byb2R1Y3QtYWRkZWQnKTtcclxuICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLmZvckVhY2goKGl0KSA9PiB7XHJcbiAgICAgICAgY291bnRlciArPSBpdC5jb3VudGVyO1xyXG4gICAgICAgIHRvdGFscHJpY2UgKz0gaXQuY291bnRlciAqIGl0LnByaWNlO1xyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgY2FydFF1YW50aXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50ZXItYmFza2V0Jyk7XHJcbiAgICAgIGNvbnN0IEFsbFByaWNlQmFza2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsbC1wcmljZS1iYXNrZXQnKTtcclxuICAgICAgY29uc3QgYmFza2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jhc2tldC1pbWcnKTtcclxuICAgICAgaWYgKGNvdW50ZXIgIT09IDApIHtcclxuICAgICAgICBsZXQgY2MgPSAwO1xyXG4gICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5mb3JFYWNoKChpdGVtKSA9PiAoY2MgKz0gaXRlbS5jb3VudGVyKSk7XHJcbiAgICAgICAgY2FydFF1YW50aXR5IS50ZXh0Q29udGVudCA9IGNjLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY2FydFF1YW50aXR5IS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG4gICAgICAgIGNhcnRRdWFudGl0eSEuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICBBbGxQcmljZUJhc2tldCEuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgYmFza2V0IS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIEFsbFByaWNlQmFza2V0IS50ZXh0Q29udGVudCA9ICckICcgKyB0b3RhbHByaWNlLnRvU3RyaW5nKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2FydFF1YW50aXR5IS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgY2FydFF1YW50aXR5IS5zdHlsZS5vcGFjaXR5ID0gJzAnO1xyXG4gICAgICAgIEFsbFByaWNlQmFza2V0IS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGJhc2tldCEuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgY2FyZGRhdGEuYXBwZW5kKGRhdGFUb3AsIHByaWNlQmxvY2ssIGRlc2NyaXB0aW9uLCByZWxlYXNlLCBicmFuZCwgY2F0ZWdvcnksIGJ1dHRvbnMpO1xyXG4gIH1cclxufVxyXG5cclxuLy9odHRwOi8vbG9jYWxob3N0OjgwODAvdXJsKGh0dHBzOi8vaS1wcm9kdWN0LmJ5L2ltYWdlcy9vL2FwcGxlLWlwaG9uZS0xNC1wcm8tMTI4Z2Ita29zbWljaGVza2lqLWNoZXJueWpfMS5qcGdcclxuLy9odHRwczovL2ktcHJvZHVjdC5ieS9pbWFnZXMvby9hcHBsZS1pcGhvbmUtMTQtcHJvLTEyOGdiLWtvc21pY2hlc2tpai1jaGVybnlqXzEuanBnXHJcbiIsImltcG9ydCB7IENyZWF0ZUVsZW1lbnQgfSBmcm9tICcuL0VsZW1lbnRzL0NyZWF0ZUVsZW1lbnQnO1xyXG5pbXBvcnQgeyBDcmVhdGVOdW1iZXJJbnB1dCB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlTnVtYmVySW5wdXQnO1xyXG5pbXBvcnQgeyBDcmVhdGVUZXh0SW5wdXQgfSBmcm9tICcuL0VsZW1lbnRzL0NyZWF0ZVRleHRJbnB1dCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3JlYXRlQ2hlY2tvdXRQb3B1cCBleHRlbmRzIENyZWF0ZUVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cCcgfSk7XHJcbiAgICBjb25zdCBjcmVkaXRDYXJkID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fY3JlZGl0LWNhcmQnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZsaXAgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3BvcHVwX19mbGlwJyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBmbGlwRnJvbnQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3BvcHVwX19mbGlwLWZyb250JyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBmbGlwQmFjayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAncG9wdXBfX2ZsaXAtYmFjaycgfSkuZ2V0bm9kZSgpO1xyXG4gICAgZmxpcC5hcHBlbmQoZmxpcEZyb250LCBmbGlwQmFjayk7XHJcbiAgICAvLy8vLyBmcm9udCAvLy8vL1xyXG4gICAgY29uc3QgZnJvbnRDaGlwID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fZnJvbnQtY2hpcCcgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgZnJvbnRMb2dvID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fZnJvbnQtbG9nbyBjYXJkLWxvZ28nIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZyb250TnVtYmVyID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fZnJvbnQtbnVtYmVyJyB9KS5nZXRub2RlKCk7XHJcblxyXG4gICAgY29uc3QgZnJvbnROYW1lID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fZnJvbnQtbmFtZScgfSkuZ2V0bm9kZSgpO1xyXG5cclxuICAgIGNvbnN0IG5hbWVQbGFjZWhvbGRlciA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ3BvcHVwX19mcm9udC1uYW1lLXBsYWNlaG9sZGVyJyxcclxuICAgICAgY29udGVudDogJ0NhcmQgaG9sZGVyJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IG5hbWVUZXh0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fZnJvbnQtbmFtZS10ZXh0JyB9KS5nZXRub2RlKCk7XHJcbiAgICBmcm9udE5hbWUuYXBwZW5kKG5hbWVQbGFjZWhvbGRlciwgbmFtZVRleHQpO1xyXG4gICAgY29uc3QgZnJvbnRFeHBpcmF0aW9uID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fZnJvbnQtZXhwaXJhdGlvbicgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgZXhwaXJhdGlvblBsYWNlaG9sZGVyID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICB0YWc6ICdzcGFuJyxcclxuICAgICAgY2xhc3NOYW1lOiAncG9wdXBfX2Zyb250LWV4cGlyYXRpb24tcGxhY2Vob2xkZXInLFxyXG4gICAgICBjb250ZW50OiAnRXhwaXJlcycsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBleHBpcmF0aW9uVGV4dCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAncG9wdXBfX2Zyb250LWV4cGlyYXRpb24tdGV4dCcgfSkuZ2V0bm9kZSgpO1xyXG4gICAgZnJvbnRFeHBpcmF0aW9uLmFwcGVuZChleHBpcmF0aW9uUGxhY2Vob2xkZXIsIGV4cGlyYXRpb25UZXh0KTtcclxuICAgIGZsaXBGcm9udC5hcHBlbmQoZnJvbnRDaGlwLCBmcm9udExvZ28sIGZyb250TnVtYmVyLCBmcm9udE5hbWUsIGZyb250RXhwaXJhdGlvbik7XHJcbiAgICAvLy8vLyBiYWNrIC8vLy8vXHJcbiAgICBjb25zdCBiYWNrU3RyaXAgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3BvcHVwX19iYWNrLXN0cmlwJyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBiYWNrTG9nbyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAncG9wdXBfX2JhY2stbG9nbyBjYXJkLWxvZ28nIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGJhY2tDY3YgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3BvcHVwX19iYWNrLWNjdicgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgY2N2UGxhY2Vob2xkZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgIHRhZzogJ3NwYW4nLFxyXG4gICAgICBjbGFzc05hbWU6ICdwb3B1cF9fYmFjay1jY3YtcGxhY2Vob2xkZXInLFxyXG4gICAgICBjb250ZW50OiAnQ2N2JyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGNjdlRleHQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3BvcHVwX19iYWNrLWNjdi10ZXh0JyB9KS5nZXRub2RlKCk7XHJcbiAgICBiYWNrQ2N2LmFwcGVuZChjY3ZQbGFjZWhvbGRlciwgY2N2VGV4dCk7XHJcbiAgICBmbGlwQmFjay5hcHBlbmQoYmFja1N0cmlwLCBiYWNrTG9nbywgYmFja0Njdik7XHJcbiAgICBjcmVkaXRDYXJkLmFwcGVuZChmbGlwKTtcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICBjb25zdCBmb3JtID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fZm9ybScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgZm9ybUNhcmROdW1iZXJCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9fYmxvY2snIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZvcm1DYXJkTnVtYmVyUGxhY2Vob2xkZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgIHRhZzogJ3NwYW4nLFxyXG4gICAgICBjbGFzc05hbWU6ICdmb3JtX19wbGFjZWhvbGRlcicsXHJcbiAgICAgIGNvbnRlbnQ6ICdDYXJkIG51bWJlcicsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBmb3JtQ2FyZE51bWJlcklucHV0cyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9faW5wdXRzJyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKCdbMC05XScpO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCA1OyBpKyspIHtcclxuICAgICAgY29uc3QgaW5wdXQgPSBuZXcgQ3JlYXRlTnVtYmVySW5wdXQoe1xyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICBjbGFzc05hbWU6ICdmb3JtX19pbnB1dCcsXHJcbiAgICAgICAgaWQ6IGkudG9TdHJpbmcoKSxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBudW1iZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJy5wb3B1cF9fbnVtYmVyJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgIGZyb250TnVtYmVyLmFwcGVuZChudW1iZXIpO1xyXG4gICAgICBpbnB1dC5taW5MZW5ndGggPSA0O1xyXG4gICAgICBpbnB1dC5tYXhMZW5ndGggPSA0O1xyXG4gICAgICBpbnB1dC5vbnBhc3RlID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfTtcclxuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGFzdGNoYXIgPSBpbnB1dC52YWx1ZVtpbnB1dC52YWx1ZS5sZW5ndGggLSAxXTtcclxuICAgICAgICBjb25zb2xlLmxvZyhsYXN0Y2hhcik7XHJcbiAgICAgICAgaW5wdXQudmFsdWUgPSBpbnB1dC52YWx1ZS5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgbnVtYmVyLnRleHRDb250ZW50ID0gaW5wdXQudmFsdWU7XHJcbiAgICAgICAgaWYgKHJlZy50ZXN0KGxhc3RjaGFyKSkge1xyXG4gICAgICAgICAgaW5wdXQudmFsdWUgKz0gbGFzdGNoYXI7XHJcbiAgICAgICAgICBudW1iZXIudGV4dENvbnRlbnQgKz0gbGFzdGNoYXI7XHJcbiAgICAgICAgICBpZiAoaSA9PT0gMSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGlucHV0LnZhbHVlWzBdKSB7XHJcbiAgICAgICAgICAgICAgY2FzZSAnNCc6XHJcbiAgICAgICAgICAgICAgICBmcm9udExvZ28uc3R5bGUuYmFja2dyb3VuZCA9IGB1cmwoJy4vYXNzZXRzL2ltYWdlcy92aXNhLnN2ZycpIG5vLXJlcGVhdCBjZW50ZXIgLyBjb250YWluYDtcclxuICAgICAgICAgICAgICAgIGJhY2tMb2dvLnN0eWxlLmJhY2tncm91bmQgPSBgdXJsKCcuL2Fzc2V0cy9pbWFnZXMvdmlzYS5zdmcnKSBuby1yZXBlYXQgY2VudGVyIC8gY29udGFpbmA7XHJcbiAgICAgICAgICAgICAgICAvL2Zyb250TG9nby50ZXh0Q29udGVudCA9ICdWSVNBJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJzUnOlxyXG4gICAgICAgICAgICAgICAgZnJvbnRMb2dvLnN0eWxlLmJhY2tncm91bmQgPSBgdXJsKCcuL2Fzc2V0cy9pbWFnZXMvbWFzdGVyY2FyZC5zdmcnKSBuby1yZXBlYXQgY2VudGVyIC8gY29udGFpbmA7XHJcbiAgICAgICAgICAgICAgICBiYWNrTG9nby5zdHlsZS5iYWNrZ3JvdW5kID0gYHVybCgnLi9hc3NldHMvaW1hZ2VzL21hc3RlcmNhcmQuc3ZnJykgbm8tcmVwZWF0IGNlbnRlciAvIGNvbnRhaW5gO1xyXG4gICAgICAgICAgICAgICAgLy9mcm9udExvZ28udGV4dENvbnRlbnQgPSAnTWFzdGVyQ2FyZCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICc2JzpcclxuICAgICAgICAgICAgICAgIGZyb250TG9nby5zdHlsZS5iYWNrZ3JvdW5kID0gYHVybCgnLi9hc3NldHMvaW1hZ2VzL2Rpc2NvdmVyLnN2ZycpIG5vLXJlcGVhdCBjZW50ZXIgLyBjb250YWluYDtcclxuICAgICAgICAgICAgICAgIGJhY2tMb2dvLnN0eWxlLmJhY2tncm91bmQgPSBgdXJsKCcuL2Fzc2V0cy9pbWFnZXMvZGlzY292ZXIuc3ZnJykgbm8tcmVwZWF0IGNlbnRlciAvIGNvbnRhaW5gO1xyXG4gICAgICAgICAgICAgICAgLy9mcm9udExvZ28udGV4dENvbnRlbnQgPSAnRGlzY292ZXInO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGZyb250TG9nby50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBmb3JtQ2FyZE51bWJlcklucHV0cy5hcHBlbmQoaW5wdXQpO1xyXG4gICAgfVxyXG4gICAgZm9ybUNhcmROdW1iZXJCbG9jay5hcHBlbmQoZm9ybUNhcmROdW1iZXJQbGFjZWhvbGRlciwgZm9ybUNhcmROdW1iZXJJbnB1dHMpO1xyXG4gICAgY29uc3QgZm9ybUNhcmROYW1lQmxvY2sgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2Zvcm1fX2Jsb2NrX25hbWUnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZvcm1DYXJkTmFtZVBsYWNlaG9sZGVyID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICB0YWc6ICdzcGFuJyxcclxuICAgICAgY2xhc3NOYW1lOiAnZm9ybV9fcGxhY2Vob2xkZXInLFxyXG4gICAgICBjb250ZW50OiAnQ2FyZCBob2xkZXInLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgZm9ybUNhcmROYW1lSW5wdXQgPSBuZXcgQ3JlYXRlVGV4dElucHV0KHtcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBuYW1lOiAnY2FyZC1ob2xkZXInLFxyXG4gICAgICBjbGFzc05hbWU6ICdmb3JtX19pbnB1dF9sb25nJyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBmb3JtQ2FyZE5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcclxuICAgICAgbmFtZVRleHQudGV4dENvbnRlbnQgPSBmb3JtQ2FyZE5hbWVJbnB1dC52YWx1ZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgfSk7XHJcbiAgICBmb3JtQ2FyZE5hbWVCbG9jay5hcHBlbmQoZm9ybUNhcmROYW1lUGxhY2Vob2xkZXIsIGZvcm1DYXJkTmFtZUlucHV0KTtcclxuICAgIGNvbnN0IGZvcm1DYXJkT3RoZXJCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9fYmxvY2tfb3RoZXInIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZvcm1DYXJkRXhwaXJhdGlvbkJsb2NrID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdmb3JtX19ibG9jay1oYWxmJyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBmb3JtQ2FyZEV4cGlyYXRpb25QbGFjZWhvbGRlciA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ2Zvcm1fX3BsYWNlaG9sZGVyJyxcclxuICAgICAgY29udGVudDogJ0V4cGlyYXRpb24gZGF0ZScsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBmb3JtQ2FyZE1vbnRoID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdmb3JtX19pbnB1dCcsIGlkOiAnbW9udGgtaW5wdXQnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IE1vbnRoU2VsZWN0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzZWxlY3QnLCBjbGFzc05hbWU6ICdmb3JtX19zZWxlY3QnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IG1vbnRoT3B0aW9uID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdvcHRpb24nIH0pLmdldG5vZGUoKTtcclxuICAgIE1vbnRoU2VsZWN0LmFwcGVuZChtb250aE9wdGlvbik7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IDEzOyBpKyspIHtcclxuICAgICAgY29uc3QgdmFsdWUgPSBpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuICAgICAgY29uc3Qgb3B0aW9uID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdvcHRpb24nLCBjb250ZW50OiB2YWx1ZSB9KS5nZXRub2RlKCk7XHJcbiAgICAgIE1vbnRoU2VsZWN0LmFwcGVuZChvcHRpb24pO1xyXG4gICAgfVxyXG4gICAgZm9ybUNhcmRNb250aC5hcHBlbmQoTW9udGhTZWxlY3QpO1xyXG5cclxuICAgIGNvbnN0IGZvcm1DYXJkWWVhciA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9faW5wdXQnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IFllYXJTZWxlY3QgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NlbGVjdCcsIGNsYXNzTmFtZTogJ2Zvcm1fX3NlbGVjdCcgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgeWVhck9wdGlvbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnb3B0aW9uJyB9KS5nZXRub2RlKCk7XHJcbiAgICBZZWFyU2VsZWN0LmFwcGVuZCh5ZWFyT3B0aW9uKTtcclxuICAgIGZvciAobGV0IGkgPSAyMDIyOyBpIDwgMjAzMTsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gaS50b1N0cmluZygpO1xyXG4gICAgICBjb25zdCBvcHRpb24gPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ29wdGlvbicsIGNvbnRlbnQ6IHZhbHVlIH0pLmdldG5vZGUoKTtcclxuICAgICAgWWVhclNlbGVjdC5hcHBlbmQob3B0aW9uKTtcclxuICAgIH1cclxuICAgIGZvcm1DYXJkWWVhci5hcHBlbmQoWWVhclNlbGVjdCk7XHJcbiAgICBmb3JtQ2FyZEV4cGlyYXRpb25CbG9jay5hcHBlbmQoZm9ybUNhcmRFeHBpcmF0aW9uUGxhY2Vob2xkZXIsIGZvcm1DYXJkTW9udGgsIGZvcm1DYXJkWWVhcik7XHJcblxyXG4gICAgY29uc3QgZm9ybUNhcmRDY3ZCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9fYmxvY2staGFsZicgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgZm9ybUNhcmRDY3ZQbGFjZWhvbGRlciA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ2Zvcm1fX3BsYWNlaG9sZGVyJyxcclxuICAgICAgaWQ6ICdjY3YtcGxhY2Vob2xkZXInLFxyXG4gICAgICBjb250ZW50OiAnQ2N2JyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZvcm1DYXJkQ2N2SW5wdXQgPSBuZXcgQ3JlYXRlVGV4dElucHV0KHtcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBuYW1lOiAnY2FyZC1jY3YnLFxyXG4gICAgICBjbGFzc05hbWU6ICdmb3JtX19pbnB1dCcsXHJcbiAgICAgIGlkOiAnY2FyZC1jY3YnLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGZvcm1DYXJkQ2N2SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGZvcm1DYXJkQ2N2SW5wdXQuZm9jdXMoKTtcclxuICAgICAgaWYgKCFjcmVkaXRDYXJkLmNsYXNzTGlzdC5jb250YWlucygnaG92ZXInKSkgY3JlZGl0Q2FyZC5jbGFzc0xpc3QuYWRkKCdob3ZlcicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgIGlmICgoZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkICE9PSAnY2FyZC1jY3YnKSB7XHJcbiAgICAgICAgaWYgKGNyZWRpdENhcmQuY2xhc3NMaXN0LmNvbnRhaW5zKCdob3ZlcicpKSBjcmVkaXRDYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZvcm1DYXJkQ2N2SW5wdXQubWF4TGVuZ3RoID0gMztcclxuICAgIGZvcm1DYXJkQ2N2SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGxhc3RjaGFyID0gZm9ybUNhcmRDY3ZJbnB1dC52YWx1ZVtmb3JtQ2FyZENjdklucHV0LnZhbHVlLmxlbmd0aCAtIDFdO1xyXG4gICAgICAvL2NvbnNvbGUubG9nKGxhc3RjaGFyKTtcclxuICAgICAgZm9ybUNhcmRDY3ZJbnB1dC52YWx1ZSA9IGZvcm1DYXJkQ2N2SW5wdXQudmFsdWUuc2xpY2UoMCwgLTEpO1xyXG4gICAgICBpZiAocmVnLnRlc3QobGFzdGNoYXIpKSB7XHJcbiAgICAgICAgZm9ybUNhcmRDY3ZJbnB1dC52YWx1ZSArPSBsYXN0Y2hhcjtcclxuICAgICAgfVxyXG4gICAgICBjY3ZUZXh0LnRleHRDb250ZW50ID0gZm9ybUNhcmRDY3ZJbnB1dC52YWx1ZTtcclxuICAgIH0pO1xyXG4gICAgZm9ybUNhcmRDY3ZJbnB1dC5vbnBhc3RlID0gKCkgPT4ge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgZm9ybUNhcmRDY3ZCbG9jay5hcHBlbmQoZm9ybUNhcmRDY3ZQbGFjZWhvbGRlciwgZm9ybUNhcmRDY3ZJbnB1dCk7XHJcblxyXG4gICAgZm9ybUNhcmRPdGhlckJsb2NrLmFwcGVuZChmb3JtQ2FyZEV4cGlyYXRpb25CbG9jaywgZm9ybUNhcmRDY3ZCbG9jayk7XHJcblxyXG4gICAgY29uc3QgZm9ybUNhcmRBZGRyZXNzQmxvY2sgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2Zvcm1fX2Jsb2NrX2FkZHJlc3MnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZvcm1BZGRyZXNzUGxhY2Vob2xkZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgIHRhZzogJ3NwYW4nLFxyXG4gICAgICBjbGFzc05hbWU6ICdmb3JtX19wbGFjZWhvbGRlcicsXHJcbiAgICAgIGNvbnRlbnQ6ICdTaGlwcGluZyBhZGRyZXNzJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZvcm1DYXJkQWRkcmVzc0lucHV0ID0gbmV3IENyZWF0ZVRleHRJbnB1dCh7XHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgbmFtZTogJ2FkZHJlc3MnLFxyXG4gICAgICBjbGFzc05hbWU6ICdmb3JtX19pbnB1dF9sb25nJyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcblxyXG4gICAgZm9ybUNhcmRBZGRyZXNzQmxvY2suYXBwZW5kKGZvcm1BZGRyZXNzUGxhY2Vob2xkZXIsIGZvcm1DYXJkQWRkcmVzc0lucHV0KTtcclxuICAgIGNvbnN0IGZvcm1DYXJkQ29udGFjdHNCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9fYmxvY2tfb3RoZXInIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZvcm1QaG9uZUJsb2NrID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdmb3JtX19ibG9jay1oYWxmJyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBmb3JtUGhvbmVQbGFjZWhvbGRlciA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ2Zvcm1fX3BsYWNlaG9sZGVyJyxcclxuICAgICAgaWQ6ICdwaG9uZS1wbGFjZWhvbGRlcicsXHJcbiAgICAgIGNvbnRlbnQ6ICdQaG9uZSBudW1iZXInLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgZm9ybVBob25lSW5wdXQgPSBuZXcgQ3JlYXRlVGV4dElucHV0KHtcclxuICAgICAgdHlwZTogJ3RlbCcsXHJcbiAgICAgIG5hbWU6ICdwaG9uZScsXHJcbiAgICAgIGNsYXNzTmFtZTogJ2Zvcm1fX2lucHV0X2hhbGYnLFxyXG4gICAgICBpZDogJ3Bob25lLWlucHV0JyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcblxyXG4gICAgZm9ybVBob25lQmxvY2suYXBwZW5kKGZvcm1QaG9uZVBsYWNlaG9sZGVyLCBmb3JtUGhvbmVJbnB1dCk7XHJcbiAgICBjb25zdCBmb3JtRW1haWxCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9fYmxvY2staGFsZicgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgZm9ybUVtYWlsUGxhY2Vob2xkZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgIHRhZzogJ3NwYW4nLFxyXG4gICAgICBjbGFzc05hbWU6ICdmb3JtX19wbGFjZWhvbGRlcicsXHJcbiAgICAgIGlkOiAnZW1haWwtcGxhY2Vob2xkZXInLFxyXG4gICAgICBjb250ZW50OiAnRS1tYWlsJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGZvcm1FbWFpbElucHV0ID0gbmV3IENyZWF0ZVRleHRJbnB1dCh7XHJcbiAgICAgIHR5cGU6ICdlbWFpbCcsXHJcbiAgICAgIG5hbWU6ICdlbWFpbCcsXHJcbiAgICAgIGNsYXNzTmFtZTogJ2Zvcm1fX2lucHV0X2hhbGYnLFxyXG4gICAgICBpZDogJ2VtYWlsLWlucHV0JyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBmb3JtRW1haWxCbG9jay5hcHBlbmQoZm9ybUVtYWlsUGxhY2Vob2xkZXIsIGZvcm1FbWFpbElucHV0KTtcclxuICAgIGZvcm1DYXJkQ29udGFjdHNCbG9jay5hcHBlbmQoZm9ybVBob25lQmxvY2ssIGZvcm1FbWFpbEJsb2NrKTtcclxuICAgIC8vLy8vLy8vLy8vLy8vXHJcbiAgICBjb25zdCBjb25maXJtQnV0dG9uID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICB0YWc6ICdidXR0b24nLFxyXG4gICAgICBjbGFzc05hbWU6ICdwb3B1cF9fYnV0dG9uJyxcclxuICAgICAgY29udGVudDogJ2NvbmZpcm0nLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG5cclxuICAgIGNvbnN0IE1ZID0ge1xyXG4gICAgICBtb250aDogJycsXHJcbiAgICAgIHllYXI6ICcnLFxyXG4gICAgfTtcclxuICAgIE1vbnRoU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgY29uc3QgbW9udGggPSBBcnJheS5mcm9tKE1vbnRoU2VsZWN0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdvcHRpb24nKSkuZmlsdGVyKChvcHRpb24pID0+IHtcclxuICAgICAgICByZXR1cm4gb3B0aW9uLnNlbGVjdGVkO1xyXG4gICAgICB9KTtcclxuICAgICAgTVkubW9udGggPSBtb250aFswXS50ZXh0Q29udGVudCE7XHJcbiAgICAgIGV4cGlyYXRpb25UZXh0LnRleHRDb250ZW50ID0gTVkubW9udGggKyAnLycgKyBNWS55ZWFyO1xyXG4gICAgfSk7XHJcblxyXG4gICAgWWVhclNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IFllYXIgPSBBcnJheS5mcm9tKFllYXJTZWxlY3QuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ29wdGlvbicpKS5maWx0ZXIoKG9wdGlvbikgPT4ge1xyXG4gICAgICAgIHJldHVybiBvcHRpb24uc2VsZWN0ZWQ7XHJcbiAgICAgIH0pO1xyXG4gICAgICBNWS55ZWFyID0gWWVhclswXS50ZXh0Q29udGVudCE7XHJcbiAgICAgIGV4cGlyYXRpb25UZXh0LnRleHRDb250ZW50ID0gTVkubW9udGggKyAnLycgKyBNWS55ZWFyO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgbGV0IG1lc3NhZ2UgPSAnJztcclxuXHJcbiAgICAgIGNvbnN0IG1vbnRoID0gQXJyYXkuZnJvbShNb250aFNlbGVjdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnb3B0aW9uJykpLmZpbHRlcigob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbi5zZWxlY3RlZDtcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnN0IHllYXIgPSBBcnJheS5mcm9tKE1vbnRoU2VsZWN0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdvcHRpb24nKSkuZmlsdGVyKChvcHRpb24pID0+IHtcclxuICAgICAgICByZXR1cm4gb3B0aW9uLnNlbGVjdGVkO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICghL14oWy5hLXpBLVpdezMsfVtcXHNdKXsyLH0kLy50ZXN0KChmb3JtQ2FyZE5hbWVJbnB1dC52YWx1ZSArPSAnICcpKSkge1xyXG4gICAgICAgIG1lc3NhZ2UgKz0gJ1xcbkNhcmQgaG9sZGVyIG5hbWUgc2hvdWxkIGNvbnRhaW4gYXQgbGVhc3QgMiB3b3JkcyBlYWNoIG9uZSBub3QgbGVzcyB0aGFuIDMgbGV0dGVycyEnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIW1vbnRoWzBdLnRleHRDb250ZW50KSB7XHJcbiAgICAgICAgbWVzc2FnZSArPSAnXFxuQ2hvc2UgZXhwaXJhdGlvbiBtb250aCEnO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICgheWVhclswXS50ZXh0Q29udGVudCkge1xyXG4gICAgICAgIG1lc3NhZ2UgKz0gJ1xcbkNob3NlIGV4cGlyYXRpb24geWVhciEnO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghL14oWy4wLTlhLXpBLVpcXC1cXCxdezUsfVtcXHNdKXszLH0kLy50ZXN0KChmb3JtQ2FyZEFkZHJlc3NJbnB1dC52YWx1ZSArPSAnICcpKSkge1xyXG4gICAgICAgIG1lc3NhZ2UgKz0gJ1xcblNoaXBwaW5nIGFkZHJlc3Mgc2hvdWxkIGNvbnRhaW4gYXQgbGVhc3QgMyB3b3JkcyBlYWNoIG9uZSBub3QgbGVzcyB0aGFuIDUgc3ltYm9scyEnO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghL15bXFwrXVswLTldezksMTV9JC8udGVzdChmb3JtUGhvbmVJbnB1dC52YWx1ZSkpIHtcclxuICAgICAgICBtZXNzYWdlICs9IFwiXFxuUGhvbmUgbnVtYmVyIHNob3VsZCBzdGFydCB3aXRoICcrJyBhbmQgY29udGFpbiA5IG9yIG1vcmUgZGlnaXRzIVwiO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghL15cXHcrKFtcXC4tXT9cXHcrKSpAXFx3KyhbXFwuLV0/XFx3KykqKFxcLlxcd3syLDN9KSskLy50ZXN0KGZvcm1FbWFpbElucHV0LnZhbHVlKSkge1xyXG4gICAgICAgIG1lc3NhZ2UgKz0gJ1xcbkludmFsaWQgZW1haWwgYWRkcmVzcyEnO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBDYXJkTGVuZ3RoID0gMDtcclxuICAgICAgZnJvbnROdW1iZXIuY2hpbGROb2Rlcy5mb3JFYWNoKChpdCkgPT4ge1xyXG4gICAgICAgIENhcmRMZW5ndGggKz0gaXQudGV4dENvbnRlbnQhLnNwbGl0KCcnKS5sZW5ndGghO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKENhcmRMZW5ndGggIT09IDE2KSB7XHJcbiAgICAgICAgbWVzc2FnZSArPSAnXFxuSW52YWxpZCBDYXJkISc7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGZvcm1DYXJkQ2N2SW5wdXQudmFsdWUuc3BsaXQoJycpLmxlbmd0aCAhPT0gMykge1xyXG4gICAgICAgIG1lc3NhZ2UgKz0gJ1xcbkludmFsaWQgQ0NWISc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChtZXNzYWdlKSB7XHJcbiAgICAgICAgYWxlcnQobWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZvcm0uYXBwZW5kKFxyXG4gICAgICBmb3JtQ2FyZE51bWJlckJsb2NrLFxyXG4gICAgICBmb3JtQ2FyZE5hbWVCbG9jayxcclxuICAgICAgZm9ybUNhcmRPdGhlckJsb2NrLFxyXG4gICAgICBmb3JtQ2FyZEFkZHJlc3NCbG9jayxcclxuICAgICAgZm9ybUNhcmRDb250YWN0c0Jsb2NrLFxyXG4gICAgICBjb25maXJtQnV0dG9uXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuZWwuYXBwZW5kKGNyZWRpdENhcmQsIGZvcm0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDcmVhdGVFbGVtZW50IH0gZnJvbSAnLi4vRWxlbWVudHMvQ3JlYXRlRWxlbWVudCc7XHJcbmltcG9ydCB7IHByb2R1Y3QgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgQ3JlYXRlSW1hZ2UgfSBmcm9tICcuLi9FbGVtZW50cy9DcmVhdGVJbWFnZSc7XHJcbmltcG9ydCB7IEFwcGx5Um91dGluZyB9IGZyb20gJy4uL0FwcGx5Um91dGluZyc7XHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi4vcm91dGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENyZWF0ZUNhcnRJdGVtIHtcclxuICBjb25zdHJ1Y3RvcihsaW1pdDogbnVtYmVyLCBwYWdlOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcclxuICAgIGNvbnN0IHRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJ0LWl0ZW1zJyk7XHJcbiAgICBsZXQgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlOiBwcm9kdWN0W10gPSBbXTtcclxuICAgIGxldCBjb3VudGVyID0gMDtcclxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKSAhPT0gbnVsbCAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKT8ubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykhKTtcclxuICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLmZvckVhY2goKGRhdGEpID0+IHtcclxuICAgICAgICBjb25zdCBjYXJ0SXRlbSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnY2FydF9faXRlbScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICAgIGNvbnN0IGNhcnRJdGVtQm9keSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnY2FydF9faXRlbS1ib2R5JyB9KS5nZXRub2RlKCk7XHJcbiAgICAgICAgY29uc3QgcGhvdG9CbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnaXRlbV9fcGhvdG8tYmxvY2snIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBjb25zdCBwaG90byA9IG5ldyBDcmVhdGVJbWFnZSh7XHJcbiAgICAgICAgICBzcmM6IGRhdGEuaW1hZ2VzWzBdLFxyXG4gICAgICAgICAgY2xhc3NOYW1lOiAnaXRlbV9fcGhvdG8nLFxyXG4gICAgICAgICAgaWQ6IGBjYXJkLSR7ZGF0YS5pZC50b1N0cmluZygpfWAsXHJcbiAgICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICAgIHBob3RvQmxvY2suYXBwZW5kKHBob3RvKTtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnaXRlbV9fZGVzY3JpcHRpb24nIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvblRpdGxlID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICAgICAgdGFnOiAnZGl2JyxcclxuICAgICAgICAgIGNsYXNzTmFtZTogJ2l0ZW1fX2Rlc2NyaXB0aW9uLXRpdGxlJyxcclxuICAgICAgICAgIGNvbnRlbnQ6IGAke2RhdGEubW9kZWx9YCxcclxuICAgICAgICAgIGlkOiBgY2FyZC0ke2RhdGEuaWQudG9TdHJpbmcoKX1gLFxyXG4gICAgICAgIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvblRleHQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgICAgICB0YWc6ICdkaXYnLFxyXG4gICAgICAgICAgY2xhc3NOYW1lOiAnaXRlbV9fZGVzY3JpcHRpb24tdGV4dCcsXHJcbiAgICAgICAgICBjb250ZW50OiBgJHtkYXRhLmRlc2NyaXB0aW9ufWAsXHJcbiAgICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICAgIGRlc2NyaXB0aW9uLmFwcGVuZChkZXNjcmlwdGlvblRpdGxlLCBkZXNjcmlwdGlvblRleHQpO1xyXG4gICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICAgICAgdGFnOiAnZGl2JyxcclxuICAgICAgICAgIGNsYXNzTmFtZTogJ2l0ZW1fX2NhdGVnb3J5JyxcclxuICAgICAgICAgIGNvbnRlbnQ6IGAke2RhdGEuY2F0ZWdvcnl9YCxcclxuICAgICAgICB9KS5nZXRub2RlKCk7XHJcbiAgICAgICAgY29uc3QgcXVhbnRpdHlDb250YWluZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2l0ZW1fX3F1YW50aXR5JyB9KS5nZXRub2RlKCk7XHJcbiAgICAgICAgY29uc3QgcXVhbnRpdHlDb3VudGVyID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgICAgICBjbGFzc05hbWU6ICdpdGVtX19xdWFudGl0eS1jb3VudGVyJyxcclxuICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuY291bnRlci50b1N0cmluZygpLFxyXG4gICAgICAgIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBjb25zdCBxdWFudGl0eUJ1dHRvbkxlc3MgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgICAgICB0YWc6ICdzcGFuJyxcclxuICAgICAgICAgIGNsYXNzTmFtZTogJ2l0ZW1fX3F1YW50aXR5LWJ1dHRvbiBpdGVtX19sZXNzJyxcclxuICAgICAgICAgIGNvbnRlbnQ6ICctJyxcclxuICAgICAgICB9KS5nZXRub2RlKCk7XHJcbiAgICAgICAgY29uc3QgcXVhbnRpdHlCdXR0b25Nb3JlID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgICAgICBjbGFzc05hbWU6ICdpdGVtX19xdWFudGl0eS1idXR0b24gaXRlbV9fbW9yZScsXHJcbiAgICAgICAgICBjb250ZW50OiAnKycsXHJcbiAgICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICAgIHF1YW50aXR5Q29udGFpbmVyLmFwcGVuZChxdWFudGl0eUJ1dHRvbkxlc3MsIHF1YW50aXR5Q291bnRlciwgcXVhbnRpdHlCdXR0b25Nb3JlKTtcclxuICAgICAgICBjb25zdCBwcmljZSA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgICAgIHRhZzogJ2RpdicsXHJcbiAgICAgICAgICBjbGFzc05hbWU6ICdpdGVtX19wcmljZScsXHJcbiAgICAgICAgICBjb250ZW50OiAnJCAnICsgZGF0YS5wcmljZSAqIGRhdGEuY291bnRlcixcclxuICAgICAgICB9KS5nZXRub2RlKCk7XHJcbiAgICAgICAgY2FydEl0ZW1Cb2R5LmFwcGVuZChwaG90b0Jsb2NrLCBkZXNjcmlwdGlvbiwgY2F0ZWdvcnksIHF1YW50aXR5Q29udGFpbmVyLCBwcmljZSk7XHJcbiAgICAgICAgY29uc3QgY2FydEl0ZW1kZWxldGUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2NhcnRfX2l0ZW0tZGVsZXRlJyB9KS5nZXRub2RlKCk7XHJcbiAgICAgICAgY29uc3QgaWNvbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNsYXNzTmFtZTogJ2NhcnRfX2Nyb3NzLWljb24nIH0pLmdldG5vZGUoKTtcclxuICAgICAgICBjYXJ0SXRlbWRlbGV0ZS5hcHBlbmQoaWNvbik7XHJcbiAgICAgICAgY2FydEl0ZW0uYXBwZW5kKGNhcnRJdGVtQm9keSwgY2FydEl0ZW1kZWxldGUpO1xyXG4gICAgICAgIGNhcnRJdGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhjb3VudGVyKVxyXG4gICAgICAgIGlmIChjb3VudGVyIDwgbGltaXQgKiBwYWdlICYmIGNvdW50ZXIgPiBsaW1pdCAqIHBhZ2UgLSBsaW1pdCAtIDEpIHtcclxuICAgICAgICAgIGNhcnRJdGVtLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvdW50ZXIgKz0gMTtcclxuICAgICAgICB0YWchLmFwcGVuZChjYXJ0SXRlbSk7XHJcblxyXG4gICAgICAgIHJvdXRlci5BZGRSb3V0aW5nVG9DYXJkKHBob3RvKTtcclxuICAgICAgICByb3V0ZXIuQWRkUm91dGluZ1RvQ2FyZChkZXNjcmlwdGlvblRpdGxlKTtcclxuXHJcbiAgICAgICAgcXVhbnRpdHlCdXR0b25Nb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKSEpO1xyXG4gICAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IGRhdGEuaWQpIHtcclxuICAgICAgICAgICAgICBpdGVtLmNvdW50ZXIgKz0gMTtcclxuICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvZHVjdHMnLCBKU09OLnN0cmluZ2lmeShQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UpKTtcclxuICAgICAgICAgICAgICBxdWFudGl0eUNvdW50ZXIudGV4dENvbnRlbnQgPSBpdGVtLmNvdW50ZXIudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgICAgICAgcHJpY2UudGV4dENvbnRlbnQgPSBgJCAke2l0ZW0ucHJpY2UgKiBpdGVtLmNvdW50ZXJ9YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnREYXRhKFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHF1YW50aXR5QnV0dG9uTGVzcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykhKTtcclxuICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmlkID09PSBpdGVtLmlkKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGl0ZW0uY291bnRlciA+IDEpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY291bnRlciAtPSAxO1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKSk7XHJcbiAgICAgICAgICAgICAgICBxdWFudGl0eUNvdW50ZXIudGV4dENvbnRlbnQgPSBpdGVtLmNvdW50ZXIudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHByaWNlLnRleHRDb250ZW50ID0gYCQgJHtpdGVtLnByaWNlICogaXRlbS5jb3VudGVyfWA7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY291bnRlciAtPSAxO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5mb3JFYWNoKChpdCwgaW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChpdC5pZCA9PT0gaXRlbS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaW5kO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKSk7XHJcbiAgICAgICAgICAgICAgICBjYXJ0SXRlbS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY291bnRlciA9IGl0ZW0uY291bnRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBpZiAoY291bnRlciA+PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGEoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGEoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKTtcclxuICAgICAgICAgICAgbmV3IEFwcGx5Um91dGluZygpLmluaXQoJyNiYXNrZXQnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2FydEl0ZW1kZWxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpISk7XHJcbiAgICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLmZvckVhY2goKGl0LCBpbmQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGl0LmlkID09PSBkYXRhLmlkKSB7XHJcbiAgICAgICAgICAgICAgaW5kZXggPSBpbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvZHVjdHMnLCBKU09OLnN0cmluZ2lmeShQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UpKTtcclxuICAgICAgICAgIGNhcnRJdGVtLnJlbW92ZSgpO1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50RGF0YShQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UpO1xyXG4gICAgICAgICAgbmV3IEFwcGx5Um91dGluZygpLmluaXQoJyNiYXNrZXQnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvL1Byb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5mb3JFYWNoKCk7XHJcbiAgICAvL3RoaXMuTGlzdE9mRGlzcGxheShsaW1pdCk7XHJcbiAgfVxyXG4gIGN1cnJlbnREYXRhKGRhdGE6IHByb2R1Y3RbXSkge1xyXG4gICAgbGV0IHNhbGUgPSAwO1xyXG4gICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmFsYXhvbicpICE9PSBudWxsKSB7XHJcbiAgICAgIHNhbGUgKz0gMC4xO1xyXG4gICAgfVxyXG4gICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZW5heWFhbWUnKSAhPT0gbnVsbCkge1xyXG4gICAgICBzYWxlICs9IDAuMTtcclxuICAgIH1cclxuICAgIGxldCBjb3VudGVyID0gMDtcclxuICAgIGxldCB0b3RhbHByaWNlID0gMDtcclxuICAgIGNvbnN0IGNvdW50ZXJCYXNrZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY291bnRlci1iYXNrZXQnKTtcclxuICAgIGNvbnN0IGFsbFByaWNlQmFza2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsbC1wcmljZS1iYXNrZXQnKTtcclxuICAgIGNvbnN0IHN1bW1hcnlUb3RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdW1tYXJ5LXRvdGFsJyk7XHJcbiAgICBjb25zdCBzdWJUb3RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJ0b3RhbC1wcmljZScpO1xyXG4gICAgY29uc3Qgc3VtbWFyeXByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1bW1hcnktcHJpY2UnKTtcclxuICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBjb3VudGVyICs9IGl0ZW0uY291bnRlcjtcclxuICAgICAgdG90YWxwcmljZSArPSBpdGVtLmNvdW50ZXIgKiBpdGVtLnByaWNlO1xyXG4gICAgfSk7XHJcbiAgICBjb3VudGVyQmFza2V0IS50ZXh0Q29udGVudCA9IGNvdW50ZXIudG9TdHJpbmcoKTtcclxuICAgIGFsbFByaWNlQmFza2V0IS50ZXh0Q29udGVudCA9ICckICcgKyB0b3RhbHByaWNlLnRvU3RyaW5nKCk7XHJcbiAgICBpZiAoc2FsZSA9PT0gMCkge1xyXG4gICAgICBzdWJUb3RhbCEudGV4dENvbnRlbnQgPSAnJCAnICsgdG90YWxwcmljZS50b1N0cmluZygpO1xyXG4gICAgICBzdW1tYXJ5VG90YWwhLnRleHRDb250ZW50ID0gJyQgJyArICh0b3RhbHByaWNlICsgMjApLnRvU3RyaW5nKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdWJUb3RhbCEudGV4dENvbnRlbnQgPSAnJCAnICsgdG90YWxwcmljZTtcclxuICAgICAgc3VtbWFyeXByaWNlIS50ZXh0Q29udGVudCA9ICckICcgKyAodG90YWxwcmljZSAtIHRvdGFscHJpY2UgKiBzYWxlKTtcclxuICAgICAgc3VtbWFyeVRvdGFsIS50ZXh0Q29udGVudCA9ICckICcgKyAodG90YWxwcmljZSAtIHRvdGFscHJpY2UgKiBzYWxlICsgMjApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gTGlzdE9mRGlzcGxheShsaW1pdDogbnVtYmVyKSB7XHJcbiAgLy8gICBsZXQgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlOiBwcm9kdWN0W10gPSBbXTtcclxuICAvLyAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykhKTtcclxuICAvLyAgIGNvbnN0IHBhZ2VzID0gTWF0aC5jZWlsKFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5sZW5ndGggLyBsaW1pdCk7XHJcbiAgLy8gICBsZXQgYXJyID0gbmV3IEFycmF5KCk7XHJcbiAgLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZ2VzOyBpKyspIHtcclxuICAvLyAgICAgYXJyLnB1c2gobmV3IEFycmF5KCkpO1xyXG4gIC8vICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UuZm9yRWFjaCgoaXRlbSwgaW5kKSA9PiB7XHJcbiAgLy8gICAgICAgYXJyW2ldLnB1c2goaXRlbSk7XHJcbiAgLy8gICAgICAgaWYgKGluZCA9IHBhZ2VzKSB7XHJcbiAgLy8gICAgICAgfVxyXG4gIC8vICAgICB9KTtcclxuICAvLyAgIH1cclxuICAvLyAgIGNvbnNvbGUubG9nKGFyciEpXHJcbiAgLy8gfVxyXG59XHJcbiIsImltcG9ydCB7IENyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi9FbGVtZW50cy9DcmVhdGVFbGVtZW50JztcclxuaW1wb3J0IHsgQ3JlYXRlUmFuZ2UgfSBmcm9tICcuLi9FbGVtZW50cy9DcmVhdGVSYW5nZSc7XHJcbmltcG9ydCB7IENvbnN0cnVjdG9yUmFuZ2VCbG9jayB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENyZWF0ZVJhbmdlQmxvY2sgZXh0ZW5kcyBDcmVhdGVFbGVtZW50IHtcclxuICBwcml2YXRlIHRpdGxlOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIG51bXM6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgZnJvbTogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSB0bzogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByYW5nZUJsb2NrOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIHJhbmdlTGluZTogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByYW5nZTE6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByYW5nZTI6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHtcclxuICAgIHRpdGxlLFxyXG4gICAgZnJvbSxcclxuICAgIHRvLFxyXG4gICAgcmFuZ2UxTWluLFxyXG4gICAgcmFuZ2UxTWF4LFxyXG4gICAgcmFuZ2UxVmFsdWUsXHJcbiAgICByYW5nZTJNaW4sXHJcbiAgICByYW5nZTJNYXgsXHJcbiAgICByYW5nZTJWYWx1ZSxcclxuICAgIGlzUHJpY2UsXHJcbiAgICBpZCxcclxuICAgIHJvdXRlcixcclxuICAgIGN1cnJlbnQsXHJcbiAgfTogQ29uc3RydWN0b3JSYW5nZUJsb2NrKSB7XHJcbiAgICBzdXBlcih7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2FzaWRlX19yYW5nZSByYW5nZS1tZW51JyB9KTtcclxuICAgIHRoaXMudGl0bGUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2gyJywgY2xhc3NOYW1lOiAncmFuZ2UtbWVudV9fdGl0bGUnLCBjb250ZW50OiB0aXRsZSB9KS5nZXRub2RlKCk7XHJcbiAgICB0aGlzLm51bXMgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3JhbmdlLW1lbnVfX251bWJlcnMnIH0pLmdldG5vZGUoKTtcclxuICAgIHRoaXMuZnJvbSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNsYXNzTmFtZTogJ3JhbmdlLW1lbnVfX2Zyb20nLCBjb250ZW50OiBmcm9tIH0pLmdldG5vZGUoKTtcclxuICAgIHRoaXMudG8gPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBjbGFzc05hbWU6ICdyYW5nZS1tZW51X190bycsIGNvbnRlbnQ6IHRvIH0pLmdldG5vZGUoKTtcclxuICAgIHRoaXMubnVtcy5hcHBlbmQodGhpcy5mcm9tLCB0aGlzLnRvKTtcclxuICAgIHRoaXMucmFuZ2VCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAncmFuZ2UtbWVudV9fcmFuZ2UnIH0pLmdldG5vZGUoKTtcclxuICAgIHRoaXMucmFuZ2VMaW5lID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdyYW5nZS1tZW51X190cmFja2VyJyB9KS5nZXRub2RlKCk7XHJcbiAgICBpZiAocmFuZ2UxVmFsdWUgPT09ICcxNicpIHtcclxuICAgICAgcmFuZ2UxVmFsdWUgPSBjdXJyZW50IS5taW4hO1xyXG4gICAgfVxyXG4gICAgaWYgKHJhbmdlMlZhbHVlID09PSAnMTU1OScpIHtcclxuICAgICAgcmFuZ2UyVmFsdWUgPSBjdXJyZW50IS5tYXghO1xyXG4gICAgfVxyXG4gICAgaWYgKHJhbmdlMVZhbHVlID09PSAnMjAxMycpIHtcclxuICAgICAgcmFuZ2UxVmFsdWUgPSBjdXJyZW50IS5taW4hO1xyXG4gICAgfVxyXG4gICAgaWYgKHJhbmdlMlZhbHVlID09PSAnMjAyMicpIHtcclxuICAgICAgcmFuZ2UyVmFsdWUgPSBjdXJyZW50IS5tYXghO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yYW5nZTEgPSBuZXcgQ3JlYXRlUmFuZ2Uoe1xyXG4gICAgICB0eXBlOiAncmFuZ2UnLFxyXG4gICAgICBtaW46IHJhbmdlMU1pbixcclxuICAgICAgbWF4OiByYW5nZTFNYXgsXHJcbiAgICAgIHZhbHVlOiByYW5nZTFWYWx1ZSxcclxuICAgICAgaWQ6IGAke2lkfS0xYCxcclxuICAgICAgY2xhc3NOYW1lOiAncmFuZ2UtbWVudV9fc2xpZGVyJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIC8vY29uc29sZS5sb2coJ0NSQicpO1xyXG4gICAgdGhpcy5yYW5nZTIgPSBuZXcgQ3JlYXRlUmFuZ2Uoe1xyXG4gICAgICB0eXBlOiAncmFuZ2UnLFxyXG4gICAgICBtaW46IHJhbmdlMk1pbixcclxuICAgICAgbWF4OiByYW5nZTJNYXgsXHJcbiAgICAgIHZhbHVlOiByYW5nZTJWYWx1ZSxcclxuICAgICAgaWQ6IGAke2lkfS0yYCxcclxuICAgICAgY2xhc3NOYW1lOiAncmFuZ2UtbWVudV9fc2xpZGVyJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIHRoaXMucmFuZ2VCbG9jay5hcHBlbmQodGhpcy5yYW5nZUxpbmUsIHRoaXMucmFuZ2UxLCB0aGlzLnJhbmdlMik7XHJcbiAgICB0aGlzLmVsLmFwcGVuZCh0aGlzLnRpdGxlLCB0aGlzLm51bXMsIHRoaXMucmFuZ2VCbG9jayk7XHJcbiAgICBpZiAoaXNQcmljZSkge1xyXG4gICAgICB0aGlzLmZyb20udGV4dENvbnRlbnQgPSAnJCAnICsgdGhpcy5yYW5nZTEudmFsdWU7XHJcbiAgICAgIHRoaXMudG8udGV4dENvbnRlbnQgPSAnJCAnICsgdGhpcy5yYW5nZTIudmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZyb20udGV4dENvbnRlbnQgPSB0aGlzLnJhbmdlMS52YWx1ZTtcclxuICAgICAgdGhpcy50by50ZXh0Q29udGVudCA9IHRoaXMucmFuZ2UyLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyDRhNGD0L3QutGG0LjQvtC90LDQuyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgY29uc3QgZGlzID0gK3RoaXMucmFuZ2UxLm1heCAtICt0aGlzLnJhbmdlMS5taW47XHJcbiAgICBjb25zdCBzdGVwID0gMTAwIC8gKCt0aGlzLnJhbmdlMS5tYXggLSArdGhpcy5yYW5nZTEubWluKTtcclxuICAgIGNvbnN0IHBlcmNlbnQxID0gKGRpcyAtICgrdGhpcy5yYW5nZTEubWF4IC0gK3RoaXMucmFuZ2UxLnZhbHVlKSkgKiBzdGVwO1xyXG4gICAgY29uc3QgcGVyY2VudDIgPSAoZGlzIC0gKCt0aGlzLnJhbmdlMS5tYXggLSArdGhpcy5yYW5nZTIudmFsdWUpKSAqIHN0ZXA7XHJcbiAgICB0aGlzLnJhbmdlTGluZS5zdHlsZS5iYWNrZ3JvdW5kID0gYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSgxMDUsIDAsIDMxLCAwLjA4KSAke3BlcmNlbnQxfSUgLCAjNjkwMDFGICR7cGVyY2VudDF9JSAsICM2OTAwMUYgJHtwZXJjZW50Mn0lLCByZ2JhKDEwNSwgMCwgMzEsIDAuMDgpICR7cGVyY2VudDJ9JSlgO1xyXG5cclxuICAgIC8vY29uc29sZS5sb2codGhpcy5yYW5nZTEudmFsdWUpO1xyXG4gICAgdGhpcy5yYW5nZTEuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XHJcbiAgICAgIC8vY29uc29sZS5sb2codGhpcy5yYW5nZTEudmFsdWUpO1xyXG4gICAgICBpZiAocGFyc2VJbnQodGhpcy5yYW5nZTIudmFsdWUpIC0gcGFyc2VJbnQodGhpcy5yYW5nZTEudmFsdWUpIDw9IDApIHtcclxuICAgICAgICB0aGlzLnJhbmdlMS52YWx1ZSA9IFN0cmluZyhwYXJzZUludCh0aGlzLnJhbmdlMi52YWx1ZSkgLSAwKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNQcmljZSkge1xyXG4gICAgICAgIHRoaXMuZnJvbS50ZXh0Q29udGVudCA9ICckICcgKyB0aGlzLnJhbmdlMS52YWx1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZyb20udGV4dENvbnRlbnQgPSB0aGlzLnJhbmdlMS52YWx1ZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBkaXMgPSArdGhpcy5yYW5nZTEubWF4IC0gK3RoaXMucmFuZ2UxLm1pbjtcclxuICAgICAgY29uc3Qgc3RlcCA9IDEwMCAvICgrdGhpcy5yYW5nZTEubWF4IC0gK3RoaXMucmFuZ2UxLm1pbik7XHJcbiAgICAgIGNvbnN0IHBlcmNlbnQxID0gKGRpcyAtICgrdGhpcy5yYW5nZTEubWF4IC0gK3RoaXMucmFuZ2UxLnZhbHVlKSkgKiBzdGVwO1xyXG4gICAgICBjb25zdCBwZXJjZW50MiA9IChkaXMgLSAoK3RoaXMucmFuZ2UxLm1heCAtICt0aGlzLnJhbmdlMi52YWx1ZSkpICogc3RlcDtcclxuICAgICAgdGhpcy5yYW5nZUxpbmUuc3R5bGUuYmFja2dyb3VuZCA9IGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJnYmEoMTA1LCAwLCAzMSwgMC4wOCkgJHtwZXJjZW50MX0lICwgIzY5MDAxRiAke3BlcmNlbnQxfSUgLCAjNjkwMDFGICR7cGVyY2VudDJ9JSwgcmdiYSgxMDUsIDAsIDMxLCAwLjA4KSAke3BlcmNlbnQyfSUpYDtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yYW5nZTEuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgaWYgKGlkID09PSAncHJpY2Utc2xpZGVyJykge1xyXG4gICAgICAgIHJvdXRlciEuQWRkUm91dGluZ1RvUHJpY2VNaW4odGhpcy5yYW5nZTEudmFsdWUpO1xyXG4gICAgICAgIHJvdXRlciEuQWRkUm91dGluZ1RvUHJpY2VNYXgodGhpcy5yYW5nZTIudmFsdWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJvdXRlciEuQWRkUm91dGluZ1RvWWVhck1pbih0aGlzLnJhbmdlMS52YWx1ZSk7XHJcbiAgICAgICAgcm91dGVyIS5BZGRSb3V0aW5nVG9ZZWFyTWF4KHRoaXMucmFuZ2UyLnZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJhbmdlMi5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcclxuICAgICAgaWYgKHBhcnNlSW50KHRoaXMucmFuZ2UyLnZhbHVlKSAtIHBhcnNlSW50KHRoaXMucmFuZ2UxLnZhbHVlKSA8PSAwKSB7XHJcbiAgICAgICAgdGhpcy5yYW5nZTIudmFsdWUgPSBTdHJpbmcocGFyc2VJbnQodGhpcy5yYW5nZTEudmFsdWUpICsgMCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzUHJpY2UpIHtcclxuICAgICAgICB0aGlzLnRvLnRleHRDb250ZW50ID0gJyQgJyArIHRoaXMucmFuZ2UyLnZhbHVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudG8udGV4dENvbnRlbnQgPSB0aGlzLnJhbmdlMi52YWx1ZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBkaXMgPSArdGhpcy5yYW5nZTEubWF4IC0gK3RoaXMucmFuZ2UxLm1pbjtcclxuICAgICAgY29uc3Qgc3RlcCA9IDEwMCAvICgrdGhpcy5yYW5nZTEubWF4IC0gK3RoaXMucmFuZ2UxLm1pbik7XHJcbiAgICAgIGNvbnN0IHBlcmNlbnQxID0gKGRpcyAtICgrdGhpcy5yYW5nZTEubWF4IC0gK3RoaXMucmFuZ2UxLnZhbHVlKSkgKiBzdGVwO1xyXG4gICAgICBjb25zdCBwZXJjZW50MiA9IChkaXMgLSAoK3RoaXMucmFuZ2UxLm1heCAtICt0aGlzLnJhbmdlMi52YWx1ZSkpICogc3RlcDtcclxuICAgICAgdGhpcy5yYW5nZUxpbmUuc3R5bGUuYmFja2dyb3VuZCA9IGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJnYmEoMTA1LCAwLCAzMSwgMC4wOCkgJHtwZXJjZW50MX0lICwgIzY5MDAxRiAke3BlcmNlbnQxfSUgLCAjNjkwMDFGICR7cGVyY2VudDJ9JSwgcmdiYSgxMDUsIDAsIDMxLCAwLjA4KSAke3BlcmNlbnQyfSUpYDtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yYW5nZTIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgaWYgKGlkID09PSAncHJpY2Utc2xpZGVyJykge1xyXG4gICAgICAgIHJvdXRlciEuQWRkUm91dGluZ1RvUHJpY2VNaW4odGhpcy5yYW5nZTEudmFsdWUpO1xyXG4gICAgICAgIHJvdXRlciEuQWRkUm91dGluZ1RvUHJpY2VNYXgodGhpcy5yYW5nZTIudmFsdWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJvdXRlciEuQWRkUm91dGluZ1RvWWVhck1pbih0aGlzLnJhbmdlMS52YWx1ZSk7XHJcbiAgICAgICAgcm91dGVyIS5BZGRSb3V0aW5nVG9ZZWFyTWF4KHRoaXMucmFuZ2UyLnZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi9FbGVtZW50cy9DcmVhdGVFbGVtZW50JztcclxuaW1wb3J0IHsgQ3JlYXRlSW1hZ2UgfSBmcm9tICcuLi9FbGVtZW50cy9DcmVhdGVJbWFnZSc7XHJcbmltcG9ydCB7IENyZWF0ZVRleHRJbnB1dCB9IGZyb20gJy4uL0VsZW1lbnRzL0NyZWF0ZVRleHRJbnB1dCc7XHJcbmltcG9ydCB7IENvbnN0cnVjdG9yRWxlbWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENyZWF0ZVNlYXJjaEJhciBleHRlbmRzIENyZWF0ZUVsZW1lbnQge1xyXG4gIHByaXZhdGUgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBidXR0b246IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgaWNvbjogSFRNTEltYWdlRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoeyByb3V0ZXIsIGZpbHRlciB9OiBDb25zdHJ1Y3RvckVsZW1lbnQpIHtcclxuICAgIHN1cGVyKHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc2VhcmNoJyB9KTtcclxuICAgIHRoaXMuaW5wdXQgPSBuZXcgQ3JlYXRlVGV4dElucHV0KHtcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBwbGFjZWhvbGRlcjogJ1NlYXJjaCBwcm9kdWN0JyxcclxuICAgICAgbmFtZTogJ3NlYXJjaCcsXHJcbiAgICAgIGNsYXNzTmFtZTogJ3NlYXJjaF9fdGV4dCcsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICB0aGlzLmJ1dHRvbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnYnV0dG9uJywgY2xhc3NOYW1lOiAnc2VhcmNoX19idXR0b24nIH0pLmdldG5vZGUoKTtcclxuICAgIHRoaXMuaWNvbiA9IG5ldyBDcmVhdGVJbWFnZSh7XHJcbiAgICAgIHNyYzogJy4vYXNzZXRzL2ltYWdlcy9zZWFyY2gucG5nJyxcclxuICAgICAgYWx0OiAnc2VhcmNoJyxcclxuICAgICAgY2xhc3NOYW1lOiAnc2VhcmNoX19pY29uJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIHRoaXMuaW5wdXQudmFsdWUgPSBmaWx0ZXIhO1xyXG4gICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIC8vY29uc29sZS5sb2cocm91dGVyKTtcclxuICAgICAgaWYgKHJvdXRlcikge1xyXG4gICAgICAgIHJvdXRlci5BZGRSb3V0aW5nVG9TZWFyY2godGhpcy5pbnB1dC52YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5idXR0b24uYXBwZW5kKHRoaXMuaWNvbik7XHJcbiAgICB0aGlzLmVsLmFwcGVuZCh0aGlzLmlucHV0LCB0aGlzLmJ1dHRvbik7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi9FbGVtZW50cy9DcmVhdGVFbGVtZW50JztcclxuaW1wb3J0IHsgQ3JlYXRlUmFkaW8gfSBmcm9tICcuLi9FbGVtZW50cy9DcmVhdGVSYWRpbyc7XHJcbmltcG9ydCB7IENvbnN0cnVjdG9yU29ydE1lbnUgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDcmVhdGVTb3J0TWVudSBleHRlbmRzIENyZWF0ZUVsZW1lbnQge1xyXG4gIHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIG9wdGlvbnM6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgc2VsZWN0ZWQ6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgc29ydG1lbnU6IHN0cmluZ1tdW107XHJcbiAgcHJpdmF0ZSBvcHRpb24hOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIGlucHV0ITogW0hUTUxJbnB1dEVsZW1lbnQsIEhUTUxMYWJlbEVsZW1lbnRdO1xyXG4gIGNvbnN0cnVjdG9yKHsgcm91dGVyLCBmaWx0ZXIgfTogQ29uc3RydWN0b3JTb3J0TWVudSkge1xyXG4gICAgc3VwZXIoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzb3J0LW1lbnUnIH0pO1xyXG4gICAgdGhpcy5zb3J0bWVudSA9IFtcclxuICAgICAgWydSYXRpbmcnLCAnUmF0aW5nJ10sXHJcbiAgICAgIFsnUHJpY2VUSCcsICdQcmljZSAobG93IHRvIGhpZ2gpJ10sXHJcbiAgICAgIFsnUHJpY2VUTCcsICdQcmljZSAoaGlnaCB0byBsb3cpJ10sXHJcbiAgICAgIFsnUkQnLCAnUmVsZWFzZSBEYXRlJ10sXHJcbiAgICBdO1xyXG4gICAgdGhpcy5zb3J0bWVudS5mb3JFYWNoKChpdCkgPT4ge1xyXG4gICAgICBpZiAoZmlsdGVyID09PSBpdFswXSkge1xyXG4gICAgICAgIGZpbHRlciA9IGl0WzFdO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuY29udGFpbmVyID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzZWxlY3QtYm94JyB9KS5nZXRub2RlKCk7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ29wdGlvbnMtY29udGFpbmVyJyB9KS5nZXRub2RlKCk7XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzZWxlY3RlZCcsIGlkOiAnc2VsZWN0ZWQnLCBjb250ZW50OiBmaWx0ZXIgfSkuZ2V0bm9kZSgpO1xyXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kKHRoaXMub3B0aW9ucywgdGhpcy5zZWxlY3RlZCk7XHJcbiAgICB0aGlzLnNvcnRtZW51LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgdGhpcy5vcHRpb24gPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ29wdGlvbicgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICB0aGlzLmlucHV0ID0gbmV3IENyZWF0ZVJhZGlvKHtcclxuICAgICAgICB0eXBlOiAncmFkaW8nLFxyXG4gICAgICAgIGNsYXNzTmFtZTogJ3JhZGlvJyxcclxuICAgICAgICBpZDogaXRlbVswXSxcclxuICAgICAgICBuYW1lOiAnc29ydCcsXHJcbiAgICAgICAgdmFsdWU6IGl0ZW1bMV0sXHJcbiAgICAgIH0pLmdldG5vZGUoKTtcclxuICAgICAgdGhpcy5vcHRpb24uYXBwZW5kKHRoaXMuaW5wdXRbMF0sIHRoaXMuaW5wdXRbMV0pO1xyXG4gICAgICB0aGlzLm9wdGlvbnMuYXBwZW5kKHRoaXMub3B0aW9uKTtcclxuICAgICAgdGhpcy5pbnB1dFswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBpZiAocm91dGVyKSB7XHJcbiAgICAgICAgICByb3V0ZXIuQWRkUm91dGluZ1RvU29ydChpdGVtWzBdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLnNlbGVjdGVkLmlubmVySFRNTCA9IGl0ZW1bMV07XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5lbC5hcHBlbmQodGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy5zZWxlY3RlZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdGhpcy5vcHRpb25zIS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDcmVhdGVFbGVtZW50IH0gZnJvbSAnLi9FbGVtZW50cy9DcmVhdGVFbGVtZW50JztcclxuaW1wb3J0IHsgcHJvZHVjdCB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XHJcbmltcG9ydCBDcmVhdGVSb3V0ZSBmcm9tICcuL3JvdXRlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDcmVhdGVMaXN0T2ZDYXJkcyB7XHJcbiAgY29uc3RydWN0b3IoU29ydERhdGE6IHByb2R1Y3RbXSkge1xyXG4gICAgY29uc3Qgcm91dGVyID0gbmV3IENyZWF0ZVJvdXRlKCk7XHJcbiAgICBTb3J0RGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IENhcmRCb3ggPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgICAgdGFnOiAnZGl2JyxcclxuICAgICAgICBjbGFzc05hbWU6ICdjYXJkX19ib3gnLFxyXG4gICAgICAgIGlkOiBgY2FyZC0ke2l0ZW0uaWQudG9TdHJpbmcoKX1gLFxyXG4gICAgICAgIEJhY2tncm91bmRJbWc6IGl0ZW0uaW1hZ2VzWzBdLFxyXG4gICAgICB9KS5nZXRub2RlKCk7XHJcbiAgICAgIHJvdXRlci5BZGRSb3V0aW5nVG9DYXJkKENhcmRCb3gpO1xyXG4gICAgICBjb25zdCBDYXJkTW9kZWwgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2gyJywgY2xhc3NOYW1lOiAnY2FyZF9fbW9kZWwnLCBjb250ZW50OiBpdGVtLm1vZGVsIH0pLmdldG5vZGUoKTtcclxuICAgICAgY29uc3QgQ2FyZFByaWNlID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICAgIHRhZzogJ2gyJyxcclxuICAgICAgICBjbGFzc05hbWU6ICdjYXJkX19wcmljZScsXHJcbiAgICAgICAgY29udGVudDogYCR7aXRlbS5wcmljZS50b1N0cmluZygpfSAkYCxcclxuICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBjb25zdCBDYXJkQWRkdG9DYXJ0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdjYXJkX19hZGQtdG8tY2FydCcgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICBDYXJkQm94LmFwcGVuZChDYXJkTW9kZWwsIENhcmRQcmljZSwgQ2FyZEFkZHRvQ2FydCk7XHJcbiAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnN0IGNhcmRzOiBwcm9kdWN0W10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpISk7XHJcbiAgICAgICAgY2FyZHMuZm9yRWFjaCgoaXQpID0+IHtcclxuICAgICAgICAgIGlmIChpdC5pZCA9PT0gaXRlbS5pZCkge1xyXG4gICAgICAgICAgICBDYXJkQWRkdG9DYXJ0LmNsYXNzTGlzdC50b2dnbGUoJ19wcm9kdWN0LWFkZGVkJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3JlX19wcm9kdWN0cycpIS5hcHBlbmQoQ2FyZEJveCk7XHJcbiAgICAgIENhcmRBZGR0b0NhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgLy9Qcm9kdWN0c1RvTG9jYWxTdG9yYWdlLnB1c2goaXRlbSk7XHJcbiAgICAgICAgbGV0IHRvdGFscHJpY2UgPSAwO1xyXG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuICAgICAgICBsZXQgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlOiBwcm9kdWN0W10gPSBbXTtcclxuICAgICAgICBpZiAoQ2FyZEFkZHRvQ2FydC5jbGFzc0xpc3QuY29udGFpbnMoJ19wcm9kdWN0LWFkZGVkJykpIHtcclxuICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykhKTtcclxuICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UuZm9yRWFjaCgoaXQsIGluZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXQuaWQgPT09IGl0ZW0uaWQpIHtcclxuICAgICAgICAgICAgICBpbmRleCA9IGluZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2Uuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0cycsIEpTT04uc3RyaW5naWZ5KFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKSEpO1xyXG4gICAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENhcmRBZGR0b0NhcnQuY2xhc3NMaXN0LnRvZ2dsZSgnX3Byb2R1Y3QtYWRkZWQnKTtcclxuICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UuZm9yRWFjaCgoaXQpID0+IHtcclxuICAgICAgICAgIGNvdW50ZXIgKz0gaXQuY291bnRlcjtcclxuICAgICAgICAgIHRvdGFscHJpY2UgKz0gaXQuY291bnRlciAqIGl0LnByaWNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGNhcnRRdWFudGl0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudGVyLWJhc2tldCcpO1xyXG4gICAgICAgIGNvbnN0IEFsbFByaWNlQmFza2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsbC1wcmljZS1iYXNrZXQnKTtcclxuICAgICAgICBjb25zdCBiYXNrZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFza2V0LWltZycpO1xyXG4gICAgICAgIGlmIChjb3VudGVyICE9PSAwKSB7XHJcbiAgICAgICAgICBsZXQgY2MgPSAwO1xyXG4gICAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLmZvckVhY2goKGl0ZW0pID0+IChjYyArPSBpdGVtLmNvdW50ZXIpKTtcclxuICAgICAgICAgIGNhcnRRdWFudGl0eSEudGV4dENvbnRlbnQgPSBjYy50b1N0cmluZygpO1xyXG4gICAgICAgICAgY2FydFF1YW50aXR5IS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG4gICAgICAgICAgY2FydFF1YW50aXR5IS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgQWxsUHJpY2VCYXNrZXQhLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgYmFza2V0IS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgQWxsUHJpY2VCYXNrZXQhLnRleHRDb250ZW50ID0gJyQgJyArIHRvdGFscHJpY2UudG9TdHJpbmcoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2FydFF1YW50aXR5IS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgICBjYXJ0UXVhbnRpdHkhLnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICAgICAgICBBbGxQcmljZUJhc2tldCEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgIGJhc2tldCEuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vbG9jYWxTdG9yYWdlLnNldEl0ZW0oJycpXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3JlX19vcHRpb25CbG9jazEnKSEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldzEnKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkKSB7XHJcbiAgICAgICAgICBpZiAoQ2FyZEJveC5jbGFzc0xpc3QuY29udGFpbnMoJ19zbWFsbC12aWV3JykpIHtcclxuICAgICAgICAgICAgQ2FyZEJveC5jbGFzc0xpc3QucmVtb3ZlKCdfc21hbGwtdmlldycpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RvcmVfX29wdGlvbkJsb2NrMicpIS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBpZiAoKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3MicpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQpIHtcclxuICAgICAgICAgIENhcmRCb3guY2xhc3NMaXN0LmFkZCgnX3NtYWxsLXZpZXcnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAgIElNUE9SVFMgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbmltcG9ydCB7IENyZWF0ZVJhbmdlQmxvY2sgfSBmcm9tICcuL0NvbXBvbmVudHMvQ3JlYXRlUmFuZ2VCbG9jayc7XHJcbmltcG9ydCB7IENyZWF0ZVNvcnRNZW51IH0gZnJvbSAnLi9Db21wb25lbnRzL0NyZWF0ZVNvcnRNZW51JztcclxuaW1wb3J0IHsgQ3JlYXRlQ2hlY2tib3ggfSBmcm9tICcuL0VsZW1lbnRzL0NyZWF0ZUNoZWNrYm94JztcclxuaW1wb3J0IHsgQ3JlYXRlRWxlbWVudCB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlRWxlbWVudCc7XHJcbmltcG9ydCB7IENyZWF0ZUltYWdlIH0gZnJvbSAnLi9FbGVtZW50cy9DcmVhdGVJbWFnZSc7XHJcbmltcG9ydCBkYXRhIGZyb20gJy4vZGF0YSc7XHJcbmltcG9ydCBDcmVhdGVSb3V0ZSBmcm9tICcuL3JvdXRlJztcclxuaW1wb3J0IHsgQ3JlYXRlU2VhcmNoQmFyIH0gZnJvbSAnLi9Db21wb25lbnRzL0NyZWF0ZVNlYXJjaEJhcic7XHJcbmltcG9ydCB7IGZpbHRlcnMsIHByb2R1Y3QgfSBmcm9tICcuL0ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBDcmVhdGVSYWRpbyB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlUmFkaW8nO1xyXG5pbXBvcnQgeyBDcmVhdGVMaW5rIH0gZnJvbSAnLi9FbGVtZW50cy9DcmVhdGVMaW5rJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDcmVhdGVEZWZhdWx0UGFnZSB7XHJcbiAgLy8g0L/QtdGA0LXQvNC10L3QvdCw0Y8g0LrQvtGC0L7RgNCw0Y8g0YXRgNCw0L3QuNGCIGJvZHlcclxuICBwcml2YXRlIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG4gIC8vINCg0L7Rg9GC0LXRgFxyXG4gIHByaXZhdGUgcm91dGVyID0gbmV3IENyZWF0ZVJvdXRlKCk7XHJcbiAgLy8g0LzQtdGC0L7QtCDRgdC+0LfQtNCw0LXRgiBoZWFkZXJcclxuICBDcmVhdGVIZWFkZXIoKSB7XHJcbiAgICAvLyDRgdC+0LfQtNCw0LXQvCBoZWFkZXIsINC/0LXRgNC10LTQsNC10Lwg0LIg0LrQvtC90YHRgtGA0YPQutGC0L7RgCDQvdC1INCy0YHQtSDQstC+0LfQvNC+0LbQvdGL0LUg0LDRgNCz0YPQvNC10L3RgtGLLCDQvdC+INC+0L0g0L3QtSDRgNGD0LPQsNC10YLRgdGPXHJcbiAgICBjb25zdCBoZWFkZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2hlYWRlcicsIGNsYXNzTmFtZTogJ2hlYWRlcicgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3Qgd3JhcHBlciA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnd3JhcHBlciBoZWFkZXJfX3dyYXBwZXInIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHRleHRCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnaGVhZGVyX190ZXh0JyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBjYXJ0QmxvY2sgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2hlYWRlcl9fY2FydCcgfSkuZ2V0bm9kZSgpO1xyXG4gICAgdGhpcy5ib2R5LmFwcGVuZChoZWFkZXIpO1xyXG4gICAgaGVhZGVyLmFwcGVuZCh3cmFwcGVyKTtcclxuICAgIHdyYXBwZXIuYXBwZW5kKHRleHRCbG9jaywgY2FydEJsb2NrKTtcclxuICAgIGNvbnN0IGgxID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdoMScsIGNsYXNzTmFtZTogJ2gxJywgY29udGVudDogJ09ubGluZSBTdG9yZScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgdGhpcy5yb3V0ZXIuQWRkUm91dGluZ1RvSGVhZGVyKGgxKTtcclxuICAgIGNvbnN0IHN1YnRpdGxlID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICB0YWc6ICdzcGFuJyxcclxuICAgICAgY2xhc3NOYW1lOiAnaGVhZGVyX19zdWJ0aXRsZScsXHJcbiAgICAgIGNvbnRlbnQ6ICdiZXN0IHByb2R1Y3RzLCBiZXN0IHNhbGVzLCBiZXN0IHNlcnZpY2UnLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgdGV4dEJsb2NrLmFwcGVuZChoMSwgc3VidGl0bGUpO1xyXG4gICAgY29uc3QgY2FydCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnY2FydCcsIGlkOiAnYmFza2V0JyB9KS5nZXRub2RlKCk7XHJcbiAgICB0aGlzLnJvdXRlci5BZGRSb3V0aW5nVG9CYXNrZXQoY2FydCk7XHJcbiAgICBjYXJ0QmxvY2suYXBwZW5kKGNhcnQpO1xyXG4gICAgY29uc3QgY2FydEljb24gPSBuZXcgQ3JlYXRlSW1hZ2Uoe1xyXG4gICAgICBzcmM6ICcuL2Fzc2V0cy9pbWFnZXMvY2FydC5zdmcnLFxyXG4gICAgICBjbGFzc05hbWU6ICdjYXJ0X19pY29uJyxcclxuICAgICAgYWx0OiAnY2FydCBpY29uJyxcclxuICAgICAgaWQ6ICdiYXNrZXQtaW1nJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGNhcnRUb3RhbCA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ2NhcnRfX3RvdGFsJyxcclxuICAgICAgaWQ6ICdhbGwtcHJpY2UtYmFza2V0JyxcclxuICAgICAgY29udGVudDogJzEwMDAwJCcsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBjYXJ0UXVhbnRpdHkgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgIHRhZzogJ3NwYW4nLFxyXG4gICAgICBjbGFzc05hbWU6ICdjYXJ0X19xdWFudGl0eScsXHJcbiAgICAgIGlkOiAnY291bnRlci1iYXNrZXQnLFxyXG4gICAgICBjb250ZW50OiAnMScsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykgIT09IG51bGwpIHtcclxuICAgICAgY29uc3QgRGF0YUZyb21Mb2NhbDogcHJvZHVjdFtdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKSEpO1xyXG4gICAgICBpZiAoRGF0YUZyb21Mb2NhbC5sZW5ndGggIT09IDApIHtcclxuICAgICAgICBsZXQgY2MgPSAwO1xyXG4gICAgICAgIGxldCB0b3RhbHByaWNlID0gMDtcclxuICAgICAgICBEYXRhRnJvbUxvY2FsLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgIGNjICs9IGl0ZW0uY291bnRlcjtcclxuICAgICAgICAgIHRvdGFscHJpY2UgKz0gaXRlbS5wcmljZSAqIGl0ZW0uY291bnRlcjtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjYXJ0UXVhbnRpdHkudGV4dENvbnRlbnQgPSBjYy50b1N0cmluZygpO1xyXG4gICAgICAgIGNhcnRRdWFudGl0eS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG4gICAgICAgIGNhcnRRdWFudGl0eS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgIGNhcnRUb3RhbC50ZXh0Q29udGVudCA9ICckICcgKyB0b3RhbHByaWNlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY2FydFRvdGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGNhcnRJY29uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgLy9jYXJ0UXVhbnRpdHkuY2xhc3NMaXN0LmFkZCgnY2FydF9fcXVhbnRpdHlfdmlzaWJsZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXJ0LmFwcGVuZChjYXJ0SWNvbiwgY2FydFRvdGFsLCBjYXJ0UXVhbnRpdHkpO1xyXG4gIH1cclxuICAvLyDQvNC10YLQvtC0INC00LvRjyBtYWluXHJcbiAgQ3JlYXRlTWFpbihmaWx0ZXJzOiBmaWx0ZXJzLCBQcm9kdWN0c0NhcmRzOiBwcm9kdWN0W10pIHtcclxuICAgIHRoaXMucm91dGVyLkdldEZpbHRlcnMoZmlsdGVycyk7XHJcbiAgICBjb25zdCBwcm9kdWN0ID0gbmV3IGRhdGEoKTtcclxuICAgIGNvbnN0IG1haW4gPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ21haW4nLCBjbGFzc05hbWU6ICdtYWluJyB9KS5nZXRub2RlKCk7XHJcbiAgICB0aGlzLmJvZHkuYXBwZW5kKG1haW4pO1xyXG4gICAgY29uc3Qgd3JhcHBlciA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnd3JhcHBlciBtYWluX193cmFwcGVyJyB9KS5nZXRub2RlKCk7XHJcbiAgICBtYWluLmFwcGVuZCh3cmFwcGVyKTtcclxuICAgIC8vIENyZWF0ZUFzaWRlXHJcbiAgICBjb25zdCBhc2lkZSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnYXNpZGUnLCBjbGFzc05hbWU6ICdhc2lkZScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgd3JhcHBlci5hcHBlbmQoYXNpZGUpO1xyXG4gICAgY29uc3QgYnV0dG9uVG9wID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICB0YWc6ICdidXR0b24nLFxyXG4gICAgICBjbGFzc05hbWU6ICdidXR0b24gYXNpZGVfX2J1dHRvbicsXHJcbiAgICAgIGNvbnRlbnQ6ICdSZXNldCcsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICB0aGlzLnJvdXRlci5BZGRSb3V0aW5nVG9IZWFkZXIoYnV0dG9uVG9wKTtcclxuICAgIGNvbnN0IGNhdGVnb3JpZXMgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2FzaWRlX19jaG9pY2UgY2hvaWNlLW1lbnUnIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IGJyYW5kcyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnYXNpZGVfX2Nob2ljZSBjaG9pY2UtbWVudScgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgQ3VycmVudFByaWNlID0gcHJvZHVjdC5HZXRDdXJyZW50TWluTWF4UHJpY2UoUHJvZHVjdHNDYXJkcyk7XHJcbiAgICBjb25zdCBNYXhNaW5QcmljZXMgPSBwcm9kdWN0LkdldE1pbk1heFByaWNlKCk7XHJcbiAgICBjb25zdCBwcmlzZXMgPSBuZXcgQ3JlYXRlUmFuZ2VCbG9jayh7XHJcbiAgICAgIHRpdGxlOiAnUHJpc2VzJyxcclxuICAgICAgZnJvbTogYCQgJHtmaWx0ZXJzLk1pblByaWNlfWAsXHJcbiAgICAgIHRvOiBgJCAke2ZpbHRlcnMuTWF4UHJpY2V9YCxcclxuICAgICAgcmFuZ2UxTWluOiBNYXhNaW5QcmljZXMubWluLFxyXG4gICAgICByYW5nZTFNYXg6IE1heE1pblByaWNlcy5tYXgsXHJcbiAgICAgIHJhbmdlMVZhbHVlOiBmaWx0ZXJzLk1pblByaWNlLFxyXG4gICAgICByYW5nZTJNaW46IE1heE1pblByaWNlcy5taW4sXHJcbiAgICAgIHJhbmdlMk1heDogTWF4TWluUHJpY2VzLm1heCxcclxuICAgICAgcmFuZ2UyVmFsdWU6IGZpbHRlcnMuTWF4UHJpY2UsXHJcbiAgICAgIGlzUHJpY2U6IHRydWUsXHJcbiAgICAgIGlkOiAncHJpY2Utc2xpZGVyJyxcclxuICAgICAgcm91dGVyOiB0aGlzLnJvdXRlcixcclxuICAgICAgZmlsdGVyczogZmlsdGVycyxcclxuICAgICAgY3VycmVudDogQ3VycmVudFByaWNlLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgQ3VycmVudERhdGUgPSBwcm9kdWN0LkdldEN1cnJlbnRNaW5NYXhEYXRlKFByb2R1Y3RzQ2FyZHMpO1xyXG4gICAgY29uc3QgTWF4TWluRGF0ZSA9IHByb2R1Y3QuR2V0TWluTWF4RGF0ZSgpO1xyXG4gICAgY29uc3QgeWVhciA9IG5ldyBDcmVhdGVSYW5nZUJsb2NrKHtcclxuICAgICAgdGl0bGU6ICdSZWxlYXNlIGRhdGUnLFxyXG4gICAgICBmcm9tOiBmaWx0ZXJzLk1pblllYXIsXHJcbiAgICAgIHRvOiBmaWx0ZXJzLk1heFllYXIsXHJcbiAgICAgIHJhbmdlMU1pbjogTWF4TWluRGF0ZS5taW4sXHJcbiAgICAgIHJhbmdlMU1heDogTWF4TWluRGF0ZS5tYXgsXHJcbiAgICAgIHJhbmdlMVZhbHVlOiBmaWx0ZXJzLk1pblllYXIsXHJcbiAgICAgIHJhbmdlMk1pbjogTWF4TWluRGF0ZS5taW4sXHJcbiAgICAgIHJhbmdlMk1heDogTWF4TWluRGF0ZS5tYXgsXHJcbiAgICAgIHJhbmdlMlZhbHVlOiBmaWx0ZXJzLk1heFllYXIsXHJcbiAgICAgIGlzUHJpY2U6IGZhbHNlLFxyXG4gICAgICBpZDogJ3llYXItc2xpZGVyJyxcclxuICAgICAgcm91dGVyOiB0aGlzLnJvdXRlcixcclxuICAgICAgZmlsdGVyczogZmlsdGVycyxcclxuICAgICAgY3VycmVudDogQ3VycmVudERhdGUsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBidXR0b25Cb3R0b20gPSBuZXcgQ3JlYXRlRWxlbWVudCh7XHJcbiAgICAgIHRhZzogJ2J1dHRvbicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ2J1dHRvbiBhc2lkZV9fYnV0dG9uJyxcclxuICAgICAgY29udGVudDogJ0NvcHkgc2VhcmNoIGxpbmsnLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgYnV0dG9uQm90dG9tLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICB9KTtcclxuICAgIGFzaWRlLmFwcGVuZChidXR0b25Ub3AsIGNhdGVnb3JpZXMsIGJyYW5kcywgcHJpc2VzLCB5ZWFyLCBidXR0b25Cb3R0b20pO1xyXG4gICAgY29uc3QgY2F0ZWdvcmllc1RpdGxlID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICB0YWc6ICdoMicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ2Nob2ljZS1tZW51X190aXRsZScsXHJcbiAgICAgIGNvbnRlbnQ6ICdDYXRlZ29yeScsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBjYXRlZ29yaWVzLmFwcGVuZChjYXRlZ29yaWVzVGl0bGUpO1xyXG4gICAgY29uc3QgTGlzdENhdGVnb3JpZXMgPSBwcm9kdWN0LkdldENhdGVnb3JpZXMoUHJvZHVjdHNDYXJkcyk7XHJcbiAgICAvL2NvbnN0IExpc3RPZkN1cnJlbnRDYXRlZ29yaWVzID0gcHJvZHVjdC5HZXRDdXJyZW50Q2F0ZWdvcmllcyhQcm9kdWN0c0NhcmRzKTtcclxuICAgIExpc3RDYXRlZ29yaWVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgY29uc3QgY3VycmVudDogW0hUTUxJbnB1dEVsZW1lbnQsIEhUTUxMYWJlbEVsZW1lbnRdID0gbmV3IENyZWF0ZUNoZWNrYm94KHtcclxuICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgICAgIG5hbWU6ICdDYXRlZ29yeScsXHJcbiAgICAgICAgaWQ6IGl0ZW0uY2F0ZWdvcnksXHJcbiAgICAgICAgdmFsdWU6IGl0ZW0uY2F0ZWdvcnksXHJcbiAgICAgICAgY2xhc3NOYW1lOiAnY2hvaWNlLW1lbnVfX29wdGlvbicsXHJcbiAgICAgICAgQ291bnQ6IGl0ZW0uY291bnQsXHJcbiAgICAgICAgQ3VycmVudDogaXRlbS5DdXJyZW50Q2F0ZWdvcnksXHJcbiAgICAgICAgZmlsdGVyczogZmlsdGVycy5DYXRlZ29yeSxcclxuICAgICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgICB0aGlzLnJvdXRlci5BZGRSb3V0aW5nVG9DYXRlZ29yeShjdXJyZW50WzBdKTtcclxuICAgICAgY2F0ZWdvcmllcy5hcHBlbmQoY3VycmVudFswXSwgY3VycmVudFsxXSk7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGJyYW5kc1RpdGxlID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdoMicsIGNsYXNzTmFtZTogJ2Nob2ljZS1tZW51X190aXRsZScsIGNvbnRlbnQ6ICdCcmFuZCcgfSkuZ2V0bm9kZSgpO1xyXG4gICAgYnJhbmRzLmFwcGVuZChicmFuZHNUaXRsZSk7XHJcbiAgICBjb25zdCBMaXN0QnJhbmRzID0gcHJvZHVjdC5HZXRCcmFuZHMoUHJvZHVjdHNDYXJkcyk7XHJcbiAgICBMaXN0QnJhbmRzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgY29uc3QgY3VycmVudCA9IG5ldyBDcmVhdGVDaGVja2JveCh7XHJcbiAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcclxuICAgICAgICBuYW1lOiAnQ2F0ZWdvcnknLFxyXG4gICAgICAgIGlkOiBpdGVtLmJyYW5kLFxyXG4gICAgICAgIHZhbHVlOiBpdGVtLmJyYW5kLFxyXG4gICAgICAgIGNsYXNzTmFtZTogJ2Nob2ljZS1tZW51X19vcHRpb24nLFxyXG4gICAgICAgIENvdW50OiBpdGVtLmNvdW50LFxyXG4gICAgICAgIEN1cnJlbnQ6IGl0ZW0uQ3VycmVudEJyYW5kLFxyXG4gICAgICAgIGZpbHRlcnM6IGZpbHRlcnMuQnJhbmQsXHJcbiAgICAgIH0pLmdldG5vZGUoKTtcclxuICAgICAgdGhpcy5yb3V0ZXIuQWRkUm91dGluZ1RvQnJhbmQoY3VycmVudFswXSk7XHJcbiAgICAgIGJyYW5kcy5hcHBlbmQoY3VycmVudFswXSwgY3VycmVudFsxXSk7XHJcbiAgICB9KTtcclxuICAgIC8vIENyZWF0ZVN0b3JlXHJcbiAgICBjb25zdCBzdG9yZSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc3RvcmUnIH0pLmdldG5vZGUoKTtcclxuICAgIHdyYXBwZXIuYXBwZW5kKHN0b3JlKTtcclxuICAgIGNvbnN0IG1lbnUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N0b3JlX19tZW51JyB9KS5nZXRub2RlKCk7XHJcbiAgICAvLy8vLyAgbWVudVxyXG4gICAgY29uc3Qgdmlld09wdGlvbnMgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N0b3JlX192aWV3JyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCB2aWV3QmxvY2sxID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICB0YWc6ICdkaXYnLFxyXG4gICAgICBjbGFzc05hbWU6ICdzdG9yZV9fb3B0aW9uQmxvY2sxJyxcclxuICAgICAgaWQ6ICdzdG9yZV9fb3B0aW9uQmxvY2sxJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHZpZXcxID0gbmV3IENyZWF0ZVJhZGlvKHtcclxuICAgICAgdHlwZTogJ3JhZGlvJyxcclxuICAgICAgdmFsdWU6ICcnLFxyXG4gICAgICBpZDogJ3ZpZXcxJyxcclxuICAgICAgbmFtZTogJ3ZpZXcnLFxyXG4gICAgICBjbGFzc05hbWU6ICd2aWV3LW9wdGlvbjEnLFxyXG4gICAgICBjaGVja2VkOiB0cnVlLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgdmlld0Jsb2NrMS5hcHBlbmQodmlldzFbMF0sIHZpZXcxWzFdKTtcclxuICAgIGNvbnN0IHZpZXcyID0gbmV3IENyZWF0ZVJhZGlvKHtcclxuICAgICAgdHlwZTogJ3JhZGlvJyxcclxuICAgICAgdmFsdWU6ICcnLFxyXG4gICAgICBpZDogJ3ZpZXcyJyxcclxuICAgICAgbmFtZTogJ3ZpZXcnLFxyXG4gICAgICBjbGFzc05hbWU6ICd2aWV3LW9wdGlvbjInLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3Qgdmlld0Jsb2NrMiA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgdGFnOiAnZGl2JyxcclxuICAgICAgY2xhc3NOYW1lOiAnc3RvcmVfX29wdGlvbkJsb2NrMicsXHJcbiAgICAgIGlkOiAnc3RvcmVfX29wdGlvbkJsb2NrMicsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICB2aWV3QmxvY2syLmFwcGVuZCh2aWV3MlswXSwgdmlldzJbMV0pO1xyXG4gICAgdmlld09wdGlvbnMuYXBwZW5kKHZpZXdCbG9jazEsIHZpZXdCbG9jazIpO1xyXG4gICAgLy8vLy8vL1xyXG4gICAgY29uc3QgZm91bmRQcm9kdWN0cyA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgdGFnOiAnZGl2JyxcclxuICAgICAgY2xhc3NOYW1lOiAnc3RvcmVfX3F1YW50aXR5JyxcclxuICAgICAgY29udGVudDogJ0ZvdW5kIDogJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHByb2R1Y3RzQW1tb3VudCA9IG5ldyBDcmVhdGVFbGVtZW50KHtcclxuICAgICAgdGFnOiAnc3BhbicsXHJcbiAgICAgIGNsYXNzTmFtZTogJ3N0b3JlX19xdWFudGl0eS1mb3VuZCcsXHJcbiAgICAgIGNvbnRlbnQ6IFByb2R1Y3RzQ2FyZHMubGVuZ3RoLnRvU3RyaW5nKCksXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBmb3VuZFByb2R1Y3RzLmFwcGVuZChwcm9kdWN0c0FtbW91bnQpO1xyXG4gICAgY29uc3Qgc29ydE1lbnUgPSBuZXcgQ3JlYXRlU29ydE1lbnUoe1xyXG4gICAgICB0YWc6ICdkaXYnLFxyXG4gICAgICBjbGFzc05hbWU6ICdzb3J0LW1lbnUnLFxyXG4gICAgICByb3V0ZXI6IHRoaXMucm91dGVyLFxyXG4gICAgICBmaWx0ZXI6IGZpbHRlcnMuU29ydCxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IHNlYXJjaEJhciA9IG5ldyBDcmVhdGVTZWFyY2hCYXIoe1xyXG4gICAgICB0YWc6ICdkaXYnLFxyXG4gICAgICBjbGFzc05hbWU6ICdzZWFyY2gnLFxyXG4gICAgICByb3V0ZXI6IHRoaXMucm91dGVyLFxyXG4gICAgICBmaWx0ZXI6IGZpbHRlcnMuU2VhcmNoLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgbWVudS5hcHBlbmQodmlld09wdGlvbnMsIGZvdW5kUHJvZHVjdHMsIHNlYXJjaEJhciwgc29ydE1lbnUpO1xyXG5cclxuICAgIC8vLy8vIHByb2R1Y3RzXHJcblxyXG4gICAgY29uc3QgcHJvZHVjdHMgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N0b3JlX19wcm9kdWN0cycsIGlkOiAnc3RvcmVfX3Byb2R1Y3RzJyB9KS5nZXRub2RlKCk7XHJcbiAgICBzdG9yZS5hcHBlbmQobWVudSwgcHJvZHVjdHMpO1xyXG4gIH1cclxuICAvLyDQvNC10YLQvtC0INC00LvRjyBmb290ZXJcclxuICBDcmVhdGVGb290ZXIoKSB7XHJcbiAgICBjb25zdCBmb290ZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2Zvb3RlcicsIGNsYXNzTmFtZTogJ2Zvb3RlcicgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3Qgd3JhcHBlciA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnd3JhcHBlciBmb290ZXJfX3dyYXBwZXInIH0pLmdldG5vZGUoKTtcclxuICAgIGZvb3Rlci5hcHBlbmQod3JhcHBlcik7XHJcbiAgICB0aGlzLmJvZHkuYXBwZW5kKGZvb3Rlcik7XHJcbiAgICBjb25zdCBjYXJ0QmxvY2sgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2Zvb3Rlcl9fY2FydCcgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgZm9vdGVyQ2FydCA9IG5ldyBDcmVhdGVMaW5rKHtcclxuICAgICAgaHJlZjogJ2h0dHBzOi8vcnMuc2Nob29sL2pzLycsXHJcbiAgICAgIHRhcmdldDogJ19ibGFuaycsXHJcbiAgICAgIGNsYXNzTmFtZTogJ2Zvb3Rlcl9fY2FydF9saWdodCcsXHJcbiAgICB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCBmb290ZXJJY29uID0gbmV3IENyZWF0ZUltYWdlKHtcclxuICAgICAgc3JjOiAnLi9hc3NldHMvaW1hZ2VzL2xvZ29fcnNfdGV4dC5zdmcnLFxyXG4gICAgICBhbHQ6ICdSUyBTY2hvb2wnLFxyXG4gICAgICBjbGFzc05hbWU6ICdmb290ZXJfX2xvZ28nLFxyXG4gICAgfSkuZ2V0bm9kZSgpO1xyXG4gICAgY29uc3QgcmVmZXJlbmNlcyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9vdGVyX19yZWZlcmVuY2VzJyB9KS5nZXRub2RlKCk7XHJcbiAgICBjb25zdCB5ZWFyID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY2xhc3NOYW1lOiAnZm9vdGVyX195ZWFyJywgY29udGVudDogJzIwMjInIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IFNhc2hhTGluayA9IG5ldyBDcmVhdGVMaW5rKHtcclxuICAgICAgaHJlZjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9iYWxheG9uJyxcclxuICAgICAgdGFyZ2V0OiAnX2JsYW5rJyxcclxuICAgICAgY2xhc3NOYW1lOiAnZm9vdGVyX19TYXNoYUdpdCcsXHJcbiAgICAgIGNvbnRlbnQ6ICdiYWxheG9uJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIGNvbnN0IE5hdGFMaW5rID0gbmV3IENyZWF0ZUxpbmsoe1xyXG4gICAgICBocmVmOiAnaHR0cHM6Ly9naXRodWIuY29tL0VuYXlhQW1lJyxcclxuICAgICAgdGFyZ2V0OiAnX2JsYW5rJyxcclxuICAgICAgY2xhc3NOYW1lOiAnZm9vdGVyX19OYXRhR2l0JyxcclxuICAgICAgY29udGVudDogJ0VuYXlhQW1lJyxcclxuICAgIH0pLmdldG5vZGUoKTtcclxuICAgIHJlZmVyZW5jZXMuYXBwZW5kKFNhc2hhTGluaywgTmF0YUxpbmssIHllYXIpO1xyXG4gICAgZm9vdGVyQ2FydC5hcHBlbmQoZm9vdGVySWNvbik7XHJcbiAgICBjYXJ0QmxvY2suYXBwZW5kKGZvb3RlckNhcnQpO1xyXG4gICAgd3JhcHBlci5hcHBlbmQoY2FydEJsb2NrLCByZWZlcmVuY2VzKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGNvbnN0IFBhZ2UgPSBuZXcgQ3JlYXRlRGVmYXVsdFBhZ2UoKTtcclxuXHJcbi8vIFBhZ2UuQ3JlYXRlSGVhZGVyKCk7XHJcbi8vIFBhZ2UuQ3JlYXRlTWFpbigpO1xyXG4vLyBQYWdlLkNyZWF0ZUZvb3RlcigpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlRGVmYXVsdFBhZ2U7XHJcbiIsImltcG9ydCB7IENvbnN0cnVjdG9yQ2hlY2tib3ggfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDcmVhdGVDaGVja2JveCB7XHJcbiAgcHJpdmF0ZSBpbnB1dDogSFRNTElucHV0RWxlbWVudDtcclxuICBwcml2YXRlIGxhYmVsOiBIVE1MTGFiZWxFbGVtZW50O1xyXG4gIGNvbnN0cnVjdG9yKHsgdHlwZSwgbmFtZSwgaWQsIHZhbHVlLCBjbGFzc05hbWUsIENvdW50LCBDdXJyZW50LCBmaWx0ZXJzIH06IENvbnN0cnVjdG9yQ2hlY2tib3gpIHtcclxuICAgIHRoaXMuaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgdGhpcy5pbnB1dC50eXBlID0gdHlwZTtcclxuICAgIHRoaXMuaW5wdXQubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLmlucHV0LmlkID0gaWQ7XHJcbiAgICB0aGlzLmlucHV0LnZhbHVlID0gdmFsdWU7XHJcblxyXG4gICAgZmlsdGVycz8uZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbSA9PT0gdmFsdWUpIHtcclxuICAgICAgICB0aGlzLmlucHV0LmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmIChjbGFzc05hbWUpIHtcclxuICAgICAgdGhpcy5pbnB1dC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgIHRoaXMubGFiZWwuaHRtbEZvciA9IGlkO1xyXG4gICAgdGhpcy5sYWJlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xyXG4gICAgY29uc3QgcXVhbnRpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBxdWFudGl0eS50ZXh0Q29udGVudCA9IGAgICgke0N1cnJlbnR9LyR7Q291bnR9KWA7XHJcbiAgICB0aGlzLmxhYmVsLmFwcGVuZChxdWFudGl0eSk7XHJcbiAgfVxyXG4gIGdldG5vZGUoKSB7XHJcbiAgICBjb25zdCBhcnI6IFtIVE1MSW5wdXRFbGVtZW50LCBIVE1MTGFiZWxFbGVtZW50XSA9IFt0aGlzLmlucHV0LCB0aGlzLmxhYmVsXTtcclxuICAgIHJldHVybiBhcnI7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbnN0cnVjdG9yRWxlbWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENyZWF0ZUVsZW1lbnQge1xyXG4gIHByb3RlY3RlZCBlbDogSFRNTEVsZW1lbnQ7XHJcbiAgY29uc3RydWN0b3IoeyB0YWcsIGlkLCBjbGFzc05hbWUsIGNvbnRlbnQsIEJhY2tncm91bmRJbWcgfTogQ29uc3RydWN0b3JFbGVtZW50KSB7XHJcbiAgICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG4gICAgaWYgKGlkKSB7XHJcbiAgICAgIHRoaXMuZWwuaWQgPSBpZDtcclxuICAgIH1cclxuICAgIGlmIChjbGFzc05hbWUpIHtcclxuICAgICAgdGhpcy5lbC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcbiAgICB9XHJcbiAgICBpZiAoY29udGVudCkge1xyXG4gICAgICB0aGlzLmVsLnRleHRDb250ZW50ID0gY29udGVudDtcclxuICAgIH1cclxuICAgIGlmIChCYWNrZ3JvdW5kSW1nKSB7XHJcbiAgICAgIHRoaXMuZWwuc3R5bGUuYmFja2dyb3VuZCA9IGB3aGl0ZSB1cmwoJyR7QmFja2dyb3VuZEltZ30nKSBuby1yZXBlYXQgY2VudGVyIC8gY29udGFpbmA7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldG5vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29uc3RydWN0b3JJbWFnZSB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENyZWF0ZUltYWdlIHtcclxuICBwcml2YXRlIGVsOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gIGNvbnN0cnVjdG9yKHsgc3JjLCBpZCwgY2xhc3NOYW1lLCBhbHQgfTogQ29uc3RydWN0b3JJbWFnZSkge1xyXG4gICAgdGhpcy5lbCA9IG5ldyBJbWFnZSgpO1xyXG4gICAgdGhpcy5lbC5zcmMgPSBzcmM7XHJcbiAgICBpZiAoaWQpIHtcclxuICAgICAgdGhpcy5lbC5pZCA9IGlkO1xyXG4gICAgfVxyXG4gICAgaWYgKGNsYXNzTmFtZSkge1xyXG4gICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgIH1cclxuICAgIGlmIChhbHQpIHtcclxuICAgICAgdGhpcy5lbC5hbHQgPSBhbHQ7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldG5vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29uc3RydWN0b3JMaW5rIH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3JlYXRlTGluayB7XHJcbiAgcHJpdmF0ZSBsaW5rOiBIVE1MQW5jaG9yRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoeyBocmVmLCBpZCwgY2xhc3NOYW1lLCB0YXJnZXQsIGNvbnRlbnQgfTogQ29uc3RydWN0b3JMaW5rKSB7XHJcbiAgICB0aGlzLmxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICB0aGlzLmxpbmsuaHJlZiA9IGhyZWY7XHJcbiAgICBpZiAoY29udGVudCkge1xyXG4gICAgICB0aGlzLmxpbmsudGV4dENvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgfVxyXG4gICAgaWYgKGNsYXNzTmFtZSkge1xyXG4gICAgICB0aGlzLmxpbmsuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG4gICAgfVxyXG4gICAgaWYgKGlkKSB7XHJcbiAgICAgIHRoaXMubGluay5pZCA9IGlkO1xyXG4gICAgfVxyXG4gICAgaWYgKHRhcmdldCkge1xyXG4gICAgICB0aGlzLmxpbmsudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0bm9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmxpbms7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbnN0cnVjdG9yTnVtYmVySW5wdXQgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDcmVhdGVOdW1iZXJJbnB1dCB7XHJcbiAgcHJpdmF0ZSBpbnB1dDogSFRNTElucHV0RWxlbWVudDtcclxuICBjb25zdHJ1Y3Rvcih7IHR5cGUsIHZhbHVlLCBpZCwgY2xhc3NOYW1lLCBwbGFjZWhvbGRlciwgcmVxdWlyZWQgfTogQ29uc3RydWN0b3JOdW1iZXJJbnB1dCkge1xyXG4gICAgdGhpcy5pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICB0aGlzLmlucHV0LnR5cGUgPSB0eXBlO1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGlmIChpZCkge1xyXG4gICAgICB0aGlzLmlucHV0LmlkID0gaWQ7XHJcbiAgICB9XHJcbiAgICBpZiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHBsYWNlaG9sZGVyKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcclxuICAgIH1cclxuICAgIGlmIChyZXF1aXJlZCkge1xyXG4gICAgICB0aGlzLmlucHV0LnJlcXVpcmVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0bm9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmlucHV0O1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb25zdHJ1Y3RvclJhZGlvIH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3JlYXRlUmFkaW8ge1xyXG4gIHByaXZhdGUgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBsYWJlbDogSFRNTExhYmVsRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoeyB0eXBlLCB2YWx1ZSwgaWQsIG5hbWUsIGNsYXNzTmFtZSwgY2hlY2tlZCB9OiBDb25zdHJ1Y3RvclJhZGlvKSB7XHJcbiAgICB0aGlzLmxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgIHRoaXMubGFiZWwuaHRtbEZvciA9IGlkO1xyXG4gICAgdGhpcy5sYWJlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xyXG5cclxuICAgIHRoaXMuaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgdGhpcy5pbnB1dC50eXBlID0gdHlwZTtcclxuICAgIHRoaXMuaW5wdXQubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLmlucHV0LmlkID0gaWQ7XHJcbiAgICBpZiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoZWNrZWQpIHtcclxuICAgICAgdGhpcy5pbnB1dC5jaGVja2VkID0gY2hlY2tlZDtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0bm9kZSgpIHtcclxuICAgIGNvbnN0IGFycjogW0hUTUxJbnB1dEVsZW1lbnQsIEhUTUxMYWJlbEVsZW1lbnRdID0gW3RoaXMuaW5wdXQsIHRoaXMubGFiZWxdO1xyXG4gICAgcmV0dXJuIGFycjtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29uc3RydWN0b3JSYW5nZSB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENyZWF0ZVJhbmdlIHtcclxuICBwcml2YXRlIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIGNvbnN0cnVjdG9yKHsgdHlwZSwgbWluLCBtYXgsIHZhbHVlLCBpZCwgY2xhc3NOYW1lIH06IENvbnN0cnVjdG9yUmFuZ2UpIHtcclxuICAgIHRoaXMuaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgdGhpcy5pbnB1dC50eXBlID0gdHlwZTtcclxuICAgIHRoaXMuaW5wdXQubWluID0gbWluO1xyXG4gICAgdGhpcy5pbnB1dC5tYXggPSBtYXg7XHJcbiAgICB0aGlzLmlucHV0LmlkID0gaWQ7XHJcbiAgICB0aGlzLmlucHV0LnZhbHVlID0gdmFsdWU7XHJcbiAgICBpZiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRub2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5wdXQ7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbnN0cnVjdG90VGV4dElucHV0IH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3JlYXRlVGV4dElucHV0IHtcclxuICBwcml2YXRlIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIGNvbnN0cnVjdG9yKHsgdHlwZSwgcGxhY2Vob2xkZXIsIG5hbWUsIGNsYXNzTmFtZSwgaWQsIHJlcXVpcmVkIH06IENvbnN0cnVjdG90VGV4dElucHV0KSB7XHJcbiAgICB0aGlzLmlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIHRoaXMuaW5wdXQudHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLmlucHV0Lm5hbWUgPSBuYW1lO1xyXG4gICAgaWYgKHBsYWNlaG9sZGVyKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcclxuICAgIH1cclxuICAgIGlmIChjbGFzc05hbWUpIHtcclxuICAgICAgdGhpcy5pbnB1dC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICB9XHJcbiAgICBpZiAocmVxdWlyZWQpIHtcclxuICAgICAgdGhpcy5pbnB1dC5yZXF1aXJlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoaWQpIHtcclxuICAgICAgdGhpcy5pbnB1dC5pZCA9IGlkO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRub2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5wdXQ7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBwcm9kdWN0cyBmcm9tICcuLi9hc3NldHMvZmlsZXMvZGF0YS5qc29uJztcclxuaW1wb3J0IHsgQXBwbHlTb3J0IH0gZnJvbSAnLi9BcHBseVNvcnQnO1xyXG5pbXBvcnQgeyBHZXRNaW5NYXgsIHByb2R1Y3QgfSBmcm9tICcuL0ludGVyZmFjZXMnO1xyXG5cclxuaW50ZXJmYWNlIEdldENhdGVnb3JpZXMge1xyXG4gIGNhdGVnb3J5OiBzdHJpbmc7XHJcbiAgY291bnQ6IG51bWJlcjtcclxuICBDdXJyZW50Q2F0ZWdvcnk6IG51bWJlcjtcclxufVxyXG5cclxuaW50ZXJmYWNlIEdldEJyYW5kcyB7XHJcbiAgYnJhbmQ6IHN0cmluZztcclxuICBjb3VudDogbnVtYmVyO1xyXG4gIEN1cnJlbnRCcmFuZDogbnVtYmVyO1xyXG59XHJcblxyXG5jbGFzcyBkYXRhIHtcclxuICBwcml2YXRlIExpc3RDYXRlZ29yaWVzOiBzdHJpbmdbXSA9IFtdO1xyXG4gIHByaXZhdGUgYXJyOiBwcm9kdWN0W10gPSBwcm9kdWN0cztcclxuICBwcml2YXRlIExpc3RCcmFuZHM6IHN0cmluZ1tdID0gW107XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmFyci5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLkxpc3RDYXRlZ29yaWVzLmluY2x1ZGVzKGl0ZW0uY2F0ZWdvcnkpID09PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuTGlzdENhdGVnb3JpZXMucHVzaChpdGVtLmNhdGVnb3J5KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmFyci5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLkxpc3RCcmFuZHMuaW5jbHVkZXMoaXRlbS5icmFuZCkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5MaXN0QnJhbmRzLnB1c2goaXRlbS5icmFuZCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBHZXQoKSB7XHJcbiAgICByZXR1cm4gcHJvZHVjdHM7XHJcbiAgfVxyXG4gIEdldENhdGVnb3JpZXMoY2F0ZWdvcmllczogcHJvZHVjdFtdKTogR2V0Q2F0ZWdvcmllc1tdIHtcclxuICAgIGNvbnN0IGNhdCA9IG5ldyBBcHBseVNvcnQoJ1NvcnQgYnknLCBwcm9kdWN0cykucmV0dXJuKCk7XHJcbiAgICB0aGlzLkxpc3RDYXRlZ29yaWVzID0gW107XHJcbiAgICBjYXQuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5MaXN0Q2F0ZWdvcmllcy5pbmNsdWRlcyhpdGVtLmNhdGVnb3J5KSA9PT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLkxpc3RDYXRlZ29yaWVzLnB1c2goaXRlbS5jYXRlZ29yeSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgY29uc3QgUmVzQ2F0ZWdvcnk6IEdldENhdGVnb3JpZXNbXSA9IFtdO1xyXG4gICAgdGhpcy5MaXN0Q2F0ZWdvcmllcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGxldCBjb3VudGVyID0gMDtcclxuICAgICAgbGV0IGN1cnJlbnQgPSAwO1xyXG4gICAgICB0aGlzLmFyci5mb3JFYWNoKChpdCkgPT4ge1xyXG4gICAgICAgIGlmIChpdGVtID09PSBpdC5jYXRlZ29yeSkge1xyXG4gICAgICAgICAgY291bnRlciArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGNhdGVnb3JpZXMuZm9yRWFjaCgoaXQpID0+IHtcclxuICAgICAgICBpZiAoaXQuY2F0ZWdvcnkgPT09IGl0ZW0pIHtcclxuICAgICAgICAgIGN1cnJlbnQgKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCBvYmo6IEdldENhdGVnb3JpZXMgPSB7XHJcbiAgICAgICAgY2F0ZWdvcnk6IGl0ZW0sXHJcbiAgICAgICAgY291bnQ6IGNvdW50ZXIsXHJcbiAgICAgICAgQ3VycmVudENhdGVnb3J5OiBjdXJyZW50LFxyXG4gICAgICB9O1xyXG4gICAgICBSZXNDYXRlZ29yeS5wdXNoKG9iaik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBSZXNDYXRlZ29yeTtcclxuICB9XHJcbiAgR2V0QnJhbmRzKGJyYW5kczogcHJvZHVjdFtdKTogR2V0QnJhbmRzW10ge1xyXG4gICAgdGhpcy5MaXN0QnJhbmRzID0gW107XHJcbiAgICBjb25zdCBicmFuZCA9IG5ldyBBcHBseVNvcnQoJ1NvcnQgYnknLCBwcm9kdWN0cykucmV0dXJuKCk7XHJcbiAgICBicmFuZC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLkxpc3RCcmFuZHMuaW5jbHVkZXMoaXRlbS5icmFuZCkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5MaXN0QnJhbmRzLnB1c2goaXRlbS5icmFuZCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgY29uc3QgUmVzQnJhbmRzOiBHZXRCcmFuZHNbXSA9IFtdO1xyXG4gICAgdGhpcy5MaXN0QnJhbmRzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICBsZXQgY3VycmVudCA9IDA7XHJcbiAgICAgIHRoaXMuYXJyLmZvckVhY2goKGl0KSA9PiB7XHJcbiAgICAgICAgaWYgKGl0ZW0gPT09IGl0LmJyYW5kKSB7XHJcbiAgICAgICAgICBjb3VudGVyICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgYnJhbmRzLmZvckVhY2goKGl0KSA9PiB7XHJcbiAgICAgICAgaWYgKGl0LmJyYW5kID09PSBpdGVtKSB7XHJcbiAgICAgICAgICBjdXJyZW50ICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgY29uc3Qgb2JqOiBHZXRCcmFuZHMgPSB7XHJcbiAgICAgICAgYnJhbmQ6IGl0ZW0sXHJcbiAgICAgICAgY291bnQ6IGNvdW50ZXIsXHJcbiAgICAgICAgQ3VycmVudEJyYW5kOiBjdXJyZW50LFxyXG4gICAgICB9O1xyXG4gICAgICBSZXNCcmFuZHMucHVzaChvYmopO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gUmVzQnJhbmRzO1xyXG4gIH1cclxuICBHZXRNaW5NYXhQcmljZShhcnI6IHByb2R1Y3RbXSA9IHByb2R1Y3RzKSB7XHJcbiAgICBjb25zdCBMaXN0UHJpY2U6IG51bWJlcltdID0gW107XHJcbiAgICBhcnIuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBMaXN0UHJpY2UucHVzaChpdGVtLnByaWNlKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgbWluID0gTWF0aC5taW4uYXBwbHkobnVsbCwgTGlzdFByaWNlKTtcclxuICAgIGNvbnN0IG1heCA9IE1hdGgubWF4LmFwcGx5KG51bGwsIExpc3RQcmljZSk7XHJcbiAgICBjb25zdCBvYmo6IEdldE1pbk1heCA9IHtcclxuICAgICAgbWF4OiBtYXgudG9TdHJpbmcoKSxcclxuICAgICAgbWluOiBtaW4udG9TdHJpbmcoKSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gb2JqO1xyXG4gIH1cclxuICBHZXRNaW5NYXhEYXRlKGFycjogcHJvZHVjdFtdID0gcHJvZHVjdHMpIHtcclxuICAgIGNvbnN0IExpc3REYXRlOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgYXJyLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgTGlzdERhdGUucHVzaChpdGVtLkRhdGVPZklzc3VlKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgbWluID0gTWF0aC5taW4uYXBwbHkobnVsbCwgTGlzdERhdGUpO1xyXG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgTGlzdERhdGUpO1xyXG4gICAgY29uc3Qgb2JqOiBHZXRNaW5NYXggPSB7XHJcbiAgICAgIG1heDogbWF4LnRvU3RyaW5nKCksXHJcbiAgICAgIG1pbjogbWluLnRvU3RyaW5nKCksXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG9iajtcclxuICB9XHJcbiAgR2V0QnlJZChpZDogc3RyaW5nKSB7XHJcbiAgICBsZXQgT2JqQnlJZDogcHJvZHVjdDtcclxuICAgIHByb2R1Y3RzLmZvckVhY2goKGl0ZW06IHByb2R1Y3QpID0+IHtcclxuICAgICAgaWYgKGl0ZW0uaWQudG9TdHJpbmcoKSA9PT0gaWQpIHtcclxuICAgICAgICBPYmpCeUlkID0gaXRlbTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gT2JqQnlJZCE7XHJcbiAgfVxyXG4gIEdldEN1cnJlbnRNaW5NYXhQcmljZShQcmljZTogcHJvZHVjdFtdKSB7XHJcbiAgICBjb25zdCBBbGxQcmljZXM6IG51bWJlcltdID0gW107XHJcbiAgICBQcmljZS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgIEFsbFByaWNlcy5wdXNoKGVsZW1lbnQucHJpY2UpO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbi5hcHBseShudWxsLCBBbGxQcmljZXMpO1xyXG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgQWxsUHJpY2VzKTtcclxuICAgIGNvbnN0IG9iajogR2V0TWluTWF4ID0ge1xyXG4gICAgICBtYXg6IG1heC50b1N0cmluZygpLFxyXG4gICAgICBtaW46IG1pbi50b1N0cmluZygpLFxyXG4gICAgfTtcclxuICAgIHJldHVybiBvYmo7XHJcbiAgfVxyXG4gIEdldEN1cnJlbnRNaW5NYXhEYXRlKERhdGU6IHByb2R1Y3RbXSkge1xyXG4gICAgY29uc3QgQWxsRGF0ZXM6IG51bWJlcltdID0gW107XHJcbiAgICBEYXRlLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgQWxsRGF0ZXMucHVzaChlbGVtZW50LkRhdGVPZklzc3VlKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgbWluID0gTWF0aC5taW4uYXBwbHkobnVsbCwgQWxsRGF0ZXMpO1xyXG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgQWxsRGF0ZXMpO1xyXG4gICAgY29uc3Qgb2JqOiBHZXRNaW5NYXggPSB7XHJcbiAgICAgIG1heDogbWF4LnRvU3RyaW5nKCksXHJcbiAgICAgIG1pbjogbWluLnRvU3RyaW5nKCksXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG9iajtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRhdGE7XHJcbiIsImltcG9ydCBkYXRhIGZyb20gJy4vZGF0YSc7XHJcbmltcG9ydCB7IGZpbHRlcnMgfSBmcm9tICcuL0ludGVyZmFjZXMnO1xyXG5cclxuY2xhc3MgUm91dGVyIHtcclxuICBwcml2YXRlIHByb2R1Y3RzID0gbmV3IGRhdGEoKTtcclxuICBwcml2YXRlIExpbWl0UGFnZSA9IHtcclxuICAgIGxpbWl0OiAwLFxyXG4gICAgcGFnZTogMCxcclxuICB9O1xyXG4gIHByaXZhdGUgZmlsdGVyczogZmlsdGVycyA9IHtcclxuICAgIENhdGVnb3J5OiBbXSxcclxuICAgIEJyYW5kOiBbXSxcclxuICAgIE1pblByaWNlOiB0aGlzLnByb2R1Y3RzLkdldE1pbk1heFByaWNlKCkubWluLFxyXG4gICAgTWF4UHJpY2U6IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4UHJpY2UoKS5tYXgsXHJcbiAgICBNaW5ZZWFyOiB0aGlzLnByb2R1Y3RzLkdldE1pbk1heERhdGUoKS5taW4sXHJcbiAgICBNYXhZZWFyOiB0aGlzLnByb2R1Y3RzLkdldE1pbk1heERhdGUoKS5tYXgsXHJcbiAgICBTZWFyY2g6ICcnLFxyXG4gICAgU29ydDogJ1NvcnQgYnknLFxyXG4gIH07XHJcbiAgcHJpdmF0ZSBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuICBwcml2YXRlIGNoZWNrZXIgPSBmYWxzZTtcclxuICBwcml2YXRlIFRvUGFnZXMgPSBmYWxzZTtcclxuICBwcml2YXRlIGlzQ2hhbmdlUHJpY2UgPSBmYWxzZTtcclxuXHJcbiAgLy8gY29uc3RydWN0b3IoZmlsdGVyczogZmlsdGVycykge1xyXG4gIC8vICAgdGhpcy5maWx0ZXJzID0gZmlsdGVycztcclxuICAvLyB9XHJcblxyXG4gIEFkZFVSTChpZDogc3RyaW5nKSB7XHJcbiAgICBpZiAoaWQuc3BsaXQoJy0nKVswXSA9PT0gJyNjYXJkJykge1xyXG4gICAgICBjb25zdCBuZXd1cmwgPSBgJHtpZH1gO1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IG5ld3VybDtcclxuICAgICAgdGhpcy5jaGVja2VyID0gdHJ1ZTtcclxuICAgICAgdGhpcy5Ub1BhZ2VzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChpZCA9PT0gJycpIHtcclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnJztcclxuICAgICAgdGhpcy5jaGVja2VyID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChpZCA9PT0gJ2Jhc2tldCcpIHtcclxuICAgICAgY29uc3QgbmV3dXJsID0gYCR7aWR9YDtcclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBuZXd1cmw7XHJcbiAgICAgIHRoaXMuY2hlY2tlciA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBBZGRDYXRlZ29yeUZpbHRlcnMoaWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5maWx0ZXJzLkNhdGVnb3J5LnB1c2goaWQpO1xyXG4gICAgdGhpcy5BZGRGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBBZGRCcmFuZEZpbHRlcnMoaWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5maWx0ZXJzLkJyYW5kLnB1c2goaWQpO1xyXG4gICAgdGhpcy5BZGRGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBBZGRGaWx0ZXJzKCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmZpbHRlcnMuQ2F0ZWdvcnkubGVuZ3RoICE9PSAwIHx8XHJcbiAgICAgIHRoaXMuZmlsdGVycy5CcmFuZC5sZW5ndGggIT09IDAgfHxcclxuICAgICAgdGhpcy5maWx0ZXJzLk1pblByaWNlICE9PSB0aGlzLnByb2R1Y3RzLkdldE1pbk1heFByaWNlKCkubWluIHx8XHJcbiAgICAgIHRoaXMuZmlsdGVycy5NYXhQcmljZSAhPT0gdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhQcmljZSgpLm1heCB8fFxyXG4gICAgICB0aGlzLmZpbHRlcnMuTWluWWVhciAhPT0gdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhEYXRlKCkubWluIHx8XHJcbiAgICAgIHRoaXMuZmlsdGVycy5NYXhZZWFyICE9PSB0aGlzLnByb2R1Y3RzLkdldE1pbk1heERhdGUoKS5tYXggfHxcclxuICAgICAgdGhpcy5maWx0ZXJzLlNlYXJjaCAhPT0gJycgfHxcclxuICAgICAgdGhpcy5maWx0ZXJzLlNvcnQgIT09ICdTb3J0IGJ5J1xyXG4gICAgKSB7XHJcbiAgICAgIGxldCBuZXd1cmwgPSAnIz8nO1xyXG4gICAgICBpZiAodGhpcy5maWx0ZXJzLkNhdGVnb3J5Lmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgIG5ld3VybCArPSAnQ2F0ZWdvcnk9JztcclxuICAgICAgICB0aGlzLmZpbHRlcnMuQ2F0ZWdvcnkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgbmV3dXJsICs9IGAke2l0ZW19K2A7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbmV3dXJsID0gbmV3dXJsLnNsaWNlKDAsIC0xKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5maWx0ZXJzLkJyYW5kLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlcnMuQ2F0ZWdvcnkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICBuZXd1cmwgKz0gJ0JyYW5kPSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5ld3VybCArPSAnJkJyYW5kPSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZmlsdGVycy5CcmFuZC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBuZXd1cmwgKz0gYCR7aXRlbX0rYDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBuZXd1cmwgPSBuZXd1cmwuc2xpY2UoMCwgLTEpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLmZpbHRlcnMuTWluUHJpY2UgIT09IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4UHJpY2UoKS5taW4gfHxcclxuICAgICAgICB0aGlzLmZpbHRlcnMuTWF4UHJpY2UgIT09IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4UHJpY2UoKS5tYXhcclxuICAgICAgKSB7XHJcbiAgICAgICAgaWYgKG5ld3VybCA9PT0gJyM/Jykge1xyXG4gICAgICAgICAgbmV3dXJsICs9IGBQcmljZT0ke3RoaXMuZmlsdGVycy5NaW5QcmljZX0rJHt0aGlzLmZpbHRlcnMuTWF4UHJpY2V9YDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmV3dXJsICs9IGAmUHJpY2U9JHt0aGlzLmZpbHRlcnMuTWluUHJpY2V9KyR7dGhpcy5maWx0ZXJzLk1heFByaWNlfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNDaGFuZ2VQcmljZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuZmlsdGVycy5NaW5ZZWFyICE9PSB0aGlzLnByb2R1Y3RzLkdldE1pbk1heERhdGUoKS5taW4gfHxcclxuICAgICAgICB0aGlzLmZpbHRlcnMuTWF4WWVhciAhPT0gdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhEYXRlKCkubWF4XHJcbiAgICAgICkge1xyXG4gICAgICAgIGlmIChuZXd1cmwgPT09ICcjPycpIHtcclxuICAgICAgICAgIG5ld3VybCArPSBgRGF0ZT0ke3RoaXMuZmlsdGVycy5NaW5ZZWFyfSske3RoaXMuZmlsdGVycy5NYXhZZWFyfWA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5ld3VybCArPSBgJkRhdGU9JHt0aGlzLmZpbHRlcnMuTWluWWVhcn0rJHt0aGlzLmZpbHRlcnMuTWF4WWVhcn1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzQ2hhbmdlUHJpY2UgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmZpbHRlcnMuU2VhcmNoICE9PSAnJykge1xyXG4gICAgICAgIGlmIChuZXd1cmwgPT09ICcjPycpIHtcclxuICAgICAgICAgIG5ld3VybCArPSBgU2VhcmNoPSR7dGhpcy5maWx0ZXJzLlNlYXJjaH1gO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuZXd1cmwgKz0gYCZTZWFyY2g9JHt0aGlzLmZpbHRlcnMuU2VhcmNofWA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmZpbHRlcnMuU29ydCAhPT0gJ1NvcnQgYnknKSB7XHJcbiAgICAgICAgaWYgKG5ld3VybCA9PT0gJyM/Jykge1xyXG4gICAgICAgICAgbmV3dXJsICs9IGBTb3J0PSR7dGhpcy5maWx0ZXJzLlNvcnR9YDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmV3dXJsICs9IGAmU29ydD0ke3RoaXMuZmlsdGVycy5Tb3J0fWA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gbmV3dXJsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFJlbW92ZUNhdGVnb3J5RmlsdGVycyhpZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZmlsdGVycy5DYXRlZ29yeS5maW5kSW5kZXgoKGVsZW1lbnQpID0+IHtcclxuICAgICAgcmV0dXJuIGVsZW1lbnQgPT09IGlkO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmZpbHRlcnMuQ2F0ZWdvcnkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHRoaXMuQWRkRmlsdGVycygpO1xyXG4gIH1cclxuXHJcbiAgUmVtb3ZlQnJhbmRGaWx0ZXJzKGlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maWx0ZXJzLkJyYW5kLmZpbmRJbmRleCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbWVudCA9PT0gaWQ7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuZmlsdGVycy5CcmFuZC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgdGhpcy5BZGRGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBBZGRSb3V0aW5nVG9DYXJkKHRhZzogSFRNTEVsZW1lbnQpIHtcclxuICAgIHRhZy5vbmNsaWNrID0gKGU6IEV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG4gICAgICBjb25zdCBpZCA9ICh0YXJnZXQgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpLmlkO1xyXG4gICAgICBjb25zb2xlLmxvZyhpZCk7XHJcbiAgICAgIHRoaXMuQWRkVVJMKGAjJHtpZH1gKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBBZGRSb3V0aW5nVG9IZWFkZXIodGFnOiBIVE1MRWxlbWVudCkge1xyXG4gICAgdGFnLm9uY2xpY2sgPSAoZTogRXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcbiAgICAgIGNvbnN0IGlkID0gKHRhcmdldCBhcyBIVE1MQnV0dG9uRWxlbWVudCkuaWQ7XHJcbiAgICAgIHRoaXMuQWRkVVJMKGAke2lkfWApO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIEFkZFJvdXRpbmdUb0Jhc2tldCh0YWc6IEhUTUxFbGVtZW50LCBmcm9tY2FyZD86IGJvb2xlYW4pIHtcclxuICAgIHRhZy5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBpZiAoZnJvbWNhcmQpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZnJvbWNhcmQnLCAndHJ1ZScpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuQWRkVVJMKGBiYXNrZXRgKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBBZGRSb3V0aW5nSW5CYXNrZXQobGltaXQ6IG51bWJlciwgcGFnZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLkxpbWl0UGFnZS5saW1pdCA9IGxpbWl0O1xyXG4gICAgdGhpcy5MaW1pdFBhZ2UucGFnZSA9IHBhZ2U7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLkxpbWl0UGFnZSk7XHJcbiAgICBsZXQgbmV3dXJsID0gJ2Jhc2tldCc7XHJcbiAgICBpZiAodGhpcy5MaW1pdFBhZ2UubGltaXQgPiAwKSB7XHJcbiAgICAgIG5ld3VybCArPSBgIWxpbWl0PSR7dGhpcy5MaW1pdFBhZ2UubGltaXR9YDtcclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBuZXd1cmw7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5MaW1pdFBhZ2UucGFnZSA+IDAgJiYgdGhpcy5MaW1pdFBhZ2UucGFnZSAhPT0gMSkge1xyXG4gICAgICBpZiAobmV3dXJsID09PSAnYmFza2V0Jykge1xyXG4gICAgICAgIG5ld3VybCArPSBgIXBhZ2U9JHt0aGlzLkxpbWl0UGFnZS5wYWdlfWA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV3dXJsICs9IGAmcGFnZT0ke3RoaXMuTGltaXRQYWdlLnBhZ2V9YDtcclxuICAgICAgfVxyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IG5ld3VybDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEFkZFJvdXRpbmdUb0xpbWl0KGNvdW50OiBzdHJpbmcpIHtcclxuICAvLyAgIHRoaXMuTGltaXRQYWdlLmxpbWl0ID0gK2NvdW50O1xyXG4gIC8vICAgY29uc29sZS5sb2codGhpcy5MaW1pdFBhZ2UubGltaXQpXHJcbiAgLy8gICB0aGlzLkFkZFJvdXRpbmdJbkJhc2tldCgpO1xyXG4gIC8vIH1cclxuXHJcbiAgLy8gQWRkUm91dGluZ1RvUGFnZShjb3VudDogc3RyaW5nKSB7XHJcbiAgLy8gICB0aGlzLkxpbWl0UGFnZS5wYWdlID0gK2NvdW50O1xyXG4gIC8vICAgY29uc29sZS5sb2codGhpcy5MaW1pdFBhZ2UucGFnZSlcclxuICAvLyAgIHRoaXMuQWRkUm91dGluZ0luQmFza2V0KCk7XHJcbiAgLy8gfVxyXG5cclxuICBBZGRSb3V0aW5nVG9DYXRlZ29yeSh0YWc6IEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgIHRhZy5vbmNsaWNrID0gKGU6IEV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG4gICAgICBjb25zdCBpZCA9ICh0YXJnZXQgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpLmlkO1xyXG4gICAgICBpZiAodGFnLmNoZWNrZWQpIHtcclxuICAgICAgICB0aGlzLkFkZENhdGVnb3J5RmlsdGVycyhpZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5SZW1vdmVDYXRlZ29yeUZpbHRlcnMoaWQpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgQWRkUm91dGluZ1RvQnJhbmQodGFnOiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICB0YWcub25jbGljayA9IChlOiBFdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcclxuICAgICAgY29uc3QgaWQgPSAodGFyZ2V0IGFzIEhUTUxCdXR0b25FbGVtZW50KS5pZDtcclxuICAgICAgaWYgKHRhZy5jaGVja2VkKSB7XHJcbiAgICAgICAgdGhpcy5BZGRCcmFuZEZpbHRlcnMoaWQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUmVtb3ZlQnJhbmRGaWx0ZXJzKGlkKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIEFkZFJvdXRpbmdUb1ByaWNlTWluKE1pblByaWNlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuZmlsdGVycy5NaW5QcmljZSA9IE1pblByaWNlO1xyXG4gICAgdGhpcy5BZGRGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBBZGRSb3V0aW5nVG9QcmljZU1heChNYXhQcmljZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmZpbHRlcnMuTWF4UHJpY2UgPSBNYXhQcmljZTtcclxuICAgIHRoaXMuQWRkRmlsdGVycygpO1xyXG4gIH1cclxuXHJcbiAgQWRkUm91dGluZ1RvWWVhck1pbihNaW5ZZWFyOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuZmlsdGVycy5NaW5ZZWFyID0gTWluWWVhcjtcclxuICAgIHRoaXMuQWRkRmlsdGVycygpO1xyXG4gIH1cclxuXHJcbiAgQWRkUm91dGluZ1RvWWVhck1heChNYXhZZWFyOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuZmlsdGVycy5NYXhZZWFyID0gTWF4WWVhcjtcclxuICAgIHRoaXMuQWRkRmlsdGVycygpO1xyXG4gIH1cclxuXHJcbiAgQWRkUm91dGluZ1RvU2VhcmNoKHRleHQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5maWx0ZXJzLlNlYXJjaCA9IHRleHQ7XHJcbiAgICB0aGlzLkFkZEZpbHRlcnMoKTtcclxuICB9XHJcbiAgQWRkUm91dGluZ1RvU29ydChpZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmZpbHRlcnMuU29ydCA9IGlkO1xyXG4gICAgdGhpcy5BZGRGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBHZXRGaWx0ZXJzKGZpbHRlcnM6IGZpbHRlcnMpIHtcclxuICAgIHRoaXMuZmlsdGVycyA9IGZpbHRlcnM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSb3V0ZXI7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==