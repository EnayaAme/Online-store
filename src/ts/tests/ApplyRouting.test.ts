import { ApplyRouting } from '../ApplyRouting';
import { filters } from '../Interfaces';

const route = new ApplyRouting();

const filt: filters = {
  Category: ['Smartphone'],
  Brand: ['Apple'],
  MinPrice: '773',
  MaxPrice: '1348',
  MinYear: '2011',
  MaxYear: '2025',
  Search: 'text',
  Sort: 'PriceTH',
};

test('Создание фильтров из хеша', () => {
  route.createFilters('#?Category=Smartphone&Brand=Apple&Price=773+1348&Date=2011+2025&Search=text&Sort=PriceTH');
  expect(route.filters).toStrictEqual(filt);
});

test('Создание фильтров из хеша', () => {
  route.init('');
  expect(route.filters.Sort).toStrictEqual('Sort by');
});
