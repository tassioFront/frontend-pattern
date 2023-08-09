export enum routes {
  // default layout
  login = 'login',
  about = 'about',
  articles = 'articles',

  // private layout
  dashboard = 'dashboard',

  // default layout
  forbidden = 'forbidden',
}

export enum routesPrefix {
  public = '/',
  app = '/app',
}

// to ?my-search-param=value url cases
export enum searchParamsRoutes {
  isOpenModal = 'om',
}
