import UIComps from 'martingale-ui-components';
import Nav from './nav';
import PageSchema from 'martingale-page-schema';
import * as Pages from './pages';
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

const isDev = process.env.NODE_ENV==='development';
if(isDev){
  console.log(Object.keys(Components).sort().join(', '))
}

export default Components;
