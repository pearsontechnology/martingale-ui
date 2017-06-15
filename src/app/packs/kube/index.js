import KubeDashboard from './dashboard';
import Namespaces from './namespaces';

export default {
  name: 'Kube',
  pages: {
    KubeDashboard,
    ...Namespaces
  },
  settings: {
    apis: {
      kubeApi: {
        url: '/api/kong/apis/martingale-kube-api'
      },
      kubeAuthPlugin: {
        url: '/api/kong/apis/martingale-kube-api/plugins',
        root: 'data',
        mapper(kubePlugins){
          return kubePlugins.filter((plugin)=>plugin.name==='upstream-auth-basic').shift();
        }
      }
    },
    schema: {
      //backend: {type: 'string', required: true, api: 'kubeApi', source: 'upstream_url'},
      upstream_url: {title: 'Backend: ', type: 'string', required: true, api: 'kubeApi', property: 'upstream_url'},
      basicAuth: {
        type: 'object',
        properties: {
          username: {type: 'string', api: 'kubeAuthPlugin', property: 'config.username'},
          password: {type: 'string', private: true, api: 'kubeAuthPlugin', property: 'config.password'}
        }
      }
    }
  }
};
