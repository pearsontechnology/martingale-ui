import BasicAuth from './basic';
import HMACAuth from './hmac';
import OAuth2 from './oauth2';
import Key from './key';
import JWT from './jwt';
import ACL from './acl';

export default {
  ...BasicAuth,
  ...OAuth2,
  ...HMACAuth,
  ...Key,
  ...JWT,
  ...ACL
};
