const KONG_ROOT="/api/kong";
const KUBE_ROOT="/api/kube/api";

const layout = {
  $type: 'div',
  children: {
    $type: 'Page',
    children: [
      {
        $type: 'PageHeader',
        props: {
          title: 'Kubernetes Namespaces'
        }
      },
      {
        $type: 'Panel',
        children: {
          $type: 'Provider',
          props: {
            provide: {
              data: {
                url: `${KUBE_ROOT}/v1/namespaces`,
                root: 'items',
                mapper: {$mapper: 'props.map(r=>r.metadata).map(m=>{return {name: m.name, created: m.creationTimestamp}})'}
              }
            },
            Component: {$component: 'ActionTable'},
            props: {
              actions: {
                link: `/namespace/\${name}/pods`,
                caption: 'View Pods',
                btnStyle: 'primary'
              }
            }
          }
        }
      },
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
    ]
  },
  path: '/',
  icon: 'Dashboard',
  sideNav: true,
  caption: 'Dashboard'
};

export default layout;
