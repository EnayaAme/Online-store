import Router from './route';

export interface product {
  id: number;
  model: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  DateOfIssue: number;
  brand: string;
  category: string;
  images: string[];
  counter: number;
}

export interface ConstructorElement {
  tag: string;
  id?: string;
  className?: string;
  content?: string;
  BackgroundImg?: string;
  router?: Router;
  filter?: string;
}
// схожий с прошлым только для img
export interface ConstructorImage {
  src: string;
  id?: string;
  className?: string;
  alt?: string;
}

export interface ConstructorCheckbox {
  type: string;
  name: string;
  id: string;
  value: string;
  className?: string;
  Count?: number;
  Current?: number;
  filters?: string[];
}

export interface ConstructotTextInput {
  type: string;
  name: string;
  id?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export interface ConstructorRange {
  type: string;
  min: string;
  max: string;
  value: string;
  id: string;
  className?: string;
}

export interface ConstructorNumberInput {
  type: string;
  value?: string;
  id?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

export interface ConstructorRangeBlock {
  title: string;
  from: string;
  to: string;
  range1Min: string;
  range2Min: string;
  range1Max: string;
  range2Max: string;
  range1Value: string;
  range2Value: string;
  isPrice: boolean;
  id: string;
  router?: Router;
  filters: filters;
  current?: GetMinMax;
}

export interface ConstructorRadio {
  type: string;
  value: string;
  id: string;
  name: string;
  className?: string;
  checked?: boolean;
}

export interface ConstructorSortMenu {
  tag: string;
  className?: string;
  router?: Router;
  filter?: string;
}

export interface ConstructorLink {
  href: string;
  className?: string;
  id?: string;
  target?: string;
  content?: string;
}

export interface filters {
  Category: string[];
  Brand: string[];
  MinPrice: string;
  MaxPrice: string;
  MinYear: string;
  MaxYear: string;
  Search: string;
  Sort: string;
}

export interface GetMinMax {
  max: string;
  min: string;
}

export interface GetCategories {
  category: string;
  count: number;
  CurrentCategory: number;
}

export interface GetBrands {
  brand: string;
  count: number;
  CurrentBrand: number;
}
