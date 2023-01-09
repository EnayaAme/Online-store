import './style.scss';
import { ApplyRouting } from './ts/ApplyRouting';
import data from './ts/data';

import CreateDefaultPage from './ts/DefaultPage';
import { CreateElement } from './ts/Elements/CreateElement';

const products = new data();
const AppRouting = new ApplyRouting();

const newarr = [];
newarr.push(products.Get()[0]);
newarr.push(products.Get()[1]);
newarr.push(products.Get()[2]);
products.GetMinMaxDate();
const hash = location.hash;

const Page = new CreateDefaultPage();
Page.CreateHeader();
AppRouting.init(hash);
window.addEventListener(
  'hashchange',
  () => {
    AppRouting.init(location.hash);
  },
  false
);
