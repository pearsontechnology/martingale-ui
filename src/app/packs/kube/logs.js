const KUBE_ROOT="/api/kube/api";

const layout = {
  $type: 'HeaderPage',
  props: {
    title: {$map: `\`\${params.name} - \${params.id} - Logs\``}
  },
  children: {
    $type: 'Panel',
    children: {
      $type: 'Provider',
      props: {
        provide: {
          data: {
            url: {$map: `\`${KUBE_ROOT}/v1/namespaces/\${params.name}/pods/\${params.id}/log?sinceSeconds=${5*60}\``},
            mapper: {$mapper: `props.split("\\n").map((l)=>{
              try{
                return JSON.parse(l);
              }catch(e){
                return l;
              }
            })`}
          }
        },
        Component: {$component: 'Table'}
      }
    }
  },
  path: '/kube/namespace/:name/pod/:id/logs'
};

export default layout;
