/* eslint-disable global-require,no-underscore-dangle */
if ((typeof window !== 'undefined' && !window._babelPolyfill) ||
  (typeof global !== 'undefined' && !global._babelPolyfill)) {
  // Don't load babel-polyfill if already loaded: https://github.com/babel/babel/issues/4019
  require('babel-polyfill'); // general ES2015 polyfill (e.g. promise)
}
/* eslint-enable global-require no-underscore-dangle */

/* eslint-disable import/first */
import React from 'react';
import ReactDOM from 'react-dom';

import EditImageModal from './components/EditImageModal';
import edxBootstrap from './SFE.scss';
/* eslint-enable import/first */

const App = () => (
  <div className="SFE-wrapper">
    <EditImageModal />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
