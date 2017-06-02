const KONG_ROOT="/api/kong";

const schema = {
  fields: {
    username: {type: 'string', required: true},
    password: {type: 'string', required: true}
  }
};

const layout = {
  $type: 'div',
  children: {
    $type: 'HeaderPage',
    props: {
      title: {$map: `params.name?\`\${params.id} - \${params.name}\`:\`\${params.id} - [new]\``},
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
                url: {$map: `params.name?\`${KONG_ROOT}/consumers/\${params.id}/basic-auth/\${params.name}\`:''`},
                mapper: {$mapper: '{username: props.username, id: props.id, consumer_id: props.consumer_id, created_at: props.created_at}'}
              }
            },
            props: {
              schema,
              successUrl: {$map: '`/kong/consumers/${params.id}/basic-auth-accounts`'},
              submitTo: {
                method: {$map: 'params.name?"PUT":"POST"'},
                url: {$map: `\`${KONG_ROOT}/consumers/\${params.id}/basic-auth\``}
              }
            },
            Component: {$component: 'KongForm'}
          }
        }
      }
    ]
  },
  paths: [
      '/kong/consumer/:id/basic-auth/:name',
      '/kong/consumer/:id/basic-auth'
    ]
};

export default layout;
