const KONG_ROOT="/api/kong";
const TYPE='OAuth2 Accounts';
// eslint-disable-next-line
const ENDPOINT='/consumers/${params.consumer}/oauth2';
const path='/kong/consumers/:consumer/oauth2-accounts';
const $mapper=`props.map((ds)=>{
  return {
    name: ds.name,
    created: new Date(ds.created_at),
    id: ds.id,
    consumer_id: ds.consumer_id
  };
})`;

const actions = [
  {
    link: {$mapper: `\`/kong/consumer/\${params.consumer}/oauth2/\${props.id}\``},
    caption: 'Edit',
    btnStyle: 'primary'
  },
  {
    caption: 'Delete',
    delete: `${KONG_ROOT}/consumers/\${consumer_id}/oauth2/\${id}`,
    message: `Are you sure you want to delete "\${name||custom_id}"?`
  }
];

const layout = {
  $type: 'HeaderPage',
  props: {
    title: {$map: `\`\${params.consumer} - ${TYPE}\``}
  },
  children: {
    $type: 'Panel',
    props: {
      footer: {
        $type: 'Link',
        props: {
          caption: 'New',
          className: 'btn btn-primary',
          to: {$mapper: '`/kong/consumer/${params.consumer}/oauth2`'}
        }
      }
    },
    children: {
        $type: 'Provider',
        props: {
          provide: {
            data: {
              url: {$map: `\`${KONG_ROOT}${ENDPOINT}\``},
              root: 'data',
              mapper: {$mapper}
            }
          },
          Component: {$component: 'ActionTable'},
          props: {
            actions
          }
        }
      }
  },
  path
};

export default layout;
