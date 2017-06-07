const KONG_ROOT="/api/kong";

const schema = {
  fields: {
    name: {type: 'string', required: true},
    client_id: {type: 'string'},
    client_secret: {type: 'string'},
    redirect_uri: {type: 'array', required: true}
  }
};

const layout = {
  $type: 'div',
  children: {
    $type: 'HeaderPage',
    props: {
      title: {$map: `params.name?\`\${params.id} - OAuth2\`:\`\${params.id} - OAuth2\``},
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
                url: {$map: `params.name?\`${KONG_ROOT}/consumers/\${params.id}/oauth2/\${params.name}\`:''`},
                mapper: {$mapper: '{name: props.name, id: props.id, consumer_id: props.consumer_id, created_at: props.created_at, client_id: props.client_id, client_secret: props.client_secret, redirect_uri: props.redirect_uri}'}
              }
            },
            props: {
              schema,
              // eslint-disable-next-line
              successUrl: {$map: '`/kong/consumers/${params.id}/oauth2-accounts`'},
              submitTo: {
                method: {$map: 'params.name?"PUT":"POST"'},
                url: {$map: `\`${KONG_ROOT}/consumers/\${params.id}/oauth2\``}
              }
            },
            Component: {$component: 'KongForm'}
          }
        }
      }
    ]
  },
  paths: [
      '/kong/consumer/:id/oauth2/:name',
      '/kong/consumer/:id/oauth2'
    ]
};

export default layout;
