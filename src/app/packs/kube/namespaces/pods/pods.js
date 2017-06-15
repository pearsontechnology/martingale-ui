// eslint-disable-next-line
const KUBE_ROOT='${getQueryParam("apiBase", "/api/kube")}';

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
            url: {$map: `\`${KUBE_ROOT}/api/v1/namespaces/\${params.name}/pods\``},
            root: 'items',
            mapper: {$mapper: `props.map((pod)=>{
              const running = getObjectValue('status.containerStatuses[0].state.running', pod);
              return {
                name: getObjectValue('metadata.name', pod),
                node: getObjectValue('spec.nodeName', pod),
                namespace: getObjectValue('metadata.namespace', pod),
                created: getObjectValue('metadata.creationTimestamp', pod),
                phase: getObjectValue('status.phase', pod),
                status: running?getObjectValue('status.phase', pod):getObjectValue('status.containerStatuses[0].state.waiting.reason', pod, 'unknown'),
                restartCount: getObjectValue('status.containerStatuses[0].restartCount', pod, '0'),
                podIp: getObjectValue('status.podIP', pod),
                started: getObjectValue('startedAt', running)
              };
            })`},
            refresh: 5000
          }
        },
        Component: {$component: 'ActionTable'},
        props: {
          actions: [
            {
              link: {$mapper: `\`/kube/namespace/\${params.name}/pod/\${props.name}/logs\${extractQueryParams(['apiBase'])}\``},
              caption: 'Logs',
              btnStyle: 'primary',
              items: [
                {
                  link: {$mapper: `\`/kube/namespace/\${params.name}/pod/\${props.name}\${extractQueryParams(['apiBase'])}\``},
                  caption: 'Details',
                  btnStyle: 'default'
                }
              ]
            },
            {
              delete: {$mapper: `\`${KUBE_ROOT}/api/v1/namespaces/\${params.name}/pods/\${props.name}\${extractQueryParams(['apiBase'])}\``},
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
