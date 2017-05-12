import Components from '../../../components';

import {
  pageSchemaToReact
} from 'martingale-page-schema';

const KUBE_ROOT="/api/kube/api";

const Page = (props)=>pageSchemaToReact({
  layout: {
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
                link: {$mapper: `\`/namespace/\${params.name}/pod/\${props.name}/logs\``},
                caption: 'Logs',
                btnStyle: 'primary'
              },
              {
                link: {$mapper: `\`/namespace/\${params.name}/pod/\${props.name}\``},
                caption: 'Details',
                btnStyle: 'default'
              },
              {
                delete: {$mapper: `\`${KUBE_ROOT}/v1/namespaces/\${params.name}/pods/\${props.name}\``},
                caption: 'Restart',
                message: `Are you sure you want to restart \${name}?`
              }
            ]
          }
        }
      }
    }
  },
  components: Components,
  props
});

Page.path = '/namespace/:name/pods';
Page.icon = 'Pods';
Page.caption = 'Pods\'s';

export default Page;
