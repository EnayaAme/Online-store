import data from '../data';
import { product } from '../Interfaces';

const products = new data();
const ListOfProducts = products.Get();
const RandomListOfProducts: product[] = [];
RandomListOfProducts.push(ListOfProducts[12], ListOfProducts[37]);

test('Получены все данные', () => {
  expect(products.Get()).not.toBeNull();
  expect(products.Get().length).toBe(63);
});

test('Получены все категории', () => {
  expect(products.GetCategories(ListOfProducts)).not.toBeNull();
  expect(products.GetCategories(ListOfProducts).length).toBe(7);
});

test('Получены категории из подмассива', () => {
  const GetCategories = products.GetCategories(RandomListOfProducts);
  expect(GetCategories).not.toBeNull();
  expect(GetCategories[1].CurrentCategory).toBe(1);
  expect(GetCategories[5].CurrentCategory).toBe(1);
});

test('Получены все бренды', () => {
  expect(products.GetBrands(ListOfProducts)).not.toBeNull();
  expect(products.GetBrands(ListOfProducts).length).toBe(9);
});

test('Получены бренды из подмассив', () => {
  const GetBrands = products.GetBrands(RandomListOfProducts);
  expect(GetBrands).not.toBeNull();
  expect(GetBrands[4].CurrentBrand).toBe(1);
  expect(GetBrands[6].CurrentBrand).toBe(1);
});

test('Получены цены', () => {
  expect(products.GetMinMaxPrice()).not.toBeNull();
  expect(products.GetMinMaxPrice(ListOfProducts).min).toBe('16');
  expect(products.GetMinMaxPrice(ListOfProducts).max).toBe('1559');
});

test('Получены даты релиза', () => {
  expect(products.GetMinMaxDate()).not.toBeNull();
  expect(products.GetMinMaxDate(ListOfProducts).min).toBe('2013');
  expect(products.GetMinMaxDate(ListOfProducts).max).toBe('2022');
});

test('Получение продукта через id', () => {
  expect(products.GetById('1')).toBe(ListOfProducts[0]);
  expect(products.GetById('1')).toBe(ListOfProducts[0]);
});

test('Получение цены из подмассива', () => {
  expect(products.GetCurrentMinMaxPrice(RandomListOfProducts).min).toBe('32');
  expect(products.GetCurrentMinMaxPrice(RandomListOfProducts).max).toBe('955');
});

test('Получение дат из подмассива', () => {
  expect(products.GetCurrentMinMaxDate(RandomListOfProducts).min).toBe('2018');
  expect(products.GetCurrentMinMaxDate(RandomListOfProducts).max).toBe('2020');
});
