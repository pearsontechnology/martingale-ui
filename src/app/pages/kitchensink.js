import Components from '../../components';

const {
  TForm
} = Components;

import {
  pageSchemaToReact
} from '../../../../page-schema';

const tableData = [
    {name: 'Test User', status: 'Active', level: 'Admin'},
    {name: 'Another User', status: 'Disabled', level: 'Read'}
  ];

const Page = ()=>pageSchemaToReact({
  layout: {
    type: 'HeaderPage',
    props: {
      title: 'Kitchen Sink'
    },
    children: [
      {
        type: 'Row',
        children: [
          {
            type: 'Col',
            props: {
              md: 4
            },
            children: [
              {
                type: 'Alert',
                props: {
                  type: 'info'
                },
                children: 'An info Alert'
              },
              {
                type: 'Alert',
                props: {
                  type: 'success'
                },
                children: 'A success Alert'
              },
              {
                type: 'Alert',
                props: {
                  type: 'warning'
                },
                children: 'A warning Alert'
              },
              {
                type: 'Alert',
                props: {
                  type: 'danger'
                },
                children: 'A danger Alert'
              },
            ]
          },
          {
            type: 'Col',
            props: {
              md: 4
            },
            children: [
              {
                type: 'Alert',
                props: {
                  dismissable: true,
                  type: 'info'
                },
                children: 'An dismissable info Alert'
              },
              {
                type: 'Alert',
                props: {
                  dismissable: true,
                  type: 'success'
                },
                children: 'A dismissable success Alert'
              },
              {
                type: 'Alert',
                props: {
                  dismissable: true,
                  type: 'warning'
                },
                children: 'A dismissable warning Alert'
              },
              {
                type: 'Alert',
                props: {
                  dismissable: true,
                  type: 'danger'
                },
                children: 'A dismissable danger Alert'
              },
            ]
          },
          {
            type: 'Col',
            props: {
              md: 4
            },
            children: [
              {
                type: 'Alert',
                props: {
                  dismissAfter: 5000,
                  type: 'info'
                },
                children: 'An info Alert, dismisses after 5 seconds'
              },
              {
                type: 'Alert',
                props: {
                  dismissAfter: 10000,
                  type: 'success'
                },
                children: 'A success Alert, dismisses after 10 seconds'
              },
              {
                type: 'Alert',
                props: {
                  dismissAfter: 15000,
                  type: 'warning'
                },
                children: 'A warning Alert, dismisses after 15 seconds'
              },
              {
                type: 'Alert',
                props: {
                  dismissAfter: 20000,
                  type: 'danger'
                },
                children: 'A danger Alert, dismisses after 20 seconds'
              },
            ]
          }
        ]
      },
      {
        type: 'Panel',
        children: {
          type: 'PanelInset',
          children: [
            {
              type: 'p',
              children: [
                {
                  type: 'IconAlert',
                },
                {
                  type: 'a',
                  props: {
                    className: 'alert-link',
                    target: '_blank',
                    href: 'https://gorangajic.github.io/react-icons/'
                  },
                  children: 'https://gorangajic.github.io/react-icons/'
                }
              ]
            },
            {
              type: 'p',
              children: [
                {
                  type: 'span',
                  children: 'Charts from '
                },
                {
                  type: 'a',
                  props: {
                    className: 'alert-link',
                    target: '_blank',
                    href: 'http://recharts.org/'
                  },
                  children: 'http://recharts.org/'
                }
              ]
            },
            {
              type: 'p',
              children: [
                {
                  type: 'span',
                  children: 'Design started from '
                },
                {
                  type: 'a',
                  props: {
                    className: 'alert-link',
                    target: '_blank',
                    href: 'https://startbootstrap.com/template-overviews/sb-admin-2/'
                  },
                  children: 'https://startbootstrap.com/template-overviews/sb-admin-2/'
                }
              ]
            }
          ]
        }
      },
      {
        type: 'Panel',
        props: {
          inset: false,
          title: 'Panel - Title',
        },
        children: 'This is a Panel, with inset false'
      },
      {
        type: 'Panel',
        props: {
          inset: true,
          title: 'Inset Panel - Title',
          footer: 'Panel - Footer'
        },
        children: 'This is a Panel, with inset true'
      },
      {
        type: 'Panel',
        props: {
          inset: true,
          title: 'Dialog Buttons',
        },
        children: [
          {
            type: 'ConfirmButton',
            props: {
              btnStyle: 'danger',
              caption: 'Confirm Button',
              dialogTitle: 'Are you sure?',
              dialogMessage: 'Are you sure you want to do something?',
              onYes(dialog){console.log('User clicked yes'); dialog.hide()},
              onNo(dialog){console.log('User clicked no'); dialog.hide()}
            }
          },
          {
            type: 'InfoButton',
            props: {
              btnStyle: 'primary',
              caption: 'Info Button',
              dialogTitle: 'Something Interesting',
              dialogMessage: 'Some information about something interesting.',
              onOk(dialog){console.log('User clicked ok'); dialog.hide()},
            }
          }
        ]
      },
      {
        type: 'PageHeader',
        props: {
          title: 'Count Panels'
        }
      },
      {
        type: 'Row',
        children: [
          {
            type: 'CountPanel',
            props: {
              color: 'primary',
              count: 26,
              title: 'Primary',
              Icon: {$component: 'IconComment'},
              link: '/kitchensink'
            }
          },
          {
            type: 'CountPanel',
            props: {
              color: 'green',
              count: 35,
              title: 'Green',
              Icon: {$component: 'IconTask'},
              link: '/kitchensink'
            }
          },
          {
            type: 'CountPanel',
            props: {
              color: 'yellow',
              count: 125,
              title: 'Yellow',
              Icon: {$component: 'IconOrder'},
              link: '/kitchensink'
            }
          },
          {
            type: 'CountPanel',
            props: {
              color: 'red',
              count: 15,
              title: 'Red',
              Icon: {$component: 'IconSupport'},
              link: '/kitchensink'
            }
          },
        ]
      },
      {
        type: 'PageHeader',
        props: {
          title: 'Charts and Graphs'
        }
      },
      {
        type: 'Panel',
        props: {
          inset: true
        },
        children: 'Not available yet'
      },
      {
        type: 'PageHeader',
        props: {
          title: 'Tables'
        }
      },
      {
        type: 'Panel',
        props: {
          title: 'Normal Table'
        },
        children: {
          type: 'Table',
          props: {
            data: tableData
          }
        }
      },
      {
        type: 'Panel',
        props: {
          title: 'Action Table'
        },
        children: {
          type: 'ActionTable',
          props: {
            data: tableData,
            actions: [
              {
                type: 'ConfirmButton',
                props: {
                  btnStyle: 'danger',
                  caption: 'Confirm Button',
                  dialogTitle: 'Are you sure?',
                  dialogMessage: 'Are you sure you want to do something?',
                  onYes(dialog){console.log('User clicked yes'); dialog.hide()},
                  onNo(dialog){console.log('User clicked no'); dialog.hide()}
                }
              },
              {
                type: 'InfoButton',
                props: {
                  btnStyle: 'primary',
                  caption: 'Info Button',
                  dialogTitle: 'Something Interesting',
                  dialogMessage: 'Some information about something interesting.',
                  onOk(dialog){console.log('User clicked ok'); dialog.hide()},
                }
              }
            ]
          }
        }
      },
      {
        type: 'PageHeader',
        props: {
          title: 'ListGroup'
        }
      },
      {
        type: 'Row',
        children: [
          {
            type: 'Panel',
            props: {
              lg: 4,
              sm: 12,
            },
            children: {
              type: 'ListGroup',
              children: [
                {
                  type: 'ListGroupItem',
                  props: {
                    badge: 'Just now'
                  },
                  children: [
                    {type: 'IconCalendar'},
                    'Calendar update'
                  ]
                },
                {
                  type: 'ListGroupItem',
                  props: {
                    badge: '4 minutes ago'
                  },
                  children: [
                    {type: 'IconNote'},
                    'New comment'
                  ]
                },
                {
                  type: 'ListGroupItem',
                  props: {
                    badge: '23 minutes ago'
                  },
                  children: [
                    {type: 'IconOrder'},
                    'Order 321 shipped'
                  ]
                },
                {
                  type: 'ListGroupItem',
                  props: {
                    badge: '46 minutes ago'
                  },
                  children: [
                    {type: 'IconBilling'},
                    'Invoice 321 paid'
                  ]
                },
              ]
            }
          }
        ]
      },
      {
        type: 'PageHeader',
        props: {
          title: 'Forms'
        }
      },
      {
        type: 'Row',
        children: [
          {
            type: 'Panel',
            props: {
              lg: 6,
              sm: 12,
              inset: true,
              title: 'Vertical Form'
            },
            children: {
              type: 'Form',
              props: {
                schema: TForm.struct({
                  name: TForm.String,
                  age: TForm.maybe(TForm.Number)
                })
              }
            }
          },
          {
            type: 'Panel',
            props: {
              lg: 6,
              sm: 12,
              inset: true,
              title: 'Horizontal Form'
            },
            children: {
              type: 'Form',
              props: {
                options: {
                  config: {
                    horizontal: {
                      md: [3, 9],
                      sm: [6, 6]
                    }
                  }
                },
                schema: TForm.struct({
                  name: TForm.String,
                  age: TForm.maybe(TForm.Number)
                })
              }
            }
          }
        ]
      },
      {
        type: 'Row',
        children: [
          {
            type: 'Panel',
            props: {
              lg: 6,
              sm: 12,
              inset: true,
              title: 'Vertical Kong Schema Form'
            },
            children: {
              type: 'KongForm',
              props: {
                schema: {
                  fields: {
                    requiredString: { type: "string", default: 'http://localhost:8001', required: true },
                    optionalMultilineString: { type: "string", multiline: true }
                  }
                }
              }
            }
          },
          {
            type: 'Panel',
            props: {
              lg: 6,
              sm: 12,
              inset: true,
              title: 'Horizontal Kong Schema Form'
            },
            children: {
              type: 'KongForm',
              props: {
                options: {
                  config: {
                    horizontal: {
                      md: [3, 9],
                      sm: [6, 6]
                    }
                  }
                },
                schema: {
                  fields: {
                    requiredString: { type: "string", default: 'http://localhost:8001', required: true },
                    optionalMultilineString: { type: "string", multiline: true }
                  }
                }
              }
            }
          }
        ]
      }
    ],

  }, components: Components});

Page.path = '/kitchensink';

export default Page;
