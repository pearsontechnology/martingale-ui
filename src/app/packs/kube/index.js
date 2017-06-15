import KubeDashboard from './dashboard';
import Namespaces from './namespaces';

export default {
  name: 'Kube',
  pages: {
    KubeDashboard,
    ...Namespaces
  },
};
