import Home from './home';
import KitchenSink from './kitchensink';
import APIs from './apis';
import Kube from './kube';
import Settings from './settings';

export default {
  Home,
  KitchenSink,
  ...APIs,
  ...Kube,
  Settings
};
