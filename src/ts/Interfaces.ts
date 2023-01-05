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
  CountCategories?: number;
  filters?: string[];
}

export interface ConstructotTextInput {
  type: string;
  placeholder: string;
  name: string;
  className?: string;
}

export interface ConstructorRange {
  type: string;
  min: string;
  max: string;
  value: string;
  id: string;
  className?: string;
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
}

export interface ConstructorRadio {
  type: string;
  value: string;
  id: string;
  name: string;
  className?: string;
}

export interface ConstructorSortMenu {
  tag: string;
  className?: string;
  router?: Router;
  filter?: string;
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