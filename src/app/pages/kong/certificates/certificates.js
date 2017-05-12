const KONG_ROOT="/api/kong";

const layout = {
  $type: 'HeaderPage',
  props: {
    title: 'Kong Certificates'
  },
  children: {
    $type: 'Panel',
    props: {
      footer: {
        $type: 'Link',
        props: {
          caption: 'New',
          className: 'btn btn-primary',
          to: '/kong/certificate'
        }
      }
    },
    children: {
      $type: 'Provider',
      props: {
        provide: {
          data: {
            url: `${KONG_ROOT}/certificates`
          }
        },
        Component: {$component: 'ActionTable'},
        props: {
          actions: [
            {
              caption: 'Edit',
              btnStyle: 'primary',
              link: `/kong/certificate/\${id}`
            },
            {
              caption: 'Delete',
              delete: `${KONG_ROOT}/certificates/\${id}`,
              message: `Are you sure you want to delete "\${cert}"?`
            }
          ]
        }
      }
    }
  },
  path: '/kong/certificates',
  icon: 'Certificate',
  sideNav: true,
  caption: 'Certificates'
};

export default layout;
