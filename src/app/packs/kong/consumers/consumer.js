const KONG_ROOT="/api/kong";

const schema = {
  fields: {
    username: {type: 'string'},
    custom_id: {type: 'string'}
  }
};

const layout = {
  $type: 'div',
  children: {
    $type: 'HeaderPage',
    props: {
      title: 'Consumer'
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
                url: {$map: `params.id?\`${KONG_ROOT}/consumers/\${params.id}\`:''`}
              }
            },
            props: {
              schema,
              successUrl: '/kong/consumers',
              submitTo: {
                method: {$map: 'params.id?"PUT":"POST"'},//'POST',
                url: `${KONG_ROOT}/consumers`
              }
            },
            Component: {$component: 'KongForm'}
          }
        }
      }
    ]
  },
  paths: [
      '/kong/consumer/:id',
      '/kong/consumer'
    ]
};

export default layout;
