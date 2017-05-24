const KUBE_ROOT="/api/kube/api";

const layout = {
  $type: 'HeaderPage',
  props: {
    title: {$map: `\`\${params.name} - \${params.id} - Details\``}
  },
  children: {
    $type: 'Panel',
    children: {
      $type: 'Provider',
      props: {
        provide: {
          json: {
            url: {$map: `\`${KUBE_ROOT}/v1/namespaces/\${params.name}/pods/\${params.id}\``}
          }
        },
        Component: {$component: 'JsonView'},
        props: {
          pretty: true
        }
      }
    }
  },
  path: '/kube/namespace/:name/pod/:id'
};

export default layout;
