const tableData = [
    {name: 'Test User', status: 'Active', level: 'Admin'},
    {name: 'Another User', status: 'Disabled', level: 'Read'}
  ];

const PersonSchema = {
  "title": "A registration form",
  "description": "A simple form example.",
  "type": "object",
  "required": [
    "firstName",
    "lastName"
  ],
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First name"
    },
    "lastName": {
      "type": "string",
      "title": "Last name"
    },
    "age": {
      "type": "integer",
      "title": "Age"
    },
    "bio": {
      "type": "string",
      "title": "Bio"
    },
    "password": {
      "type": "string",
      "title": "Password",
      "minLength": 3
    }
  }
};

const KongTestSchema = {
  fields: {
    requiredString: { type: "string", default: 'http://localhost:8001', required: true },
    optionalMultilineString: { type: "string", multiline: true },
    booleanValue: {type: 'boolean', default: false},
    numberValue: {type: 'number'},
    stringArray: {type: 'array'},
    objectArray: {type: 'array', schema: {
        fields: {
          name: {type: "string", required: true},
          value: {type: "string", required: true}
        }
      }},
    arrayEnumValue: {type: "array", enum: ["exp", "nbf"]},
    stringEnumValue: {type: "string", enum: ["exp", "nbf"]},
    textarea: {type: "string", multiline: true}
  }
};

const lineData = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
  ];
const lineLines = ['uv', 'pv', 'amt'];
const lineXAxisKey = 'name';
const barData = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
  ];
const barBars = ['uv', 'pv', 'amt'];
const barXAxisKey = 'name';
const pieData = [
    {name: 'Group A', value: 400}, {name: 'Group B', value: 300},
    {name: 'Group C', value: 300}, {name: 'Group D', value: 200}
  ];

