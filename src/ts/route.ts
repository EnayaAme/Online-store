import CreateDefaultPage from "./start";

class Router {
  private pages: string[] = [];
  private defaulthref = window.location.href;
  private filters: string[] = [];
  private main = document.getElementsByTagName('main');
  private body = document.body;
  private isMain = true;
  init(id: string) {
    if (this.pages.length === 0) {
      this.pages.push(id);
    } else {
      this.pages = [];
      this.pages.push(id);
    }
    if (id.split('-')[0] === 'card') {
      //console.log(this.body.children[1].remove());
      const newurl = `#${id}`;
      //this.body.childNodes[1].innerHTML = '';
      this.body.children[1].remove();
      window.history.pushState(null, '', newurl);
      this.isMain = false;
      console.log('Мы в карточке');
      console.log(this.isMain);
      // const newurl = window.location.origin + '#/' + this.pages[0];
      // window.history.pushState(null, '', newurl);
      // car.initialization(id);
      // localStorage.setItem('currentpage', window.location.href);
    }
    if (id === '' && this.isMain === false) {
      const MainPage = new CreateDefaultPage();
      //this.body.children[1].remove();
      MainPage.CreateMain();
      this.isMain = true;
      // console.log(`defaulthref ${this.defaulthref}`);
      // this.main.innerHTML = '';
      // window.history.pushState(null, '', window.location.origin);
      // const ss = mm.createdefaultpage(products);
      // this.addrouting(ss.firsta);
      // this.addrouting(ss.seconda);
      // this.addrouting(ss.thirda);
    }
    if (id !== '' && id.split('-')[0] !== 'card') {
      console.log(id);
      console.log('ERROR 404');
    }
  }

  addrouting(tag: HTMLElement) {
    tag.onclick = (e: Event) => {
      const target = e.target;
      const id = (target as HTMLButtonElement).id;
      //console.log(id === '');
      this.init(id);
    };
  }
}

export default Router;
