import UIComps from 'martingale-ui-components';
//import UIComps from '../../../ui-components';
import Nav from './nav';
import PageSchema from 'martingale-page-schema';
import Pages from './pages';
import Charts from 'martingale-charts';
import {
  Provider
} from 'martingale-provider';

const Components = {
  ...Nav,
  ...UIComps,
  ...Provider,
  ...PageSchema,
  ...Pages,
  ...Charts,
  Provider
};

console.log(Object.keys(Components).sort().join(', '))

export default Components;
