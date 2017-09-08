---
caption: Getting Started
icon: Alert
path: /docs/gettingstarted
filename: gettingstarted.js
order: 0
---

Welcome to Martingale, this guide will walk you through installing and configuring a local standalone version of Martingale that later will be extended with Packs and proxied through Kong to support Google OAuth as a singin option.

## Table of Contents

 * [Prerequisites](#Prerequisites)
 * [Installation](#Installation)

## Prerequisites

In order to run Martingale locally you will need a few tools installed:

  * Node.js 8.4.x - [Install via NVM](https://github.com/creationix/nvm)
  * [Yarn Package Manager](https://yarnpkg.com/en/)
  * [Docker](https://www.docker.com/get-docker) - Recommended but not required (You can also use the easy install script at [https://get.docker.com/](https://get.docker.com/))
  * [Kong 0.10.3](https://getkong.org/) (or the Docker version) - Recommended but not required

## Installation

Clone the Martingale-UI Git Repo from https://github.com/pearsontechnology/martingale-ui to a new folder structure martingale/ui:

``` shell
git clone git@github.com:pearsontechnology/martingale-ui.git martingale/ui
```

Change to the new folder and run yarn install:

``` shell
cd martingale/ui
yarn install
```

Start Martingale in standalone mode serving the default Martingale and Documentation packs:

``` shell
yarn start
```

Your browser should now open and load http://localhost:3000 displaying the default Martingale home page and two navigation menus.  Under each of these menus are different pages within Martingale to help you get acquainted.

 * Martingale
   * Kitchen Sink - Shows most of the controls available within Martingale Packs.
   * Designer - A simple playground where you can enter YAML source and view the output page design.
 * Documentation
   * Getting Started - This guide
   * Configuration Basics - Talks about the different configuration options available within config.json
   * Installing packs - Install the Kong Pack and hook it up to the new installation of Martingale
   * Dockerize - Explains how to create a Docker image from your installation
   * Building Packs - HTTPBin pack, the "Hello World" of Marginale
   * Extended Packs - Packs that use or load other packs
