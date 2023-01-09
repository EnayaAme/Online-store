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
        // form.addEventListener('click', (e) => {
        //   if ((e.target as HTMLElement).id === 'card-ccv') {
        //     if (creditCard.classList.contains('hover')) creditCard.classList.remove('hover');
        //   }
        // })
        formCardCcvInput.maxLength = 3;
        formCardCcvInput.addEventListener('input', () => {
            const lastchar = formCardCcvInput.value[formCardCcvInput.value.length - 1];
            //console.log(lastchar);
            formCardCcvInput.value = formCardCcvInput.value.slice(0, -1);
            if (reg.test(lastchar)) {
                formCardCcvInput.value += lastchar;
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELG1CQUFtQixDQUFDLE9BQWU7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsbUJBQW1CLENBQUMsT0FBZTtRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxJQUFZO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNELGdCQUFnQixDQUFDLEVBQVU7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQWdCO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7Q0FDRjtBQUVELHFCQUFlLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNuUXRCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy9zdHlsZS5zY3NzP2JjM2IiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9BcHBseUZpbHRlcnMudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL3RzL0FwcGx5Um91dGluZy50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvQXBwbHlTb3J0LnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9CYXNrZXRQYWdlLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9DYXJkUGFnZS50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvQ2hlY2tvdXRQb3B1cC50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvQ29tcG9uZW50cy9DcmVhdGVDYXJ0SXRlbS50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvQ29tcG9uZW50cy9DcmVhdGVSYW5nZUJsb2NrLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9Db21wb25lbnRzL0NyZWF0ZVNlYXJjaEJhci50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvQ29tcG9uZW50cy9DcmVhdGVTb3J0TWVudS50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvQ3JlYXRlTGlzdE9mQ2FyZHMudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL3RzL0RlZmF1bHRQYWdlLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9FbGVtZW50cy9DcmVhdGVDaGVja2JveC50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvRWxlbWVudHMvQ3JlYXRlRWxlbWVudC50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvRWxlbWVudHMvQ3JlYXRlSW1hZ2UudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL3RzL0VsZW1lbnRzL0NyZWF0ZUxpbmsudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL3RzL0VsZW1lbnRzL0NyZWF0ZU51bWJlcklucHV0LnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy90cy9FbGVtZW50cy9DcmVhdGVSYWRpby50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvRWxlbWVudHMvQ3JlYXRlUmFuZ2UudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL3RzL0VsZW1lbnRzL0NyZWF0ZVRleHRJbnB1dC50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvZGF0YS50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvdHMvcm91dGUudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29ubGluZS1zdG9yZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29ubGluZS1zdG9yZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL29ubGluZS1zdG9yZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XG5pbXBvcnQgeyBBcHBseVJvdXRpbmcgfSBmcm9tICcuL3RzL0FwcGx5Um91dGluZyc7XG5pbXBvcnQgZGF0YSBmcm9tICcuL3RzL2RhdGEnO1xuXG5pbXBvcnQgQ3JlYXRlRGVmYXVsdFBhZ2UgZnJvbSAnLi90cy9EZWZhdWx0UGFnZSc7XG5pbXBvcnQgeyBDcmVhdGVFbGVtZW50IH0gZnJvbSAnLi90cy9FbGVtZW50cy9DcmVhdGVFbGVtZW50JztcblxuY29uc3QgcHJvZHVjdHMgPSBuZXcgZGF0YSgpO1xuY29uc3QgQXBwUm91dGluZyA9IG5ldyBBcHBseVJvdXRpbmcoKTtcblxuY29uc3QgbmV3YXJyID0gW107XG5uZXdhcnIucHVzaChwcm9kdWN0cy5HZXQoKVswXSk7XG5uZXdhcnIucHVzaChwcm9kdWN0cy5HZXQoKVsxXSk7XG5uZXdhcnIucHVzaChwcm9kdWN0cy5HZXQoKVsyXSk7XG5wcm9kdWN0cy5HZXRNaW5NYXhEYXRlKCk7XG5jb25zdCBoYXNoID0gbG9jYXRpb24uaGFzaDtcblxuY29uc3QgUGFnZSA9IG5ldyBDcmVhdGVEZWZhdWx0UGFnZSgpO1xuUGFnZS5DcmVhdGVIZWFkZXIoKTtcbkFwcFJvdXRpbmcuaW5pdChoYXNoKTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAnaGFzaGNoYW5nZScsXG4gICgpID0+IHtcbiAgICBBcHBSb3V0aW5nLmluaXQobG9jYXRpb24uaGFzaCk7XG4gIH0sXG4gIGZhbHNlXG4pO1xuIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9kYXRhJztcbmltcG9ydCB7IGZpbHRlcnMsIHByb2R1Y3QgfSBmcm9tICcuL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgY2xhc3MgQXBwbHlGaWx0ZXJzIHtcbiAgcHJpdmF0ZSBkYXRhID0gbmV3IGRhdGEoKTtcbiAgcHJpdmF0ZSBEYXRhQWZ0ZXJGaWx0ZXJzOiBwcm9kdWN0W10gPSBbXTtcbiAgLy9wcml2YXRlXG4gIGNvbnN0cnVjdG9yKGZpbHRlcnM6IGZpbHRlcnMpIHtcbiAgICB0aGlzLkRhdGFBZnRlckZpbHRlcnMgPSBuZXcgZGF0YSgpLkdldCgpO1xuICAgIGlmIChmaWx0ZXJzLkNhdGVnb3J5Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgdGhpcy5jYXRlZ29yeShmaWx0ZXJzLkNhdGVnb3J5KTtcbiAgICB9XG4gICAgaWYgKGZpbHRlcnMuQnJhbmQubGVuZ3RoICE9PSAwKSB7XG4gICAgICB0aGlzLmJyYW5kKGZpbHRlcnMuQnJhbmQpO1xuICAgIH1cbiAgICBpZiAoZmlsdGVycy5NaW5QcmljZSAhPT0gdGhpcy5kYXRhLkdldE1pbk1heFByaWNlKCkubWluIHx8IGZpbHRlcnMuTWF4UHJpY2UgIT09IHRoaXMuZGF0YS5HZXRNaW5NYXhQcmljZSgpLm1heCkge1xuICAgICAgdGhpcy5wcmljZShmaWx0ZXJzLk1pblByaWNlLCBmaWx0ZXJzLk1heFByaWNlKTtcbiAgICB9XG4gICAgaWYgKGZpbHRlcnMuTWluWWVhciAhPT0gdGhpcy5kYXRhLkdldE1pbk1heERhdGUoKS5taW4gfHwgZmlsdGVycy5NYXhZZWFyICE9PSB0aGlzLmRhdGEuR2V0TWluTWF4RGF0ZSgpLm1heCkge1xuICAgICAgdGhpcy5kYXRlKGZpbHRlcnMuTWluWWVhciwgZmlsdGVycy5NYXhZZWFyKTtcbiAgICB9XG4gICAgaWYgKGZpbHRlcnMuU2VhcmNoICE9PSAnJykge1xuICAgICAgdGhpcy5zZWFyY2goZmlsdGVycy5TZWFyY2gpO1xuICAgIH1cbiAgfVxuICByZXR1cm4oKSB7XG4gICAgcmV0dXJuIHRoaXMuRGF0YUFmdGVyRmlsdGVycztcbiAgfVxuICBjYXRlZ29yeShjYXRlZ29yaWVzOiBzdHJpbmdbXSkge1xuICAgIGNvbnN0IFRlbXBBcnJheTogcHJvZHVjdFtdID0gW107XG4gICAgY2F0ZWdvcmllcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICB0aGlzLkRhdGFBZnRlckZpbHRlcnMuZm9yRWFjaCgoaXQpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0gPT09IGl0LmNhdGVnb3J5KSB7XG4gICAgICAgICAgVGVtcEFycmF5LnB1c2goaXQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLkRhdGFBZnRlckZpbHRlcnMgPSBUZW1wQXJyYXk7XG4gIH1cbiAgYnJhbmQoYnJhbmRzOiBzdHJpbmdbXSkge1xuICAgIGNvbnN0IFRlbXBBcnJheTogcHJvZHVjdFtdID0gW107XG4gICAgYnJhbmRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHRoaXMuRGF0YUFmdGVyRmlsdGVycy5mb3JFYWNoKChpdCkgPT4ge1xuICAgICAgICBpZiAoaXRlbSA9PT0gaXQuYnJhbmQpIHtcbiAgICAgICAgICBUZW1wQXJyYXkucHVzaChpdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuRGF0YUFmdGVyRmlsdGVycyA9IFRlbXBBcnJheTtcbiAgfVxuICBwcmljZShtaW46IHN0cmluZywgbWF4OiBzdHJpbmcpIHtcbiAgICBjb25zdCBUZW1wQXJyYXk6IHByb2R1Y3RbXSA9IFtdO1xuICAgIHRoaXMuRGF0YUFmdGVyRmlsdGVycy5mb3JFYWNoKChpdCkgPT4ge1xuICAgICAgaWYgKCttaW4gPD0gaXQucHJpY2UgJiYgaXQucHJpY2UgPD0gK21heCkge1xuICAgICAgICBUZW1wQXJyYXkucHVzaChpdCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzID0gVGVtcEFycmF5O1xuICB9XG4gIGRhdGUobWluOiBzdHJpbmcsIG1heDogc3RyaW5nKSB7XG4gICAgY29uc3QgVGVtcEFycmF5OiBwcm9kdWN0W10gPSBbXTtcbiAgICB0aGlzLkRhdGFBZnRlckZpbHRlcnMuZm9yRWFjaCgoaXQpID0+IHtcbiAgICAgIGlmICgrbWluIDw9IGl0LkRhdGVPZklzc3VlICYmIGl0LkRhdGVPZklzc3VlIDw9ICttYXgpIHtcbiAgICAgICAgVGVtcEFycmF5LnB1c2goaXQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuRGF0YUFmdGVyRmlsdGVycyA9IFRlbXBBcnJheTtcbiAgfVxuICBzZWFyY2goc2VhcmNoOiBzdHJpbmcpIHtcbiAgICBzZWFyY2ggPSBzZWFyY2gudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBUZW1wQXJyYXk6IHByb2R1Y3RbXSA9IFtdO1xuICAgIHRoaXMuRGF0YUFmdGVyRmlsdGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5jYXRlZ29yeS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaCkpIHtcbiAgICAgICAgVGVtcEFycmF5LnB1c2goaXRlbSk7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0uYnJhbmQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2gpKSB7XG4gICAgICAgIFRlbXBBcnJheS5wdXNoKGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLnByaWNlLnRvU3RyaW5nKCkuaW5jbHVkZXMoc2VhcmNoKSkge1xuICAgICAgICBUZW1wQXJyYXkucHVzaChpdGVtKTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5EYXRlT2ZJc3N1ZS50b1N0cmluZygpLmluY2x1ZGVzKHNlYXJjaCkpIHtcbiAgICAgICAgVGVtcEFycmF5LnB1c2goaXRlbSk7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0ubW9kZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2gpKSB7XG4gICAgICAgIFRlbXBBcnJheS5wdXNoKGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLmRlc2NyaXB0aW9uLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoKSkge1xuICAgICAgICBUZW1wQXJyYXkucHVzaChpdGVtKTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5kaXNjb3VudFBlcmNlbnRhZ2UudG9TdHJpbmcoKS5pbmNsdWRlcyhzZWFyY2gpKSB7XG4gICAgICAgIFRlbXBBcnJheS5wdXNoKGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLnJhdGluZy50b1N0cmluZygpLmluY2x1ZGVzKHNlYXJjaCkpIHtcbiAgICAgICAgVGVtcEFycmF5LnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzID0gVGVtcEFycmF5O1xuICB9XG4gIHN3YXAoZmlyc3Q6IHByb2R1Y3QsIHNlY29uZDogcHJvZHVjdCkge1xuICAgIGNvbnN0IHRlbXA6IHByb2R1Y3QgPSBmaXJzdDtcbiAgICBmaXJzdCA9IHNlY29uZDtcbiAgICBzZWNvbmQgPSB0ZW1wO1xuICB9XG59XG4iLCJpbXBvcnQgeyBBcHBseUZpbHRlcnMgfSBmcm9tICcuL0FwcGx5RmlsdGVycyc7XG5pbXBvcnQgeyBBcHBseVNvcnQgfSBmcm9tICcuL0FwcGx5U29ydCc7XG5pbXBvcnQgeyBCYXNrZXRQYWdlIH0gZnJvbSAnLi9CYXNrZXRQYWdlJztcbmltcG9ydCB7IENhcmRQYWdlIH0gZnJvbSAnLi9DYXJkUGFnZSc7XG5pbXBvcnQgeyBDcmVhdGVDYXJ0SXRlbSB9IGZyb20gJy4vQ29tcG9uZW50cy9DcmVhdGVDYXJ0SXRlbSc7XG5pbXBvcnQgeyBDcmVhdGVMaXN0T2ZDYXJkcyB9IGZyb20gJy4vQ3JlYXRlTGlzdE9mQ2FyZHMnO1xuaW1wb3J0IGRhdGEgZnJvbSAnLi9kYXRhJztcbmltcG9ydCBDcmVhdGVEZWZhdWx0UGFnZSBmcm9tICcuL0RlZmF1bHRQYWdlJztcbmltcG9ydCB7IGZpbHRlcnMgfSBmcm9tICcuL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgY2xhc3MgQXBwbHlSb3V0aW5nIHtcbiAgcHJpdmF0ZSBNYWluUGFnZSA9IG5ldyBDcmVhdGVEZWZhdWx0UGFnZSgpO1xuICBwcml2YXRlIHByb2R1Y3RzID0gbmV3IGRhdGEoKTtcbiAgcHJpdmF0ZSBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgcHJpdmF0ZSBjaGVja2VyID0gZmFsc2U7XG4gIHByaXZhdGUgVG9QYWdlcyA9IGZhbHNlO1xuICBwcml2YXRlIGlzQ2hhbmdlUHJpY2UgPSBmYWxzZTtcbiAgcHJpdmF0ZSBMaW1pdFBhZ2UgPSB7XG4gICAgbGltaXQ6IDMsXG4gICAgcGFnZTogMSxcbiAgfTtcbiAgcHJpdmF0ZSBmaWx0ZXJzOiBmaWx0ZXJzID0ge1xuICAgIENhdGVnb3J5OiBbXSxcbiAgICBCcmFuZDogW10sXG4gICAgTWluUHJpY2U6IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4UHJpY2UoKS5taW4sXG4gICAgTWF4UHJpY2U6IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4UHJpY2UoKS5tYXgsXG4gICAgTWluWWVhcjogdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhEYXRlKCkubWluLFxuICAgIE1heFllYXI6IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4RGF0ZSgpLm1heCxcbiAgICBTZWFyY2g6ICcnLFxuICAgIFNvcnQ6ICdTb3J0IGJ5JyxcbiAgfTtcblxuICBpbml0KGhhc2g6IHN0cmluZykge1xuICAgIGlmIChoYXNoWzFdID09PSAnPycpIHtcbiAgICAgIHRoaXMuY3JlYXRlRmlsdGVycyhoYXNoKTtcbiAgICAgIGlmIChkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMl0pIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzWzJdLnJlbW92ZSgpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMl0ucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgICBjb25zdCBkYXRhID0gbmV3IEFwcGx5RmlsdGVycyh0aGlzLmZpbHRlcnMpLnJldHVybigpO1xuICAgICAgdGhpcy5NYWluUGFnZS5DcmVhdGVNYWluKHRoaXMuZmlsdGVycywgZGF0YSk7XG4gICAgICBjb25zdCBEYXRhU29ydCA9IG5ldyBBcHBseVNvcnQodGhpcy5maWx0ZXJzLlNvcnQsIGRhdGEpO1xuICAgICAgbmV3IENyZWF0ZUxpc3RPZkNhcmRzKERhdGFTb3J0LnJldHVybigpKTtcbiAgICAgIHRoaXMuTWFpblBhZ2UuQ3JlYXRlRm9vdGVyKCk7XG4gICAgfVxuICAgIGlmIChoYXNoLnNwbGl0KCctJylbMF0gPT09ICcjY2FyZCcpIHtcbiAgICAgIGlmICh0aGlzLmJvZHkuY2hpbGRyZW5bMV0gJiYgdGhpcy5ib2R5LmNoaWxkcmVuWzJdKSB7XG4gICAgICAgIHRoaXMuYm9keS5jaGlsZHJlblsyXS5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5ib2R5LmNoaWxkcmVuWzFdLnJlbW92ZSgpO1xuICAgICAgfVxuICAgICAgbmV3IENhcmRQYWdlKHRoaXMucHJvZHVjdHMuR2V0QnlJZChoYXNoLnNwbGl0KCctJylbMV0pKTtcbiAgICAgIHRoaXMuTWFpblBhZ2UuQ3JlYXRlRm9vdGVyKCk7XG4gICAgfVxuICAgIGlmIChoYXNoID09PSAnJykge1xuICAgICAgdGhpcy5Ub0RlZmF1bHRGaWx0ZXJzKCk7XG4gICAgICB0aGlzLk1haW5QYWdlID0gbmV3IENyZWF0ZURlZmF1bHRQYWdlKCk7XG4gICAgICBpZiAoZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzWzJdKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1syXS5yZW1vdmUoKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzWzJdLnJlbW92ZSgpO1xuICAgICAgfVxuICAgICAgY29uc3QgZGF0YSA9IG5ldyBBcHBseUZpbHRlcnModGhpcy5maWx0ZXJzKS5yZXR1cm4oKTtcblxuICAgICAgY29uc3QgRGF0YVNvcnQgPSBuZXcgQXBwbHlTb3J0KHRoaXMuZmlsdGVycy5Tb3J0LCBkYXRhKTtcbiAgICAgIHRoaXMuTWFpblBhZ2UuQ3JlYXRlTWFpbih0aGlzLmZpbHRlcnMsIERhdGFTb3J0LnJldHVybigpKTtcbiAgICAgIG5ldyBDcmVhdGVMaXN0T2ZDYXJkcyhEYXRhU29ydC5yZXR1cm4oKSk7XG4gICAgICB0aGlzLk1haW5QYWdlLkNyZWF0ZUZvb3RlcigpO1xuICAgICAgdGhpcy5jaGVja2VyID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGhhc2ggPT09ICcjYmFza2V0Jykge1xuICAgICAgdGhpcy5jaGVja2VyID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLmJvZHkuY2hpbGRyZW5bMV0gJiYgdGhpcy5ib2R5LmNoaWxkcmVuWzJdKSB7XG4gICAgICAgIHRoaXMuYm9keS5jaGlsZHJlblsyXS5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5ib2R5LmNoaWxkcmVuWzFdLnJlbW92ZSgpO1xuICAgICAgfVxuICAgICAgbmV3IEJhc2tldFBhZ2UoMywgMSk7XG4gICAgICBuZXcgQ3JlYXRlQ2FydEl0ZW0oMywgMSk7XG4gICAgICB0aGlzLk1haW5QYWdlLkNyZWF0ZUZvb3RlcigpO1xuICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmcm9tY2FyZCcpID09PSAndHJ1ZScpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1eWl0bm93QnRuJyk/LmNsaWNrKCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmcm9tY2FyZCcpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaGFzaFs3XSA9PT0gJyEnKSB7XG4gICAgICBpZiAodGhpcy5ib2R5LmNoaWxkcmVuWzFdICYmIHRoaXMuYm9keS5jaGlsZHJlblsyXSkge1xuICAgICAgICB0aGlzLmJvZHkuY2hpbGRyZW5bMl0ucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuYm9keS5jaGlsZHJlblsxXS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZpbHQgPSBoYXNoLnNwbGl0KCchJylbMV07XG4gICAgICBpZiAoZmlsdC5pbmNsdWRlcygnJicpKSB7XG4gICAgICAgIHRoaXMuTGltaXRQYWdlLmxpbWl0ID0gK2ZpbHQuc3BsaXQoJyYnKVswXS5zcGxpdCgnPScpWzFdO1xuICAgICAgICB0aGlzLkxpbWl0UGFnZS5wYWdlID0gK2ZpbHQuc3BsaXQoJyYnKVsxXS5zcGxpdCgnPScpWzFdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZpbHQuaW5jbHVkZXMoJ2xpbWl0JykpIHtcbiAgICAgICAgICB0aGlzLkxpbWl0UGFnZS5saW1pdCA9ICtmaWx0LnNwbGl0KCc9JylbMV07XG4gICAgICAgICAgdGhpcy5MaW1pdFBhZ2UucGFnZSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5MaW1pdFBhZ2UucGFnZSA9ICtmaWx0LnNwbGl0KCc9JylbMV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vY29uc29sZS5sb2codGhpcy5MaW1pdFBhZ2UpO1xuICAgICAgbmV3IEJhc2tldFBhZ2UodGhpcy5MaW1pdFBhZ2UubGltaXQsIHRoaXMuTGltaXRQYWdlLnBhZ2UpO1xuICAgICAgbmV3IENyZWF0ZUNhcnRJdGVtKHRoaXMuTGltaXRQYWdlLmxpbWl0LCB0aGlzLkxpbWl0UGFnZS5wYWdlKTtcbiAgICAgIHRoaXMuTWFpblBhZ2UuQ3JlYXRlRm9vdGVyKCk7XG4gICAgfVxuICAgIC8vL2ZpbHRlcnMvLy9cblxuICAgIC8vL0NhdGVnb3J5Ly8vXG4gICAgLy8gaWYgKGlkLnNwbGl0KCc9JylbMF0gPT09ICdDYXRlZ29yeScpIHtcbiAgICAvLyAgIGlmKCF0aGlzLmZpbHRlcnMuQ2F0ZWdvcnkuaW5jbHVkZXMoaWQuc3BsaXQoJz0nKVsxXSkpe1xuICAgIC8vICAgICB0aGlzLmZpbHRlcnMuQ2F0ZWdvcnkucHVzaChpZC5zcGxpdCgnPScpWzFdKTtcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gICAgLy8gaWYgKHRoaXMuY2hlY2tlciA9PT0gZmFsc2UpIHtcbiAgICAvLyB9XG4gIH1cblxuICBjcmVhdGVGaWx0ZXJzKGhhc2g6IHN0cmluZykge1xuICAgIGNvbnN0IEFycmF5RmlsdGVyczogc3RyaW5nW10gPSBoYXNoLnNsaWNlKDIpLnNwbGl0KCcmJyk7XG4gICAgdGhpcy5Ub0RlZmF1bHRGaWx0ZXJzKCk7XG4gICAgQXJyYXlGaWx0ZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGtleTogc3RyaW5nID0gaXRlbS5zcGxpdCgnPScpWzBdO1xuICAgICAgY29uc3QgdmFsdWVzOiBzdHJpbmcgPSBpdGVtLnNwbGl0KCc9JylbMV07XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlICdDYXRlZ29yeSc6XG4gICAgICAgICAgdGhpcy5maWx0ZXJzLkNhdGVnb3J5ID0gdmFsdWVzLnNwbGl0KCcrJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0JyYW5kJzpcbiAgICAgICAgICB0aGlzLmZpbHRlcnMuQnJhbmQgPSB2YWx1ZXMuc3BsaXQoJysnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnUHJpY2UnOlxuICAgICAgICAgIHRoaXMuZmlsdGVycy5NaW5QcmljZSA9IHZhbHVlcy5zcGxpdCgnKycpWzBdO1xuICAgICAgICAgIHRoaXMuZmlsdGVycy5NYXhQcmljZSA9IHZhbHVlcy5zcGxpdCgnKycpWzFdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdEYXRlJzpcbiAgICAgICAgICB0aGlzLmZpbHRlcnMuTWluWWVhciA9IHZhbHVlcy5zcGxpdCgnKycpWzBdO1xuICAgICAgICAgIHRoaXMuZmlsdGVycy5NYXhZZWFyID0gdmFsdWVzLnNwbGl0KCcrJylbMV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1NlYXJjaCc6XG4gICAgICAgICAgdGhpcy5maWx0ZXJzLlNlYXJjaCA9IGRlY29kZVVSSSh2YWx1ZXMpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdTb3J0JzpcbiAgICAgICAgICB0aGlzLmZpbHRlcnMuU29ydCA9IHZhbHVlcztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBUb0RlZmF1bHRGaWx0ZXJzKCkge1xuICAgIHRoaXMuZmlsdGVycy5CcmFuZCA9IFtdO1xuICAgIHRoaXMuZmlsdGVycy5DYXRlZ29yeSA9IFtdO1xuICAgIHRoaXMuZmlsdGVycy5NaW5QcmljZSA9IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4UHJpY2UoKS5taW47XG4gICAgdGhpcy5maWx0ZXJzLk1heFByaWNlID0gdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhQcmljZSgpLm1heDtcbiAgICB0aGlzLmZpbHRlcnMuTWluWWVhciA9IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4RGF0ZSgpLm1pbjtcbiAgICB0aGlzLmZpbHRlcnMuTWF4WWVhciA9IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4RGF0ZSgpLm1heDtcbiAgICB0aGlzLmZpbHRlcnMuU2VhcmNoID0gJyc7XG4gICAgdGhpcy5maWx0ZXJzLlNvcnQgPSAnU29ydCBieSc7XG4gIH1cbn1cbiIsImltcG9ydCB7IHByb2R1Y3QgfSBmcm9tICcuL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgY2xhc3MgQXBwbHlTb3J0IHtcbiAgcHJpdmF0ZSBEYXRhQWZ0ZXJGaWx0ZXJzOiBwcm9kdWN0W10gPSBbXTtcbiAgLy9wcml2YXRlXG4gIGNvbnN0cnVjdG9yKHNvcnQ6IHN0cmluZywgcHJvZHVjdHM6IHByb2R1Y3RbXSkge1xuICAgIHRoaXMuRGF0YUFmdGVyRmlsdGVycyA9IHByb2R1Y3RzO1xuICAgIGlmIChzb3J0ICE9PSAnU29ydCBieScpIHtcbiAgICAgIHN3aXRjaCAoc29ydCkge1xuICAgICAgICBjYXNlICdSYXRpbmcnOlxuICAgICAgICAgIHRoaXMuU29ydEJ5UmF0aW5nKHRoaXMuRGF0YUFmdGVyRmlsdGVycyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1ByaWNlVEgnOlxuICAgICAgICAgIHRoaXMuU29ydEJ5UHJpY2VMdG9IKHRoaXMuRGF0YUFmdGVyRmlsdGVycyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1ByaWNlVEwnOlxuICAgICAgICAgIHRoaXMuU29ydEJ5UHJpY2VIdG9MKHRoaXMuRGF0YUFmdGVyRmlsdGVycyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1JEJzpcbiAgICAgICAgICB0aGlzLlNvcnRCeVJlbGVhc2VEYXRlKHRoaXMuRGF0YUFmdGVyRmlsdGVycyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy90aGlzLlNvcnRCeUlEKHRoaXMuRGF0YUFmdGVyRmlsdGVycyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzb3J0ID09PSAnU29ydCBieScpIHtcbiAgICAgIHRoaXMuU29ydEJ5SUQodGhpcy5EYXRhQWZ0ZXJGaWx0ZXJzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4oKSB7XG4gICAgcmV0dXJuIHRoaXMuRGF0YUFmdGVyRmlsdGVycztcbiAgfVxuXG4gIFNvcnRCeVJhdGluZyhwcm9kdWN0czogcHJvZHVjdFtdKSB7XG4gICAgbGV0IGNvdW50ZXIgPSAxO1xuICAgIGxldCB0ZW1wOiBwcm9kdWN0O1xuICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcHJvZHVjdHMubGVuZ3RoOyBrKyspIHtcbiAgICAgIGZvciAobGV0IGkgPSBjb3VudGVyOyBpIDwgcHJvZHVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHByb2R1Y3RzW2tdLnJhdGluZyA+IHByb2R1Y3RzW2ldLnJhdGluZykge1xuICAgICAgICAgIHRlbXAgPSBwcm9kdWN0c1trXTtcbiAgICAgICAgICBwcm9kdWN0c1trXSA9IHByb2R1Y3RzW2ldO1xuICAgICAgICAgIHByb2R1Y3RzW2ldID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY291bnRlciArPSAxO1xuICAgIH1cbiAgfVxuXG4gIFNvcnRCeUlEKHByb2R1Y3RzOiBwcm9kdWN0W10pIHtcbiAgICBsZXQgY291bnRlciA9IDE7XG4gICAgbGV0IHRlbXA6IHByb2R1Y3Q7XG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCBwcm9kdWN0cy5sZW5ndGg7IGsrKykge1xuICAgICAgZm9yIChsZXQgaSA9IGNvdW50ZXI7IGkgPCBwcm9kdWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocHJvZHVjdHNba10uaWQgPiBwcm9kdWN0c1tpXS5pZCkge1xuICAgICAgICAgIHRlbXAgPSBwcm9kdWN0c1trXTtcbiAgICAgICAgICBwcm9kdWN0c1trXSA9IHByb2R1Y3RzW2ldO1xuICAgICAgICAgIHByb2R1Y3RzW2ldID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY291bnRlciArPSAxO1xuICAgIH1cbiAgfVxuXG4gIFNvcnRCeVByaWNlTHRvSChwcm9kdWN0czogcHJvZHVjdFtdKSB7XG4gICAgbGV0IGNvdW50ZXIgPSAxO1xuICAgIGxldCB0ZW1wOiBwcm9kdWN0O1xuICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcHJvZHVjdHMubGVuZ3RoOyBrKyspIHtcbiAgICAgIGZvciAobGV0IGkgPSBjb3VudGVyOyBpIDwgcHJvZHVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHByb2R1Y3RzW2tdLnByaWNlID4gcHJvZHVjdHNbaV0ucHJpY2UpIHtcbiAgICAgICAgICB0ZW1wID0gcHJvZHVjdHNba107XG4gICAgICAgICAgcHJvZHVjdHNba10gPSBwcm9kdWN0c1tpXTtcbiAgICAgICAgICBwcm9kdWN0c1tpXSA9IHRlbXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvdW50ZXIgKz0gMTtcbiAgICB9XG4gIH1cblxuICBTb3J0QnlQcmljZUh0b0wocHJvZHVjdHM6IHByb2R1Y3RbXSkge1xuICAgIGxldCBjb3VudGVyID0gMTtcbiAgICBsZXQgdGVtcDogcHJvZHVjdDtcbiAgICBmb3IgKGxldCBrID0gMDsgayA8IHByb2R1Y3RzLmxlbmd0aDsgaysrKSB7XG4gICAgICBmb3IgKGxldCBpID0gY291bnRlcjsgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwcm9kdWN0c1trXS5wcmljZSA8IHByb2R1Y3RzW2ldLnByaWNlKSB7XG4gICAgICAgICAgdGVtcCA9IHByb2R1Y3RzW2tdO1xuICAgICAgICAgIHByb2R1Y3RzW2tdID0gcHJvZHVjdHNbaV07XG4gICAgICAgICAgcHJvZHVjdHNbaV0gPSB0ZW1wO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb3VudGVyICs9IDE7XG4gICAgfVxuICB9XG5cbiAgU29ydEJ5UmVsZWFzZURhdGUocHJvZHVjdHM6IHByb2R1Y3RbXSkge1xuICAgIGxldCBjb3VudGVyID0gMTtcbiAgICBsZXQgdGVtcDogcHJvZHVjdDtcbiAgICBmb3IgKGxldCBrID0gMDsgayA8IHByb2R1Y3RzLmxlbmd0aDsgaysrKSB7XG4gICAgICBmb3IgKGxldCBpID0gY291bnRlcjsgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwcm9kdWN0c1trXS5EYXRlT2ZJc3N1ZSA+IHByb2R1Y3RzW2ldLkRhdGVPZklzc3VlKSB7XG4gICAgICAgICAgdGVtcCA9IHByb2R1Y3RzW2tdO1xuICAgICAgICAgIHByb2R1Y3RzW2tdID0gcHJvZHVjdHNbaV07XG4gICAgICAgICAgcHJvZHVjdHNbaV0gPSB0ZW1wO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb3VudGVyICs9IDE7XG4gICAgfVxuICB9XG5cbiAgc3dhcChmaXJzdDogcHJvZHVjdCwgc2Vjb25kOiBwcm9kdWN0KSB7XG4gICAgY29uc3QgdGVtcDogcHJvZHVjdCA9IGZpcnN0O1xuICAgIGZpcnN0ID0gc2Vjb25kO1xuICAgIHNlY29uZCA9IHRlbXA7XG4gIH1cbn1cbiIsImltcG9ydCB7IENyZWF0ZUNoZWNrb3V0UG9wdXAgfSBmcm9tICcuL0NoZWNrb3V0UG9wdXAnO1xuaW1wb3J0IHsgQ3JlYXRlRWxlbWVudCB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlRWxlbWVudCc7XG5pbXBvcnQgeyBDcmVhdGVUZXh0SW5wdXQgfSBmcm9tICcuL0VsZW1lbnRzL0NyZWF0ZVRleHRJbnB1dCc7XG5pbXBvcnQgeyBwcm9kdWN0IH0gZnJvbSAnLi9JbnRlcmZhY2VzJztcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi9yb3V0ZSc7XG5cbmV4cG9ydCBjbGFzcyBCYXNrZXRQYWdlIHtcbiAgcHJpdmF0ZSByb3V0ZSA9IG5ldyBSb3V0ZXIoKTtcbiAgY29uc3RydWN0b3IoRGVmYXVsdExpbWl0OiBudW1iZXIsIERlZmF1bHRQYWdlOiBudW1iZXIpIHtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykgIT09IG51bGwgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJyk/Lmxlbmd0aCAhPT0gMikge1xuICAgICAgbGV0IFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZTogcHJvZHVjdFtdID0gW107XG4gICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpISk7XG4gICAgICBjb25zdCBwYWdlcyA9IE1hdGguY2VpbChQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UubGVuZ3RoIC8gRGVmYXVsdExpbWl0KTtcbiAgICAgIGxldCB0b3RhbHByaWNlID0gMDtcbiAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHRvdGFscHJpY2UgKz0gaXRlbS5jb3VudGVyICogaXRlbS5wcmljZTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgICBjb25zdCBtYWluID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdtYWluJywgY2xhc3NOYW1lOiAnbWFpbicgfSkuZ2V0bm9kZSgpO1xuICAgICAgYm9keS5hcHBlbmQobWFpbik7XG4gICAgICBjb25zdCB3cmFwcGVyID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICd3cmFwcGVyIG1haW5fX3dyYXBwZXIgY2FydF9fd3JhcHBlcicgfSkuZ2V0bm9kZSgpO1xuICAgICAgbWFpbi5hcHBlbmQod3JhcHBlcik7XG5cbiAgICAgIGNvbnN0IG1lbnUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ21lbnUnIH0pLmdldG5vZGUoKTtcbiAgICAgIC8vIHdyYXBwZXIuYXBwZW5kKG1lbnUpO1xuICAgICAgLy9jb25zdCBUZXh0TWVudSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnaDInLCBjbGFzc05hbWU6ICd0ZXh0bWVudScsIGNvbnRlbnQ6ICdQcm9kdWN0cyBJbiBDYXJ0JyB9KS5nZXRub2RlKCk7XG4gICAgICBjb25zdCBsaW1pdCA9IG5ldyBDcmVhdGVUZXh0SW5wdXQoe1xuICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgcGxhY2Vob2xkZXI6ICczJyxcbiAgICAgICAgY2xhc3NOYW1lOiAnbGltaXQnLFxuICAgICAgICBuYW1lOiAnbGltaXQnLFxuICAgICAgfSkuZ2V0bm9kZSgpO1xuICAgICAgY29uc3QgcGFnZSA9IG5ldyBDcmVhdGVUZXh0SW5wdXQoeyB0eXBlOiAnbnVtYmVyJywgcGxhY2Vob2xkZXI6ICcxJywgY2xhc3NOYW1lOiAncGFnZScsIG5hbWU6ICdwYWdlJyB9KS5nZXRub2RlKCk7XG4gICAgICBjb25zdCBMaW1pdFNwYW4gPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBjb250ZW50OiAnTGltaXQ6JyB9KS5nZXRub2RlKCk7XG4gICAgICBjb25zdCBQYWdlU3BhbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNvbnRlbnQ6ICdQYWdlOicgfSkuZ2V0bm9kZSgpO1xuICAgICAgbGltaXQudmFsdWUgPSBEZWZhdWx0TGltaXQudG9TdHJpbmcoKTtcbiAgICAgIGxpbWl0Lm1pbiA9ICcxJztcbiAgICAgIGxpbWl0Lm1heCA9IFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5sZW5ndGgudG9TdHJpbmcoKTtcbiAgICAgIHBhZ2UudmFsdWUgPSBEZWZhdWx0UGFnZS50b1N0cmluZygpO1xuICAgICAgcGFnZS5taW4gPSAnMSc7XG4gICAgICBwYWdlLm1heCA9IHBhZ2VzLnRvU3RyaW5nKCk7XG4gICAgICBsaW1pdC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgdGhpcy5yb3V0ZS5BZGRSb3V0aW5nSW5CYXNrZXQoK2xpbWl0LnZhbHVlLCArcGFnZS52YWx1ZSk7XG4gICAgICAgIC8vY29uc29sZS5sb2coZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JylbMV0udmFsdWUpXG4gICAgICB9KTtcbiAgICAgIHBhZ2UuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMucm91dGUuQWRkUm91dGluZ0luQmFza2V0KCtsaW1pdC52YWx1ZSwgK3BhZ2UudmFsdWUpO1xuICAgICAgfSk7XG4gICAgICBtZW51LmFwcGVuZCgvKlRleHRNZW51Ki8gTGltaXRTcGFuLCBsaW1pdCwgUGFnZVNwYW4sIHBhZ2UpO1xuXG4gICAgICBjb25zdCBMaXN0T2ZQcm9kdWN0cyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnY2FydF9faXRlbXMnLCBpZDogJ2NhcnQtaXRlbXMnIH0pLmdldG5vZGUoKTtcbiAgICAgIGNvbnN0IHN1bW1hcnkgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2NhcnRfX3N1bW1hcnknIH0pLmdldG5vZGUoKTtcbiAgICAgIExpc3RPZlByb2R1Y3RzLmFwcGVuZChtZW51KTtcbiAgICAgIC8vLy8vLyBTVU1NQVJZIC8vLy8vL1xuICAgICAgY29uc3Qgc3VtbWFyeVdyYXBwZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N1bW1hcnlfX3dyYXBwZXInIH0pLmdldG5vZGUoKTtcbiAgICAgIHN1bW1hcnkuYXBwZW5kKHN1bW1hcnlXcmFwcGVyKTtcbiAgICAgIGNvbnN0IHByb21vY29kZSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc3VtbWFyeV9fcHJvbW9jb2RlJyB9KS5nZXRub2RlKCk7XG4gICAgICBjb25zdCBwcm9tb2NvZGVUaXRsZSA9IG5ldyBDcmVhdGVFbGVtZW50KHtcbiAgICAgICAgdGFnOiAnc3BhbicsXG4gICAgICAgIGNsYXNzTmFtZTogJ3N1bW1hcnlfX3RpdGxlJyxcbiAgICAgICAgY29udGVudDogJ1Byb21vIENvZGUnLFxuICAgICAgfSkuZ2V0bm9kZSgpO1xuICAgICAgY29uc3QgcHJvbW9jb2RlQXJlYSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc3VtbWFyeV9fcHJvbW9jb2RlLWFyZWEnIH0pLmdldG5vZGUoKTtcbiAgICAgIGNvbnN0IHByb21vY29kZUlucHV0ID0gbmV3IENyZWF0ZVRleHRJbnB1dCh7XG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgcGxhY2Vob2xkZXI6ICdiYWxheG9uIHwgZW5heWFhbWUnLFxuICAgICAgICBuYW1lOiAncHJvbW9jb2RlJyxcbiAgICAgICAgY2xhc3NOYW1lOiAnc3VtbWFyeV9fcHJvbW9jb2RlLWlucHV0JyxcbiAgICAgIH0pLmdldG5vZGUoKTtcbiAgICAgIGNvbnN0IHByb21vY29kZUJ1dHRvbiA9IG5ldyBDcmVhdGVFbGVtZW50KHtcbiAgICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgICAgY2xhc3NOYW1lOiAnc3VtbWFyeV9fcHJvbW9jb2RlLWJ1dHRvbicsXG4gICAgICAgIGNvbnRlbnQ6ICdhZGQnLFxuICAgICAgfSkuZ2V0bm9kZSgpO1xuICAgICAgY29uc3QgcHJvbW9jb2RlVGV4dEFyZWEgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N1bW1hcnlfX3RleHQtYXJlYScgfSkuZ2V0bm9kZSgpO1xuICAgICAgcHJvbW9jb2RlQXJlYS5hcHBlbmQocHJvbW9jb2RlSW5wdXQsIHByb21vY29kZUJ1dHRvbik7XG4gICAgICBwcm9tb2NvZGUuYXBwZW5kKHByb21vY29kZVRpdGxlLCBwcm9tb2NvZGVBcmVhLCBwcm9tb2NvZGVUZXh0QXJlYSk7XG4gICAgICBjb25zdCBvcmRlclN1bW1hcnkgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N1bW1hcnlfX29yZGVyLXN1bW1hcnknIH0pLmdldG5vZGUoKTtcbiAgICAgIGNvbnN0IG9yZGVyVGl0bGUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XG4gICAgICAgIHRhZzogJ3NwYW4nLFxuICAgICAgICBjbGFzc05hbWU6ICdzdW1tYXJ5X190aXRsZScsXG4gICAgICAgIGNvbnRlbnQ6ICdPcmRlciBzdW1tYXJ5JyxcbiAgICAgIH0pLmdldG5vZGUoKTtcbiAgICAgIGNvbnN0IG9yZGVyVGV4dEFyZWEgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N1bW1hcnlfX3RleHQtYXJlYScgfSkuZ2V0bm9kZSgpO1xuICAgICAgY29uc3Qgb3JkZXJTdWJ0b3RhbCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc3VtbWFyeV9fbGknIH0pLmdldG5vZGUoKTtcbiAgICAgIGNvbnN0IHN1bW1hcnlPcmRlcjFMZWZ0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY29udGVudDogJ1N1YnRvdGFsJyB9KS5nZXRub2RlKCk7XG4gICAgICBjb25zdCBzdW1tYXJ5T3JkZXIxUmlnaHQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N1bW1hcnlfX3ByaWNlLWNoYW5nZScgfSkuZ2V0bm9kZSgpO1xuICAgICAgY29uc3Qgc3VtbWFyeVByaWNlID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xuICAgICAgICB0YWc6ICdzcGFuJyxcbiAgICAgICAgY29udGVudDogJyQgJyArIHRvdGFscHJpY2UudG9TdHJpbmcoKSxcbiAgICAgICAgaWQ6ICdzdWJ0b3RhbC1wcmljZScsXG4gICAgICB9KS5nZXRub2RlKCk7XG4gICAgICBzdW1tYXJ5T3JkZXIxUmlnaHQuYXBwZW5kKHN1bW1hcnlQcmljZSk7XG4gICAgICBvcmRlclN1YnRvdGFsLmFwcGVuZChzdW1tYXJ5T3JkZXIxTGVmdCwgc3VtbWFyeU9yZGVyMVJpZ2h0KTtcbiAgICAgIGNvbnN0IG9yZGVyU2hpcHBpbmcgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N1bW1hcnlfX2xpJyB9KS5nZXRub2RlKCk7XG4gICAgICBjb25zdCBzdW1tYXJ5T3JkZXIyTGVmdCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNvbnRlbnQ6ICdTaGlwcGluZycgfSkuZ2V0bm9kZSgpO1xuICAgICAgY29uc3Qgc3VtbWFyeU9yZGVyMlJpZ2h0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY29udGVudDogJyQgMjAnIH0pLmdldG5vZGUoKTtcblxuICAgICAgb3JkZXJTaGlwcGluZy5hcHBlbmQoc3VtbWFyeU9yZGVyMkxlZnQsIHN1bW1hcnlPcmRlcjJSaWdodCk7XG4gICAgICBvcmRlclRleHRBcmVhLmFwcGVuZChvcmRlclN1YnRvdGFsLCBvcmRlclNoaXBwaW5nKTtcbiAgICAgIG9yZGVyU3VtbWFyeS5hcHBlbmQob3JkZXJUaXRsZSwgb3JkZXJUZXh0QXJlYSk7XG5cbiAgICAgIGNvbnN0IHRvdGFsID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzdW1tYXJ5X190b3RhbCcgfSkuZ2V0bm9kZSgpO1xuICAgICAgY29uc3QgdG90YWxUaXRsZSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNsYXNzTmFtZTogJ3N1bW1hcnlfX3RpdGxlJywgY29udGVudDogJ1RvdGFsJyB9KS5nZXRub2RlKCk7XG4gICAgICBjb25zdCB0b3RhbFByaWNlID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xuICAgICAgICB0YWc6ICdzcGFuJyxcbiAgICAgICAgY2xhc3NOYW1lOiAnc3VtbWFyeV9fdGl0bGUnLFxuICAgICAgICBjb250ZW50OiAnJCAnICsgKHRvdGFscHJpY2UgKyAyMCkudG9TdHJpbmcoKSxcbiAgICAgICAgaWQ6ICdzdW1tYXJ5LXRvdGFsJyxcbiAgICAgIH0pLmdldG5vZGUoKTtcblxuICAgICAgdG90YWwuYXBwZW5kKHRvdGFsVGl0bGUsIHRvdGFsUHJpY2UpO1xuXG4gICAgICBjb25zdCBjaGVja291dEJ1dHRvbiA9IG5ldyBDcmVhdGVFbGVtZW50KHtcbiAgICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgICAgY2xhc3NOYW1lOiAnc3VtbWFyeV9fY2hlY2tvdXQtYnV0dG9uJyxcbiAgICAgICAgaWQ6ICdidXlpdG5vd0J0bicsXG4gICAgICAgIGNvbnRlbnQ6ICdHbyB0byBjaGVja291dCcsXG4gICAgICB9KS5nZXRub2RlKCk7XG5cbiAgICAgIHN1bW1hcnlXcmFwcGVyLmFwcGVuZChwcm9tb2NvZGUsIG9yZGVyU3VtbWFyeSwgdG90YWwsIGNoZWNrb3V0QnV0dG9uKTtcbiAgICAgIHdyYXBwZXIuYXBwZW5kKExpc3RPZlByb2R1Y3RzLCBzdW1tYXJ5KTtcblxuICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgY2hlY2tvdXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICBjb25zdCBvdmVybGF5ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fb3ZlcmxheScgfSkuZ2V0bm9kZSgpO1xuICAgICAgICBjb25zdCBwb3B1cCA9IG5ldyBDcmVhdGVDaGVja291dFBvcHVwKCkuZ2V0bm9kZSgpO1xuICAgICAgICBvdmVybGF5LmFwcGVuZChwb3B1cCk7XG4gICAgICAgIGJvZHkuYXBwZW5kKG92ZXJsYXkpO1xuICAgICAgICBib2R5LnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nO1xuICAgICAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoKGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QuY29udGFpbnMoJ3BvcHVwX19vdmVybGF5JykpIHtcbiAgICAgICAgICAgIHBvcHVwLnJlbW92ZSgpO1xuICAgICAgICAgICAgb3ZlcmxheS5yZW1vdmUoKTtcbiAgICAgICAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3dZID0gJ2F1dG8nO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgbGV0IGJhbGF4b24gPSAnJztcbiAgICAgIGxldCBlbmF5YWFtZSA9ICcnO1xuICAgICAgbGV0IGJhbGF4b25Db3VudGVyID0gMDtcbiAgICAgIGxldCBlbmF5YWFtZUNvdW50ZXIgPSAwO1xuICAgICAgbGV0IHNhbGUgPSAwO1xuICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmFsYXhvbicpICE9PSBudWxsKSB7XG4gICAgICAgIGJhbGF4b24gPSAnYmFsYXhvbic7XG4gICAgICAgIGJhbGF4b25Db3VudGVyID0gK3dpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmFsYXhvbicpITtcbiAgICAgIH1cbiAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2VuYXlhYW1lJykgIT09IG51bGwpIHtcbiAgICAgICAgZW5heWFhbWUgPSAnZW5heWFhbWUnO1xuICAgICAgICBlbmF5YWFtZUNvdW50ZXIgPSArd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlbmF5YWFtZScpITtcbiAgICAgIH1cblxuICAgICAgaWYgKGJhbGF4b24gPT09ICdiYWxheG9uJyAmJiBiYWxheG9uQ291bnRlciA9PT0gMSkge1xuICAgICAgICBjb25zdCBwcm9tb2NvZGUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N1bW1hcnlfX2xpJyB9KS5nZXRub2RlKCk7XG4gICAgICAgIGNvbnN0IHN1bW1hcnlQcm9tb2NvZGUxTGVmdCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNvbnRlbnQ6IGJhbGF4b24gfSkuZ2V0bm9kZSgpO1xuICAgICAgICBjb25zdCBzdW1tYXJ5UHJvbW9jb2RlMVJpZ2h0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY29udGVudDogJy0xMCUnIH0pLmdldG5vZGUoKTtcbiAgICAgICAgY29uc3QgYmFsYXhvbkRlbCA9IG5ldyBDcmVhdGVFbGVtZW50KHtcbiAgICAgICAgICB0YWc6ICdidXR0b24nLFxuICAgICAgICAgIGNsYXNzTmFtZTogJ3N1bW1hcnlfX3Byb21vY29kZS1idXR0b24nLFxuICAgICAgICAgIGNvbnRlbnQ6ICdkZWwnLFxuICAgICAgICB9KS5nZXRub2RlKCk7XG4gICAgICAgIGJhbGF4b25EZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdiYWxheG9uJyk7XG4gICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBwcm9tb2NvZGUuYXBwZW5kKHN1bW1hcnlQcm9tb2NvZGUxTGVmdCwgc3VtbWFyeVByb21vY29kZTFSaWdodCwgYmFsYXhvbkRlbCk7XG4gICAgICAgIHByb21vY29kZVRleHRBcmVhLmFwcGVuZChwcm9tb2NvZGUpO1xuICAgICAgICBzYWxlICs9IDAuMTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVuYXlhYW1lID09PSAnZW5heWFhbWUnICYmIGVuYXlhYW1lQ291bnRlciA9PT0gMSkge1xuICAgICAgICBjb25zdCBwcm9tb2NvZGUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N1bW1hcnlfX2xpJyB9KS5nZXRub2RlKCk7XG4gICAgICAgIGNvbnN0IHN1bW1hcnlQcm9tb2NvZGUxTGVmdCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNvbnRlbnQ6IGVuYXlhYW1lIH0pLmdldG5vZGUoKTtcbiAgICAgICAgY29uc3Qgc3VtbWFyeVByb21vY29kZTFSaWdodCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGNvbnRlbnQ6ICctMTAlJyB9KS5nZXRub2RlKCk7XG4gICAgICAgIGNvbnN0IGVuYXlhYW1lRGVsID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xuICAgICAgICAgIHRhZzogJ2J1dHRvbicsXG4gICAgICAgICAgY2xhc3NOYW1lOiAnc3VtbWFyeV9fcHJvbW9jb2RlLWJ1dHRvbicsXG4gICAgICAgICAgY29udGVudDogJ2RlbCcsXG4gICAgICAgIH0pLmdldG5vZGUoKTtcbiAgICAgICAgZW5heWFhbWVEZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdlbmF5YWFtZScpO1xuICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJvbW9jb2RlLmFwcGVuZChzdW1tYXJ5UHJvbW9jb2RlMUxlZnQsIHN1bW1hcnlQcm9tb2NvZGUxUmlnaHQsIGVuYXlhYW1lRGVsKTtcbiAgICAgICAgcHJvbW9jb2RlVGV4dEFyZWEuYXBwZW5kKHByb21vY29kZSk7XG4gICAgICAgIHNhbGUgKz0gMC4xO1xuICAgICAgfVxuXG4gICAgICBpZiAoZW5heWFhbWUgPT09ICdlbmF5YWFtZScgfHwgYmFsYXhvbiA9PT0gJ2JhbGF4b24nKSB7XG4gICAgICAgIGNvbnN0IHN1bW1hcnlQcmljZSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnc3BhbicsIGlkOiAnc3VtbWFyeS1wcmljZScgfSkuZ2V0bm9kZSgpO1xuICAgICAgICBzdW1tYXJ5T3JkZXIxUmlnaHQuYXBwZW5kKHN1bW1hcnlQcmljZSk7XG4gICAgICAgIC8vY29uc3QgbmV3UHJpY2UgPSAgKE51bWJlcihzdW1tYXJ5UHJpY2UucHJldmlvdXNFbGVtZW50U2libGluZyEudGV4dENvbnRlbnQ/LnNsaWNlKDIpKSAtIChOdW1iZXIoc3VtbWFyeVByaWNlLnByZXZpb3VzRWxlbWVudFNpYmxpbmchLnRleHRDb250ZW50Py5zbGljZSgyKSkgLyAxMDAgKiAxMCkpLnRvRml4ZWQoMik7XG4gICAgICAgIHN1bW1hcnlQcmljZS50ZXh0Q29udGVudCA9ICckICcgKyAodG90YWxwcmljZSAtIHRvdGFscHJpY2UgKiBzYWxlKTtcbiAgICAgICAgdG90YWxQcmljZS50ZXh0Q29udGVudCA9ICckICcgKyAoMjAgKyAodG90YWxwcmljZSAtIHRvdGFscHJpY2UgKiBzYWxlKSkudG9GaXhlZCgyKTtcbiAgICAgICAgc3VtbWFyeVByaWNlLnByZXZpb3VzRWxlbWVudFNpYmxpbmchLmNsYXNzTGlzdC5hZGQoJ3ByaWNlLWNoYW5nZWQnKTtcbiAgICAgIH1cblxuICAgICAgcHJvbW9jb2RlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKHByb21vY29kZUlucHV0LnZhbHVlID09PSAnYmFsYXhvbicgJiYgYmFsYXhvbkNvdW50ZXIgPT09IDApIHx8XG4gICAgICAgICAgKHByb21vY29kZUlucHV0LnZhbHVlID09PSAnZW5heWFhbWUnICYmIGVuYXlhYW1lQ291bnRlciA9PSAwKVxuICAgICAgICApIHtcbiAgICAgICAgICAvLyBjb25zdCBwcm9tb2NvZGUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N1bW1hcnlfX2xpJyB9KS5nZXRub2RlKCk7XG4gICAgICAgICAgLy8gY29uc3Qgc3VtbWFyeVByb21vY29kZTFMZWZ0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY29udGVudDogcHJvbW9jb2RlSW5wdXQudmFsdWUgfSkuZ2V0bm9kZSgpO1xuICAgICAgICAgIC8vIGNvbnN0IHN1bW1hcnlQcm9tb2NvZGUxUmlnaHQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBjb250ZW50OiAnLTEwJScgfSkuZ2V0bm9kZSgpO1xuICAgICAgICAgIC8vIHByb21vY29kZS5hcHBlbmQoc3VtbWFyeVByb21vY29kZTFMZWZ0LCBzdW1tYXJ5UHJvbW9jb2RlMVJpZ2h0KTtcbiAgICAgICAgICAvLyBwcm9tb2NvZGVUZXh0QXJlYS5hcHBlbmQocHJvbW9jb2RlKTtcbiAgICAgICAgICBpZiAocHJvbW9jb2RlSW5wdXQudmFsdWUgPT09ICdiYWxheG9uJykgYmFsYXhvbkNvdW50ZXIgKz0gMTtcbiAgICAgICAgICBpZiAocHJvbW9jb2RlSW5wdXQudmFsdWUgPT09ICdlbmF5YWFtZScpIGVuYXlhYW1lQ291bnRlciArPSAxO1xuXG4gICAgICAgICAgLy8gaWYod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiYWxheG9uJykgPT09IG51bGwgJiYgd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlbmF5YWFtZScpID09PSBudWxsKSB7XG4gICAgICAgICAgLy8gICBjb25zdCBzdW1tYXJ5UHJpY2UgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBpZDogJ3N1bW1hcnktcHJpY2UnIH0pLmdldG5vZGUoKTtcbiAgICAgICAgICAvLyAgIHN1bW1hcnlPcmRlcjFSaWdodC5hcHBlbmQoc3VtbWFyeVByaWNlKTtcblxuICAgICAgICAgIC8vIGNvbnN0IG5ld1ByaWNlID0gIChOdW1iZXIoc3VtbWFyeVByaWNlLnByZXZpb3VzRWxlbWVudFNpYmxpbmchLnRleHRDb250ZW50Py5zbGljZSgyKSkgLSAoTnVtYmVyKHN1bW1hcnlQcmljZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIS50ZXh0Q29udGVudD8uc2xpY2UoMikpIC8gMTAwICogMTApKS50b0ZpeGVkKDIpO1xuICAgICAgICAgIC8vIHN1bW1hcnlQcmljZS50ZXh0Q29udGVudCA9ICckICcgKyBuZXdQcmljZTtcbiAgICAgICAgICAvLyB0b3RhbFByaWNlLnRleHRDb250ZW50ID0gJyQgJyArICgoMjAgKyArbmV3UHJpY2UpKS50b0ZpeGVkKDIpO1xuICAgICAgICAgIC8vIHN1bW1hcnlQcmljZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIS5jbGFzc0xpc3QuYWRkKCdwcmljZS1jaGFuZ2VkJyk7XG4gICAgICAgICAgLy8gfVxuICAgICAgICAgIGlmIChiYWxheG9uQ291bnRlciA9PT0gMSAmJiBlbmF5YWFtZUNvdW50ZXIgPT09IDEpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYmFsYXhvbicsICcxJyk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VuYXlhYW1lJywgJzEnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGJhbGF4b25Db3VudGVyID09PSAxKSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYmFsYXhvbicsICcxJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VuYXlhYW1lJywgJzEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgIGNvbnN0IG1haW4gPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ21haW4nLCBjbGFzc05hbWU6ICdtYWluIG1haW5fZW1wdHknIH0pLmdldG5vZGUoKTtcbiAgICAgIGNvbnN0IGVtcHR5ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY2xhc3NOYW1lOiAnY2FydC1lbXB0eScsIGNvbnRlbnQ6ICdDYXJ0IGlzIGVtcHR5JyB9KS5nZXRub2RlKCk7XG4gICAgICBtYWluLmFwcGVuZChlbXB0eSk7XG4gICAgICBib2R5LmFwcGVuZChtYWluKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENyZWF0ZUVsZW1lbnQgfSBmcm9tICcuL0VsZW1lbnRzL0NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IHsgQ3JlYXRlSW1hZ2UgfSBmcm9tICcuL0VsZW1lbnRzL0NyZWF0ZUltYWdlJztcbmltcG9ydCB7IHByb2R1Y3QgfSBmcm9tICcuL0ludGVyZmFjZXMnO1xuaW1wb3J0IFJvdXRlciBmcm9tICcuL3JvdXRlJztcblxuZXhwb3J0IGNsYXNzIENhcmRQYWdlIHtcbiAgY29uc3RydWN0b3IocHJvZHVjdDogcHJvZHVjdCkge1xuICAgIGNvbnN0IHJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcbiAgICBjb25zdCBtYWluID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdtYWluJywgY2xhc3NOYW1lOiAnbWFpbicgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IHdyYXBwZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3dyYXBwZXIgY2FyZC1wYWdlX193cmFwcGVyJyB9KS5nZXRub2RlKCk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmQobWFpbik7XG4gICAgY29uc3QgRGl2UGF0aCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnRGl2UGF0aCcgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IERpdkNhcmQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ0RpdkNhcmQnIH0pLmdldG5vZGUoKTtcbiAgICBtYWluLmFwcGVuZCh3cmFwcGVyKTtcbiAgICB3cmFwcGVyLmFwcGVuZChEaXZQYXRoKTtcbiAgICB3cmFwcGVyLmFwcGVuZChEaXZDYXJkKTtcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tINC/0LXRgNCy0YvQuSDQtNC40LIgZGl2LnBhdGhcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgY29uc3Qgc3BhbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnYScsIGNsYXNzTmFtZTogJ2NhcmRfcGF0aCcgfSkuZ2V0bm9kZSgpO1xuICAgICAgRGl2UGF0aC5hcHBlbmQoc3Bhbik7XG4gICAgfVxuICAgIERpdlBhdGguY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudCA9ICdTVE9SRSAvICc7XG4gICAgcm91dGVyLkFkZFJvdXRpbmdUb0hlYWRlcihEaXZQYXRoLmNoaWxkTm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQpO1xuICAgIERpdlBhdGguY2hpbGROb2Rlc1sxXS50ZXh0Q29udGVudCA9IHByb2R1Y3QuY2F0ZWdvcnkgKyAnIC8gJztcbiAgICBEaXZQYXRoLmNoaWxkTm9kZXNbMl0udGV4dENvbnRlbnQgPSBwcm9kdWN0LmJyYW5kICsgJyAvICc7XG4gICAgRGl2UGF0aC5jaGlsZE5vZGVzWzNdLnRleHRDb250ZW50ID0gcHJvZHVjdC5tb2RlbDtcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tINCy0YLQvtGA0L7QuSDQtNC40LIgZGl2LmNhcmRcbiAgICAvLyBjb25zdCBoMSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnaDEnLCBpZDogJ2gxX2NhcmQnLCBjb250ZW50OiBwcm9kdWN0Lm1vZGVsIH0pLmdldG5vZGUoKTtcbiAgICAvLyBEaXZDYXJkLmFwcGVuZChoMSk7XG4gICAgY29uc3QgY2FyZGNvbnRlbnQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGlkOiAnY2FyZGNvbnRlbnQnIH0pLmdldG5vZGUoKTtcbiAgICBEaXZDYXJkLmFwcGVuZChjYXJkY29udGVudCk7XG4gICAgY29uc3QgY2FyZGltYWdlcyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgaWQ6ICdjYXJkaW1hZ2VzJyB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgY2FyZGRhdGEgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGlkOiAnY2FyZGRhdGEnIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCBjYXJkcHJpY2UgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGlkOiAnY2FyZHByaWNlJyB9KS5nZXRub2RlKCk7XG4gICAgY2FyZGNvbnRlbnQuYXBwZW5kKGNhcmRpbWFnZXMpO1xuICAgIGNhcmRjb250ZW50LmFwcGVuZChjYXJkZGF0YSk7XG4gICAgY2FyZGNvbnRlbnQuYXBwZW5kKGNhcmRwcmljZSk7XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBpbWFnZXM6XG4gICAgY29uc3Qgcm93ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBpZDogJ3JvdycsIGNsYXNzTmFtZTogJ3JvdycgfSkuZ2V0bm9kZSgpO1xuICAgIGNhcmRpbWFnZXMuYXBwZW5kKHJvdyk7XG4gICAgY29uc3QgY29sMiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgaWQ6ICdjb2wtMicsIGNsYXNzTmFtZTogJ2NvbC0yJyB9KS5nZXRub2RlKCk7XG4gICAgcm93LmFwcGVuZChjb2wyKTtcbiAgICBjb25zdCBjdXJyZW50aW1hZ2UgPSBuZXcgQ3JlYXRlSW1hZ2Uoe1xuICAgICAgc3JjOiBgJHtwcm9kdWN0LmltYWdlc1swXX1gLFxuICAgICAgaWQ6ICdjdXJyZW50aW1hZ2UnLFxuICAgICAgY2xhc3NOYW1lOiAnY3VycmVudGltYWdlJyxcbiAgICB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgaW1nUm93ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBpZDogJ3NtYWxsLWltZy1yb3cnLCBjbGFzc05hbWU6ICdzbWFsbC1pbWctcm93JyB9KS5nZXRub2RlKCk7XG4gICAgY29sMi5hcHBlbmQoY3VycmVudGltYWdlLCBpbWdSb3cpO1xuICAgIC8vIGNvbnN0IGxpc3RpbWFnZXMgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGlkOiAnbGlzdGltYWdlcycgfSkuZ2V0bm9kZSgpO1xuICAgIC8vIGNhcmRpbWFnZXMuYXBwZW5kKGxpc3RpbWFnZXMpO1xuXG4gICAgcHJvZHVjdC5pbWFnZXMuZm9yRWFjaCgoaXQpID0+IHtcbiAgICAgIGNvbnN0IHNtYWxsaW1nQ29udGFpbmVyID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xuICAgICAgICB0YWc6ICdkaXYnLFxuICAgICAgICBpZDogJ3NtYWxsSW1nQ29udGFpbmVyJyxcbiAgICAgICAgY2xhc3NOYW1lOiAnc21hbGxJbWdDb250YWluZXInLFxuICAgICAgfSkuZ2V0bm9kZSgpO1xuICAgICAgY29uc3Qgc21hbGxpbWcgPSBuZXcgQ3JlYXRlSW1hZ2UoeyBzcmM6IGAke2l0fWAsIGlkOiAnc21hbGxJbWcnLCBjbGFzc05hbWU6ICdzbWFsbEltZycgfSkuZ2V0bm9kZSgpO1xuICAgICAgc21hbGxpbWdDb250YWluZXIuYXBwZW5kKHNtYWxsaW1nKTtcbiAgICAgIGltZ1Jvdy5hcHBlbmQoc21hbGxpbWdDb250YWluZXIpO1xuXG4gICAgICAvLyDQv9C10YDQtdC60LvRjtGH0LXQvdC40LUg0L7RgdC90L7QstC90L7QuSDQutCw0YDRgtC40L3QutC4IC8vXG4gICAgICBzbWFsbGltZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY3VycmVudGltYWdlLnNyYyA9IHNtYWxsaW1nLnNyYztcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS1kYXRhOlxuICAgIGNvbnN0IGRhdGFUb3AgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2RhdGEtdG9wJyB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgaDEgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2gxJywgaWQ6ICdoMV9jYXJkJywgY29udGVudDogcHJvZHVjdC5tb2RlbCB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgcmF0aW5nQmxvY2sgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3JhdGluZy1ibG9jaycgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IHJhdGluZ0ljb24gPSBuZXcgQ3JlYXRlSW1hZ2Uoe1xuICAgICAgc3JjOiAnLi9hc3NldHMvaW1hZ2VzL3N0YXItcmF0aW5nLnN2ZycsXG4gICAgICBjbGFzc05hbWU6ICdyYXRpbmctaWNvbicsXG4gICAgICBhbHQ6ICdzdGFyJyxcbiAgICB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgcmF0aW5nTnVtID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xuICAgICAgdGFnOiAnc3BhbicsXG4gICAgICBjbGFzc05hbWU6ICdyYXRpbmctbnVtJyxcbiAgICAgIGNvbnRlbnQ6IHByb2R1Y3QucmF0aW5nLnRvU3RyaW5nKCksXG4gICAgfSkuZ2V0bm9kZSgpO1xuICAgIHJhdGluZ0Jsb2NrLmFwcGVuZChyYXRpbmdJY29uLCByYXRpbmdOdW0pO1xuICAgIGRhdGFUb3AuYXBwZW5kKGgxLCByYXRpbmdCbG9jayk7XG4gICAgY29uc3QgcHJpY2VCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZGF0YV9fcHJpY2UnIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCBwcmljZU5vRGlzY291bnQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XG4gICAgICB0YWc6ICdzcGFuJyxcbiAgICAgIGNsYXNzTmFtZTogJ3ByaWNlLW5vLWRpc2NvdW50JyxcbiAgICAgIGNvbnRlbnQ6ICckICcgKyAoKHByb2R1Y3QuZGlzY291bnRQZXJjZW50YWdlIC8gMTAwKSAqIHByb2R1Y3QucHJpY2UgKyBwcm9kdWN0LnByaWNlKS50b0ZpeGVkKDIpLnRvU3RyaW5nKCksXG4gICAgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IHByaWNlV2l0aERpc2NvdW50ID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xuICAgICAgdGFnOiAnc3BhbicsXG4gICAgICBjbGFzc05hbWU6ICdwcmljZS13aXRoLWRpc2NvdW50JyxcbiAgICAgIGNvbnRlbnQ6ICckICcgKyBwcm9kdWN0LnByaWNlLnRvU3RyaW5nKCksXG4gICAgfSkuZ2V0bm9kZSgpO1xuICAgIHByaWNlQmxvY2suYXBwZW5kKHByaWNlTm9EaXNjb3VudCwgcHJpY2VXaXRoRGlzY291bnQpO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY2xhc3NOYW1lOiAnZGF0YV9fdGl0bGUnLCBjb250ZW50OiAnRGVzY3JpcHRpb246JyB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgZGVzY3JpcHRpb25UZXh0ID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xuICAgICAgdGFnOiAnc3BhbicsXG4gICAgICBjbGFzc05hbWU6ICdkYXRhX190ZXh0JyxcbiAgICAgIGNvbnRlbnQ6IHByb2R1Y3QuZGVzY3JpcHRpb24sXG4gICAgfSkuZ2V0bm9kZSgpO1xuICAgIGRlc2NyaXB0aW9uLmFwcGVuZChkZXNjcmlwdGlvblRleHQpO1xuICAgIGNvbnN0IHJlbGVhc2UgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBjbGFzc05hbWU6ICdkYXRhX190aXRsZScsIGNvbnRlbnQ6ICdSZWxlYXNlIGRhdGU6JyB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgcmVsZWFzZVRleHQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XG4gICAgICB0YWc6ICdzcGFuJyxcbiAgICAgIGNsYXNzTmFtZTogJ2RhdGFfX3RleHQnLFxuICAgICAgY29udGVudDogcHJvZHVjdC5EYXRlT2ZJc3N1ZS50b1N0cmluZygpLFxuICAgIH0pLmdldG5vZGUoKTtcbiAgICByZWxlYXNlLmFwcGVuZChyZWxlYXNlVGV4dCk7XG4gICAgY29uc3QgYnJhbmQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBjbGFzc05hbWU6ICdkYXRhX190aXRsZScsIGNvbnRlbnQ6ICdCcmFuZDonIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCBicmFuZHRleHQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBjbGFzc05hbWU6ICdkYXRhX190ZXh0JywgY29udGVudDogcHJvZHVjdC5icmFuZCB9KS5nZXRub2RlKCk7XG4gICAgYnJhbmQuYXBwZW5kKGJyYW5kdGV4dCk7XG4gICAgY29uc3QgY2F0ZWdvcnkgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBjbGFzc05hbWU6ICdkYXRhX190aXRsZScsIGNvbnRlbnQ6ICdDYXRlZ29yeTonIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCBjYXRlZ29yeVRleHQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XG4gICAgICB0YWc6ICdzcGFuJyxcbiAgICAgIGNsYXNzTmFtZTogJ2RhdGFfX3RleHQnLFxuICAgICAgY29udGVudDogcHJvZHVjdC5jYXRlZ29yeSxcbiAgICB9KS5nZXRub2RlKCk7XG4gICAgY2F0ZWdvcnkuYXBwZW5kKGNhdGVnb3J5VGV4dCk7XG4gICAgY29uc3QgYnV0dG9ucyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZGF0YV9fYnV0dG9ucycgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IGJ1eU5vdyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnYnV0dG9uJywgY2xhc3NOYW1lOiAnZGF0YV9fYnV0dG9uJywgY29udGVudDogJ0J1eSBpdCBub3cnIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCBhZGRUb0NhcnQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2NhcmQtcGFnZV9fYWRkLXRvLWNhcnQnIH0pLmdldG5vZGUoKTtcbiAgICBidXR0b25zLmFwcGVuZChidXlOb3csIGFkZFRvQ2FydCk7XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGNhcmRzOiBwcm9kdWN0W10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpISk7XG4gICAgICBjYXJkcy5mb3JFYWNoKChpdCkgPT4ge1xuICAgICAgICBpZiAoaXQuaWQgPT09IHByb2R1Y3QuaWQpIHtcbiAgICAgICAgICBhZGRUb0NhcnQuY2xhc3NMaXN0LnRvZ2dsZSgnX3Byb2R1Y3QtYWRkZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYnV5Tm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbGV0IFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZTogcHJvZHVjdFtdID0gW107XG4gICAgICBsZXQgdG90YWxwcmljZSA9IDA7XG4gICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICBpZiAoIWFkZFRvQ2FydC5jbGFzc0xpc3QuY29udGFpbnMoJ19wcm9kdWN0LWFkZGVkJykpIHtcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpICE9PSBudWxsKSB7XG4gICAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKSEpO1xuICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5wdXNoKHByb2R1Y3QpO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0cycsIEpTT04uc3RyaW5naWZ5KFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5wdXNoKHByb2R1Y3QpO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0cycsIEpTT04uc3RyaW5naWZ5KFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UuZm9yRWFjaCgoaXQpID0+IHtcbiAgICAgICAgY291bnRlciArPSBpdC5jb3VudGVyO1xuICAgICAgICB0b3RhbHByaWNlICs9IGl0LmNvdW50ZXIgKiBpdC5wcmljZTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgY2FydFF1YW50aXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50ZXItYmFza2V0Jyk7XG4gICAgICBjb25zdCBBbGxQcmljZUJhc2tldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGwtcHJpY2UtYmFza2V0Jyk7XG4gICAgICBjb25zdCBiYXNrZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFza2V0LWltZycpO1xuICAgICAgaWYgKGNvdW50ZXIgIT09IDApIHtcbiAgICAgICAgbGV0IGNjID0gMDtcbiAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLmZvckVhY2goKGl0ZW0pID0+IChjYyArPSBpdGVtLmNvdW50ZXIpKTtcbiAgICAgICAgY2FydFF1YW50aXR5IS50ZXh0Q29udGVudCA9IGNjLnRvU3RyaW5nKCk7XG4gICAgICAgIGNhcnRRdWFudGl0eSEuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgY2FydFF1YW50aXR5IS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICBBbGxQcmljZUJhc2tldCEuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIGJhc2tldCEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgQWxsUHJpY2VCYXNrZXQhLnRleHRDb250ZW50ID0gJyQgJyArIHRvdGFscHJpY2UudG9TdHJpbmcoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGZyb21jYXJkID0gdHJ1ZTtcbiAgICByb3V0ZXIuQWRkUm91dGluZ1RvQmFza2V0KGJ1eU5vdywgZnJvbWNhcmQpO1xuXG4gICAgYWRkVG9DYXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgLy9hZGRUb0NhcnQuY2xhc3NMaXN0LnRvZ2dsZSgnX3Byb2R1Y3QtYWRkZWQnKTtcbiAgICAgIGxldCB0b3RhbHByaWNlID0gMDtcbiAgICAgIGxldCBjb3VudGVyID0gMDtcbiAgICAgIGxldCBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2U6IHByb2R1Y3RbXSA9IFtdO1xuICAgICAgaWYgKGFkZFRvQ2FydC5jbGFzc0xpc3QuY29udGFpbnMoJ19wcm9kdWN0LWFkZGVkJykpIHtcbiAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKSEpO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UuZm9yRWFjaCgoaXQsIGluZCkgPT4ge1xuICAgICAgICAgIGlmIChpdC5pZCA9PT0gcHJvZHVjdC5pZCkge1xuICAgICAgICAgICAgaW5kZXggPSBpbmQ7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0cycsIEpTT04uc3RyaW5naWZ5KFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpICE9PSBudWxsKSB7XG4gICAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKSEpO1xuICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5wdXNoKHByb2R1Y3QpO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0cycsIEpTT04uc3RyaW5naWZ5KFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5wdXNoKHByb2R1Y3QpO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0cycsIEpTT04uc3RyaW5naWZ5KFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhZGRUb0NhcnQuY2xhc3NMaXN0LnRvZ2dsZSgnX3Byb2R1Y3QtYWRkZWQnKTtcbiAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5mb3JFYWNoKChpdCkgPT4ge1xuICAgICAgICBjb3VudGVyICs9IGl0LmNvdW50ZXI7XG4gICAgICAgIHRvdGFscHJpY2UgKz0gaXQuY291bnRlciAqIGl0LnByaWNlO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBjYXJ0UXVhbnRpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY291bnRlci1iYXNrZXQnKTtcbiAgICAgIGNvbnN0IEFsbFByaWNlQmFza2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsbC1wcmljZS1iYXNrZXQnKTtcbiAgICAgIGNvbnN0IGJhc2tldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYXNrZXQtaW1nJyk7XG4gICAgICBpZiAoY291bnRlciAhPT0gMCkge1xuICAgICAgICBsZXQgY2MgPSAwO1xuICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UuZm9yRWFjaCgoaXRlbSkgPT4gKGNjICs9IGl0ZW0uY291bnRlcikpO1xuICAgICAgICBjYXJ0UXVhbnRpdHkhLnRleHRDb250ZW50ID0gY2MudG9TdHJpbmcoKTtcbiAgICAgICAgY2FydFF1YW50aXR5IS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICBjYXJ0UXVhbnRpdHkhLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgIEFsbFByaWNlQmFza2V0IS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgYmFza2V0IS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBBbGxQcmljZUJhc2tldCEudGV4dENvbnRlbnQgPSAnJCAnICsgdG90YWxwcmljZS50b1N0cmluZygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FydFF1YW50aXR5IS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgIGNhcnRRdWFudGl0eSEuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgICAgQWxsUHJpY2VCYXNrZXQhLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGJhc2tldCEuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY2FyZGRhdGEuYXBwZW5kKGRhdGFUb3AsIHByaWNlQmxvY2ssIGRlc2NyaXB0aW9uLCByZWxlYXNlLCBicmFuZCwgY2F0ZWdvcnksIGJ1dHRvbnMpO1xuICB9XG59XG5cbi8vaHR0cDovL2xvY2FsaG9zdDo4MDgwL3VybChodHRwczovL2ktcHJvZHVjdC5ieS9pbWFnZXMvby9hcHBsZS1pcGhvbmUtMTQtcHJvLTEyOGdiLWtvc21pY2hlc2tpai1jaGVybnlqXzEuanBnXG4vL2h0dHBzOi8vaS1wcm9kdWN0LmJ5L2ltYWdlcy9vL2FwcGxlLWlwaG9uZS0xNC1wcm8tMTI4Z2Ita29zbWljaGVza2lqLWNoZXJueWpfMS5qcGdcbiIsImltcG9ydCB7IENyZWF0ZUVsZW1lbnQgfSBmcm9tICcuL0VsZW1lbnRzL0NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IHsgQ3JlYXRlTnVtYmVySW5wdXQgfSBmcm9tICcuL0VsZW1lbnRzL0NyZWF0ZU51bWJlcklucHV0JztcbmltcG9ydCB7IENyZWF0ZVRleHRJbnB1dCB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlVGV4dElucHV0JztcblxuZXhwb3J0IGNsYXNzIENyZWF0ZUNoZWNrb3V0UG9wdXAgZXh0ZW5kcyBDcmVhdGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cCcgfSk7XG4gICAgY29uc3QgY3JlZGl0Q2FyZCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAncG9wdXBfX2NyZWRpdC1jYXJkJyB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgZmxpcCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAncG9wdXBfX2ZsaXAnIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCBmbGlwRnJvbnQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3BvcHVwX19mbGlwLWZyb250JyB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgZmxpcEJhY2sgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3BvcHVwX19mbGlwLWJhY2snIH0pLmdldG5vZGUoKTtcbiAgICBmbGlwLmFwcGVuZChmbGlwRnJvbnQsIGZsaXBCYWNrKTtcbiAgICAvLy8vLyBmcm9udCAvLy8vL1xuICAgIGNvbnN0IGZyb250Q2hpcCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAncG9wdXBfX2Zyb250LWNoaXAnIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCBmcm9udExvZ28gPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3BvcHVwX19mcm9udC1sb2dvIGNhcmQtbG9nbycgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IGZyb250TnVtYmVyID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fZnJvbnQtbnVtYmVyJyB9KS5nZXRub2RlKCk7XG5cbiAgICBjb25zdCBmcm9udE5hbWUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3BvcHVwX19mcm9udC1uYW1lJyB9KS5nZXRub2RlKCk7XG5cbiAgICBjb25zdCBuYW1lUGxhY2Vob2xkZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XG4gICAgICB0YWc6ICdzcGFuJyxcbiAgICAgIGNsYXNzTmFtZTogJ3BvcHVwX19mcm9udC1uYW1lLXBsYWNlaG9sZGVyJyxcbiAgICAgIGNvbnRlbnQ6ICdDYXJkIGhvbGRlcicsXG4gICAgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IG5hbWVUZXh0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fZnJvbnQtbmFtZS10ZXh0JyB9KS5nZXRub2RlKCk7XG4gICAgZnJvbnROYW1lLmFwcGVuZChuYW1lUGxhY2Vob2xkZXIsIG5hbWVUZXh0KTtcbiAgICBjb25zdCBmcm9udEV4cGlyYXRpb24gPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3BvcHVwX19mcm9udC1leHBpcmF0aW9uJyB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgZXhwaXJhdGlvblBsYWNlaG9sZGVyID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xuICAgICAgdGFnOiAnc3BhbicsXG4gICAgICBjbGFzc05hbWU6ICdwb3B1cF9fZnJvbnQtZXhwaXJhdGlvbi1wbGFjZWhvbGRlcicsXG4gICAgICBjb250ZW50OiAnRXhwaXJlcycsXG4gICAgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IGV4cGlyYXRpb25UZXh0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdwb3B1cF9fZnJvbnQtZXhwaXJhdGlvbi10ZXh0JyB9KS5nZXRub2RlKCk7XG4gICAgZnJvbnRFeHBpcmF0aW9uLmFwcGVuZChleHBpcmF0aW9uUGxhY2Vob2xkZXIsIGV4cGlyYXRpb25UZXh0KTtcbiAgICBmbGlwRnJvbnQuYXBwZW5kKGZyb250Q2hpcCwgZnJvbnRMb2dvLCBmcm9udE51bWJlciwgZnJvbnROYW1lLCBmcm9udEV4cGlyYXRpb24pO1xuICAgIC8vLy8vIGJhY2sgLy8vLy9cbiAgICBjb25zdCBiYWNrU3RyaXAgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3BvcHVwX19iYWNrLXN0cmlwJyB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgYmFja0xvZ28gPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3BvcHVwX19iYWNrLWxvZ28gY2FyZC1sb2dvJyB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgYmFja0NjdiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAncG9wdXBfX2JhY2stY2N2JyB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgY2N2UGxhY2Vob2xkZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XG4gICAgICB0YWc6ICdzcGFuJyxcbiAgICAgIGNsYXNzTmFtZTogJ3BvcHVwX19iYWNrLWNjdi1wbGFjZWhvbGRlcicsXG4gICAgICBjb250ZW50OiAnQ2N2JyxcbiAgICB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgY2N2VGV4dCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAncG9wdXBfX2JhY2stY2N2LXRleHQnIH0pLmdldG5vZGUoKTtcbiAgICBiYWNrQ2N2LmFwcGVuZChjY3ZQbGFjZWhvbGRlciwgY2N2VGV4dCk7XG4gICAgZmxpcEJhY2suYXBwZW5kKGJhY2tTdHJpcCwgYmFja0xvZ28sIGJhY2tDY3YpO1xuICAgIGNyZWRpdENhcmQuYXBwZW5kKGZsaXApO1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgY29uc3QgZm9ybSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAncG9wdXBfX2Zvcm0nIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCBmb3JtQ2FyZE51bWJlckJsb2NrID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdmb3JtX19ibG9jaycgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IGZvcm1DYXJkTnVtYmVyUGxhY2Vob2xkZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XG4gICAgICB0YWc6ICdzcGFuJyxcbiAgICAgIGNsYXNzTmFtZTogJ2Zvcm1fX3BsYWNlaG9sZGVyJyxcbiAgICAgIGNvbnRlbnQ6ICdDYXJkIG51bWJlcicsXG4gICAgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IGZvcm1DYXJkTnVtYmVySW5wdXRzID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdmb3JtX19pbnB1dHMnIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKCdbMC05XScpO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNTsgaSsrKSB7XG4gICAgICBjb25zdCBpbnB1dCA9IG5ldyBDcmVhdGVOdW1iZXJJbnB1dCh7XG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgY2xhc3NOYW1lOiAnZm9ybV9faW5wdXQnLFxuICAgICAgICBpZDogaS50b1N0cmluZygpLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIH0pLmdldG5vZGUoKTtcbiAgICAgIGNvbnN0IG51bWJlciA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnLnBvcHVwX19udW1iZXInIH0pLmdldG5vZGUoKTtcbiAgICAgIGZyb250TnVtYmVyLmFwcGVuZChudW1iZXIpO1xuICAgICAgaW5wdXQubWluTGVuZ3RoID0gNDtcbiAgICAgIGlucHV0Lm1heExlbmd0aCA9IDQ7XG4gICAgICBpbnB1dC5vbnBhc3RlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGxhc3RjaGFyID0gaW5wdXQudmFsdWVbaW5wdXQudmFsdWUubGVuZ3RoIC0gMV07XG4gICAgICAgIGNvbnNvbGUubG9nKGxhc3RjaGFyKTtcbiAgICAgICAgaW5wdXQudmFsdWUgPSBpbnB1dC52YWx1ZS5zbGljZSgwLCAtMSk7XG4gICAgICAgIG51bWJlci50ZXh0Q29udGVudCA9IGlucHV0LnZhbHVlO1xuICAgICAgICBpZiAocmVnLnRlc3QobGFzdGNoYXIpKSB7XG4gICAgICAgICAgaW5wdXQudmFsdWUgKz0gbGFzdGNoYXI7XG4gICAgICAgICAgbnVtYmVyLnRleHRDb250ZW50ICs9IGxhc3RjaGFyO1xuICAgICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGlucHV0LnZhbHVlWzBdKSB7XG4gICAgICAgICAgICAgIGNhc2UgJzQnOlxuICAgICAgICAgICAgICAgIGZyb250TG9nby5zdHlsZS5iYWNrZ3JvdW5kID0gYHVybCgnLi9hc3NldHMvaW1hZ2VzL3Zpc2Euc3ZnJykgbm8tcmVwZWF0IGNlbnRlciAvIGNvbnRhaW5gO1xuICAgICAgICAgICAgICAgIGJhY2tMb2dvLnN0eWxlLmJhY2tncm91bmQgPSBgdXJsKCcuL2Fzc2V0cy9pbWFnZXMvdmlzYS5zdmcnKSBuby1yZXBlYXQgY2VudGVyIC8gY29udGFpbmA7XG4gICAgICAgICAgICAgICAgLy9mcm9udExvZ28udGV4dENvbnRlbnQgPSAnVklTQSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgICAgICAgIGZyb250TG9nby5zdHlsZS5iYWNrZ3JvdW5kID0gYHVybCgnLi9hc3NldHMvaW1hZ2VzL21hc3RlcmNhcmQuc3ZnJykgbm8tcmVwZWF0IGNlbnRlciAvIGNvbnRhaW5gO1xuICAgICAgICAgICAgICAgIGJhY2tMb2dvLnN0eWxlLmJhY2tncm91bmQgPSBgdXJsKCcuL2Fzc2V0cy9pbWFnZXMvbWFzdGVyY2FyZC5zdmcnKSBuby1yZXBlYXQgY2VudGVyIC8gY29udGFpbmA7XG4gICAgICAgICAgICAgICAgLy9mcm9udExvZ28udGV4dENvbnRlbnQgPSAnTWFzdGVyQ2FyZCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJzYnOlxuICAgICAgICAgICAgICAgIGZyb250TG9nby5zdHlsZS5iYWNrZ3JvdW5kID0gYHVybCgnLi9hc3NldHMvaW1hZ2VzL2Rpc2NvdmVyLnN2ZycpIG5vLXJlcGVhdCBjZW50ZXIgLyBjb250YWluYDtcbiAgICAgICAgICAgICAgICBiYWNrTG9nby5zdHlsZS5iYWNrZ3JvdW5kID0gYHVybCgnLi9hc3NldHMvaW1hZ2VzL2Rpc2NvdmVyLnN2ZycpIG5vLXJlcGVhdCBjZW50ZXIgLyBjb250YWluYDtcbiAgICAgICAgICAgICAgICAvL2Zyb250TG9nby50ZXh0Q29udGVudCA9ICdEaXNjb3Zlcic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZnJvbnRMb2dvLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGZvcm1DYXJkTnVtYmVySW5wdXRzLmFwcGVuZChpbnB1dCk7XG4gICAgfVxuICAgIGZvcm1DYXJkTnVtYmVyQmxvY2suYXBwZW5kKGZvcm1DYXJkTnVtYmVyUGxhY2Vob2xkZXIsIGZvcm1DYXJkTnVtYmVySW5wdXRzKTtcbiAgICBjb25zdCBmb3JtQ2FyZE5hbWVCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9fYmxvY2tfbmFtZScgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IGZvcm1DYXJkTmFtZVBsYWNlaG9sZGVyID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xuICAgICAgdGFnOiAnc3BhbicsXG4gICAgICBjbGFzc05hbWU6ICdmb3JtX19wbGFjZWhvbGRlcicsXG4gICAgICBjb250ZW50OiAnQ2FyZCBob2xkZXInLFxuICAgIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCBmb3JtQ2FyZE5hbWVJbnB1dCA9IG5ldyBDcmVhdGVUZXh0SW5wdXQoe1xuICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgbmFtZTogJ2NhcmQtaG9sZGVyJyxcbiAgICAgIGNsYXNzTmFtZTogJ2Zvcm1fX2lucHV0X2xvbmcnLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgfSkuZ2V0bm9kZSgpO1xuICAgIGZvcm1DYXJkTmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgbmFtZVRleHQudGV4dENvbnRlbnQgPSBmb3JtQ2FyZE5hbWVJbnB1dC52YWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgIH0pO1xuICAgIGZvcm1DYXJkTmFtZUJsb2NrLmFwcGVuZChmb3JtQ2FyZE5hbWVQbGFjZWhvbGRlciwgZm9ybUNhcmROYW1lSW5wdXQpO1xuICAgIGNvbnN0IGZvcm1DYXJkT3RoZXJCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9fYmxvY2tfb3RoZXInIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCBmb3JtQ2FyZEV4cGlyYXRpb25CbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9fYmxvY2staGFsZicgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IGZvcm1DYXJkRXhwaXJhdGlvblBsYWNlaG9sZGVyID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xuICAgICAgdGFnOiAnc3BhbicsXG4gICAgICBjbGFzc05hbWU6ICdmb3JtX19wbGFjZWhvbGRlcicsXG4gICAgICBjb250ZW50OiAnRXhwaXJhdGlvbiBkYXRlJyxcbiAgICB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgZm9ybUNhcmRNb250aCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9faW5wdXQnLCBpZDogJ21vbnRoLWlucHV0JyB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgTW9udGhTZWxlY3QgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NlbGVjdCcsIGNsYXNzTmFtZTogJ2Zvcm1fX3NlbGVjdCcgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IG1vbnRoT3B0aW9uID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdvcHRpb24nIH0pLmdldG5vZGUoKTtcbiAgICBNb250aFNlbGVjdC5hcHBlbmQobW9udGhPcHRpb24pO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMTM7IGkrKykge1xuICAgICAgY29uc3QgdmFsdWUgPSBpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICAgIGNvbnN0IG9wdGlvbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnb3B0aW9uJywgY29udGVudDogdmFsdWUgfSkuZ2V0bm9kZSgpO1xuICAgICAgTW9udGhTZWxlY3QuYXBwZW5kKG9wdGlvbik7XG4gICAgfVxuICAgIGZvcm1DYXJkTW9udGguYXBwZW5kKE1vbnRoU2VsZWN0KTtcblxuICAgIGNvbnN0IGZvcm1DYXJkWWVhciA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9faW5wdXQnIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCBZZWFyU2VsZWN0ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzZWxlY3QnLCBjbGFzc05hbWU6ICdmb3JtX19zZWxlY3QnIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCB5ZWFyT3B0aW9uID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdvcHRpb24nIH0pLmdldG5vZGUoKTtcbiAgICBZZWFyU2VsZWN0LmFwcGVuZCh5ZWFyT3B0aW9uKTtcbiAgICBmb3IgKGxldCBpID0gMjAyMjsgaSA8IDIwMzE7IGkrKykge1xuICAgICAgY29uc3QgdmFsdWUgPSBpLnRvU3RyaW5nKCk7XG4gICAgICBjb25zdCBvcHRpb24gPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ29wdGlvbicsIGNvbnRlbnQ6IHZhbHVlIH0pLmdldG5vZGUoKTtcbiAgICAgIFllYXJTZWxlY3QuYXBwZW5kKG9wdGlvbik7XG4gICAgfVxuICAgIGZvcm1DYXJkWWVhci5hcHBlbmQoWWVhclNlbGVjdCk7XG4gICAgZm9ybUNhcmRFeHBpcmF0aW9uQmxvY2suYXBwZW5kKGZvcm1DYXJkRXhwaXJhdGlvblBsYWNlaG9sZGVyLCBmb3JtQ2FyZE1vbnRoLCBmb3JtQ2FyZFllYXIpO1xuXG4gICAgY29uc3QgZm9ybUNhcmRDY3ZCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnZm9ybV9fYmxvY2staGFsZicgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IGZvcm1DYXJkQ2N2UGxhY2Vob2xkZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XG4gICAgICB0YWc6ICdzcGFuJyxcbiAgICAgIGNsYXNzTmFtZTogJ2Zvcm1fX3BsYWNlaG9sZGVyJyxcbiAgICAgIGlkOiAnY2N2LXBsYWNlaG9sZGVyJyxcbiAgICAgIGNvbnRlbnQ6ICdDY3YnLFxuICAgIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCBmb3JtQ2FyZENjdklucHV0ID0gbmV3IENyZWF0ZVRleHRJbnB1dCh7XG4gICAgICB0eXBlOiAndGV4dCcsXG4gICAgICBuYW1lOiAnY2FyZC1jY3YnLFxuICAgICAgY2xhc3NOYW1lOiAnZm9ybV9faW5wdXQnLFxuICAgICAgaWQ6ICdjYXJkLWNjdicsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB9KS5nZXRub2RlKCk7XG4gICAgZm9ybUNhcmRDY3ZJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGZvcm1DYXJkQ2N2SW5wdXQuZm9jdXMoKTtcbiAgICAgIGlmICghY3JlZGl0Q2FyZC5jbGFzc0xpc3QuY29udGFpbnMoJ2hvdmVyJykpIGNyZWRpdENhcmQuY2xhc3NMaXN0LmFkZCgnaG92ZXInKTtcbiAgICB9KTtcblxuICAgIC8vIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIC8vICAgaWYgKChlLnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdjYXJkLWNjdicpIHtcbiAgICAvLyAgICAgaWYgKGNyZWRpdENhcmQuY2xhc3NMaXN0LmNvbnRhaW5zKCdob3ZlcicpKSBjcmVkaXRDYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyJyk7XG4gICAgLy8gICB9XG4gICAgLy8gfSlcblxuICAgIGZvcm1DYXJkQ2N2SW5wdXQubWF4TGVuZ3RoID0gMztcbiAgICBmb3JtQ2FyZENjdklucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgY29uc3QgbGFzdGNoYXIgPSBmb3JtQ2FyZENjdklucHV0LnZhbHVlW2Zvcm1DYXJkQ2N2SW5wdXQudmFsdWUubGVuZ3RoIC0gMV07XG4gICAgICAvL2NvbnNvbGUubG9nKGxhc3RjaGFyKTtcbiAgICAgIGZvcm1DYXJkQ2N2SW5wdXQudmFsdWUgPSBmb3JtQ2FyZENjdklucHV0LnZhbHVlLnNsaWNlKDAsIC0xKTtcbiAgICAgIGlmIChyZWcudGVzdChsYXN0Y2hhcikpIHtcbiAgICAgICAgZm9ybUNhcmRDY3ZJbnB1dC52YWx1ZSArPSBsYXN0Y2hhcjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBmb3JtQ2FyZENjdklucHV0Lm9ucGFzdGUgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBmb3JtQ2FyZENjdkJsb2NrLmFwcGVuZChmb3JtQ2FyZENjdlBsYWNlaG9sZGVyLCBmb3JtQ2FyZENjdklucHV0KTtcblxuICAgIGZvcm1DYXJkT3RoZXJCbG9jay5hcHBlbmQoZm9ybUNhcmRFeHBpcmF0aW9uQmxvY2ssIGZvcm1DYXJkQ2N2QmxvY2spO1xuXG4gICAgY29uc3QgZm9ybUNhcmRBZGRyZXNzQmxvY2sgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2Zvcm1fX2Jsb2NrX2FkZHJlc3MnIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCBmb3JtQWRkcmVzc1BsYWNlaG9sZGVyID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xuICAgICAgdGFnOiAnc3BhbicsXG4gICAgICBjbGFzc05hbWU6ICdmb3JtX19wbGFjZWhvbGRlcicsXG4gICAgICBjb250ZW50OiAnU2hpcHBpbmcgYWRkcmVzcycsXG4gICAgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IGZvcm1DYXJkQWRkcmVzc0lucHV0ID0gbmV3IENyZWF0ZVRleHRJbnB1dCh7XG4gICAgICB0eXBlOiAndGV4dCcsXG4gICAgICBuYW1lOiAnYWRkcmVzcycsXG4gICAgICBjbGFzc05hbWU6ICdmb3JtX19pbnB1dF9sb25nJyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIH0pLmdldG5vZGUoKTtcblxuICAgIGZvcm1DYXJkQWRkcmVzc0Jsb2NrLmFwcGVuZChmb3JtQWRkcmVzc1BsYWNlaG9sZGVyLCBmb3JtQ2FyZEFkZHJlc3NJbnB1dCk7XG4gICAgY29uc3QgZm9ybUNhcmRDb250YWN0c0Jsb2NrID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdmb3JtX19ibG9ja19vdGhlcicgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IGZvcm1QaG9uZUJsb2NrID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdmb3JtX19ibG9jay1oYWxmJyB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgZm9ybVBob25lUGxhY2Vob2xkZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XG4gICAgICB0YWc6ICdzcGFuJyxcbiAgICAgIGNsYXNzTmFtZTogJ2Zvcm1fX3BsYWNlaG9sZGVyJyxcbiAgICAgIGlkOiAncGhvbmUtcGxhY2Vob2xkZXInLFxuICAgICAgY29udGVudDogJ1Bob25lIG51bWJlcicsXG4gICAgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IGZvcm1QaG9uZUlucHV0ID0gbmV3IENyZWF0ZVRleHRJbnB1dCh7XG4gICAgICB0eXBlOiAndGVsJyxcbiAgICAgIG5hbWU6ICdwaG9uZScsXG4gICAgICBjbGFzc05hbWU6ICdmb3JtX19pbnB1dF9oYWxmJyxcbiAgICAgIGlkOiAncGhvbmUtaW5wdXQnLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgfSkuZ2V0bm9kZSgpO1xuXG4gICAgZm9ybVBob25lQmxvY2suYXBwZW5kKGZvcm1QaG9uZVBsYWNlaG9sZGVyLCBmb3JtUGhvbmVJbnB1dCk7XG4gICAgY29uc3QgZm9ybUVtYWlsQmxvY2sgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2Zvcm1fX2Jsb2NrLWhhbGYnIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCBmb3JtRW1haWxQbGFjZWhvbGRlciA9IG5ldyBDcmVhdGVFbGVtZW50KHtcbiAgICAgIHRhZzogJ3NwYW4nLFxuICAgICAgY2xhc3NOYW1lOiAnZm9ybV9fcGxhY2Vob2xkZXInLFxuICAgICAgaWQ6ICdlbWFpbC1wbGFjZWhvbGRlcicsXG4gICAgICBjb250ZW50OiAnRS1tYWlsJyxcbiAgICB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgZm9ybUVtYWlsSW5wdXQgPSBuZXcgQ3JlYXRlVGV4dElucHV0KHtcbiAgICAgIHR5cGU6ICdlbWFpbCcsXG4gICAgICBuYW1lOiAnZW1haWwnLFxuICAgICAgY2xhc3NOYW1lOiAnZm9ybV9faW5wdXRfaGFsZicsXG4gICAgICBpZDogJ2VtYWlsLWlucHV0JyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIH0pLmdldG5vZGUoKTtcbiAgICBmb3JtRW1haWxCbG9jay5hcHBlbmQoZm9ybUVtYWlsUGxhY2Vob2xkZXIsIGZvcm1FbWFpbElucHV0KTtcbiAgICBmb3JtQ2FyZENvbnRhY3RzQmxvY2suYXBwZW5kKGZvcm1QaG9uZUJsb2NrLCBmb3JtRW1haWxCbG9jayk7XG4gICAgLy8vLy8vLy8vLy8vLy9cbiAgICBjb25zdCBjb25maXJtQnV0dG9uID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xuICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgIGNsYXNzTmFtZTogJ3BvcHVwX19idXR0b24nLFxuICAgICAgY29udGVudDogJ2NvbmZpcm0nLFxuICAgIH0pLmdldG5vZGUoKTtcblxuICAgIGNvbnN0IE1ZID0ge1xuICAgICAgbW9udGg6ICcnLFxuICAgICAgeWVhcjogJycsXG4gICAgfTtcbiAgICBNb250aFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBjb25zdCBtb250aCA9IEFycmF5LmZyb20oTW9udGhTZWxlY3QuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ29wdGlvbicpKS5maWx0ZXIoKG9wdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3B0aW9uLnNlbGVjdGVkO1xuICAgICAgfSk7XG4gICAgICBNWS5tb250aCA9IG1vbnRoWzBdLnRleHRDb250ZW50ITtcbiAgICAgIGV4cGlyYXRpb25UZXh0LnRleHRDb250ZW50ID0gTVkubW9udGggKyAnLycgKyBNWS55ZWFyO1xuICAgIH0pO1xuXG4gICAgWWVhclNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBjb25zdCBZZWFyID0gQXJyYXkuZnJvbShZZWFyU2VsZWN0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdvcHRpb24nKSkuZmlsdGVyKChvcHRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbi5zZWxlY3RlZDtcbiAgICAgIH0pO1xuICAgICAgTVkueWVhciA9IFllYXJbMF0udGV4dENvbnRlbnQhO1xuICAgICAgZXhwaXJhdGlvblRleHQudGV4dENvbnRlbnQgPSBNWS5tb250aCArICcvJyArIE1ZLnllYXI7XG4gICAgfSk7XG5cbiAgICBjb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbGV0IG1lc3NhZ2UgPSAnJztcblxuICAgICAgY29uc3QgbW9udGggPSBBcnJheS5mcm9tKE1vbnRoU2VsZWN0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdvcHRpb24nKSkuZmlsdGVyKChvcHRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbi5zZWxlY3RlZDtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgeWVhciA9IEFycmF5LmZyb20oTW9udGhTZWxlY3QuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ29wdGlvbicpKS5maWx0ZXIoKG9wdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3B0aW9uLnNlbGVjdGVkO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICghL14oWy5hLXpBLVpdezMsfVtcXHNdKXsyLH0kLy50ZXN0KChmb3JtQ2FyZE5hbWVJbnB1dC52YWx1ZSArPSAnICcpKSkge1xuICAgICAgICBtZXNzYWdlICs9ICdcXG5DYXJkIGhvbGRlciBuYW1lIHNob3VsZCBjb250YWluIGF0IGxlYXN0IDIgd29yZHMgZWFjaCBvbmUgbm90IGxlc3MgdGhhbiAzIGxldHRlcnMhJztcbiAgICAgIH1cblxuICAgICAgaWYgKCFtb250aFswXS50ZXh0Q29udGVudCkge1xuICAgICAgICBtZXNzYWdlICs9ICdcXG5DaG9zZSBleHBpcmF0aW9uIG1vbnRoISc7XG4gICAgICB9XG4gICAgICBpZiAoIXllYXJbMF0udGV4dENvbnRlbnQpIHtcbiAgICAgICAgbWVzc2FnZSArPSAnXFxuQ2hvc2UgZXhwaXJhdGlvbiB5ZWFyISc7XG4gICAgICB9XG4gICAgICBpZiAoIS9eKFsuMC05YS16QS1aXFwtXFwsXXs1LH1bXFxzXSl7Myx9JC8udGVzdCgoZm9ybUNhcmRBZGRyZXNzSW5wdXQudmFsdWUgKz0gJyAnKSkpIHtcbiAgICAgICAgbWVzc2FnZSArPSAnXFxuU2hpcHBpbmcgYWRkcmVzcyBzaG91bGQgY29udGFpbiBhdCBsZWFzdCAzIHdvcmRzIGVhY2ggb25lIG5vdCBsZXNzIHRoYW4gNSBzeW1ib2xzISc7XG4gICAgICB9XG4gICAgICBpZiAoIS9eW1xcK11bMC05XXs5LDE1fSQvLnRlc3QoZm9ybVBob25lSW5wdXQudmFsdWUpKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gXCJcXG5QaG9uZSBudW1iZXIgc2hvdWxkIHN0YXJ0IHdpdGggJysnIGFuZCBjb250YWluIDkgb3IgbW9yZSBkaWdpdHMhXCI7XG4gICAgICB9XG4gICAgICBpZiAoIS9eXFx3KyhbXFwuLV0/XFx3KykqQFxcdysoW1xcLi1dP1xcdyspKihcXC5cXHd7MiwzfSkrJC8udGVzdChmb3JtRW1haWxJbnB1dC52YWx1ZSkpIHtcbiAgICAgICAgbWVzc2FnZSArPSAnXFxuSW52YWxpZCBlbWFpbCBhZGRyZXNzISc7XG4gICAgICB9XG4gICAgICBsZXQgQ2FyZExlbmd0aCA9IDA7XG4gICAgICBmcm9udE51bWJlci5jaGlsZE5vZGVzLmZvckVhY2goKGl0KSA9PiB7XG4gICAgICAgIENhcmRMZW5ndGggKz0gaXQudGV4dENvbnRlbnQhLnNwbGl0KCcnKS5sZW5ndGghO1xuICAgICAgfSk7XG4gICAgICBpZiAoQ2FyZExlbmd0aCAhPT0gMTYpIHtcbiAgICAgICAgbWVzc2FnZSArPSAnXFxuSW52YWxpZCBDYXJkISc7XG4gICAgICB9XG4gICAgICBpZiAoZm9ybUNhcmRDY3ZJbnB1dC52YWx1ZS5zcGxpdCgnJykubGVuZ3RoICE9PSAzKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gJ1xcbkludmFsaWQgQ0NWISc7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgIGFsZXJ0KG1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZm9ybS5hcHBlbmQoXG4gICAgICBmb3JtQ2FyZE51bWJlckJsb2NrLFxuICAgICAgZm9ybUNhcmROYW1lQmxvY2ssXG4gICAgICBmb3JtQ2FyZE90aGVyQmxvY2ssXG4gICAgICBmb3JtQ2FyZEFkZHJlc3NCbG9jayxcbiAgICAgIGZvcm1DYXJkQ29udGFjdHNCbG9jayxcbiAgICAgIGNvbmZpcm1CdXR0b25cbiAgICApO1xuXG4gICAgdGhpcy5lbC5hcHBlbmQoY3JlZGl0Q2FyZCwgZm9ybSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi9FbGVtZW50cy9DcmVhdGVFbGVtZW50JztcbmltcG9ydCB7IHByb2R1Y3QgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcbmltcG9ydCB7IENyZWF0ZUltYWdlIH0gZnJvbSAnLi4vRWxlbWVudHMvQ3JlYXRlSW1hZ2UnO1xuaW1wb3J0IHsgQXBwbHlSb3V0aW5nIH0gZnJvbSAnLi4vQXBwbHlSb3V0aW5nJztcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi4vcm91dGUnO1xuXG5leHBvcnQgY2xhc3MgQ3JlYXRlQ2FydEl0ZW0ge1xuICBjb25zdHJ1Y3RvcihsaW1pdDogbnVtYmVyLCBwYWdlOiBudW1iZXIpIHtcbiAgICBjb25zdCByb3V0ZXIgPSBuZXcgUm91dGVyKCk7XG4gICAgY29uc3QgdGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcnQtaXRlbXMnKTtcbiAgICBsZXQgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlOiBwcm9kdWN0W10gPSBbXTtcbiAgICBsZXQgY291bnRlciA9IDA7XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpICE9PSBudWxsICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpPy5sZW5ndGggIT09IDApIHtcbiAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykhKTtcbiAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5mb3JFYWNoKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnN0IGNhcnRJdGVtID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdjYXJ0X19pdGVtJyB9KS5nZXRub2RlKCk7XG4gICAgICAgIGNvbnN0IGNhcnRJdGVtQm9keSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnY2FydF9faXRlbS1ib2R5JyB9KS5nZXRub2RlKCk7XG4gICAgICAgIGNvbnN0IHBob3RvQmxvY2sgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2l0ZW1fX3Bob3RvLWJsb2NrJyB9KS5nZXRub2RlKCk7XG4gICAgICAgIGNvbnN0IHBob3RvID0gbmV3IENyZWF0ZUltYWdlKHtcbiAgICAgICAgICBzcmM6IGRhdGEuaW1hZ2VzWzBdLFxuICAgICAgICAgIGNsYXNzTmFtZTogJ2l0ZW1fX3Bob3RvJyxcbiAgICAgICAgICBpZDogYGNhcmQtJHtkYXRhLmlkLnRvU3RyaW5nKCl9YCxcbiAgICAgICAgfSkuZ2V0bm9kZSgpO1xuICAgICAgICBwaG90b0Jsb2NrLmFwcGVuZChwaG90byk7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdpdGVtX19kZXNjcmlwdGlvbicgfSkuZ2V0bm9kZSgpO1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvblRpdGxlID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xuICAgICAgICAgIHRhZzogJ2RpdicsXG4gICAgICAgICAgY2xhc3NOYW1lOiAnaXRlbV9fZGVzY3JpcHRpb24tdGl0bGUnLFxuICAgICAgICAgIGNvbnRlbnQ6IGAke2RhdGEubW9kZWx9YCxcbiAgICAgICAgICBpZDogYGNhcmQtJHtkYXRhLmlkLnRvU3RyaW5nKCl9YCxcbiAgICAgICAgfSkuZ2V0bm9kZSgpO1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvblRleHQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XG4gICAgICAgICAgdGFnOiAnZGl2JyxcbiAgICAgICAgICBjbGFzc05hbWU6ICdpdGVtX19kZXNjcmlwdGlvbi10ZXh0JyxcbiAgICAgICAgICBjb250ZW50OiBgJHtkYXRhLmRlc2NyaXB0aW9ufWAsXG4gICAgICAgIH0pLmdldG5vZGUoKTtcbiAgICAgICAgZGVzY3JpcHRpb24uYXBwZW5kKGRlc2NyaXB0aW9uVGl0bGUsIGRlc2NyaXB0aW9uVGV4dCk7XG4gICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xuICAgICAgICAgIHRhZzogJ2RpdicsXG4gICAgICAgICAgY2xhc3NOYW1lOiAnaXRlbV9fY2F0ZWdvcnknLFxuICAgICAgICAgIGNvbnRlbnQ6IGAke2RhdGEuY2F0ZWdvcnl9YCxcbiAgICAgICAgfSkuZ2V0bm9kZSgpO1xuICAgICAgICBjb25zdCBxdWFudGl0eUNvbnRhaW5lciA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnaXRlbV9fcXVhbnRpdHknIH0pLmdldG5vZGUoKTtcbiAgICAgICAgY29uc3QgcXVhbnRpdHlDb3VudGVyID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xuICAgICAgICAgIHRhZzogJ3NwYW4nLFxuICAgICAgICAgIGNsYXNzTmFtZTogJ2l0ZW1fX3F1YW50aXR5LWNvdW50ZXInLFxuICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuY291bnRlci50b1N0cmluZygpLFxuICAgICAgICB9KS5nZXRub2RlKCk7XG4gICAgICAgIGNvbnN0IHF1YW50aXR5QnV0dG9uTGVzcyA9IG5ldyBDcmVhdGVFbGVtZW50KHtcbiAgICAgICAgICB0YWc6ICdzcGFuJyxcbiAgICAgICAgICBjbGFzc05hbWU6ICdpdGVtX19xdWFudGl0eS1idXR0b24gaXRlbV9fbGVzcycsXG4gICAgICAgICAgY29udGVudDogJy0nLFxuICAgICAgICB9KS5nZXRub2RlKCk7XG4gICAgICAgIGNvbnN0IHF1YW50aXR5QnV0dG9uTW9yZSA9IG5ldyBDcmVhdGVFbGVtZW50KHtcbiAgICAgICAgICB0YWc6ICdzcGFuJyxcbiAgICAgICAgICBjbGFzc05hbWU6ICdpdGVtX19xdWFudGl0eS1idXR0b24gaXRlbV9fbW9yZScsXG4gICAgICAgICAgY29udGVudDogJysnLFxuICAgICAgICB9KS5nZXRub2RlKCk7XG4gICAgICAgIHF1YW50aXR5Q29udGFpbmVyLmFwcGVuZChxdWFudGl0eUJ1dHRvbkxlc3MsIHF1YW50aXR5Q291bnRlciwgcXVhbnRpdHlCdXR0b25Nb3JlKTtcbiAgICAgICAgY29uc3QgcHJpY2UgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XG4gICAgICAgICAgdGFnOiAnZGl2JyxcbiAgICAgICAgICBjbGFzc05hbWU6ICdpdGVtX19wcmljZScsXG4gICAgICAgICAgY29udGVudDogJyQgJyArIGRhdGEucHJpY2UgKiBkYXRhLmNvdW50ZXIsXG4gICAgICAgIH0pLmdldG5vZGUoKTtcbiAgICAgICAgY2FydEl0ZW1Cb2R5LmFwcGVuZChwaG90b0Jsb2NrLCBkZXNjcmlwdGlvbiwgY2F0ZWdvcnksIHF1YW50aXR5Q29udGFpbmVyLCBwcmljZSk7XG4gICAgICAgIGNvbnN0IGNhcnRJdGVtZGVsZXRlID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdjYXJ0X19pdGVtLWRlbGV0ZScgfSkuZ2V0bm9kZSgpO1xuICAgICAgICBjb25zdCBpY29uID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY2xhc3NOYW1lOiAnY2FydF9fY3Jvc3MtaWNvbicgfSkuZ2V0bm9kZSgpO1xuICAgICAgICBjYXJ0SXRlbWRlbGV0ZS5hcHBlbmQoaWNvbik7XG4gICAgICAgIGNhcnRJdGVtLmFwcGVuZChjYXJ0SXRlbUJvZHksIGNhcnRJdGVtZGVsZXRlKTtcbiAgICAgICAgY2FydEl0ZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgLy9jb25zb2xlLmxvZyhjb3VudGVyKVxuICAgICAgICBpZiAoY291bnRlciA8IGxpbWl0ICogcGFnZSAmJiBjb3VudGVyID4gbGltaXQgKiBwYWdlIC0gbGltaXQgLSAxKSB7XG4gICAgICAgICAgY2FydEl0ZW0uc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgfVxuICAgICAgICBjb3VudGVyICs9IDE7XG4gICAgICAgIHRhZyEuYXBwZW5kKGNhcnRJdGVtKTtcblxuICAgICAgICByb3V0ZXIuQWRkUm91dGluZ1RvQ2FyZChwaG90byk7XG4gICAgICAgIHJvdXRlci5BZGRSb3V0aW5nVG9DYXJkKGRlc2NyaXB0aW9uVGl0bGUpO1xuXG4gICAgICAgIHF1YW50aXR5QnV0dG9uTW9yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpISk7XG4gICAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLmlkID09PSBkYXRhLmlkKSB7XG4gICAgICAgICAgICAgIGl0ZW0uY291bnRlciArPSAxO1xuICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvZHVjdHMnLCBKU09OLnN0cmluZ2lmeShQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UpKTtcbiAgICAgICAgICAgICAgcXVhbnRpdHlDb3VudGVyLnRleHRDb250ZW50ID0gaXRlbS5jb3VudGVyLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICAgICAgcHJpY2UudGV4dENvbnRlbnQgPSBgJCAke2l0ZW0ucHJpY2UgKiBpdGVtLmNvdW50ZXJ9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLmN1cnJlbnREYXRhKFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHF1YW50aXR5QnV0dG9uTGVzcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKSEpO1xuICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoZGF0YS5pZCA9PT0gaXRlbS5pZCkge1xuICAgICAgICAgICAgICBpZiAoaXRlbS5jb3VudGVyID4gMSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uY291bnRlciAtPSAxO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0cycsIEpTT04uc3RyaW5naWZ5KFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSkpO1xuICAgICAgICAgICAgICAgIHF1YW50aXR5Q291bnRlci50ZXh0Q29udGVudCA9IGl0ZW0uY291bnRlci50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHByaWNlLnRleHRDb250ZW50ID0gYCQgJHtpdGVtLnByaWNlICogaXRlbS5jb3VudGVyfWA7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jb3VudGVyIC09IDE7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UuZm9yRWFjaCgoaXQsIGluZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGl0LmlkID09PSBpdGVtLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaW5kO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0cycsIEpTT04uc3RyaW5naWZ5KFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSkpO1xuICAgICAgICAgICAgICAgIGNhcnRJdGVtLnJlbW92ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvdW50ZXIgPSBpdGVtLmNvdW50ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGNvdW50ZXIgPj0gMSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF0YShQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRhKFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSk7XG4gICAgICAgICAgICBuZXcgQXBwbHlSb3V0aW5nKCkuaW5pdCgnI2Jhc2tldCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2FydEl0ZW1kZWxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKSEpO1xuICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLmZvckVhY2goKGl0LCBpbmQpID0+IHtcbiAgICAgICAgICAgIGlmIChpdC5pZCA9PT0gZGF0YS5pZCkge1xuICAgICAgICAgICAgICBpbmRleCA9IGluZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2Uuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvZHVjdHMnLCBKU09OLnN0cmluZ2lmeShQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UpKTtcbiAgICAgICAgICBjYXJ0SXRlbS5yZW1vdmUoKTtcbiAgICAgICAgICB0aGlzLmN1cnJlbnREYXRhKFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSk7XG4gICAgICAgICAgbmV3IEFwcGx5Um91dGluZygpLmluaXQoJyNiYXNrZXQnKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy9Qcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UuZm9yRWFjaCgpO1xuICAgIC8vdGhpcy5MaXN0T2ZEaXNwbGF5KGxpbWl0KTtcbiAgfVxuICBjdXJyZW50RGF0YShkYXRhOiBwcm9kdWN0W10pIHtcbiAgICBsZXQgc2FsZSA9IDA7XG4gICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmFsYXhvbicpICE9PSBudWxsKSB7XG4gICAgICBzYWxlICs9IDAuMTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZW5heWFhbWUnKSAhPT0gbnVsbCkge1xuICAgICAgc2FsZSArPSAwLjE7XG4gICAgfVxuICAgIGxldCBjb3VudGVyID0gMDtcbiAgICBsZXQgdG90YWxwcmljZSA9IDA7XG4gICAgY29uc3QgY291bnRlckJhc2tldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudGVyLWJhc2tldCcpO1xuICAgIGNvbnN0IGFsbFByaWNlQmFza2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsbC1wcmljZS1iYXNrZXQnKTtcbiAgICBjb25zdCBzdW1tYXJ5VG90YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VtbWFyeS10b3RhbCcpO1xuICAgIGNvbnN0IHN1YlRvdGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1YnRvdGFsLXByaWNlJyk7XG4gICAgY29uc3Qgc3VtbWFyeXByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1bW1hcnktcHJpY2UnKTtcbiAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvdW50ZXIgKz0gaXRlbS5jb3VudGVyO1xuICAgICAgdG90YWxwcmljZSArPSBpdGVtLmNvdW50ZXIgKiBpdGVtLnByaWNlO1xuICAgIH0pO1xuICAgIGNvdW50ZXJCYXNrZXQhLnRleHRDb250ZW50ID0gY291bnRlci50b1N0cmluZygpO1xuICAgIGFsbFByaWNlQmFza2V0IS50ZXh0Q29udGVudCA9ICckICcgKyB0b3RhbHByaWNlLnRvU3RyaW5nKCk7XG4gICAgaWYgKHNhbGUgPT09IDApIHtcbiAgICAgIHN1YlRvdGFsIS50ZXh0Q29udGVudCA9ICckICcgKyB0b3RhbHByaWNlLnRvU3RyaW5nKCk7XG4gICAgICBzdW1tYXJ5VG90YWwhLnRleHRDb250ZW50ID0gJyQgJyArICh0b3RhbHByaWNlICsgMjApLnRvU3RyaW5nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1YlRvdGFsIS50ZXh0Q29udGVudCA9ICckICcgKyB0b3RhbHByaWNlO1xuICAgICAgc3VtbWFyeXByaWNlIS50ZXh0Q29udGVudCA9ICckICcgKyAodG90YWxwcmljZSAtIHRvdGFscHJpY2UgKiBzYWxlKTtcbiAgICAgIHN1bW1hcnlUb3RhbCEudGV4dENvbnRlbnQgPSAnJCAnICsgKHRvdGFscHJpY2UgLSB0b3RhbHByaWNlICogc2FsZSArIDIwKTtcbiAgICB9XG4gIH1cblxuICAvLyBMaXN0T2ZEaXNwbGF5KGxpbWl0OiBudW1iZXIpIHtcbiAgLy8gICBsZXQgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlOiBwcm9kdWN0W10gPSBbXTtcbiAgLy8gICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpISk7XG4gIC8vICAgY29uc3QgcGFnZXMgPSBNYXRoLmNlaWwoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLmxlbmd0aCAvIGxpbWl0KTtcbiAgLy8gICBsZXQgYXJyID0gbmV3IEFycmF5KCk7XG4gIC8vICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWdlczsgaSsrKSB7XG4gIC8vICAgICBhcnIucHVzaChuZXcgQXJyYXkoKSk7XG4gIC8vICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UuZm9yRWFjaCgoaXRlbSwgaW5kKSA9PiB7XG4gIC8vICAgICAgIGFycltpXS5wdXNoKGl0ZW0pO1xuICAvLyAgICAgICBpZiAoaW5kID0gcGFnZXMpIHtcbiAgLy8gICAgICAgfVxuICAvLyAgICAgfSk7XG4gIC8vICAgfVxuICAvLyAgIGNvbnNvbGUubG9nKGFyciEpXG4gIC8vIH1cbn1cbiIsImltcG9ydCB7IENyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi9FbGVtZW50cy9DcmVhdGVFbGVtZW50JztcbmltcG9ydCB7IENyZWF0ZVJhbmdlIH0gZnJvbSAnLi4vRWxlbWVudHMvQ3JlYXRlUmFuZ2UnO1xuaW1wb3J0IHsgQ29uc3RydWN0b3JSYW5nZUJsb2NrIH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBjbGFzcyBDcmVhdGVSYW5nZUJsb2NrIGV4dGVuZHMgQ3JlYXRlRWxlbWVudCB7XG4gIHByaXZhdGUgdGl0bGU6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIG51bXM6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGZyb206IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIHRvOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSByYW5nZUJsb2NrOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSByYW5nZUxpbmU6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIHJhbmdlMTogSFRNTElucHV0RWxlbWVudDtcbiAgcHJpdmF0ZSByYW5nZTI6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIHRpdGxlLFxuICAgIGZyb20sXG4gICAgdG8sXG4gICAgcmFuZ2UxTWluLFxuICAgIHJhbmdlMU1heCxcbiAgICByYW5nZTFWYWx1ZSxcbiAgICByYW5nZTJNaW4sXG4gICAgcmFuZ2UyTWF4LFxuICAgIHJhbmdlMlZhbHVlLFxuICAgIGlzUHJpY2UsXG4gICAgaWQsXG4gICAgcm91dGVyLFxuICAgIGN1cnJlbnQsXG4gIH06IENvbnN0cnVjdG9yUmFuZ2VCbG9jaykge1xuICAgIHN1cGVyKHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnYXNpZGVfX3JhbmdlIHJhbmdlLW1lbnUnIH0pO1xuICAgIHRoaXMudGl0bGUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2gyJywgY2xhc3NOYW1lOiAncmFuZ2UtbWVudV9fdGl0bGUnLCBjb250ZW50OiB0aXRsZSB9KS5nZXRub2RlKCk7XG4gICAgdGhpcy5udW1zID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdyYW5nZS1tZW51X19udW1iZXJzJyB9KS5nZXRub2RlKCk7XG4gICAgdGhpcy5mcm9tID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY2xhc3NOYW1lOiAncmFuZ2UtbWVudV9fZnJvbScsIGNvbnRlbnQ6IGZyb20gfSkuZ2V0bm9kZSgpO1xuICAgIHRoaXMudG8gPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ3NwYW4nLCBjbGFzc05hbWU6ICdyYW5nZS1tZW51X190bycsIGNvbnRlbnQ6IHRvIH0pLmdldG5vZGUoKTtcbiAgICB0aGlzLm51bXMuYXBwZW5kKHRoaXMuZnJvbSwgdGhpcy50byk7XG4gICAgdGhpcy5yYW5nZUJsb2NrID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdyYW5nZS1tZW51X19yYW5nZScgfSkuZ2V0bm9kZSgpO1xuICAgIHRoaXMucmFuZ2VMaW5lID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdyYW5nZS1tZW51X190cmFja2VyJyB9KS5nZXRub2RlKCk7XG4gICAgaWYgKHJhbmdlMVZhbHVlID09PSAnMTYnKSB7XG4gICAgICByYW5nZTFWYWx1ZSA9IGN1cnJlbnQhLm1pbiE7XG4gICAgfVxuICAgIGlmIChyYW5nZTJWYWx1ZSA9PT0gJzE1NTknKSB7XG4gICAgICByYW5nZTJWYWx1ZSA9IGN1cnJlbnQhLm1heCE7XG4gICAgfVxuICAgIGlmIChyYW5nZTFWYWx1ZSA9PT0gJzIwMTMnKSB7XG4gICAgICByYW5nZTFWYWx1ZSA9IGN1cnJlbnQhLm1pbiE7XG4gICAgfVxuICAgIGlmIChyYW5nZTJWYWx1ZSA9PT0gJzIwMjInKSB7XG4gICAgICByYW5nZTJWYWx1ZSA9IGN1cnJlbnQhLm1heCE7XG4gICAgfVxuICAgIHRoaXMucmFuZ2UxID0gbmV3IENyZWF0ZVJhbmdlKHtcbiAgICAgIHR5cGU6ICdyYW5nZScsXG4gICAgICBtaW46IHJhbmdlMU1pbixcbiAgICAgIG1heDogcmFuZ2UxTWF4LFxuICAgICAgdmFsdWU6IHJhbmdlMVZhbHVlLFxuICAgICAgaWQ6IGAke2lkfS0xYCxcbiAgICAgIGNsYXNzTmFtZTogJ3JhbmdlLW1lbnVfX3NsaWRlcicsXG4gICAgfSkuZ2V0bm9kZSgpO1xuICAgIC8vY29uc29sZS5sb2coJ0NSQicpO1xuICAgIHRoaXMucmFuZ2UyID0gbmV3IENyZWF0ZVJhbmdlKHtcbiAgICAgIHR5cGU6ICdyYW5nZScsXG4gICAgICBtaW46IHJhbmdlMk1pbixcbiAgICAgIG1heDogcmFuZ2UyTWF4LFxuICAgICAgdmFsdWU6IHJhbmdlMlZhbHVlLFxuICAgICAgaWQ6IGAke2lkfS0yYCxcbiAgICAgIGNsYXNzTmFtZTogJ3JhbmdlLW1lbnVfX3NsaWRlcicsXG4gICAgfSkuZ2V0bm9kZSgpO1xuICAgIHRoaXMucmFuZ2VCbG9jay5hcHBlbmQodGhpcy5yYW5nZUxpbmUsIHRoaXMucmFuZ2UxLCB0aGlzLnJhbmdlMik7XG4gICAgdGhpcy5lbC5hcHBlbmQodGhpcy50aXRsZSwgdGhpcy5udW1zLCB0aGlzLnJhbmdlQmxvY2spO1xuICAgIGlmIChpc1ByaWNlKSB7XG4gICAgICB0aGlzLmZyb20udGV4dENvbnRlbnQgPSAnJCAnICsgdGhpcy5yYW5nZTEudmFsdWU7XG4gICAgICB0aGlzLnRvLnRleHRDb250ZW50ID0gJyQgJyArIHRoaXMucmFuZ2UyLnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZyb20udGV4dENvbnRlbnQgPSB0aGlzLnJhbmdlMS52YWx1ZTtcbiAgICAgIHRoaXMudG8udGV4dENvbnRlbnQgPSB0aGlzLnJhbmdlMi52YWx1ZTtcbiAgICB9XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyDRhNGD0L3QutGG0LjQvtC90LDQuyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICBjb25zdCBkaXMgPSArdGhpcy5yYW5nZTEubWF4IC0gK3RoaXMucmFuZ2UxLm1pbjtcbiAgICBjb25zdCBzdGVwID0gMTAwIC8gKCt0aGlzLnJhbmdlMS5tYXggLSArdGhpcy5yYW5nZTEubWluKTtcbiAgICBjb25zdCBwZXJjZW50MSA9IChkaXMgLSAoK3RoaXMucmFuZ2UxLm1heCAtICt0aGlzLnJhbmdlMS52YWx1ZSkpICogc3RlcDtcbiAgICBjb25zdCBwZXJjZW50MiA9IChkaXMgLSAoK3RoaXMucmFuZ2UxLm1heCAtICt0aGlzLnJhbmdlMi52YWx1ZSkpICogc3RlcDtcbiAgICB0aGlzLnJhbmdlTGluZS5zdHlsZS5iYWNrZ3JvdW5kID0gYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSgxMDUsIDAsIDMxLCAwLjA4KSAke3BlcmNlbnQxfSUgLCAjNjkwMDFGICR7cGVyY2VudDF9JSAsICM2OTAwMUYgJHtwZXJjZW50Mn0lLCByZ2JhKDEwNSwgMCwgMzEsIDAuMDgpICR7cGVyY2VudDJ9JSlgO1xuXG4gICAgLy9jb25zb2xlLmxvZyh0aGlzLnJhbmdlMS52YWx1ZSk7XG4gICAgdGhpcy5yYW5nZTEuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAvL2NvbnNvbGUubG9nKHRoaXMucmFuZ2UxLnZhbHVlKTtcbiAgICAgIGlmIChwYXJzZUludCh0aGlzLnJhbmdlMi52YWx1ZSkgLSBwYXJzZUludCh0aGlzLnJhbmdlMS52YWx1ZSkgPD0gMCkge1xuICAgICAgICB0aGlzLnJhbmdlMS52YWx1ZSA9IFN0cmluZyhwYXJzZUludCh0aGlzLnJhbmdlMi52YWx1ZSkgLSAwKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1ByaWNlKSB7XG4gICAgICAgIHRoaXMuZnJvbS50ZXh0Q29udGVudCA9ICckICcgKyB0aGlzLnJhbmdlMS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZnJvbS50ZXh0Q29udGVudCA9IHRoaXMucmFuZ2UxLnZhbHVlO1xuICAgICAgfVxuICAgICAgY29uc3QgZGlzID0gK3RoaXMucmFuZ2UxLm1heCAtICt0aGlzLnJhbmdlMS5taW47XG4gICAgICBjb25zdCBzdGVwID0gMTAwIC8gKCt0aGlzLnJhbmdlMS5tYXggLSArdGhpcy5yYW5nZTEubWluKTtcbiAgICAgIGNvbnN0IHBlcmNlbnQxID0gKGRpcyAtICgrdGhpcy5yYW5nZTEubWF4IC0gK3RoaXMucmFuZ2UxLnZhbHVlKSkgKiBzdGVwO1xuICAgICAgY29uc3QgcGVyY2VudDIgPSAoZGlzIC0gKCt0aGlzLnJhbmdlMS5tYXggLSArdGhpcy5yYW5nZTIudmFsdWUpKSAqIHN0ZXA7XG4gICAgICB0aGlzLnJhbmdlTGluZS5zdHlsZS5iYWNrZ3JvdW5kID0gYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSgxMDUsIDAsIDMxLCAwLjA4KSAke3BlcmNlbnQxfSUgLCAjNjkwMDFGICR7cGVyY2VudDF9JSAsICM2OTAwMUYgJHtwZXJjZW50Mn0lLCByZ2JhKDEwNSwgMCwgMzEsIDAuMDgpICR7cGVyY2VudDJ9JSlgO1xuICAgIH0pO1xuICAgIHRoaXMucmFuZ2UxLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICBpZiAoaWQgPT09ICdwcmljZS1zbGlkZXInKSB7XG4gICAgICAgIHJvdXRlciEuQWRkUm91dGluZ1RvUHJpY2VNaW4odGhpcy5yYW5nZTEudmFsdWUpO1xuICAgICAgICByb3V0ZXIhLkFkZFJvdXRpbmdUb1ByaWNlTWF4KHRoaXMucmFuZ2UyLnZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvdXRlciEuQWRkUm91dGluZ1RvWWVhck1pbih0aGlzLnJhbmdlMS52YWx1ZSk7XG4gICAgICAgIHJvdXRlciEuQWRkUm91dGluZ1RvWWVhck1heCh0aGlzLnJhbmdlMi52YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5yYW5nZTIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICBpZiAocGFyc2VJbnQodGhpcy5yYW5nZTIudmFsdWUpIC0gcGFyc2VJbnQodGhpcy5yYW5nZTEudmFsdWUpIDw9IDApIHtcbiAgICAgICAgdGhpcy5yYW5nZTIudmFsdWUgPSBTdHJpbmcocGFyc2VJbnQodGhpcy5yYW5nZTEudmFsdWUpICsgMCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNQcmljZSkge1xuICAgICAgICB0aGlzLnRvLnRleHRDb250ZW50ID0gJyQgJyArIHRoaXMucmFuZ2UyLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50by50ZXh0Q29udGVudCA9IHRoaXMucmFuZ2UyLnZhbHVlO1xuICAgICAgfVxuICAgICAgY29uc3QgZGlzID0gK3RoaXMucmFuZ2UxLm1heCAtICt0aGlzLnJhbmdlMS5taW47XG4gICAgICBjb25zdCBzdGVwID0gMTAwIC8gKCt0aGlzLnJhbmdlMS5tYXggLSArdGhpcy5yYW5nZTEubWluKTtcbiAgICAgIGNvbnN0IHBlcmNlbnQxID0gKGRpcyAtICgrdGhpcy5yYW5nZTEubWF4IC0gK3RoaXMucmFuZ2UxLnZhbHVlKSkgKiBzdGVwO1xuICAgICAgY29uc3QgcGVyY2VudDIgPSAoZGlzIC0gKCt0aGlzLnJhbmdlMS5tYXggLSArdGhpcy5yYW5nZTIudmFsdWUpKSAqIHN0ZXA7XG4gICAgICB0aGlzLnJhbmdlTGluZS5zdHlsZS5iYWNrZ3JvdW5kID0gYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSgxMDUsIDAsIDMxLCAwLjA4KSAke3BlcmNlbnQxfSUgLCAjNjkwMDFGICR7cGVyY2VudDF9JSAsICM2OTAwMUYgJHtwZXJjZW50Mn0lLCByZ2JhKDEwNSwgMCwgMzEsIDAuMDgpICR7cGVyY2VudDJ9JSlgO1xuICAgIH0pO1xuICAgIHRoaXMucmFuZ2UyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICBpZiAoaWQgPT09ICdwcmljZS1zbGlkZXInKSB7XG4gICAgICAgIHJvdXRlciEuQWRkUm91dGluZ1RvUHJpY2VNaW4odGhpcy5yYW5nZTEudmFsdWUpO1xuICAgICAgICByb3V0ZXIhLkFkZFJvdXRpbmdUb1ByaWNlTWF4KHRoaXMucmFuZ2UyLnZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvdXRlciEuQWRkUm91dGluZ1RvWWVhck1pbih0aGlzLnJhbmdlMS52YWx1ZSk7XG4gICAgICAgIHJvdXRlciEuQWRkUm91dGluZ1RvWWVhck1heCh0aGlzLnJhbmdlMi52YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi9FbGVtZW50cy9DcmVhdGVFbGVtZW50JztcbmltcG9ydCB7IENyZWF0ZUltYWdlIH0gZnJvbSAnLi4vRWxlbWVudHMvQ3JlYXRlSW1hZ2UnO1xuaW1wb3J0IHsgQ3JlYXRlVGV4dElucHV0IH0gZnJvbSAnLi4vRWxlbWVudHMvQ3JlYXRlVGV4dElucHV0JztcbmltcG9ydCB7IENvbnN0cnVjdG9yRWxlbWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgY2xhc3MgQ3JlYXRlU2VhcmNoQmFyIGV4dGVuZHMgQ3JlYXRlRWxlbWVudCB7XG4gIHByaXZhdGUgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHByaXZhdGUgYnV0dG9uOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBpY29uOiBIVE1MSW1hZ2VFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHsgcm91dGVyLCBmaWx0ZXIgfTogQ29uc3RydWN0b3JFbGVtZW50KSB7XG4gICAgc3VwZXIoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzZWFyY2gnIH0pO1xuICAgIHRoaXMuaW5wdXQgPSBuZXcgQ3JlYXRlVGV4dElucHV0KHtcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIHBsYWNlaG9sZGVyOiAnU2VhcmNoIHByb2R1Y3QnLFxuICAgICAgbmFtZTogJ3NlYXJjaCcsXG4gICAgICBjbGFzc05hbWU6ICdzZWFyY2hfX3RleHQnLFxuICAgIH0pLmdldG5vZGUoKTtcbiAgICB0aGlzLmJ1dHRvbiA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnYnV0dG9uJywgY2xhc3NOYW1lOiAnc2VhcmNoX19idXR0b24nIH0pLmdldG5vZGUoKTtcbiAgICB0aGlzLmljb24gPSBuZXcgQ3JlYXRlSW1hZ2Uoe1xuICAgICAgc3JjOiAnLi9hc3NldHMvaW1hZ2VzL3NlYXJjaC5wbmcnLFxuICAgICAgYWx0OiAnc2VhcmNoJyxcbiAgICAgIGNsYXNzTmFtZTogJ3NlYXJjaF9faWNvbicsXG4gICAgfSkuZ2V0bm9kZSgpO1xuICAgIHRoaXMuaW5wdXQudmFsdWUgPSBmaWx0ZXIhO1xuICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgLy9jb25zb2xlLmxvZyhyb3V0ZXIpO1xuICAgICAgaWYgKHJvdXRlcikge1xuICAgICAgICByb3V0ZXIuQWRkUm91dGluZ1RvU2VhcmNoKHRoaXMuaW5wdXQudmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuYnV0dG9uLmFwcGVuZCh0aGlzLmljb24pO1xuICAgIHRoaXMuZWwuYXBwZW5kKHRoaXMuaW5wdXQsIHRoaXMuYnV0dG9uKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3JlYXRlRWxlbWVudCB9IGZyb20gJy4uL0VsZW1lbnRzL0NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IHsgQ3JlYXRlUmFkaW8gfSBmcm9tICcuLi9FbGVtZW50cy9DcmVhdGVSYWRpbyc7XG5pbXBvcnQgeyBDb25zdHJ1Y3RvclNvcnRNZW51IH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBjbGFzcyBDcmVhdGVTb3J0TWVudSBleHRlbmRzIENyZWF0ZUVsZW1lbnQge1xuICBwcml2YXRlIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgb3B0aW9uczogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgc2VsZWN0ZWQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIHNvcnRtZW51OiBzdHJpbmdbXVtdO1xuICBwcml2YXRlIG9wdGlvbiE6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGlucHV0ITogW0hUTUxJbnB1dEVsZW1lbnQsIEhUTUxMYWJlbEVsZW1lbnRdO1xuICBjb25zdHJ1Y3Rvcih7IHJvdXRlciwgZmlsdGVyIH06IENvbnN0cnVjdG9yU29ydE1lbnUpIHtcbiAgICBzdXBlcih7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3NvcnQtbWVudScgfSk7XG4gICAgdGhpcy5zb3J0bWVudSA9IFtcbiAgICAgIFsnUmF0aW5nJywgJ1JhdGluZyddLFxuICAgICAgWydQcmljZVRIJywgJ1ByaWNlIChsb3cgdG8gaGlnaCknXSxcbiAgICAgIFsnUHJpY2VUTCcsICdQcmljZSAoaGlnaCB0byBsb3cpJ10sXG4gICAgICBbJ1JEJywgJ1JlbGVhc2UgRGF0ZSddLFxuICAgIF07XG4gICAgdGhpcy5zb3J0bWVudS5mb3JFYWNoKChpdCkgPT4ge1xuICAgICAgaWYgKGZpbHRlciA9PT0gaXRbMF0pIHtcbiAgICAgICAgZmlsdGVyID0gaXRbMV07XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5jb250YWluZXIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3NlbGVjdC1ib3gnIH0pLmdldG5vZGUoKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ29wdGlvbnMtY29udGFpbmVyJyB9KS5nZXRub2RlKCk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnc2VsZWN0ZWQnLCBpZDogJ3NlbGVjdGVkJywgY29udGVudDogZmlsdGVyIH0pLmdldG5vZGUoKTtcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmQodGhpcy5vcHRpb25zLCB0aGlzLnNlbGVjdGVkKTtcbiAgICB0aGlzLnNvcnRtZW51LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHRoaXMub3B0aW9uID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdvcHRpb24nIH0pLmdldG5vZGUoKTtcbiAgICAgIHRoaXMuaW5wdXQgPSBuZXcgQ3JlYXRlUmFkaW8oe1xuICAgICAgICB0eXBlOiAncmFkaW8nLFxuICAgICAgICBjbGFzc05hbWU6ICdyYWRpbycsXG4gICAgICAgIGlkOiBpdGVtWzBdLFxuICAgICAgICBuYW1lOiAnc29ydCcsXG4gICAgICAgIHZhbHVlOiBpdGVtWzFdLFxuICAgICAgfSkuZ2V0bm9kZSgpO1xuICAgICAgdGhpcy5vcHRpb24uYXBwZW5kKHRoaXMuaW5wdXRbMF0sIHRoaXMuaW5wdXRbMV0pO1xuICAgICAgdGhpcy5vcHRpb25zLmFwcGVuZCh0aGlzLm9wdGlvbik7XG4gICAgICB0aGlzLmlucHV0WzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBpZiAocm91dGVyKSB7XG4gICAgICAgICAgcm91dGVyLkFkZFJvdXRpbmdUb1NvcnQoaXRlbVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy90aGlzLnNlbGVjdGVkLmlubmVySFRNTCA9IGl0ZW1bMV07XG4gICAgICAgIHRoaXMub3B0aW9ucy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuZWwuYXBwZW5kKHRoaXMuY29udGFpbmVyKTtcbiAgICB0aGlzLnNlbGVjdGVkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5vcHRpb25zIS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3JlYXRlRWxlbWVudCB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlRWxlbWVudCc7XG5pbXBvcnQgeyBwcm9kdWN0IH0gZnJvbSAnLi9JbnRlcmZhY2VzJztcbmltcG9ydCBDcmVhdGVSb3V0ZSBmcm9tICcuL3JvdXRlJztcblxuZXhwb3J0IGNsYXNzIENyZWF0ZUxpc3RPZkNhcmRzIHtcbiAgY29uc3RydWN0b3IoU29ydERhdGE6IHByb2R1Y3RbXSkge1xuICAgIGNvbnN0IHJvdXRlciA9IG5ldyBDcmVhdGVSb3V0ZSgpO1xuICAgIFNvcnREYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IENhcmRCb3ggPSBuZXcgQ3JlYXRlRWxlbWVudCh7XG4gICAgICAgIHRhZzogJ2RpdicsXG4gICAgICAgIGNsYXNzTmFtZTogJ2NhcmRfX2JveCcsXG4gICAgICAgIGlkOiBgY2FyZC0ke2l0ZW0uaWQudG9TdHJpbmcoKX1gLFxuICAgICAgICBCYWNrZ3JvdW5kSW1nOiBpdGVtLmltYWdlc1swXSxcbiAgICAgIH0pLmdldG5vZGUoKTtcbiAgICAgIHJvdXRlci5BZGRSb3V0aW5nVG9DYXJkKENhcmRCb3gpO1xuICAgICAgY29uc3QgQ2FyZE1vZGVsID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdoMicsIGNsYXNzTmFtZTogJ2NhcmRfX21vZGVsJywgY29udGVudDogaXRlbS5tb2RlbCB9KS5nZXRub2RlKCk7XG4gICAgICBjb25zdCBDYXJkUHJpY2UgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XG4gICAgICAgIHRhZzogJ2gyJyxcbiAgICAgICAgY2xhc3NOYW1lOiAnY2FyZF9fcHJpY2UnLFxuICAgICAgICBjb250ZW50OiBgJHtpdGVtLnByaWNlLnRvU3RyaW5nKCl9ICRgLFxuICAgICAgfSkuZ2V0bm9kZSgpO1xuICAgICAgY29uc3QgQ2FyZEFkZHRvQ2FydCA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnY2FyZF9fYWRkLXRvLWNhcnQnIH0pLmdldG5vZGUoKTtcbiAgICAgIENhcmRCb3guYXBwZW5kKENhcmRNb2RlbCwgQ2FyZFByaWNlLCBDYXJkQWRkdG9DYXJ0KTtcbiAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBjYXJkczogcHJvZHVjdFtdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKSEpO1xuICAgICAgICBjYXJkcy5mb3JFYWNoKChpdCkgPT4ge1xuICAgICAgICAgIGlmIChpdC5pZCA9PT0gaXRlbS5pZCkge1xuICAgICAgICAgICAgQ2FyZEFkZHRvQ2FydC5jbGFzc0xpc3QudG9nZ2xlKCdfcHJvZHVjdC1hZGRlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RvcmVfX3Byb2R1Y3RzJykhLmFwcGVuZChDYXJkQm94KTtcbiAgICAgIENhcmRBZGR0b0NhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIC8vUHJvZHVjdHNUb0xvY2FsU3RvcmFnZS5wdXNoKGl0ZW0pO1xuICAgICAgICBsZXQgdG90YWxwcmljZSA9IDA7XG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcbiAgICAgICAgbGV0IFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZTogcHJvZHVjdFtdID0gW107XG4gICAgICAgIGlmIChDYXJkQWRkdG9DYXJ0LmNsYXNzTGlzdC5jb250YWlucygnX3Byb2R1Y3QtYWRkZWQnKSkge1xuICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RzJykhKTtcbiAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5mb3JFYWNoKChpdCwgaW5kKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXQuaWQgPT09IGl0ZW0uaWQpIHtcbiAgICAgICAgICAgICAgaW5kZXggPSBpbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkoUHJvZHVjdHNGcm9tTG9jYWxTdG9yYWdlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpICE9PSBudWxsKSB7XG4gICAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpISk7XG4gICAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UucHVzaChpdGVtKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0cycsIEpTT04uc3RyaW5naWZ5KFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UucHVzaChpdGVtKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0cycsIEpTT04uc3RyaW5naWZ5KFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBDYXJkQWRkdG9DYXJ0LmNsYXNzTGlzdC50b2dnbGUoJ19wcm9kdWN0LWFkZGVkJyk7XG4gICAgICAgIFByb2R1Y3RzRnJvbUxvY2FsU3RvcmFnZS5mb3JFYWNoKChpdCkgPT4ge1xuICAgICAgICAgIGNvdW50ZXIgKz0gaXQuY291bnRlcjtcbiAgICAgICAgICB0b3RhbHByaWNlICs9IGl0LmNvdW50ZXIgKiBpdC5wcmljZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGNhcnRRdWFudGl0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudGVyLWJhc2tldCcpO1xuICAgICAgICBjb25zdCBBbGxQcmljZUJhc2tldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGwtcHJpY2UtYmFza2V0Jyk7XG4gICAgICAgIGNvbnN0IGJhc2tldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYXNrZXQtaW1nJyk7XG4gICAgICAgIGlmIChjb3VudGVyICE9PSAwKSB7XG4gICAgICAgICAgbGV0IGNjID0gMDtcbiAgICAgICAgICBQcm9kdWN0c0Zyb21Mb2NhbFN0b3JhZ2UuZm9yRWFjaCgoaXRlbSkgPT4gKGNjICs9IGl0ZW0uY291bnRlcikpO1xuICAgICAgICAgIGNhcnRRdWFudGl0eSEudGV4dENvbnRlbnQgPSBjYy50b1N0cmluZygpO1xuICAgICAgICAgIGNhcnRRdWFudGl0eSEuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgICBjYXJ0UXVhbnRpdHkhLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgQWxsUHJpY2VCYXNrZXQhLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgIGJhc2tldCEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICBBbGxQcmljZUJhc2tldCEudGV4dENvbnRlbnQgPSAnJCAnICsgdG90YWxwcmljZS50b1N0cmluZygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhcnRRdWFudGl0eSEuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICAgIGNhcnRRdWFudGl0eSEuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgICAgICBBbGxQcmljZUJhc2tldCEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICBiYXNrZXQhLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG4gICAgICAgIC8vbG9jYWxTdG9yYWdlLnNldEl0ZW0oJycpXG4gICAgICB9KTtcblxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3JlX19vcHRpb25CbG9jazEnKSEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlmICgoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXcxJykgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZCkge1xuICAgICAgICAgIGlmIChDYXJkQm94LmNsYXNzTGlzdC5jb250YWlucygnX3NtYWxsLXZpZXcnKSkge1xuICAgICAgICAgICAgQ2FyZEJveC5jbGFzc0xpc3QucmVtb3ZlKCdfc21hbGwtdmlldycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdG9yZV9fb3B0aW9uQmxvY2syJykhLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBpZiAoKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3MicpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQpIHtcbiAgICAgICAgICBDYXJkQm94LmNsYXNzTGlzdC5hZGQoJ19zbWFsbC12aWV3Jyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gICBJTVBPUlRTICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmltcG9ydCB7IENyZWF0ZVJhbmdlQmxvY2sgfSBmcm9tICcuL0NvbXBvbmVudHMvQ3JlYXRlUmFuZ2VCbG9jayc7XG5pbXBvcnQgeyBDcmVhdGVTb3J0TWVudSB9IGZyb20gJy4vQ29tcG9uZW50cy9DcmVhdGVTb3J0TWVudSc7XG5pbXBvcnQgeyBDcmVhdGVDaGVja2JveCB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlQ2hlY2tib3gnO1xuaW1wb3J0IHsgQ3JlYXRlRWxlbWVudCB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlRWxlbWVudCc7XG5pbXBvcnQgeyBDcmVhdGVJbWFnZSB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlSW1hZ2UnO1xuaW1wb3J0IGRhdGEgZnJvbSAnLi9kYXRhJztcbmltcG9ydCBDcmVhdGVSb3V0ZSBmcm9tICcuL3JvdXRlJztcbmltcG9ydCB7IENyZWF0ZVNlYXJjaEJhciB9IGZyb20gJy4vQ29tcG9uZW50cy9DcmVhdGVTZWFyY2hCYXInO1xuaW1wb3J0IHsgZmlsdGVycywgcHJvZHVjdCB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDcmVhdGVSYWRpbyB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlUmFkaW8nO1xuaW1wb3J0IHsgQ3JlYXRlTGluayB9IGZyb20gJy4vRWxlbWVudHMvQ3JlYXRlTGluayc7XG5cbmNsYXNzIENyZWF0ZURlZmF1bHRQYWdlIHtcbiAgLy8g0L/QtdGA0LXQvNC10L3QvdCw0Y8g0LrQvtGC0L7RgNCw0Y8g0YXRgNCw0L3QuNGCIGJvZHlcbiAgcHJpdmF0ZSBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgLy8g0KDQvtGD0YLQtdGAXG4gIHByaXZhdGUgcm91dGVyID0gbmV3IENyZWF0ZVJvdXRlKCk7XG4gIC8vINC80LXRgtC+0LQg0YHQvtC30LTQsNC10YIgaGVhZGVyXG4gIENyZWF0ZUhlYWRlcigpIHtcbiAgICAvLyDRgdC+0LfQtNCw0LXQvCBoZWFkZXIsINC/0LXRgNC10LTQsNC10Lwg0LIg0LrQvtC90YHRgtGA0YPQutGC0L7RgCDQvdC1INCy0YHQtSDQstC+0LfQvNC+0LbQvdGL0LUg0LDRgNCz0YPQvNC10L3RgtGLLCDQvdC+INC+0L0g0L3QtSDRgNGD0LPQsNC10YLRgdGPXG4gICAgY29uc3QgaGVhZGVyID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdoZWFkZXInLCBjbGFzc05hbWU6ICdoZWFkZXInIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCB3cmFwcGVyID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICd3cmFwcGVyIGhlYWRlcl9fd3JhcHBlcicgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IHRleHRCbG9jayA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnaGVhZGVyX190ZXh0JyB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgY2FydEJsb2NrID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdoZWFkZXJfX2NhcnQnIH0pLmdldG5vZGUoKTtcbiAgICB0aGlzLmJvZHkuYXBwZW5kKGhlYWRlcik7XG4gICAgaGVhZGVyLmFwcGVuZCh3cmFwcGVyKTtcbiAgICB3cmFwcGVyLmFwcGVuZCh0ZXh0QmxvY2ssIGNhcnRCbG9jayk7XG4gICAgY29uc3QgaDEgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2gxJywgY2xhc3NOYW1lOiAnaDEnLCBjb250ZW50OiAnT25saW5lIFN0b3JlJyB9KS5nZXRub2RlKCk7XG4gICAgdGhpcy5yb3V0ZXIuQWRkUm91dGluZ1RvSGVhZGVyKGgxKTtcbiAgICBjb25zdCBzdWJ0aXRsZSA9IG5ldyBDcmVhdGVFbGVtZW50KHtcbiAgICAgIHRhZzogJ3NwYW4nLFxuICAgICAgY2xhc3NOYW1lOiAnaGVhZGVyX19zdWJ0aXRsZScsXG4gICAgICBjb250ZW50OiAnYmVzdCBwcm9kdWN0cywgYmVzdCBzYWxlcywgYmVzdCBzZXJ2aWNlJyxcbiAgICB9KS5nZXRub2RlKCk7XG4gICAgdGV4dEJsb2NrLmFwcGVuZChoMSwgc3VidGl0bGUpO1xuICAgIGNvbnN0IGNhcnQgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2NhcnQnLCBpZDogJ2Jhc2tldCcgfSkuZ2V0bm9kZSgpO1xuICAgIHRoaXMucm91dGVyLkFkZFJvdXRpbmdUb0Jhc2tldChjYXJ0KTtcbiAgICBjYXJ0QmxvY2suYXBwZW5kKGNhcnQpO1xuICAgIGNvbnN0IGNhcnRJY29uID0gbmV3IENyZWF0ZUltYWdlKHtcbiAgICAgIHNyYzogJy4vYXNzZXRzL2ltYWdlcy9jYXJ0LnN2ZycsXG4gICAgICBjbGFzc05hbWU6ICdjYXJ0X19pY29uJyxcbiAgICAgIGFsdDogJ2NhcnQgaWNvbicsXG4gICAgICBpZDogJ2Jhc2tldC1pbWcnLFxuICAgIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCBjYXJ0VG90YWwgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XG4gICAgICB0YWc6ICdzcGFuJyxcbiAgICAgIGNsYXNzTmFtZTogJ2NhcnRfX3RvdGFsJyxcbiAgICAgIGlkOiAnYWxsLXByaWNlLWJhc2tldCcsXG4gICAgICBjb250ZW50OiAnMTAwMDAkJyxcbiAgICB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgY2FydFF1YW50aXR5ID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xuICAgICAgdGFnOiAnc3BhbicsXG4gICAgICBjbGFzc05hbWU6ICdjYXJ0X19xdWFudGl0eScsXG4gICAgICBpZDogJ2NvdW50ZXItYmFza2V0JyxcbiAgICAgIGNvbnRlbnQ6ICcxJyxcbiAgICB9KS5nZXRub2RlKCk7XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBEYXRhRnJvbUxvY2FsOiBwcm9kdWN0W10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpISk7XG4gICAgICBpZiAoRGF0YUZyb21Mb2NhbC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgbGV0IGNjID0gMDtcbiAgICAgICAgbGV0IHRvdGFscHJpY2UgPSAwO1xuICAgICAgICBEYXRhRnJvbUxvY2FsLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBjYyArPSBpdGVtLmNvdW50ZXI7XG4gICAgICAgICAgdG90YWxwcmljZSArPSBpdGVtLnByaWNlICogaXRlbS5jb3VudGVyO1xuICAgICAgICB9KTtcbiAgICAgICAgY2FydFF1YW50aXR5LnRleHRDb250ZW50ID0gY2MudG9TdHJpbmcoKTtcbiAgICAgICAgY2FydFF1YW50aXR5LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgIGNhcnRRdWFudGl0eS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICBjYXJ0VG90YWwudGV4dENvbnRlbnQgPSAnJCAnICsgdG90YWxwcmljZS50b1N0cmluZygpO1xuICAgICAgICBjYXJ0VG90YWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIGNhcnRJY29uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIC8vY2FydFF1YW50aXR5LmNsYXNzTGlzdC5hZGQoJ2NhcnRfX3F1YW50aXR5X3Zpc2libGUnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY2FydC5hcHBlbmQoY2FydEljb24sIGNhcnRUb3RhbCwgY2FydFF1YW50aXR5KTtcbiAgfVxuICAvLyDQvNC10YLQvtC0INC00LvRjyBtYWluXG4gIENyZWF0ZU1haW4oZmlsdGVyczogZmlsdGVycywgUHJvZHVjdHNDYXJkczogcHJvZHVjdFtdKSB7XG4gICAgdGhpcy5yb3V0ZXIuR2V0RmlsdGVycyhmaWx0ZXJzKTtcbiAgICBjb25zdCBwcm9kdWN0ID0gbmV3IGRhdGEoKTtcbiAgICBjb25zdCBtYWluID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdtYWluJywgY2xhc3NOYW1lOiAnbWFpbicgfSkuZ2V0bm9kZSgpO1xuICAgIHRoaXMuYm9keS5hcHBlbmQobWFpbik7XG4gICAgY29uc3Qgd3JhcHBlciA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnd3JhcHBlciBtYWluX193cmFwcGVyJyB9KS5nZXRub2RlKCk7XG4gICAgbWFpbi5hcHBlbmQod3JhcHBlcik7XG4gICAgLy8gQ3JlYXRlQXNpZGVcbiAgICBjb25zdCBhc2lkZSA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnYXNpZGUnLCBjbGFzc05hbWU6ICdhc2lkZScgfSkuZ2V0bm9kZSgpO1xuICAgIHdyYXBwZXIuYXBwZW5kKGFzaWRlKTtcbiAgICBjb25zdCBidXR0b25Ub3AgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XG4gICAgICB0YWc6ICdidXR0b24nLFxuICAgICAgY2xhc3NOYW1lOiAnYnV0dG9uIGFzaWRlX19idXR0b24nLFxuICAgICAgY29udGVudDogJ1Jlc2V0JyxcbiAgICB9KS5nZXRub2RlKCk7XG4gICAgdGhpcy5yb3V0ZXIuQWRkUm91dGluZ1RvSGVhZGVyKGJ1dHRvblRvcCk7XG4gICAgY29uc3QgY2F0ZWdvcmllcyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnYXNpZGVfX2Nob2ljZSBjaG9pY2UtbWVudScgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IGJyYW5kcyA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnYXNpZGVfX2Nob2ljZSBjaG9pY2UtbWVudScgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IEN1cnJlbnRQcmljZSA9IHByb2R1Y3QuR2V0Q3VycmVudE1pbk1heFByaWNlKFByb2R1Y3RzQ2FyZHMpO1xuICAgIGNvbnN0IE1heE1pblByaWNlcyA9IHByb2R1Y3QuR2V0TWluTWF4UHJpY2UoKTtcbiAgICBjb25zdCBwcmlzZXMgPSBuZXcgQ3JlYXRlUmFuZ2VCbG9jayh7XG4gICAgICB0aXRsZTogJ1ByaXNlcycsXG4gICAgICBmcm9tOiBgJCAke2ZpbHRlcnMuTWluUHJpY2V9YCxcbiAgICAgIHRvOiBgJCAke2ZpbHRlcnMuTWF4UHJpY2V9YCxcbiAgICAgIHJhbmdlMU1pbjogTWF4TWluUHJpY2VzLm1pbixcbiAgICAgIHJhbmdlMU1heDogTWF4TWluUHJpY2VzLm1heCxcbiAgICAgIHJhbmdlMVZhbHVlOiBmaWx0ZXJzLk1pblByaWNlLFxuICAgICAgcmFuZ2UyTWluOiBNYXhNaW5QcmljZXMubWluLFxuICAgICAgcmFuZ2UyTWF4OiBNYXhNaW5QcmljZXMubWF4LFxuICAgICAgcmFuZ2UyVmFsdWU6IGZpbHRlcnMuTWF4UHJpY2UsXG4gICAgICBpc1ByaWNlOiB0cnVlLFxuICAgICAgaWQ6ICdwcmljZS1zbGlkZXInLFxuICAgICAgcm91dGVyOiB0aGlzLnJvdXRlcixcbiAgICAgIGZpbHRlcnM6IGZpbHRlcnMsXG4gICAgICBjdXJyZW50OiBDdXJyZW50UHJpY2UsXG4gICAgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IEN1cnJlbnREYXRlID0gcHJvZHVjdC5HZXRDdXJyZW50TWluTWF4RGF0ZShQcm9kdWN0c0NhcmRzKTtcbiAgICBjb25zdCBNYXhNaW5EYXRlID0gcHJvZHVjdC5HZXRNaW5NYXhEYXRlKCk7XG4gICAgY29uc3QgeWVhciA9IG5ldyBDcmVhdGVSYW5nZUJsb2NrKHtcbiAgICAgIHRpdGxlOiAnUmVsZWFzZSBkYXRlJyxcbiAgICAgIGZyb206IGZpbHRlcnMuTWluWWVhcixcbiAgICAgIHRvOiBmaWx0ZXJzLk1heFllYXIsXG4gICAgICByYW5nZTFNaW46IE1heE1pbkRhdGUubWluLFxuICAgICAgcmFuZ2UxTWF4OiBNYXhNaW5EYXRlLm1heCxcbiAgICAgIHJhbmdlMVZhbHVlOiBmaWx0ZXJzLk1pblllYXIsXG4gICAgICByYW5nZTJNaW46IE1heE1pbkRhdGUubWluLFxuICAgICAgcmFuZ2UyTWF4OiBNYXhNaW5EYXRlLm1heCxcbiAgICAgIHJhbmdlMlZhbHVlOiBmaWx0ZXJzLk1heFllYXIsXG4gICAgICBpc1ByaWNlOiBmYWxzZSxcbiAgICAgIGlkOiAneWVhci1zbGlkZXInLFxuICAgICAgcm91dGVyOiB0aGlzLnJvdXRlcixcbiAgICAgIGZpbHRlcnM6IGZpbHRlcnMsXG4gICAgICBjdXJyZW50OiBDdXJyZW50RGF0ZSxcbiAgICB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgYnV0dG9uQm90dG9tID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xuICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgIGNsYXNzTmFtZTogJ2J1dHRvbiBhc2lkZV9fYnV0dG9uJyxcbiAgICAgIGNvbnRlbnQ6ICdDb3B5IHNlYXJjaCBsaW5rJyxcbiAgICB9KS5nZXRub2RlKCk7XG4gICAgYnV0dG9uQm90dG9tLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIH0pO1xuICAgIGFzaWRlLmFwcGVuZChidXR0b25Ub3AsIGNhdGVnb3JpZXMsIGJyYW5kcywgcHJpc2VzLCB5ZWFyLCBidXR0b25Cb3R0b20pO1xuICAgIGNvbnN0IGNhdGVnb3JpZXNUaXRsZSA9IG5ldyBDcmVhdGVFbGVtZW50KHtcbiAgICAgIHRhZzogJ2gyJyxcbiAgICAgIGNsYXNzTmFtZTogJ2Nob2ljZS1tZW51X190aXRsZScsXG4gICAgICBjb250ZW50OiAnQ2F0ZWdvcnknLFxuICAgIH0pLmdldG5vZGUoKTtcbiAgICBjYXRlZ29yaWVzLmFwcGVuZChjYXRlZ29yaWVzVGl0bGUpO1xuICAgIGNvbnN0IExpc3RDYXRlZ29yaWVzID0gcHJvZHVjdC5HZXRDYXRlZ29yaWVzKFByb2R1Y3RzQ2FyZHMpO1xuICAgIC8vY29uc3QgTGlzdE9mQ3VycmVudENhdGVnb3JpZXMgPSBwcm9kdWN0LkdldEN1cnJlbnRDYXRlZ29yaWVzKFByb2R1Y3RzQ2FyZHMpO1xuICAgIExpc3RDYXRlZ29yaWVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnQ6IFtIVE1MSW5wdXRFbGVtZW50LCBIVE1MTGFiZWxFbGVtZW50XSA9IG5ldyBDcmVhdGVDaGVja2JveCh7XG4gICAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICAgIG5hbWU6ICdDYXRlZ29yeScsXG4gICAgICAgIGlkOiBpdGVtLmNhdGVnb3J5LFxuICAgICAgICB2YWx1ZTogaXRlbS5jYXRlZ29yeSxcbiAgICAgICAgY2xhc3NOYW1lOiAnY2hvaWNlLW1lbnVfX29wdGlvbicsXG4gICAgICAgIENvdW50OiBpdGVtLmNvdW50LFxuICAgICAgICBDdXJyZW50OiBpdGVtLkN1cnJlbnRDYXRlZ29yeSxcbiAgICAgICAgZmlsdGVyczogZmlsdGVycy5DYXRlZ29yeSxcbiAgICAgIH0pLmdldG5vZGUoKTtcbiAgICAgIHRoaXMucm91dGVyLkFkZFJvdXRpbmdUb0NhdGVnb3J5KGN1cnJlbnRbMF0pO1xuICAgICAgY2F0ZWdvcmllcy5hcHBlbmQoY3VycmVudFswXSwgY3VycmVudFsxXSk7XG4gICAgfSk7XG4gICAgY29uc3QgYnJhbmRzVGl0bGUgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2gyJywgY2xhc3NOYW1lOiAnY2hvaWNlLW1lbnVfX3RpdGxlJywgY29udGVudDogJ0JyYW5kJyB9KS5nZXRub2RlKCk7XG4gICAgYnJhbmRzLmFwcGVuZChicmFuZHNUaXRsZSk7XG4gICAgY29uc3QgTGlzdEJyYW5kcyA9IHByb2R1Y3QuR2V0QnJhbmRzKFByb2R1Y3RzQ2FyZHMpO1xuICAgIExpc3RCcmFuZHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudCA9IG5ldyBDcmVhdGVDaGVja2JveCh7XG4gICAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICAgIG5hbWU6ICdDYXRlZ29yeScsXG4gICAgICAgIGlkOiBpdGVtLmJyYW5kLFxuICAgICAgICB2YWx1ZTogaXRlbS5icmFuZCxcbiAgICAgICAgY2xhc3NOYW1lOiAnY2hvaWNlLW1lbnVfX29wdGlvbicsXG4gICAgICAgIENvdW50OiBpdGVtLmNvdW50LFxuICAgICAgICBDdXJyZW50OiBpdGVtLkN1cnJlbnRCcmFuZCxcbiAgICAgICAgZmlsdGVyczogZmlsdGVycy5CcmFuZCxcbiAgICAgIH0pLmdldG5vZGUoKTtcbiAgICAgIHRoaXMucm91dGVyLkFkZFJvdXRpbmdUb0JyYW5kKGN1cnJlbnRbMF0pO1xuICAgICAgYnJhbmRzLmFwcGVuZChjdXJyZW50WzBdLCBjdXJyZW50WzFdKTtcbiAgICB9KTtcbiAgICAvLyBDcmVhdGVTdG9yZVxuICAgIGNvbnN0IHN0b3JlID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzdG9yZScgfSkuZ2V0bm9kZSgpO1xuICAgIHdyYXBwZXIuYXBwZW5kKHN0b3JlKTtcbiAgICBjb25zdCBtZW51ID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdzdG9yZV9fbWVudScgfSkuZ2V0bm9kZSgpO1xuICAgIC8vLy8vICBtZW51XG4gICAgY29uc3Qgdmlld09wdGlvbnMgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N0b3JlX192aWV3JyB9KS5nZXRub2RlKCk7XG4gICAgY29uc3Qgdmlld0Jsb2NrMSA9IG5ldyBDcmVhdGVFbGVtZW50KHtcbiAgICAgIHRhZzogJ2RpdicsXG4gICAgICBjbGFzc05hbWU6ICdzdG9yZV9fb3B0aW9uQmxvY2sxJyxcbiAgICAgIGlkOiAnc3RvcmVfX29wdGlvbkJsb2NrMScsXG4gICAgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IHZpZXcxID0gbmV3IENyZWF0ZVJhZGlvKHtcbiAgICAgIHR5cGU6ICdyYWRpbycsXG4gICAgICB2YWx1ZTogJycsXG4gICAgICBpZDogJ3ZpZXcxJyxcbiAgICAgIG5hbWU6ICd2aWV3JyxcbiAgICAgIGNsYXNzTmFtZTogJ3ZpZXctb3B0aW9uMScsXG4gICAgICBjaGVja2VkOiB0cnVlLFxuICAgIH0pLmdldG5vZGUoKTtcbiAgICB2aWV3QmxvY2sxLmFwcGVuZCh2aWV3MVswXSwgdmlldzFbMV0pO1xuICAgIGNvbnN0IHZpZXcyID0gbmV3IENyZWF0ZVJhZGlvKHtcbiAgICAgIHR5cGU6ICdyYWRpbycsXG4gICAgICB2YWx1ZTogJycsXG4gICAgICBpZDogJ3ZpZXcyJyxcbiAgICAgIG5hbWU6ICd2aWV3JyxcbiAgICAgIGNsYXNzTmFtZTogJ3ZpZXctb3B0aW9uMicsXG4gICAgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IHZpZXdCbG9jazIgPSBuZXcgQ3JlYXRlRWxlbWVudCh7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY2xhc3NOYW1lOiAnc3RvcmVfX29wdGlvbkJsb2NrMicsXG4gICAgICBpZDogJ3N0b3JlX19vcHRpb25CbG9jazInLFxuICAgIH0pLmdldG5vZGUoKTtcbiAgICB2aWV3QmxvY2syLmFwcGVuZCh2aWV3MlswXSwgdmlldzJbMV0pO1xuICAgIHZpZXdPcHRpb25zLmFwcGVuZCh2aWV3QmxvY2sxLCB2aWV3QmxvY2syKTtcbiAgICAvLy8vLy8vXG4gICAgY29uc3QgZm91bmRQcm9kdWN0cyA9IG5ldyBDcmVhdGVFbGVtZW50KHtcbiAgICAgIHRhZzogJ2RpdicsXG4gICAgICBjbGFzc05hbWU6ICdzdG9yZV9fcXVhbnRpdHknLFxuICAgICAgY29udGVudDogJ0ZvdW5kIDogJyxcbiAgICB9KS5nZXRub2RlKCk7XG4gICAgY29uc3QgcHJvZHVjdHNBbW1vdW50ID0gbmV3IENyZWF0ZUVsZW1lbnQoe1xuICAgICAgdGFnOiAnc3BhbicsXG4gICAgICBjbGFzc05hbWU6ICdzdG9yZV9fcXVhbnRpdHktZm91bmQnLFxuICAgICAgY29udGVudDogUHJvZHVjdHNDYXJkcy5sZW5ndGgudG9TdHJpbmcoKSxcbiAgICB9KS5nZXRub2RlKCk7XG4gICAgZm91bmRQcm9kdWN0cy5hcHBlbmQocHJvZHVjdHNBbW1vdW50KTtcbiAgICBjb25zdCBzb3J0TWVudSA9IG5ldyBDcmVhdGVTb3J0TWVudSh7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY2xhc3NOYW1lOiAnc29ydC1tZW51JyxcbiAgICAgIHJvdXRlcjogdGhpcy5yb3V0ZXIsXG4gICAgICBmaWx0ZXI6IGZpbHRlcnMuU29ydCxcbiAgICB9KS5nZXRub2RlKCk7XG4gICAgY29uc3Qgc2VhcmNoQmFyID0gbmV3IENyZWF0ZVNlYXJjaEJhcih7XG4gICAgICB0YWc6ICdkaXYnLFxuICAgICAgY2xhc3NOYW1lOiAnc2VhcmNoJyxcbiAgICAgIHJvdXRlcjogdGhpcy5yb3V0ZXIsXG4gICAgICBmaWx0ZXI6IGZpbHRlcnMuU2VhcmNoLFxuICAgIH0pLmdldG5vZGUoKTtcbiAgICBtZW51LmFwcGVuZCh2aWV3T3B0aW9ucywgZm91bmRQcm9kdWN0cywgc2VhcmNoQmFyLCBzb3J0TWVudSk7XG5cbiAgICAvLy8vLyBwcm9kdWN0c1xuXG4gICAgY29uc3QgcHJvZHVjdHMgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ3N0b3JlX19wcm9kdWN0cycsIGlkOiAnc3RvcmVfX3Byb2R1Y3RzJyB9KS5nZXRub2RlKCk7XG4gICAgc3RvcmUuYXBwZW5kKG1lbnUsIHByb2R1Y3RzKTtcbiAgfVxuICAvLyDQvNC10YLQvtC0INC00LvRjyBmb290ZXJcbiAgQ3JlYXRlRm9vdGVyKCkge1xuICAgIGNvbnN0IGZvb3RlciA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZm9vdGVyJywgY2xhc3NOYW1lOiAnZm9vdGVyJyB9KS5nZXRub2RlKCk7XG4gICAgY29uc3Qgd3JhcHBlciA9IG5ldyBDcmVhdGVFbGVtZW50KHsgdGFnOiAnZGl2JywgY2xhc3NOYW1lOiAnd3JhcHBlciBmb290ZXJfX3dyYXBwZXInIH0pLmdldG5vZGUoKTtcbiAgICBmb290ZXIuYXBwZW5kKHdyYXBwZXIpO1xuICAgIHRoaXMuYm9keS5hcHBlbmQoZm9vdGVyKTtcbiAgICBjb25zdCBjYXJ0QmxvY2sgPSBuZXcgQ3JlYXRlRWxlbWVudCh7IHRhZzogJ2RpdicsIGNsYXNzTmFtZTogJ2Zvb3Rlcl9fY2FydCcgfSkuZ2V0bm9kZSgpO1xuICAgIGNvbnN0IGZvb3RlckNhcnQgPSBuZXcgQ3JlYXRlTGluayh7XG4gICAgICBocmVmOiAnaHR0cHM6Ly9ycy5zY2hvb2wvanMvJyxcbiAgICAgIHRhcmdldDogJ19ibGFuaycsXG4gICAgICBjbGFzc05hbWU6ICdmb290ZXJfX2NhcnRfbGlnaHQnLFxuICAgIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCBmb290ZXJJY29uID0gbmV3IENyZWF0ZUltYWdlKHtcbiAgICAgIHNyYzogJy4vYXNzZXRzL2ltYWdlcy9sb2dvX3JzX3RleHQuc3ZnJyxcbiAgICAgIGFsdDogJ1JTIFNjaG9vbCcsXG4gICAgICBjbGFzc05hbWU6ICdmb290ZXJfX2xvZ28nLFxuICAgIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCByZWZlcmVuY2VzID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdkaXYnLCBjbGFzc05hbWU6ICdmb290ZXJfX3JlZmVyZW5jZXMnIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCB5ZWFyID0gbmV3IENyZWF0ZUVsZW1lbnQoeyB0YWc6ICdzcGFuJywgY2xhc3NOYW1lOiAnZm9vdGVyX195ZWFyJywgY29udGVudDogJzIwMjInIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCBTYXNoYUxpbmsgPSBuZXcgQ3JlYXRlTGluayh7XG4gICAgICBocmVmOiAnaHR0cHM6Ly9naXRodWIuY29tL2JhbGF4b24nLFxuICAgICAgdGFyZ2V0OiAnX2JsYW5rJyxcbiAgICAgIGNsYXNzTmFtZTogJ2Zvb3Rlcl9fU2FzaGFHaXQnLFxuICAgICAgY29udGVudDogJ2JhbGF4b24nLFxuICAgIH0pLmdldG5vZGUoKTtcbiAgICBjb25zdCBOYXRhTGluayA9IG5ldyBDcmVhdGVMaW5rKHtcbiAgICAgIGhyZWY6ICdodHRwczovL2dpdGh1Yi5jb20vRW5heWFBbWUnLFxuICAgICAgdGFyZ2V0OiAnX2JsYW5rJyxcbiAgICAgIGNsYXNzTmFtZTogJ2Zvb3Rlcl9fTmF0YUdpdCcsXG4gICAgICBjb250ZW50OiAnRW5heWFBbWUnLFxuICAgIH0pLmdldG5vZGUoKTtcbiAgICByZWZlcmVuY2VzLmFwcGVuZChTYXNoYUxpbmssIE5hdGFMaW5rLCB5ZWFyKTtcbiAgICBmb290ZXJDYXJ0LmFwcGVuZChmb290ZXJJY29uKTtcbiAgICBjYXJ0QmxvY2suYXBwZW5kKGZvb3RlckNhcnQpO1xuICAgIHdyYXBwZXIuYXBwZW5kKGNhcnRCbG9jaywgcmVmZXJlbmNlcyk7XG4gIH1cbn1cblxuLy8gY29uc3QgUGFnZSA9IG5ldyBDcmVhdGVEZWZhdWx0UGFnZSgpO1xuXG4vLyBQYWdlLkNyZWF0ZUhlYWRlcigpO1xuLy8gUGFnZS5DcmVhdGVNYWluKCk7XG4vLyBQYWdlLkNyZWF0ZUZvb3RlcigpO1xuXG5leHBvcnQgZGVmYXVsdCBDcmVhdGVEZWZhdWx0UGFnZTtcbiIsImltcG9ydCB7IENvbnN0cnVjdG9yQ2hlY2tib3ggfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGNsYXNzIENyZWF0ZUNoZWNrYm94IHtcbiAgcHJpdmF0ZSBpbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgcHJpdmF0ZSBsYWJlbDogSFRNTExhYmVsRWxlbWVudDtcbiAgY29uc3RydWN0b3IoeyB0eXBlLCBuYW1lLCBpZCwgdmFsdWUsIGNsYXNzTmFtZSwgQ291bnQsIEN1cnJlbnQsIGZpbHRlcnMgfTogQ29uc3RydWN0b3JDaGVja2JveCkge1xuICAgIHRoaXMuaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRoaXMuaW5wdXQudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5pbnB1dC5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlucHV0LmlkID0gaWQ7XG4gICAgdGhpcy5pbnB1dC52YWx1ZSA9IHZhbHVlO1xuXG4gICAgZmlsdGVycz8uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0gPT09IHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaW5wdXQuY2hlY2tlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgdGhpcy5pbnB1dC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIHRoaXMubGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRoaXMubGFiZWwuaHRtbEZvciA9IGlkO1xuICAgIHRoaXMubGFiZWwudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICBjb25zdCBxdWFudGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBxdWFudGl0eS50ZXh0Q29udGVudCA9IGAgICgke0N1cnJlbnR9LyR7Q291bnR9KWA7XG4gICAgdGhpcy5sYWJlbC5hcHBlbmQocXVhbnRpdHkpO1xuICB9XG4gIGdldG5vZGUoKSB7XG4gICAgY29uc3QgYXJyOiBbSFRNTElucHV0RWxlbWVudCwgSFRNTExhYmVsRWxlbWVudF0gPSBbdGhpcy5pbnB1dCwgdGhpcy5sYWJlbF07XG4gICAgcmV0dXJuIGFycjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29uc3RydWN0b3JFbGVtZW50IH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBjbGFzcyBDcmVhdGVFbGVtZW50IHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MRWxlbWVudDtcbiAgY29uc3RydWN0b3IoeyB0YWcsIGlkLCBjbGFzc05hbWUsIGNvbnRlbnQsIEJhY2tncm91bmRJbWcgfTogQ29uc3RydWN0b3JFbGVtZW50KSB7XG4gICAgdGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBpZiAoaWQpIHtcbiAgICAgIHRoaXMuZWwuaWQgPSBpZDtcbiAgICB9XG4gICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgdGhpcy5lbC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgfVxuICAgIGlmIChjb250ZW50KSB7XG4gICAgICB0aGlzLmVsLnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICB9XG4gICAgaWYgKEJhY2tncm91bmRJbWcpIHtcbiAgICAgIHRoaXMuZWwuc3R5bGUuYmFja2dyb3VuZCA9IGB3aGl0ZSB1cmwoJyR7QmFja2dyb3VuZEltZ30nKSBuby1yZXBlYXQgY2VudGVyIC8gY29udGFpbmA7XG4gICAgfVxuICB9XG4gIGdldG5vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWw7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbnN0cnVjdG9ySW1hZ2UgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGNsYXNzIENyZWF0ZUltYWdlIHtcbiAgcHJpdmF0ZSBlbDogSFRNTEltYWdlRWxlbWVudDtcbiAgY29uc3RydWN0b3IoeyBzcmMsIGlkLCBjbGFzc05hbWUsIGFsdCB9OiBDb25zdHJ1Y3RvckltYWdlKSB7XG4gICAgdGhpcy5lbCA9IG5ldyBJbWFnZSgpO1xuICAgIHRoaXMuZWwuc3JjID0gc3JjO1xuICAgIGlmIChpZCkge1xuICAgICAgdGhpcy5lbC5pZCA9IGlkO1xuICAgIH1cbiAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgaWYgKGFsdCkge1xuICAgICAgdGhpcy5lbC5hbHQgPSBhbHQ7XG4gICAgfVxuICB9XG4gIGdldG5vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWw7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbnN0cnVjdG9yTGluayB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgY2xhc3MgQ3JlYXRlTGluayB7XG4gIHByaXZhdGUgbGluazogSFRNTEFuY2hvckVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoeyBocmVmLCBpZCwgY2xhc3NOYW1lLCB0YXJnZXQsIGNvbnRlbnQgfTogQ29uc3RydWN0b3JMaW5rKSB7XG4gICAgdGhpcy5saW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHRoaXMubGluay5ocmVmID0gaHJlZjtcbiAgICBpZiAoY29udGVudCkge1xuICAgICAgdGhpcy5saW5rLnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICB9XG4gICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgdGhpcy5saW5rLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICB9XG4gICAgaWYgKGlkKSB7XG4gICAgICB0aGlzLmxpbmsuaWQgPSBpZDtcbiAgICB9XG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgdGhpcy5saW5rLnRhcmdldCA9IHRhcmdldDtcbiAgICB9XG4gIH1cblxuICBnZXRub2RlKCkge1xuICAgIHJldHVybiB0aGlzLmxpbms7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbnN0cnVjdG9yTnVtYmVySW5wdXQgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGNsYXNzIENyZWF0ZU51bWJlcklucHV0IHtcbiAgcHJpdmF0ZSBpbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgY29uc3RydWN0b3IoeyB0eXBlLCB2YWx1ZSwgaWQsIGNsYXNzTmFtZSwgcGxhY2Vob2xkZXIsIHJlcXVpcmVkIH06IENvbnN0cnVjdG9yTnVtYmVySW5wdXQpIHtcbiAgICB0aGlzLmlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aGlzLmlucHV0LnR5cGUgPSB0eXBlO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5pbnB1dC52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBpZiAoaWQpIHtcbiAgICAgIHRoaXMuaW5wdXQuaWQgPSBpZDtcbiAgICB9XG4gICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgdGhpcy5pbnB1dC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIGlmIChwbGFjZWhvbGRlcikge1xuICAgICAgdGhpcy5pbnB1dC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgIHRoaXMuaW5wdXQucmVxdWlyZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBnZXRub2RlKCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb25zdHJ1Y3RvclJhZGlvIH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBjbGFzcyBDcmVhdGVSYWRpbyB7XG4gIHByaXZhdGUgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHByaXZhdGUgbGFiZWw6IEhUTUxMYWJlbEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoeyB0eXBlLCB2YWx1ZSwgaWQsIG5hbWUsIGNsYXNzTmFtZSwgY2hlY2tlZCB9OiBDb25zdHJ1Y3RvclJhZGlvKSB7XG4gICAgdGhpcy5sYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgdGhpcy5sYWJlbC5odG1sRm9yID0gaWQ7XG4gICAgdGhpcy5sYWJlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xuXG4gICAgdGhpcy5pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5pbnB1dC50eXBlID0gdHlwZTtcbiAgICB0aGlzLmlucHV0Lm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaW5wdXQuaWQgPSBpZDtcbiAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICB0aGlzLmlucHV0LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgIHRoaXMuaW5wdXQuY2hlY2tlZCA9IGNoZWNrZWQ7XG4gICAgfVxuICB9XG4gIGdldG5vZGUoKSB7XG4gICAgY29uc3QgYXJyOiBbSFRNTElucHV0RWxlbWVudCwgSFRNTExhYmVsRWxlbWVudF0gPSBbdGhpcy5pbnB1dCwgdGhpcy5sYWJlbF07XG4gICAgcmV0dXJuIGFycjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29uc3RydWN0b3JSYW5nZSB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgY2xhc3MgQ3JlYXRlUmFuZ2Uge1xuICBwcml2YXRlIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICBjb25zdHJ1Y3Rvcih7IHR5cGUsIG1pbiwgbWF4LCB2YWx1ZSwgaWQsIGNsYXNzTmFtZSB9OiBDb25zdHJ1Y3RvclJhbmdlKSB7XG4gICAgdGhpcy5pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5pbnB1dC50eXBlID0gdHlwZTtcbiAgICB0aGlzLmlucHV0Lm1pbiA9IG1pbjtcbiAgICB0aGlzLmlucHV0Lm1heCA9IG1heDtcbiAgICB0aGlzLmlucHV0LmlkID0gaWQ7XG4gICAgdGhpcy5pbnB1dC52YWx1ZSA9IHZhbHVlO1xuICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgIHRoaXMuaW5wdXQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH1cbiAgfVxuICBnZXRub2RlKCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb25zdHJ1Y3RvdFRleHRJbnB1dCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgY2xhc3MgQ3JlYXRlVGV4dElucHV0IHtcbiAgcHJpdmF0ZSBpbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgY29uc3RydWN0b3IoeyB0eXBlLCBwbGFjZWhvbGRlciwgbmFtZSwgY2xhc3NOYW1lLCBpZCwgcmVxdWlyZWQgfTogQ29uc3RydWN0b3RUZXh0SW5wdXQpIHtcbiAgICB0aGlzLmlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aGlzLmlucHV0LnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuaW5wdXQubmFtZSA9IG5hbWU7XG4gICAgaWYgKHBsYWNlaG9sZGVyKSB7XG4gICAgICB0aGlzLmlucHV0LnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgIHRoaXMuaW5wdXQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH1cbiAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgIHRoaXMuaW5wdXQucmVxdWlyZWQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoaWQpIHtcbiAgICAgIHRoaXMuaW5wdXQuaWQgPSBpZDtcbiAgICB9XG4gIH1cbiAgZ2V0bm9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dDtcbiAgfVxufVxuIiwiaW1wb3J0IHByb2R1Y3RzIGZyb20gJy4uL2Fzc2V0cy9maWxlcy9kYXRhLmpzb24nO1xuaW1wb3J0IHsgQXBwbHlTb3J0IH0gZnJvbSAnLi9BcHBseVNvcnQnO1xuaW1wb3J0IHsgR2V0TWluTWF4LCBwcm9kdWN0IH0gZnJvbSAnLi9JbnRlcmZhY2VzJztcblxuaW50ZXJmYWNlIEdldENhdGVnb3JpZXMge1xuICBjYXRlZ29yeTogc3RyaW5nO1xuICBjb3VudDogbnVtYmVyO1xuICBDdXJyZW50Q2F0ZWdvcnk6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIEdldEJyYW5kcyB7XG4gIGJyYW5kOiBzdHJpbmc7XG4gIGNvdW50OiBudW1iZXI7XG4gIEN1cnJlbnRCcmFuZDogbnVtYmVyO1xufVxuXG5jbGFzcyBkYXRhIHtcbiAgcHJpdmF0ZSBMaXN0Q2F0ZWdvcmllczogc3RyaW5nW10gPSBbXTtcbiAgcHJpdmF0ZSBhcnI6IHByb2R1Y3RbXSA9IHByb2R1Y3RzO1xuICBwcml2YXRlIExpc3RCcmFuZHM6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYXJyLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmICh0aGlzLkxpc3RDYXRlZ29yaWVzLmluY2x1ZGVzKGl0ZW0uY2F0ZWdvcnkpID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLkxpc3RDYXRlZ29yaWVzLnB1c2goaXRlbS5jYXRlZ29yeSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5hcnIuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKHRoaXMuTGlzdEJyYW5kcy5pbmNsdWRlcyhpdGVtLmJyYW5kKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5MaXN0QnJhbmRzLnB1c2goaXRlbS5icmFuZCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgR2V0KCkge1xuICAgIHJldHVybiBwcm9kdWN0cztcbiAgfVxuICBHZXRDYXRlZ29yaWVzKGNhdGVnb3JpZXM6IHByb2R1Y3RbXSk6IEdldENhdGVnb3JpZXNbXSB7XG4gICAgY29uc3QgY2F0ID0gbmV3IEFwcGx5U29ydCgnU29ydCBieScsIHByb2R1Y3RzKS5yZXR1cm4oKTtcbiAgICB0aGlzLkxpc3RDYXRlZ29yaWVzID0gW107XG4gICAgY2F0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmICh0aGlzLkxpc3RDYXRlZ29yaWVzLmluY2x1ZGVzKGl0ZW0uY2F0ZWdvcnkpID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLkxpc3RDYXRlZ29yaWVzLnB1c2goaXRlbS5jYXRlZ29yeSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgUmVzQ2F0ZWdvcnk6IEdldENhdGVnb3JpZXNbXSA9IFtdO1xuICAgIHRoaXMuTGlzdENhdGVnb3JpZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgbGV0IGN1cnJlbnQgPSAwO1xuICAgICAgdGhpcy5hcnIuZm9yRWFjaCgoaXQpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0gPT09IGl0LmNhdGVnb3J5KSB7XG4gICAgICAgICAgY291bnRlciArPSAxO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNhdGVnb3JpZXMuZm9yRWFjaCgoaXQpID0+IHtcbiAgICAgICAgaWYgKGl0LmNhdGVnb3J5ID09PSBpdGVtKSB7XG4gICAgICAgICAgY3VycmVudCArPSAxO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IG9iajogR2V0Q2F0ZWdvcmllcyA9IHtcbiAgICAgICAgY2F0ZWdvcnk6IGl0ZW0sXG4gICAgICAgIGNvdW50OiBjb3VudGVyLFxuICAgICAgICBDdXJyZW50Q2F0ZWdvcnk6IGN1cnJlbnQsXG4gICAgICB9O1xuICAgICAgUmVzQ2F0ZWdvcnkucHVzaChvYmopO1xuICAgIH0pO1xuICAgIHJldHVybiBSZXNDYXRlZ29yeTtcbiAgfVxuICBHZXRCcmFuZHMoYnJhbmRzOiBwcm9kdWN0W10pOiBHZXRCcmFuZHNbXSB7XG4gICAgdGhpcy5MaXN0QnJhbmRzID0gW107XG4gICAgY29uc3QgYnJhbmQgPSBuZXcgQXBwbHlTb3J0KCdTb3J0IGJ5JywgcHJvZHVjdHMpLnJldHVybigpO1xuICAgIGJyYW5kLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmICh0aGlzLkxpc3RCcmFuZHMuaW5jbHVkZXMoaXRlbS5icmFuZCkgPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuTGlzdEJyYW5kcy5wdXNoKGl0ZW0uYnJhbmQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IFJlc0JyYW5kczogR2V0QnJhbmRzW10gPSBbXTtcbiAgICB0aGlzLkxpc3RCcmFuZHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgbGV0IGN1cnJlbnQgPSAwO1xuICAgICAgdGhpcy5hcnIuZm9yRWFjaCgoaXQpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0gPT09IGl0LmJyYW5kKSB7XG4gICAgICAgICAgY291bnRlciArPSAxO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGJyYW5kcy5mb3JFYWNoKChpdCkgPT4ge1xuICAgICAgICBpZiAoaXQuYnJhbmQgPT09IGl0ZW0pIHtcbiAgICAgICAgICBjdXJyZW50ICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgY29uc3Qgb2JqOiBHZXRCcmFuZHMgPSB7XG4gICAgICAgIGJyYW5kOiBpdGVtLFxuICAgICAgICBjb3VudDogY291bnRlcixcbiAgICAgICAgQ3VycmVudEJyYW5kOiBjdXJyZW50LFxuICAgICAgfTtcbiAgICAgIFJlc0JyYW5kcy5wdXNoKG9iaik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFJlc0JyYW5kcztcbiAgfVxuICBHZXRNaW5NYXhQcmljZShhcnI6IHByb2R1Y3RbXSA9IHByb2R1Y3RzKSB7XG4gICAgY29uc3QgTGlzdFByaWNlOiBudW1iZXJbXSA9IFtdO1xuICAgIGFyci5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBMaXN0UHJpY2UucHVzaChpdGVtLnByaWNlKTtcbiAgICB9KTtcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbi5hcHBseShudWxsLCBMaXN0UHJpY2UpO1xuICAgIGNvbnN0IG1heCA9IE1hdGgubWF4LmFwcGx5KG51bGwsIExpc3RQcmljZSk7XG4gICAgY29uc3Qgb2JqOiBHZXRNaW5NYXggPSB7XG4gICAgICBtYXg6IG1heC50b1N0cmluZygpLFxuICAgICAgbWluOiBtaW4udG9TdHJpbmcoKSxcbiAgICB9O1xuICAgIHJldHVybiBvYmo7XG4gIH1cbiAgR2V0TWluTWF4RGF0ZShhcnI6IHByb2R1Y3RbXSA9IHByb2R1Y3RzKSB7XG4gICAgY29uc3QgTGlzdERhdGU6IG51bWJlcltdID0gW107XG4gICAgYXJyLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIExpc3REYXRlLnB1c2goaXRlbS5EYXRlT2ZJc3N1ZSk7XG4gICAgfSk7XG4gICAgY29uc3QgbWluID0gTWF0aC5taW4uYXBwbHkobnVsbCwgTGlzdERhdGUpO1xuICAgIGNvbnN0IG1heCA9IE1hdGgubWF4LmFwcGx5KG51bGwsIExpc3REYXRlKTtcbiAgICBjb25zdCBvYmo6IEdldE1pbk1heCA9IHtcbiAgICAgIG1heDogbWF4LnRvU3RyaW5nKCksXG4gICAgICBtaW46IG1pbi50b1N0cmluZygpLFxuICAgIH07XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBHZXRCeUlkKGlkOiBzdHJpbmcpIHtcbiAgICBsZXQgT2JqQnlJZDogcHJvZHVjdDtcbiAgICBwcm9kdWN0cy5mb3JFYWNoKChpdGVtOiBwcm9kdWN0KSA9PiB7XG4gICAgICBpZiAoaXRlbS5pZC50b1N0cmluZygpID09PSBpZCkge1xuICAgICAgICBPYmpCeUlkID0gaXRlbTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gT2JqQnlJZCE7XG4gIH1cbiAgR2V0Q3VycmVudE1pbk1heFByaWNlKFByaWNlOiBwcm9kdWN0W10pIHtcbiAgICBjb25zdCBBbGxQcmljZXM6IG51bWJlcltdID0gW107XG4gICAgUHJpY2UuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgQWxsUHJpY2VzLnB1c2goZWxlbWVudC5wcmljZSk7XG4gICAgfSk7XG4gICAgY29uc3QgbWluID0gTWF0aC5taW4uYXBwbHkobnVsbCwgQWxsUHJpY2VzKTtcbiAgICBjb25zdCBtYXggPSBNYXRoLm1heC5hcHBseShudWxsLCBBbGxQcmljZXMpO1xuICAgIGNvbnN0IG9iajogR2V0TWluTWF4ID0ge1xuICAgICAgbWF4OiBtYXgudG9TdHJpbmcoKSxcbiAgICAgIG1pbjogbWluLnRvU3RyaW5nKCksXG4gICAgfTtcbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIEdldEN1cnJlbnRNaW5NYXhEYXRlKERhdGU6IHByb2R1Y3RbXSkge1xuICAgIGNvbnN0IEFsbERhdGVzOiBudW1iZXJbXSA9IFtdO1xuICAgIERhdGUuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgQWxsRGF0ZXMucHVzaChlbGVtZW50LkRhdGVPZklzc3VlKTtcbiAgICB9KTtcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbi5hcHBseShudWxsLCBBbGxEYXRlcyk7XG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgQWxsRGF0ZXMpO1xuICAgIGNvbnN0IG9iajogR2V0TWluTWF4ID0ge1xuICAgICAgbWF4OiBtYXgudG9TdHJpbmcoKSxcbiAgICAgIG1pbjogbWluLnRvU3RyaW5nKCksXG4gICAgfTtcbiAgICByZXR1cm4gb2JqO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRhdGE7XG4iLCJpbXBvcnQgZGF0YSBmcm9tICcuL2RhdGEnO1xuaW1wb3J0IHsgZmlsdGVycyB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XG5cbmNsYXNzIFJvdXRlciB7XG4gIHByaXZhdGUgcHJvZHVjdHMgPSBuZXcgZGF0YSgpO1xuICBwcml2YXRlIExpbWl0UGFnZSA9IHtcbiAgICBsaW1pdDogMCxcbiAgICBwYWdlOiAwLFxuICB9O1xuICBwcml2YXRlIGZpbHRlcnM6IGZpbHRlcnMgPSB7XG4gICAgQ2F0ZWdvcnk6IFtdLFxuICAgIEJyYW5kOiBbXSxcbiAgICBNaW5QcmljZTogdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhQcmljZSgpLm1pbixcbiAgICBNYXhQcmljZTogdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhQcmljZSgpLm1heCxcbiAgICBNaW5ZZWFyOiB0aGlzLnByb2R1Y3RzLkdldE1pbk1heERhdGUoKS5taW4sXG4gICAgTWF4WWVhcjogdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhEYXRlKCkubWF4LFxuICAgIFNlYXJjaDogJycsXG4gICAgU29ydDogJ1NvcnQgYnknLFxuICB9O1xuICBwcml2YXRlIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICBwcml2YXRlIGNoZWNrZXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBUb1BhZ2VzID0gZmFsc2U7XG4gIHByaXZhdGUgaXNDaGFuZ2VQcmljZSA9IGZhbHNlO1xuXG4gIC8vIGNvbnN0cnVjdG9yKGZpbHRlcnM6IGZpbHRlcnMpIHtcbiAgLy8gICB0aGlzLmZpbHRlcnMgPSBmaWx0ZXJzO1xuICAvLyB9XG5cbiAgQWRkVVJMKGlkOiBzdHJpbmcpIHtcbiAgICBpZiAoaWQuc3BsaXQoJy0nKVswXSA9PT0gJyNjYXJkJykge1xuICAgICAgY29uc3QgbmV3dXJsID0gYCR7aWR9YDtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gbmV3dXJsO1xuICAgICAgdGhpcy5jaGVja2VyID0gdHJ1ZTtcbiAgICAgIHRoaXMuVG9QYWdlcyA9IHRydWU7XG4gICAgfVxuICAgIGlmIChpZCA9PT0gJycpIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyc7XG4gICAgICB0aGlzLmNoZWNrZXIgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoaWQgPT09ICdiYXNrZXQnKSB7XG4gICAgICBjb25zdCBuZXd1cmwgPSBgJHtpZH1gO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBuZXd1cmw7XG4gICAgICB0aGlzLmNoZWNrZXIgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIEFkZENhdGVnb3J5RmlsdGVycyhpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5maWx0ZXJzLkNhdGVnb3J5LnB1c2goaWQpO1xuICAgIHRoaXMuQWRkRmlsdGVycygpO1xuICB9XG5cbiAgQWRkQnJhbmRGaWx0ZXJzKGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmZpbHRlcnMuQnJhbmQucHVzaChpZCk7XG4gICAgdGhpcy5BZGRGaWx0ZXJzKCk7XG4gIH1cblxuICBBZGRGaWx0ZXJzKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuZmlsdGVycy5DYXRlZ29yeS5sZW5ndGggIT09IDAgfHxcbiAgICAgIHRoaXMuZmlsdGVycy5CcmFuZC5sZW5ndGggIT09IDAgfHxcbiAgICAgIHRoaXMuZmlsdGVycy5NaW5QcmljZSAhPT0gdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhQcmljZSgpLm1pbiB8fFxuICAgICAgdGhpcy5maWx0ZXJzLk1heFByaWNlICE9PSB0aGlzLnByb2R1Y3RzLkdldE1pbk1heFByaWNlKCkubWF4IHx8XG4gICAgICB0aGlzLmZpbHRlcnMuTWluWWVhciAhPT0gdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhEYXRlKCkubWluIHx8XG4gICAgICB0aGlzLmZpbHRlcnMuTWF4WWVhciAhPT0gdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhEYXRlKCkubWF4IHx8XG4gICAgICB0aGlzLmZpbHRlcnMuU2VhcmNoICE9PSAnJyB8fFxuICAgICAgdGhpcy5maWx0ZXJzLlNvcnQgIT09ICdTb3J0IGJ5J1xuICAgICkge1xuICAgICAgbGV0IG5ld3VybCA9ICcjPyc7XG4gICAgICBpZiAodGhpcy5maWx0ZXJzLkNhdGVnb3J5Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBuZXd1cmwgKz0gJ0NhdGVnb3J5PSc7XG4gICAgICAgIHRoaXMuZmlsdGVycy5DYXRlZ29yeS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgbmV3dXJsICs9IGAke2l0ZW19K2A7XG4gICAgICAgIH0pO1xuICAgICAgICBuZXd1cmwgPSBuZXd1cmwuc2xpY2UoMCwgLTEpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZmlsdGVycy5CcmFuZC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVycy5DYXRlZ29yeS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBuZXd1cmwgKz0gJ0JyYW5kPSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3dXJsICs9ICcmQnJhbmQ9JztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpbHRlcnMuQnJhbmQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIG5ld3VybCArPSBgJHtpdGVtfStgO1xuICAgICAgICB9KTtcbiAgICAgICAgbmV3dXJsID0gbmV3dXJsLnNsaWNlKDAsIC0xKTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5maWx0ZXJzLk1pblByaWNlICE9PSB0aGlzLnByb2R1Y3RzLkdldE1pbk1heFByaWNlKCkubWluIHx8XG4gICAgICAgIHRoaXMuZmlsdGVycy5NYXhQcmljZSAhPT0gdGhpcy5wcm9kdWN0cy5HZXRNaW5NYXhQcmljZSgpLm1heFxuICAgICAgKSB7XG4gICAgICAgIGlmIChuZXd1cmwgPT09ICcjPycpIHtcbiAgICAgICAgICBuZXd1cmwgKz0gYFByaWNlPSR7dGhpcy5maWx0ZXJzLk1pblByaWNlfSske3RoaXMuZmlsdGVycy5NYXhQcmljZX1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld3VybCArPSBgJlByaWNlPSR7dGhpcy5maWx0ZXJzLk1pblByaWNlfSske3RoaXMuZmlsdGVycy5NYXhQcmljZX1gO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNDaGFuZ2VQcmljZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuZmlsdGVycy5NaW5ZZWFyICE9PSB0aGlzLnByb2R1Y3RzLkdldE1pbk1heERhdGUoKS5taW4gfHxcbiAgICAgICAgdGhpcy5maWx0ZXJzLk1heFllYXIgIT09IHRoaXMucHJvZHVjdHMuR2V0TWluTWF4RGF0ZSgpLm1heFxuICAgICAgKSB7XG4gICAgICAgIGlmIChuZXd1cmwgPT09ICcjPycpIHtcbiAgICAgICAgICBuZXd1cmwgKz0gYERhdGU9JHt0aGlzLmZpbHRlcnMuTWluWWVhcn0rJHt0aGlzLmZpbHRlcnMuTWF4WWVhcn1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld3VybCArPSBgJkRhdGU9JHt0aGlzLmZpbHRlcnMuTWluWWVhcn0rJHt0aGlzLmZpbHRlcnMuTWF4WWVhcn1gO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNDaGFuZ2VQcmljZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5maWx0ZXJzLlNlYXJjaCAhPT0gJycpIHtcbiAgICAgICAgaWYgKG5ld3VybCA9PT0gJyM/Jykge1xuICAgICAgICAgIG5ld3VybCArPSBgU2VhcmNoPSR7dGhpcy5maWx0ZXJzLlNlYXJjaH1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld3VybCArPSBgJlNlYXJjaD0ke3RoaXMuZmlsdGVycy5TZWFyY2h9YDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZmlsdGVycy5Tb3J0ICE9PSAnU29ydCBieScpIHtcbiAgICAgICAgaWYgKG5ld3VybCA9PT0gJyM/Jykge1xuICAgICAgICAgIG5ld3VybCArPSBgU29ydD0ke3RoaXMuZmlsdGVycy5Tb3J0fWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3dXJsICs9IGAmU29ydD0ke3RoaXMuZmlsdGVycy5Tb3J0fWA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gbmV3dXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIFJlbW92ZUNhdGVnb3J5RmlsdGVycyhpZDogc3RyaW5nKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmZpbHRlcnMuQ2F0ZWdvcnkuZmluZEluZGV4KChlbGVtZW50KSA9PiB7XG4gICAgICByZXR1cm4gZWxlbWVudCA9PT0gaWQ7XG4gICAgfSk7XG4gICAgdGhpcy5maWx0ZXJzLkNhdGVnb3J5LnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5BZGRGaWx0ZXJzKCk7XG4gIH1cblxuICBSZW1vdmVCcmFuZEZpbHRlcnMoaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maWx0ZXJzLkJyYW5kLmZpbmRJbmRleCgoZWxlbWVudCkgPT4ge1xuICAgICAgcmV0dXJuIGVsZW1lbnQgPT09IGlkO1xuICAgIH0pO1xuICAgIHRoaXMuZmlsdGVycy5CcmFuZC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMuQWRkRmlsdGVycygpO1xuICB9XG5cbiAgQWRkUm91dGluZ1RvQ2FyZCh0YWc6IEhUTUxFbGVtZW50KSB7XG4gICAgdGFnLm9uY2xpY2sgPSAoZTogRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgaWQgPSAodGFyZ2V0IGFzIEhUTUxCdXR0b25FbGVtZW50KS5pZDtcbiAgICAgIGNvbnNvbGUubG9nKGlkKTtcbiAgICAgIHRoaXMuQWRkVVJMKGAjJHtpZH1gKTtcbiAgICB9O1xuICB9XG5cbiAgQWRkUm91dGluZ1RvSGVhZGVyKHRhZzogSFRNTEVsZW1lbnQpIHtcbiAgICB0YWcub25jbGljayA9IChlOiBFdmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBpZCA9ICh0YXJnZXQgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpLmlkO1xuICAgICAgdGhpcy5BZGRVUkwoYCR7aWR9YCk7XG4gICAgfTtcbiAgfVxuXG4gIEFkZFJvdXRpbmdUb0Jhc2tldCh0YWc6IEhUTUxFbGVtZW50LCBmcm9tY2FyZD86IGJvb2xlYW4pIHtcbiAgICB0YWcub25jbGljayA9ICgpID0+IHtcbiAgICAgIGlmIChmcm9tY2FyZCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZnJvbWNhcmQnLCAndHJ1ZScpO1xuICAgICAgfVxuICAgICAgdGhpcy5BZGRVUkwoYGJhc2tldGApO1xuICAgIH07XG4gIH1cblxuICBBZGRSb3V0aW5nSW5CYXNrZXQobGltaXQ6IG51bWJlciwgcGFnZTogbnVtYmVyKSB7XG4gICAgdGhpcy5MaW1pdFBhZ2UubGltaXQgPSBsaW1pdDtcbiAgICB0aGlzLkxpbWl0UGFnZS5wYWdlID0gcGFnZTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLkxpbWl0UGFnZSk7XG4gICAgbGV0IG5ld3VybCA9ICdiYXNrZXQnO1xuICAgIGlmICh0aGlzLkxpbWl0UGFnZS5saW1pdCA+IDApIHtcbiAgICAgIG5ld3VybCArPSBgIWxpbWl0PSR7dGhpcy5MaW1pdFBhZ2UubGltaXR9YDtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gbmV3dXJsO1xuICAgIH1cbiAgICBpZiAodGhpcy5MaW1pdFBhZ2UucGFnZSA+IDAgJiYgdGhpcy5MaW1pdFBhZ2UucGFnZSAhPT0gMSkge1xuICAgICAgaWYgKG5ld3VybCA9PT0gJ2Jhc2tldCcpIHtcbiAgICAgICAgbmV3dXJsICs9IGAhcGFnZT0ke3RoaXMuTGltaXRQYWdlLnBhZ2V9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld3VybCArPSBgJnBhZ2U9JHt0aGlzLkxpbWl0UGFnZS5wYWdlfWA7XG4gICAgICB9XG4gICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IG5ld3VybDtcbiAgICB9XG4gIH1cblxuICAvLyBBZGRSb3V0aW5nVG9MaW1pdChjb3VudDogc3RyaW5nKSB7XG4gIC8vICAgdGhpcy5MaW1pdFBhZ2UubGltaXQgPSArY291bnQ7XG4gIC8vICAgY29uc29sZS5sb2codGhpcy5MaW1pdFBhZ2UubGltaXQpXG4gIC8vICAgdGhpcy5BZGRSb3V0aW5nSW5CYXNrZXQoKTtcbiAgLy8gfVxuXG4gIC8vIEFkZFJvdXRpbmdUb1BhZ2UoY291bnQ6IHN0cmluZykge1xuICAvLyAgIHRoaXMuTGltaXRQYWdlLnBhZ2UgPSArY291bnQ7XG4gIC8vICAgY29uc29sZS5sb2codGhpcy5MaW1pdFBhZ2UucGFnZSlcbiAgLy8gICB0aGlzLkFkZFJvdXRpbmdJbkJhc2tldCgpO1xuICAvLyB9XG5cbiAgQWRkUm91dGluZ1RvQ2F0ZWdvcnkodGFnOiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgdGFnLm9uY2xpY2sgPSAoZTogRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgaWQgPSAodGFyZ2V0IGFzIEhUTUxCdXR0b25FbGVtZW50KS5pZDtcbiAgICAgIGlmICh0YWcuY2hlY2tlZCkge1xuICAgICAgICB0aGlzLkFkZENhdGVnb3J5RmlsdGVycyhpZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLlJlbW92ZUNhdGVnb3J5RmlsdGVycyhpZCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIEFkZFJvdXRpbmdUb0JyYW5kKHRhZzogSFRNTElucHV0RWxlbWVudCkge1xuICAgIHRhZy5vbmNsaWNrID0gKGU6IEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IGlkID0gKHRhcmdldCBhcyBIVE1MQnV0dG9uRWxlbWVudCkuaWQ7XG4gICAgICBpZiAodGFnLmNoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5BZGRCcmFuZEZpbHRlcnMoaWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5SZW1vdmVCcmFuZEZpbHRlcnMoaWQpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBBZGRSb3V0aW5nVG9QcmljZU1pbihNaW5QcmljZTogc3RyaW5nKSB7XG4gICAgdGhpcy5maWx0ZXJzLk1pblByaWNlID0gTWluUHJpY2U7XG4gICAgdGhpcy5BZGRGaWx0ZXJzKCk7XG4gIH1cblxuICBBZGRSb3V0aW5nVG9QcmljZU1heChNYXhQcmljZTogc3RyaW5nKSB7XG4gICAgdGhpcy5maWx0ZXJzLk1heFByaWNlID0gTWF4UHJpY2U7XG4gICAgdGhpcy5BZGRGaWx0ZXJzKCk7XG4gIH1cblxuICBBZGRSb3V0aW5nVG9ZZWFyTWluKE1pblllYXI6IHN0cmluZykge1xuICAgIHRoaXMuZmlsdGVycy5NaW5ZZWFyID0gTWluWWVhcjtcbiAgICB0aGlzLkFkZEZpbHRlcnMoKTtcbiAgfVxuXG4gIEFkZFJvdXRpbmdUb1llYXJNYXgoTWF4WWVhcjogc3RyaW5nKSB7XG4gICAgdGhpcy5maWx0ZXJzLk1heFllYXIgPSBNYXhZZWFyO1xuICAgIHRoaXMuQWRkRmlsdGVycygpO1xuICB9XG5cbiAgQWRkUm91dGluZ1RvU2VhcmNoKHRleHQ6IHN0cmluZykge1xuICAgIHRoaXMuZmlsdGVycy5TZWFyY2ggPSB0ZXh0O1xuICAgIHRoaXMuQWRkRmlsdGVycygpO1xuICB9XG4gIEFkZFJvdXRpbmdUb1NvcnQoaWQ6IHN0cmluZykge1xuICAgIHRoaXMuZmlsdGVycy5Tb3J0ID0gaWQ7XG4gICAgdGhpcy5BZGRGaWx0ZXJzKCk7XG4gIH1cblxuICBHZXRGaWx0ZXJzKGZpbHRlcnM6IGZpbHRlcnMpIHtcbiAgICB0aGlzLmZpbHRlcnMgPSBmaWx0ZXJzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJvdXRlcjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==