const KONG_ROOT="/api/kong";

/*
const schema = {
  fields: {
    name: {type: 'string', required: true},
    ssl_certificate_id: {type: 'string', required: true},
    //snis: {type: 'array'}
  }
};
*/

const schema = {
  type: "'object'",
  required: ["'name'"],
  properties: {
    name: {
      type: "'string'",
      title: "'Name'"
    },
    ssl_certificate_id: {
      type: "'string'",
      title: "'Certificate'",
      enum: 'props.map(p=>p.id)',
      enumNames: 'props.map(p=>p.cert)'
    }
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
                url: {$map: `params.name?\`${KONG_ROOT}/snis/\${params.name}\`:''`}
              },
              schema: {
                url: `${KONG_ROOT}/certificates`,
                mapper: {$mapper: schema}
              }
            },
            props: {
              //schema,
              successUrl: '/kong/snis',
              submitTo: {
                method: {$map: 'params.name?"PUT":"POST"'},//'POST',
                url: `${KONG_ROOT}/snis`
              }
            },
            Component: {$component: 'Form'}
          }
        }
      }
    ]
  },
  paths: [
      '/kong/sni/:name',
      '/kong/sni'
    ]
};

export default layout;
