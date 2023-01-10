import { filters } from '../Interfaces';
import Router from '../route';

const route = new Router();

const filt: filters = {
  Category: ['Smartphone', 'mouse'],
  Brand: ['Xiaomi', 'Huawei'],
  MinPrice: '25',
  MaxPrice: '500',
  MinYear: '2000',
  MaxYear: '2025',
  Search: 'text_search',
  Sort: 'SortByRaiting',
};

test('Роутинг добавлен', () => {
  route.AddURL('basket');
  expect('basket').toBe(window.location.hash.slice(1));
});

test('Категория задана', () => {
  route.AddCategoryFilters(filt.Category[0]);
  expect(route.filters.Category[0]).toBe(filt.Category[0]);
});

test('Бренд задан', () => {
  route.AddBrandFilters(filt.Brand[0]);
  expect(route.filters.Brand[0]).toBe(filt.Brand[0]);
});

test('Категория удалена', () => {
  route.RemoveCategoryFilters(filt.Category[0]);
  expect(route.filters.Category[0]).toBeUndefined();
});

test('Бренд удален', () => {
  route.RemoveBrandFilters(filt.Brand[0]);
  expect(route.filters.Brand[0]).toBeUndefined();
});

test('Минимальная цена задана', () => {
  route.AddRoutingToPriceMin(filt.MinPrice);
  expect(route.filters.MinPrice).toBe(filt.MinPrice);
});

test('Максимальная цена задана', () => {
  route.AddRoutingToPriceMax(filt.MaxPrice);
  expect(route.filters.MaxPrice).toBe(filt.MaxPrice);
});

test('Минимальный год задан', () => {
  route.AddRoutingToYearMin(filt.MinYear);
  expect(route.filters.MinYear).toBe(filt.MinYear);
});

test('Максимальный год задан', () => {
  route.AddRoutingToYearMax(filt.MaxYear);
  expect(route.filters.MaxYear).toBe(filt.MaxYear);
});

test('Поиск работает', () => {
  route.AddRoutingToSearch(filt.Search);
  expect(route.filters.Search).toBe(filt.Search);
});

test('Сортировка работает', () => {
  route.AddRoutingToSort(filt.Sort);
  expect(route.filters.Sort).toBe(filt.Sort);
});

test('Сортировка работает', () => {
  route.GetFilters(filt);
  expect(route.filters).toBe(filt);
});
