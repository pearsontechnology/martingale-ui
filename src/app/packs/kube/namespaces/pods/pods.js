const KUBE_ROOT="/api/kube/api";

const layout = {
  $type: 'HeaderPage',
  props: {
    title: {$map: `\`\${params.name} - Pod's\``}
  },
  children: {
    $type: 'Panel',
    children: {
      $type: 'Provider',
      props: {
        provide: {
          data: {
            url: {$map: `\`${KUBE_ROOT}/v1/namespaces/\${params.name}/pods\``},
            root: 'items',
            mapper: {$mapper: `props.map((pod)=>{
              const running = getObjectValue('status.containerStatuses[0].state.running', pod);
              return {
                name: getObjectValue('metadata.name', pod),
                namespace: getObjectValue('metadata.namespace', pod),
                created: getObjectValue('metadata.creationTimestamp', pod),
                phase: getObjectValue('status.phase', pod),
                status: running?getObjectValue('status.phase', pod):getObjectValue('status.containerStatuses[0].state.waiting.reason', pod, 'unknown'),
                podIp: getObjectValue('status.podIP', pod),
                started: getObjectValue('startedAt', running)
              };
            })`}
          }
        },
        Component: {$component: 'ActionTable'},
        props: {
          actions: [
            {
              link: {$mapper: `\`/kube/namespace/\${params.name}/pod/\${props.name}/logs\``},
              caption: 'Logs',
              btnStyle: 'primary'
            },
            {
              link: {$mapper: `\`/kube/namespace/\${params.name}/pod/\${props.name}\``},
              caption: 'Details',
              btnStyle: 'default'
            },
            {
              delete: {$mapper: `\`${KUBE_ROOT}/v1/namespaces/\${params.name}/pods/\${props.name}\``},
              caption: 'Refresh',
              message: `Are you sure you want to refresh \${name}?`
            }
          ]
        }
      }
    }
  },
  path: '/kube/namespace/:name/pods'
};

export default layout;
