const KONG_ROOT="/api/kong";

const schema = {
  fields: {
    group: {type: 'string'}
  }
};

const layout = {
  $type: 'div',
  children: {
    $type: 'HeaderPage',
    props: {
      title: {$map: `params.name?\`\${params.id} - ACL's\`:\`\${params.id} - ACL's\``},
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
                url: {$map: `params.name?\`${KONG_ROOT}/consumers/\${params.id}/acls/\${params.name}\`:''`},
                mapper: {$mapper: '{group: props.group, id: props.id, consumer_id: props.consumer_id, created_at: props.created_at}'}
              }
            },
            props: {
              schema,
              // eslint-disable-next-line
              successUrl: {$map: '`/kong/consumers/${params.id}/acl-auth-accounts`'},
              submitTo: {
                method: {$map: 'params.name?"PUT":"POST"'},
                url: {$map: `\`${KONG_ROOT}/consumers/\${params.id}/acls\``}
              }
            },
            Component: {$component: 'KongForm'}
          }
        }
      }
    ]
  },
  paths: [
      '/kong/consumer/:id/acl-auth/:name',
      '/kong/consumer/:id/acl-auth'
    ]
};

export default layout;
