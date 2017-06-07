const KONG_ROOT="/api/kong";

const schema = {
  fields: {
    key: {type: 'string'}
  }
};

const layout = {
  $type: 'div',
  children: {
    $type: 'HeaderPage',
    props: {
      title: {$map: `params.name?\`\${params.id} - Key Auth - \${params.name}\`:\`\${params.id} - Key Auth\``},
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
                url: {$map: `params.name?\`${KONG_ROOT}/consumers/\${params.id}/key-auth/\${params.name}\`:''`},
                mapper: {$mapper: '{key: props.key, id: props.id, consumer_id: props.consumer_id, created_at: props.created_at}'}
              }
            },
            props: {
              schema,
              // eslint-disable-next-line
              successUrl: {$map: '`/kong/consumers/${params.id}/key-auth-accounts`'},
              submitTo: {
                method: {$map: 'params.name?"PUT":"POST"'},
                url: {$map: `\`${KONG_ROOT}/consumers/\${params.id}/key-auth\``}
              }
            },
            Component: {$component: 'KongForm'}
          }
        }
      }
    ]
  },
  paths: [
      '/kong/consumer/:id/key-auth/:name',
      '/kong/consumer/:id/key-auth'
    ]
};

export default layout;
