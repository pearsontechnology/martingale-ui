const KONG_ROOT="/api/kong";

const layout = {
  $type: 'HeaderPage',
  props: {
    title: 'Kong Targets'
  },
  children: {
    $type: 'Panel',
    children: {
      $type: 'Provider',
      props: {
        provide: {
          data: {
            url: {$map: `\`${KONG_ROOT}/upstreams/\${params.name}/targets\``},
            root: 'data'
          }
        },
        Component: {$component: 'Table'}
      }
    }
  },
  path: '/kong/upstream/:name/targets',
  icon: 'Targets',
  sideNav: true,
  caption: 'Targets'
};

export default layout;
