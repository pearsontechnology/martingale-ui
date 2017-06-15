import Cluster from './cluster';
import APIs from './apis';
import Plugins from './plugins';
import Consumers from './consumers';
import Certificates from './certificates';
import SNIs from './snis';
import KongDashboard from './dashboard';
//import Upstreams from './upstreams';

export default {
  name: 'Kong',
  pages: {
    KongDashboard,
    ...Plugins,
    ...Cluster,
    ...APIs,
    ...Consumers,
    ...Certificates,
    ...SNIs,
    //...Upstreams
  },
  settings: {
    apis: {
      kongApi: {
        url: '/api/kong/apis/martingale-kong-api'
      },
      kongAuthPlugin: {
        url: '/api/kong/apis/martingale-kong-api/plugins',
        root: 'data',
        mapper(kongPlugins){
          return kongPlugins.filter((plugin)=>plugin.name==='upstream-auth-basic').shift();
        }
      },
    },
    schema: {
      backend: {type: 'string', required: true, api: 'kongApi', property: 'upstream_url'},
      basicAuth: {
        type: 'object',
        properties: {
          username: {type: 'string', api: 'kongAuthPlugin', property: 'config.username'},
          password: {type: 'string', private: true, api: 'kongAuthPlugin', property: 'config.password'}
        }
      }
    }
  }
};
