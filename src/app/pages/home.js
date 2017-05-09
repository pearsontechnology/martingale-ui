import Components from '../../components';

import {
  pageSchemaToReact
} from 'martingale-page-schema';

const Page = ()=>pageSchemaToReact({
  layout: {
    $type: 'div',
    children: [
      'This is the home page'
    ]
  },
  components: Components
});

Page.path = '/';

export default Page;
