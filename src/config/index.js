import * as production from './production';
// import * as development from './development';

 // eslint-disable-next-line import/no-mutable-exports
let config = production;

// if (process.env.NODE_ENV !== 'production') {
//   config = Object.assign({}, production, development);
// }

export const {
  MODE,
  ENDPOINT,
  WEBSOCKET_URL,
  VAT,
  SERVICE_CHARGE,
  VAT_DEFAULT,
  SERVICE_CHARGE_DEFAULT,
} = config;

// module.exports = config;
export default config;
