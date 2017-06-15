// eslint-disable-next-line
const KUBE_ROOT='${getQueryParam("apiBase", "/api/kube")}';
const TYPE='Replicasets';
// eslint-disable-next-line
const ENDPOINT='/apis/extensions/v1beta1/namespaces/${params.namespace}/replicasets';
const path='/kube/namespace/:namespace/replicasets';
const $mapper=`props.map((ds)=>{
  const md = ds.metadata;
  return {
    name: md.name,
    namespace: md.namespace,
    created: md.creationTimestamp,
    labels: md.labels
  };
})`;

const actions = [
  {
    link: {$mapper: `\`/kube/namespace/\${params.namespace}/replicaset/\${props.name}\${extractQueryParams(['apiBase'])}\``},
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
