export enum AppRoute {
  Root = '/',
  Auth = '/auth',
}

export enum ApiRoute {
  Register = '/api/auth/register',
  Current = '/api/current',
}

export enum OAuthMetod {
  Google = 'google',
  Github = 'github',
}

export enum AuthStatus {
  AUTH = 'authenticated',
  NoAUTH = 'unauthenticated',
  Loading = 'loading',
}