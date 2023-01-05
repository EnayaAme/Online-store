import data from "./data";
import { filters } from "./Interfaces";
import CreateDefaultPage from "./DefaultPage";
import { CardPage } from "./CardPage";

class Router {
  private products = new data();
  private filters: filters = {
    'Category': [],
    'Brand': [],
    'MinPrice': this.products.GetMinMaxPrice().min,
    'MaxPrice': this.products.GetMinMaxPrice().max,
    'MinYear': this.products.GetMinMaxDate().min,
    'MaxYear': this.products.GetMinMaxDate().max,
    'Search': '',
    'Sort': 'Sort by',
  }
  private body = document.body;
  private checker = false;
  private ToPages = false;
  private isChangePrice = false;

  // constructor(filters: filters) {
  //   this.filters = filters;
  // }

  AddURL(id: string) {
    if (id.split('-')[0] === '#card') {
      const newurl = `${id}`;
      window.location.hash = newurl;
      this.checker = true;
      //console.log(window.location.hash);
      this.ToPages = true;
      new CardPage(this.products.GetById(id.split('-')[1]));
      //console.log(this.products.GetById(id.split('-')[1]));
    }
    if (id === '') {
      window.location.hash = '';
      this.checker = true;
    }
    if (id === '#basket') {
      //console.log('basket');
      const newurl = `${id}`;
      window.location.hash = newurl;
      this.checker = true;
    }
  }

  AddCategoryFilters(id: string) {
    this.filters.Category.push(id);
    this.AddFilters();
  }

  AddBrandFilters(id: string) {
    this.filters.Brand.push(id);
    this.AddFilters();
  }

  AddFilters(){
    //console.log('asd');
    if ((this.filters.Category.length !== 0 || this.filters.Brand.length !== 0) ||
    (this.filters.MinPrice !== this.products.GetMinMaxPrice().min ||
    this.filters.MaxPrice !== this.products.GetMinMaxPrice().max) ||
    (this.filters.MinYear !== this.products.GetMinMaxDate().min ||
    this.filters.MaxYear !== this.products.GetMinMaxDate().max) ||
    this.filters.Search !== '' || this.filters.Sort !== 'Sort by') {
      let newurl = '#?';
      if (this.filters.Category.length !== 0) {
        newurl += 'Category=';
        this.filters.Category.forEach((item) => {
          newurl += `${item}+`;
        });
        newurl = newurl.slice(0, -1);
      }
      if (this.filters.Brand.length !== 0) {
        if(this.filters.Category.length === 0){
          newurl += 'Brand=';
        } else {
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
        } else {
          newurl += `&Price=${this.filters.MinPrice}+${this.filters.MaxPrice}`;
        }
        this.isChangePrice = true;
      }
      if (this.filters.MinYear !== this.products.GetMinMaxDate().min || 
      this.filters.MaxYear !== this.products.GetMinMaxDate().max) {
        if (newurl === '#?') {
          newurl += `Date=${this.filters.MinYear}+${this.filters.MaxYear}`;
        } else {
          newurl += `&Date=${this.filters.MinYear}+${this.filters.MaxYear}`;
        }
        this.isChangePrice = true;
      }
      if (this.filters.Search !== '') {
        if (newurl === '#?') {
          newurl += `Search=${this.filters.Search}`;
        } else {
          newurl += `&Search=${this.filters.Search}`;
        }
      }
      if (this.filters.Sort !== 'Sort by') {
        //console.log(this.filters.Sort);
        if (newurl === '#?') {
          newurl += `Sort=${this.filters.Sort}`;
        } else {
          newurl += `&Sort=${this.filters.Sort}`;
        }
      }
      window.location.hash = newurl;
    } else {
      window.location.hash = '';
    }
  }

  RemoveCategoryFilters(id: string) {
    const index = this.filters.Category.findIndex((element) => {
      return element === id
    });
    this.filters.Category.splice(index, 1);
    this.AddFilters();
  }

  RemoveBrandFilters(id: string) {
    const index = this.filters.Brand.findIndex((element) => {
      return element === id
    });
    this.filters.Brand.splice(index, 1);
    this.AddFilters();
  }

  AddRoutingToCard(tag: HTMLElement) {
    tag.onclick = (e: Event) => {
      const target = e.target;
      const id = (target as HTMLButtonElement).id;
      this.AddURL(`#${id}`);
    };
  }

  AddRoutingToHeader(tag: HTMLElement) {
    tag.onclick = (e: Event) => {
      const target = e.target;
      const id = (target as HTMLButtonElement).id;
      this.AddURL(`${id}`);
    };
  }

  AddRoutingToCategory(tag: HTMLInputElement) {
    tag.onclick = (e: Event) => {
      const target = e.target;
      const id = (target as HTMLButtonElement).id;
      if (tag.checked){
        this.AddCategoryFilters(id);
      } else {
        this.RemoveCategoryFilters(id);
      }
    };
  }

  AddRoutingToBrand(tag: HTMLInputElement) {
    tag.onclick = (e: Event) => {
      const target = e.target;
      const id = (target as HTMLButtonElement).id;
      if (tag.checked){
        this.AddBrandFilters(id);
      } else {
        this.RemoveBrandFilters(id);
      }
    };
  }

  AddRoutingToPriceMin(MinPrice: string) {
    this.filters.MinPrice = MinPrice;
    this.AddFilters();
  }

  AddRoutingToPriceMax(MaxPrice: string) {
    this.filters.MaxPrice = MaxPrice;
    this.AddFilters();
  }

  AddRoutingToYearMin(MinYear: string) {
    this.filters.MinYear = MinYear;
    this.AddFilters();
  }

  AddRoutingToYearMax(MaxYear: string) {
    this.filters.MaxYear = MaxYear;
    this.AddFilters();
  }

  AddRoutingToSearch(text: string) {
    this.filters.Search = text;
    this.AddFilters();
  }
  AddRoutingToSort(id: string) {
    this.filters.Sort = id;
    //console.log(this.filters.Sort);
    this.AddFilters();
  }

  GetFilters(filters: filters) {
    this.filters = filters;
  }
}

export default Router;
