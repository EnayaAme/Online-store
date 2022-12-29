import './style.scss';
import data from './ts/data';
import CreateDefaultPage from './ts/start';

const products = new data();
//console.log(products.Get());
//products.GetCategories();
const newarr = [];
newarr.push(products.Get()[0]);
newarr.push(products.Get()[1]);
newarr.push(products.Get()[2]);
//console.log(newarr);
console.log(products.GetBrands(newarr));
console.log(products.GetBrands());
products.GetMinMaxDate();

const Page = new CreateDefaultPage();
Page.CreateHeader();
Page.CreateMain();
//Page.CreateFooter();
