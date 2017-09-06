const children = `
## Try CommonMark

You can try CommonMark here.  This dingus is powered by
[commonmark.js](https://github.com/jgm/commonmark.js), the
JavaScript reference implementation.

1. item one
2. item two
   - sublist
   - sublist

\`\`\` javascript
function foo(){
  const bar = 'value';
  return bar + 3;
}
\`\`\`

\`\`\`
function foo(){
  const bar = 'value';
  return bar + 3;
}
\`\`\`

\`\`\` yaml
foo:
  bar:
    none: value
  type: yaml, ftw
\`\`\`

\`\`\`
foo:
  bar:
    none: value
  type: yaml, ftw
\`\`\`

`;

export default {
  $type: 'HeaderPage',
  props: {
    title: 'Martingale - Getting Started'
  },
  children: {
    $type: 'MarkDown',
    children
  },
  path: '/docs/gettingstarted'
};
