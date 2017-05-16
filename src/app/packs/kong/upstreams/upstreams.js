const KONG_ROOT="/api/kong";

const layout = {
  $type: 'HeaderPage',
  props: {
    title: 'Kong Upstreams'
  },
  children: {
    $type: 'Panel',
    children: {
      $type: 'Provider',
      props: {
        provide: {
          data: {
            url: `${KONG_ROOT}/upstreams`,
            root: 'data'
          }
        },
        Component: {$component: 'Table'}
      }
    }
  },
  path: '/kong/upstreams',
  icon: 'Upstreams',
  sideNav: true,
  caption: 'Upstreams'
};

export default layout;
