import React from 'react';
import {HeaderPage} from '../header';

import {
  Panel
} from '@martingale/ui-components';

const SAMPLE_CONFIG=`{
  "specs": [
    // Swagger specs can be used to define your configuration, expose packs, pages, side navigation, and/or top navigation.
    {
      "swagger": "/<location>/<to>/swagger.json"
    }
  ],
  "packs": [
    // Packs are defined directly, as a json file, or a js file:

    // Pulls in a pack from a URL
    "https://gist.githubusercontent.com/<someUser>/<someId>/raw/<someId>/myPack.js[on]",

    // You can pull in a local pack file during development
    "file://<some>/<path>/<to>/myPack.js[on]",

    // Specify a pack directly
    {
      "name": "My Custom Pack",
      "icon": "Logo",
      "pages": {
        "Home": {
          "$type": "HeaderPage",
          "props": {
            "title": "Some page Title"
          },
          "children": [
            {
              "$type": "p",
              "children": "Hello world, this is a custom home page."
            }
          ],
          "path": "/",
          "icon": "Dashboard",
          "caption": "Home"
        }
      }
    }
  ],
  "sideNav": [
    // Specify a side nav item directly
    {
      "icon": "Logo",
      "caption": "Some Caption",
      // Optional, use link if the entry has no child nav
      "link": "/path/to/page",
      // Optional, use pages if the entry has child nav
      "pages": [
        {
          "icon": "Logo",
          "caption": "Some child caption",
          "link": "/path/to/page"
        }
      ]
    },
    // Specify an instance of a pack
    {
      "pack": "My Custom Pack",
      "config": {
        // Change the pack icon
        "icon": "Default",
        // Set the caption
        "caption": "My custom instance"
      }
    }
  ],
  "topNav": [
    {
      "Icon": "IconInbox",
      "type": "message",
      "items": [
        {
          "type": "message-preview",
          "content": (
            <div className="media">
                <span className="pull-left">
                    <img className="media-object" src="http://placehold.it/50x50" alt="" />
                </span>
                <div className="media-body">
                    <h5 className="media-heading"><strong>Joe User</strong>
                    </h5>
                    <p className="small text-muted"><IconConsumer /> Yesterday at 4:32 PM</p>
                    <p>Joe had a <IconConsumer /></p>
                </div>
            </div>
          )
        }
      ]
    },
    {
      "Icon": "IconAlert",
      "type": "alert",
      "items": [
        {
          "caption": (<span>Alert Name <span className="label label-default">Alert Badge</span></span>)
        }
      ]
    },
    {
      "caption": "Joe User",
      "Icon": "IconUser",
      "items": [
        {
          "caption": "Profile",
          "Icon": "IconUser",
          "linkTo": "/profile"
        },
        {"divider": true},
        {
          "caption": "Log Out",
          "Icon": "IconLogOut"
        },
      ]
    }
  ]
}`;

const NoConfig = ({ location }) => (
  <HeaderPage title='No Configuration File'>
    <Panel inset={true}>
      <p>Martingale requires that a configuration file be available.  A sample
      configuration file might look like:</p>
      <pre>{SAMPLE_CONFIG}</pre>
    </Panel>
  </HeaderPage>
);

export {
  NoConfig
};
