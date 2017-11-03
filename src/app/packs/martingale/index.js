import Home from './home';
import KitchenSink from './kitchensink';
//import Settings from './settings';
import Designer from './designer';

const isDev = process.env.NODE_ENV==='development';

const pages = isDev?{
  // Development pages
  Home,
  KitchenSink,
  //Settings,
  Designer
}:{
  // Production pages
  Home,
  KitchenSink
};

export default {
  name: 'Martingale',
  icon: 'Logo',
  /*
  sideNav: [
    {
      caption: 'Kitchen Sink',
      icon: 'Kitchensink',
      path: '/kitchensink'
    },
    {
      caption: 'Designer',
      icon: 'Logo',
      path: '/designer'
    }
  ],
  */
  pages
};
