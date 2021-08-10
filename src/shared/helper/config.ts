import * as config from 'config';

const API_PORT: number = config.get('app.api.port');

const DATABASE: any = config.get('database');

const AUTH = {
  JWT_SECRET: 'secretkeyin',
  EXPIRED_IN: '30d',
};

export { DATABASE, API_PORT, AUTH };
