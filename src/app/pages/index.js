import Home from './home';
import KitchenSink from './kitchensink';
import APIs from './apis';
import Kube from './kube';

export default {
  Home,
  KitchenSink,
  ...APIs,
  ...Kube
};
