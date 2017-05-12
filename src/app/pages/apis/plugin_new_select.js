const KONG_ROOT="/api/kong";

const layout = {
  $type: 'div',
  children: {
    $type: 'HeaderPage',
    props: {
      title: {$map: `\`\${params.name} - New Plugin\``}
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
            provide: {
              schema: {
                url: `${KONG_ROOT}/plugins/enabled`,
                mapper: {$mapper: {
                  fields: {
                    pluginType: {
                      type: '\'string\'',
                      enum: 'props.enabled_plugins',
                      required: true
                    }
                  }
                }}
              }
            },
            Component: {$component: 'KongForm'},
            props: {
              successUrl: {$mapper: `\`/api/\${params.name}/plugin/\${props.pluginType}\``}
            }
          }
        }
      }
    ]
  },
  path: '/api/:name/plugin'
};

export default layout;
