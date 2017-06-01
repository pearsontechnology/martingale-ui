const KONG_ROOT="/api/kong";

const layout = {
  $type: 'div',
  children: {
    $type: 'Page',
    children: [
      {
        $type: 'PageHeader',
        props: {
          title: 'Kong Overview'
        }
      },
      {
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
                    refresh: 5000
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
                    refresh: 5000
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
                    refresh: 5000
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
    ]
  },
  path: '/kong/',
  icon: 'Dashboard',
  sideNav: true,
  caption: 'Kong Dashboard',
  isDashboard: true
};

export default layout;