const layout = {
  $type: 'HeaderPage',
  props: {
    title: 'Kitchen Sink',
  },
  children: [
    {
      $type: 'Row',
      children: [
        {
          $type: 'Col',
          props: {
            md: 4
          },
          children: [
            {
              $type: 'Alert',
              props: {
                type: 'info'
              },
              children: 'An info Alert'
            },
            {
              $type: 'Alert',
              props: {
                type: 'success'
              },
              children: 'A success Alert'
            },
            {
              $type: 'Alert',
              props: {
                type: 'warning'
              },
              children: 'A warning Alert'
            },
            {
              $type: 'Alert',
              props: {
                type: 'danger'
              },
              children: 'A danger Alert'
            }
          ]
        },
        {
          $type: 'Col',
          props: {
            md: 4
          },
          children: [
            {
              $type: 'Alert',
              props: {
                dismissable: true,
                type: 'info'
              },
              children: 'An dismissable info Alert'
            },
            {
              $type: 'Alert',
              props: {
                dismissable: true,
                type: 'success'
              },
              children: 'A dismissable success Alert'
            },
            {
              $type: 'Alert',
              props: {
                dismissable: true,
                type: 'warning'
              },
              children: 'A dismissable warning Alert'
            },
            {
              $type: 'Alert',
              props: {
                dismissable: true,
                type: 'danger'
              },
              children: 'A dismissable danger Alert'
            },
          ]
        },
        {
          $type: 'Col',
          props: {
            md: 4
          },
          children: [
            {
              $type: 'Alert',
              props: {
                dismissAfter: 5000,
                type: 'info'
              },
              children: 'An info Alert, dismisses after 5 seconds'
            },
            {
              $type: 'Alert',
              props: {
                dismissAfter: 10000,
                type: 'success'
              },
              children: 'A success Alert, dismisses after 10 seconds'
            },
            {
              $type: 'Alert',
              props: {
                dismissAfter: 15000,
                type: 'warning'
              },
              children: 'A warning Alert, dismisses after 15 seconds'
            },
            {
              $type: 'Alert',
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
      $type: 'Panel',
      children: {
        $type: 'PanelInset',
        children: [
          {
            $type: 'p',
            children: [
              {
                $type: 'IconAlert',
              },
              {
                $type: 'a',
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
            $type: 'p',
            children: [
              {
                $type: 'span',
                children: 'Charts from '
              },
              {
                $type: 'a',
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
            $type: 'p',
            children: [
              {
                $type: 'span',
                children: 'Design started from '
              },
              {
                $type: 'a',
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
      $type: 'Panel',
      props: {
        inset: false,
        title: 'Panel - Title',
      },
      children: 'This is a Panel, with inset false'
    },
    {
      $type: 'Panel',
      props: {
        inset: true,
        title: 'Inset Panel - Title',
        footer: 'Panel - Footer'
      },
      children: 'This is a Panel, with inset true'
    },
    {
      $type: 'Panel',
      props: {
        inset: true,
        title: 'Dialog Buttons',
      },
      children: [
        {
          $type: 'ConfirmButton',
          props: {
            btnStyle: 'danger',
            caption: 'Confirm Button',
            title: 'Are you sure?',
            message: 'Are you sure you want to do something?',
            onYes(dialog){console.log('User clicked yes'); dialog.close()},
            onNo(dialog){console.log('User clicked no'); dialog.close()}
          }
        },
        {
          $type: 'InfoButton',
          props: {
            btnStyle: 'primary',
            caption: 'Info Button',
            title: 'Something Interesting',
            message: 'Some information about something interesting.',
            onOk(dialog){console.log('User clicked ok'); dialog.close()},
          }
        }
      ]
    },
    {
      $type: 'PageHeader',
      props: {
        title: 'Count Panels'
      }
    },
    {
      $type: 'Row',
      children: [
        {
          $type: 'CountPanel',
          props: {
            color: 'primary',
            count: 26,
            title: 'Primary',
            Icon: {$component: 'IconComment'},
            link: '/kitchensink'
          }
        },
        {
          $type: 'CountPanel',
          props: {
            color: 'green',
            count: 35,
            title: 'Green',
            Icon: {$component: 'IconTask'},
            link: '/kitchensink'
          }
        },
        {
          $type: 'CountPanel',
          props: {
            color: 'yellow',
            count: 125,
            title: 'Yellow',
            Icon: {$component: 'IconOrder'},
            link: '/kitchensink'
          }
        },
        {
          $type: 'CountPanel',
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
      $type: 'PageHeader',
      props: {
        title: 'Charts'
      }
    },
    {
      $type: 'Row',
      children: [
        {
          $type: 'Panel',
          props: {
            inset: true,
            title: 'Line Chart',
            sm: 12,
            lg: 6
          },
          children: [
            {
              $type: 'LineChart',
              props: {
                data: lineData,
                lines: lineLines,
                XAxisKey: lineXAxisKey
              }
            }
          ]
        },
        {
          $type: 'Panel',
          props: {
            inset: true,
            title: 'Area Chart',
            sm: 12,
            lg: 6
          },
          children: [
            {
              $type: 'AreaChart',
              props: {
                data: lineData,
                lines: lineLines,
                XAxisKey: lineXAxisKey
              }
            }
          ]
        },
        {
          $type: 'Panel',
          props: {
            inset: true,
            title: 'Pie Chart',
            sm: 12,
            lg: 4
          },
          children: [
            {
              $type: 'PieChart',
              props: {
                data: pieData
              }
            }
          ]
        },
        {
          $type: 'Panel',
          props: {
            inset: true,
            title: 'Bar Chart',
            sm: 12,
            lg: 8
          },
          children: [
            {
              $type: 'BarChart',
              props: {
                data: barData,
                bars: barBars,
                XAxisKey: barXAxisKey
              }
            }
          ]
        },
      ]
    },
    {
      $type: 'PageHeader',
      props: {
        title: 'Tables'
      }
    },
    {
      $type: 'Panel',
      props: {
        title: 'Normal Table'
      },
      children: {
        $type: 'Table',
        props: {
          data: tableData
        }
      }
    },
    {
      $type: 'Panel',
      props: {
        title: 'Action Table'
      },
      children: {
        $type: 'ActionTable',
        props: {
          data: tableData,
          actions: [
            {
              $type: 'ConfirmButton',
              props: {
                btnStyle: 'danger',
                caption: 'Confirm Button',
                title: 'Are you sure?',
                message: 'Are you sure you want to do something?',
                onYes(dialog){console.log('User clicked yes'); dialog.close()},
                onNo(dialog){console.log('User clicked no'); dialog.close()}
              }
            },
            {
              $type: 'InfoButton',
              props: {
                btnStyle: 'primary',
                caption: 'Info Button',
                title: 'Something Interesting',
                message: 'Some information about something interesting.',
                onOk(dialog){console.log('User clicked ok'); dialog.close()},
              }
            }
          ]
        }
      }
    },
    {
      $type: 'PageHeader',
      props: {
        title: 'ListGroup'
      }
    },
    {
      $type: 'Row',
      children: [
        {
          $type: 'Panel',
          props: {
            lg: 4,
            sm: 12,
          },
          children: {
            $type: 'ListGroup',
            children: [
              {
                $type: 'ListGroupItem',
                props: {
                  badge: 'Just now'
                },
                children: [
                  {$type: 'IconCalendar'},
                  'Calendar update'
                ]
              },
              {
                $type: 'ListGroupItem',
                props: {
                  badge: '4 minutes ago'
                },
                children: [
                  {$type: 'IconNote'},
                  'New comment'
                ]
              },
              {
                $type: 'ListGroupItem',
                props: {
                  badge: '23 minutes ago'
                },
                children: [
                  {$type: 'IconOrder'},
                  'Order 321 shipped'
                ]
              },
              {
                $type: 'ListGroupItem',
                props: {
                  badge: '46 minutes ago'
                },
                children: [
                  {$type: 'IconBilling'},
                  'Invoice 321 paid'
                ]
              },
            ]
          }
        }
      ]
    },
    {
      $type: 'PageHeader',
      props: {
        title: 'Forms'
      }
    },
    {
      $type: 'Row',
      children: [
        {
          $type: 'Panel',
          props: {
            lg: 6,
            sm: 12,
            inset: true,
            title: 'JSON Schema Form'
          },
          children: {
            $type: 'Form',
            props: {
              schema: PersonSchema
            }
          }
        },
        {
          $type: 'Panel',
          props: {
            lg: 6,
            sm: 12,
            inset: true,
            title: 'Kong Schema Form'
          },
          children: {
            $type: 'KongForm',
            props: {
              schema: KongTestSchema
            }
          }
        }
      ]
    }
  ],
  path: '/kitchensink',
  icon: 'Kitchensink',
  sideNav: true,
  caption: 'Kitchen Sink'
};

export default layout;
