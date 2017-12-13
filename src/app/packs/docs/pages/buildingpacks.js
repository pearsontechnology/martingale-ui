const documentContents = `Coming Soon...
`;

export default {
  $type: 'HeaderPage',
  props: {
    title: 'Martingale - Building Packs'
  },
  children: {
    $type: 'MarkDown',
    children: documentContents
  },
  path: '/docs/buildingpacks'
};