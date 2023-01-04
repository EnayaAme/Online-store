import './style.scss';
import data from './ts/data';

import CreateDefaultPage from './ts/DefaultPage';
import CreateRoute from './ts/route';

const products = new data();
const route = new CreateRoute();

const newarr = [];
newarr.push(products.Get()[0]);
newarr.push(products.Get()[1]);
newarr.push(products.Get()[2]);
products.GetMinMaxDate();
const hash = location.hash;

//console.log(`current hash = ${hash}`)


const Page = new CreateDefaultPage();
Page.CreateHeader();
route.init(hash);
window.addEventListener('hashchange', () => {
  //console.log('The hash has changed!');
  //console.log(location.hash);
  route.init(location.hash);
}, false);
//Page.CreateMain();
//Page.CreateFooter();
