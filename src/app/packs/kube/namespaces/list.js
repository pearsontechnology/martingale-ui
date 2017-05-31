const KUBE_ROOT="/api/kube/api";
const actions = [
  {
    link: `/kube/namespace/\${name}/pods`,
    caption: 'Pods',
    btnStyle: 'primary'
  },
  {
    link: `/kube/namespace/\${name}/ingresses`,
    caption: 'Ingresses',
    btnStyle: 'default'
  },
  {
    link: `/kube/namespace/\${name}/secrets`,
    caption: 'Secrets',
    btnStyle: 'default'
  },
  {
    link: `/kube/namespace/\${name}/thirdpartyresources`,
    caption: 'Third Party Resources',
    btnStyle: 'default'
  },
  {
    link: `/kube/namespace/\${name}/replicasets`,
    caption: 'Replicasets',
    btnStyle: 'default'
  },
  {
    link: `/kube/namespace/\${name}/daemonsets`,
    caption: 'Daemonsets',
    btnStyle: 'default'
  },
  {
    link: `/kube/namespace/\${name}/resourcequotas`,
    caption: 'Resource Quotas',
    btnStyle: 'default'
  },
  {
    link: `/kube/namespace/\${name}/deployments`,
    caption: 'Deployments',
    btnStyle: 'default'
  }
];

const layout = {
  $type: 'HeaderPage',
  props: {
    title: 'Kubernetes Namespaces'
  },
  children: {
    $type: 'Panel',
    children: {
      $type: 'Provider',
      props: {
        provide: {
          data: {
            url: `${KUBE_ROOT}/v1/namespaces`,
            root: 'items',
            mapper: {$mapper: `props
                .map(r=>{
                  const m = r.metadata;
                  return {
                    name: m.name,
                    systemTimeCreated: new Date(Date.parse(m.creationTimestamp)).toISOString(),
                    localTimeCreated: new Date(Date.parse(m.creationTimestamp)),
                  };
                })`}
          }
        },
        Component: {$component: 'ActionTable'},
        props: {
          actions
        }
      }
    }
  },
  path: '/kube/namespaces/',
  icon: 'Cluster',
  sideNav: true,
  caption: 'Namespaces'
};

export default layout;
