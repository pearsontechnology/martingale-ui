import GettingStarted from './pages/gettingstarted';
import ConfigurationBasics from './pages/configurationbasics';
import InstallingPacks from './pages/installingpacks';
import Dockerize from './pages/dockerize';
import BuildingPacks from './pages/buildingpacks';
import ExtendedPacks from './pages/extendedpacks';

const pages = {
  GettingStarted,
  ConfigurationBasics,
  InstallingPacks,
  Dockerize,
  BuildingPacks,
  ExtendedPacks
};

export default {
  name: 'Documentation',
  icon: 'Book',
  sideNav: [
    {
      caption: 'Getting Started',
      icon: 'Alert',
      path: '/docs/gettingstarted'
    },
    {
      caption: 'Configuration Basics',
      icon: 'Page',
      path: '/docs/configurationbasics'
    },
    {
      caption: 'Installing Packs',
      icon: 'Page',
      path: '/docs/installingpacks'
    },
    {
      caption: 'Getting Dockerized / Production Builds',
      icon: 'Page',
      path: '/docs/dockerize'
    },
    {
      caption: 'Building Packs',
      icon: 'Page',
      path: '/docs/buildingpacks'
    },
    {
      caption: 'Extended Packs',
      icon: 'Page',
      path: '/docs/extendedpacks'
    }
  ],
  pages
};
