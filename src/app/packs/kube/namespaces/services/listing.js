// eslint-disable-next-line
const KUBE_ROOT='${getQueryParam("apiBase", "/api/kube")}';
const TYPE='Services';
// eslint-disable-next-line
const ENDPOINT='/api/v1/namespaces/${params.namespace}/services';
const path='/kube/namespace/:namespace/services';
const $mapper=`props.map((pod)=>{
  return {
    name: getObjectValue('metadata.name', pod),
    namespace: getObjectValue('metadata.namespace', pod),
    created: getObjectValue('metadata.creationTimestamp', pod)
  };
})`;
const actions = [
  {
    link: {$mapper: `\`/kube/namespace/\${params.namespace}/service/\${props.name}\${extractQueryParams(['apiBase'])}\``},
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
