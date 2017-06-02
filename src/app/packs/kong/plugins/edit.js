const KONG_ROOT="/api/kong";

const layout = {
  $type: 'div',
  children: {
    $type: 'HeaderPage',
    props: {
      title: {$map: `\`\${params.pluginName} Settings\``}
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
              data: {
                url: {$map: `params.id?\`${KONG_ROOT}/plugins/\${params.id}\`:''`},
              },
              schema: {
                url: {$map: `\`${KONG_ROOT}/plugins/schema/\${params.pluginName}\``}
              }
            },
            props: {
              dataRoot: 'config',
              successUrl: {$map: `\`/kong/plugins\``},
              submitTo: {
                method: {$map: 'params.id?"PUT":"POST"'},//'POST',
                url: {$map: `\`${KONG_ROOT}/plugins\``},
              },
              mapper: {$mapper: {
                name: 'params.pluginName',
                config: 'props'
              }}
            },
            Component: {$component: 'KongForm'}
          }
        }
      }
    ]
  },
  paths: [
      '/kong/plugin/:pluginName/:id',
      '/kong/plugin/:pluginName'
    ]
};

export default layout;
