// eslint-disable-next-line
const KUBE_ROOT='${getQueryParam("apiBase", "/api/kube")}';
const TYPE='Ingresses';
// eslint-disable-next-line
const ENDPOINT='/apis/extensions/v1beta1/namespaces/${params.name}/ingresses';
const path='/kube/namespace/:name/ingresses';
const $mapper=`props.map((pod)=>{
  const hosts = getObjectValue('spec.rules', pod);
  return {
    name: getObjectValue('metadata.name', pod),
    namespace: getObjectValue('metadata.namespace', pod),
    created: getObjectValue('metadata.creationTimestamp', pod),
    hosts
  };
})`;
const actions = [
  {
    link: {$mapper: `\`/kube/namespace/\${params.name}/ingress/\${props.name}\${extractQueryParams(['apiBase'])}\``},
    caption: 'Details',
    btnStyle: 'primary'
  }
];

const layout = {
  $type: 'HeaderPage',
  props: {
    title: {$map: `\`\${params.name} - ${TYPE}\``}
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
