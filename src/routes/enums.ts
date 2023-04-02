export enum routes {
  // default layout
  login = 'login',
  about = 'about',

  // private layout
  dashboard = 'dashboard',
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
