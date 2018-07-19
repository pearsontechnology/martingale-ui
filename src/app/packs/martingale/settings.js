import React from 'react';
import Components from '@martingale/ui-components';
import {
  getObjectValue
} from '@martingale/utils';
import {
  Provider
} from '@martingale/provider';
const {
  Panel,
  Form
} = Components;

/*
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
  const uiApi = getApi('@martingale/ui', props);

  const kongApi = getApi('@martingale/kong-api', props);
  const kongPlugins = getApi('@martingale/kong-plugins', props);
  const kongHost = kongApi?kongApi.upstream_url:'';
  const kongAuthPlugin = kongPlugins?(kongPlugins.filter((plugin)=>plugin.name==='upstream-auth-basic').shift()):false;
  const kongUser = kongAuthPlugin?kongAuthPlugin.config.username:'';
  const kongPassword = kongAuthPlugin?kongAuthPlugin.config.password:'';

  const kubeApi = getApi('@martingale/kube-api', props);
  const kubePlugins = getApi('@martingale/kube-plugins', props);
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
          '@martingale/ui': {
            url: '/api/kong/apis/martingale-ui'
          },
          '@martingale/kong-api': {
            url: '/api/kong/apis/martingale-kong-api'
          },
          '@martingale/kong-plugins': {
            url: '/api/kong/apis/martingale-kong-api/plugins',
            root: 'data'
          },
          '@martingale/kube-api': {
            url: '/api/kong/apis/martingale-kube-api'
          },
          '@martingale/kube-plugins': {
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
*/

//export default layout;

const valueSelector = (api, property)=>{
  if(api && property){
    return `${api}.${property}`;
  }
  if(api){
    return api;
  }
  return property;
};

const schemaToObject=(schema, data)=>{
  //return getObjectValue('config.username', data['kubeAuthPlugin']);
  const {
    type,
    api,
    property,
    properties,
    items,
    default: defaultValue
  } = schema;
  const value = (api || property)?getObjectValue(valueSelector(api, property), data):data;
  switch(type){
    case('object'):
      const keys = Object.keys(properties);
      return keys.reduce((o, key)=>{
        return Object.assign(o, {[key]: schemaToObject(properties[key], value)});
      }, {});
    case('array'):
      return value;
    default:
      if(typeof(value)===type){
        return value;
      }
  }
  return undefined;
};

const Layout = (props)=>{
  const Packs = props.__settings.Packs;
  const schema = {type: 'object', properties: Packs.reduce((s, p)=>{
    return Object.assign({}, s, {[p.name]: {type: 'object', properties: p.settings.schema}});
  }, {})};
  const apis = Packs.reduce((s, p)=>{
    const apis = (p.settings||{}).apis||{};
    return Object.assign(s, apis);
  }, {});
  const compProps = {
    schema,
    onSubmit({formData}){
      console.log(arguments)
      console.log('New Data: ', formData);
    }
  };
  const mapper = (props)=>{
    const {
      onSubmit,
      schema,
      ...data
    } = props;
    return {onSubmit, schema, data: schemaToObject(schema, data)};
  };
  return (
    <Panel inset={true}>
      <Provider provide={apis} mapper={mapper} props={compProps} Component={Form} />
    </Panel>
  );
};

const opts = {
  path: '/settings',
  icon: 'Settings',
  sideNav: true,
  caption: 'Settings'
};

Object.keys(opts).forEach(key=>Layout[key]=opts[key]);

export default Layout;
