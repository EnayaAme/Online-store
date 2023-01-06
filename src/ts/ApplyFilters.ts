import data from "./data";
import { GetData } from "./GetDefaultData";
import { filters, product } from "./Interfaces";

export class ApplyFilters {
  private data = new data();
  private DataAfterFilters:product[] = [];
  //private
  constructor(filters: filters) {
    this.DataAfterFilters = new GetData().Get();
    if (filters.Category.length !== 0) {
      this.category(filters.Category);
    }
    if (filters.Brand.length !== 0) {
      this.brand(filters.Brand);
    }
    if (filters.MinPrice !== this.data.GetMinMaxPrice().min 
    || filters.MaxPrice !== this.data.GetMinMaxPrice().max) {
      this.price(filters.MinPrice, filters.MaxPrice);
    }
    if (filters.MinYear !== this.data.GetMinMaxDate().min 
    || filters.MaxYear !== this.data.GetMinMaxDate().max) {
      this.date(filters.MinYear, filters.MaxYear);
    }
    if (filters.Search !== '') {
      this.search(filters.Search);
    }
    if (filters.Sort !== 'Sort by') {
      switch (filters.Sort) {
        case 'Rating':
          this.SortByRating(this.DataAfterFilters);
          console.log('Rating');
          break;
        case 'PriceTH':
          console.log('Price (low to high)');
          break;
        case 'PriceTL':
          console.log('Price (high to low)');
          break;
        case 'RD':
          console.log('Release Date');
          break;
        default:
          //this.SortByID(this.DataAfterFilters);
          break;
      }
    }
    if(filters.Sort === 'Sort by') {
      console.log('sort by id')
      this.SortByID(this.DataAfterFilters);
    }
  }
  return() {
    return this.DataAfterFilters;
  }
  category(categories: string[]) {
    const TempArray: product[] = [];
    categories.forEach((item) => {
      this.DataAfterFilters.forEach((it) => {
        if (item === it.category) {
          TempArray.push(it);
        }
      });
    });
    this.DataAfterFilters = TempArray;
  }
  brand(brands: string[]) {
    const TempArray: product[] = [];
    brands.forEach((item) => {
      this.DataAfterFilters.forEach((it) => {
        if (item === it.brand) {
          TempArray.push(it);
        }
      });
    });
    this.DataAfterFilters = TempArray;
  }
  price(min: string, max: string) {
    const TempArray: product[] = [];
      this.DataAfterFilters.forEach((it) => {
        if (+min <= it.price && it.price <= +max) {
          TempArray.push(it);
        }
      });
    this.DataAfterFilters = TempArray;
  }
  date(min: string, max: string) {
    const TempArray: product[] = [];
      this.DataAfterFilters.forEach((it) => {
        if (+min <= it.DateOfIssue && it.DateOfIssue <= +max) {
          TempArray.push(it);
        }
      });
    this.DataAfterFilters = TempArray;
  }
  search(search: string) {
    let newstr = '';
    search = search.toLowerCase();
    const TempArray: product[] = [];
    this.DataAfterFilters.forEach((item) => {
      //console.log(item.category.toLowerCase().includes(search))
      if (item.category.toLowerCase().includes(search)) {
        TempArray.push(item);
      } else if (item.brand.toLowerCase().includes(search)) {
        TempArray.push(item);
      } else if (item.price.toString().includes(search)) {
        TempArray.push(item);
      } else if (item.DateOfIssue.toString().includes(search)) {
        TempArray.push(item);
      } else if (item.model.toLowerCase().includes(search)) {
        TempArray.push(item);
      } else if (item.description.toLowerCase().includes(search)) {
        TempArray.push(item);
      } else if (item.discountPercentage.toString().includes(search)) {
        TempArray.push(item);
      } else if (item.rating.toString().includes(search)) {
        TempArray.push(item);
      }
    });
    this.DataAfterFilters = TempArray;
  }
  SortByRating(products: product[]) {
    let counter = 1;
    let temp: product;
    for (let k = 0; k < products.length; k++){
      let index = 0;
      for (let i = counter; i < products.length; i++) {
        if(products[k].rating > products[i].rating) {
          temp = products[k];
          products[k] = products[i];
          products[i] = temp;
        }
      };
      counter += 1;
    };
    console.log(products);
  }
  SortByID(products: product[]) {
    let counter = 1;
    let temp: product;
    for (let k = 0; k < products.length; k++){
      let index = 0;
      for (let i = counter; i < products.length; i++) {
        if(products[k].id > products[i].id) {
          temp = products[k];
          products[k] = products[i];
          products[i] = temp;
        }
      };
      counter += 1;
    };
    console.log(products);
  }
  swap(first:product, second: product) {
    let temp: product;
    temp = first;
    first = second;
    second = temp;
  }
}