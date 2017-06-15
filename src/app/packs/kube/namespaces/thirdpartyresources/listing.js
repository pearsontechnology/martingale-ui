// eslint-disable-next-line
const KUBE_ROOT='${getQueryParam("apiBase", "/api/kube")}';
const TYPE='Third Party Resources';
// eslint-disable-next-line
const ENDPOINT='/apis/extensions/v1beta1/namespaces/${params.namespace}/thirdpartyresources';
const path='/kube/namespace/:namespace/thirdpartyresources';
const $mapper=`props.map((tpr)=>{
  const md = tpr.metadata;
  return {
    name: md.name,
    namespace: md.namespace,
    created: md.creationTimestamp,
    labels: md.labels,
    description: tpr.description
  };
})`;

const actions = [
  {
    link: {$mapper: `\`/kube/namespace/\${params.namespace}/thirdpartyresource/\${props.name}\${extractQueryParams(['apiBase'])}\``},
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
              mapper: {$mapper},
              refresh: 5000
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
