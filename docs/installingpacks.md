---
caption: Installing Packs
icon: Task
path: /docs/installingpacks
order: 2
---

**NOTE:** To follow along with this section you will need to have a local install or dockerized version of Kong available.  Install it from [https://getkong.org/](https://getkong.org/)

**NOTE:** You will also need Docker to run the Pack in a standalone server that we will link to.

Pack files are compiled assets that get loaded into Martingale when it loads.  These assets are simple JSON, YAML, or JavaScript files that contain layout information and UI alteration (adding Side/Top Nav items, homepage, etc).  For this reason they can be served from just about anywhere the browser will allow (CORS headers are enforced).  So you can serve your Pack files from another server, Github, a CDN, or anywhere else you choose from.

For this section we will be downloading, installing, and running the Kong 0.10.3 Pack file in a Docker container.  We will then configure and use the pack to manage our locally installed Kong instance.

### Refresher

As stated in Getting Started, the default configuration file for Martingale is as follows:

``` json
{
  "packs": [
    "Martingale",
    "Documentation"
  ]
}
```

If yours looks different you might want to change it back to follow along with copy/paste.

### Downloading and Installing the Kong 0.10.3 Pack file

In order to make things easier Martingale has mpack a tool that allows you to easily locally host, develop, and document your plugins.  We will be using this same tool now to serve the Kong pack locally.

First we need to install mpack:

``` shell
yarn global add martingale-pack-builder
```

Check that mpack installed properly:

``` shell
mpack --version
```

You should see a version number displayed.

Now we can clone down the Kong pack file.  From your martingale root folder:

``` shell
git clone git@github.com:pearsontechnology/martingale-kong-pack.git packs/kong
```

Change to the directory containing the kong pack:

``` shell
cd packs/kong
```

And start the pack in debug (locally hosted) mode:

``` shell
yarn start
```

You should see a message saying something about the pack running locally on port 8082.

Stop the local debug mode (in Linux CTRL+C, Mac CMD+D)

And start the pack in a docker container:

``` shell
yarn docker
```

You should now have a docker container running on your machine with port 8082 mapped to your local host.  To test we can curl localhost to see the result of the pack:

``` shell
curl localhost:8082/pack.yaml
```

Next we need to add the pack to Martingale.  Open your config.json file and change it's contents to:

``` json
{
  "packs": [
    "Martingale",
    "Documentation",
    "http://localhost:8082/pack.yaml"
  ]
}
```

Martingale should reload, but no changes will be displayed.  We have included the pack, but have not activiated it yet.  Let's do that now.

### Configuring the Kong pack

Installing a pack doesn't display the pack by default in the side or top navigations.  It simply makes the pages available for use within Martingale.  In order to see a pack in the navigation we have to enable and configure it.

First let's enable the pack in the side navigation.  Do this by referencing the pack in the sideNav block witin your config.json file:

``` json
{
  "packs": [
    "Martingale",
    "Documentation",
    "http://localhost:8082/pack.yaml"
  ],
  "sideNav": [
    {
      "pack": "Kong"
    }
  ]
}
```

Martingale will refresh and you should now see a Kong section added to the side navigation.  If you try clicking around you will notice that it doesn't actually do anything.  If you inspect the Network and Console panels within your browser you will likely notice calls to /api/kong that don't resolve to anything.  This is because the default configuration for the Kong pack expects that we proxy all requests to the Kong host through a special endpoint called /api/kong.

Let's change that now, and instead directly communicate with the Kong Admin API on http://localhost:8001 (**NOTE:** if you are running Kong in a container you will need to change this URL to the one for your docker container).  Make the following changes to your config.json file:

``` json
{
  "packs": [
    "Martingale",
    "Documentation",
    "http://localhost:8082/pack.yaml"
  ],
  "sideNav": [
    {
      "pack": "Kong",
      "config": {
        "host": "http://localhost:8001"
      }
    }
  ]
}
```

Again, Martingale will reload.  This time try clicking on the Kong side navigation icon, then clicking on the Dashboard icon.  You should see some pretty graphs providing an overview of the status of your Kong instance.

Congratulations, you can now manage Kong from Martingale.  You could setup Kong to proxy the Marginale-UI, proxy requests for Pack loading, provide security, or anything else.  That is all outside the scope of this document, but hopefully you see how easy it is to install and configure Pack's with Martingale.
