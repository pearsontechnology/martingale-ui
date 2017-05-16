const KONG_ROOT="/api/kong";

const layout = {
  $type: 'HeaderPage',
  props: {
    title: 'Kong Cluster'
  },
  children: {
    $type: 'Panel',
    children: {
      $type: 'Provider',
      props: {
        provide: {
          data: {
            url: `${KONG_ROOT}/cluster`,
            root: 'data'
          }
        },
        Component: {$component: 'Table'}
      }
    }
  },
  path: '/kong/cluster',
  icon: 'Cluster',
  sideNav: true,
  caption: 'Cluster'
};

export default layout;
