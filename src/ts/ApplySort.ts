import { product } from './Interfaces';

export class ApplySort {
  private DataAfterFilters: product[] = [];
  constructor(sort: string, products: product[]) {
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

  SortByRating(products: product[]) {
    let counter = 1;
    let temp: product;
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

  SortByID(products: product[]) {
    let counter = 1;
    let temp: product;
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

  SortByPriceLtoH(products: product[]) {
    let counter = 1;
    let temp: product;
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

  SortByPriceHtoL(products: product[]) {
    let counter = 1;
    let temp: product;
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

  SortByReleaseDate(products: product[]) {
    let counter = 1;
    let temp: product;
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

  swap(first: product, second: product) {
    const temp: product = first;
    first = second;
    second = temp;
  }
}
