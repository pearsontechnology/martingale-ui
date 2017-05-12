const KONG_ROOT="/api/kong";

const layout = {
  $type: 'div',
  children: {
    $type: 'HeaderPage',
    props: {
      title: {$map: `\`\${params.name} Settings\``}
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
                url: {$map: `params.id?\`${KONG_ROOT}/apis/\${params.name}/plugins/\${params.id}\`:''`},
              },
              schema: {
                url: {$map: `\`${KONG_ROOT}/plugins/schema/\${params.pluginName}\``}
              }
            },
            props: {
              dataRoot: 'config',
              successUrl: {$map: `\`/kong/api/\${params.name}/plugins\``},
              submitTo: {
                method: {$map: 'params.id?"PUT":"POST"'},//'POST',
                url: {$map: `\`${KONG_ROOT}/apis/\${params.name}/plugins\``},
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
      '/kong/api/:name/plugin/:pluginName/:id',
      '/kong/api/:name/plugin/:pluginName'
    ]
};

export default layout;
