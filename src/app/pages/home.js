import Components from '../../components';

import {
  pageSchemaToReact
} from 'martingale-page-schema';

const Page = ()=>pageSchemaToReact({
  layout: {
    type: 'HeaderPage',
    props: {
      title: 'Dashboard'
    },
    children: {
      type: 'Panel',
      props: {
        inset: true,
        title: 'Title',
        footer: 'Footer'
      },
      children: 'Hello World!'
    }
  }, components: Components});

Page.path = '/';

export default Page;
