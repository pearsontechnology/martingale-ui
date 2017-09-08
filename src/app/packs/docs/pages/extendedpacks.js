const documentContents = `
Coming Soon...
`;

export default {
  $type: 'HeaderPage',
  props: {
    title: 'Martingale - Extended Packs'
  },
  children: {
    $type: 'MarkDown',
    children: documentContents
  },
  path: '/docs/extendedpacks'
};
