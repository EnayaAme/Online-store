import './style.scss';
import data from './ts/data';
import CreateDefaultPage from './ts/start';
import CreateRoute from './ts/route';

const products = new data();
const route = new CreateRoute();

const newarr = [];
newarr.push(products.Get()[0]);
newarr.push(products.Get()[1]);
newarr.push(products.Get()[2]);
products.GetMinMaxDate();

window.addEventListener('hashchange', () => {
  const hash = window.location.hash;
  route.init(hash.slice(1));
});

const Page = new CreateDefaultPage();
Page.CreateHeader();
Page.CreateMain();
//Page.CreateFooter();
