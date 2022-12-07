import { Block, BlockConstructable, renderDOM } from 'core';

type Props = Record<string, any>;

class Route {
  private pathname: string;

  private block: Block<any> | null;

  private readonly BlockClass: BlockConstructable<any>;

  private readonly props: Props;

  constructor(pathname: string, view: BlockConstructable<any>, props: Props) {
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
    this.block.show();
    renderDOM(this.block);
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

  private getRoute(pathname: string): Route | undefined {
    const router = this.routes.find((route: Route) => route.match(pathname));
    return router || this.routes.find((route: Route) => route.match('*'));
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this.onRoute(target.location.pathname);
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
