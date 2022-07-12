import { Block, BlockConstructable, renderDOM } from 'core';

type Props = Record<string, any>;

class Route {
  private pathname: string;

  private block: Block<{}> | null;

  private readonly BlockClass: BlockConstructable<{}>;

  private readonly props: Props;

  constructor(pathname: string, view: BlockConstructable<{}>, props: Props) {
    this.pathname = pathname;
    this.BlockClass = view;
    this.block = null;
    this.props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this.block) {
      this.block.hide();
    }
  }

  match(pathname: string) {
    return this.pathname === pathname;
  }

  render() {
    if (!this.block) {
      this.block = new this.BlockClass(this.props);
    }
    renderDOM(this.block);
    this.block.show();
  }
}

export default class Router {
  static __instance: Router;

  private routes: Route[] = [];

  private history: History = window.history;

  private currentRoute: Route | null = null;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  private onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route: Route) => route.match(pathname));
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      console.log('onpopstate', event);
      this.onRoute(window.location.pathname);
    };
    this.onRoute(window.location.pathname);
  }

  use(pathname: string, block: BlockConstructable<Props>, props: Props = {}) {
    const route = new Route(pathname, block, props);
    this.routes.push(route);
    return this;
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this.onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }
}
