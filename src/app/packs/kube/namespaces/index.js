import Listing from './list';
import Pods from './pods';
import Ingresses from './ingresses';
import Secrets from './secrets';
import ThirdPartyResources from './thirdpartyresources';
import Daemonsets from './daemonsets';
import Replicasets from './replicasets';
import ResourceQuotas from './quotas';
import Deployments from './deployments';
import Services from './services';

export default {
  Listing,
  ...Pods,
  ...Ingresses,
  ...Secrets,
  ...ThirdPartyResources,
  ...Daemonsets,
  ...Replicasets,
  ...ResourceQuotas,
  ...Deployments,
  ...Services
};
