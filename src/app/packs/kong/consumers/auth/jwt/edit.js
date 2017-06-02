const KONG_ROOT="/api/kong";

const schema = {
  fields: {
    key: {type: 'string', required: true},
    secret: {type: 'string', required: true}
  }
};

const layout = {
  $type: 'div',
  children: {
    $type: 'HeaderPage',
    props: {
      title: {$map: `params.name?\`\${params.id} - JWT Auth - \${params.name}\`:\`\${params.id} - JWT Auth\``},
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
                url: {$map: `params.name?\`${KONG_ROOT}/consumers/\${params.id}/jwt/\${params.name}\`:''`},
                mapper: {$mapper: '{key: props.key, id: props.id, consumer_id: props.consumer_id, created_at: props.created_at}'}
              }
            },
            props: {
              schema,
              successUrl: {$map: '`/kong/consumers/${params.id}/jwt-accounts`'},
              submitTo: {
                method: {$map: 'params.name?"PUT":"POST"'},
                url: {$map: `\`${KONG_ROOT}/consumers/\${params.id}/jwt\``}
              }
            },
            Component: {$component: 'KongForm'}
          }
        }
      }
    ]
  },
  paths: [
      '/kong/consumer/:id/jwt/:name',
      '/kong/consumer/:id/jwt'
    ]
};

export default layout;
