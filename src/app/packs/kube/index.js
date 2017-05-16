import Pods from './pods';
import Pod from './pod';
import Logs from './logs';
import KubeDashboard from './dashboard';

export default {
  name: 'Kube',
  pages: {
    KubeDashboard,
    Pods,
    Pod,
    Logs
  }
};
