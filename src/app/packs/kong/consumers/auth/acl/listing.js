const KONG_ROOT="/api/kong";
const TYPE='ACL\'s';
// eslint-disable-next-line
const ENDPOINT='/consumers/${params.consumer}/acls';
const path='/kong/consumers/:consumer/acl-auth-accounts';
const $mapper=`props.map((ds)=>{
  return {
    group: ds.group,
    created: new Date(ds.created_at),
    id: ds.id,
    consumer_id: ds.consumer_id
  };
})`;

const actions = [
  {
    caption: 'Delete',
    delete: `${KONG_ROOT}/consumers/\${consumer_id}/acls/\${id}`,
    message: `Are you sure you want to delete "\${group||id}"?`
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
          to: {$mapper: '`/kong/consumer/${params.consumer}/acl-auth`'}
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
