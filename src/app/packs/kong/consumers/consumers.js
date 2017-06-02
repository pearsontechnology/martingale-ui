const KONG_ROOT="/api/kong";

const layout = {
  $type: 'HeaderPage',
  props: {
    title: 'Kong Consumers'
  },
  children: {
    $type: 'Panel',
    props: {
      footer: {
        $type: 'Link',
        props: {
          caption: 'New',
          className: 'btn btn-primary',
          to: '/kong/consumer'
        }
      }
    },
    children: {
      $type: 'Provider',
      props: {
        provide: {
          data: {
            url: `${KONG_ROOT}/consumers`,
            root: 'data'
          }
        },
        Component: {$component: 'ActionTable'},
        props: {
          actions: [
            {
              caption: 'Edit',
              btnStyle: 'primary',
              link: `/kong/consumer/\${id}`
            },
            {
              caption: 'Delete',
              delete: `${KONG_ROOT}/consumers/\${id}`,
              message: `Are you sure you want to delete "\${username||custom_id}"?`
            },
            {
              caption: 'Basic Auth',
              link: `/kong/consumers/\${username||id}/basic-auth-accounts`
            },
            {
              caption: 'OAuth2',
              link: `/kong/consumers/\${username||id}/oauth2-accounts`
            },
            {
              caption: 'HMAC',
              link: `/kong/consumers/\${username||id}/hmac-auth-accounts`
            },
            {
              caption: 'Key',
              link: `/kong/consumers/\${username||id}/key-auth-accounts`
            },
            {
              caption: 'JWT',
              link: `/kong/consumers/\${username||id}/jwt-accounts`
            },
            {
              caption: 'ACL\'s',
              link: `/kong/consumers/\${username||id}/acl-auth-accounts`
            }
          ]
        }
      }
    }
  },
  path: '/kong/consumers',
  icon: 'Consumer',
  sideNav: true,
  caption: 'Consumers'
};

export default layout;
