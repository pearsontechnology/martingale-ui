const KUBE_ROOT="/api/kube/api";

const layout = {
  $type: 'div',
  children: {
    $type: 'Page',
    children: [
      {
        $type: 'PageHeader',
        props: {
          title: 'Kubernetes Namespaces'
        }
      },
      {
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
              actions: {
                link: `/kube/namespace/\${name}/pods`,
                caption: 'View Pods',
                btnStyle: 'primary'
              }
            }
          }
        }
      }
    ]
  },
  path: '/kube/',
  icon: 'Dashboard',
  sideNav: true,
  caption: 'Kube Dashboard',
  isDashboard: true
};

export default layout;
