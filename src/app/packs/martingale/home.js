const changelog = [
  {
    version: '0.1.1',
    changes: [
      'Added changelog',
      'Upgrade to react-scripts 1.0.7',
      'Replace standard HTML Tables with react-table',
      'Switch from standalone screens to screen packs',
      'Easy install of local development environment'
    ]
  }
];

const outstandingTasks = [
  'Settings page',
  'Multiple "instances" of packs each with own configuration',
  'Customization of pack captions in sidebar',
  'Full pack isolation, allow duplicate names without collision',
  'Remote pack loading',
  'Isolate existing packs',
  'Ability to utilize credential groups for pack loading - This might not actually belong in Martingale proper',
  'Pack scaffold/designer/template/??? - Some easy way to define/create a new pack'
];

const makeChangelogItem = (entry)=>{
  return [
    {
      $type: 'dt',
      children: `v${entry.version}`
    },
    {
      $type: 'dd',
      children: {
        $type: 'ul',
        children: entry.changes.map((change)=>{return {$type: 'li', children: change}})
      }
    }
  ];
};

const layout = {
  "$type": "HeaderPage",
  "props": {
    "title": `Martingale v${process.env.REACT_APP_VERSION}`
  },
  "children": [
    {
      "$type": "Panel",
      "props": {
        "inset": true
      },
      "children": [
        {
          "$type": "p",
          "children": "Welcome to Martingale.  Martingale is a generic dashboarding/management platform built in Rect on top of a bring your own API Gateway mentality."
        },
        {
          "$type": "p",
          "children": "What this means is that there is no API, server, or backend for Martingale.  You setup a static asset delivery for Martingale (typically a webserver), setup the API's in the API Gateway of your choice, and provide Martingale access to those API's.  From there its just install/create view packs and watch Martingale provide the UI."
        }
      ]
    },
    {
      $type: 'Panel',
      props: {
        inset: true,
        title: 'Outstanding Tasks'
      },
      children: [
        {
          $type: 'ul',
          children: outstandingTasks.map((issue)=>{return {$type: 'li', children: issue}})
        }
      ]
    },
    {
      $type: 'Panel',
      props: {
        inset: true,
        title: 'Changelog'
      },
      children: [
        {
          $type: 'dl',
          children: changelog.map(makeChangelogItem)
        }
      ]
    }
  ],
  "path": "/",
  "icon": "Dashboard",
  "caption": "Home"
};

export default layout;
