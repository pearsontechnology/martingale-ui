const KONG_ROOT="/api/kong";

const layout = {
  $type: 'div',
  children: {
    $type: 'HeaderPage',
    props: {
      title: 'New Plugin'
    },
    children: [
      {
        $type: 'Panel',
        props: {
          inset: true
        },
        children: {
          $type: 'Provider',
          props: {
            mapper(data){
              if(Array.isArray(data.plugins) && Array.isArray(data.apis)){
                return Object.assign({}, data, {
                  schema: {
                    fields: {
                      api: {
                        type: 'string',
                        enum: ['[global]', ...data.apis.map(api=>api.name)],
                        default: '[global]'
                      },
                      pluginType: {
                        type: 'string',
                        enum: data.plugins,
                        required: true
                      }
                    }
                  }
                });
              }
              return data;
            },
            provide: {
              apis: {
                url: `${KONG_ROOT}/apis`,
                root: 'data'
              },
              plugins: {
                url: `${KONG_ROOT}/plugins/enabled`,
                root: 'enabled_plugins'
              }
            },
            Component: {$component: 'KongForm'},
            props: {
              // eslint-disable-next-line
              successUrl: {$mapper: 'props.api!==\'[global]\'?`/kong/api/${props.api}/plugin/${props.pluginType}`:`/kong/plugin/${props.pluginType}`'}
            }
          }
        }
      }
    ]
  },
  path: '/kong/plugin'
};

export default layout;
