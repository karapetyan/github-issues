import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { store } from './store/store';

render (
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
