import Cluster from './cluster';
import APIs from './apis';
import Consumers from './consumers';
import Certificates from './certificates';
import SNIs from './snis';
import KongDashboard from './dashboard';
//import Upstreams from './upstreams';

export default {
  name: 'Kong',
  pages: {
    KongDashboard,
    ...Cluster,
    ...APIs,
    ...Consumers,
    ...Certificates,
    ...SNIs,
    //...Upstreams
  }
};
