import data from "./Data";
import { filters } from "./Interfaces";
import CreateDefaultPage from "./DefaultPage";

class Router {
  private products = new data();
  private filters: filters = {
    'Category': [],
    'Brand': [],
    'MinPrice': this.products.GetMinMaxPrice().min,
    'MaxPrice': this.products.GetMinMaxPrice().max,
    'MinYear': this.products.GetMinMaxDate().min,
    'MaxYear': this.products.GetMinMaxDate().max,
  }
  private body = document.body;
  private checker = false;
  private ToPages = false;
  private isChangePrice = false;

  AddURL(id: string) {
    if (id.split('-')[0] === '#card') {
      const newurl = `${id}`;
      window.location.hash = newurl;
      this.checker = true;
      console.log(window.location.hash);
      this.ToPages = true;
    }
    if (id === '') {
      window.location.hash = '';
      this.checker = true;
    }
    if (id === '#basket') {
      console.log('basket');
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
    if ((this.filters.Category.length !== 0 || this.filters.Brand.length !== 0) || 
    (this.filters.MinPrice !== this.products.GetMinMaxPrice().min || 
    this.filters.MaxPrice !== this.products.GetMinMaxPrice().max) ) {
      let newurl = '#?';
      let CurrentPrice = '';
      if (this.filters.Category.length !== 0) {
        newurl += 'Category=';
        this.filters.Category.forEach((item) => {
          newurl += `${item}↕`;
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
          newurl += `${item}↕`;
        });
        newurl = newurl.slice(0, -1);
      }
      if (this.filters.MinPrice !== this.products.GetMinMaxPrice().min || 
      this.filters.MaxPrice !== this.products.GetMinMaxPrice().max) {
        CurrentPrice = 
        newurl += `&Price=${this.filters.MinPrice}↕${this.filters.MaxPrice}`;
        this.isChangePrice = true;
      }
      //console.log('newurl' + newurl);
      //console.log(this.filters);
      window.location.hash = newurl;
      //console.log('hash'+window.location.hash);
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

  init(id: string) {
    if (id.split('-')[0] === '#card') {
      if (this.body.children[1]){
        this.body.children[1].remove();
      }
    }
    if (id === '') {
      const MainPage = new CreateDefaultPage();
      if (document.body.childNodes[2]) {
        document.body.childNodes[2].remove();
      }
      MainPage.CreateMain();
      this.checker = true;
    }
    if (id === '#basket') {
      console.log('basket');
      this.checker = true;
    }
    ///filters///
    ///Category///
    if (id.split('=')[0] === 'Category') {
      if(!this.filters.Category.includes(id.split('=')[1])){
        this.filters.Category.push(id.split('=')[1]);
      }
    }
    if (this.checker === false) {
      console.log(id);
      console.log('ERROR 404');
    }
    // if(this.filters.Category.length !== 0 || this.filters.Brand.length !== 0) {
    //   let newurl = '#?';
    //   if (this.filters.Category.length !== 0) {
    //     newurl += 'Category=';
    //     this.filters.Category.forEach((item) => {
    //       newurl += `${item}↕`;
    //     });
    //     newurl.slice(0, -1);
    //   }
    //   if (this.filters.Brand.length !== 0) {
    //     newurl += '&Brand=';
    //     this.filters.Brand.forEach((item) => {
    //       newurl += `${item}↕`;
    //     });
    //     newurl.slice(0, -1);
    //   }
    //   console.log(newurl);
    // }
  }

  addrouting(tag: HTMLElement) {
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
    //console.log(this.filters);
    //console.log(MinPrice);
  }

  AddRoutingToPriceMax(MaxPrice: string) {
    this.filters.MaxPrice = MaxPrice;
    this.AddFilters();
    console.log(this.filters);
  }

  AddRoutingToYearMin(MinYear: string) {
    this.filters.MinYear = MinYear;
    this.AddFilters();
    console.log(this.filters);
  }

  AddRoutingToYearMax(MaxYear: string) {
    this.filters.MaxYear = MaxYear;
    this.AddFilters();
    console.log(this.filters);
  }
}

export default Router;
