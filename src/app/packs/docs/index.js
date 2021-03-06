import GettingStarted from './pages/gettingstarted';
import ConfigurationBasics from './pages/configurationbasics';
import InstallingPacks from './pages/installingpacks';
import GettingDockerizedProductionBuilds from './pages/dockerize';
import BuildingPacks from './pages/buildingpacks';
import ExtendedPacks from './pages/extendedpacks';

const pages = {
  GettingStarted,
  ConfigurationBasics,
  InstallingPacks,
  GettingDockerizedProductionBuilds,
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
      icon: 'Note',
      path: '/docs/configurationbasics'
    },
    {
      caption: 'Installing Packs',
      icon: 'Task',
      path: '/docs/installingpacks'
    },
    {
      caption: 'Getting Dockerized / Production Builds',
      icon: 'Note',
      path: '/docs/dockerize'
    },
    {
      caption: 'Building Packs',
      icon: 'Note',
      path: '/docs/buildingpacks'
    },
    {
      caption: 'Extended Packs',
      icon: 'Note',
      path: '/docs/extendedpacks'
    }
  ],
  pages
};
