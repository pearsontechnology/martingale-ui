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
    }
  },
  components: Components,
  props
});

Page.path = '/api/:name/plugin';
Page.icon = 'Plugin';
Page.caption = 'Register API Plugin';

export default Page;
