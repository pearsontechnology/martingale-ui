import Components from '../../../components';

import {
  pageSchemaToReact
} from 'martingale-page-schema';

const KUBE_ROOT="/api/kube/api";

const Page = (props)=>pageSchemaToReact({
  layout: {
    $type: 'HeaderPage',
    props: {
      title: {$map: `\`\${params.name} - \${params.id} - Details\``}
    },
    children: {
      $type: 'Panel',
      children: {
        $type: 'Provider',
        props: {
          provide: {
            json: {
              url: {$map: `\`${KUBE_ROOT}/v1/namespaces/\${params.name}/pods/\${params.id}\``}
            }
          },
          Component: {$component: 'JsonView'}
        }
      }
    }
  },
  components: Components,
  props
});

Page.path = '/namespace/:name/pod/:id';
Page.icon = 'Pods';
Page.caption = 'Pod Details';

export default Page;
