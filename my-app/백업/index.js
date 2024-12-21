import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './component/redux/store'; // Redux Store 가져오기
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


