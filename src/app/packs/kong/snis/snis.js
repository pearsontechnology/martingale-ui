const KONG_ROOT="/api/kong";

const layout = {
  $type: 'HeaderPage',
  props: {
    title: 'Kong SNI'
  },
  children: {
    $type: 'Panel',
    props: {
      footer: {
        $type: 'Link',
        props: {
          caption: 'New',
          className: 'btn btn-primary',
          to: '/kong/sni'
        }
      }
    },
    children: {
      $type: 'Provider',
      props: {
        provide: {
          data: {
            url: `${KONG_ROOT}/snis`,
            root: 'data'
          }
        },
        Component: {$component: 'ActionTable'},
        props: {
          actions: [
            {
              caption: 'Edit',
              btnStyle: 'primary',
              link: `/kong/sni/\${name}`
            },
            {
              caption: 'Delete',
              delete: `${KONG_ROOT}/snis/\${name}`,
              message: `Are you sure you want to delete "\${name}"?`
            }
          ]
        }
      }
    }
  },
  path: '/kong/snis',
  icon: 'SNI',
  sideNav: true,
  caption: 'SNI'
};

export default layout;
