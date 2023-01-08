import products from '../assets/files/data.json';
import { ApplySort } from './ApplySort';
import { GetMinMax, product } from './Interfaces';

interface GetCategories {
  category: string;
  count: number;
  CurrentCategory: number;
}

interface GetBrands {
  brand: string;
  count: number;
  CurrentBrand: number;
}

class data {
  private ListCategories: string[] = [];
  private arr: product[] = products;
  private ListBrands: string[] = [];
  constructor () {
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
    return products;
  }
  GetCategories(categories: product[]) {
    const cat = new ApplySort('Sort by', products).return();
    this.ListCategories = [];
    cat.forEach((item) => {
      if (this.ListCategories.includes(item.category) === false) {
        this.ListCategories.push(item.category);
      }
    })
    console.log(categories);
    const ResCategory: GetCategories[] = [];
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
      const obj: GetCategories = {
        category: item,
        count: counter,
        CurrentCategory: current,
      };
      ResCategory.push(obj);
    });
    //console.log(ResCategory);
    return ResCategory;
  }
  GetBrands(brands: product[]) {
    this.ListBrands = []
    const brand = new ApplySort('Sort by', products).return();
    brand.forEach((item) => {
      if (this.ListBrands.includes(item.brand) === false) {
        this.ListBrands.push(item.brand);
      }
    })
    const ResBrands: GetBrands[] = [];
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
      const obj: GetBrands = {
        brand: item,
        count: counter,
        CurrentBrand: current,
      };
      ResBrands.push(obj);
    });
    return ResBrands;
  }
  GetMinMaxPrice(arr: product[] = products) {
    const ListPrice: number[] = [];
    arr.forEach((item) => {
      ListPrice.push(item.price);
    });
    const min = Math.min.apply(null, ListPrice);
    const max = Math.max.apply(null, ListPrice);
    const obj: GetMinMax = {
      max: max.toString(),
      min: min.toString(),
    };
    return obj;
  }
  GetMinMaxDate(arr: product[] = products) {
    const ListDate: number[] = [];
    arr.forEach((item) => {
      ListDate.push(item.DateOfIssue);
    });
    const min = Math.min.apply(null, ListDate);
    const max = Math.max.apply(null, ListDate);
    const obj: GetMinMax = {
      max: max.toString(),
      min: min.toString(),
    };
    //console.log(obj);
    return obj;
  }
  GetById(id: string) {
    let ObjById: product;
    products.forEach((item: product) => {
      //console.log(item.id.toString());
      //console.log(id);
      if(item.id.toString() === id) {
        ObjById = item;
      }
    });
    return ObjById!;
  }
  GetCurrentMinMaxPrice(Price: product[]) {
    const AllPrices: number[] = [];
    Price.forEach((element) => {
      AllPrices.push(element.price);
    });
    const min = Math.min.apply(null, AllPrices);
    const max = Math.max.apply(null, AllPrices);
    const obj: GetMinMax = {
      max: max.toString(),
      min: min.toString(),
    };
    return obj;
  }
  GetCurrentMinMaxDate(Date: product[]) {
    const AllDates: number[] = [];
    Date.forEach((element) => {
      AllDates.push(element.DateOfIssue);
    });
    const min = Math.min.apply(null, AllDates);
    const max = Math.max.apply(null, AllDates);
    const obj: GetMinMax = {
      max: max.toString(),
      min: min.toString(),
    };
    //console.log(obj)
    return obj;
  }
}

export default data;
