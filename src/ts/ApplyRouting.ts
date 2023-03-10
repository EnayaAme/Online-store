import { errorpage } from './404';
import { ApplyFilters } from './ApplyFilters';
import { ApplySort } from './ApplySort';
import { BasketPage } from './BasketPage';
import { CardPage } from './CardPage';
import { CreateCartItem } from './Components/CreateCartItem';
import { CreateListOfCards } from './CreateListOfCards';
import data from './data';
import CreateDefaultPage from './DefaultPage';
import { filters } from './Interfaces';

export class ApplyRouting {
  private MainPage = new CreateDefaultPage();
  private products = new data();
  private body = document.body;
  private LimitPage = {
    limit: 3,
    page: 1,
  };
  public filters: filters = {
    Category: [],
    Brand: [],
    MinPrice: this.products.GetMinMaxPrice().min,
    MaxPrice: this.products.GetMinMaxPrice().max,
    MinYear: this.products.GetMinMaxDate().min,
    MaxYear: this.products.GetMinMaxDate().max,
    Search: '',
    Sort: 'Sort by',
  };

  init(hash: string) {
    if (hash[1] === '?') {
      this.createFilters(hash);
      if (document.body.childNodes[2]) {
        document.body.childNodes[2].remove();
        document.body.childNodes[2].remove();
      }
      const data = new ApplyFilters(this.filters).return();
      this.MainPage.CreateMain(this.filters, data);
      const DataSort = new ApplySort(this.filters.Sort, data);
      new CreateListOfCards(DataSort.return());
      this.MainPage.CreateFooter();
    } else if (hash.split('-')[0] === '#card' && +hash.split('-')[1] < 64) {
      if (this.body.children[1] && this.body.children[2]) {
        this.body.children[2].remove();
        this.body.children[1].remove();
      }
      new CardPage(this.products.GetById(hash.split('-')[1]));
      this.MainPage.CreateFooter();
    } else if (hash === '') {
      this.ToDefaultFilters();
      this.MainPage = new CreateDefaultPage();
      if (document.body.childNodes[2]) {
        document.body.childNodes[2].remove();
        document.body.childNodes[2].remove();
      }
      const data = new ApplyFilters(this.filters).return();

      const DataSort = new ApplySort(this.filters.Sort, data);
      this.MainPage.CreateMain(this.filters, DataSort.return());
      new CreateListOfCards(DataSort.return());
      this.MainPage.CreateFooter();
    } else if (hash === '#basket') {
      if (this.body.children[1] && this.body.children[2]) {
        this.body.children[2].remove();
        this.body.children[1].remove();
      }
      new BasketPage(3, 1);
      new CreateCartItem(3, 1);
      this.MainPage.CreateFooter();
      if (localStorage.getItem('fromcard') === 'true') {
        document.getElementById('buyitnowBtn')?.click();
        localStorage.removeItem('fromcard');
      }
    } else if (hash[7] === '!') {
      if (this.body.children[1] && this.body.children[2]) {
        this.body.children[2].remove();
        this.body.children[1].remove();
      }
      const filt = hash.split('!')[1];
      if (filt.includes('&')) {
        this.LimitPage.limit = +filt.split('&')[0].split('=')[1];
        this.LimitPage.page = +filt.split('&')[1].split('=')[1];
      } else {
        if (filt.includes('limit')) {
          this.LimitPage.limit = +filt.split('=')[1];
          this.LimitPage.page = 1;
        } else {
          this.LimitPage.page = +filt.split('=')[1];
        }
      }
      new BasketPage(this.LimitPage.limit, this.LimitPage.page);
      new CreateCartItem(this.LimitPage.limit, this.LimitPage.page);
      this.MainPage.CreateFooter();
    } else {
      this.body.innerHTML = ' ';
      new errorpage();
    }
  }

  createFilters(hash: string) {
    const ArrayFilters: string[] = hash.slice(2).split('&');
    this.ToDefaultFilters();
    ArrayFilters.forEach((item) => {
      const key: string = item.split('=')[0];
      const values: string = item.split('=')[1];
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
