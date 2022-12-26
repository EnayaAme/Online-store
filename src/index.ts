import './style.scss';
import data from './data';
import CreateDefaultPage from './ts/start';

const products = new data().get();
console.log(products);

const Page = new CreateDefaultPage();
Page.CreateHeader();
Page.CreateMain();
//Page.CreateFooter();
