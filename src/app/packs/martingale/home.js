const layout = {
  "$type": "HeaderPage",
  "props": {
    "title": "Martingale"
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
    }
  ],
  "path": "/",
  "icon": "Dashboard",
  "caption": "Home"
};

export default layout;
