import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private handlers: {[key: string]: DetachedRouteHandle} = {};

  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.shouldReuse(route);
  }

  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.handlers[route.routeConfig.path] = handle;
  }

  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
  }

  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) {
      return null;
    }
    return this.handlers[route.routeConfig.path];
  }

  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    if (future.routeConfig === curr.routeConfig) {
      return this.shouldReuse(future);
    }
    return false;
  }

  private shouldReuse(route: ActivatedRouteSnapshot): boolean {
    if (route.data && typeof route.data.shouldReuse === 'boolean') {
      return <boolean>route.data.shouldReuse;
    }
    return true;
  }
}
