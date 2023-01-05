import './style.scss';
import { ApplyRouting } from './ts/ApplyRouting';
import data from './ts/data';

import CreateDefaultPage from './ts/DefaultPage';
import CreateRoute from './ts/route';

const products = new data();
const AppRouting = new ApplyRouting();

const newarr = [];
newarr.push(products.Get()[0]);
newarr.push(products.Get()[1]);
newarr.push(products.Get()[2]);
products.GetMinMaxDate();
const hash = location.hash;

//console.log(`current hash = ${hash}`)


const Page = new CreateDefaultPage();
Page.CreateHeader();
AppRouting.init(hash);
window.addEventListener('hashchange', () => {
  //console.log('The hash has changed!');
  //console.log(location.hash);
  AppRouting.init(location.hash);
}, false);
//Page.CreateMain();
//Page.CreateFooter();
