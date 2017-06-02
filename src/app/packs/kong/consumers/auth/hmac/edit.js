const KONG_ROOT="/api/kong";

const schema = {
  fields: {
    username: {type: 'string', required: true},
    secret: {type: 'string', required: true}
  }
};

const layout = {
  $type: 'div',
  children: {
    $type: 'HeaderPage',
    props: {
      title: {$map: `params.name?\`\${params.id} - HMAC Auth - \${params.name}\`:\`\${params.id} - HMAC Auth\``},
    },
    children: [
      {
        $type: 'Panel',
        props: {
          inset: true
        },
        children: {
          $type: 'Provider',
          props: {
            provide: {
              data: {
                url: {$map: `params.name?\`${KONG_ROOT}/consumers/\${params.id}/hmac-auth/\${params.name}\`:''`},
                mapper: {$mapper: '{username: props.username, id: props.id, consumer_id: props.consumer_id, created_at: props.created_at}'}
              }
            },
            props: {
              schema,
              successUrl: {$map: '`/kong/consumers/${params.id}/hmac-auth-accounts`'},
              submitTo: {
                method: {$map: 'params.name?"PUT":"POST"'},
                url: {$map: `\`${KONG_ROOT}/consumers/\${params.id}/hmac-auth\``}
              }
            },
            Component: {$component: 'KongForm'}
          }
        }
      }
    ]
  },
  paths: [
      '/kong/consumer/:id/hmac-auth/:name',
      '/kong/consumer/:id/hmac-auth'
    ]
};

export default layout;
