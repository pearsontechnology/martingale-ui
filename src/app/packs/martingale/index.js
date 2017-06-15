import Home from './home';
import KitchenSink from './kitchensink';
import Settings from './settings';
import Designer from './designer';

const isDev = process.env.NODE_ENV==='development';

const pages = isDev?{
  // Development pages
  Home,
  KitchenSink,
  Settings,
  Designer
}:{
  // Production pages
  Home,
  KitchenSink
};

export default {
  name: 'Martingale',
  icon: 'Logo',
  pages,
  settings: {
    apis: {
      uiApi: {
        url: '/api/kong/apis/martingale-ui'
      }
    },
    schema: {
      upstream_url: {type: 'string', required: true, api: 'uiApi', property: 'upstream_url'},
      hosts: {type: 'array', api: 'uiApi', property: 'hosts', minItems: 1, items: {type: 'string'}}
    }
  }
};
