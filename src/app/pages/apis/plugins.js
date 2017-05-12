const KONG_ROOT="/api/kong";

const layout = {
  $type: 'div',
  children: {
    $type: 'HeaderPage',
    props: {
      title: {$map: `\`\${params.name} Plugin's\``}
    },
    children: {
      $type: 'Panel',
      props: {
        footer: {
          $type: 'Link',
          props: {
            caption: 'New',
            className: 'btn btn-primary',
            to: {$map: `\`/api/\${params.name}/plugin\``}
          }
        }
      },
      children: {
        $type: 'Provider',
        props: {
          provide: {
            data: {
              url: {$map: `\`${KONG_ROOT}/apis/\${params.name}/plugins\``},
              root: 'data'
            }
          },
          Component: {$component: 'ActionTable'},
          props: {
            mapper: {
              $mapper: {
                'Name': 'props.name',
                'Created At': 'new Date(props.created_at)',
                'Enabled': 'props.enabled'
              }
            },
            actions: [
              {
                caption: 'Edit',
                link: {$mapper: `\`/api/\${params.name}/plugin/\${props.name}/\${props.id}\``},
                btnStyle: 'primary'
              },
              {
                caption: 'Delete',
                delete: {$mapper: `\`${KONG_ROOT}/apis/\${params.name}/plugins/\${props.id}\``},
                message: `Are you sure you want to delete "\${name}"?`
              }
            ]
          }
        }
      }
    }
  },
  path: '/api/:name/plugins'
};

export default layout;
