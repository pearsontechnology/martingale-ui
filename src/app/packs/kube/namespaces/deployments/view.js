const KUBE_ROOT="/api/kube";
// eslint-disable-next-line
const ENDPOINT='/apis/extensions/v1beta1/namespaces/${params.namespace}/deployments/${params.name}';
const path = '/kube/namespace/:namespace/deployment/:name';

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
