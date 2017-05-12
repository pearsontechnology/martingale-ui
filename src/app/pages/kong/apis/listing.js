const KONG_ROOT="/api/kong";

const layout = {
  $type: 'div',
  children: {
    $type: 'HeaderPage',
    props: {
      title: 'APIs'
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
              to: '/kong/api'
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
                  link: `/kong/api/\${name}`
                },
                {
                  caption: 'Plugins',
                  link: `/kong/api/\${name}/plugins`
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
  },
  path: '/kong/apis',
  icon: 'API',
  sideNav: true,
  caption: 'APIs'
};

export default layout;
