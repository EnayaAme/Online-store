import products from '../assets/files/data.json';
import { product } from './Interfaces';

interface GetCategories {
  category: string;
  count: number;
}

interface GetBrands {
  brand: string;
  count: number;
}

interface GetMinMaxPrice {
  max: string;
  min: string;
}

class data {
  Get() {
    return products;
  }
  GetCategories(arr: product[] = products) {
    const ListCategories: string[] = [];
    const ResCategory: GetCategories[] = [];
    arr.forEach((item) => {
      if (ListCategories.includes(item.category) === false) {
        ListCategories.push(item.category);
      }
    });
    ListCategories.forEach((item) => {
      let counter = 0;
      arr.forEach((it) => {
        if (item === it.category) {
          counter += 1;
        }
      });
      const obj: GetCategories = {
        category: item,
        count: counter,
      };
      ResCategory.push(obj);
    });
    return ResCategory;
  }
  GetBrands(arr: product[] = products) {
    const ListBrands: string[] = [];
    const ResBrands: GetBrands[] = [];
    arr.forEach((item) => {
      if (ListBrands.includes(item.brand) === false) {
        ListBrands.push(item.brand);
      }
    });
    ListBrands.forEach((item) => {
      let counter = 0;
      arr.forEach((it) => {
        if (item === it.brand) {
          counter += 1;
        }
      });
      const obj: GetBrands = {
        brand: item,
        count: counter,
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
    const obj: GetMinMaxPrice = {
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
    const obj: GetMinMaxPrice = {
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
}

export default data;
