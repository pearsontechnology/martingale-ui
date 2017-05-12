import Components from '../../../components';

import {
  pageSchemaToReact
} from 'martingale-page-schema';

const KUBE_ROOT="/api/kube/api";

const Page = (props)=>pageSchemaToReact({
  layout: {
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
    }
  },
  components: Components,
  props
});

Page.path = '/namespace/:name/pod/:id/logs';
Page.icon = 'Pods';
Page.caption = 'Pod Logs';

export default Page;
