import Components from '../../../components';

import {
  pageSchemaToReact
} from 'martingale-page-schema';

const KONG_ROOT="/api/kong";

const Page = (props)=>pageSchemaToReact({
  layout: {
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
                successUrl: {$map: `\`/api/\${params.name}/plugins\``},
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
    }
  },
  components: Components,
  props
});

//Page.path = '/api/:name/plugin/:pluginName/:id';
Page.paths = [
  '/api/:name/plugin/:pluginName/:id',
  '/api/:name/plugin/:pluginName'
];
Page.icon = 'API';
Page.caption = 'API Settings';

export default Page;
