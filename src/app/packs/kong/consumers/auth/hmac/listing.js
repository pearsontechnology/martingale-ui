const KONG_ROOT="/api/kong";
const TYPE='HMAC Auth Accounts';
// eslint-disable-next-line
const ENDPOINT='/consumers/${params.consumer}/hmac-auth';
const path='/kong/consumers/:consumer/hmac-auth-accounts';
const $mapper=`props.map((ds)=>{
  return {
    username: ds.username,
    created: new Date(ds.created_at),
    id: ds.id,
    consumer_id: ds.consumer_id
  };
})`;

const actions = [
  {
    link: {$mapper: `\`/kong/consumer/\${params.consumer}/hmac-auth/\${props.username}\``},
    caption: 'Edit',
    btnStyle: 'primary'
  },
  {
    caption: 'Delete',
    delete: `${KONG_ROOT}/consumers/\${consumer_id}/hmac-auth/\${id}`,
    message: `Are you sure you want to delete "\${username||custom_id}"?`
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
          to: {$mapper: '`/kong/consumer/${params.consumer}/hmac-auth`'}
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
