// tslint:disable-next-line: one-variable-per-declaration
export enum environment  {
  SWAPI_URL = 'https://swapi.co/api',
  MONGODB_CONNECTIONSTRING = 'mongodb://localhost:27017/starwarsapi',
  COUNT_OF_RECORDS = 50,
  SKIP_LIMIT = 50,
  CACHE_SECONDS = 172800,
  CACHE_OBJECTS = 100,
  MAX_RATE_LIMIT = 120,
  MAX_RATE_SECONDS = 60000,
  RATE_MESSAGE = 'Too many requests created from this IP, please try again later',
}
