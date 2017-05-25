import Listing from './list';
import Pods from './pods';
import Ingresses from './ingresses';
import Secrets from './secrets';
import ThirdPartyResources from './thirdpartyresources';
import Daemonsets from './daemonsets';
import Replicasets from './replicasets';
import ResourceQuotas from './quotas';

export default {
  Listing,
  ...Pods,
  ...Ingresses,
  ...Secrets,
  ...ThirdPartyResources,
  ...Daemonsets,
  ...Replicasets,
  ...ResourceQuotas
};
