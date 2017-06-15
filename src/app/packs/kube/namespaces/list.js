// eslint-disable-next-line
const KUBE_ROOT='${getQueryParam("apiBase", "/api/kube")}/api';

const actions = [
  {
    link: `/kube/namespace/\${name}/pods\${extractQueryParams(['apiBase'])}`,
    caption: 'Pods',
    btnStyle: 'primary',
    items: [
      {
        link: `/kube/namespace/\${name}/ingresses\${extractQueryParams(['apiBase'])}`,
        caption: 'Ingresses'
      },
      {
        link: `/kube/namespace/\${name}/secrets\${extractQueryParams(['apiBase'])}`,
        caption: 'Secrets'
      },
      {
        link: `/kube/namespace/\${name}/thirdpartyresources\${extractQueryParams(['apiBase'])}`,
        caption: 'Third Party Resources'
      },
      {
        link: `/kube/namespace/\${name}/replicasets\${extractQueryParams(['apiBase'])}`,
        caption: 'Replicasets'
      },
      {
        link: `/kube/namespace/\${name}/daemonsets\${extractQueryParams(['apiBase'])}`,
        caption: 'Daemonsets'
      },
      {
        link: `/kube/namespace/\${name}/resourcequotas\${extractQueryParams(['apiBase'])}`,
        caption: 'Resource Quotas'
      },
      {
        link: `/kube/namespace/\${name}/deployments\${extractQueryParams(['apiBase'])}`,
        caption: 'Deployments'
      },
      {
        link: `/kube/namespace/\${name}/services\${extractQueryParams(['apiBase'])}`,
        caption: 'Services'
      }
    ]
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
            url: {$map: `\`${KUBE_ROOT}/v1/namespaces\``},
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
