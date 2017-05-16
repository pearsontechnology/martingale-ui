import React from 'react';
import Components from 'martingale-ui-components';
const {
  Form
} = Components;

const schema={
  "type": "object",
  "required": [],
  "properties": {
    "kong": {
      "title": "Kong",
      "type": "object",
      "required": [
        "backend"
      ],
      "properties": {
        "backend": {
          "type": "string",
          "title": "Backend"
        },
        "auth": {
          "title": "Kong Basic Auth",
          "type": "object",
          "required": [],
          "properties": {
            "username": {
              "type": "string",
              "title": "Username"
            },
            "password": {
              "type": "string",
              "title": "Password"
            }
          }
        }
      }
    },
    "kube": {
      "title": "Kubernetes",
      "type": "object",
      "required": [
        "backend"
      ],
      "properties": {
        "backend": {
          "type": "string",
          "title": "Backend"
        },
        "auth": {
          "title": "Kubernetes Basic Auth",
          "type": "object",
          "required": [],
          "properties": {
            "username": {
              "type": "string",
              "title": "Username"
            },
            "password": {
              "type": "string",
              "title": "Password"
            }
          }
        }
      }
    },
    "martingale": {
      "title": "Martingale",
      "type": "object",
      "required": [
        "hosts",
        "backend"
      ],
      "properties": {
        "backend": {
          "type": "string",
          "title": "Backend"
        },
        "hosts": {
          "type": "array",
          "title": "Hosts",
          "minItems": 1,
          "items": {
            "type": "string"
          }
        }
      }
    }
  }
};

const getApi = (api, props)=>{
  const prop = props[api];
  if(prop){
    if(prop.message === 'Not found'){
      return false;
    }
    return prop;
  }
  return false;
};

const getConfig = (props)=>{
  const uiApi = getApi('martingale-ui', props);

  const kongApi = getApi('martingale-kong-api', props);
  const kongPlugins = getApi('martingale-kong-plugins', props);
  const kongHost = kongApi?kongApi.upstream_url:'';
  const kongAuthPlugin = kongPlugins?(kongPlugins.filter((plugin)=>plugin.name==='upstream-auth-basic').shift()):false;
  const kongUser = kongAuthPlugin?kongAuthPlugin.config.username:'';
  const kongPassword = kongAuthPlugin?kongAuthPlugin.config.password:'';

  const kubeApi = getApi('martingale-kube-api', props);
  const kubePlugins = getApi('martingale-kube-plugins', props);
  const kubeHost = kubeApi?kubeApi.upstream_url:'';
  const kubeAuthPlugin = kubePlugins?(kubePlugins.filter((plugin)=>plugin.name==='upstream-auth-basic').shift()):false;
  const kubeUser = kubeAuthPlugin?kubeAuthPlugin.config.username:'';
  const kubePassword = kubeAuthPlugin?kubeAuthPlugin.config.password:'';

  const martingaleHost = uiApi?uiApi.upstream_url||'':'';
  const martingaleUrl = uiApi?uiApi.hosts||[]:[];
  const config = {
    kong: {
      backend: kongHost,
      auth: {
        username: kongUser,
        password: kongPassword
      }
    },
    kube: {
      backend: kubeHost,
      auth: {
        username: kubeUser,
        password: kubePassword
      }
    },
    martingale: {
      backend: martingaleHost,
      hosts: martingaleUrl
    }
  };
  return config;
};

const submitForm = ({formData: data})=>{
  const {
    kube,
    kong,
    martingale
  } = data;
  // TODO: Generic way to save configuration values here
  console.log('Kube', kube);
  console.log('Kong', kong);
  console.log('Martingale', martingale);
}

const Settings = (props)=>{
  const config = getConfig(props);
  return (
    <Form schema={schema} data={config} onSubmit={submitForm}/>
  );
};

const layout = {
  $type: 'HeaderPage',
  props: {
    title: 'Martingale Settings'
  },
  children: {
    $type: 'Panel',
    props: {
      inset: true
    },
    children: {
      $type: 'Provider',
      props: {
        provide: {
          'martingale-ui': {
            url: '/api/kong/apis/martingale-ui'
          },
          'martingale-kong-api': {
            url: '/api/kong/apis/martingale-kong-api'
          },
          'martingale-kong-plugins': {
            url: '/api/kong/apis/martingale-kong-api/plugins',
            root: 'data'
          },
          'martingale-kube-api': {
            url: '/api/kong/apis/martingale-kube-api'
          },
          'martingale-kube-plugins': {
            url: '/api/kong/apis/martingale-kube-api/plugins',
            root: 'data'
          }
        },
        Component: Settings
      }
    }
  },
  path: '/settings',
  icon: 'Settings',
  sideNav: true,
  caption: 'Settings'
};

export default layout;
