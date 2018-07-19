const documentContents = `In order for Martingale to present a User Interface to interact with systems it needs to know what exists and how to interact with those things. The configuration file provides Martingale with a starting point on what to load and make available to end users.

When Martingale is loaded by the browser it will make a request for /config.json (by default) file. You can either edit this file directly (it is kept in martingale/ui/public/config.json), you can proxy the request to return your own custom config.json file (more on this in Installing Packs and Kong sections), or you can set the REACT_APP_CONFIG_FILE_LOCATION environment variable and create a custom build (recommended).

The default configuration file for Martingale looks as follows:

\`\`\`json
{
  "packs": ["Martingale", "Documentation"]
}
\`\`\`

This tells Martingale to load the two included packs that it ships with, the first is the "Martingale" pack that contains a homepage, kitchen sink, and a very basic page builder. The second contains the documentation for Martingale.

Unlike many systems, Martingale Packs don't have to be compiled in, downloaded, installed, or generally reside anywhere within the Martingale instance running. This means that for the most part you never actually have to "upgrade" Martingale itself unless you want to take advantage of new features or components that are not available in your current version. More on this in the Installing Packs section.

An optional section within the configuration file is the sideNav section:

\`\`\`json
{
  "sideNav": [
    {
      "caption": "Caption to display",
      "icon": "Icon",
      "path": "/path/to/page/to/display"
    }
  ]
}
\`\`\`

The sideNav section allows you to specify pages that you want displayed as top level navigation items (not placed under a pack grouping). If you installed a pack but don't want to display the default navigation items then you could use the sideNav section to surface only the pages you are interested in.
`;

export default {
  $type: 'HeaderPage',
  props: {
    title: 'Martingale - Configuration Basics'
  },
  children: {
    $type: 'MarkDown',
    children: documentContents
  },
  path: '/docs/configurationbasics'
};