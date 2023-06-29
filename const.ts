export enum AppRoute {
  Root = '/',
  Auth = '/auth',
  Profiles = '/profiles',
}

export enum ApiRoute {
  Register = '/api/register',
  Current = '/api/current',
  Random = '/api/random',
  MovieList = '/api/movies',
  Favorite = '/api/favorite',
  Favorites = '/api/favorites',
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

export const TOP_OFFSET = 66;