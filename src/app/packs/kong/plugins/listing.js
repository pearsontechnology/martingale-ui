const KONG_ROOT="/api/kong";

const layout = {
  $type: 'div',
  children: {
    $type: 'HeaderPage',
    props: {
      title: 'Plugins'
    },
    children: {
      $type: 'Panel',
      props: {
        footer: {
          $type: 'Link',
          props: {
            caption: 'New',
            className: 'btn btn-primary',
            to: {$map: `\`/kong/plugin\``}
          }
        }
      },
      children: {
        $type: 'Provider',
        props: {
          mapper(data){
            if(data && Array.isArray(data.apis) && Array.isArray(data.data)){
              const apis = data.apis;
              const newData = data.data.map((row)=>{
                if(row.api_id){
                  const api = apis.find((api)=>api.id === row.api_id);
                  if(api){
                    return Object.assign({api: api.name||row.api_id}, row);
                  }
                }
                return row;
              });
              return Object.assign({}, data, {data: newData});
            }
            return data
          },
          provide: {
            apis: {
              url: `${KONG_ROOT}/apis`,
              root: 'data'
            },
            data: {
              url: `${KONG_ROOT}/plugins`,
              root: 'data',
              mapper(data, maps){
                return data;
              }
            }
          },
          Component: {$component: 'ActionTable'},
          props: {
            mapper: {
              $mapper: {
                'Name': 'props.name',
                'API': 'props.api',
                'Created At': 'new Date(props.created_at)',
                'Enabled': 'props.enabled'
              }
            },
            actions: [
              {
                caption: 'Edit',
                link: {$mapper: `\`/kong/plugin/\${props.name}/\${props.id}\``},
                btnStyle: 'primary'
              },
              {
                caption: 'Delete',
                delete: {$mapper: `\`${KONG_ROOT}/plugins/\${props.id}\``},
                message: `Are you sure you want to delete "\${name}"?`
              }
            ]
          }
        }
      }
    }
  },
  icon: 'Plugin',
  sideNav: true,
  caption: 'Plugins',
  path: '/kong/plugins'
};

export default layout;
