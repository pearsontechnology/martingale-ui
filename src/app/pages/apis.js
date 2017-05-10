import Components from '../../components';

import {
  pageSchemaToReact
} from 'martingale-page-schema';

const KONG_ROOT="/api/kong";
const KUBE_ROOT="/api/kube/api";

const Page = ()=>pageSchemaToReact({
  layout: {
    $type: 'div',
    children: {
      $type: 'HeaderPage',
      props: {
        title: 'API\'s'
      },
      children: {
        $type: 'Panel',
        children: {
          $type: 'Provider',
          props: {
            provide: {
              data: {
                url: `${KONG_ROOT}/apis`,
                root: 'data'
              }
            },
            Component: {$component: 'Table'},
          }
        }
      }
    }
  },
  components: Components
});

Page.path = '/apis';
Page.icon = 'API';
Page.sideNav = true;
Page.caption = 'API\'s';

export default Page;
