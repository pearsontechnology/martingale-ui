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
        title: 'API\'s'
      },
      children: [
        {
          $type: 'Panel',
          props: {
            footer: {
              $type: 'Link',
              props: {
                caption: 'New',
                className: 'btn btn-primary',
                to: '/api'
              }
            }
          },
          children: {
            $type: 'Provider',
            props: {
              provide: {
                data: {
                  url: `${KONG_ROOT}/apis`,
                  root: 'data'
                }
              },
              Component: {$component: 'ActionTable'},
              props: {
                mapper: {
                  $mapper: {
                    'Name': 'props.name',
                    'Host\'s': '(props.hosts || []).join(",")',
                    'Upstream URL': 'props.upstream_url',
                    'URI\'s': '(props.uris || []).join(",")'
                  }
                },
                actions: [
                  {
                    caption: 'Settings',
                    btnStyle: 'primary',
                    link: `/api/\${name}`
                  },
                  {
                    caption: 'Plugins',
                    link: `/api/\${name}/plugins`
                  },
                  {
                    caption: 'Delete',
                    delete: `${KONG_ROOT}/apis/\${name}`,
                    message: `Are you sure you want to delete "\${name}"?`
                  }
                ]
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

Page.path = '/apis';
Page.icon = 'API';
Page.sideNav = true;
Page.caption = 'API\'s';

export default Page;
