import Cluster from './cluster';
import APIs from './apis';
import Consumers from './consumers';
import Certificates from './certificates';
import SNIs from './snis';
//import Upstreams from './upstreams';

export default {
  ...Cluster,
  ...APIs,
  ...Consumers,
  ...Certificates,
  ...SNIs,
  //...Upstreams
};
