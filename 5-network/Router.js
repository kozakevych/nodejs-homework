import { pathToRegexp } from 'path-to-regexp';

export default class Router {
  constructor() {
    this.routes = {
      GET: [],
      POST: [],
      PUT: [],
      DELETE: [],
    };
  }

  get(path, handler) {
    this.routes.GET.push({ path, handler });
    return this;
  }

  post(path, handler) {
    this.routes.POST.push({ path, handler });
    return this;
  }

  put(path, handler) {
    this.routes.PUT.push({ path, handler });
    return this;
  }

  delete(path, handler) {
    this.routes.DELETE.push({ path, handler });
    return this;
  }

  handleRequest(req, res) {
    const method = req.method;
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;

    const matchingRoute = this.findMatchingRoute(method, path);

    if (matchingRoute) {
      req.params = matchingRoute.params;
      matchingRoute.handler(req, res);
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  }

  findMatchingRoute(method, path) {
    const routes = this.routes[method];
    for (const route of routes) {
      const keys = [];
      const regex = pathToRegexp(route.path, keys);
      const matches = regex.exec(path);

      if (matches) {
        const params = {};
        for (let i = 1; i < matches.length; i++) {
          const key = keys[i - 1].name;
          const value = matches[i];
          params[key] = value;
        }

        return { handler: route.handler, params };
      }
    }
    return null;
  }
}
