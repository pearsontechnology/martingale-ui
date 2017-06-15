// eslint-disable-next-line
const KUBE_ROOT='${getQueryParam("apiBase", "/api/kube")}';
// eslint-disable-next-line
const ENDPOINT='/api/v1/namespaces/${params.namespace}/services/${params.name}';
const path = '/kube/namespace/:namespace/service/:name';

const layout = {
  $type: 'HeaderPage',
  props: {
    title: {$map: `\`\${params.namespace} - \${params.name}\``}
  },
  children: {
    $type: 'Panel',
    props: {
      inset: true
    },
    children: {
      $type: 'Provider',
      props: {
        provide: {
          json: {
            url: {$map: `\`${KUBE_ROOT}${ENDPOINT}\``},
          }
        },
        Component: {$component: 'JsonView'},
        props: {
          pretty: true
        }
      }
    }
  },
  path
};

export default layout;
