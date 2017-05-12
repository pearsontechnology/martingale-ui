import Home from './home';
import KitchenSink from './kitchensink';
import Kube from './kube';
import Settings from './settings';
import Kong from './kong';

export default {
  Home,
  KitchenSink,
  ...Kong,
  ...Kube,
  Settings
};
