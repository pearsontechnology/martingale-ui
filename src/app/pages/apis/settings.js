const KONG_ROOT="/api/kong";

const schema = {
  fields: {
    name: {type: 'string', default: '', required: true},
    hosts: {type: 'array'},
    uris: {type: 'array'},
    methods: {type: 'array'},
    upstream_url: {type: 'string', default: '', required: true},
    https_only: {type: 'boolean', default: false},
    strip_uri: {type: 'boolean', default: false},

    retries: {type: 'number', default: 5, required: true},
    http_if_terminated: {type: 'boolean', default: true},
    preserve_host: {type: 'boolean', default: false},
    upstream_connect_timeout: {type: 'number', default: 60000, required: true},
    upstream_send_timeout: {type: 'number', default: 60000, required: true},
    upstream_read_timeout: {type: 'number', default: 60000, required: true}
  }
};

const layout = {
  $type: 'div',
  children: {
    $type: 'HeaderPage',
    props: {
      title: {$map: `\`\${params.name} Settings\``}
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
                url: {$map: `params.name?\`${KONG_ROOT}/apis/\${params.name}\`:''`}
              }
            },
            props: {
              schema,
              successUrl: '/apis',
              submitTo: {
                method: {$map: 'params.name?"PUT":"POST"'},//'POST',
                url: `${KONG_ROOT}/apis`
              }
            },
            Component: {$component: 'KongForm'}
          }
        }
      }
    ]
  },
  paths: [
      '/api/:name',
      '/api'
    ]
};

export default layout;
