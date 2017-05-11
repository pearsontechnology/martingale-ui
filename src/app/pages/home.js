import Components from '../../components';

import {
  pageSchemaToReact
} from 'martingale-page-schema';

const KONG_ROOT="/api/kong";
const KUBE_ROOT="/api/kube/api";

const Page = (props)=>pageSchemaToReact({
  layout: {
    $type: 'div',
    children: {
      $type: 'HeaderPage',
      props: {
        title: 'Kong Overview'
      },
      children: {
        $type: 'Row',
        children: [
          {
            $type: 'Panel',
            props: {
              title: 'Connections Status',
              inset: true,
              md: 6,
              sm: 12
            },
            children: {
              $type: 'Provider',
              props: {
                provide: {
                  data: {
                    url: `${KONG_ROOT}/status`,
                    mapper:{$mapper: 'props.server?[props.server]:null'},
                  }
                },
                Component: {$component: 'BarChart'},
                props: {
                  bars:['connections_active', 'connections_waiting',
                  'connections_reading', 'connections_writing']
                }
              }
            }
          },
          {
            $type: 'Panel',
            props: {
              title: 'Connections Overview',
              inset: true,
              md: 3,
              sm: 12
            },
            children: {
              $type: 'Provider',
              props: {
                provide: {
                  data: {
                    url: `${KONG_ROOT}/status`,
                    mapper:{$mapper: 'props.server?[props.server]:null'},
                  }
                },
                Component: {$component: 'BarChart'},
                props: {
                  bars:['connections_handled', 'connections_accepted']
                }
              }
            }
          },
          {
            $type: 'Panel',
            props: {
              title: 'Timers',
              inset: true,
              md: 3,
              sm: 12
            },
            children: {
              $type: 'Provider',
              props: {
                provide: {
                  data: {
                    url: `${KONG_ROOT}`,
                    mapper:{$mapper: 'props.timers?[props.timers]:null'},
                  }
                },
                Component: {$component: 'BarChart'},
                props: {
                  bars:['running', 'pending']
                }
              }
            }
          },
        ]
      }
    }
  },
  components: Components,
  props
});

Page.path = '/';
Page.icon = 'Dashboard';
Page.sideNav = true;
Page.caption = 'Dashboard';

export default Page;
