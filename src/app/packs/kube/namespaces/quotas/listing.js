const KUBE_ROOT="/api/kube";
const TYPE='Resource Quotas';
// eslint-disable-next-line
const ENDPOINT='/api/v1/namespaces/${params.namespace}/resourcequotas';
const path='/kube/namespace/:namespace/resourcequotas';
const $mapper=`props.map((ds)=>{
  const md = ds.metadata;
  const spec = ds.spec;
  const status = ds.status;
  return {
    name: md.name,
    namespace: md.namespace,
    created: md.creationTimestamp,
    persistentVolumeClaims: spec.hard.persistentvolumeclaims,
    pods: spec.hard.pods,
    replicationControllers: spec.hard.replicationcontrollers,
    secrets: spec.hard.secrets,
    services: spec.hard.services,
    persistentVolumeClaimsUsed: status.used.persistentvolumeclaims,
    pods: status.used.podsUsed,
    replicationControllersUsed: status.used.replicationcontrollers,
    secretsUsed: status.used.secrets,
    servicesUsed: status.used.services,
  };
})`;

const actions = [
  {
    link: {$mapper: `\`/kube/namespace/\${params.namespace}/resourcequotas/\${props.name}\``},
    caption: 'Details',
    btnStyle: 'primary'
  }
];

const layout = {
  $type: 'HeaderPage',
  props: {
    title: {$map: `\`\${params.namespace} - ${TYPE}\``}
  },
  children: {
    $type: 'Panel',
    children: {
        $type: 'Provider',
        props: {
          provide: {
            data: {
              url: {$map: `\`${KUBE_ROOT}${ENDPOINT}\``},
              root: 'items',
              mapper: {$mapper}
            }
          },
          Component: {$component: 'ActionTable'},
          props: {
            actions
          }
        }
      }
  },
  path
};

export default layout;
