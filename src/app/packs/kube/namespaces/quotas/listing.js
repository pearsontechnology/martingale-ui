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
    persistentVolumeClaimsLimit: spec.hard.persistentvolumeclaims,
    podsLimit: spec.hard.pods,
    replicationControllersLimit: spec.hard.replicationcontrollers,
    secretsLimit: spec.hard.secrets,
    servicesLimit: spec.hard.services,
    persistentVolumeClaimsUsed: status.used.persistentvolumeclaims,
    podsUsed: status.used.pods,
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
