const env = require('env-var');
const { version } = require('../../package.json');

const LOCAL = 'local';
const TEST = 'test';
const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const ENV_NAME = env
  .get('ENV_NAME')
  .required()
  .asEnum([LOCAL, TEST, DEVELOPMENT, PRODUCTION]);

const ASSETS_CDN_URL = env
  .get('ASSETS_CDN_URL')
  .required()
  .asString();

const DEPLOYED = ENV_NAME === DEVELOPMENT || ENV_NAME === PRODUCTION;

const ASSETS_URL_PATH = ENV_NAME !== PRODUCTION
  ? ASSETS_CDN_URL
  : `${ASSETS_CDN_URL}${version}/`;

const FLAGS = env
  .get('FLAGS')
  .default('')
  .asArray(',');

module.exports = {
  ENV_NAME,
  DEPLOYED,
  ASSETS_URL_PATH,
  FLAGS,
};
