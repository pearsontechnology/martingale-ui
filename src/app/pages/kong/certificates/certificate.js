const KONG_ROOT="/api/kong";

const schema = {
  fields: {
    cert: {type: 'string', required: true},
    key: {type: 'string', required: true},
    //snis: {type: 'array'}
  }
};

const layout = {
  $type: 'div',
  children: {
    $type: 'HeaderPage',
    props: {
      title: 'Certificate'
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
                url: {$map: `params.id?\`${KONG_ROOT}/certificates/\${params.id}\`:''`}
              }
            },
            props: {
              schema,
              successUrl: '/kong/certificates',
              submitTo: {
                method: {$map: 'params.id?"PUT":"POST"'},//'POST',
                url: `${KONG_ROOT}/certificates`
              }
            },
            Component: {$component: 'KongForm'}
          }
        }
      }
    ]
  },
  paths: [
      '/kong/certificate/:id',
      '/kong/certificate'
    ]
};

export default layout;
